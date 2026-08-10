import { expect, test } from '@playwright/test'

test('hydrates the RHF leaf and submits the field value', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('button', { name: 'Root Button' })).toBeVisible()

  await page.getByRole('textbox', { name: 'Name' }).fill('packed-rhf')
  await page.getByRole('button', { name: 'Submit RHF form' }).click()

  await expect(page.getByTestId('submitted-value')).toHaveText('packed-rhf')
})
