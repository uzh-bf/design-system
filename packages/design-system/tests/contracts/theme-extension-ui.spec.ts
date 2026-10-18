import { expect, test, type Locator } from '@playwright/test'

import { gotoStory, settle } from '../_support/ladle'

/**
 * Independent expectation oracle for the synthetic ramp. The story owns the
 * same literals as the stimulus; this copy is deliberately duplicated so the
 * proof never derives its expectations from the fixture.
 */
const RAMP_VALUES = {
  '--theme-color-primary': '#8c2f14',
  '--theme-color-primary-80': '#a94425',
  '--theme-color-primary-60': '#c76645',
  '--theme-color-primary-40': '#e5a38f',
  '--theme-color-primary-20': '#f7d9cf',
}

type ContractState = {
  storyId: string
  theme: 'neutral' | 'uzh'
  ramp?: Record<string, string>
  expected: {
    '--primary': string
    '--ring': string
    '--sidebar-accent': string
    '--sidebar-accent-foreground': string
  }
}

const STATES: ContractState[] = [
  {
    storyId: 'theme-extension-contract--neutral',
    theme: 'neutral',
    expected: {
      '--primary': 'oklch(20.5% 0 0)',
      '--ring': 'oklch(70.8% 0 0)',
      '--sidebar-accent': 'oklch(97% 0 0)',
      '--sidebar-accent-foreground': 'oklch(20.5% 0 0)',
    },
  },
  {
    storyId: 'theme-extension-contract--uzh',
    theme: 'uzh',
    expected: {
      '--primary': '#0028a5',
      '--ring': '#0028a5',
      '--sidebar-accent': '#bdc9e8',
      '--sidebar-accent-foreground': '#0028a5',
    },
  },
  {
    storyId: 'theme-extension-contract--synthetic-ramp',
    theme: 'uzh',
    ramp: RAMP_VALUES,
    expected: {
      '--primary': '#8c2f14',
      '--ring': '#8c2f14',
      '--sidebar-accent': '#f7d9cf',
      '--sidebar-accent-foreground': '#8c2f14',
    },
  },
]

/**
 * The supported contract is one theme on the document root: apply the theme,
 * the optional synthetic ramp, and the dark axis directly on
 * `document.documentElement` before any style is read. Ladle's own
 * ThemeProvider writes the same root attribute, so there is no themed wrapper
 * to neutralize first.
 */
async function applyDocumentRootState(
  page: Parameters<typeof gotoStory>[0],
  state: ContractState
): Promise<void> {
  await page.evaluate(
    ({ theme, ramp, rampKeys }) => {
      const root = document.documentElement
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

/**
 * Resolve the contract tokens through probe elements so component assertions
 * compare computed colors instead of hardcoding serialization formats.
 */
async function readProbeColors(page: Parameters<typeof gotoStory>[0]): Promise<{
  primary: string
  sidebarAccent: string
  sidebarAccentForeground: string
  primary20: string
  primary100: string
  primaryHover: string
}> {
  return page.evaluate(() => {
    const probe = document.createElement('div')
    probe.style.position = 'fixed'
    probe.style.visibility = 'hidden'
    document.body.appendChild(probe)
    const read = (property: string) => {
      probe.style.backgroundColor = property
      return getComputedStyle(probe).backgroundColor
    }
    const result = {
      primary: read('var(--primary)'),
      primaryHover: read('var(--primary-hover)'),
      sidebarAccent: read('var(--sidebar-accent)'),
      sidebarAccentForeground: (() => {
        probe.style.color = 'var(--sidebar-accent-foreground)'
        return getComputedStyle(probe).color
      })(),
      // The sidebar active state consumes the theme ramp tokens directly:
      // `bg-primary-20` maps to `--theme-color-primary-20` and
      // `text-primary-100` maps to `--color-primary-100`, which aliases
      // `--theme-color-primary` in the packed CSS.
      primary20: read('var(--theme-color-primary-20)'),
      primary100: read('var(--color-primary-100)'),
    }
    probe.remove()
    return result
  })
}

/**
 * Wait for the input's box-shadow transition to settle and return the
 * computed color of the focus-ring layer (the only layer with a 3px spread).
 * The ring is Tailwind's `ring-ring/50 ring-[3px]`, which renders as a
 * `color-mix(in oklab, var(--ring) 50%, transparent)` layer; reading it
 * mid-transition would compare a partially interpolated color.
 */
async function settledFocusRingColor(
  page: Parameters<typeof gotoStory>[0],
  input: Locator
): Promise<string> {
  await page.waitForFunction(() => {
    const element = document.activeElement
    if (!(element instanceof HTMLElement)) return false
    const first = getComputedStyle(element).boxShadow
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const second = getComputedStyle(element).boxShadow
        resolve(first === second && /0px 0px 0px 3px/.test(first))
      })
    })
  })
  return input.evaluate((element) => {
    const layer =
      /(?:oklab\([^)]*\)|rgba?\([^)]*\)|#[0-9a-fA-F]+|color\([^)]*\)) 0px 0px 0px 3px/.exec(
        getComputedStyle(element).boxShadow
      )
    return layer?.[1] ?? ''
  })
}

