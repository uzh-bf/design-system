import { expect, test } from '@playwright/test'

test('basic buttons keep their content-sized layout', async ({ page }) => {
  await page.goto('?story=button--basic-button&mode=preview')

  const button = page.getByRole('button', { name: 'Button' })
  await button.waitFor({ state: 'attached' })
  await expect(button).toHaveClass(/h-auto/)
  await expect(button).toHaveClass(/p-0/)

  const fitsContent = await button.evaluate((element) => {
    return (
      element.scrollWidth <= element.clientWidth &&
      element.scrollHeight <= element.clientHeight
    )
  })
  expect(fitsContent).toBe(true)
})
