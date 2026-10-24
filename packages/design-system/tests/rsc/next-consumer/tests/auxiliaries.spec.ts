import { expect, test, type Page } from '@playwright/test'

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

const rootStorageKey = 'react-resizable-panels:packed-root-persistence'
const nativeStorageKey = 'react-resizable-panels:packed-native-persistence'

function layoutArray(value: string): number[] {
  return JSON.parse(value) as number[]
}

function layoutMap(value: string): Record<string, number> {
  return JSON.parse(value) as Record<string, number>
}

async function storedRootLayout(page: Page): Promise<number[] | null> {
  return page.evaluate((key) => {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    const records = JSON.parse(raw) as Record<string, { layout?: unknown }>
    const layout = Object.values(records)
      .map((record) => record?.layout)
      .find(Array.isArray)
    return layout ?? null
  }, rootStorageKey)
}

async function storedNativeLayout(
  page: Page
): Promise<Record<string, number> | null> {
  return page.evaluate((key) => {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as Record<string, number>) : null
  }, nativeStorageKey)
}

test('packed Panels resize both families and restore their persisted layouts', async ({
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
  await expect(rootSection).toBeVisible()
  await expect(nativeSection).toBeVisible()
  await expect(rootGroup).toHaveCSS('height', '140px')
  await expect(nativeGroup).toHaveCSS('height', '140px')
  const rootSectionBox = await rootSection.boundingBox()
  const nativeSectionBox = await nativeSection.boundingBox()
  const rootGroupBox = await rootGroup.boundingBox()
  const nativeGroupBox = await nativeGroup.boundingBox()
  expect(rootSectionBox).not.toBeNull()
  expect(nativeSectionBox).not.toBeNull()
  expect(rootGroupBox).not.toBeNull()
  expect(nativeGroupBox).not.toBeNull()
  expect(Math.abs(rootGroupBox!.width - rootSectionBox!.width)).toBeLessThan(2)
  expect(
    Math.abs(nativeGroupBox!.width - nativeSectionBox!.width)
  ).toBeLessThan(2)
  await expect(
    rootGroup.locator(':scope > #root-left[data-panel]')
  ).toHaveCount(1)

  const rootState = page.locator('[data-test="packed-root-layout-state"]')
  const nativeState = page.locator('[data-test="packed-native-layout-state"]')
  await expect
    .poll(async () => layoutArray(await rootState.innerText()))
    .toHaveLength(2)
  await expect
    .poll(async () =>
      Object.keys(layoutMap(await nativeState.innerText())).sort()
    )
    .toEqual(['native-left', 'native-right'].sort())

  await page.locator('[data-test="packed-root-resize"]').click()
  await expect
    .poll(async () => layoutArray(await rootState.innerText())[0])
    .toBeCloseTo(40, 5)
  expect(layoutArray(await rootState.innerText())[1]).toBeCloseTo(60, 5)

  await page.locator('[data-test="packed-native-resize"]').click()
  await expect
    .poll(async () => layoutMap(await nativeState.innerText())['native-left'])
    .toBeCloseTo(40, 5)
  expect(layoutMap(await nativeState.innerText())['native-right']).toBeCloseTo(
    60,
    5
  )

  await expect
    .poll(async () => {
      const layout = await storedRootLayout(page)
      return layout?.map((size) => Number(size.toFixed(2))) ?? null
    })
    .toEqual([40, 60])
  await expect
    .poll(async () => {
      const layout = await storedNativeLayout(page)
      if (!layout) return null
      return {
        keys: Object.keys(layout).sort(),
        left: Number(layout['native-left']?.toFixed(2)),
        right: Number(layout['native-right']?.toFixed(2)),
      }
    })
    .toEqual({
      keys: ['native-left', 'native-right'].sort(),
      left: 40,
      right: 60,
    })
  await page.reload()
  await expect
    .poll(async () => layoutArray(await rootState.innerText())[0])
    .toBeCloseTo(40, 5)
  expect(layoutArray(await rootState.innerText())[1]).toBeCloseTo(60, 5)
  await expect
    .poll(async () => layoutMap(await nativeState.innerText())['native-left'])
    .toBeCloseTo(40, 5)
  expect(layoutMap(await nativeState.innerText())['native-right']).toBeCloseTo(
    60,
    5
  )
  expect(errors).toEqual([])
})
