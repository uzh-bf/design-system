import { expect, test, type Locator } from '@playwright/test'

test('application Sonner shares the DS toaster and hydrates root and explicit modes', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(String(error)))
  page.on('console', (message) => {
    if (
      message.type() === 'error' &&
      /hydrat|did not match|server rendered html/i.test(message.text())
    ) {
      errors.push(message.text())
    }
  })
  await page.goto('/')
  const toaster = page.locator('[data-sonner-toaster]')
  await page.locator('[data-test="packed-application-toast"]').click()
  await expect(toaster.locator('[data-sonner-toast]')).toHaveCount(1)
  await expect(toaster).toHaveAttribute('data-sonner-theme', 'light')
  await expect(toaster.locator('[data-sonner-toast]')).toHaveAttribute(
    'data-type',
    'success'
  )
  await page.locator('[data-test="packed-toast-toggle-root-mode"]').click()
  await expect(toaster).toHaveAttribute('data-sonner-theme', 'dark')
  await expect(toaster.locator('[data-sonner-toast]')).toHaveCount(1)
  await page.locator('[data-test="packed-toast-explicit-light"]').click()
  await expect(toaster).toHaveAttribute('data-sonner-theme', 'light')
  await expect(toaster.locator('[data-sonner-toast]')).toHaveCount(1)
  await toaster.locator('[data-close-button]').click()
  await expect(toaster.locator('[data-sonner-toast]')).toHaveCount(0)
  expect(errors).toEqual([])
})

function layoutMap(value: string): Record<string, number> {
  return JSON.parse(value) as Record<string, number>
}

async function expectLayout(
  locator: Locator,
  expected: Record<string, number>
): Promise<void> {
  await expect
    .poll(async () => Object.keys(layoutMap(await locator.innerText())).sort())
    .toEqual(Object.keys(expected).sort())
  for (const [id, value] of Object.entries(expected)) {
    await expect
      .poll(async () => layoutMap(await locator.innerText())[id])
      .toBeCloseTo(value, 1)
  }
}

async function expectPanelShare(
  group: Locator,
  panel: Locator,
  expected: number
): Promise<void> {
  await expect
    .poll(async () => {
      const [groupBox, panelBox] = await Promise.all([
        group.boundingBox(),
        panel.boundingBox(),
      ])
      return groupBox && panelBox
        ? Math.abs(panelBox.width / groupBox.width - expected)
        : Number.POSITIVE_INFINITY
    })
    .toBeLessThan(0.02)
}

test('packed Panels share native layouts and persist conditional panel sets', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(String(error)))
  page.on('console', (message) => {
    if (
      message.type() === 'error' &&
      /hydrat|did not match|server rendered html/i.test(message.text())
    ) {
      errors.push(message.text())
    }
  })

  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()

  const rootSection = page.locator('[data-test="packed-root-layout"]')
  const nativeSection = page.locator('[data-test="packed-native-layout"]')
  const rootGroup = page.locator('#packed-root-group')
  const nativeGroup = page.locator('#packed-native-group')
  const rootState = page.locator('[data-test="packed-root-layout-state"]')
  const nativeState = page.locator('[data-test="packed-native-layout-state"]')
  const rootResize = page.locator('[data-test="packed-root-resize"]')
  const toggleRootPanels = page.locator(
    '[data-test="packed-root-toggle-panels"]'
  )
  const nativeResize = page.locator('[data-test="packed-native-resize"]')
  await expect(rootSection).toBeVisible()
  await expect(nativeSection).toBeVisible()
  await expect(rootGroup).toHaveCSS('height', '140px')
  await expect(nativeGroup).toHaveCSS('height', '140px')
  await expect(rootGroup.locator(':scope > [data-panel]')).toHaveCount(2)
  await expect(
    rootGroup.locator(':scope > #root-left[data-panel]')
  ).toHaveCount(1)
  await expect(
    nativeGroup.locator(':scope > #native-left[data-panel]')
  ).toHaveCount(1)

  await expectLayout(rootState, { 'root-left': 30, 'root-right': 70 })
  await expectLayout(nativeState, {
    'native-left': 30,
    'native-right': 70,
  })
  await expectPanelShare(rootGroup, page.locator('#root-left'), 0.3)

  await rootResize.click()
  await expectLayout(rootState, { 'root-left': 40, 'root-right': 60 })
  await expectPanelShare(rootGroup, page.locator('#root-left'), 0.4)

  await nativeResize.click()
  await expectLayout(nativeState, {
    'native-left': 40,
    'native-right': 60,
  })
  await expectPanelShare(nativeGroup, page.locator('#native-left'), 0.4)

  await page.reload()
  await expectLayout(rootState, { 'root-left': 40, 'root-right': 60 })
  await expectLayout(nativeState, {
    'native-left': 40,
    'native-right': 60,
  })
  await expectPanelShare(rootGroup, page.locator('#root-left'), 0.4)
  await expectPanelShare(nativeGroup, page.locator('#native-left'), 0.4)

  await toggleRootPanels.click()
  await expectLayout(rootState, {
    'root-left': 30,
    'root-right': 50,
    'root-extra': 20,
  })
  await expect(rootGroup.locator(':scope > [data-panel]')).toHaveCount(3)
  await expectPanelShare(rootGroup, page.locator('#root-left'), 0.3)
  await expectPanelShare(rootGroup, page.locator('#root-right'), 0.5)
  await expectPanelShare(rootGroup, page.locator('#root-extra'), 0.2)

  await rootResize.click()
  await expectLayout(rootState, {
    'root-left': 20,
    'root-right': 50,
    'root-extra': 30,
  })
  await expectPanelShare(rootGroup, page.locator('#root-left'), 0.2)
  await expectPanelShare(rootGroup, page.locator('#root-right'), 0.5)
  await expectPanelShare(rootGroup, page.locator('#root-extra'), 0.3)

  await toggleRootPanels.click()
  await expectLayout(rootState, { 'root-left': 40, 'root-right': 60 })
  await expect(rootGroup.locator(':scope > [data-panel]')).toHaveCount(2)
  await expectPanelShare(rootGroup, page.locator('#root-left'), 0.4)

  await toggleRootPanels.click()
  await expectLayout(rootState, {
    'root-left': 20,
    'root-right': 50,
    'root-extra': 30,
  })
  await expectPanelShare(rootGroup, page.locator('#root-left'), 0.2)
  await expectPanelShare(rootGroup, page.locator('#root-right'), 0.5)
  await expectPanelShare(rootGroup, page.locator('#root-extra'), 0.3)

  await page.reload()
  await expectLayout(rootState, { 'root-left': 40, 'root-right': 60 })
  await expect(rootGroup.locator(':scope > [data-panel]')).toHaveCount(2)
  await expectPanelShare(rootGroup, page.locator('#root-left'), 0.4)
  await expectPanelShare(rootGroup, page.locator('#root-right'), 0.6)
  await expectLayout(nativeState, {
    'native-left': 40,
    'native-right': 60,
  })
  expect(errors).toEqual([])
})
