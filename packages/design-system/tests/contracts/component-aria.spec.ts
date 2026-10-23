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

test.describe('NativeSelect composition', () => {
  test('preserves native form values, constraint validation and wrapper placement', async ({
    page,
  }) => {
    await gotoStory(page, 'select--native-composition')
    const single = page.locator('#native-single')
    const form = page.locator('[data-test="native-form"]')
    expect(
      await single.evaluate(
        (element: HTMLSelectElement) => element.validity.valueMissing
      )
    ).toBe(true)
    await expect(single).toHaveAttribute('aria-invalid', 'true')
    await expect(single).toHaveAttribute('aria-describedby', 'native-help')
    await expect(single).toHaveCSS('min-width', '180px')
    await expect(single.locator('..')).toHaveClass(/w-full/)
    await single.selectOption('research')
    expect(
      await single.evaluate(
        (element: HTMLSelectElement) => element.validity.valid
      )
    ).toBe(true)
    await page.locator('#native-controlled').selectOption('gold')
    await expect(page.locator('#native-controlled')).toHaveValue('gold')
    const multiple = page.locator('#native-multiple')
    await expect(
      multiple.locator('..').locator('[data-slot="native-select-icon"]')
    ).toHaveCount(0)
    expect((await multiple.boundingBox())?.height).toBeGreaterThan(40)
    await multiple.selectOption(['research', 'admin'])
    const data = await form.evaluate((element: HTMLFormElement) => {
      const values = new FormData(element)
      return {
        single: values.get('single'),
        controlled: values.get('controlled'),
        multiple: values.getAll('multiple'),
        disabled: values.has('disabled'),
      }
    })
    expect(data).toEqual({
      single: 'research',
      controlled: 'gold',
      multiple: ['research', 'admin'],
      disabled: false,
    })
    await page.locator('[data-test="submit-native"]').click()
    expect(
      JSON.parse(await page.locator('[data-test="native-result"]').innerText())
    ).toEqual(data)
    await single.focus()
    await single.press('Home')
    await single.press('ArrowDown')
    await expect(single).toHaveValue('research')
    await expect(page.locator('#native-disabled')).toBeDisabled()
  })
})

test.describe('Direction context', () => {
  test('uses direction precedence for horizontal keys, nested overrides and portaled controls', async ({
    page,
  }) => {
    await gotoStory(page, 'public-contracts--direction')
    await expect(page.locator('[data-test="direction-outer"]')).toHaveText(
      'rtl'
    )
    await expect(page.locator('[data-test="direction-inner"]')).toHaveText(
      'ltr'
    )
    await expect(page.locator('[data-test="direction-inherited"]')).toHaveText(
      'rtl'
    )
    const outer = page.locator('[data-test="direction-tabs"]')
    await expect(outer).toHaveAttribute('dir', 'rtl')
    await outer.getByRole('tab').first().focus()
    await page.keyboard.press('ArrowLeft')
    await expect(outer.getByRole('tab').nth(1)).toBeFocused()
    await expect(outer.getByRole('tab').nth(1)).toHaveAttribute(
      'aria-selected',
      'true'
    )
    const inner = page.locator('[data-test="direction-inner-tabs"]')
    await expect(inner).toHaveAttribute('dir', 'ltr')
    await inner.getByRole('tab').first().focus()
    await page.keyboard.press('ArrowRight')
    await expect(inner.getByRole('tab').nth(1)).toBeFocused()
    await page.locator('[data-test="direction-select"]').click()
    await expect(page.getByRole('listbox')).toHaveAttribute('dir', 'rtl')
    await page.keyboard.press('Escape')
    await expect(page.locator('[data-test="direction-select"]')).toBeFocused()
  })
})

