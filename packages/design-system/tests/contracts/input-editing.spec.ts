import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { gotoStory } from '../_support/ladle'

for (const theme of ['neutral', 'uzh'] as const) {
  test.describe(`input editing (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await gotoStory(page, 'input-editing-contract--default', theme)
    })

    test('labels the trigger and open segments and supports native editing', async ({
      page,
    }, testInfo) => {
      const trigger = page.getByRole('button', {
        name: 'Appointment',
        exact: true,
      })
      await expect(trigger).toHaveAttribute('data-test', 'editing-date-trigger')
      await trigger.click()
      const hours = page.getByRole('textbox', { name: 'Hours', exact: true })
      const minutes = page.getByRole('textbox', {
        name: 'Minutes',
        exact: true,
      })
      const seconds = page.getByRole('textbox', {
        name: 'Seconds',
        exact: true,
      })
      await expect(hours).toHaveValue('13')
      await expect(minutes).toHaveValue('24')
      await expect(seconds).toHaveValue('35')
      const scan = await new AxeBuilder({ page })
        .include('[data-slot="popover-content"]')
        .analyze()
      expect(
        scan.violations.filter(
          ({ impact }) => impact === 'serious' || impact === 'critical'
        )
      ).toEqual([])
      await page.screenshot({
        path: testInfo.outputPath('date-editor-desktop.png'),
      })
      await page.setViewportSize({ width: 390, height: 844 })
      await expect(hours).toBeInViewport()
      await expect(minutes).toBeInViewport()
      await expect(seconds).toBeInViewport()
      await page.screenshot({
        path: testInfo.outputPath('date-editor-mobile.png'),
      })
      await minutes.fill('42')
      await expect(page.locator('[data-test="date-value"]')).toHaveText(
        '2026,0,15,13,42,35'
      )
      await hours.fill('9')
      await hours.press('Tab')
      await expect(hours).toHaveValue('09')
      await seconds.fill('99')
      await seconds.press('Tab')
      await expect(seconds).toHaveValue('59')
      await minutes.fill('')
      await expect(page.locator('[data-test="date-value"]')).toHaveText(
        '2026,0,15,9,42,59'
      )
      await minutes.press('Tab')
      await expect(minutes).toHaveValue('42')
      await minutes.fill('bad')
      await minutes.press('Tab')
      await expect(minutes).toHaveValue('42')
      await minutes.fill('123')
      await minutes.press('Tab')
      await expect(minutes).toHaveValue('42')
      await hours.focus()
      await hours.press('ControlOrMeta+A')
      await hours.press('Backspace')
      await expect(hours).toHaveValue('')
      await hours.pressSequentially('18')
      await hours.press('Tab')
      await expect(hours).toHaveValue('18')
      await minutes.focus()
      await minutes.press('ControlOrMeta+A')
      await minutes.press('Delete')
      await expect(minutes).toHaveValue('')
      await minutes.press('Tab')
      await expect(minutes).toHaveValue('42')
    })

    test('accepts clipboard paste and synchronizes externally controlled time and period', async ({
      page,
      context,
    }) => {
      await page.getByRole('button', { name: 'Toggle cycle' }).click()
      await page
        .getByRole('button', { name: 'Appointment', exact: true })
        .click()
      const hours = page.getByRole('textbox', { name: 'Hours', exact: true })
      const minutes = page.getByRole('textbox', {
        name: 'Minutes',
        exact: true,
      })
      const period = page.getByRole('combobox', { name: 'Period', exact: true })
      await expect(hours).toHaveValue('01')
      await expect(period).toHaveText('PM')
      await context.grantPermissions(['clipboard-read', 'clipboard-write'])
      await page.evaluate(() => navigator.clipboard.writeText('47'))
      await minutes.focus()
      await minutes.press('ControlOrMeta+A')
      await minutes.press('ControlOrMeta+V')
      await expect(minutes).toHaveValue('47')
      await expect(page.locator('[data-test="date-value"]')).toHaveText(
        '2026,0,15,13,47,35'
      )
      // Programmatic parent updates must work while the popover stays open.
      await page
        .locator('[data-test="external-date"]')
        .evaluate((element: HTMLButtonElement) => element.click())
      await expect(hours).toHaveValue('09')
      await expect(minutes).toHaveValue('08')
      await expect(period).toHaveText('AM')
      await hours.fill('12')
      await expect(page.locator('[data-test="date-value"]')).toHaveText(
        '2026,0,15,0,8,7'
      )
      await period.click()
      await page.getByRole('option', { name: 'PM', exact: true }).click()
      await expect(page.locator('[data-test="date-value"]')).toHaveText(
        '2026,0,15,12,8,7'
      )
      await hours.fill('99')
      await hours.press('Tab')
      await expect(hours).toHaveValue('12')
    })

    test('uses unique control ids and respects segment boundaries and granularity', async ({
      page,
    }) => {
      await page
        .getByRole('button', { name: 'Appointment', exact: true })
        .click()
      const hours = page.getByRole('textbox', { name: 'Hours', exact: true })
      const minutes = page.getByRole('textbox', {
        name: 'Minutes',
        exact: true,
      })
      const firstId = await hours.getAttribute('id')
      await hours.focus()
      await hours.evaluate((input: HTMLInputElement) =>
        input.setSelectionRange(1, 1)
      )
      await hours.press('ArrowRight')
      await expect(hours).toBeFocused()
      await hours.press('ArrowRight')
      await expect(minutes).toBeFocused()
      await minutes.press('ArrowUp')
      await expect(minutes).toHaveValue('25')
      await page.keyboard.press('Escape')
      await expect(
        page.getByRole('button', { name: 'Appointment', exact: true })
      ).toBeFocused()
      await page
        .getByRole('button', { name: 'Other appointment', exact: true })
        .click()
      expect(await hours.getAttribute('id')).not.toBe(firstId)
      await page.keyboard.press('Escape')
      await page.getByRole('button', { name: 'Toggle cycle' }).click()
      await page.getByRole('button', { name: 'Reduce precision' }).click()
      await page
        .getByRole('button', { name: 'Appointment', exact: true })
        .click()
      await expect(
        page.getByRole('textbox', { name: 'Seconds', exact: true })
      ).toHaveCount(0)
      await minutes.focus()
      await minutes.press('End')
      await minutes.press('ArrowRight')
      await expect(
        page.getByRole('combobox', { name: 'Period', exact: true })
      ).toBeFocused()
    })

    test('scopes modal arrow navigation and preserves control editing', async ({
      page,
    }) => {
      const position = page.locator('[data-test="position"]')
      await page.locator('[data-test="background-input"]').press('ArrowRight')
      await expect(position).toHaveText('0')
      await page.getByRole('button', { name: 'Open navigation' }).click()
      const surface = page.locator('[data-test="navigation-surface"]')
      await surface.press('ArrowRight')
      await expect(position).toHaveText('1')
      await surface.press('ArrowLeft')
      await expect(position).toHaveText('0')
      for (const selector of [
        'modal-input',
        'modal-editable',
        'nested-control',
        'prevented',
      ]) {
        await page.locator(`[data-test="${selector}"]`).press('ArrowRight')
        await expect(position).toHaveText('0')
      }
      await page.getByRole('slider', { name: 'Amount' }).press('ArrowRight')
      await expect(position).toHaveText('0')
      await surface.press('Shift+ArrowRight')
      await expect(position).toHaveText('0')
      await page.keyboard.press('Escape')
      await expect(page.locator('[data-test="navigation-dialog"]')).toBeHidden()
      await page.locator('[data-test="background-input"]').press('ArrowRight')
      await expect(position).toHaveText('0')
      await page.getByRole('button', { name: 'Open navigation' }).click()
      await page.getByRole('button', { name: 'Start loading' }).click()
      await expect(page.locator('[data-test="navigation-dialog"]')).toHaveCount(
        0
      )
      await page
        .locator('body')
        .dispatchEvent('keydown', { key: 'ArrowRight', bubbles: true })
      await expect(position).toHaveText('0')
    })
  })
}
