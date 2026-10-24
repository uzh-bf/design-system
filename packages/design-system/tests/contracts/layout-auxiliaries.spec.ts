import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Locator, type Page } from '@playwright/test'

import { TOOLBAR_SELECTOR, gotoStory, settle } from '../_support/ladle'

async function readJson<T>(locator: Locator): Promise<T> {
  return JSON.parse(await locator.innerText()) as T
}

async function readArray(locator: Locator): Promise<number[]> {
  return readJson<number[]>(locator)
}

async function readMap(locator: Locator): Promise<Record<string, number>> {
  return readJson<Record<string, number>>(locator)
}

async function dragWithMouse(page: Page, separator: Locator, distance: number) {
  await separator.scrollIntoViewIfNeeded()
  const box = await separator.boundingBox()
  expect(box).not.toBeNull()
  const x = box!.x + box!.width / 2
  const y = box!.y + box!.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x + distance, y, { steps: 8 })
  await page.mouse.up()
}

async function dragWithTouch(page: Page, separator: Locator, distance: number) {
  await separator.scrollIntoViewIfNeeded()
  const box = await separator.boundingBox()
  expect(box).not.toBeNull()
  const client = await page.context().newCDPSession(page)
  const x = box!.x + box!.width / 2
  const y = box!.y + box!.height / 2
  const point = (offset: number) => [
    {
      x: x + offset,
      y,
      radiusX: 12,
      radiusY: 12,
      force: 1,
      id: 1,
    },
  ]

  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: point(0),
  })
  for (const fraction of [0.25, 0.5, 0.75, 1]) {
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: point(distance * fraction),
    })
  }
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  })
  await client.detach()
}