/**
 * The oracle for the focus ring: resolve the root `--ring` token through the
 * same 50% oklab mix the component renders, so the assertion compares
 * computed colors instead of hardcoding serialization formats.
 */
async function expectedFocusRingColor(
  page: Parameters<typeof gotoStory>[0],
  ring: string
): Promise<string> {
  return page.evaluate((token) => {
    const probe = document.createElement('div')
    probe.style.position = 'fixed'
    probe.style.visibility = 'hidden'
    probe.style.boxShadow = `0 0 0 3px color-mix(in oklab, ${token} 50%, transparent)`
    document.body.appendChild(probe)
    const layer =
      /(?:oklab\([^)]*\)|rgba?\([^)]*\)|#[0-9a-fA-F]+|color\([^)]*\)) 0px 0px 0px 3px/.exec(
        getComputedStyle(probe).boxShadow
      )
    probe.remove()
    return layer?.[1] ?? ''
  }, ring)
}

/**
 * The token expectations every contract state shares: the resolved root tokens,
 * then the components that consume them. Component colors are compared against
 * a probe attached to `document.body`, so a state where the components resolve
 * different values than the document root fails here.
 */
async function expectContractState(
  page: Parameters<typeof gotoStory>[0],
  state: ContractState
): Promise<void> {
  const rootTokens = await page.evaluate((tokens) => {
    const styles = getComputedStyle(document.documentElement)
    return Object.fromEntries(
      tokens.map((token) => [token, styles.getPropertyValue(token).trim()])
    )
  }, Object.keys(state.expected))
  expect(rootTokens).toEqual(state.expected)

  const probe = await readProbeColors(page)
  const id = state.storyId.replace('theme-extension-contract--', '')

  const button = page.locator(`[data-test="theme-contract-button-${id}"]`)
  await expect(button).toHaveCount(1)
  await expect(button).toHaveCSS('background-color', probe.primary)

  const badge = page.locator(`[data-test="theme-contract-badge-${id}"]`)
  await expect(badge).toHaveCount(1)
  await expect(badge).toHaveCSS('background-color', probe.primary20)
  await expect(badge).toHaveCSS('color', probe.primary100)

  const input = page.locator(`[data-test="theme-contract-input-${id}"]`)
  await expect(input).toHaveCount(1)
  await input.focus()
  await expect(input).toBeFocused()
  const focusRingColor = await settledFocusRingColor(page, input)
  const expectedRingColor = await expectedFocusRingColor(page, 'var(--ring)')
  expect(focusRingColor).toBe(expectedRingColor)

  // Hover consumes the sidebar accent pair; the active state consumes the
  // public ramp utilities, which equal the accent pair under UZH and the
  // synthetic ramp but stay distinct for neutral.
  const activeItem = page.locator(
    `[data-test="theme-contract-sidebar-active-${id}"]`
  )
  await expect(activeItem).toHaveCount(1)
  await expect(activeItem).toHaveCSS('background-color', probe.primary20)
  await expect(activeItem).toHaveCSS('color', probe.primary100)

  const hoverItem = page.locator(
    `[data-test="theme-contract-sidebar-hover-${id}"]`
  )
  await expect(hoverItem).toHaveCount(1)
  await hoverItem.hover()
  await expect(hoverItem).toHaveCSS('background-color', probe.sidebarAccent)
  await expect(hoverItem).toHaveCSS('color', probe.sidebarAccentForeground)
}

for (const state of STATES) {
  test(`renders the ${state.storyId} document-root contract state`, async ({
    page,
  }) => {
    await gotoStory(page, state.storyId)
    await applyDocumentRootState(page, state)
    await expectContractState(page, state)
  })
}

