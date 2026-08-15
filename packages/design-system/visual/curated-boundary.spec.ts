import { expect, test, type Page } from '@playwright/test'

import {
  gotoStory,
  loadStoryIds,
  STORY_SELECTOR,
  TOOLBAR_SELECTOR,
  type LadleTheme,
} from '../tests/_support/ladle'

type ScreenshotBoundary = 'story-root' | 'page'
type ScreenshotClip = {
  x: number
  y: number
  width: number
  height: number
}
type Interaction =
  | 'checkbox-partial'
  | 'form-error'
  | 'modal-open'
  | 'tooltip-show'

type CuratedCase = {
  name: string
  storyId: string
  theme: LadleTheme
  boundary: ScreenshotBoundary
  interaction?: Interaction
  documentRoot?: boolean
  ramp?: Record<string, string>
}

const RAMP_VALUES = {
  '--theme-color-primary': '#8c2f14',
  '--theme-color-primary-80': '#a94425',
  '--theme-color-primary-60': '#c76645',
  '--theme-color-primary-40': '#e5a38f',
  '--theme-color-primary-20': '#f7d9cf',
} as const
const ORDINARY_THEMES = ['neutral', 'uzh'] as const

/**
 * Each case names the exact built Ladle story, theme, and screenshot boundary.
 * Page captures are used for portal content; all other captures stay scoped to
 * the story root.
 */
const CASES = [
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'button-disabled',
    storyId: 'button--disabled',
    theme,
    boundary: 'story-root',
  })),
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'checkbox-partial',
    storyId: 'checkbox--partial',
    theme,
    boundary: 'story-root',
    interaction: 'checkbox-partial',
  })),
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'modal-open',
    storyId: 'modal--default',
    theme,
    boundary: 'page',
    interaction: 'modal-open',
    documentRoot: true,
  })),
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'tooltip-shown',
    storyId: 'tooltip--default',
    theme,
    boundary: 'page',
    interaction: 'tooltip-show',
    documentRoot: true,
  })),
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'form-error',
    storyId: 'form--default',
    theme,
    boundary: 'story-root',
    interaction: 'form-error',
  })),
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'text-field-error',
    storyId: 'text-field--error',
    theme,
    boundary: 'story-root',
  })),
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'navigation-active',
    storyId: 'navigation--active',
    theme,
    boundary: 'story-root',
  })),
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'sidebar-active',
    storyId: 'sidebar--default',
    theme,
    boundary: 'story-root',
  })),
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'alert-variants',
    storyId: 'alert--variants',
    theme,
    boundary: 'story-root',
  })),
  ...ORDINARY_THEMES.map((theme) => ({
    name: 'user-notification-error',
    storyId: 'user-notification--error',
    theme,
    boundary: 'story-root',
  })),
  {
    name: 'theme-extension-contract-synthetic-ramp',
    storyId: 'theme-extension-contract--synthetic-ramp',
    theme: 'uzh',
    boundary: 'story-root',
    documentRoot: true,
    ramp: RAMP_VALUES,
  },
] as const satisfies ReadonlyArray<CuratedCase>

// Deterministic exclusions: tooltip--delay adds only a 3,000 ms delay to the
// captured default tooltip, while modal--loading and
// modal--three-second-loading retain an animated spinner under the fixed clock.
// None adds a distinct stable visual contract to this curated boundary.

const FIXED_NOW = 1_735_689_600_000
const LOCAL_ORIGIN = 'http://127.0.0.1:61011'
const ROOT_STORY_SELECTOR = `#ladle-root > :not(${TOOLBAR_SELECTOR}) > :not(${TOOLBAR_SELECTOR})`

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
      throw new Error('Source Sans 3 is not available for the visual boundary')
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

/**
 * Portal content is outside Ladle's themed wrapper. For those cases, and for
 * the synthetic ramp, apply the requested theme to the document root after
 * neutralizing the wrapper that would otherwise redeclare the theme tokens.
 */
