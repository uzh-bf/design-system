import fs from 'node:fs'
import path from 'node:path'

import type { Page } from '@playwright/test'

// The Ladle dev toolbar (injected by .ladle/components.tsx) is workbench chrome,
// not a DS component — axe excludes it.
export const TOOLBAR_SELECTOR = '#ladle-theme-controls'

export type LadleTheme = 'neutral' | 'uzh'

const META_PATH = path.join(process.cwd(), 'build', 'meta.json')

/** All story ids from the built Ladle manifest. `pnpm test` builds first. */
export function loadStoryIds(): string[] {
  if (!fs.existsSync(META_PATH)) {
    throw new Error(
      `Ladle meta.json not found at ${META_PATH}. Run \`pnpm build:ladle\` first (or use \`pnpm test\`).`
    )
  }
  const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'))
  return Object.keys(meta.stories ?? {}).sort()
}

/**
 * Open a story in preview mode and wait until its content has actually mounted.
 *
 * Ladle sets `data-storyloaded` on <html>, but in preview mode the story renders
 * as a <body> child OUTSIDE #ladle-root (which only holds the dev toolbar). Both
 * waits are required: the attribute alone races ahead of the rendered content,
 * which would let axe scan an empty subtree and report a false pass.
 */
export async function gotoStory(
  page: Page,
  id: string,
  theme?: LadleTheme
): Promise<void> {
  if (theme) {
    await page.addInitScript((t) => {
      window.localStorage.setItem('ladle-theme', JSON.stringify(t))
    }, theme)
  }
  await page.goto(`?story=${id}&mode=preview`)
  await page.waitForSelector('html[data-storyloaded]', { timeout: 15_000 })
  await page
    .locator('body > :not(#ladle-root)')
    .first()
    .waitFor({ state: 'attached', timeout: 10_000 })
  // Let the component settle before asserting: fonts loaded (contrast depends on
  // the final glyphs) and two frames so mount effects that set accessible
  // names/label associations have committed. Without this, axe races the render
  // under parallel load and reports false positives (button-name, label).
  await page.evaluate(async () => {
    await document.fonts.ready
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve(null)))
    )
  })
}