/**
 * The ramp override as a consumer actually ships it: a stylesheet rule on
 * `:root[data-theme='uzh']`, loaded after the packaged CSS, with the theme on
 * the document root and a real `ThemeProvider` container in between — Ladle
 * wraps every story in one, and this state deliberately leaves it in place.
 *
 * This is the state that regressed: while the provider set `data-theme` on its
 * own container, that container re-declared the whole UZH token layer for the
 * subtree, so components inside it fell back to UZH blue while the document
 * root carried the consumer's color. The shared assertions compare components
 * against a probe outside the container, so the state fails as soon as the
 * provider themes a container again.
 */
const CONSUMER_RAMP_STATE: ContractState = {
  storyId: 'theme-extension-contract--uzh',
  theme: 'uzh',
  ramp: RAMP_VALUES,
  expected: {
    '--primary': '#8c2f14',
    '--ring': '#8c2f14',
    '--sidebar-accent': '#f7d9cf',
    '--sidebar-accent-foreground': '#8c2f14',
  },
}

const CONSUMER_RAMP_STYLESHEET = `:root[data-theme='uzh'] {
${Object.entries(RAMP_VALUES)
  .map(([name, value]) => `  ${name}: ${value};`)
  .join('\n')}
}`

test('keeps a consumer ramp override inside the ThemeProvider subtree', async ({
  page,
}) => {
  // The provider renders `uzh`, so a container it themed would shadow the
  // override with UZH blue rather than with the neutral defaults.
  await gotoStory(page, CONSUMER_RAMP_STATE.storyId, CONSUMER_RAMP_STATE.theme)
  // No inline ramp on the root: the override must arrive through the stylesheet
  // rule the migration guide documents.
  await applyDocumentRootState(page, {
    ...CONSUMER_RAMP_STATE,
    ramp: undefined,
  })
  await page.addStyleTag({ content: CONSUMER_RAMP_STYLESHEET })

  // Guards the state against going vacuous: the components below must really
  // sit inside the provider's container.
  await expect(page.locator('#ladle-root > div')).toHaveCount(1)
  await expect(
    page.locator('#ladle-root [data-test="theme-contract-button-uzh"]')
  ).toHaveCount(1)

  await expectContractState(page, CONSUMER_RAMP_STATE)
})

for (const state of STATES) {
  test(`reference composition keeps ramp ownership and tab keyboard behavior (${state.theme}${state.ramp ? '-synthetic' : ''})`, async ({
    page,
  }) => {
    const reference = {
      ...state,
      storyId: state.ramp
        ? 'theme-extension-contract--reference-synthetic-ramp'
        : 'theme-extension-contract--reference',
    }
    await gotoStory(page, reference.storyId, reference.theme)
    await applyDocumentRootState(page, reference)
    const colors = await readProbeColors(page)
    await expect(
      page.locator('[data-test="theme-reference-primary"]')
    ).toHaveCSS('background-color', colors.primary)
    await page.locator('[data-test="theme-reference-primary"]').hover()
    await expect(
      page.locator('[data-test="theme-reference-primary"]')
    ).toHaveCSS('background-color', colors.primaryHover)
    const tabs = page.getByRole('tab')
    await tabs.first().focus()
    await tabs.first().press('ArrowRight')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    await expect(tabs.nth(1)).toBeFocused()
    await expect(page.getByRole('tabpanel')).toBeVisible()
  })
}

