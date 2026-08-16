import { type Page } from '@playwright/test'

import { TOOLBAR_SELECTOR, type LadleTheme } from '../tests/_support/ladle'

const FIXED_NOW = 1_735_689_600_000
const LOCAL_ORIGIN = 'http://127.0.0.1:61011'

export async function installVisualGuards(page: Page): Promise<string[]> {
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

export async function waitForVisualFonts(
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
      throw new Error('Source Sans 3 is not available for the visual boundary')
    }
  }, theme)
}

export async function disableMotion(page: Page): Promise<void> {
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

export async function hideWorkbenchChrome(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `${TOOLBAR_SELECTOR} { display: none !important; }`,
  })
}
