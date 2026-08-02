import { expect, test } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

const story = 'composite-refs--default'

test.describe('composite ref contracts', () => {
  test('focuses every public composite target', async ({ page }) => {
    await gotoStory(page, story)

    const cases = [
      ['focus-checkbox', '[data-test="ref-checkbox"]'],
      ['focus-switch', '[data-test="ref-switch"]'],
      ['focus-slider', '[data-test="ref-slider"]'],
      ['focus-collapsible', '[data-test="ref-collapsible"]'],
      ['focus-dropdown', '[data-test="ref-dropdown"]'],
      ['focus-multi-select', '[data-test="ref-multi-select"]'],
      ['focus-select-field', '[data-test="ref-select-field"]'],
      ['focus-pin', '#ref-pin'],
      ['focus-color-picker', '[data-test="ref-color-picker"]'],
      ['focus-date-picker', '[data-test="ref-date-picker"]'],
      ['focus-date-range-picker', '[data-test="ref-date-range-picker"]'],
      ['focus-date-time-picker', '[data-test="ref-date-time-picker"]'],
    ] as const

    for (const [action, target] of cases) {
      await page.locator(`[data-test="${action}"]`).click()
      await expect(page.locator(target)).toBeFocused()
    }
  })

  test('keeps stateful trigger focus and dismissal behavior intact', async ({
    page,
  }) => {
    await gotoStory(page, story)

    const cases = [
      'ref-dropdown',
      'ref-multi-select',
      'ref-select-field',
      'ref-date-picker',
      'ref-date-range-picker',
      'ref-date-time-picker',
    ] as const

    for (const target of cases) {
      const trigger = page.locator(`[data-test="${target}"]`)
      await trigger.focus()
      await expect(trigger).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await page.keyboard.press('Escape')
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(trigger).toBeFocused()
    }
  })

  test('resets Table sorting through the imperative ref', async ({ page }) => {
    await gotoStory(page, 'table--reset-table')

    const countHeader = page.getByRole('columnheader', { name: 'Count' })
    const countButton = page.getByRole('button', { name: 'Count' })
    await expect(countHeader).toHaveAttribute('aria-sort', 'none')

    await countButton.click()
    await expect(countHeader).toHaveAttribute('aria-sort', 'ascending')

    await page.locator('[data-test="reset-table"]').click()
    await expect(countHeader).toHaveAttribute('aria-sort', 'none')
  })
})
