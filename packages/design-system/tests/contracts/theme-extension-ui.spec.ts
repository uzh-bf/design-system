import { expect, test } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

const STORY = 'theme-extension-contract--default'

const RAMP_VALUES = {
  '--theme-color-primary': '#d94f2b',
  '--theme-color-primary-80': '#e27454',
  '--theme-color-primary-60': '#ea997d',
  '--theme-color-primary-40': '#f2bfa7',
  '--theme-color-primary-20': '#fae4d9',
  '--primary': '#d94f2b',
  '--ring': '#d94f2b',
  '--sidebar-primary': '#d94f2b',
  '--sidebar-ring': '#d94f2b',
  '--sidebar-accent': '#fae4d9',
  '--sidebar-accent-foreground': '#d94f2b',
}

test('renders the primary-ramp contract states', async ({ page }) => {
  await gotoStory(page, STORY, 'neutral')

  for (const id of ['neutral', 'uzh', 'synthetic-ramp']) {
    const panel = page.locator(`[data-theme-contract-panel="${id}"]`)
    await expect(panel).toHaveCount(1)
    await expect(
      panel.locator(`[data-test="theme-contract-button-${id}"]`)
    ).toHaveCount(1)
    await expect(
      panel.locator(`[data-test="theme-contract-badge-${id}"]`)
    ).toHaveCount(1)
    await expect(
      panel.locator(`[data-test="theme-contract-input-${id}"]`)
    ).toHaveCount(1)
    await expect(
      panel.locator(`[data-test="theme-contract-sidebar-active-${id}"]`)
    ).toHaveCount(1)
    await expect(
      panel.locator(`[data-test="theme-contract-sidebar-hover-${id}"]`)
    ).toHaveCount(1)
  }

  const rampPanel = page.locator('[data-theme-contract-panel="synthetic-ramp"]')
  const computed = await rampPanel.evaluate((element, tokens) => {
    const styles = getComputedStyle(element)
    return Object.fromEntries(
      tokens.map((token) => [token, styles.getPropertyValue(token).trim()])
    )
  }, Object.keys(RAMP_VALUES))
  expect(computed).toEqual(RAMP_VALUES)

  await expect(
    rampPanel.locator('[data-test="theme-contract-button-synthetic-ramp"]')
  ).toHaveCSS('background-color', 'rgb(217, 79, 43)')
  await expect(
    rampPanel.locator('[data-test="theme-contract-badge-synthetic-ramp"]')
  ).toHaveCSS('background-color', 'rgb(217, 79, 43)')

  const input = rampPanel.locator(
    '[data-test="theme-contract-input-synthetic-ramp"]'
  )
  const unfocusedBoxShadow = await input.evaluate(
    (element) => getComputedStyle(element).boxShadow
  )
  await input.focus()
  await expect(input).toBeFocused()
  const focusedState = await input.evaluate((element) => {
    const styles = getComputedStyle(element)
    return {
      boxShadow: styles.boxShadow,
      ring: styles.getPropertyValue('--ring').trim(),
    }
  })
  expect(focusedState.ring).toBe('#d94f2b')
  expect(focusedState.boxShadow).not.toBe(unfocusedBoxShadow)

  const activeSidebarItem = rampPanel.locator(
    '[data-test="theme-contract-sidebar-active-synthetic-ramp"]'
  )
  await expect(activeSidebarItem).toHaveCSS(
    'background-color',
    'rgb(250, 228, 217)'
  )
  await expect(activeSidebarItem).toHaveCSS('color', 'rgb(217, 79, 43)')

  const hoverSidebarItem = rampPanel.locator(
    '[data-test="theme-contract-sidebar-hover-synthetic-ramp"]'
  )
  await hoverSidebarItem.hover()
  await expect(hoverSidebarItem).toHaveCSS(
    'background-color',
    'rgb(250, 228, 217)'
  )
  await expect(hoverSidebarItem).toHaveCSS('color', 'rgb(217, 79, 43)')
})
