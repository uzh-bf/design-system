import { expect, test } from '@playwright/test'

test('hydrates the RHF leaf and submits the field value', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('button', { name: 'Root Button' })).toBeVisible()

  await page.getByRole('textbox', { name: 'Name' }).fill('packed-rhf')
  await page.getByRole('button', { name: 'Submit RHF form' }).click()

  await expect(page.getByTestId('submitted-value')).toHaveText('packed-rhf')
})

test('keeps an incomplete numeric draft, normalizes it on blur, and submits the committed number', async ({
  page,
}) => {
  await page.goto('/')

  const amount = page.getByRole('textbox', { name: 'Amount' })
  await amount.fill('3.')
  await expect(amount).toHaveValue('3.')

  await amount.blur()
  await expect(amount).toHaveValue('3')

  await page.getByRole('textbox', { name: 'Name' }).fill('draft-submit')
  await page.getByRole('button', { name: 'Submit RHF form' }).click()

  await expect(page.getByTestId('submitted-value')).toHaveText('draft-submit')
  await expect(page.getByTestId('submitted-amount')).toHaveText('3')
})

test('resyncs the numeric draft when the form resets to the committed value', async ({
  page,
}) => {
  await page.goto('/')

  const amount = page.getByRole('textbox', { name: 'Amount' })
  await amount.fill('3.')
  await expect(amount).toHaveValue('3.')

  // Keep the draft focused; a real click would blur and normalize it first.
  await page
    .getByRole('button', { name: 'Reset amount to 3' })
    .dispatchEvent('click')

  await expect(amount).toHaveValue('3')
})

test('applies setValue and resetField updates to the numeric display', async ({
  page,
}) => {
  await page.goto('/')

  const amount = page.getByRole('textbox', { name: 'Amount' })
  await amount.fill('2.5')

  // Keep the draft focused; a real click would blur and normalize it first.
  await page
    .getByRole('button', { name: 'Set amount to 7' })
    .dispatchEvent('click')
  await expect(amount).toHaveValue('7')

  await page
    .getByRole('button', { name: 'Reset amount field' })
    .dispatchEvent('click')
  await expect(amount).toHaveValue('')
})

test('honors disabled toggles and the forwarded input ref', async ({
  page,
}) => {
  await page.goto('/')

  const amount = page.getByRole('textbox', { name: 'Amount' })
  await expect(amount).toBeEnabled()

  await page.getByRole('button', { name: 'Toggle amount disabled' }).click()
  await expect(amount).toBeDisabled()

  await page.getByRole('button', { name: 'Toggle amount disabled' }).click()
  await expect(amount).toBeEnabled()

  await page.getByRole('button', { name: 'Focus amount' }).click()
  await expect(amount).toBeFocused()
})

test('blocks submit and reports an error until the required name is provided', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Submit RHF form' }).click()

  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
    'aria-invalid',
    'true'
  )
  await expect(page.locator('form').getByRole('alert')).toBeVisible()
  await expect(page.getByTestId('submitted-value')).toHaveText('')

  await page.getByRole('textbox', { name: 'Name' }).fill('required-name')
  await page.getByRole('button', { name: 'Submit RHF form' }).click()

  await expect(page.getByTestId('submitted-value')).toHaveText('required-name')
})
