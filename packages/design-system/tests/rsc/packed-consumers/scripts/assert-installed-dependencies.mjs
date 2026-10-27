/* global console, process */

import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

const [fixtureArg] = process.argv.slice(2)

if (!fixtureArg) {
  throw new Error('usage: assert-installed-dependencies.mjs <fixture>')
}

const fixtureDir = path.resolve(fixtureArg)
const requireFromFixture = createRequire(path.join(fixtureDir, 'package.json'))
const packageManifestPath = requireFromFixture.resolve(
  '@uzh-bf/design-system/package.json'
)
const packageDir = path.dirname(packageManifestPath)
const packageManifest = JSON.parse(fs.readFileSync(packageManifestPath, 'utf8'))
const requireFromPackage = createRequire(path.join(packageDir, 'package.json'))

function findInstalledManifest(entry, packageName) {
  let directory = path.dirname(entry)

  while (true) {
    const candidate = path.join(directory, 'package.json')
    if (fs.existsSync(candidate)) {
      const manifest = JSON.parse(fs.readFileSync(candidate, 'utf8'))
      if (manifest.name === packageName && manifest.version) {
        return manifest
      }
    }

    const parent = path.dirname(directory)
    if (parent === directory) break
    directory = parent
  }

  throw new Error(`could not locate installed manifest for ${packageName}`)
}

const mismatches = []

for (const [packageName, expectedVersion] of Object.entries(
  packageManifest.dependencies ?? {}
)) {
  const entry = requireFromPackage.resolve(packageName)
  const installed = findInstalledManifest(entry, packageName)

  if (installed.version !== expectedVersion) {
    mismatches.push(
      `${packageName}: expected ${expectedVersion}, found ${installed.version}`
    )
  }
}

if (mismatches.length > 0) {
  throw new Error(
    `packed dependency version mismatches:\n${mismatches.join('\n')}`
  )
}

console.log(
  `packed dependency versions pass (${Object.keys(packageManifest.dependencies ?? {}).length})`
)
