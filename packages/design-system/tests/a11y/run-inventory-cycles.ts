import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'

import {
  assertCoverageCycle,
  assertInventoryCycle,
  assertInventoryCyclesEqual,
} from './inventory-protocol'

const PORT = 61011
const SHARDS = 4

function run(
  command: string,
  args: string[],
  cwd: string,
  env: NodeJS.ProcessEnv
): void {
  const result = spawnSync(command, args, {
    cwd,
    env,
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} exited with ${result.status}`)
  }
}

function assertPortFree(): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({
      host: '127.0.0.1',
      port: PORT,
    })
    socket.once('connect', () => {
      socket.destroy()
      reject(new Error(`Port ${PORT} is already in use`))
    })
    socket.once('error', (error: NodeJS.ErrnoException) => {
      socket.destroy()
      if (error.code === 'ECONNREFUSED') resolve()
      else reject(error)
    })
  })
}

async function runCycle(
  packageRoot: string,
  outputRoot: string,
  cycle: number
): Promise<{ inventory: string; coverage: string }> {
  const cycleRoot = path.join(outputRoot, `cycle-${cycle}`)
  fs.mkdirSync(cycleRoot)
  run('pnpm', ['run', 'build:ladle'], packageRoot, {
    ...process.env,
    CI: 'true',
  })

  const shardPaths: string[] = []
  const coveragePaths: string[] = []
  for (let shard = 1; shard <= SHARDS; shard += 1) {
    await assertPortFree()
    const outputPath = path.join(cycleRoot, `shard-${shard}.jsonl`)
    const coveragePath = path.join(cycleRoot, `shard-${shard}.coverage.jsonl`)
    shardPaths.push(outputPath)
    coveragePaths.push(coveragePath)
    run(
      'pnpm',
      [
        'exec',
        'playwright',
        'test',
        'tests/a11y',
        `--shard=${shard}/${SHARDS}`,
      ],
      packageRoot,
      {
        ...process.env,
        CI: 'true',
        PWTEST_SKIP_BUILD: '1',
        A11Y_PREFLIGHT: '1',
        A11Y_INVENTORY_OUTPUT: outputPath,
        A11Y_COVERAGE_OUTPUT: coveragePath,
      }
    )
    if (!fs.existsSync(outputPath) || !fs.existsSync(coveragePath)) {
      throw new Error(`Shard ${shard}/${SHARDS} did not produce ${outputPath}`)
    }
  }

  return {
    inventory: assertInventoryCycle(shardPaths, `cycle-${cycle}`),
    coverage: assertCoverageCycle(coveragePaths, `cycle-${cycle}`),
  }
}

async function main(): Promise<void> {
  const outputRootArg = process.argv[2]
  if (!outputRootArg) {
    throw new Error(
      'Usage: tsx tests/a11y/run-inventory-cycles.ts <empty-output-dir>'
    )
  }
  const outputRoot = path.resolve(outputRootArg)
  if (fs.existsSync(outputRoot)) {
    throw new Error(`Output directory already exists: ${outputRoot}`)
  }
  fs.mkdirSync(outputRoot)

  const first = await runCycle(process.cwd(), outputRoot, 1)
  const second = await runCycle(process.cwd(), outputRoot, 2)
  assertInventoryCyclesEqual(first.inventory, second.inventory)
  assertInventoryCyclesEqual(first.coverage, second.coverage)
  console.log(
    `A11Y inventory protocol passed: two byte-equivalent four-shard cycles at ${outputRoot}`
  )
}

void main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
