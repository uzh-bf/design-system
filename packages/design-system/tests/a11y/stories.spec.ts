import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { gotoStory, loadStoryIds, TOOLBAR_SELECTOR } from '../_support/ladle'
import {
  assertExactStoryInventory,
  assertStoryIds,
  INVENTORY_THEMES,
  type SeriousCriticalTuple,
} from './exact-inventory'
import {
  writeTestCoverageFile,
  writeTestInventoryFile,
} from './inventory-protocol'

// Axe a11y sweep over every component story in both themes. Readme (MDX prose)
// pages are smoke-only (see tests/smoke), so they are excluded here.
const THEMES = INVENTORY_THEMES
const storyIds = loadStoryIds().filter((id) => !id.endsWith('--readme'))
assertStoryIds(storyIds)

// Block on serious + critical only; moderate/minor are tracked, not gated.
const BLOCKING_IMPACTS = ['serious', 'critical']

for (const theme of THEMES) {
  test.describe(`a11y (${theme})`, () => {
    for (const id of storyIds) {
      test(id, async ({ page }) => {
        await gotoStory(page, id, theme)

        // The whole page minus the dev toolbar. Radix portals its overlays to
        // <body>, so scoping the scan to the story subtree would miss them.
        const { violations } = await new AxeBuilder({ page })
          .exclude(TOOLBAR_SELECTOR)
          .analyze()

        const blocking = violations.filter((v) =>
          BLOCKING_IMPACTS.includes(v.impact ?? '')
        )

        const observed: SeriousCriticalTuple[] = blocking.map((v) => ({
          rule: v.id,
          impact: v.impact as SeriousCriticalTuple['impact'],
          story: id,
          theme,
        }))
        assertExactStoryInventory(observed, id, theme)
        if (process.env.A11Y_INVENTORY_OUTPUT) {
          writeTestInventoryFile(
            process.env.A11Y_INVENTORY_OUTPUT,
            test.info().testId,
            observed
          )
        }
        if (process.env.A11Y_COVERAGE_OUTPUT) {
          writeTestCoverageFile(
            process.env.A11Y_COVERAGE_OUTPUT,
            test.info().testId,
            id,
            theme
          )
        }

        // Inventory marker — greppable during triage. Every violation is
        // logged, including the moderate and minor ones the gate lets through.
        for (const v of violations) {
          console.log(`A11Y::${v.id}::${v.impact}::${id}::${theme}`)
        }
      })
    }
  })
}

// The bug this whole suite exists to catch is silent: when the mount wait
// regressed to matching Ladle's chrome, the scan ran on an empty page and every
// story "passed" with zero violations. The per-story tests above cannot detect a
// recurrence — fewer violations reads as "debt fixed," not "scan broken." This
// canary verifies that axe reaches real rendered story content by confirming
// that element-level accessibility rules (such as button-name) execute and pass
// against the rendered story tree instead of reporting an empty inapplicable scan.
test('harness canary: the scan reaches rendered story content', async ({
  page,
}) => {
  await gotoStory(page, 'button--default', 'neutral')
  const { passes } = await new AxeBuilder({ page })
    .exclude(TOOLBAR_SELECTOR)
    .analyze()
  expect(passes.map((p) => p.id)).toContain('button-name')
})