test.describe('layout auxiliaries: Panels', () => {
  test('keeps the existing default appearance', async ({ page }) => {
    await gotoStory(page, 'resizable--default')

    const group = page.locator('[data-test="default-root-group"]')
    const left = page.locator('[data-test="default-root-left"]')
    const nested = page.locator('[data-test="default-root-nested"]')
    const top = page.locator('[data-test="default-root-top"]')
    const bottom = page.locator('[data-test="default-root-bottom"]')
    const groupBox = await group.boundingBox()
    const leftBox = await left.boundingBox()
    const nestedBox = await nested.boundingBox()
    const topBox = await top.boundingBox()
    const bottomBox = await bottom.boundingBox()

    expect(groupBox).not.toBeNull()
    expect(leftBox).not.toBeNull()
    expect(nestedBox).not.toBeNull()
    expect(topBox).not.toBeNull()
    expect(bottomBox).not.toBeNull()
    expect(Math.abs(leftBox!.width / groupBox!.width - 0.5)).toBeLessThan(0.02)
    expect(Math.abs(topBox!.height / nestedBox!.height - 0.25)).toBeLessThan(
      0.02
    )
    expect(Math.abs(bottomBox!.height / nestedBox!.height - 0.75)).toBeLessThan(
      0.02
    )
  })

  test('root keeps percentages, refs, callbacks, tags, order and nesting', async ({
    page,
  }) => {
    await gotoStory(page, 'resizable--compatibility')

    const group = page.locator('#root-story-group')
    const left = page.locator('#root-story-left')
    const right = page.locator('#root-story-right')
    const layoutState = page.locator('[data-test="root-layout-state"]')
    const nestedState = page.locator('[data-test="root-nested-layout-state"]')
    await expect.poll(async () => (await readArray(layoutState)).length).toBe(2)
    await expect.poll(async () => (await readArray(nestedState)).length).toBe(2)

    const layout = await readArray(layoutState)
    const nestedLayout = await readArray(nestedState)
    expect(layout[0]).toBeCloseTo(30, 5)
    expect(layout[1]).toBeCloseTo(70, 5)
    expect(nestedLayout[0]).toBeCloseTo(60, 5)
    expect(nestedLayout[1]).toBeCloseTo(40, 5)

    const groupBox = await group.boundingBox()
    const leftBox = await left.boundingBox()
    const rightBox = await right.boundingBox()
    expect(groupBox).not.toBeNull()
    expect(leftBox).not.toBeNull()
    expect(rightBox).not.toBeNull()
    expect(Math.abs(leftBox!.width / groupBox!.width - 0.3)).toBeLessThan(0.02)
    expect(Math.abs(rightBox!.width / groupBox!.width - 0.7)).toBeLessThan(0.02)
    await expect(group).toHaveJSProperty('tagName', 'NAV')
    await expect(left).toHaveJSProperty('tagName', 'ASIDE')
    await expect(page.locator('#root-nested-group')).toHaveJSProperty(
      'tagName',
      'SECTION'
    )

    await page.locator('[data-test="root-read-refs"]').click()
    const refLayoutState = page.locator('[data-test="root-ref-layout"]')
    await expect
      .poll(async () => (await refLayoutState.innerText()) !== 'null')
      .toBe(true)
    const refLayout = await readArray(refLayoutState)
    expect(refLayout).toHaveLength(layout.length)
    refLayout.forEach((size, index) =>
      expect(size).toBeCloseTo(layout[index]!, 5)
    )
    const refPanelState = page.locator('[data-test="root-ref-panel"]')
    await expect
      .poll(async () => (await refPanelState.innerText()) !== 'null')
      .toBe(true)
    const panelRef = await readJson<{ collapsed: boolean; size: number }>(
      refPanelState
    )
    expect(panelRef.collapsed).toBe(false)
    expect(panelRef.size).toBeCloseTo(30, 5)

    await page.locator('[data-test="root-collapse"]').click()
    await expect(page.locator('[data-test="root-collapsed"]')).toHaveText(
      'true'
    )
    await page.locator('[data-test="root-expand"]').click()
    await expect(page.locator('[data-test="root-collapsed"]')).toHaveText(
      'false'
    )
    const callbacks = await readJson<Record<string, number>>(
      page.locator('[data-test="root-callbacks"]')
    )
    expect(callbacks.collapse).toBeGreaterThanOrEqual(1)
    expect(callbacks.expand).toBeGreaterThanOrEqual(1)
    expect(callbacks.resize).toBeGreaterThanOrEqual(1)
  })

  test('native keeps v4 percentages, pixels, layout maps, refs and fallback orientation', async ({
    page,
  }) => {
    await gotoStory(page, 'resizable--native-compatibility')

    const group = page.locator('#native-units-group')
    const percentPanel = page.locator('#native-percent-panel')
    const pixelPanel = page.locator('#native-pixel-panel')
    const layoutState = page.locator('[data-test="native-units-layout-state"]')
    await expect
      .poll(async () => Object.keys(await readMap(layoutState)).sort())
      .toEqual(
        [
          'native-percent-panel',
          'native-pixel-panel',
          'native-auto-panel',
        ].sort()
      )
    const layout = await readMap(layoutState)
    expect(layout['native-percent-panel']).toBeCloseTo(30, 5)

    const groupBox = await group.boundingBox()
    const percentBox = await percentPanel.boundingBox()
    const pixelBox = await pixelPanel.boundingBox()
    expect(groupBox).not.toBeNull()
    expect(percentBox).not.toBeNull()
    expect(pixelBox).not.toBeNull()
    expect(Math.abs(percentBox!.width / groupBox!.width - 0.3)).toBeLessThan(
      0.02
    )
    expect(Math.abs(pixelBox!.width - 120)).toBeLessThanOrEqual(2)

    await page.locator('[data-test="native-read-refs"]').click()
    const refLayoutState = page.locator('[data-test="native-ref-layout"]')
    await expect
      .poll(async () => (await refLayoutState.innerText()) !== 'null')
      .toBe(true)
    const refLayout = await readMap(refLayoutState)
    expect(refLayout['native-percent-panel']).toBeCloseTo(
      layout['native-percent-panel']!,
      5
    )
    const refSizeState = page.locator('[data-test="native-ref-size"]')
    await expect
      .poll(async () => (await refSizeState.innerText()) !== 'null')
      .toBe(true)
    const refSize = await readJson<{ asPercentage: number; inPixels: number }>(
      refSizeState
    )
    expect(Math.abs(refSize.inPixels - 120)).toBeLessThanOrEqual(2)

    await page.locator('[data-test="native-collapse"]').click()
    await expect
      .poll(async () =>
        readJson<{ collapsed: boolean }>(
          page.locator('[data-test="native-collapse-state"]')
        ).then(({ collapsed }) => collapsed)
      )
      .toBe(true)
    await page.locator('[data-test="native-expand"]').click()
    await expect
      .poll(async () =>
        readJson<{ collapsed: boolean }>(
          page.locator('[data-test="native-collapse-state"]')
        ).then(({ collapsed }) => collapsed)
      )
      .toBe(false)

    await expect(page.locator('#native-nested-vertical')).toHaveCSS(
      'flex-direction',
      'column'
    )
    await expect
      .poll(async () =>
        Object.keys(
          await readMap(
            page.locator('[data-test="native-nested-layout-state"]')
          )
        ).sort()
      )
      .toEqual(['native-nested-top', 'native-nested-bottom'].sort())
    expect(
      await readJson<{ count: number }>(
        page.locator('[data-test="native-resize-events"]')
      ).then(({ count }) => count)
    ).toBeGreaterThan(0)
  })

  test('root resizes with pointer, keyboard bounds, disabled handles and RTL', async ({
    page,
  }) => {
    await gotoStory(page, 'resizable--compatibility')

    const pointerState = page.locator('[data-test="root-layout-state"]')
    const pointerBefore = await readArray(pointerState)
    await dragWithMouse(page, page.locator('#root-story-separator'), 64)
    await expect
      .poll(async () => (await readArray(pointerState))[0])
      .toBeGreaterThan(pointerBefore[0]! + 1)

    const keyboardState = pointerState
    const keyboardSeparator = page.locator('#root-story-separator')
    const keyboardBefore = await readArray(keyboardState)
    await keyboardSeparator.focus()
    await page.keyboard.press('ArrowRight')
    await expect
      .poll(async () => (await readArray(keyboardState))[0])
      .toBeCloseTo(keyboardBefore[0]! + 5, 5)
    await page.keyboard.press('Home')
    await expect.poll(async () => (await readArray(keyboardState))[0]).toBe(0)
    await page.keyboard.press('End')
    await expect.poll(async () => (await readArray(keyboardState))[0]).toBe(80)
    expect(
      (
        await readJson<Record<string, number>>(
          page.locator('[data-test="root-callbacks"]')
        )
      ).resize
    ).toBeGreaterThan(0)

    const disabledState = page.locator(
      '[data-test="root-disabled-layout-state"]'
    )
    const disabledBefore = await readArray(disabledState)
    await dragWithMouse(page, page.locator('#root-disabled-separator'), 64)
    expect(await readArray(disabledState)).toEqual(disabledBefore)

    const rtlState = page.locator('[data-test="root-rtl-layout-state"]')
    const rtlGroup = page.locator('#root-rtl-group')
    const rtlBefore = await readArray(rtlState)
    await expect(rtlGroup).toHaveAttribute('dir', 'rtl')
    await page.locator('#root-rtl-separator').focus()
    await page.keyboard.press('ArrowRight')
    await expect
      .poll(async () => (await readArray(rtlState))[0])
      .toBeLessThan(rtlBefore[0]!)
  })

  test('native resizes vertically by keyboard and honors pointer, disabled and RTL', async ({
    page,
  }) => {
    await gotoStory(page, 'resizable--native-compatibility')

    const pointerState = page.locator('[data-test="native-units-layout-state"]')
    const pointerBefore = await readMap(pointerState)
    await dragWithMouse(page, page.locator('#native-units-separator'), 56)
    await expect
      .poll(async () => (await readMap(pointerState))['native-percent-panel'])
      .toBeGreaterThan(pointerBefore['native-percent-panel']! + 1)

    const verticalState = page.locator(
      '[data-test="native-nested-layout-state"]'
    )
    const verticalBefore = await readMap(verticalState)
    await page.locator('#native-nested-separator').focus()
    await page.keyboard.press('ArrowDown')
    await expect
      .poll(async () => (await readMap(verticalState))['native-nested-top'])
      .toBeGreaterThan(verticalBefore['native-nested-top']! + 1)

    const disabledState = page.locator(
      '[data-test="native-disabled-layout-state"]'
    )
    const disabledBefore = await readMap(disabledState)
    await dragWithMouse(page, page.locator('#native-disabled-separator'), 56)
    expect(await readMap(disabledState)).toEqual(disabledBefore)

    const rtlState = page.locator('[data-test="native-rtl-layout-state"]')
    const rtlBefore = await readMap(rtlState)
    await expect(page.locator('#native-rtl-group')).toHaveAttribute(
      'dir',
      'rtl'
    )
    await page.locator('#native-rtl-separator').focus()
    await page.keyboard.press('ArrowRight')
    await expect
      .poll(async () => (await readMap(rtlState))['native-rtl-left'])
      .toBeLessThan(rtlBefore['native-rtl-left']!)
  })

  test.describe('coarse pointer', () => {
    test.use({
      hasTouch: true,
      isMobile: true,
      viewport: { width: 760, height: 960 },
    })

    test('root and native layouts resize from a touch drag', async ({
      page,
    }) => {
      await gotoStory(page, 'resizable--compatibility')
      expect(
        await page.evaluate(() => matchMedia('(pointer: coarse)').matches)
      ).toBe(true)
      const rootState = page.locator('[data-test="root-layout-state"]')
      const rootBefore = await readArray(rootState)
      await dragWithTouch(page, page.locator('#root-story-separator'), 72)
      await expect
        .poll(async () => (await readArray(rootState))[0])
        .toBeGreaterThan(rootBefore[0]! + 1)

      await gotoStory(page, 'resizable--native-compatibility')
      const nativeState = page.locator(
        '[data-test="native-units-layout-state"]'
      )
      const nativeBefore = await readMap(nativeState)
      await dragWithTouch(page, page.locator('#native-units-separator'), 72)
      await expect
        .poll(async () => (await readMap(nativeState))['native-percent-panel'])
        .toBeGreaterThan(nativeBefore['native-percent-panel']! + 1)
    })
  })

  test('restores root custom storage and native default storage after reload', async ({
    page,
  }) => {
    await gotoStory(page, 'resizable--compatibility')
    await page.evaluate(() => localStorage.clear())
    await gotoStory(page, 'resizable--compatibility')

    const rootState = page.locator('[data-test="root-layout-state"]')
    const rootBefore = await readArray(rootState)
    const rootStorageBefore = await page.evaluate(() =>
      JSON.stringify({ ...localStorage })
    )
    await page.locator('#root-story-separator').focus()
    await page.keyboard.press('ArrowRight')
    await expect
      .poll(async () => (await readArray(rootState))[0])
      .toBeGreaterThan(rootBefore[0]! + 1)
    const rootAfter = await readArray(rootState)
    await expect
      .poll(async () =>
        page.evaluate(() => JSON.stringify({ ...localStorage }))
      )
      .not.toBe(rootStorageBefore)
    expect(
      await page.evaluate(() =>
        Object.entries(localStorage).some(
          ([key, value]) =>
            key.includes('root-story-persistence') && value.length > 0
        )
      )
    ).toBe(true)
    await gotoStory(page, 'resizable--compatibility')
    const restoredRoot = await readArray(rootState)
    expect(restoredRoot[0]).toBeCloseTo(rootAfter[0]!, 5)
    expect(restoredRoot[1]).toBeCloseTo(rootAfter[1]!, 5)

    await page.evaluate(() => localStorage.clear())
    await gotoStory(page, 'resizable--native-compatibility')
    const nativeState = page.locator('[data-test="native-units-layout-state"]')
    const nativeBefore = await readMap(nativeState)
    const nativeStorageBefore = await page.evaluate(() =>
      JSON.stringify({ ...localStorage })
    )
    await page.locator('#native-units-separator').focus()
    await page.keyboard.press('ArrowRight')
    await expect
      .poll(async () => (await readMap(nativeState))['native-percent-panel'])
      .toBeGreaterThan(nativeBefore['native-percent-panel']! + 1)
    const nativeAfter = await readMap(nativeState)
    await expect
      .poll(async () =>
        page.evaluate(() => JSON.stringify({ ...localStorage }))
      )
      .not.toBe(nativeStorageBefore)
    await gotoStory(page, 'resizable--native-compatibility')
    const restored = await readMap(nativeState)
    expect(restored['native-percent-panel']).toBeCloseTo(
      nativeAfter['native-percent-panel']!,
      5
    )
  })
})

