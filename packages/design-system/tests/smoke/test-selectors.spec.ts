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

    // The list root deliberately carries no single ambiguous selector.
    const listRoots = page.getByRole('list')
    await expect(listRoots.first()).not.toHaveAttribute('data-cy', /.*/)
  })
})
