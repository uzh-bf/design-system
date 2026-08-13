import { expect, test, type Page } from '@playwright/test'

// Locks the WCAG Level A labeling/error contract for the form fields
// (TextField, NumberField, TextareaField, the Radix-based SelectField and the
// input-otp-based AlphaNumericPinField). The axe sweep in stories.spec.ts
// checks generic violations; these assertions pin
// the exact wiring that a future refactor could silently break:
//   - the label's `for` matches the input's derived id (association survives an
//     omitted `id`, since the id falls back to `useId()`)
//   - `required` is exposed programmatically via `aria-required`
//   - the error text is reachable via `aria-describedby` -> a `role="alert"` node
// These are attribute assertions (not axe), so they are deterministic and
// unaffected by the color-contrast timing flakiness seen under parallel load.

async function gotoStory(page: Page, story: string) {
  await page.goto(`?story=${story}&mode=preview`)
}

// Ladle mounts story content asynchronously after the background div resolves;
// waiting for the control to attach avoids racing ahead of the mount.
async function firstTextbox(page: Page) {
  const input = page.getByRole('textbox').first()
  await input.waitFor({ state: 'attached' })
  return input
}

async function expectLabelledById(page: Page, story: string) {
  await gotoStory(page, story)
  const input = await firstTextbox(page)
  const id = await input.getAttribute('id')
  expect(id, 'input has a derived id').toBeTruthy()
  await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1)
}

test.describe('form field labeling contract (WCAG Level A)', () => {
  test('TextField: label associates with the derived input id', async ({
    page,
  }) => {
    await expectLabelledById(page, 'text-field--default')
  })

  test('TextField: required is exposed via aria-required', async ({ page }) => {
    await gotoStory(page, 'text-field--required')
    await expect(await firstTextbox(page)).toHaveAttribute(
      'aria-required',
      'true'
    )
  })

  test('TextField: error is exposed via aria-describedby -> role=alert', async ({
    page,
  }) => {
    await gotoStory(page, 'text-field--error')
    const input = await firstTextbox(page)
    const describedby = await input.getAttribute('aria-describedby')
    expect(
      describedby,
      'aria-describedby present while error shown'
    ).toBeTruthy()
    const alert = page.locator(`[id="${describedby}"]`)
    await expect(alert).toHaveAttribute('role', 'alert')
    await expect(alert).toHaveText('This is an error message')
  })

  test('NumberField: label associates with the derived input id', async ({
    page,
  }) => {
    await expectLabelledById(page, 'number-field--labelled')
  })

  test('NumberField: preserves textbox semantics for numeric editing', async ({
    page,
  }) => {
    await gotoStory(page, 'number-field--labelled')
    const input = page.locator('input[type="text"]').first()
    await input.waitFor({ state: 'attached' })
    await expect(input).toHaveRole('textbox')
  })

  test('NumberField: required is exposed via aria-required', async ({
    page,
  }) => {
    await gotoStory(page, 'number-field--error')
    await expect(await firstTextbox(page)).toHaveAttribute(
      'aria-required',
      'true'
    )
  })

  test('TextareaField: label associates and required is exposed', async ({
    page,
  }) => {
    await gotoStory(page, 'textarea-field--required')
    const input = await firstTextbox(page)
    const id = await input.getAttribute('id')
    expect(id, 'input has a derived id').toBeTruthy()
    await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1)
    await expect(input).toHaveAttribute('aria-required', 'true')
  })

  // SelectField wraps a Radix trigger (role=combobox), not a native input: the
  // accessible name must resolve to the visible label rather than the selected
  // value, so it is asserted by name lookup rather than by htmlFor.
  test('SelectField: trigger accessible name is the visible label', async ({
    page,
  }) => {
    await gotoStory(page, 'select-field--label')
    const trigger = page.getByRole('combobox', { name: 'Label' })
    await trigger.waitFor({ state: 'attached' })
    await expect(trigger).toHaveCount(1)
  })

  test('SelectField: required is exposed via aria-required', async ({
    page,
  }) => {
    await gotoStory(page, 'select-field--required')
    const trigger = page.getByRole('combobox', { name: 'Label' })
    await trigger.waitFor({ state: 'attached' })
    await expect(trigger).toHaveAttribute('aria-required', 'true')
  })

  test('SelectField: error is exposed via aria-describedby -> role=alert', async ({
    page,
  }) => {
    await gotoStory(page, 'select-field--error')
    const trigger = page.getByRole('combobox', { name: 'Label' }).first()
    await trigger.waitFor({ state: 'attached' })
    const describedby = await trigger.getAttribute('aria-describedby')
    expect(
      describedby,
      'aria-describedby present while error shown'
    ).toBeTruthy()
    const alert = page.locator(`[id="${describedby}"]`)
    await expect(alert).toHaveAttribute('role', 'alert')
    await expect(alert).toHaveText('Error message')
  })

  // AlphaNumericPinField is built on input-otp, which renders a single real
  // input (the only textbox on the page) behind the segmented slots, so it is
  // asserted with the same native-textbox helpers as the fields above.
  test('AlphaNumericPinField: label associates with the derived input id', async ({
    page,
  }) => {
    await expectLabelledById(page, 'alpha-numeric-pin-field--default')
  })

  test('AlphaNumericPinField: required is exposed via aria-required', async ({
    page,
  }) => {
    await gotoStory(page, 'alpha-numeric-pin-field--error')
    await expect(await firstTextbox(page)).toHaveAttribute(
      'aria-required',
      'true'
    )
  })

  test('AlphaNumericPinField: error is exposed via aria-describedby -> role=alert', async ({
    page,
  }) => {
    await gotoStory(page, 'alpha-numeric-pin-field--error')
    const input = await firstTextbox(page)
    const describedby = await input.getAttribute('aria-describedby')
    expect(
      describedby,
      'aria-describedby present while error shown'
    ).toBeTruthy()
    const alert = page.locator(`[id="${describedby}"]`)
    await expect(alert).toHaveAttribute('role', 'alert')
    await expect(alert).toHaveText('Please enter 6 characters')
  })
})
