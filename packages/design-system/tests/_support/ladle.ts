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
/**
 * Upper bound on the font wait. Fonts are same-origin and self-hosted, so
 * `fonts.ready` resolves in well under this; the cap only matters if a face
 * never settles, so it can't turn into an unbounded hang that trips the
 * per-test timeout with no violation behind it. If it fires, the mutation
 * quiet-window below still absorbs any late font-swap reflow.
 */
const FONTS_CAP_MS = 3_000

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

const THEME_WRAPPER_SELECTOR = '#ladle-root > [data-theme]'

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
  // Attached, not visible: a story's first element can legitimately have no
  // box — Toast leads with Sonner's empty aria-live region — and waiting for
  // visibility would hang on it. Attachment means React committed; `settle`
  // below is what waits for the rest of the tree.
  await page.waitForSelector(STORY_SELECTOR, {
    state: 'attached',
    timeout: 15_000,
  })
  if (theme) {
    await expectRequestedTheme(page, theme)
  }
  await settle(page)
}

/** Confirm the Ladle provider rendered the requested theme before axe runs. */
async function expectRequestedTheme(
  page: Page,
  theme: LadleTheme
): Promise<void> {
  await page.waitForFunction(
    ({ selector, expected }) =>
      document.querySelector(selector)?.getAttribute('data-theme') === expected,
    { selector: THEME_WRAPPER_SELECTOR, expected: theme }
  )
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
    async ([idleMs, maxMs, fontsMs]) => {
      // Bounded: a face that never settles must not hang the whole test.
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => window.setTimeout(resolve, fontsMs)),
      ])
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
    [QUIET_MS, SETTLE_CAP_MS, FONTS_CAP_MS]
  )
}
