import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import {
  EXACT_SERIOUS_CRITICAL_INVENTORY,
  EXPECTED_STORY_IDS,
  INVENTORY_THEMES,
  assertStoryIds,
  tupleKey,
  type A11yTheme,
  type InventoryTuple,
} from './exact-inventory'

const NORMALIZED_KEYS = ['theme', 'story', 'rule'] as const
const COVERAGE_KEYS = ['theme', 'story'] as const

type InventoryCoverage = {
  theme: A11yTheme
  story: string
}

export function assertInventoryPreflight(
  actualStoryIds: readonly string[],
  actualThemes: readonly string[]
): void {
  assertStoryIds(actualStoryIds)

  const observedThemes = [...actualThemes].sort()
  const expectedThemes = [...INVENTORY_THEMES].sort()
  if (observedThemes.join('\n') !== expectedThemes.join('\n')) {
    throw new Error(
      `A11Y theme preflight mismatch\nExpected: ${expectedThemes.join(', ')}\nObserved: ${observedThemes.join(', ')}`
    )
  }
}

function normalizedTuple(tuple: InventoryTuple): InventoryTuple {
  return {
    theme: tuple.theme,
    story: tuple.story,
    rule: tuple.rule,
  }
}

export function normalizeInventoryTuples(
  tuples: readonly InventoryTuple[]
): InventoryTuple[] {
  const normalized = tuples.map(normalizedTuple)
  const keys = normalized.map(tupleKey)
  if (new Set(keys).size !== keys.length) {
    throw new Error('A11Y inventory contains duplicate normalized tuples')
  }

  return [...normalized].sort(
    (a, b) =>
      a.theme.localeCompare(b.theme) ||
      a.story.localeCompare(b.story) ||
      a.rule.localeCompare(b.rule)
  )
}

export function inventoryLines(tuples: readonly InventoryTuple[]): string[] {
  return normalizeInventoryTuples(tuples).map((tuple) =>
    JSON.stringify({
      theme: tuple.theme,
      story: tuple.story,
      rule: tuple.rule,
    })
  )
}

export function writeInventoryFile(
  outputPath: string,
  tuples: readonly InventoryTuple[]
): void {
  const lines = inventoryLines(tuples)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, lines.length ? `${lines.join('\n')}\n` : '')
}

export function writeTestInventoryFile(
  outputPath: string,
  testId: string,
  tuples: readonly InventoryTuple[]
): void {
  const testDigest = createHash('sha256').update(testId).digest('hex')
  writeInventoryFile(`${outputPath}.raw-${testDigest}.jsonl`, tuples)
}

export function writeTestCoverageFile(
  outputPath: string,
  testId: string,
  story: string,
  theme: A11yTheme
): void {
  const testDigest = createHash('sha256').update(testId).digest('hex')
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(
    `${outputPath}.raw-${testDigest}.jsonl`,
    `${JSON.stringify({ theme, story })}\n`
  )
}

export function finalizeInventoryFile(outputPath: string): void {
  const absoluteOutputPath = path.resolve(outputPath)
  const directory = path.dirname(absoluteOutputPath)
  const prefix = `${path.basename(absoluteOutputPath)}.raw-`
  const rawPaths = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.startsWith(prefix))
    .map((entry) => path.join(directory, entry.name))
  const tuples = rawPaths.flatMap(readInventoryFile)
  writeInventoryFile(absoluteOutputPath, tuples)
}

function parseInventoryLine(line: string, lineNumber: number): InventoryTuple {
  let parsed: unknown
  try {
    parsed = JSON.parse(line)
  } catch {
    throw new Error(`Invalid A11Y inventory JSON on line ${lineNumber}`)
  }

  if (
    !parsed ||
    typeof parsed !== 'object' ||
    Object.keys(parsed).sort().join('\n') !==
      [...NORMALIZED_KEYS].sort().join('\n')
  ) {
    throw new Error(
      `A11Y inventory line ${lineNumber} must contain exactly theme, story, and rule`
    )
  }

  const tuple = parsed as Record<string, unknown>
  if (
    !INVENTORY_THEMES.includes(tuple.theme as A11yTheme) ||
    typeof tuple.story !== 'string' ||
    typeof tuple.rule !== 'string' ||
    tuple.story.length === 0 ||
    tuple.rule.length === 0
  ) {
    throw new Error(`Invalid A11Y inventory tuple on line ${lineNumber}`)
  }

  return {
    theme: tuple.theme as A11yTheme,
    story: tuple.story,
    rule: tuple.rule,
  }
}

