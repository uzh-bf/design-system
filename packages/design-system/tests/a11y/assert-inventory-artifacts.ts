import fs from 'node:fs'
import path from 'node:path'

import { assertCoverageCycle, assertInventoryCycle } from './inventory-protocol'

// Mirrors the four-way shard matrix of the sharded axe sweep. Each shard emits
// one inventory and one coverage file; the cycle assertions only close over the
// full set, so a partial set has to fail loudly instead of asserting a shrunken
// scan.
const SHARDS = 4

function shardPaths(
  artifactRoot: string,
  kind: 'inventory' | 'coverage'
): string[] {
  return Array.from({ length: SHARDS }, (_unused, index) =>
    path.join(artifactRoot, `a11y-${kind}-${index + 1}.jsonl`)
  )
}

function assertAllPresent(
  expectedPaths: readonly string[],
  artifactRoot: string
): void {
  const missing = expectedPaths.filter(
    (expectedPath) => !fs.existsSync(expectedPath)
  )
  if (missing.length === 0) return

  const present = fs.existsSync(artifactRoot)
    ? fs.readdirSync(artifactRoot).sort().join(', ') || '<empty directory>'
    : '<missing directory>'
  throw new Error(
    `A11Y artifacts incomplete: ${missing.length} of ${expectedPaths.length} expected files are missing\n` +
      `Missing: ${missing.map((missingPath) => path.basename(missingPath)).join(', ')}\n` +
      `Found in ${artifactRoot}: ${present}`
  )
}

function main(): void {
  const artifactRootArg = process.argv[2] ?? process.env.A11Y_ARTIFACT_DIR
  if (!artifactRootArg) {
    throw new Error(
      'Usage: tsx tests/a11y/assert-inventory-artifacts.ts <artifact-dir> (or set A11Y_ARTIFACT_DIR)'
    )
  }

  const artifactRoot = path.resolve(artifactRootArg)
  const inventoryPaths = shardPaths(artifactRoot, 'inventory')
  const coveragePaths = shardPaths(artifactRoot, 'coverage')
  assertAllPresent([...inventoryPaths, ...coveragePaths], artifactRoot)

  assertInventoryCycle(inventoryPaths, 'a11y shard artifacts')
  assertCoverageCycle(coveragePaths, 'a11y shard artifacts')
  console.log(
    `A11Y inventory protocol passed over ${SHARDS} shard artifacts in ${artifactRoot}`
  )
}

try {
  main()
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