const toastOptionsStory = 'toast--sonner-options'
const toastRootThemeStory = 'toast--sonner-root-theme'
const toastProviderThemeStory = 'toast--sonner-provider-theme'

const storyControl = (page: Page, testId: string) =>
  page.locator(`[data-test="${testId}"]`)

const sonnerToast = (page: Page, testId: string) =>
  page.locator(`[data-testid="${testId}"]`)

async function showToast(
  page: Page,
  trigger: string,
  testId: string
): Promise<Locator> {
  await storyControl(page, trigger).click()
  const toast = sonnerToast(page, testId)
  await expect(toast).toBeVisible()
  await expect(toast).toHaveAttribute('data-mounted', 'true')
  return toast
}

async function seriousOrCriticalViolations(page: Page) {
  await settle(page)
  const { violations } = await new AxeBuilder({ page })
    .exclude(TOOLBAR_SELECTOR)
    .analyze()
  return violations
    .filter(({ impact }) => impact === 'serious' || impact === 'critical')
    .map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({
        target,
        failureSummary,
      })),
    }))
}

test.describe('layout auxiliaries: Sonner', () => {
  test('merges caller options and honors explicit style and icon overrides', async ({
    page,
  }) => {
    await gotoStory(page, toastOptionsStory)

    const success = await showToast(
      page,
      'show-success-toast',
      'sonner-success-toast'
    )
    const toaster = page.locator('.caller-toaster-class')
    await expect(toaster).toHaveAttribute('data-sonner-toaster', 'true')
    expect(
      await toaster.evaluate((element) =>
        (element as HTMLElement).style.getPropertyValue('--normal-bg')
      )
    ).toBe('var(--popover)')
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'light')
    await expect(success).toHaveClass(/caller-toast-class/)
    await expect(success.locator('[data-icon] svg')).toHaveCount(1)
    const defaults = await success.evaluate((element) => {
      const style = getComputedStyle(element)
      const description = element.querySelector('[data-description]')
      return {
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow,
        borderWidth: style.borderTopWidth,
        fontWeight: description
          ? getComputedStyle(description).fontWeight
          : '0',
      }
    })
    expect(parseFloat(defaults.borderRadius)).toBeCloseTo(8, 1)
    expect(defaults.boxShadow).not.toBe('none')
    expect(parseFloat(defaults.borderWidth)).toBeGreaterThan(0)
    expect(Number(defaults.fontWeight)).toBeGreaterThanOrEqual(600)

    const generic = await showToast(
      page,
      'show-generic-toast',
      'sonner-generic-toast'
    )
    await expect(generic.locator('[data-title]')).toHaveClass(
      /caller-title-class/
    )
    await expect(generic.locator('[data-content]')).toHaveClass(
      /caller-content-class/
    )
    await expect(generic.locator('[data-close-button]')).toHaveClass(
      /caller-close-class/
    )

    const unstyled = await showToast(
      page,
      'show-unstyled-toast',
      'sonner-unstyled-toast'
    )
    await expect(unstyled).toHaveAttribute('data-styled', 'false')

    await storyControl(page, 'toggle-overrides').click()
    await expect(toaster).toHaveCSS('--border-radius', '13px')
    await expect(toaster).toHaveCSS('--normal-bg', 'rgb(24 72 48)')

    const error = await showToast(
      page,
      'show-error-toast',
      'sonner-error-toast'
    )
    await expect(error).toHaveCSS('border-radius', '13px')
    await expect(error.locator('[data-test="caller-error-icon"]')).toBeVisible()
  })

  test('keeps native actions, callbacks, dismissal, reduced motion and positioning', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await gotoStory(page, toastOptionsStory)
    expect(
      await page.evaluate(
        () => matchMedia('(prefers-reduced-motion: reduce)').matches
      )
    ).toBe(true)

    await storyControl(page, 'position-top-right').click()
    await showToast(page, 'show-generic-toast', 'sonner-generic-toast')
    const toaster = page.locator('.caller-toaster-class')
    await expect(toaster).toHaveAttribute('data-sonner-toaster', 'true')
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'light')
    await expect(toaster).toHaveAttribute('data-x-position', 'right')
    await expect(toaster).toHaveAttribute('data-y-position', 'top')
    await expect(toaster).toHaveCSS('top', '12px')
    await expect(toaster).toHaveCSS('right', '12px')

    await storyControl(page, 'position-bottom-center').click()
    await expect(toaster).toHaveAttribute('data-x-position', 'center')
    await expect(toaster).toHaveAttribute('data-y-position', 'bottom')
    await expect
      .poll(async () => {
        const box = await toaster.boundingBox()
        if (!box) return Infinity
        const viewportCenter = await page.evaluate(() => innerWidth / 2)
        return Math.abs(box.x + box.width / 2 - viewportCenter)
      })
      .toBeLessThanOrEqual(1)

    await storyControl(page, 'position-default').click()
    await expect(toaster).not.toHaveCSS('right', '12px')

    const actionToast = await showToast(
      page,
      'show-action-toast',
      'sonner-action-toast'
    )
    await actionToast.getByRole('button', { name: 'Apply' }).click()
    await expect(storyControl(page, 'action-count')).toHaveText('1')
    await expect(actionToast).toBeVisible()
    await actionToast.locator('[data-close-button]').click()
    await expect(actionToast).toHaveCount(0)
    await expect(storyControl(page, 'dismiss-count')).toHaveText('1')
  })

  test('updates from the DS root dark class without remounting the toaster', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
    await gotoStory(page, toastRootThemeStory)

    const toast = await showToast(
      page,
      'trigger-root-theme-toast',
      'sonner-root-theme-toast'
    )
    const toaster = page.locator('[data-sonner-toaster]')
    await expect(toaster).toHaveAttribute('data-sonner-toaster', 'true')
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'light')
    await toaster.evaluate((element) => {
      element.setAttribute('data-compat-mount', 'initial')
    })
    await page.evaluate(() => {
      matchMedia('(prefers-color-scheme: dark)').addEventListener(
        'change',
        () => {
          document.body.dataset.osChangeObserved = 'true'
        },
        { once: true }
      )
    })
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
    await expect(page.locator('body')).toHaveAttribute(
      'data-os-change-observed',
      'true'
    )
    await settle(page)
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'light')

    await storyControl(page, 'toggle-root-dark').click()
    await expect(page.locator('html')).toHaveClass(/\bdark\b/)
    await expect(storyControl(page, 'root-dark')).toHaveText('true')
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'dark')
    await expect(toaster).toHaveAttribute('data-compat-mount', 'initial')
    await expect(toast).toBeVisible()

    await storyControl(page, 'toggle-root-dark').click()
    await expect(storyControl(page, 'root-dark')).toHaveText('false')
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'light')
    await expect(toaster).toHaveAttribute('data-compat-mount', 'initial')

    await page.emulateMedia({
      colorScheme: 'dark',
      reducedMotion: 'reduce',
    })
    await page.evaluate(() => {
      document.documentElement.removeAttribute('data-theme')
    })
    await expect(page.locator('html')).not.toHaveAttribute('data-theme')
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'dark')
    await expect(toaster).toHaveAttribute('data-compat-mount', 'initial')
    await expect(toast).toBeVisible()
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'host-theme')
    })
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'dark')
  })

  test('uses next-themes before root mode and an explicit theme before both', async ({
    page,
  }) => {
    await gotoStory(page, toastProviderThemeStory)

    const root = page.locator('html')
    await showToast(
      page,
      'trigger-provider-theme-toast',
      'sonner-provider-theme-toast'
    )
    const toaster = page.locator('[data-sonner-toaster]')
    await expect(toaster).toHaveAttribute('data-sonner-toaster', 'true')
    await expect(root).toHaveClass(/\bdark\b/)
    await expect(root).toHaveAttribute('data-theme', 'neutral')
    await expect(root).toHaveAttribute('data-next-mode', 'light')
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'light')

    await storyControl(page, 'toggle-explicit-dark').click()
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'dark')

    await storyControl(page, 'toggle-explicit-dark').click()
    await expect(toaster).toHaveAttribute('data-sonner-theme', 'light')
  })

  for (const [theme, dark] of [
    ['neutral', false],
    ['neutral', true],
    ['uzh', false],
  ] as const) {
    test(`opened toast is contained and axe-clean at 390px in ${theme}${dark ? '-dark' : '-light'}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.addInitScript(
        ({ isDark }) => {
          window.localStorage.setItem('ladle-dark', JSON.stringify(isDark))
        },
        { isDark: dark }
      )
      await gotoStory(page, toastOptionsStory, theme)

      const root = page.locator('html')
      await expect(root).toHaveAttribute('data-theme', theme)
      expect(
        await root.evaluate((element) => element.classList.contains('dark'))
      ).toBe(dark)

      const toast = await showToast(
        page,
        'show-generic-toast',
        'sonner-generic-toast'
      )
      const toaster = page.locator('.caller-toaster-class')
      await expect(toaster).toHaveAttribute('data-sonner-toaster', 'true')
      await expect(toaster).toHaveAttribute(
        'data-sonner-theme',
        dark ? 'dark' : 'light'
      )
      const box = await toast.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(390)
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth
        )
      ).toBeLessThanOrEqual(1)

      const colors = await toast.evaluate((element) => {
        const description = element.querySelector('[data-description]')
        return {
          background: getComputedStyle(element).backgroundColor,
          description: description
            ? getComputedStyle(description).color
            : 'missing',
        }
      })
      expect(colors.background).not.toBe('rgba(0, 0, 0, 0)')
      expect(colors.description).not.toBe('missing')
      expect(colors.description).not.toBe('rgba(0, 0, 0, 0)')
      expect(await seriousOrCriticalViolations(page)).toEqual([])
    })
  }
})
