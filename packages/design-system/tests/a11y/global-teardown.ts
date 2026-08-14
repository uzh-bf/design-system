import {
  finalizeCoverageFile,
  finalizeInventoryFile,
} from './inventory-protocol'

export default function globalTeardown(): void {
  const outputPath = process.env.A11Y_INVENTORY_OUTPUT
  if (outputPath) finalizeInventoryFile(outputPath)
  const coveragePath = process.env.A11Y_COVERAGE_OUTPUT
  if (coveragePath) finalizeCoverageFile(coveragePath)
}
