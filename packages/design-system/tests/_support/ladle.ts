import fs from 'node:fs'
import path from 'node:path'

import type { Page } from '@playwright/test'

// The Ladle dev toolbar (injected by .ladle/components.tsx) is workbench chrome,
// not a DS component — axe excludes it.
export const TOOLBAR_SELECTOR = '#ladle-theme-controls'

export type LadleTheme = 'neutral' | 'uzh'

const META_PATH = path.join(process.cwd(), 'build', 'meta.json')

/** No DOM mutation for this long counts as rendered. */
const QUIET_MS = 150
/** Upper bound, for stories that never stop mutating. */
const SETTLE_CAP_MS = 2_500

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
 * The story itself: a child of the themed wrapper inside #ladle-root that is
 * not the dev toolbar. Ladle mounts the toolbar first and the story second.
 */
const STORY_SELECTOR = `#ladle-root > [data-theme] > :not(${TOOLBAR_SELECTOR})`

/**
 * Open a story in preview mode and wait until its content has actually mounted.
 *
 * Ladle sets `data-storyloaded` on <html> as soon as the story module resolves,
 * which is roughly half a second before the story renders. Waiting on the story
 * element itself is what closes that gap — without it axe scans a page holding
 * nothing but Ladle's own chrome and reports whatever half-built tree it finds.
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
  await page.waitForSelector(STORY_SELECTOR, { timeout: 15_000 })
  await settle(page)
}

/**
 * Block until the story has stopped changing.
 *
 * A fixed frame count is not enough: under parallel workers the render can span
 * many frames, and axe then scans a half-built tree. That reads as a real
 * finding — a progressbar whose formatter text has not landed yet has no
 * accessible name, an input whose label has not mounted yet is unlabelled — so
 * the sweep fails on components that are perfectly fine.
 *
 * Fonts first (self-hosted since THEME-7, so no third-party CDN to stall on;
 * axe's colour-contrast rule needs the real face, not the fallback), then a
 * quiet window with no DOM mutations. Components that tick forever, such as
 * `Countdown` at `intervalDelay={0}`, never go quiet — the cap releases those.
 */
async function settle(page: Page): Promise<void> {
  await page.evaluate(
    async ([idleMs, maxMs]) => {
      await document.fonts.ready
      await new Promise<void>((resolve) => {
        let quiet: number
        const observer = new MutationObserver(() => {
          clearTimeout(quiet)
          quiet = window.setTimeout(stop, idleMs)
        })
        const cap = window.setTimeout(stop, maxMs)
        function stop() {
          clearTimeout(quiet)
          clearTimeout(cap)
          observer.disconnect()
          resolve()
        }
        observer.observe(document.body, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
        })
        quiet = window.setTimeout(stop, idleMs)
      })
    },
    [QUIET_MS, SETTLE_CAP_MS]
  )
}
