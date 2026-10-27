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
  const jsx = `<p>Don't worry</p>
<div className="bg-uzh-red p-2" aria-label="Pick text-uzh-grey or not" title="Use text-uzh-grey here" />
<p>It's fine</p>`
  const renamed = renamePaletteUtilities(jsx)
  assert.equal(renamed.code, jsx.replace('bg-uzh-red p-2', 'bg-uzh-orange p-2'))
  assert.equal(renamed.changes, 1)
  assert.equal(renamed.unsupported.length, 2)
  const possessive = `<p>The students' grades and 'text-uzh-grey' examples. Read: 'text-uzh-grey'. const classes = 'text-uzh-grey'</p>
<div className="bg-uzh-red p-2" aria-label="Pick text-uzh-grey or not" />
<p>The teachers' notes</p>`
  const preserved = renamePaletteUtilities(possessive)
  assert.equal(
    preserved.code,
    possessive.replace('bg-uzh-red p-2', 'bg-uzh-orange p-2')
  )
  assert.equal(preserved.changes, 1)
  assert.equal(preserved.unsupported.length, 1)
})

test('renames static class strings in JSX conditions and preserves rejected values', () => {
  const conditional =
    "<div className={count > 1 ? 'bg-uzh-red-100' : 'bg-uzh-grey-100'} />"
  const renamed = renamePaletteUtilities(conditional)
  assert.equal(
    renamed.code,
    "<div className={count > 1 ? 'bg-uzh-orange-100' : 'bg-df-grey-100'} />"
  )
  assert.equal(renamed.changes, 2)
  assert.deepEqual(renamed.unsupported, [])

  for (const input of [
    ...['&&', '||', '??'].map(
      (operator) => `<div className={active ${operator} 'bg-uzh-red-100'} />`
    ),
    "useState<string>('')\nconst cls = 'bg-uzh-red-100'",
    "<div />\nconst cls = 'bg-uzh-red-100'",
    "<div></div>\nconst cls = 'bg-uzh-red-100'",
  ]) {
    const result = renamePaletteUtilities(input)
    assert.equal(result.code, input.replace('bg-uzh-red', 'bg-uzh-orange'))
    assert.equal(result.changes, 1)
    assert.deepEqual(result.unsupported, [])
    assert.equal(renamePaletteUtilities(result.code).changes, 0)
  }

  const rejected = `<div title='<span class="bg-uzh-red-100">' />`
  const preserved = renamePaletteUtilities(rejected)
  assert.equal(preserved.code, rejected)
  assert.equal(preserved.changes, 0)
  assert.deepEqual(preserved.unsupported, [
    { offset: rejected.indexOf("'"), reason: 'ambiguous quote context' },
  ])
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
  const assignment = "classes = 'bg-uzh-red-100'"
  const ambiguous = renamePaletteUtilities(assignment)
  assert.equal(ambiguous.code, assignment)
  assert.equal(ambiguous.changes, 0)
  assert.equal(ambiguous.unsupported.length, 1)
  const unterminated = "const classes = 'bg-uzh-red-100"
  const incomplete = renamePaletteUtilities(unterminated)
  assert.equal(incomplete.code, unterminated)
  assert.equal(incomplete.changes, 0)
  assert.equal(incomplete.unsupported.length, 1)
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
