import { execFileSync } from 'node:child_process'
/* global process */

import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const [packageDir, runFixture, ...lockfiles] = process.argv.slice(2)

if (!packageDir || !runFixture || lockfiles.length === 0) {
  throw new Error(
    'usage: prepare-packed-artifact.mjs <package> <fixture> <lockfile...>'
  )
}

const artifactsDir = path.join(runFixture, '.artifacts')
fs.mkdirSync(artifactsDir, { recursive: true })

execFileSync('pnpm', ['--dir', packageDir, 'build'], { stdio: 'inherit' })
execFileSync(
  'pnpm',
  ['--dir', packageDir, 'pack', '--pack-destination', artifactsDir],
  { stdio: 'ignore' }
)

const tarballs = fs
  .readdirSync(artifactsDir)
  .filter((entry) => entry.endsWith('.tgz'))

if (tarballs.length !== 1) {
  throw new Error(
    `expected one packed Design System tarball, found ${tarballs.length}`
  )
}

const tarball = path.join(artifactsDir, tarballs[0])
const normalizedTarball = path.join(artifactsDir, 'design-system.tgz')
fs.renameSync(tarball, normalizedTarball)

const integrity = createHash('sha512')
  .update(fs.readFileSync(normalizedTarball))
  .digest('base64')

for (const lockfile of lockfiles) {
  const lines = fs.readFileSync(lockfile, 'utf8').split('\n')
  let updated = 0

  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].includes('@uzh-bf/design-system@file:')) continue
    for (
      let next = index;
      next < Math.min(index + 8, lines.length);
      next += 1
    ) {
      if (!lines[next].includes('integrity: sha512-')) continue
      lines[next] = lines[next].replace(
        /integrity: sha512-[A-Za-z0-9+/=]+/,
        `integrity: sha512-${integrity}`
      )
      updated += 1
      break
    }
  }

  if (updated !== 1) {
    throw new Error(
      `expected one local Design System integrity in ${lockfile}, found ${updated}`
    )
  }
  fs.writeFileSync(lockfile, lines.join('\n'))
}
