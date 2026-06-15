import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { gotoStory, loadStoryIds, TOOLBAR_SELECTOR } from '../_support/ladle'

// Axe a11y sweep over every component story in both themes. Readme (MDX prose)
// pages are smoke-only (see tests/smoke), so they are excluded here.
const storyIds = loadStoryIds().filter((id) => !id.endsWith('--readme'))

const THEMES = ['neutral', 'uzh'] as const

// Block on serious + critical only; moderate/minor are tracked, not gated.
const BLOCKING_IMPACTS = ['serious', 'critical']

// Waive a (rule[, story]) pair with a reason. story regex matches the story id.
const ALLOWLIST: { rule: string; story?: RegExp; reason: string }[] = []

const isWaived = (ruleId: string, storyId: string) =>
  ALLOWLIST.some(
    (e) => e.rule === ruleId && (e.story ? e.story.test(storyId) : true)
  )

for (const theme of THEMES) {
  test.describe(`a11y (${theme})`, () => {
    for (const id of storyIds) {
      test(id, async ({ page }) => {
        await gotoStory(page, id, theme)

        // Full page minus the dev toolbar: in preview mode the story renders
        // outside #ladle-root, so scoping to #ladle-root would scan nothing.
        const { violations } = await new AxeBuilder({ page })
          .exclude(TOOLBAR_SELECTOR)
          .analyze()

        const blocking = violations.filter(
          (v) =>
            BLOCKING_IMPACTS.includes(v.impact ?? '') && !isWaived(v.id, id)
        )

        // Inventory marker — greppable during triage.
        for (const v of blocking) {
          console.log(`A11Y::${v.id}::${v.impact}::${id}::${theme}`)
        }

        expect(
          blocking,
          blocking.map((v) => `${v.id} (${v.impact}): ${v.help}`).join('\n')
        ).toEqual([])
      })
    }
  })
}
