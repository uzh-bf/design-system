/* global console, process */

import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RELEASE_AGE_MS = 20160 * 60 * 1000
const RELEASE_AGE_CONCURRENCY = 6
const RELEASE_AGE_FAILURE_LIMIT = 20
const EXEMPT_PACKAGE = 'react-resizable-panels'
const EXEMPT_VERSION = '4.14.8'

async function fetchRegistryMetadata(packageName) {
  const response = await fetch(
    `https://registry.npmjs.org/${packageName.replace('/', '%2f')}`,
    {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(30000),
    }
  )
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}

export async function assertRegistryReleaseAge(
  lockPath,
  { fetchMetadata = fetchRegistryMetadata, now = Date.now } = {}
) {
  if (typeof fetchMetadata !== 'function') {
    throw new Error('metadata fetch must be a function')
  }
  const currentTime = typeof now === 'function' ? now() : now
  if (!Number.isFinite(currentTime)) {
    throw new Error('release-age clock must return a finite timestamp')
  }

  const lock = JSON.parse(fs.readFileSync(path.resolve(lockPath), 'utf8'))
  if (
    lock.lockfileVersion !== 3 ||
    !lock.packages ||
    typeof lock.packages !== 'object' ||
    Array.isArray(lock.packages)
  ) {
    throw new Error('release-age check requires package-lock v3 packages')
  }

  const versionsByName = new Map()
  let registryRecords = 0
  let localRecords = 0
  let rootRecords = 0
  for (const [recordPath, entry] of Object.entries(lock.packages)) {
    if (recordPath === '') {
      rootRecords += 1
      continue
    }
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      throw new Error(`unsupported package-lock record: ${recordPath}`)
    }
    if (entry.link === true) {
      localRecords += 1
      continue
    }
    if (
      typeof entry.resolved === 'string' &&
      entry.resolved.startsWith('file:')
    ) {
      localRecords += 1
      continue
    }
    if (typeof entry.resolved !== 'string' || !entry.resolved) {
      throw new Error(`unsupported package-lock record: ${recordPath}`)
    }

    let resolved
    try {
      resolved = new URL(entry.resolved)
    } catch {
      throw new Error(`unsupported package source: ${recordPath}`)
    }
    if (resolved.origin !== 'https://registry.npmjs.org') {
      throw new Error(`unsupported non-registry package source: ${recordPath}`)
    }
    const marker = resolved.pathname.indexOf('/-/')
    let packageName
    try {
      packageName = decodeURIComponent(resolved.pathname.slice(1, marker))
    } catch {
      throw new Error(`invalid registry package name: ${recordPath}`)
    }
    if (marker < 2 || !packageName) {
      throw new Error(`invalid registry package source: ${recordPath}`)
    }
    if (typeof entry.version !== 'string' || !entry.version) {
      throw new Error(`registry package has no exact version: ${recordPath}`)
    }

    registryRecords += 1
    if (!versionsByName.has(packageName)) {
      versionsByName.set(packageName, new Set())
    }
    versionsByName.get(packageName).add(entry.version)
  }

  const failures = []
  let nextPackage = 0
  let youngExemptions = 0
  const packages = [...versionsByName]
  const worker = async () => {
    while (nextPackage < packages.length) {
      const [packageName, versions] = packages[nextPackage++]
      let metadata
      try {
        metadata = await fetchMetadata(packageName)
      } catch (error) {
        const detail = error instanceof Error ? error.message : String(error)
        failures.push(
          `${packageName}: metadata fetch failed: ${detail.slice(0, 300)}`
        )
        continue
      }
      if (
        !metadata?.versions ||
        typeof metadata.versions !== 'object' ||
        Array.isArray(metadata.versions)
      ) {
        failures.push(`${packageName}: invalid publication metadata`)
        continue
      }

      for (const version of versions) {
        const packageSpec = `${packageName}@${version}`
        if (!Object.hasOwn(metadata.versions, version)) {
          failures.push(`${packageSpec}: version metadata is missing`)
          continue
        }
        const publishedAt = metadata.time?.[version]
        const publishedTime =
          typeof publishedAt === 'string' ? Date.parse(publishedAt) : NaN
        if (!Number.isFinite(publishedTime)) {
          failures.push(
            `${packageSpec}: publication time is missing or invalid`
          )
          continue
        }
        if (publishedTime > currentTime) {
          failures.push(`${packageSpec}: publication time is in the future`)
          continue
        }
        const young = currentTime - publishedTime < RELEASE_AGE_MS
        const exactExemption =
          packageName === EXEMPT_PACKAGE && version === EXEMPT_VERSION
        if (young && exactExemption) youngExemptions += 1
        if (young && !exactExemption) {
          failures.push(`${packageSpec}: below minimum release age`)
        }
      }
    }
  }
  await Promise.all(
    Array.from(
      { length: Math.min(RELEASE_AGE_CONCURRENCY, packages.length) },
      worker
    )
  )

  if (failures.length) {
    const shown = failures.slice(0, RELEASE_AGE_FAILURE_LIMIT)
    if (failures.length > shown.length) {
      shown.push(`${failures.length - shown.length} additional failures`)
    }
    throw new Error(`registry release-age check failed:\n${shown.join('\n')}`)
  }

  return {
    registryRecords,
    uniqueRegistryPackages: versionsByName.size,
    localRecords,
    rootRecords,
    youngExemptions,
  }
}