async function applyDocumentRootState(
  page: Page,
  state: Pick<CuratedCase, 'theme' | 'ramp'>
): Promise<void> {
  await page.evaluate(
    ({ theme, ramp, rampKeys }) => {
      const root = document.documentElement
      const wrapper = document.querySelector('#ladle-root > [data-theme]')
      wrapper?.removeAttribute('data-theme')
      wrapper?.classList.remove('dark')
      root.classList.remove('dark')

      if (theme === 'uzh') {
        root.setAttribute('data-theme', 'uzh')
      } else {
        root.removeAttribute('data-theme')
      }

      for (const name of rampKeys) {
        root.style.removeProperty(name)
      }
      if (ramp) {
        for (const [name, value] of Object.entries(ramp)) {
          root.style.setProperty(name, value)
        }
      }
    },
    {
      theme: state.theme,
      ramp: state.ramp,
      rampKeys: Object.keys(RAMP_VALUES),
    }
  )
}

async function hideWorkbenchChrome(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `${TOOLBAR_SELECTOR} { display: none !important; }`,
  })
}

async function getStoryRootClip(
  page: Page,
  selector: string
): Promise<ScreenshotClip> {
  return page.locator(selector).evaluateAll((elements) => {
    if (elements.length === 0) {
      throw new Error('The curated story-root boundary is empty')
    }

    const rects = elements.map((element) => element.getBoundingClientRect())
    const left = Math.min(...rects.map((rect) => rect.left))
    const top = Math.min(...rects.map((rect) => rect.top))
    const right = Math.max(...rects.map((rect) => rect.right))
    const bottom = Math.max(...rects.map((rect) => rect.bottom))

    return {
      x: Math.floor(left + window.scrollX),
      y: Math.floor(top + window.scrollY),
      width: Math.ceil(right - left),
      height: Math.ceil(bottom - top),
    }
  })
}

async function screenshotStoryRoot(
  page: Page,
  selector: string,
  name: string
): Promise<void> {
  const clip = await getStoryRootClip(page, selector)
  await expect(page).toHaveScreenshot(name, { clip })
}

async function runInteraction(
  page: Page,
  interaction: Interaction | undefined
): Promise<void> {
  switch (interaction) {
    case 'checkbox-partial':
      await page.getByRole('button', { name: 'Partial', exact: true }).click()
      await expect(page.getByText(/State: 1,/)).toBeVisible()
      return
    case 'form-error':
      await page.getByRole('button', { name: 'Submit', exact: true }).click()
      await expect(
        page.getByText('A username is required.', { exact: true })
      ).toBeVisible()
      return
    case 'modal-open':
      await page
        .getByRole('button', { name: 'Open Modal', exact: true })
        .click()
      await expect(page.getByRole('dialog')).toBeVisible()
      return
    case 'tooltip-show':
      await page.getByText('Hover Me!', { exact: true }).hover()
      await page.clock.fastForward(500)
      await expect(page.getByRole('tooltip')).toBeVisible()
      return
    case undefined:
      return
  }
}

test.describe.configure({ mode: 'serial' })

for (const state of CASES) {
  test(`${state.name} - ${state.theme} - ${state.boundary}`, async ({
    page,
  }) => {
    const storyIds = loadStoryIds()
    expect(storyIds, 'Missing curated visual story ' + state.storyId).toContain(
      state.storyId
    )

    const blockedRequests = await installVisualGuards(page)
    await gotoStory(page, state.storyId, state.theme)
    await disableMotion(page)
    await waitForVisualFonts(page, state.theme)

    if (state.documentRoot) {
      await applyDocumentRootState(page, state)
    }
    if (state.boundary === 'page') {
      await hideWorkbenchChrome(page)
    }
    await runInteraction(page, state.interaction)

    if (state.boundary === 'page') {
      await expect(page).toHaveScreenshot(`${state.name}-${state.theme}.png`)
    } else {
      const selector = state.documentRoot ? ROOT_STORY_SELECTOR : STORY_SELECTOR
      await screenshotStoryRoot(
        page,
        selector,
        `${state.name}-${state.theme}.png`
      )
    }

    expect(
      blockedRequests,
      'The curated visual boundary must not request external resources'
    ).toEqual([])
  })
}
