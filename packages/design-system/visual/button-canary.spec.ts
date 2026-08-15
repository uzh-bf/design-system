import { expect, test, type Page } from '@playwright/test'

import {
  gotoStory,
  loadStoryIds,
  STORY_SELECTOR,
  type LadleTheme,
} from '../tests/_support/ladle'

const CASES = [
  {
    theme: 'neutral',
    storyId: 'theme-extension-contract--neutral',
  },
  {
    theme: 'uzh',
    storyId: 'theme-extension-contract--uzh',
  },
] as const satisfies ReadonlyArray<{ theme: LadleTheme; storyId: string }>

const FIXED_NOW = 1_735_689_600_000
const LOCAL_ORIGIN = 'http://127.0.0.1:61011'

async function installVisualGuards(page: Page): Promise<string[]> {
  const blockedRequests: string[] = []

  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url())
    if (
      url.origin === LOCAL_ORIGIN ||
      url.protocol === 'data:' ||
      url.protocol === 'blob:'
    ) {
      await route.continue()
      return
    }

    blockedRequests.push(url.href)
    await route.abort('blockedbyclient')
  })

  await page.clock.install({ time: new Date(FIXED_NOW) })
  return blockedRequests
}

async function waitForVisualFonts(
  page: Page,
  theme: LadleTheme
): Promise<void> {
  await page.evaluate(async (expectedTheme) => {
    await document.fonts.ready

    const failedFaces = [...document.fonts]
      .filter((font) => font.status === 'error')
      .map((font) => font.family)
    if (failedFaces.length > 0) {
      throw new Error('Visual font loading failed: ' + failedFaces.join(', '))
    }

    if (
      expectedTheme === 'uzh' &&
      (await document.fonts.load('16px "Source Sans 3"', 'Ag')).length === 0
    ) {
      throw new Error('Source Sans 3 is not available for the visual canary')
    }
  }, theme)
}

async function disableMotion(page: Page): Promise<void> {
  await page.addStyleTag({
    content: [
      '*,',
      '*::before,',
      '*::after {',
      '  animation-duration: 0s !important;',
      '  animation-delay: 0s !important;',
      '  transition-duration: 0s !important;',
      '  transition-delay: 0s !important;',
      '  caret-color: transparent !important;',
      '}',
    ].join('\n'),
  })
}

test.describe.configure({ mode: 'serial' })

for (const { theme, storyId } of CASES) {
  test('Button canary - ' + theme, async ({ page }) => {
    const storyIds = loadStoryIds()
    expect(storyIds, 'Missing visual canary story ' + storyId).toContain(
      storyId
    )

    const blockedRequests = await installVisualGuards(page)
    await gotoStory(page, storyId, theme)
    await disableMotion(page)
    await waitForVisualFonts(page, theme)

    await expect(page.locator(STORY_SELECTOR)).toHaveScreenshot(
      'button-' + theme + '.png'
    )

    expect(
      blockedRequests,
      'The visual canary must not request external resources'
    ).toEqual([])
  })
}
