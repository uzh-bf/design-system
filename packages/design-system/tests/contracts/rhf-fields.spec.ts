import { expect, test } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

const text = (testId: string) => `[data-test="${testId}"]`

test.describe('RHF field wrappers', () => {
  test('context mode owns text, number, select, and multi-select values', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--default')

    await expect(page.locator(text('rhf-text'))).toHaveAccessibleName('Name')
    await expect(page.locator(text('rhf-number'))).toHaveAccessibleName(
      'Amount'
    )
    await expect(page.locator(text('rhf-select'))).toHaveAccessibleName(
      'Location'
    )
    await expect(page.locator(text('rhf-multi-select'))).toHaveAccessibleName(
      'Elements'
    )

    await page.locator(text('rhf-text')).fill('Demo game')
    await page.locator(text('rhf-number')).fill('12.5')

    await page.locator(text('rhf-select')).click()
    await page.getByRole('option', { name: 'Zurich' }).click()

    await page.getByRole('button', { name: 'Elements' }).click()
    await page.getByRole('option', { name: 'Story' }).click()
    await page.keyboard.press('Escape')

    await page.locator(text('rhf-submit')).click()
    await expect(page.locator(text('rhf-submitted'))).toHaveText(
      JSON.stringify({
        name: 'Demo game',
        amount: 12.5,
        location: 'zurich',
        elements: ['story'],
      })
    )
  })

  test('number editing preserves incomplete input and reset-to-same-value semantics', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--default')
    const number = page.locator(text('rhf-number'))

    await number.fill('1.')
    await expect(number).toHaveValue('1.')

    await number.fill('-')
    await expect(number).toHaveValue('-')
    await number.blur()
    await expect(number).toHaveValue('1')

    await number.fill('1.')
    await page.locator(text('rhf-reset-same')).click()
    await expect(number).toHaveValue('1')

    await number.fill('1.')
    await page.locator(text('rhf-reset')).click()
    await expect(number).toHaveValue('42')
  })

  test('validation appears after submit and is linked to every control', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--validation')
    await page.locator(text('rhf-submit')).click()

    for (const testId of [
      'rhf-text',
      'rhf-number',
      'rhf-select',
      'rhf-multi-select',
    ]) {
      const control = page.locator(text(testId))
      const describedBy = await control.getAttribute('aria-describedby')
      expect(describedBy, `${testId} has an error description`).toBeTruthy()
      const describedByIds = describedBy?.split(/\s+/) ?? []
      const alert = page.locator(
        describedByIds.map((id) => `[id="${id}"][role="alert"]`).join(', ')
      )
      await expect(alert).toHaveCount(1)
      await expect(control).toHaveAttribute('aria-invalid', 'true')
    }
  })

  test('explicit control mode works without FormProvider context', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--explicit-control')
    await page.locator(text('rhf-text')).fill('Explicit')
    await page.locator(text('rhf-number')).fill('7')
    await page.locator(text('rhf-submit')).click()
    await expect(page.locator(text('rhf-submitted'))).toHaveText(
      JSON.stringify({
        name: 'Explicit',
        amount: 7,
        location: '',
        elements: [],
      })
    )
  })

  test('multi-select close marks the field touched without submitting', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--validation')
    await page.locator(text('rhf-multi-select')).click()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('alert')).toContainText(
      'Choose at least one element.'
    )
  })
})
