/* global process, URL */

import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { renamePaletteUtilities } from '../../scripts/rename-palette-utilities.mjs'

test('renames static class utilities while preserving variants, rungs and modifiers', () => {
  const input = `<div className="bg-uzh-red-100 hover:!text-uzh-yellow-80/50 [data-active]:border-x-uzh-grey-20! [&[data-open=true]]:ring-uzh-turqoise-60 -fill-uzh-darkgreen-40 stroke-uzh-lightgreen">`
  const result = renamePaletteUtilities(input)
  assert.equal(
    result.code,
    `<div className="bg-uzh-orange-100 hover:!text-uzh-gold-80/50 [data-active]:border-x-df-grey-20! [&[data-open=true]]:ring-uzh-cyan-60 -fill-df-darkgreen-40 stroke-uzh-apple">`
  )
  assert.equal(result.changes, 6)
  assert.deepEqual(result.unsupported, [])
  assert.equal(renamePaletteUtilities(result.code).changes, 0)
})

test('preserves non-utility identifiers, attribute values, comments and unmatched rungs', () => {
  const input = `const name = 'uzh-red-100'; <div onClick={() => act()} id="bg-uzh-red-100" data-test="text-uzh-grey" title="text-uzh-grey" class="bg-uzh-red-900 bg-uzh-blue-100 bg-uzh-red-100-label"/> // 'bg-uzh-red-100'`
  assert.equal(renamePaletteUtilities(input).code, input)
})

test('rewrites CSS apply lists and ordinary static utility strings', () => {
  const result = renamePaletteUtilities(
    `.a { @apply\n focus:bg-uzh-grey-40 text-uzh-red; } const classes = 'dark:decoration-uzh-yellow-20 ring-offset-uzh-turqoise-100/25'`
  )
  assert.equal(
    result.code,
    `.a { @apply\n focus:bg-df-grey-40 text-uzh-orange; } const classes = 'dark:decoration-uzh-gold-20 ring-offset-uzh-cyan-100/25'`
  )
})

test('reports dynamic and arbitrary expressions without partially rewriting them', () => {
  const input =
    'const classes = `bg-uzh-red-${level} text-uzh-grey-80`; const value = "bg-[var(--uzh-red-100)]"'
  const result = renamePaletteUtilities(input)
  assert.equal(result.code, input)
  assert.equal(result.unsupported.length, 2)
})

test('CLI defaults to dry run and writes only when explicitly requested', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'palette-rename-'))
  const file = path.join(directory, 'fixture.tsx')
  const cli = fileURLToPath(
    new URL('../../scripts/rename-palette-utilities.mjs', import.meta.url)
  )
  try {
    writeFileSync(file, '<div className="bg-uzh-red-100" />')
    const before = readFileSync(file)
    execFileSync(process.execPath, [cli, file])
    assert.deepEqual(readFileSync(file), before)
    execFileSync(process.execPath, [cli, '--write', file])
    assert.equal(
      readFileSync(file, 'utf8'),
      '<div className="bg-uzh-orange-100" />'
    )
    const changed = readFileSync(file)
    execFileSync(process.execPath, [cli, '--write', file])
    assert.deepEqual(readFileSync(file), changed)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
