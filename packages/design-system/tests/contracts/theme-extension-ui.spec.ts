import { expect, test } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

const STORY = 'theme-extension-contract--default'

const RAMP_VALUES = {
  '--theme-color-primary': '#8c2f14',
  '--theme-color-primary-80': '#a94425',
  '--theme-color-primary-60': '#c76645',
  '--theme-color-primary-40': '#e5a38f',
  '--theme-color-primary-20': '#f7d9cf',
  '--primary': '#8c2f14',
  '--ring': '#8c2f14',
  '--sidebar-primary': '#8c2f14',
  '--sidebar-ring': '#8c2f14',
  '--sidebar-accent': '#f7d9cf',
  '--sidebar-accent-foreground': '#8c2f14',
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
  ).toHaveCSS('background-color', 'rgb(140, 47, 20)')
  await expect(
    rampPanel.locator('[data-test="theme-contract-badge-synthetic-ramp"]')
  ).toHaveCSS('background-color', 'rgb(140, 47, 20)')

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
  expect(focusedState.ring).toBe('#8c2f14')
  expect(focusedState.boxShadow).not.toBe(unfocusedBoxShadow)

  const activeSidebarItem = rampPanel.locator(
    '[data-test="theme-contract-sidebar-active-synthetic-ramp"]'
  )
  await expect(activeSidebarItem).toHaveCSS(
    'background-color',
    'rgb(247, 217, 207)'
  )
  await expect(activeSidebarItem).toHaveCSS('color', 'rgb(140, 47, 20)')

  const hoverSidebarItem = rampPanel.locator(
    '[data-test="theme-contract-sidebar-hover-synthetic-ramp"]'
  )
  await hoverSidebarItem.hover()
  await expect(hoverSidebarItem).toHaveCSS(
    'background-color',
    'rgb(247, 217, 207)'
  )
  await expect(hoverSidebarItem).toHaveCSS('color', 'rgb(140, 47, 20)')
})
