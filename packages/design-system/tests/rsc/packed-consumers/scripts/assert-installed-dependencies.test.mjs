import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { assertInstalledDependencies } from './assert-installed-dependencies.mjs'

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-dependency-test-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const modules = path.join(root, 'node_modules')
  const manifest = {
    dependencies: {
      react: '19.2.7',
      'react-dom': '19.2.7',
      'react-is': '19.2.7',
      recharts: '3.10.1',
    },
  }
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(manifest))
  const add = (name, version, base = modules, extra = {}) => {
    const directory = path.join(base, name)
    fs.mkdirSync(directory, { recursive: true })
    fs.writeFileSync(
      path.join(directory, 'package.json'),
      JSON.stringify({ name, version, main: 'index.js', ...extra })
    )
    fs.writeFileSync(path.join(directory, 'index.js'), '')
    return directory
  }
  for (const [name, version] of Object.entries(manifest.dependencies))
    add(name, version)
  const ds = add('@uzh-bf/design-system', '5.0.0-test', modules, {
    peerDependencies: { recharts: '>=3.8.0 <4' },
  })
  return { root, modules, ds, add }
}

test('accepts shared application-owned Recharts and React runtimes', (t) => {
  const x = fixture(t)
  assert.doesNotThrow(() => assertInstalledDependencies(x.root))
})

test('rejects a duplicate Recharts runtime even at the same version', (t) => {
  const x = fixture(t)
  x.add('recharts', '3.10.1', path.join(x.ds, 'node_modules'))
  assert.throws(
    () => assertInstalledDependencies(x.root),
    /share the selected runtime/
  )
})

test('rejects a wrong Recharts endpoint', (t) => {
  const x = fixture(t)
  x.add('recharts', '3.8.0')
  assert.throws(
    () => assertInstalledDependencies(x.root),
    /share the selected runtime/
  )
})

test('rejects duplicate or React-incompatible react-is resolution', (t) => {
  const x = fixture(t)
  x.add('react-is', '18.3.1', path.join(x.modules, 'recharts', 'node_modules'))
  assert.throws(
    () => assertInstalledDependencies(x.root),
    /duplicate or incompatible/
  )
})

test('rejects an optional Recharts runtime', (t) => {
  const x = fixture(t)
  const p = path.join(x.ds, 'package.json')
  const m = JSON.parse(fs.readFileSync(p))
  m.peerDependenciesMeta = { recharts: { optional: true } }
  fs.writeFileSync(p, JSON.stringify(m))
  assert.throws(
    () => assertInstalledDependencies(x.root),
    /required design-system peer/
  )
})

test('rejects a regularly owned Recharts runtime', (t) => {
  const x = fixture(t)
  const p = path.join(x.ds, 'package.json')
  const m = JSON.parse(fs.readFileSync(p))
  m.dependencies = { recharts: '3.10.1' }
  fs.writeFileSync(p, JSON.stringify(m))
  assert.throws(
    () => assertInstalledDependencies(x.root),
    /required design-system peer/
  )
})

test('accepts the supported minimum endpoint', (t) => {
  const x = fixture(t)
  const p = path.join(x.root, 'package.json')
  const m = JSON.parse(fs.readFileSync(p))
  m.dependencies.recharts = '3.8.0'
  fs.writeFileSync(p, JSON.stringify(m))
  x.add('recharts', '3.8.0')
  assert.doesNotThrow(() => assertInstalledDependencies(x.root))
})

for (const [label, name, version, passes] of [
  ['exact alias', 'react-resizable-panels', '4.14.8', true],
  ['wrong alias target', 'another-package', '4.14.8', false],
  ['wrong alias version', 'react-resizable-panels', '4.14.7', false],
]) {
  test(`validates the resizable ${label}`, (t) => {
    const x = fixture(t)
    const p = path.join(x.ds, 'package.json')
    const manifest = JSON.parse(fs.readFileSync(p))
    manifest.dependencies = {
      'react-resizable-panels-v4': 'npm:react-resizable-panels@4.14.8',
    }
    fs.writeFileSync(p, JSON.stringify(manifest))
    x.add('react-resizable-panels-v4', version, x.modules, { name })
    if (passes) assert.doesNotThrow(() => assertInstalledDependencies(x.root))
    else assert.throws(() => assertInstalledDependencies(x.root))
  })
}

test('still rejects a mismatched ordinary dependency version', (t) => {
  const x = fixture(t)
  const p = path.join(x.ds, 'package.json')
  const manifest = JSON.parse(fs.readFileSync(p))
  manifest.dependencies = { 'react-resizable-panels': '3.0.6' }
  fs.writeFileSync(p, JSON.stringify(manifest))
  x.add('react-resizable-panels', '3.0.5')
  assert.throws(
    () => assertInstalledDependencies(x.root),
    /packed dependency version mismatches/
  )
})

for (const duplicate of [false, true]) {
  test(`legacy application panels ${duplicate ? 'reject duplicate identity' : 'share library identity'}`, (t) => {
    const x = fixture(t)
    const p = path.join(x.root, 'package.json')
    const manifest = JSON.parse(fs.readFileSync(p))
    manifest.dependencies['react-resizable-panels'] = '3.0.6'
    fs.writeFileSync(p, JSON.stringify(manifest))
    x.add('react-resizable-panels', '3.0.6')
    if (duplicate) {
      x.add('react-resizable-panels', '3.0.6', path.join(x.ds, 'node_modules'))
      assert.throws(
        () => assertInstalledDependencies(x.root),
        /share the v3 runtime/
      )
    } else assert.doesNotThrow(() => assertInstalledDependencies(x.root))
  })
}
