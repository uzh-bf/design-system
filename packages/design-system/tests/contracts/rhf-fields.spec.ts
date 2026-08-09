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

    await page.getByRole('combobox', { name: 'Elements' }).click()
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

    await number.fill('.')
    await expect(number).toHaveValue('.')
    await number.blur()
    await expect(number).toHaveValue('1')

    await number.fill('-.')
    await expect(number).toHaveValue('-.')
    await number.blur()
    await expect(number).toHaveValue('1')

    await number.fill('')
    await expect(number).toHaveValue('')
    await number.fill('1')
    await page.getByRole('button', { name: 'Increase value' }).click()
    await expect(number).toHaveValue('1.50')
    await number.fill('12.5')
    await expect(number).toHaveValue('12.5')
    await number.fill('101')
    await expect(number).toHaveValue('12.5')
    await number.fill('12.345')
    await expect(number).toHaveValue('12.5')

    await number.fill('1.')
    await page.locator(text('rhf-set-value-same')).click()
    await expect(number).toHaveValue('1')

    await number.fill('1.')
    await page.locator(text('rhf-reset-field-same')).click()
    await expect(number).toHaveValue('1')

    await number.fill('1.')
    await page.locator(text('rhf-reset-same')).click()
    await expect(number).toHaveValue('1')

    await number.fill('1.')
    await page.locator(text('rhf-reset')).click()
    await expect(number).toHaveValue('42')
  })

  test('number editing accepts negative values and enforces the lower bound', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--number-range')
    const number = page.locator(text('rhf-range-number'))

    await number.fill('-3.5')
    await number.blur()
    await expect(number).toHaveValue('-3.5')
    await page.locator(text('rhf-range-submit')).click()
    await expect(page.locator(text('rhf-range-submitted'))).toHaveText(
      JSON.stringify({ amount: -3.5 })
    )

    await number.fill('-10')
    await page.locator(text('rhf-range-submit')).click()
    await expect(page.locator(text('rhf-range-submitted'))).toHaveText(
      JSON.stringify({ amount: -10 })
    )

    await page.locator(text('rhf-range-set-below-min')).click()
    await expect(number).toHaveValue('-11')
    await page.locator(text('rhf-range-submit')).click()
    await expect(page.getByRole('alert')).toContainText(
      'Amount must be at least -10.'
    )
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

  test('message-less RHF errors still mark every control invalid', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--message-less-validation')
    await page.locator(text('rhf-submit')).click()

    for (const testId of [
      'rhf-text',
      'rhf-number',
      'rhf-select',
      'rhf-multi-select',
    ]) {
      await expect(page.locator(text(testId))).toHaveAttribute(
        'aria-invalid',
        'true'
      )
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

  test('closed select blur marks the field touched', async ({ page }) => {
    await gotoStory(page, 'rhf-fields--validation')
    const select = page.locator(text('rhf-select'))

    await select.focus()
    await page.keyboard.press('Tab')

    await expect(page.getByRole('alert')).toContainText(
      'A location is required.'
    )
  })

  test('select open-close and multi-select internal focus use one blur boundary', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--validation')
    const select = page.locator(text('rhf-select'))
    const multiSelect = page.locator(text('rhf-multi-select'))

    await select.click()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('alert')).toContainText(
      'A location is required.'
    )

    await multiSelect.click()
    await page.getByPlaceholder('Search…').focus()
    await expect(
      page
        .getByRole('alert')
        .filter({ hasText: 'Choose at least one element.' })
    ).toHaveCount(0)
    await page.keyboard.press('Escape')
    await expect(
      page
        .getByRole('alert')
        .filter({ hasText: 'Choose at least one element.' })
    ).toContainText('Choose at least one element.')
  })

  test('closed composite controls notify blur once when focus leaves', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--composite-blur-contracts')

    await page.locator(text('blur-contract-select')).focus()
    await page.keyboard.press('Tab')
    await expect(page.locator(text('select-blur-count'))).toHaveText('1')

    await page.locator(text('blur-contract-multi-select')).focus()
    await page.keyboard.press('Tab')
    await expect(page.locator(text('multi-select-blur-count'))).toHaveText('1')
  })

  test('select blur fires once for Escape and pointer-outside close', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--composite-blur-contracts')
    const select = page.locator(text('blur-contract-select'))

    await select.click()
    await page.keyboard.press('Escape')
    await expect(page.locator(text('select-blur-count'))).toHaveText('1')

    await select.click()
    await page.mouse.click(5, 5)
    await expect(page.locator(text('select-blur-count'))).toHaveText('2')
  })

  test('multi-select internal focus stays open and closes with one blur', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--composite-blur-contracts')
    const multiSelect = page.locator(text('blur-contract-multi-select'))

    await multiSelect.click()
    await page.getByPlaceholder('Search elements…').focus()
    await expect(page.locator(text('multi-select-blur-count'))).toHaveText('0')
    await page.keyboard.press('Escape')
    await expect(page.locator(text('multi-select-blur-count'))).toHaveText('1')

    await multiSelect.click()
    await page.mouse.click(5, 5)
    await expect(page.locator(text('multi-select-blur-count'))).toHaveText('2')
  })

  test('caller refs focus each RHF wrapper target', async ({ page }) => {
    await gotoStory(page, 'rhf-fields--default')

    for (const [buttonId, fieldId] of [
      ['rhf-focus-text', 'rhf-text'],
      ['rhf-focus-number', 'rhf-number'],
      ['rhf-focus-select', 'rhf-select'],
      ['rhf-focus-multi-select', 'rhf-multi-select'],
    ]) {
      await page.locator(text(buttonId)).click()
      await expect(page.locator(text(fieldId))).toBeFocused()
    }
  })

  test('form-level disabled state reaches every wrapper primitive', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--disabled')

    for (const testId of [
      'rhf-text',
      'rhf-number',
      'rhf-select',
      'rhf-multi-select',
    ]) {
      await expect(page.locator(text(testId))).toBeDisabled()
    }
  })

  test('raw multi-select preserves an externally associated label', async ({
    page,
  }) => {
    await gotoStory(page, 'multi-select--external-label')
    await expect(page.getByRole('combobox', { name: 'Elements' })).toBeVisible()
  })
})
