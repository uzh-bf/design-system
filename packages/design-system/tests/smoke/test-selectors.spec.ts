import { expect, test } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

const story = 'public-contracts--default'

// The v5 selector contract: `data={{ cy, test }}` renders `data-cy`/`data-test`
// on the element a test would actually drive. For Table that is the composite
// root; for Workflow it is each step's own button, never the decorative `<li>`
// or the Tooltip wrapper.
test.describe('selector contract', () => {
  test('renders Table selectors on the composite root', async ({ page }) => {
    await gotoStory(page, story)

    const table = page.locator('[data-cy="contract-table"]')
    await expect(table).toHaveCount(1)
    await expect(table).toHaveAttribute('data-test', 'contract-table')
    // The root is the wrapper that owns the table, not the <table> itself.
    await expect(table.locator('table')).toHaveCount(1)
    await expect(
      page.getByRole('table', { name: 'Contract table' })
    ).toBeVisible()

    // Sorting stays discoverable by role and keeps working under the rename.
    const sortHeader = page.getByRole('columnheader', { name: 'Count' })
    await expect(sortHeader).toHaveAttribute('aria-sort', 'none')
    await sortHeader.getByRole('button').click()
    await expect(sortHeader).toHaveAttribute('aria-sort', 'ascending')
    await expect(page.locator('[data-cy="contract-table"] tbody tr').first()) //
      .toContainText('First')
  })

  test('renders Workflow step selectors on each step button', async ({
    page,
  }) => {
    await gotoStory(page, story)

    const cases = [
      'contract-step-plain',
      'contract-step-tooltip',
      'contract-step-disabled',
      'contract-progress-step',
      'contract-progress-tooltip',
    ] as const

    for (const selector of cases) {
      const step = page.locator(`[data-cy="${selector}"]`)
      await expect(step).toHaveCount(1)
      await expect(step).toHaveAttribute('data-test', selector)
      // The selector-bearing element is the button itself in every branch,
      // including the tooltip path where a Radix trigger wraps the content.
      await expect(step).toHaveJSProperty('tagName', 'BUTTON')
    }

    // A disabled step keeps the selector on its focusable button so the
    // disabled-state tooltip stays reachable.
    const disabled = page.locator('[data-cy="contract-step-disabled"]')
    await expect(disabled).toHaveAttribute('aria-disabled', 'true')
    await disabled.focus()
    await expect(disabled).toBeFocused()

    // The list roots deliberately carry no single ambiguous selector. Anchor on
    // the workflows themselves rather than document order, so adding another
    // list to this shared contract story cannot silently retarget the guard.
    const listRoots = page.locator(
      'ol:has([data-cy^="contract-step"]), ol:has([data-cy^="contract-progress"])'
    )
    await expect(listRoots).toHaveCount(2)
    for (const root of await listRoots.all()) {
      await expect(root).not.toHaveAttribute('data-cy', /.*/)
      await expect(root).not.toHaveAttribute('data-test', /.*/)
    }
  })

  test('renders root selectors on the picker and calendar roots', async ({
    page,
  }) => {
    await gotoStory(page, story)

    // Four of the five are popover-based. Their root selector sits on the
    // wrapper outside the popover content, so it must be present and visible
    // without opening anything.
    const roots = [
      'contract-calendar',
      'contract-colorpicker',
      'contract-datepicker',
      'contract-daterangepicker',
      'contract-datetimepicker',
    ] as const

    for (const selector of roots) {
      const root = page.locator(`[data-cy="${selector}"]`)
      await expect(root).toHaveCount(1)
      await expect(root).toHaveAttribute('data-test', selector)
      await expect(root).toBeVisible()
    }
  })

  test('keeps the picker root selector off the calendar in the popover', async ({
    page,
  }) => {
    await gotoStory(page, story)

    // The root `data` is destructured in DatePicker, so it must not reach the
    // Calendar through the residual `{...props}` spread. If it leaks, the
    // selector renders inside the popover instead of on the root.
    const root = page.locator('[data-cy="contract-datepicker"]')
    await expect(root).toHaveCount(1)
    await expect(root.locator('[data-cy="contract-datepicker"]')).toHaveCount(0)

    // Opening the popover shows the per-element `dataCalendar` selector, which
    // still wins on the calendar it names. This is the precedence guard: an
    // explicit data-cy attribute beats the root prop on that element, and the
    // root prop must not overwrite it.
    await root.getByRole('button').first().click()
    const calendar = page.locator('[data-cy="contract-datepicker-calendar"]')
    await expect(calendar).toHaveCount(1)
    await expect(calendar).toHaveAttribute(
      'data-test',
      'contract-datepicker-calendar'
    )
    await expect(calendar).not.toHaveAttribute('data-cy', 'contract-datepicker')
  })

  test('renders the ColorPicker hex input selector as data-test', async ({
    page,
  }) => {
    await gotoStory(page, story)

    // Regression guard for the misspelled `data-text` that shipped from
    // f7cd6d65: the value is typed correctly but never reached the DOM.
    const trigger = page.locator('[data-cy="contract-colorpicker"]')
    await trigger
      .getByRole('button', { name: 'Contract colour picker' })
      .click()

    const hexInput = page.locator('[data-cy="contract-hex-input"]')
    await expect(hexInput).toHaveCount(1)
    await expect(hexInput).toHaveAttribute('data-test', 'contract-hex-input')
    await expect(hexInput).not.toHaveAttribute('data-text', /.*/)
  })
})
