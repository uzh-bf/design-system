import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import {
  assertInstalledDependencies,
  assertRegistryReleaseAge,
} from './assert-installed-dependencies.mjs'

const TEST_NOW = Date.parse('2026-10-20T00:00:00.000Z')
const DAY_MS = 24 * 60 * 60 * 1000
const MATURE_TIME = new Date(TEST_NOW - 15 * DAY_MS).toISOString()
const YOUNG_TIME = new Date(TEST_NOW - 60 * 60 * 1000).toISOString()

function releaseAgeLock(t, records) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-release-age-test-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const lockPath = path.join(root, 'package-lock.json')
  fs.writeFileSync(
    lockPath,
    JSON.stringify({
      lockfileVersion: 3,
      packages: {
        '': { name: 'synthetic-release-age', version: '1.0.0' },
        ...records,
      },
    })
  )
  return lockPath
}

function registryRecord(name, version, extra = {}) {
  const archive = name.split('/').at(-1)
  return {
    version,
    resolved: `https://registry.npmjs.org/${name}/-/${archive}-${version}.tgz`,
    ...extra,
  }
}

function registryMetadata(name, publishedAtByVersion) {
  return {
    versions: Object.fromEntries(
      Object.keys(publishedAtByVersion).map((version) => [
        version,
        { name, version },
      ])
    ),
    time: publishedAtByVersion,
  }
}

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

test('still rejects a mismatched ordinary dependency version', (t) => {
  const x = fixture(t)
  const p = path.join(x.ds, 'package.json')
  const manifest = JSON.parse(fs.readFileSync(p))
  manifest.dependencies = { 'react-resizable-panels': '4.14.8' }
  fs.writeFileSync(p, JSON.stringify(manifest))
  x.add('react-resizable-panels', '4.14.7')
  assert.throws(
    () => assertInstalledDependencies(x.root),
    /packed dependency version mismatches/
  )
})

for (const [name, version, label, error] of [
  [
    'react-resizable-panels',
    '4.14.8',
    'native application panels',
    /share the native v4 runtime/,
  ],
  [
    'sonner',
    '2.0.8',
    'direct application toasts',
    /share the Sonner 2 runtime/,
  ],
]) {
  for (const duplicate of [false, true]) {
    test(`${label} ${duplicate ? 'reject duplicate identity' : 'share library identity'}`, (t) => {
      const x = fixture(t)
      const p = path.join(x.root, 'package.json')
      const manifest = JSON.parse(fs.readFileSync(p))
      manifest.dependencies[name] = version
      fs.writeFileSync(p, JSON.stringify(manifest))
      x.add(name, version)
      if (duplicate) {
        x.add(name, version, path.join(x.ds, 'node_modules'))
        assert.throws(() => assertInstalledDependencies(x.root), error)
      } else assert.doesNotThrow(() => assertInstalledDependencies(x.root))
    })
  }
}

test('rejects duplicate first-party chat runtime context at the matching version', (t) => {
  const x = fixture(t)
  const p = path.join(x.root, 'package.json')
  const m = JSON.parse(fs.readFileSync(p, 'utf8'))
  m.dependencies['@shadcn/react'] = '0.3.1'
  fs.writeFileSync(p, JSON.stringify(m))
  const addNative = (base) =>
    x.add('@shadcn/react', '0.3.1', base, {
      exports: { './message-scroller': './index.js' },
    })
  addNative(x.modules)
  assert.doesNotThrow(() => assertInstalledDependencies(x.root))
  addNative(path.join(x.ds, 'node_modules'))
  assert.throws(
    () => assertInstalledDependencies(x.root),
    /share the native shadcn runtime/
  )
})

test('accepts mature deduplicated registry packages', async (t) => {
  const lockPath = releaseAgeLock(t, {
    'node_modules/mature-package': registryRecord('mature-package', '1.0.0'),
    'node_modules/parent/node_modules/mature-package': registryRecord(
      'mature-package',
      '1.0.0'
    ),
  })
  let fetches = 0
  const summary = await assertRegistryReleaseAge(lockPath, {
    now: () => TEST_NOW,
    fetchMetadata: async (name) => {
      fetches += 1
      return registryMetadata(name, { '1.0.0': MATURE_TIME })
    },
  })
  assert.equal(fetches, 1)
  assert.equal(summary.registryRecords, 2)
  assert.equal(summary.uniqueRegistryPackages, 1)
  assert.equal(summary.youngExemptions, 0)
})

