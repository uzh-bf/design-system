import { expect, test } from '@playwright/test'

import { STORY_SELECTOR, gotoStory } from '../_support/ladle'

/**
 * Characters an id may contain and still be addressable by a plain CSS id
 * selector. React 19 `useId()` values fail this on their own (`«r0»`), which is
 * why the components sanitize before they build ids out of them.
 */
const SELECTABLE_ID = /^[A-Za-z0-9_-]+$/

test.describe('Tabs ARIA wiring', () => {
  test('trigger and panel ids are selectable and resolve to each other', async ({
    page,
  }) => {
    await gotoStory(page, 'tabs--default')

    const triggers = page.getByRole('tab')
    const triggerCount = await triggers.count()
    expect(triggerCount).toBeGreaterThan(1)

    for (let index = 0; index < triggerCount; index += 1) {
      const trigger = triggers.nth(index)
      expect(await trigger.getAttribute('id')).toMatch(SELECTABLE_ID)
      expect(await trigger.getAttribute('aria-controls')).toMatch(SELECTABLE_ID)
    }

    // Radix mounts only the active panel, so the resolvable pair is the
    // selected trigger and the panel it controls.
    const selectedTrigger = page.getByRole('tab', { selected: true })
    const panel = page.getByRole('tabpanel')
    const panelId = await panel.getAttribute('id')
    const labelledBy = await panel.getAttribute('aria-labelledby')

    expect(panelId).toMatch(SELECTABLE_ID)
    expect(labelledBy).toMatch(SELECTABLE_ID)
    expect(await selectedTrigger.getAttribute('aria-controls')).toBe(panelId)
    expect(await selectedTrigger.getAttribute('id')).toBe(labelledBy)
    await expect(page.locator(`#${labelledBy}`)).toHaveCount(1)
    await expect(page.locator(`#${panelId}`)).toHaveCount(1)
  })
})

test.describe('Label required marker', () => {
  /**
   * `aria-labelledby` and `<label for>` compute the accessible name from the
   * id-bearing element's own content, so the visible required asterisk must
   * render inside the labelling element — including in the tooltip branches,
   * which used to place it as a sibling.
   */
  test('a required label with a tooltip carries the asterisk inside the labelling element', async ({
    page,
  }) => {
    await gotoStory(page, 'label--required-tooltip')

    // Scoped to the story area: the Ladle toolbar renders labels of its own.
    const label = page.locator(STORY_SELECTOR).locator('label')
    await expect(label).toHaveCount(1)
    await expect(label).toContainText('Required label')
    await expect(label).toContainText('*')
  })
})

test.describe('Collapsible trigger naming', () => {
  test('the icon-only default trigger keeps its state-describing name', async ({
    page,
  }) => {
    await gotoStory(page, 'collapsible--default')

    const trigger = page.getByRole('button', { name: 'Expand section' })
    await expect(trigger).toHaveCount(1)

    await trigger.click()
    await expect(
      page.getByRole('button', { name: 'Collapse section' })
    ).toHaveCount(1)
  })

  test('a custom trigger is named by its own content', async ({ page }) => {
    await gotoStory(page, 'collapsible--complex')

    await expect(
      page.getByRole('button', { name: 'Custom Trigger' })
    ).toHaveCount(1)
    await expect(
      page.getByRole('button', { name: 'Expand section' })
    ).toHaveCount(0)
  })
})
