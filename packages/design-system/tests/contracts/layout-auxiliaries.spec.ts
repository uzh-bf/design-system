import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Locator, type Page } from '@playwright/test'

import { TOOLBAR_SELECTOR, gotoStory, settle } from '../_support/ladle'

async function readJson<T>(locator: Locator): Promise<T> {
  return JSON.parse(await locator.innerText()) as T
}

async function readMap(locator: Locator): Promise<Record<string, number>> {
  return readJson<Record<string, number>>(locator)
}

type PanelSize = {
  asPercentage: number
  inPixels: number
}

type ResizeRecord = {
  current: PanelSize
  id: string | number | undefined
  previous: PanelSize | undefined
}

async function freshStory(page: Page, story: string) {
  await gotoStory(page, story)
  await page.evaluate(() => localStorage.clear())
  await gotoStory(page, story)
}

async function expectLayoutKeys(
  locator: Locator,
  expected: string[]
): Promise<void> {
  await expect
    .poll(async () => Object.keys(await readMap(locator)).sort())
    .toEqual(expected.sort())
}

async function expectLayoutValue(
  locator: Locator,
  id: string,
  expected: number
): Promise<void> {
  await expect
    .poll(async () => (await readMap(locator))[id])
    .toBeCloseTo(expected, 2)
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

async function expectPanelPixels(
  panel: Locator,
  expected: number
): Promise<void> {
  await expect
    .poll(async () => {
      const box = await panel.boundingBox()
      return box ? Math.abs(box.width - expected) : Number.POSITIVE_INFINITY
    })
    .toBeLessThanOrEqual(2)
}

async function expectCallerAttributes(
  page: Page,
  ids: string[]
): Promise<void> {
  for (const id of ids) {
    const element = page.locator(`#${id}`)
    await expect(element).toHaveAttribute('id', id)
    await expect(element).toHaveAttribute('data-testid', `${id}-testid`)
    await expect(element).toHaveAttribute('data-test', `${id}-test`)
    await expect(page.locator(`[data-testid="${id}-testid"]`)).toHaveCount(1)
    await expect(page.locator(`[data-test="${id}-test"]`)).toHaveCount(1)
  }
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
    await freshStory(page, 'resizable--default')

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

  test('root door exposes native maps, refs, payloads and nonzero collapse', async ({
    page,
  }) => {
    await freshStory(page, 'resizable--compatibility')

    const group = page.locator('#root-story-group')
    const left = page.locator('#root-story-left')
    const layoutState = page.locator('[data-test="root-layout-state"]')
    const nestedState = page.locator('[data-test="root-nested-layout-state"]')
    await expectLayoutKeys(layoutState, ['root-story-left', 'root-story-right'])
    await expectLayoutKeys(nestedState, [
      'root-nested-top',
      'root-nested-bottom',
    ])
    await expectLayoutValue(layoutState, 'root-story-left', 30)
    await expectLayoutValue(layoutState, 'root-story-right', 70)
    await expectLayoutValue(nestedState, 'root-nested-top', 60)
    await expectLayoutValue(nestedState, 'root-nested-bottom', 40)
    await expectPanelShare(group, left, 0.3)

    await page.locator('[data-test="root-read-refs"]').click()
    await expectCallerAttributes(page, [
      'root-story-group',
      'root-story-left',
      'root-story-separator',
    ])
    const refLayoutState = page.locator('[data-test="root-ref-layout"]')
    await expectLayoutKeys(refLayoutState, [
      'root-story-left',
      'root-story-right',
    ])
    const refLayout = await readMap(refLayoutState)
    const layout = await readMap(layoutState)
    expect(refLayout['root-story-left']).toBeCloseTo(
      layout['root-story-left']!,
      5
    )
    const rootRefPanel = page.locator('[data-test="root-ref-panel"]')
    await expect
      .poll(async () => await rootRefPanel.innerText())
      .not.toBe('null')
    const panelRef = await readJson<PanelSize>(rootRefPanel)
    expect(panelRef.asPercentage).toBeCloseTo(30, 2)
    expect(panelRef.inPixels).toBeGreaterThan(0)

    await page.locator('[data-test="root-set-layout"]').click()
    await expectLayoutValue(layoutState, 'root-story-left', 40)
    await expectLayoutValue(layoutState, 'root-story-right', 60)
    await expectPanelShare(group, left, 0.4)

    await page.locator('[data-test="root-resize-pixels"]').click()
    await expect
      .poll(async () => {
        const size = await readJson<PanelSize>(
          page.locator('[data-test="root-ref-panel"]')
        )
        return size.inPixels
      })
      .toBeCloseTo(96, 0)
    const leftBox = await left.boundingBox()
    expect(leftBox).not.toBeNull()
    expect(Math.abs(leftBox!.width - 96)).toBeLessThanOrEqual(2)

    const resizeEvents = page.locator('[data-test="root-resize-events"]')
    await expect
      .poll(async () =>
        (await readJson<ResizeRecord[]>(resizeEvents)).some(
          (event) => event.previous !== undefined
        )
      )
      .toBe(true)
    await expect
      .poll(
        async () =>
          (await readJson<ResizeRecord[]>(resizeEvents)).at(-1)?.current
            .inPixels
      )
      .toBeCloseTo(96, 0)
    const latestResize = (await readJson<ResizeRecord[]>(resizeEvents))
      .filter((event) => event.previous !== undefined)
      .at(-1)
    expect(latestResize?.id).toBe('root-story-left')
    expect(latestResize?.current).toEqual({
      asPercentage: expect.any(Number),
      inPixels: expect.any(Number),
    })
    expect(latestResize?.previous).toEqual({
      asPercentage: expect.any(Number),
      inPixels: expect.any(Number),
    })
    expect(Math.abs(latestResize!.current.inPixels - 96)).toBeLessThanOrEqual(2)

    await page.locator('[data-test="root-collapse"]').click()
    await page.locator('[data-test="root-read-refs"]').click()
    await expect(page.locator('[data-test="root-collapsed"]')).toHaveText(
      'true'
    )
    await expect
      .poll(async () =>
        readJson<PanelSize>(page.locator('[data-test="root-ref-panel"]')).then(
          ({ inPixels }) => inPixels
        )
      )
      .toBeGreaterThan(0)
    await expectPanelPixels(left, 32)

    await page.locator('[data-test="root-expand"]').click()
    await page.locator('[data-test="root-read-refs"]').click()
    await expect(page.locator('[data-test="root-collapsed"]')).toHaveText(
      'false'
    )
  })

  test('custom storage restores the native layout after reload', async ({
    page,
  }) => {
    await freshStory(page, 'resizable--compatibility')
    const rootState = page.locator('[data-test="root-layout-state"]')
    await page.locator('[data-test="root-set-layout"]').click()
    await expectLayoutValue(rootState, 'root-story-left', 40)
    await expectLayoutValue(rootState, 'root-story-right', 60)
    await page.reload()
    await expectLayoutValue(rootState, 'root-story-left', 40)
    await expectLayoutValue(rootState, 'root-story-right', 60)
    await expectPanelShare(
      page.locator('#root-story-group'),
      page.locator('#root-story-left'),
      0.4
    )
  })

  test('mixed entries retain percent/pixel sizing, layout conservation and neighboring resets', async ({
    page,
  }) => {
    await freshStory(page, 'resizable--native-compatibility')

    const group = page.locator('#native-units-group')
    const percentPanel = page.locator('#native-percent-panel')
    const pixelPanel = page.locator('#native-pixel-panel')
    const layoutState = page.locator('[data-test="native-units-layout-state"]')
    await expectLayoutKeys(layoutState, [
      'native-percent-panel',
      'native-pixel-panel',
      'native-auto-panel',
    ])
    await expectLayoutValue(layoutState, 'native-percent-panel', 30)
    await expectPanelShare(group, percentPanel, 0.3)
    await expectPanelPixels(pixelPanel, 120)

    await page.locator('[data-test="native-set-layout"]').click()
    await expectLayoutValue(layoutState, 'native-percent-panel', 40)

    await page.locator('[data-test="native-resize-pixels"]').click()
    await expectCallerAttributes(page, [
      'native-units-group',
      'native-pixel-panel',
      'native-remainder-separator',
    ])
    await expectPanelPixels(pixelPanel, 136)
    const resizedLayout = await readMap(layoutState)
    expect(
      Object.values(resizedLayout).reduce((sum, value) => sum + value, 0)
    ).toBeCloseTo(100, 1)

    const groupWidth = (await group.boundingBox())!.width
    const rebalancedPixels =
      136 + ((resizedLayout['native-percent-panel']! - 30) / 100) * groupWidth
    expect(Math.abs(rebalancedPixels - 120)).toBeGreaterThan(2)
    await page.locator('#native-units-separator').dblclick()
    await expectLayoutValue(layoutState, 'native-percent-panel', 30)
    await expectPanelShare(group, percentPanel, 0.3)
    await expectPanelPixels(pixelPanel, rebalancedPixels)
    await page.locator('#native-remainder-separator').dblclick()
    await expectPanelPixels(pixelPanel, 120)

    await expect(page.locator('#native-nested-vertical')).toHaveCSS(
      'flex-direction',
      'column'
    )
    await expectLayoutKeys(
      page.locator('[data-test="native-nested-layout-state"]'),
      ['native-nested-top', 'native-nested-bottom']
    )
    const nestedState = page.locator('[data-test="native-nested-layout-state"]')
    const nestedBefore = (await readMap(nestedState))['native-nested-top']!
    await page.locator('#native-nested-vertical').getByRole('separator').focus()
    await page.keyboard.press('ArrowDown')
    await expect
      .poll(async () => (await readMap(nestedState))['native-nested-top'])
      .toBeGreaterThan(nestedBefore)
  })

  test('native pointer, keyboard bounds, disabled and RTL behavior', async ({
    page,
  }) => {
    await freshStory(page, 'resizable--compatibility')

    const rootState = page.locator('[data-test="root-layout-state"]')
    await expectLayoutKeys(rootState, ['root-story-left', 'root-story-right'])
    const rootBefore = await readMap(rootState)
    await dragWithMouse(page, page.locator('#root-story-separator'), 64)
    await expect
      .poll(async () => (await readMap(rootState))['root-story-left'])
      .toBeGreaterThan(rootBefore['root-story-left']! + 1)

    const keyboardSeparator = page.locator('#root-story-separator')
    const keyboardBefore = await readMap(rootState)
    await keyboardSeparator.focus()
    await expect(keyboardSeparator).toBeFocused()
    await page.keyboard.press('ArrowRight')
    await expect
      .poll(async () => (await readMap(rootState))['root-story-left'])
      .toBeGreaterThan(keyboardBefore['root-story-left']! + 1)

    const boundsState = page.locator('[data-test="root-bounds-layout-state"]')
    const boundsSeparator = page.locator('#root-bounds-separator')
    await boundsSeparator.focus()
    await page.keyboard.press('Home')
    await expectLayoutValue(boundsState, 'root-bounds-left', 20)
    await page.keyboard.press('End')
    await expectLayoutValue(boundsState, 'root-bounds-left', 80)

    const disabledState = page.locator(
      '[data-test="root-disabled-layout-state"]'
    )
    await expectLayoutKeys(disabledState, [
      'root-disabled-left',
      'root-disabled-right',
    ])
    const disabledBefore = await readMap(disabledState)
    await dragWithMouse(page, page.locator('#root-disabled-separator'), 64)
    await settle(page)
    expect(await readMap(disabledState)).toEqual(disabledBefore)

    const rtlState = page.locator('[data-test="root-rtl-layout-state"]')
    await expectLayoutKeys(rtlState, ['root-rtl-left', 'root-rtl-right'])
    const rtlBefore = await readMap(rtlState)
    await expect(page.locator('#root-rtl-group')).toHaveAttribute('dir', 'rtl')
    await page.locator('#root-rtl-separator').focus()
    await page.keyboard.press('ArrowRight')
    await expect
      .poll(async () => (await readMap(rtlState))['root-rtl-left'])
      .toBeLessThan(rtlBefore['root-rtl-left']!)
  })

  test.describe('coarse pointer', () => {
    test.use({
      hasTouch: true,
      isMobile: true,
      viewport: { width: 760, height: 960 },
    })

    test('native panels resize from an actual touch drag', async ({ page }) => {
      await freshStory(page, 'resizable--compatibility')
      expect(
        await page.evaluate(() => matchMedia('(pointer: coarse)').matches)
      ).toBe(true)
      const rootState = page.locator('[data-test="root-layout-state"]')
      await expectLayoutKeys(rootState, ['root-story-left', 'root-story-right'])
      const rootBefore = await readMap(rootState)
      await dragWithTouch(page, page.locator('#root-story-separator'), 72)
      await expect
        .poll(async () => (await readMap(rootState))['root-story-left'])
        .toBeGreaterThan(rootBefore['root-story-left']! + 1)
    })
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

const sidebarStory = 'sidebar--compatibility'

const sidebarDialog = (page: Page) => page.getByRole('dialog')

async function expectNamedDialog(dialog: Locator) {
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAccessibleName(/\S+/)
}

async function expectSidebarAtEdge(
  page: Page,
  content: Locator,
  side: 'left' | 'right'
) {
  await expect
    .poll(async () => {
      const box = await content.boundingBox()
      if (!box) return Infinity
      const viewportWidth = await page.evaluate(() => innerWidth)
      const edge = side === 'left' ? box.x : viewportWidth - (box.x + box.width)
      return Math.abs(edge)
    })
    .toBeLessThanOrEqual(1)
}

async function expectFocusInside(page: Page, dialog: Locator) {
  for (let index = 0; index < 8; index += 1) {
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement)
      )
    ).toBe(true)
    await page.keyboard.press('Tab')
  }
}

test.describe('layout auxiliaries: Sidebar', () => {
  test('forwards the mobile div contract and keeps side physical in RTL', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoStory(page, sidebarStory)

    await storyControl(page, 'sidebar-side-right').click()
    await storyControl(page, 'sidebar-dir-rtl').click()
    await expect(storyControl(page, 'sidebar-side-state')).toHaveText('right')
    await expect(storyControl(page, 'sidebar-direction-state')).toHaveText(
      'rtl'
    )

    const trigger = storyControl(page, 'sidebar-trigger-a')
    await trigger.click()
    const dialog = sidebarDialog(page)
    await expectNamedDialog(dialog)
    const content = storyControl(page, 'sidebar-shell')
    await expect(content).toBeVisible()

    await expect(content).toHaveAttribute('data-mobile', 'true')
    await expect(content).toHaveAttribute('id', 'sidebar-compatibility-content')
    await expect(content).toHaveAttribute(
      'data-caller',
      'sidebar-compatibility'
    )
    await expect(content).toHaveAttribute(
      'aria-roledescription',
      'Application navigation'
    )
    await expect(content).toHaveAttribute('dir', 'rtl')
    await expect(content).toHaveCSS('direction', 'rtl')
    await expect(content).toHaveClass(/\bcaller-sidebar-class\b/)
    await expect(content).toHaveClass(/\bbg-sidebar\b/)
    await expect(content).toHaveCSS('outline-offset', '3px')
    await expect(content).toHaveCSS('width', '288px')
    await expectSidebarAtEdge(page, content, 'right')

    await storyControl(page, 'sidebar-read-ref').click()
    const refState = await readJson<{
      id: string
      slot: string
      caller: string
      dir: string
    }>(storyControl(page, 'sidebar-ref-state'))
    expect(refState).toEqual({
      id: 'sidebar-compatibility-content',
      slot: 'sidebar',
      caller: 'sidebar-compatibility',
      dir: 'rtl',
    })

    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()

    await storyControl(page, 'sidebar-side-left').click()
    await storyControl(page, 'sidebar-dir-ltr').click()
    await trigger.click()
    await expectNamedDialog(dialog)
    await expect(content).toHaveAttribute('dir', 'ltr')
    await expect(content).toHaveCSS('direction', 'ltr')
    await expect(content).toHaveCSS('width', '288px')
    await expectSidebarAtEdge(page, content, 'left')
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
  })

  test('traps focus and returns it to the mounted opener through Escape and backdrop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoStory(page, sidebarStory)

    const dialog = sidebarDialog(page)
    const triggerA = storyControl(page, 'sidebar-trigger-a')
    const triggerB = storyControl(page, 'sidebar-trigger-b')
    await expect(storyControl(page, 'sidebar-controlled-state')).toHaveText(
      'true'
    )
    await expect(storyControl(page, 'sidebar-desktop-changes')).toHaveText('0')

    await triggerB.click()
    await expectNamedDialog(dialog)
    await settle(page)
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement)
      )
    ).toBe(true)
    await expectFocusInside(page, dialog)
    await expect(storyControl(page, 'sidebar-controlled-state')).toHaveText(
      'true'
    )
    await expect(storyControl(page, 'sidebar-desktop-changes')).toHaveText('0')

    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(triggerB).toBeFocused()
    await expect(storyControl(page, 'sidebar-controlled-state')).toHaveText(
      'true'
    )
    await expect(storyControl(page, 'sidebar-desktop-changes')).toHaveText('0')

    await triggerB.focus()
    await triggerA.dispatchEvent('click')
    await expectNamedDialog(dialog)
    await settle(page)
    const box = await dialog.boundingBox()
    expect(box).not.toBeNull()
    const backdropX = box!.x < 1 ? box!.width + 8 : box!.x - 8
    await page.mouse.click(backdropX, 32)
    await expect(dialog).toHaveCount(0)
    await expect(triggerA).toBeFocused()
    await expect(storyControl(page, 'sidebar-controlled-state')).toHaveText(
      'true'
    )
    await expect(storyControl(page, 'sidebar-desktop-changes')).toHaveText('0')

    const shortcutOpener = storyControl(page, 'sidebar-shortcut-opener')
    await shortcutOpener.focus()
    await page.keyboard.press('Control+b')
    await expectNamedDialog(dialog)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(shortcutOpener).toBeFocused()
    await expect(storyControl(page, 'sidebar-controlled-state')).toHaveText(
      'true'
    )
    await expect(storyControl(page, 'sidebar-desktop-changes')).toHaveText('0')
  })

  test('switches mobile and desktop geometry at 767/768 while static stays static', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 767, height: 900 })
    await gotoStory(page, sidebarStory)

    const shell = storyControl(page, 'sidebar-shell')
    const staticSidebar = storyControl(page, 'sidebar-static')
    const dialog = sidebarDialog(page)
    await expect(shell).toHaveCount(0)
    await expect(dialog).toHaveCount(0)
    await expect(staticSidebar).toBeVisible()
    await expect(staticSidebar).toHaveCSS('width', '240px')

    await storyControl(page, 'sidebar-trigger-a').click()
    await expectNamedDialog(dialog)
    await expect(shell).toHaveCSS('width', '288px')
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)

    await page.setViewportSize({ width: 768, height: 900 })
    await settle(page)
    await expect(shell).toBeVisible()
    await expect(shell).not.toHaveAttribute('data-mobile', 'true')
    await expect(shell).toHaveCSS('width', '240px')
    await expect(staticSidebar).toHaveCSS('width', '240px')
    await expect(dialog).toHaveCount(0)

    await page.setViewportSize({ width: 767, height: 900 })
    await settle(page)
    await expect(shell).toHaveCount(0)
    await expect(dialog).toHaveCount(0)
    await expect(staticSidebar).toHaveCSS('width', '240px')
  })

  test('preserves desktop control, icon width, shortcut and the seven-day write-only cookie', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await gotoStory(page, sidebarStory)

    const shell = storyControl(page, 'sidebar-shell')
    await expect(shell).toHaveCSS('width', '240px')
    await storyControl(page, 'sidebar-trigger-a').click()
    await expect(storyControl(page, 'sidebar-controlled-state')).toHaveText(
      'false'
    )
    await expect(storyControl(page, 'sidebar-desktop-changes')).toHaveText('1')

    await storyControl(page, 'sidebar-collapsible-icon').click()
    await settle(page)
    await expect(shell).toHaveCSS('width', '48px')

    const cookies = await page.context().cookies()
    const sidebarCookie = cookies.find(({ name }) => name === 'sidebar_state')
    expect(sidebarCookie).toBeDefined()
    expect(sidebarCookie!.value).toBe('false')
    expect(sidebarCookie!.path).toBe('/')
    const nowSeconds = Date.now() / 1000
    expect(sidebarCookie!.expires).toBeGreaterThan(nowSeconds + 604_740)
    expect(sidebarCookie!.expires).toBeLessThan(nowSeconds + 604_860)

    await gotoStory(page, sidebarStory)
    await expect(storyControl(page, 'sidebar-controlled-state')).toHaveText(
      'true'
    )
    await expect(storyControl(page, 'sidebar-desktop-changes')).toHaveText('0')
    expect(
      (await page.context().cookies()).find(
        ({ name }) => name === 'sidebar_state'
      )?.value
    ).toBe('false')

    await storyControl(page, 'sidebar-shortcut-opener').focus()
    await page.keyboard.press('Control+b')
    await expect(storyControl(page, 'sidebar-controlled-state')).toHaveText(
      'false'
    )
    await expect(storyControl(page, 'sidebar-desktop-changes')).toHaveText('1')
    await page.keyboard.press('Control+b')
    await expect(storyControl(page, 'sidebar-controlled-state')).toHaveText(
      'true'
    )
    await expect(storyControl(page, 'sidebar-desktop-changes')).toHaveText('2')
    expect(
      (await page.context().cookies()).find(
        ({ name }) => name === 'sidebar_state'
      )?.value
    ).toBe('true')

    await gotoStory(page, 'sidebar--default')
    const uncontrolledSidebar = page.locator(
      '[data-slot="sidebar"].ds-sidebar-root'
    )
    const uncontrolledTrigger = page.locator('[data-sidebar="trigger"]')
    await expect(uncontrolledSidebar).toHaveAttribute('data-state', 'expanded')
    await uncontrolledTrigger.click()
    await expect(uncontrolledSidebar).toHaveAttribute('data-state', 'collapsed')
    await uncontrolledTrigger.click()
    await expect(uncontrolledSidebar).toHaveAttribute('data-state', 'expanded')
  })

  for (const [theme, dark] of [
    ['neutral', false],
    ['neutral', true],
    ['uzh', false],
  ] as const) {
    test(`opened mobile Sidebar is contained and axe-clean at 390px in ${theme}${dark ? '-dark' : '-light'}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.addInitScript(
        ({ isDark }) => {
          window.localStorage.setItem('ladle-dark', JSON.stringify(isDark))
        },
        { isDark: dark }
      )
      await gotoStory(page, sidebarStory, theme)

      const root = page.locator('html')
      await expect(root).toHaveAttribute('data-theme', theme)
      expect(
        await root.evaluate((element) => element.classList.contains('dark'))
      ).toBe(dark)

      await storyControl(page, 'sidebar-trigger-a').click()
      const dialog = sidebarDialog(page)
      await expectNamedDialog(dialog)
      const content = storyControl(page, 'sidebar-shell')
      await expect(content).toHaveCSS('width', '288px')
      await expectSidebarAtEdge(page, content, 'left')
      expect(await seriousOrCriticalViolations(page)).toEqual([])

      await page.keyboard.press('Escape')
      await expect(dialog).toHaveCount(0)
    })
  }
})
