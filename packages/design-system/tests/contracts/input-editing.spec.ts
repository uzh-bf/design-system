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
        name: /^Appointment\b/,
      })
      await expect(trigger).toHaveAttribute('data-test', 'editing-date-trigger')
      const displayedValue = await trigger.innerText()
      await expect(trigger).toHaveAccessibleName(
        new RegExp(displayedValue.trim().split(/\s+/).join('\\s+'))
      )
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
      await page.waitForFunction(() =>
        document
          .getAnimations()
          .every(
            (animation) =>
              animation.effect?.getTiming().iterations === Infinity ||
              animation.playState !== 'running'
          )
      )
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
      await page.getByRole('button', { name: /^Appointment\b/ }).click()
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

    test('preserves native drafts through cloned parent values and hour-cycle changes', async ({
      page,
    }) => {
      await page.getByRole('checkbox', { name: 'Clone date updates' }).check()
      await page.getByRole('button', { name: /^Appointment\b/ }).click()
      const hours = page.getByRole('textbox', { name: 'Hours', exact: true })
      await hours.fill('')
      await hours.press('1')
      await expect(hours).toHaveValue('1')
      await hours.press('5')
      await expect(hours).toHaveValue('15')
      await expect(page.locator('[data-test="date-value"]')).toHaveText(
        '2026,0,15,15,24,35'
      )
      await page
        .getByRole('button', { name: 'Toggle cycle' })
        .evaluate((element: HTMLButtonElement) => element.click())
      await expect(hours).toHaveValue('03')
      await expect(
        page.getByRole('combobox', { name: 'Period', exact: true })
      ).toHaveText('PM')
    })

    test('uses unique control ids and respects segment boundaries and granularity', async ({
      page,
    }) => {
      await page.getByRole('button', { name: /^Appointment\b/ }).click()
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
        page.getByRole('button', { name: /^Appointment\b/ })
      ).toBeFocused()
      await page.getByRole('button', { name: /^Other appointment\b/ }).click()
      expect(await hours.getAttribute('id')).not.toBe(firstId)
      await page.keyboard.press('Escape')
      await page.getByRole('button', { name: 'Toggle cycle' }).click()
      await page.getByRole('button', { name: 'Reduce precision' }).click()
      await page.getByRole('button', { name: /^Appointment\b/ }).click()
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

    test('keeps an empty twelve-hour picker period and follows controlled resets', async ({
      page,
    }) => {
      const picker = page.getByRole('group', { name: 'Standalone time' })
      const period = picker.getByRole('combobox', { name: 'Standalone period' })
      const hours = picker.getByRole('textbox', {
        name: 'Standalone hours',
        exact: true,
      })
      const hourValue = picker.locator('[data-test="standalone-hour"]')
      await period.click()
      await page.getByRole('option', { name: 'PM', exact: true }).click()
      await expect(period).toHaveText('PM')
      await picker.getByRole('button', { name: 'Reset empty time' }).click()
      await expect(period).toHaveText('AM')
      await period.click()
      await page.getByRole('option', { name: 'PM', exact: true }).click()
      await hours.fill('9')
      await hours.press('Tab')
      await expect(hourValue).toHaveText('21')
      await picker.getByRole('button', { name: 'Clear time' }).click()
      await expect(period).toHaveText('AM')
      await hours.fill('9')
      await expect(hourValue).toHaveText('9')
      await picker.getByRole('button', { name: 'Set afternoon' }).click()
      await expect(period).toHaveText('PM')
      await hours.fill('10')
      await expect(hourValue).toHaveText('22')
    })

    for (const [segment, expected] of [
      ['Hours', '2026,0,15,14,24,35'],
      ['Minutes', '2026,0,15,13,25,35'],
      ['Seconds', '2026,0,15,13,24,36'],
    ] as const) {
      test(`preserves the selected date after browsing and editing ${segment}`, async ({
        page,
      }) => {
        await page.getByRole('button', { name: /^Appointment\b/ }).click()
        await page.getByRole('button', { name: /Next Month/i }).click()
        const input = page.getByRole('textbox', { name: segment, exact: true })
        await input.press('ArrowUp')
        await expect(page.locator('[data-test="date-value"]')).toHaveText(
          expected
        )
      })
    }

    test('scopes modal arrow navigation and preserves control editing', async ({
      page,
    }) => {
      const position = page.locator('[data-test="position"]')
      await page.locator('[data-test="background-input"]').press('ArrowRight')
      await expect(position).toHaveText('0')
      await page.getByRole('button', { name: 'Open navigation' }).focus()
      await page.keyboard.press('Enter')
      await expect(
        page.locator('[data-test="navigation-dialog"]')
      ).toBeFocused()
      await page.keyboard.press('ArrowRight')
      await expect(position).toHaveText('1')
      await page.keyboard.press('ArrowLeft')
      await expect(position).toHaveText('0')
      const surface = page.getByRole('group', { name: 'Slide content' })
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