function installedPackage(requireFrom, packageName) {
  const entryPoint =
    packageName === '@shadcn/react'
      ? '@shadcn/react/message-scroller'
      : packageName
  const entry = fs.realpathSync(requireFrom.resolve(entryPoint))
  let directory = path.dirname(entry)
  while (true) {
    const manifestPath = path.join(directory, 'package.json')
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
      if (manifest.name === packageName && manifest.version) {
        return { manifest, directory, require: createRequire(manifestPath) }
      }
    }
    const parent = path.dirname(directory)
    if (parent === directory) break
    directory = parent
  }
  throw new Error(`could not locate installed manifest for ${packageName}`)
}

export function assertInstalledDependencies(fixtureArg) {
  const fixtureDir = path.resolve(fixtureArg)
  const fixtureManifestPath = path.join(fixtureDir, 'package.json')
  const fixture = JSON.parse(fs.readFileSync(fixtureManifestPath, 'utf8'))
  const requireFromFixture = createRequire(fixtureManifestPath)
  const manifestPath = requireFromFixture.resolve(
    '@uzh-bf/design-system/package.json'
  )
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const requireFromPackage = createRequire(manifestPath)
  const mismatches = []

  for (const [name, expected] of Object.entries(manifest.dependencies ?? {})) {
    const expectedVersion = expected
    const installed = installedPackage(requireFromPackage, name)
    if (installed.manifest.version !== expectedVersion) {
      mismatches.push(
        `${name}: expected ${expectedVersion}, found ${installed.manifest.version}`
      )
    }
  }
  if (mismatches.length) {
    throw new Error(
      `packed dependency version mismatches:\n${mismatches.join('\n')}`
    )
  }
  for (const [name, version, message] of [
    [
      '@shadcn/react',
      '0.3.1',
      'Chat compositions must share the native shadcn runtime',
    ],
    [
      'react-resizable-panels',
      '4.14.8',
      'Resizable compositions must share the native v4 runtime',
    ],
    [
      'sonner',
      '2.0.8',
      'Direct application toasts must share the Sonner 2 runtime',
    ],
  ]) {
    if (!fixture.dependencies?.[name]) continue
    const application = installedPackage(requireFromFixture, name)
    const library = installedPackage(requireFromPackage, name)
    if (
      fixture.dependencies[name] !== version ||
      application.manifest.version !== version ||
      library.manifest.version !== version ||
      application.directory !== library.directory
    ) {
      throw new Error(message)
    }
  }

  if (
    manifest.dependencies?.recharts ||
    manifest.peerDependencies?.recharts !== '>=3.8.0 <4' ||
    manifest.peerDependenciesMeta?.recharts?.optional
  ) {
    throw new Error(
      'Recharts must be a required design-system peer >=3.8.0 <4, absent from regular dependencies'
    )
  }
  const endpoint = fixture.dependencies?.recharts
  if (!['3.8.0', '3.10.1'].includes(endpoint)) {
    throw new Error(`unsupported fixture Recharts endpoint: ${endpoint}`)
  }
  const recharts = installedPackage(requireFromFixture, 'recharts')
  const fromPackage = installedPackage(requireFromPackage, 'recharts')
  if (
    recharts.manifest.version !== endpoint ||
    fromPackage.manifest.version !== endpoint ||
    recharts.directory !== fromPackage.directory
  ) {
    throw new Error(
      'Recharts application and design-system resolutions must share the selected runtime'
    )
  }
  for (const name of ['react', 'react-dom', 'react-is']) {
    const application = installedPackage(requireFromFixture, name)
    const expected = fixture.dependencies?.[name]
    if (
      !expected ||
      application.manifest.version !== expected ||
      expected !== fixture.dependencies.react
    ) {
      throw new Error(`${name} must match the application React version`)
    }
    const resolvers =
      name === 'react-is'
        ? [recharts.require]
        : [requireFromPackage, recharts.require]
    for (const resolver of resolvers) {
      const resolved = installedPackage(resolver, name)
      if (
        resolved.directory !== application.directory ||
        resolved.manifest.version !== expected
      ) {
        throw new Error(
          `${name} resolves to a duplicate or incompatible runtime`
        )
      }
    }
  }
  console.log(
    `packed dependency versions pass (${Object.keys(manifest.dependencies ?? {}).length}); shared Recharts ${endpoint} and React runtime identity pass`
  )
}

