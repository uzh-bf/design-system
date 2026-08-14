import fs from 'node:fs'
import path from 'node:path'

import { loadStoryIds } from '../_support/ladle'
import { assertInventoryPreflight } from './inventory-protocol'

const THEME_OPTION_PATTERN = /<option value="([^"]+)">/g

function loadConfiguredThemeOptions(): string[] {
  const componentsPath = path.join(process.cwd(), '.ladle', 'components.tsx')
  const source = fs.readFileSync(componentsPath, 'utf8')
  return [...source.matchAll(THEME_OPTION_PATTERN)].map((match) => match[1])
}

export default function globalSetup(): void {
  assertInventoryPreflight(
    loadStoryIds().filter((id) => !id.endsWith('--readme')),
    loadConfiguredThemeOptions()
  )
}
