import { expect, test } from '@playwright/test'

import {
  gotoStory,
  loadStoryIds,
  STORY_SELECTOR,
  type LadleTheme,
} from '../tests/_support/ladle'
import {
  disableMotion,
  hideWorkbenchChrome,
  installVisualGuards,
  waitForVisualFonts,
} from './visual-setup'

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
    await hideWorkbenchChrome(page)

    await expect(page.locator(STORY_SELECTOR)).toHaveScreenshot(
      'button-' + theme + '.png'
    )

    expect(
      blockedRequests,
      'The visual canary must not request external resources'
    ).toEqual([])
  })
}