export function stageRecharts(fixtureArg) {
  const fixtureDir = path.resolve(fixtureArg)
  const requested = (process.env.RECHARTS_VERSION ?? '').trim() || '3.10.1'
  const rhf = (process.env.RHF_VERSION ?? '').trim() || '7.90.0'
  if (
    !['3.8.0', '3.10.1'].includes(requested) ||
    !['7.59.0', '7.90.0'].includes(rhf) ||
    (requested === '3.8.0' && rhf !== '7.90.0')
  ) {
    throw new Error(
      'unsupported Recharts/RHF matrix cell: ' + requested + '/' + rhf
    )
  }
  const manifestPath = path.join(fixtureDir, 'package.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  if (manifest.dependencies?.recharts !== '3.10.1') {
    throw new Error('fixture must commit Recharts 3.10.1')
  }
  if (requested === '3.8.0') {
    manifest.dependencies.recharts = requested
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
    fs.copyFileSync(
      path.join(fixtureDir, 'pnpm-lock.recharts-minimum.yaml'),
      path.join(fixtureDir, 'pnpm-lock.yaml')
    )
  }
  console.log('Recharts matrix cell: ' + requested)
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const [first, second] = process.argv.slice(2)
  if (first === 'stage') {
    if (!second) throw new Error('stage requires a fixture directory')
    stageRecharts(second)
  } else if (first === 'release-age') {
    if (!second) throw new Error('release-age requires a package-lock path')
    const summary = await assertRegistryReleaseAge(second)
    console.log(
      `registry release age pass (${summary.registryRecords} records, ${summary.uniqueRegistryPackages} packages, ${summary.youngExemptions} exact exemptions)`
    )
  } else {
    if (!first)
      throw new Error(
        'usage: assert-installed-dependencies.mjs [stage|release-age] <path>'
      )
    assertInstalledDependencies(first)
  }
}
