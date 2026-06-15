import fs from 'node:fs'
import path from 'node:path'

import { expect, test } from '@playwright/test'

// Enumerate every story from the built Ladle manifest. `pnpm test` builds first,
// so meta.json is present at collection time; `pnpm test:fast` reuses a prior build.
const META_PATH = path.join(process.cwd(), 'build', 'meta.json')
if (!fs.existsSync(META_PATH)) {
  throw new Error(
    `Ladle meta.json not found at ${META_PATH}. Run \`pnpm build:ladle\` first (or use \`pnpm test\`).`
  )
}
const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'))
const storyIds = Object.keys(meta.stories ?? {}).sort()

// Console errors that are environmental noise, not story defects. Extend on triage.
const IGNORED_CONSOLE = [
  /Download the React DevTools/i,
  /favicon\.ico/i,
  /\[vite\]/i,
]

test.describe('smoke: every story renders without errors', () => {
  for (const id of storyIds) {
    test(id, async ({ page }) => {
      const errors: string[] = []
      page.on('console', (msg) => {
        if (msg.type() !== 'error') return
        const text = msg.text()
        if (IGNORED_CONSOLE.some((re) => re.test(text))) return
        errors.push(text)
      })
      page.on('pageerror', (err) => errors.push(String(err)))

      await page.goto(`?story=${id}&mode=preview`)
      // Ladle sets data-storyloaded once the story mounts; a render throw never
      // reaches this point (timeout) or surfaces as a captured console/page error.
      await page.waitForSelector('html[data-storyloaded]', { timeout: 15_000 })

      expect(
        errors,
        `console/page errors in ${id}:\n${errors.join('\n')}`
      ).toEqual([])
    })
  }
})
