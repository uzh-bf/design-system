import { expect, test } from '@playwright/test'

test('packed application Recharts composes responsively with DS tooltip and legend', async ({
  page,
}) => {
  await page.goto('/')
  const chart = page.getByTestId('packed-chart')
  const surface = chart.locator('.recharts-surface')
  await expect(surface).toBeVisible()
  const width = (await surface.boundingBox())!.width
  expect(width).toBeGreaterThan(0)
  const legend = chart.locator('.recharts-legend-wrapper')
  await expect(legend).toBeVisible()
  expect((await legend.innerText()).trim().length).toBeGreaterThan(0)
  await expect(chart.locator('.recharts-tooltip-wrapper')).toContainText('0')
  await surface.focus()
  await page.keyboard.press('ArrowRight')
  await expect(chart.locator('.recharts-tooltip-wrapper')).toBeVisible()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect
    .poll(async () => (await surface.boundingBox())!.width)
    .toBeLessThan(width)
  expect((await surface.boundingBox())!.height).toBeGreaterThan(0)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth
    )
  ).toBe(true)
})