test('accepts only the exact young react-resizable-panels release', async (t) => {
  const lockPath = releaseAgeLock(t, {
    'node_modules/react-resizable-panels': registryRecord(
      'react-resizable-panels',
      '4.14.8'
    ),
  })
  const summary = await assertRegistryReleaseAge(lockPath, {
    now: () => TEST_NOW,
    fetchMetadata: async (name) =>
      registryMetadata(name, { '4.14.8': YOUNG_TIME }),
  })
  assert.equal(summary.youngExemptions, 1)
})

for (const [label, recordPath, name, version, extra] of [
  [
    'other panels version',
    'node_modules/react-resizable-panels',
    'react-resizable-panels',
    '4.14.7',
    {},
  ],
  [
    'unrelated package',
    'node_modules/unrelated-young',
    'unrelated-young',
    '1.0.0',
    {},
  ],
  [
    'transitive package',
    'node_modules/parent/node_modules/transitive-young',
    'transitive-young',
    '1.0.0',
    {},
  ],
  [
    'platform package',
    'node_modules/@platform/native',
    '@platform/native',
    '1.0.0',
    { cpu: ['arm64'], os: ['darwin'], optional: true },
  ],
]) {
  test(`rejects young ${label} outside the exact exemption`, async (t) => {
    const lockPath = releaseAgeLock(t, {
      [recordPath]: registryRecord(name, version, extra),
    })
    await assert.rejects(
      assertRegistryReleaseAge(lockPath, {
        now: () => TEST_NOW,
        fetchMetadata: async (fetchedName) =>
          registryMetadata(fetchedName, { [version]: YOUNG_TIME }),
      }),
      /below minimum release age/
    )
  })
}

for (const [label, metadata, error] of [
  [
    'missing version metadata',
    { versions: {}, time: { '4.14.8': YOUNG_TIME } },
    /version metadata is missing/,
  ],
  [
    'missing publication time',
    { versions: { '4.14.8': { version: '4.14.8' } }, time: {} },
    /missing or invalid/,
  ],
  [
    'invalid publication time',
    {
      versions: { '4.14.8': { version: '4.14.8' } },
      time: { '4.14.8': 'not-a-date' },
    },
    /missing or invalid/,
  ],
  [
    'future publication time',
    {
      versions: { '4.14.8': { version: '4.14.8' } },
      time: { '4.14.8': new Date(TEST_NOW + 60_000).toISOString() },
    },
    /future/,
  ],
]) {
  test(`rejects ${label} even for the exact exemption`, async (t) => {
    const lockPath = releaseAgeLock(t, {
      'node_modules/react-resizable-panels': registryRecord(
        'react-resizable-panels',
        '4.14.8'
      ),
    })
    await assert.rejects(
      assertRegistryReleaseAge(lockPath, {
        now: () => TEST_NOW,
        fetchMetadata: async () => metadata,
      }),
      error
    )
  })
}

test('skips only root, links, and local file archives', async (t) => {
  const lockPath = releaseAgeLock(t, {
    'node_modules/local-archive': {
      version: '1.0.0',
      resolved: 'file:../local-archive.tgz',
    },
    'node_modules/linked-library': {
      resolved: '../linked-library',
      link: true,
    },
    'node_modules/mature-package': registryRecord('mature-package', '1.0.0'),
  })
  const fetched = []
  const summary = await assertRegistryReleaseAge(lockPath, {
    now: () => TEST_NOW,
    fetchMetadata: async (name) => {
      fetched.push(name)
      return registryMetadata(name, { '1.0.0': MATURE_TIME })
    },
  })
  assert.deepEqual(fetched, ['mature-package'])
  assert.equal(summary.registryRecords, 1)
  assert.equal(summary.localRecords, 2)
  assert.equal(summary.rootRecords, 1)
})

test('rejects a non-registry package source', async (t) => {
  const lockPath = releaseAgeLock(t, {
    'node_modules/unsupported': {
      version: '1.0.0',
      resolved: 'https://example.com/unsupported-1.0.0.tgz',
    },
  })
  await assert.rejects(
    assertRegistryReleaseAge(lockPath, {
      now: () => TEST_NOW,
      fetchMetadata: async () => {
        throw new Error('metadata fetch must not run')
      },
    }),
    /unsupported non-registry package source/
  )
})
