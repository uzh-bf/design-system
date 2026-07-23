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
//
// This is the known-debt baseline, measured on 2026-07-22 at commit bad9e9d,
// the first commit where the sweep actually looked at rendered stories. It is a
// ratchet, not an amnesty: the gate blocks, so nothing outside these waivers can
// regress, and each waiver is retired as its finding is fixed. Counts are
// story x theme cases at the time of measurement — 186 in total.
//
// Do not add an entry to make a build green. A new violation means new debt.
const ALLOWLIST: { rule: string; story?: RegExp; reason: string }[] = [
  {
    rule: 'aria-valid-attr-value',
    story: /^tabs--/,
    reason:
      'A11Y-17: Tabs triggers carry aria-controls pointing at panel ids that ' +
      'are not in the document. 10 cases.',
  },
  {
    rule: 'button-name',
    story:
      /^(button|collapsible|formik-switch-field|select|select-field|switch)--/,
    reason:
      'A11Y-18: icon-only triggers render without an accessible name — ' +
      'Button.Icon withoutLabel is the clearest case. 52 cases.',
  },
  {
    rule: 'label',
    story: /^(formik-pin-field|number-field|use-arrow-navigation)--/,
    reason:
      'A11Y-19: input labels are not programmatically associated. 28 cases.',
  },
  {
    rule: 'label-title-only',
    story: /^number-field--/,
    reason: 'A11Y-19: label conveyed by title attribute alone. 2 cases.',
  },
  {
    rule: 'aria-progressbar-name',
    story: /^progress--/,
    reason:
      'A11Y-20: role=progressbar with no accessible name; ui/progress sets no ' +
      'aria-label. 14 cases.',
  },
  {
    rule: 'aria-input-field-name',
    story: /^slider--/,
    reason:
      'A11Y-20: slider thumbs render without an accessible name. 14 cases.',
  },
  {
    rule: 'aria-required-children',
    story: /^(command|item|tabs)--/,
    reason:
      'A11Y-21: composite roles missing their required children, mostly where a ' +
      'wrapper sits between the container and its items. 6 cases.',
  },
  {
    rule: 'aria-required-parent',
    story: /^tabs--/,
    reason:
      'A11Y-21: tab role separated from its tablist by a wrapper. 2 cases.',
  },
  {
    rule: 'nested-interactive',
    story: /^(tabs|tooltip)--/,
    reason:
      'A11Y-21: tooltip trigger wraps an already-interactive control. 6 cases.',
  },
  {
    rule: 'scrollable-region-focusable',
    story: /^scroll-area--/,
    reason:
      'A11Y-23: ScrollArea viewport scrolls but is not keyboard focusable. ' +
      '2 cases.',
  },
  {
    rule: 'color-contrast',
    reason:
      'A11Y-22: text and UI contrast below AA in both themes (23 neutral, 31 ' +
      'uzh). The uzh half is A11Y-5/A11Y-12 and blocked on design ruling D4, so ' +
      'this one is waived rule-wide rather than per component. 54 cases.',
  },
]

const isWaived = (ruleId: string, storyId: string) =>
  ALLOWLIST.some(
    (e) => e.rule === ruleId && (e.story ? e.story.test(storyId) : true)
  )

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

        const blocking = violations.filter(
          (v) =>
            BLOCKING_IMPACTS.includes(v.impact ?? '') && !isWaived(v.id, id)
        )

        // Inventory marker — greppable during triage. Every violation is
        // logged, including the moderate and minor ones the gate lets through.
        for (const v of violations) {
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