export function readInventoryFile(inputPath: string): InventoryTuple[] {
  const content = fs.readFileSync(inputPath, 'utf8')
  if (content.length === 0) return []
  if (!content.endsWith('\n')) {
    throw new Error(
      `A11Y inventory file is missing its final newline: ${inputPath}`
    )
  }

  const lines = content.trimEnd().split('\n')
  return lines.map((line, index) => parseInventoryLine(line, index + 1))
}

function readCoverageFile(inputPath: string): InventoryCoverage[] {
  const content = fs.readFileSync(inputPath, 'utf8')
  if (content.length === 0) return []
  if (!content.endsWith('\n')) {
    throw new Error(
      `A11Y coverage file is missing its final newline: ${inputPath}`
    )
  }

  return content
    .trimEnd()
    .split('\n')
    .map((line, index) => {
      let parsed: unknown
      try {
        parsed = JSON.parse(line)
      } catch {
        throw new Error(`Invalid A11Y coverage JSON on line ${index + 1}`)
      }
      if (
        !parsed ||
        typeof parsed !== 'object' ||
        Object.keys(parsed).sort().join('\n') !==
          [...COVERAGE_KEYS].sort().join('\n')
      ) {
        throw new Error(
          `A11Y coverage line ${index + 1} must contain exactly theme and story`
        )
      }
      const record = parsed as Record<string, unknown>
      if (
        !INVENTORY_THEMES.includes(record.theme as A11yTheme) ||
        typeof record.story !== 'string' ||
        record.story.length === 0
      ) {
        throw new Error(`Invalid A11Y coverage tuple on line ${index + 1}`)
      }
      return { theme: record.theme as A11yTheme, story: record.story }
    })
}

export function expectedInventoryLines(): string[] {
  return inventoryLines(EXACT_SERIOUS_CRITICAL_INVENTORY)
}

export function assertInventoryCycle(
  shardPaths: readonly string[],
  label: string
): string {
  if (shardPaths.length !== 4) {
    throw new Error(`${label} must contain exactly four shard files`)
  }

  const observed = normalizeInventoryTuples(
    shardPaths.flatMap((shardPath) => readInventoryFile(shardPath))
  )
  const actualLines = inventoryLines(observed)
  const expectedLines = expectedInventoryLines()
  if (actualLines.join('\n') !== expectedLines.join('\n')) {
    throw new Error(
      `${label} inventory mismatch\nExpected ${expectedLines.length} tuples, observed ${actualLines.length}`
    )
  }

  return actualLines.join('\n')
}

export function assertInventoryCyclesEqual(
  first: string,
  second: string
): void {
  if (first !== second) {
    throw new Error('A11Y inventory cycles are not byte-equivalent')
  }
}

export function finalizeCoverageFile(outputPath: string): void {
  const absoluteOutputPath = path.resolve(outputPath)
  const directory = path.dirname(absoluteOutputPath)
  const prefix = `${path.basename(absoluteOutputPath)}.raw-`
  const rawPaths = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.startsWith(prefix))
    .map((entry) => path.join(directory, entry.name))
  const records = rawPaths.flatMap(readCoverageFile)
  const keys = records.map((record) => `${record.theme}|${record.story}`)
  if (new Set(keys).size !== keys.length) {
    throw new Error('A11Y coverage contains duplicate story/theme pairs')
  }
  const lines = [...records]
    .sort(
      (a, b) => a.theme.localeCompare(b.theme) || a.story.localeCompare(b.story)
    )
    .map((record) => JSON.stringify(record))
  fs.writeFileSync(
    absoluteOutputPath,
    lines.length ? `${lines.join('\n')}\n` : ''
  )
}

export function assertCoverageCycle(
  coveragePaths: readonly string[],
  label: string
): string {
  if (coveragePaths.length !== 4) {
    throw new Error(`${label} must contain exactly four coverage files`)
  }
  const records = coveragePaths.flatMap(readCoverageFile)
  const keys = records.map((record) => `${record.theme}|${record.story}`)
  if (new Set(keys).size !== keys.length) {
    throw new Error(`${label} coverage contains duplicate story/theme pairs`)
  }
  const actual = [...records]
    .sort(
      (a, b) => a.theme.localeCompare(b.theme) || a.story.localeCompare(b.story)
    )
    .map((record) => JSON.stringify(record))
  const expected = INVENTORY_THEMES.flatMap((theme) =>
    EXPECTED_STORY_IDS.map((story) => JSON.stringify({ theme, story }))
  ).sort()
  if (actual.join('\n') !== expected.join('\n')) {
    throw new Error(
      `${label} coverage mismatch\nExpected ${expected.length} story/theme pairs, observed ${actual.length}`
    )
  }
  return actual.join('\n')
}
