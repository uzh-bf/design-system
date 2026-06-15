import { expect, test } from '@playwright/test'

import { gotoStory, loadStoryIds } from '../_support/ladle'

// Smoke: every story (components + readme pages) mounts without throwing.
const storyIds = loadStoryIds()

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

      await gotoStory(page, id)

      expect(
        errors,
        `console/page errors in ${id}:\n${errors.join('\n')}`
      ).toEqual([])
    })
  }
})
