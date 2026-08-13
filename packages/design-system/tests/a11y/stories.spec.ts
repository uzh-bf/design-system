import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { gotoStory, loadStoryIds, TOOLBAR_SELECTOR } from '../_support/ladle'

// Axe a11y sweep over every component story in both themes. Readme (MDX prose)
// pages are smoke-only (see tests/smoke), so they are excluded here.
const THEMES = ['neutral', 'uzh'] as const
const storyIds = loadStoryIds().filter((id) => !id.endsWith('--readme'))

// Block on serious + critical only; moderate/minor are tracked, not gated.
const BLOCKING_IMPACTS = ['serious', 'critical']

// Waive a (rule[, story]) pair with a reason. story regex matches the story id.
//
// This is the known-debt baseline, measured on 2026-07-22 at commit bad9e9d,
// the first commit where the sweep actually looked at rendered stories. It is a
// ratchet, not an amnesty: the gate blocks, so nothing outside these waivers can
// regress, and each waiver is retired as its finding is fixed. The per-rule
// counts below are violation instances (story x theme); one story can carry
// several rules (tabs--tooltips carries four), so they sum to 190 — more than
// the number of distinct failing stories.
//
// Do not add an entry to make a build green. A new violation means new debt.
const ALLOWLIST: {
  rule: string
  story?: RegExp
  theme?: (typeof THEMES)[number]
  reason: string
}[] = [
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
    story:
      /^(alert|badge|button|collapsible|field|formik-number-field|formik-pin-field|formik-select-field|formik-text-field|formik-textarea-field|progress|select|step-progress|table|text-field|textarea-field|user-notification|workflow)--/,
    theme: 'neutral',
    reason:
      'A11Y-22: neutral text and UI contrast below AA (23 cases). The uzh ' +
      'status-color half was retired after D4 pairings were fixed. Scoped to ' +
      'the components that still fail today, not rule-wide, so a contrast ' +
      'regression on any other component still trips the gate.',
  },
]

const isWaived = (
  ruleId: string,
  storyId: string,
  theme: (typeof THEMES)[number]
) =>
  ALLOWLIST.some(
    (e) =>
      e.rule === ruleId &&
      (!e.theme || e.theme === theme) &&
      (e.story ? e.story.test(storyId) : true)
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
            BLOCKING_IMPACTS.includes(v.impact ?? '') &&
            !isWaived(v.id, id, theme)
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

// The bug this whole suite exists to catch is silent: when the mount wait
// regressed to matching Ladle's chrome, the scan ran on an empty page and every
// story "passed" with zero violations. The per-story tests above cannot detect a
// recurrence — fewer violations reads as "debt fixed," not "scan broken." This
// canary makes it loud: button--icon deterministically emits button-name
// (A11Y-18), so if the harness ever stops reaching real story content this fails
// instead of the whole sweep going quietly green. Retire or repoint it when
// A11Y-18 is fixed and button--icon no longer offends.
test('harness canary: the scan reaches rendered story content', async ({
  page,
}) => {
  await gotoStory(page, 'button--icon', 'neutral')
  const { violations } = await new AxeBuilder({ page })
    .exclude(TOOLBAR_SELECTOR)
    .analyze()
  expect(violations.map((v) => v.id)).toContain('button-name')
})
