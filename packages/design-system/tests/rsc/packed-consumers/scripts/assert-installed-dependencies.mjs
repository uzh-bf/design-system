/* global console, process */

import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

function installedPackage(requireFrom, packageName) {
  const entry = fs.realpathSync(requireFrom.resolve(packageName))
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
  } else {
    if (!first)
      throw new Error(
        'usage: assert-installed-dependencies.mjs [stage] <fixture>'
      )
    assertInstalledDependencies(first)
  }
}
