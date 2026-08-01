import { expect, test } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

const story = 'direct-control-refs--default'

test.describe('direct-control ref contracts', () => {
  test('focuses every public direct-control target', async ({ page }) => {
    await gotoStory(page, story)

    const cases = [
      ['focus-button', 'ref-button'],
      ['focus-text-field', 'ref-text-field'],
      ['focus-number-field', 'ref-number-field'],
      ['focus-textarea-field', 'ref-textarea-field'],
      ['focus-select', 'ref-select'],
      ['focus-combobox', 'ref-combobox'],
    ] as const

    for (const [action, target] of cases) {
      await page.locator(`[data-test="${action}"]`).click()
      await expect(page.locator(`[data-test="${target}"]`)).toBeFocused()
    }
  })

  test('keeps Select trigger selection and focus return intact', async ({
    page,
  }) => {
    await gotoStory(page, story)

    const trigger = page.locator('[data-test="ref-select"]')
    await page.locator('[data-test="focus-select"]').click()
    await expect(trigger).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('ArrowDown')
    await expect(
      page.locator('[data-slot="select-item"][data-highlighted]')
    ).toContainText('Banana')
    await page.keyboard.press('Enter')
    await expect(trigger).toContainText('Banana')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()
  })

  test('keeps Combobox selection and focus return intact', async ({ page }) => {
    await gotoStory(page, story)

    const trigger = page.locator('[data-test="ref-combobox"]')
    await page.locator('[data-test="focus-combobox"]').click()
    await expect(trigger).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const search = page.getByRole('combobox', { name: 'Search…' })
    await expect(search).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(trigger).toContainText('React')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()
  })
})
