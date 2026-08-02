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
      'ref-collapsible',
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
      await page.keyboard.press(
        target === 'ref-collapsible' ? 'Enter' : 'Escape'
      )
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(trigger).toBeFocused()
    }

    const colorTrigger = page.locator('[data-test="ref-color-picker"]')
    await colorTrigger.focus()
    await page.keyboard.press('Enter')
    await expect(colorTrigger).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(colorTrigger).toHaveAttribute('aria-expanded', 'false')
    await expect(colorTrigger).toBeFocused()
  })

  test('preserves stateful selections and focus return', async ({ page }) => {
    await gotoStory(page, story)

    const dropdownTrigger = page.locator('[data-test="ref-dropdown"]')
    await dropdownTrigger.click()
    await page.getByRole('menuitem', { name: 'One' }).click()
    await expect(page.locator('[data-test="selected-dropdown"]')).toHaveText(
      'One'
    )
    await expect(dropdownTrigger).toBeFocused()

    const multiSelectTrigger = page.locator('[data-test="ref-multi-select"]')
    await multiSelectTrigger.click()
    await page.getByRole('option', { name: 'One' }).click()
    await expect(multiSelectTrigger).toContainText('1 selected')
    await page.keyboard.press('Escape')
    await expect(multiSelectTrigger).toBeFocused()

    const selectTrigger = page.locator('[data-test="ref-select-field"]')
    await selectTrigger.click()
    await page.getByRole('option', { name: 'One' }).click()
    await expect(selectTrigger).toContainText('One')
    await expect(selectTrigger).toHaveAttribute('aria-expanded', 'false')
    await expect(selectTrigger).toBeFocused()

    const dateCases = [
      ['ref-date-picker', 'Pick a date'],
      ['ref-date-range-picker', 'Pick a date range'],
      ['ref-date-time-picker', 'Pick a date'],
    ] as const

    for (const [target, placeholder] of dateCases) {
      const trigger = page.locator(`[data-test="${target}"]`)
      await trigger.click()
      const dayButtons = page.locator(
        '[data-slot="calendar"] button[data-day]:not([disabled])'
      )
      await dayButtons.first().click()
      if (target === 'ref-date-range-picker') {
        await dayButtons.nth(1).click()
      }
      await expect(trigger).not.toContainText(placeholder)
      await page.keyboard.press('Escape')
      await expect(trigger).toBeFocused()
    }

    const colorTrigger = page.locator('[data-test="ref-color-picker"]')
    await colorTrigger.click()
    const dialog = page.getByRole('dialog', { name: 'Pick a color' })
    await dialog.getByRole('button', { name: 'Preset color #016272' }).click()
    await dialog.locator('[data-test="submit-color-picker"]').click()
    await expect(page.locator('[data-test="selected-color"]')).toHaveText(
      '#016272'
    )
    await expect(colorTrigger).toBeFocused()
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
