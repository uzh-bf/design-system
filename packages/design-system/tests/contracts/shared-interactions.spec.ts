import { expect, test } from '@playwright/test'
import { gotoStory } from '../_support/ladle'

for (const theme of ['neutral', 'uzh'] as const) {
  test(`AlertDialog preserves native buttons, submission and compact sizing (${theme})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoStory(page, 'shared-interactions--overlays', theme)
    const widths: number[] = []
    for (const size of ['omitted', 'sm']) {
      const trigger = page.locator(`[data-test="open-alert-${size}"]`)
      await trigger.click()
      const content = page.locator('[data-test="alert-content"]')
      await expect(content).toHaveAccessibleName(/.+/)
      await expect(page.locator('[data-test="alert-media"]')).toHaveJSProperty(
        'tagName',
        'DIV'
      )
      const action = page.locator('[data-test="keep-alert"]')
      await expect(action).toHaveJSProperty('tagName', 'BUTTON')
      await expect(action.locator('button')).toHaveCount(0)
      await expect(action).toHaveAttribute('data-variant', 'outline')
      await expect(action).toHaveAttribute('data-size', 'sm')
      await expect(action).toHaveCSS('height', '24px')
      await action.click()
      await expect(content).toBeVisible()
      widths.push((await content.boundingBox())!.width)
      expect(widths.at(-1)).toBeLessThanOrEqual(390 - 32)
      await content.getByRole('button', { name: 'Cancel', exact: true }).click()
      await expect(content).toHaveCount(0)
      await expect(trigger).toBeFocused()
    }
    await expect(page.locator('[data-test="overlay-cancelled"]')).toHaveText(
      '2'
    )
    await page.locator('[data-test="open-alert-sm"]').click()
    await page.locator('[data-test="submit-alert"]').click()
    await expect(page.locator('[data-test="overlay-submitted"]')).toHaveText(
      '1'
    )
    await expect(page.locator('[data-test="alert-content"]')).toHaveCount(0)
    await page.setViewportSize({ width: 1280, height: 1000 })
    for (const size of ['omitted', 'sm']) {
      await page.locator(`[data-test="open-alert-${size}"]`).click()
      widths.push(
        (await page.locator('[data-test="alert-content"]').boundingBox())!.width
      )
      await page.getByRole('button', { name: 'Cancel', exact: true }).click()
      await expect(page.locator('[data-test="alert-content"]')).toHaveCount(0)
    }
    expect(widths[3]).toBeLessThan(widths[2])
    await page.locator('[data-test="open-alert-wide"]').click()
    const wide = page.locator('[data-test="alert-content"]')
    await expect(wide).toHaveCSS('max-width', '512px')
    expect((await wide.boundingBox())!.width).toBeGreaterThan(widths[3])
    await page.getByRole('button', { name: 'Cancel', exact: true }).click()
    await expect(wide).toHaveCount(0)
  })

  test(`close flags and explicit portal ownership preserve focus (${theme})`, async ({
    page,
  }) => {
    await gotoStory(page, 'shared-interactions--overlays', theme)
    for (const flag of ['omitted', 'true']) {
      const trigger = page.locator(`[data-test="open-dialog-${flag}"]`)
      await trigger.click()
      const content = page.locator('[data-test="dialog-content"]')
      await expect(content).toHaveAccessibleName(/.+/)
      await expect(page.locator('[data-slot="dialog-overlay"]')).toHaveCount(1)
      const footerClose = page.locator(
        '[data-test="dialog-footer"] [data-slot="dialog-close"]'
      )
      await expect(footerClose).toHaveCount(flag === 'true' ? 1 : 0)
      if (flag === 'true') await footerClose.click()
      else await page.keyboard.press('Escape')
      await expect(content).toHaveCount(0)
      await expect(trigger).toBeFocused()
    }
    for (const flag of ['omitted', 'false']) {
      const trigger = page.locator(`[data-test="open-sheet-${flag}"]`)
      await trigger.click()
      const content = page.locator('[data-test="sheet-content"]')
      await expect(
        content.getByRole('button', { name: 'Close', exact: true })
      ).toHaveCount(flag === 'false' ? 0 : 1)
      await page.keyboard.press('Escape')
      await expect(content).toHaveCount(0)
      await expect(trigger).toBeFocused()
    }
    for (const portaled of ['false', 'true']) {
      const trigger = page.locator(`[data-test="open-popover-${portaled}"]`)
      await trigger.click()
      const content = page.locator('[data-test="popover-content"]')
      await expect(content).toHaveAccessibleName(/.+/)
      await expect(
        page.locator('[data-test="popover-title"]')
      ).toHaveJSProperty('tagName', 'DIV')
      await expect(
        page.locator('[data-test="popover-description"]')
      ).toHaveJSProperty('tagName', 'P')
      const owned = await page
        .locator(`[data-test="popover-owner-${portaled}"]`)
        .locator('[data-slot="popover-content"]')
        .count()
      expect(owned).toBe(portaled === 'false' ? 1 : 0)
      await expect(page.locator('[data-test="popover-focus"]')).toBeFocused()
      await page.keyboard.press('Escape')
      await expect(content).toHaveCount(0)
      await expect(trigger).toBeFocused()
    }
  })

  test(`menu insets retain checks, radio values and RTL submenu keys (${theme})`, async ({
    page,
  }) => {
    await gotoStory(page, 'shared-interactions--menus', theme)
    for (const family of ['dropdown', 'context', 'menubar']) {
      const trigger = page.locator(`[data-test="open-${family}"]`)
      const content = page.locator(
        `[data-slot="${family === 'dropdown' ? 'dropdown-menu' : family === 'context' ? 'context-menu' : 'menubar'}-content"]`
      )
      const open = () =>
        trigger.click(family === 'context' ? { button: 'right' } : {})
      await open()
      for (const kind of ['checkbox', 'radio']) {
        const omitted = page.locator(`[data-test="${family}-${kind}-default"]`)
        const inset = page.locator(`[data-test="${family}-${kind}-inset"]`)
        await expect(inset).toHaveAttribute('data-inset', 'true')
        const insets = await Promise.all(
          [omitted, inset].map((item) =>
            item.evaluate((node) =>
              Number.parseFloat(getComputedStyle(node).paddingLeft)
            )
          )
        )
        expect(insets[1]).toBeGreaterThan(insets[0])
      }
      const before = await page
        .locator('[data-test="menu-checked"]')
        .textContent()
      await page.locator(`[data-test="${family}-checkbox-inset"]`).click()
      await expect(page.locator('[data-test="menu-checked"]')).toHaveText(
        before === 'true' ? 'false' : 'true'
      )
      if (family !== 'dropdown') {
        await expect(content).toHaveCount(0)
        await open()
      }
      await page.locator(`[data-test="${family}-radio-inset"]`).click()
      await expect(page.locator('[data-test="menu-radio"]')).toHaveText('b')
      await expect(content).toHaveCount(0)
    }
    const trigger = page.locator('[data-test="open-dropdown"]')
    await trigger.click()
    const submenu = page.locator('[data-test="open-submenu"]')
    await submenu.focus()
    await page.keyboard.press('ArrowLeft')
    await expect(page.locator('[data-test="submenu-action"]')).toBeVisible()
    await page.keyboard.press('ArrowRight')
    await expect(submenu).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(trigger).toBeFocused()
  })

  test(`Command checks differ from focus and Select preserves both positioning modes (${theme})`, async ({
    page,
  }) => {
    await gotoStory(page, 'shared-interactions--command-and-select', theme)
    const unchecked = page.locator('[data-test="command-unchecked"]')
    await expect(unchecked).toHaveAttribute('data-selected', 'true')
    await expect(
      unchecked.locator('[data-slot="command-item-indicator"]')
    ).toHaveCount(0)
    const checked = page.locator('[data-test="command-checked"]')
    await expect(checked).toHaveAttribute('data-selected', 'false')
    await expect(
      checked.locator('[data-slot="command-item-indicator"]')
    ).toBeVisible()
    await expect(
      page.locator(
        '[data-test="command-shortcut"] [data-slot="command-item-indicator"]'
      )
    ).toBeHidden()
    await expect(page.locator('[data-test="command-legacy"] svg')).toHaveCount(
      1
    )
    await expect(
      page.locator(
        '[data-test="command-legacy"] [data-slot="command-item-indicator"]'
      )
    ).toHaveCount(0)
    const anchor = page.locator('[data-test="command-anchor"]')
    await expect(anchor).toHaveJSProperty('tagName', 'A')
    await expect(anchor).toHaveAttribute('href', '#checked-anchor')
    await expect(
      anchor.locator('[data-slot="command-item-indicator"]')
    ).toBeVisible()
    await page
      .getByRole('combobox', { name: 'Search synthetic commands' })
      .fill('checked')
    await expect(page.locator('[data-test="command-separator"]')).toHaveCount(0)
    await expect(
      page.locator('[data-test="command-separator-always"]')
    ).toBeVisible()
    await page.locator('[data-test="open-command-dialog"]').click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toHaveAccessibleName(/.+/)
    await expect(dialog.locator('[data-slot="command"]')).toHaveCount(1)
    await expect(
      dialog.getByRole('button', { name: 'Close', exact: true })
    ).toHaveCount(0)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    const defaultHeight = (await page
      .locator('[data-test="select-omitted"]')
      .boundingBox())!.height
    const compactHeight = (await page
      .locator('[data-test="select-popper"]')
      .boundingBox())!.height
    expect(compactHeight).toBeLessThan(defaultHeight)
    for (const mode of ['omitted', 'popper', 'item-aligned']) {
      const trigger = page.locator(`[data-test="select-${mode}"]`)
      await trigger.focus()
      await page.keyboard.press('Enter')
      const content = page.locator('[data-slot="select-content"]')
      await expect(content).toHaveAttribute(
        'data-align-trigger',
        String(mode === 'item-aligned')
      )
      await expect(content.locator('[data-position]')).toHaveAttribute(
        'data-position',
        mode === 'omitted' ? 'popper' : mode
      )
      await content.getByRole('option').nth(1).click()
      await expect(trigger).toBeFocused()
    }
    await page.locator('[data-test="submit-selects"]').click()
    expect(
      JSON.parse(
        (await page.locator('[data-test="select-submitted"]').textContent())!
      )
    ).toEqual({ omitted: 'b', popper: 'b', 'item-aligned': 'b' })
  })
}

for (const [selector, button] of [
  ['open-dropdown', 'left'],
  ['open-context', 'right'],
  ['open-menubar', 'left'],
] as const) {
  test(`menu focus remains contained and Escape restores the opener (${selector})`, async ({
    page,
  }) => {
    await gotoStory(page, 'shared-interactions--menus')
    const trigger = page.locator(`[data-test="${selector}"]`)
    await trigger.focus()
    await trigger.click({ button })
    const menu = page.getByRole('menu').first()
    await expect(menu).toBeVisible()
    if (selector !== 'open-menubar') {
      for (const key of ['Tab', 'Shift+Tab']) {
        await page.keyboard.press(key)
        expect(
          await menu.evaluate((element) =>
            element.contains(document.activeElement)
          )
        ).toBe(true)
      }
    }
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}
