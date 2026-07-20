import { expect, test, type Page } from '@playwright/test'

// Locks the WCAG Level A labeling/error contract for the native-input form
// fields (TextField, NumberField, TextareaField). The axe sweep in
// stories.spec.ts checks generic violations; these assertions pin the exact
// wiring that a future refactor could silently break:
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
})
