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

test('packed basic adapters hydrate, submit typed values and retain PIN leading zeros', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('packed')
  await page.getByRole('textbox', { name: 'Notes', exact: true }).fill('A note')
  const toggle = page.getByRole('switch', { name: 'Enabled', exact: true })
  const geometry = await toggle.evaluate((element) => ({
    width: element.getBoundingClientRect().width,
    height: element.getBoundingClientRect().height,
    computedWidth: getComputedStyle(element).width,
    computedHeight: getComputedStyle(element).height,
    spacing: getComputedStyle(element).getPropertyValue('--spacing'),
    display: getComputedStyle(element).display,
  }))
  expect(geometry.width, JSON.stringify(geometry)).toBeGreaterThan(0)
  expect(geometry.height, JSON.stringify(geometry)).toBeGreaterThan(0)
  await toggle.click()
  await page
    .getByRole('textbox', { name: 'Numeric PIN', exact: true })
    .fill('0012')
  await page
    .getByRole('textbox', { name: 'Access code', exact: true })
    .fill('ab12')
  await page.getByRole('button', { name: 'Submit RHF form' }).click()
  await expect(page.getByTestId('all-values')).toHaveText(
    JSON.stringify({
      name: 'packed',
      amount: '',
      notes: 'A note',
      enabled: true,
      pin: '0012',
      code: 'AB12',
      color: '#0028a5',
      location: '',
      elements: [],
    })
  )
})

test('packed picker and selection compositions preserve all-family submitted values', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .getByRole('textbox', { name: 'Name', exact: true })
    .fill('all-families')
  await page.getByRole('button', { name: 'Set dates', exact: true }).click()
  await page.getByRole('button', { name: 'Color', exact: true }).click()
  await page.locator('[data-test="packed-color-hex"]').fill('bf0d3e')
  await page.getByRole('button', { name: 'Apply color', exact: true }).click()
  await page.getByRole('combobox', { name: 'Location', exact: true }).click()
  await page.getByRole('option', { name: 'Zurich', exact: true }).click()
  await page.getByRole('combobox', { name: 'Elements', exact: true }).click()
  await page.getByRole('option', { name: 'Event', exact: true }).click()
  await page.keyboard.press('Escape')
  await page
    .getByRole('button', { name: 'Submit RHF form', exact: true })
    .click()
  const values = JSON.parse(await page.getByTestId('all-values').innerText())
  expect(values.color.toLowerCase()).toBe('#bf0d3e')
  expect(values.location).toBe('zurich')
  expect(values.elements).toEqual(['event'])
  expect(new Date(values.day).getDate()).toBe(15)
  expect(new Date(values.timestamp).getHours()).toBe(9)
})

test('native select composes through the server root entry', async ({
  page,
}) => {
  await page.goto('/')
  const select = page.getByRole('combobox', {
    name: 'Server-rendered native selection',
  })
  await expect(select).toHaveValue('one')
  await select.selectOption('two')
  await expect(select).toHaveValue('two')
})
