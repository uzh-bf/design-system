import { expect, test } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

const story = 'composite-refs--default'

test.describe('composite ref contracts', () => {
  test('focuses every public composite target', async ({ page }) => {
    await gotoStory(page, story)

    const cases = [
      ['focus-checkbox', '[data-test="ref-checkbox"]'],
      ['focus-switch', '[data-test="ref-switch"]'],
      ['focus-slider', '[data-test="ref-slider"]'],
      ['focus-collapsible', '[data-test="ref-collapsible"]'],
      ['focus-dropdown', '[data-test="ref-dropdown"]'],
      ['focus-multi-select', '[data-test="ref-multi-select"]'],
      ['focus-select-field', '[data-test="ref-select-field"]'],
      ['focus-pin', '#ref-pin'],
      ['focus-color-picker', '[data-test="ref-color-picker"]'],
      ['focus-date-picker', '[data-test="ref-date-picker"]'],
      ['focus-date-range-picker', '[data-test="ref-date-range-picker"]'],
      ['focus-date-time-picker', '[data-test="ref-date-time-picker"]'],
    ] as const

    for (const [action, target] of cases) {
      await page.locator(`[data-test="${action}"]`).click()
      await expect(page.locator(target)).toBeFocused()
    }

    const sliderTrack = page
      .locator('[data-test="ref-slider"]')
      .locator('xpath=../preceding-sibling::span[1]')
    await expect(sliderTrack).toHaveCSS(
      'background-color',
      'rgb(239, 239, 239)'
    )
  })

  test('keeps stateful trigger focus and dismissal behavior intact', async ({
    page,
  }) => {
    await gotoStory(page, story)

    const cases = [
      'ref-collapsible',
      'ref-dropdown',
      'ref-multi-select',
      'ref-select-field',
      'ref-date-picker',
      'ref-date-range-picker',
      'ref-date-time-picker',
    ] as const

    for (const target of cases) {
      const trigger = page.locator(`[data-test="${target}"]`)
      await trigger.focus()
      await expect(trigger).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await page.keyboard.press(
        target === 'ref-collapsible' ? 'Enter' : 'Escape'
      )
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(trigger).toBeFocused()
    }

    const colorTrigger = page.locator('[data-test="ref-color-picker"]')
    await colorTrigger.focus()
    await page.keyboard.press('Enter')
    await expect(colorTrigger).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(colorTrigger).toHaveAttribute('aria-expanded', 'false')
    await expect(colorTrigger).toBeFocused()
  })

  test('preserves stateful selections and focus return', async ({ page }) => {
    await gotoStory(page, story)

    const dropdownTrigger = page.locator('[data-test="ref-dropdown"]')
    await dropdownTrigger.click()
    await page.getByRole('menuitem', { name: 'One' }).click()
    await expect(page.locator('[data-test="selected-dropdown"]')).toHaveText(
      'One'
    )
    await expect(dropdownTrigger).toBeFocused()

    const multiSelectTrigger = page.locator('[data-test="ref-multi-select"]')
    await multiSelectTrigger.click()
    await page.getByRole('option', { name: 'One' }).click()
    await expect(multiSelectTrigger).toContainText('1 selected')
    await page.keyboard.press('Escape')
    await expect(multiSelectTrigger).toBeFocused()

    const selectTrigger = page.locator('[data-test="ref-select-field"]')
    await selectTrigger.click()
    await page.getByRole('option', { name: 'One' }).click()
    await expect(selectTrigger).toContainText('One')
    await expect(selectTrigger).toHaveAttribute('aria-expanded', 'false')
    await expect(selectTrigger).toBeFocused()

    const dateCases = [
      ['ref-date-picker', 'Pick a date'],
      ['ref-date-range-picker', 'Pick a date range'],
      ['ref-date-time-picker', 'Pick a date'],
    ] as const

    for (const [target, placeholder] of dateCases) {
      const trigger = page.locator(`[data-test="${target}"]`)
      await trigger.click()
      const dayButtons = page.locator(
        '[data-slot="calendar"] button[data-day]:not([disabled])'
      )
      await dayButtons.first().click()
      if (target === 'ref-date-range-picker') {
        await dayButtons.nth(1).click()
      }
      await expect(trigger).not.toContainText(placeholder)
      await page.keyboard.press('Escape')
      await expect(trigger).toBeFocused()
    }

    const colorTrigger = page.locator('[data-test="ref-color-picker"]')
    await colorTrigger.click()
    const dialog = page.getByRole('dialog', { name: 'Pick a color' })
    await dialog.getByRole('button', { name: 'Preset color #016272' }).click()
    await dialog.locator('[data-test="submit-color-picker"]').click()
    await expect(page.locator('[data-test="selected-color"]')).toHaveText(
      '#016272'
    )
    await expect(colorTrigger).toBeFocused()
  })

  test('reports and resets an actual date range selection', async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date('2026-10-20T18:00:00Z'))
    await gotoStory(page, story)

    const trigger = page.locator('[data-test="ref-date-range-picker"]')
    await trigger.click()
    const firstMonth = page.locator('[data-slot="calendar"] .rdp-month').first()
    const availableDays = firstMonth.locator(
      'td[data-day]:not([data-outside="true"]) button:not([disabled])'
    )
    const fromCell = availableDays.nth(4).locator('xpath=..')
    const toCell = availableDays.nth(14).locator('xpath=..')
    const fromDay = (await fromCell.getAttribute('data-day'))!
    const toDay = (await toCell.getAttribute('data-day'))!

    await fromCell.getByRole('button').click()
    await toCell.getByRole('button').click()
    const selected = JSON.parse(
      (await page.locator('[data-test="selected-range"]').innerText())!
    ) as {
      from: { day: number; month: number; timestamp: number; year: number }
      to: { day: number; month: number; timestamp: number; year: number }
    }
    const toDateParts = (value: string) => {
      const [year, month, day] = value.split('-').map(Number)
      return { day, month, year }
    }
    expect(selected.from).toMatchObject(toDateParts(fromDay))
    expect(selected.to).toMatchObject(toDateParts(toDay))
    await expect(
      page.locator('[data-slot="calendar"] button[data-range-start="true"]')
    ).toHaveCount(1)
    await expect(
      page.locator('[data-slot="calendar"] button[data-range-end="true"]')
    ).toHaveCount(1)

    await page.keyboard.press('Escape')
    await expect(trigger).toBeFocused()
    await page.locator('[data-test="reset-date-range"]').click()
    await expect(page.locator('[data-test="selected-range"]')).toHaveText(
      JSON.stringify({ from: null, to: null })
    )
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await trigger.click()
    await availableDays.nth(2).click()
    const resetSelection = JSON.parse(
      (await page.locator('[data-test="selected-range"]').innerText())!
    ) as { from: object | null; to: object | null }
    expect(resetSelection.from).not.toBeNull()
    await page.keyboard.press('Escape')
  })

  test('resets Table sorting through the imperative ref', async ({ page }) => {
    await gotoStory(page, 'table--reset-table')

    const countHeader = page.getByRole('columnheader', { name: 'Count' })
    const countButton = page.getByRole('button', { name: 'Count' })
    await expect(countHeader).toHaveAttribute('aria-sort', 'none')

    await countButton.click()
    await expect(countHeader).toHaveAttribute('aria-sort', 'ascending')

    await page.locator('[data-test="reset-table"]').click()
    await expect(countHeader).toHaveAttribute('aria-sort', 'none')
  })
})