for (const theme of ['neutral', 'uzh'] as const) {
  for (const width of [390, 1440]) {
    test(`readable defaults and explicit consumer overrides (${theme}, ${width})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 })
      await gotoStory(page, 'theme-extension-contract--reference', theme)
      const reference = page.locator('[data-test="theme-reference"]')
      const colors = await readProbeColors(page)
      await expect(page.locator('[data-test="reference-badge"]')).toHaveCSS(
        'background-color',
        colors.primary20
      )
      await expect(
        page.locator('[data-test="reference-badge-solid"]')
      ).toHaveCSS('background-color', colors.primary)
      await expect(reference.locator('h1')).toHaveCSS('margin-bottom', '0px')
      const tablist = page.getByRole('tablist', { name: 'Reference views' })
      const tabWidth = (await tablist.boundingBox())!.width
      expect(tabWidth).toBeGreaterThan(width - 40)
      const cell = page.getByRole('cell').last()
      await expect(cell).toHaveCSS('white-space', 'normal')
      if (width === 390)
        expect((await cell.boundingBox())!.height).toBeGreaterThan(60)
      const basic = page.locator('[data-test="reference-basic"]')
      await basic.hover()
      await expect(basic).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
      await basic.focus()
      await page.keyboard.press('Tab')
      await page.keyboard.press('Shift+Tab')
      expect(
        await basic.evaluate((node) => getComputedStyle(node).boxShadow)
      ).not.toBe('none')
      await page.mouse.move(0, 0)
      await basic.scrollIntoViewIfNeeded()
      await settle(page)
      await basic.focus()
      for (const kind of ['tooltip', 'wrapper-tooltip']) {
        await page.keyboard.press('Tab')
        const tooltip = page.locator(`[data-test="reference-${kind}-content"]`)
        await expect(tooltip).toBeVisible()
        await expect(tooltip).toHaveCSS('font-size', '14px')
        const rect = (await tooltip.boundingBox())!
        expect(rect.x).toBeGreaterThanOrEqual(0)
        expect(rect.x + rect.width).toBeLessThanOrEqual(width)
        if (kind === 'tooltip') expect(rect.width).toBeLessThanOrEqual(320)
        await page.keyboard.press('Escape')
        await expect(tooltip).toBeHidden()
      }
      await page.locator('[data-test="reference-open-modal"]').click()
      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
      await page.locator('[data-test="reference-modal-tooltip"]').focus()
      const modalTooltip = page.locator(
        '[data-test="reference-modal-tooltip-content"]'
      )
      await expect(modalTooltip).toBeVisible()
      expect(
        await modalTooltip.evaluate(
          (node) => node.closest('[role=dialog]') === null
        )
      ).toBe(true)
      await page.keyboard.press('Escape')
      await expect(modalTooltip).toBeHidden()
      await expect(dialog).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(dialog).toBeHidden()
      await expect(
        page.locator('[data-test="reference-open-modal"]')
      ).toBeFocused()
      await page.locator('[data-test="reference-overrides"] summary').click()
      const overrides = page.locator('[data-test="reference-overrides"]')
      await expect(overrides.locator('h2').first()).toHaveCSS(
        'margin-bottom',
        '16px'
      )
      expect(
        parseFloat(
          await overrides
            .locator('.prose h2')
            .last()
            .evaluate((node) => getComputedStyle(node).marginTop)
        )
      ).toBeGreaterThan(0)
      await expect(
        page.locator('[data-test="reference-notification-override"]')
      ).toHaveCSS('padding-left', '4px')
      await expect(
        page.locator('[data-test="reference-notification-override"]')
      ).toHaveCSS('font-size', '18px')
      await expect(page.locator('[data-test="reference-nowrap"]')).toHaveCSS(
        'white-space',
        'nowrap'
      )
      expect(
        (await page
          .getByRole('tablist', { name: 'Compact reference' })
          .boundingBox())!.width
      ).toBeLessThan(tabWidth)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBeLessThanOrEqual(width)
    })
  }
}

for (const theme of ['neutral', 'uzh'] as const) {
  test(`navigation combined states retain paired colors (${theme})`, async ({
    page,
  }) => {
    await gotoStory(page, 'navigation-menu--default', theme)
    if (theme === 'neutral')
      await page.evaluate(() => document.documentElement.classList.add('dark'))
    const trigger = page
      .locator('[data-slot="navigation-menu-trigger"]')
      .first()
    await trigger.hover()
    await expect(trigger).toHaveAttribute('data-state', 'open')
    const primary = await page.evaluate(() => {
      const probe = document.createElement('div')
      probe.style.color = 'var(--color-primary-100)'
      probe.style.backgroundColor = 'var(--primary-container)'
      document.body.append(probe)
      const colors = {
        text: getComputedStyle(probe).color,
        fill: getComputedStyle(probe).backgroundColor,
      }
      probe.remove()
      return colors
    })
    await expect(trigger).toHaveCSS('background-color', primary.fill)
    await expect(trigger).toHaveCSS('color', primary.text)
    const link = page
      .locator(
        '[data-slot="navigation-menu-content"] [data-slot="navigation-menu-link"]'
      )
      .first()
    await link.evaluate((node) => node.setAttribute('data-active', 'true'))
    await link.focus()
    await expect(link).toHaveCSS('background-color', primary.fill)
    await expect(link).toHaveCSS('color', primary.text)
  })
}
