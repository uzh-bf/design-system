/* global console, process */

import fs from 'node:fs'
import path from 'node:path'

const versions = ['7.59.0', '7.90.0']
const defaultVersion = '7.90.0'
const minimumLockfileName = 'pnpm-lock.rhf-minimum.yaml'
const rhfPackage = 'react-hook-form'

const [command, consumerArg] = process.argv.slice(2)

if (!command || !consumerArg) {
  throw new Error(
    'usage: rhf-matrix.mjs <stage|assert-installed> <consumer-dir>'
  )
}

const consumerDir = path.resolve(consumerArg)
const manifestPath = path.join(consumerDir, 'package.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

function declaredVersion() {
  const declared = manifest.dependencies?.[rhfPackage]
  if (!declared) {
    throw new Error(manifestPath + ' does not declare ' + rhfPackage)
  }
  return declared
}

if (command === 'stage') {
  const requested = (process.env.RHF_VERSION ?? '').trim() || defaultVersion

  if (!versions.includes(requested)) {
    throw new Error(
      'RHF_VERSION must be one of ' +
        versions.join(', ') +
        ', received "' +
        requested +
        '"'
    )
  }

  const committed = declaredVersion()
  if (committed !== defaultVersion) {
    throw new Error(
      'fixture manifest must commit ' +
        rhfPackage +
        ' ' +
        defaultVersion +
        ', found ' +
        committed
    )
  }

  if (requested !== defaultVersion) {
    const minimumLockfile = path.join(consumerDir, minimumLockfileName)
    if (!fs.existsSync(minimumLockfile)) {
      throw new Error('missing minimum lockfile ' + minimumLockfile)
    }
    manifest.dependencies[rhfPackage] = requested
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
    fs.copyFileSync(minimumLockfile, path.join(consumerDir, 'pnpm-lock.yaml'))
  }

  console.log(requested)
} else if (command === 'assert-installed') {
  const declared = declaredVersion()
  const installedManifest = path.join(
    consumerDir,
    'node_modules',
    rhfPackage,
    'package.json'
  )
  const installed = JSON.parse(fs.readFileSync(installedManifest, 'utf8'))

  if (installed.version !== declared) {
    throw new Error(
      'installed ' +
        rhfPackage +
        ' ' +
        installed.version +
        ' does not match the manifest version ' +
        declared
    )
  }

  console.log(
    'installed ' +
      rhfPackage +
      ' ' +
      installed.version +
      ' matches the frozen manifest'
  )
} else {
  throw new Error('unknown command "' + command + '"')
}
