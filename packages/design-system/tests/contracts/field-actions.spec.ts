import { expect, test } from '@playwright/test'

import { STORY_SELECTOR, gotoStory } from '../_support/ladle'

const themes = ['neutral', 'uzh'] as const

test.describe('field actions and state contracts', () => {
  for (const theme of themes) {
    test(`${theme} keeps actionable field icons keyboard-operable`, async ({
      page,
    }) => {
      await gotoStory(page, 'field-actions-contract--default', theme)
      const story = page.locator(STORY_SELECTOR)
      const input = story.locator('[data-test="field-actions-input"]')
      const action = story.getByRole('button', { name: 'Run search' })

      await expect(action).toHaveAttribute('type', 'button')
      await expect(action).toBeEnabled()

      await action.click()
      await expect(
        story.locator('[data-test="field-actions-count"]')
      ).toHaveText('1')

      await action.focus()
      await page.keyboard.press('Enter')
      await action.focus()
      await page.keyboard.press('Space')
      await expect(
        story.locator('[data-test="field-actions-count"]')
      ).toHaveText('3')
      await expect(
        story.locator('[data-test="field-actions-submit-count"]')
      ).toHaveText('0')

      await input.fill('value')
      const reset = story.getByRole('button', { name: 'Clear search' })
      await expect(reset).toHaveAttribute('type', 'button')

      await reset.focus()
      await page.keyboard.press('Enter')
      await expect(
        story.locator('[data-test="field-resets-count"]')
      ).toHaveText('1')

      await input.fill('value')
      await story.getByRole('button', { name: 'Clear search' }).press('Space')
      await expect(
        story.locator('[data-test="field-resets-count"]')
      ).toHaveText('2')
      await expect(input).toHaveValue('')
      await expect(
        story.locator('[data-test="field-actions-submit-count"]')
      ).toHaveText('0')
    })

    test(`${theme} exposes an enabled left action through keyboard tab order`, async ({
      page,
    }) => {
      await gotoStory(page, 'field-actions-contract--default', theme)
      const story = page.locator(STORY_SELECTOR)
      const input = story.locator('[data-test="field-actions-left-input"]')
      const action = story.getByRole('button', { name: 'Run left action' })

      await input.press('Tab')
      await expect(action).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(
        story.locator('[data-test="field-actions-left-count"]')
      ).toHaveText('1')

      await page.keyboard.press('Space')
      await expect(
        story.locator('[data-test="field-actions-left-count"]')
      ).toHaveText('2')
      await expect(
        story.locator('[data-test="field-actions-submit-count"]')
      ).toHaveText('0')
    })

    test(`${theme} preserves decorative icons and disabled action state`, async ({
      page,
    }) => {
      await gotoStory(page, 'field-actions-contract--default', theme)
      const story = page.locator(STORY_SELECTOR)

      const decorative = story.locator('[data-test="field-actions-decorative"]')
      await expect(decorative.locator('svg')).toHaveCount(1)
      await expect(decorative.getByRole('button')).toHaveCount(0)

      await expect(
        story.getByRole('button', { name: 'Disabled action' })
      ).toBeDisabled()
      await expect(
        story.getByRole('button', { name: 'Disabled reset' })
      ).toBeDisabled()

      await story
        .getByRole('button', { name: 'Disabled action' })
        .press('Enter')
      await story.getByRole('button', { name: 'Disabled reset' }).press('Space')
      await expect(
        story.locator('[data-test="field-actions-disabled-count"]')
      ).toHaveText('0')
      await expect(
        story.locator('[data-test="field-actions-disabled-reset-count"]')
      ).toHaveText('0')
    })

    test(`${theme} derives select invalid state independently of hidden errors`, async ({
      page,
    }) => {
      await gotoStory(page, 'field-actions-contract--default', theme)
      const story = page.locator(STORY_SELECTOR)

      await expect(
        story.locator('[data-test="field-actions-hidden-error"]')
      ).toHaveAttribute('aria-invalid', 'true')
      await expect(
        story.locator('[data-test="field-actions-invalid-override"]')
      ).not.toHaveAttribute('aria-invalid', 'true')
    })
  }
})