test.describe('Primitive Tabs compatibility', () => {
  test('preserves omitted underline and supports filled, line, vertical and caller styling', async ({
    page,
  }) => {
    await gotoStory(page, 'tabs--primitive-omitted')
    const implicit = page.getByRole('tablist', { name: 'Implicit underline' })
    await expect(implicit).toHaveAttribute('data-variant', 'line')
    await expect(implicit).toHaveCSS('border-bottom-width', '1px')
    await expect(page.locator('[data-test="tabs-helper"]')).toHaveCSS(
      'border-bottom-width',
      '1px'
    )
    const override = page.getByRole('tablist', { name: 'Caller styling' })
    await expect(override).toHaveCSS('border-radius', '0px')
    await expect(override).toHaveCSS('column-gap', '20px')
    await gotoStory(page, 'tabs--primitive-variants')
    const lists = page.getByRole('tablist')
    await expect(lists).toHaveCount(4)
    await expect(lists.nth(0)).toHaveCSS('border-bottom-width', '0px')
    await expect(lists.nth(1)).toHaveCSS('border-bottom-width', '1px')
    for (const index of [2, 3]) {
      const list = lists.nth(index)
      await expect(list).toHaveAttribute('aria-orientation', 'vertical')
      const tabs = list.getByRole('tab')
      const first = await tabs.first().boundingBox()
      const second = await tabs.nth(1).boundingBox()
      expect(second!.y).toBeGreaterThan(first!.y)
      await tabs.first().focus()
      await page.keyboard.press('ArrowDown')
      await expect(tabs.nth(1)).toBeFocused()
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    }
    await gotoStory(page, 'tabs--primitive-controlled-manual')
    const tabs = page.getByRole('tab')
    await tabs.first().focus()
    await page.keyboard.press('ArrowRight')
    await expect(tabs.nth(1)).toBeFocused()
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true')
    await page.keyboard.press('Enter')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    await page.keyboard.press('ArrowRight')
    await expect(tabs.first()).toBeFocused()
    await expect(tabs.nth(2)).toBeDisabled()
  })

  test('compact buttons retain the size ladder and usable icon bounds', async ({
    page,
  }) => {
    await gotoStory(page, 'button--primitive-sizes')
    const buttons = page.locator(STORY_SELECTOR).getByRole('button')
    const heights = [24, 32, 40, 48, 24, 32, 40, 48]
    for (let index = 0; index < heights.length; index += 1) {
      const bounds = await buttons.nth(index).boundingBox()
      expect(bounds!.height).toBe(heights[index])
      expect(bounds!.width).toBeGreaterThanOrEqual(24)
      if (index > 0) {
        const previous = await buttons.nth(index - 1).boundingBox()
        if (previous!.y === bounds!.y)
          expect(
            bounds!.x - previous!.x - previous!.width
          ).toBeGreaterThanOrEqual(8)
      }
    }
    const compactIcon = buttons.nth(4).locator('svg')
    await expect(compactIcon).toHaveCSS('width', '12px')
    await buttons.nth(4).focus()
    await expect(buttons.nth(4)).toBeFocused()
    expect(
      await buttons.nth(4).evaluate((el) => getComputedStyle(el).boxShadow)
    ).not.toBe('none')
  })
})

test('primary buttons keep readable text in neutral dark mode', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem('ladle-theme', JSON.stringify('neutral'))
    localStorage.setItem('ladle-dark', 'true')
  })
  await gotoStory(page, 'button--primitive-sizes')
  const button = page.locator('[data-slot="button"]').first()
  const contrast = () =>
    button.evaluate((element) => {
      const context = document.createElement('canvas').getContext('2d')!
      const luminance = (color: string) => {
        context.fillStyle = color
        context.fillRect(0, 0, 1, 1)
        const values = [...context.getImageData(0, 0, 1, 1).data]
          .slice(0, 3)
          .map((value) => {
            const channel = value / 255
            return channel <= 0.04045
              ? channel / 12.92
              : ((channel + 0.055) / 1.055) ** 2.4
          })
        return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722
      }
      const style = getComputedStyle(element)
      const fg = luminance(style.color)
      const bg = luminance(style.backgroundColor)
      return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05)
    })
  await expect.poll(contrast).toBeGreaterThanOrEqual(4.5)
  await button.hover()
  await expect.poll(contrast).toBeGreaterThanOrEqual(4.5)
  await page.mouse.down()
  await expect.poll(contrast).toBeGreaterThanOrEqual(4.5)
  await page.mouse.up()
})
