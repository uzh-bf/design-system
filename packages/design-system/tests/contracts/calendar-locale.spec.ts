import { expect, test, type Page } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

const FIXED_NOW = new Date('2026-10-20T18:00:00Z')

test.use({
  locale: 'fr-FR',
  timezoneId: 'America/Los_Angeles',
})

async function openStory(page: Page, story: string) {
  await page.clock.setFixedTime(FIXED_NOW)
  await gotoStory(page, `calendar-compatibility--${story}`)
}

test.describe('calendar locale and DayPicker contracts', () => {
  test('uses supplied locales for dropdowns and day metadata', async ({
    page,
  }) => {
    await openStory(page, 'locale-and-overrides')

    const cases = [
      { selector: '[data-test="calendar-en"]', code: 'en-US' },
      { selector: '[data-test="calendar-de"]', code: 'de' },
      { selector: '[data-test="calendar-ar"]', code: 'ar-SA' },
    ] as const

    for (const { selector, code } of cases) {
      const calendar = page.locator(selector)
      const monthOptions = calendar.locator('.rdp-months_dropdown option')
      const expectedMonths = await page.evaluate(
        (localeCode) =>
          Array.from({ length: 12 }, (_, month) =>
            new Date(2026, month, 1).toLocaleString(localeCode, {
              month: 'short',
            })
          ),
        code
      )
      await expect(monthOptions).toHaveText(expectedMonths)

      const dayCell = calendar.locator('td[data-day="2026-10-15"]')
      const dayButton = dayCell.getByRole('button')
      const expectedDay = await page.evaluate(
        (localeCode) => new Date(2026, 9, 15).toLocaleDateString(localeCode),
        code
      )
      await expect(dayButton).toHaveAttribute('data-day', expectedDay)
      const visibleDay = (await dayButton.innerText()).trim()
      expect(await dayButton.getAttribute('aria-label')).toContain(visibleDay)
    }

    const hostOptions = page.locator(
      '[data-test="calendar-host"] .rdp-months_dropdown option'
    )
    const expectedHostMonths = await page.evaluate(() =>
      Array.from({ length: 12 }, (_, month) =>
        new Date(2026, month, 1).toLocaleString(undefined, {
          month: 'short',
        })
      )
    )
    await expect(hostOptions).toHaveText(expectedHostMonths)
    const englishOptions = await page
      .locator('[data-test="calendar-en"] .rdp-months_dropdown option')
      .allTextContents()
    expect(englishOptions).not.toEqual(expectedHostMonths)
  })

  test('preserves caller formatter arguments and custom day behavior', async ({
    page,
  }) => {
    await openStory(page, 'locale-and-overrides')

    const formatter = page.locator(
      '[data-test="calendar-formatter"] .rdp-months_dropdown'
    )
    const formatterOutput = await formatter
      .locator('option:checked')
      .innerText()
    const calls = await page.evaluate(
      () =>
        (
          window as Window & {
            __calendarCompatibilityFormatter?: Array<{
              argumentCount: number
              dateIsDate: boolean
              dateLibFormat: string
              dateLibLocale: string | undefined
              month: number
              output: string
            }>
          }
        ).__calendarCompatibilityFormatter ?? []
    )
    expect(calls.length).toBeGreaterThan(0)
    expect(calls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          argumentCount: 2,
          dateIsDate: true,
          dateLibFormat: 'function',
          dateLibLocale: 'de',
          month: 9,
          output: formatterOutput,
        }),
      ])
    )

    await expect(
      page.locator(
        '[data-direct-calendar="true"] td[data-day="2026-10-15"] button'
      )
    ).toHaveAttribute(
      'data-day',
      await page.evaluate(() => new Date(2026, 9, 15).toLocaleDateString('de'))
    )

    const customCalendar = page.locator('[data-test="calendar-custom-day"]')
    const customButtons = customCalendar.locator(
      'button[data-custom-day="true"]'
    )
    await expect(customButtons.first()).toHaveAttribute('type', 'button')
    const target = customCalendar.locator('td[data-day="2026-10-16"] button')
    await expect(target).toHaveAttribute('data-custom-day', 'true')
    await expect(target).toHaveAccessibleName(/Caller day 16/)
    await expect(target).toHaveText('16')
    await target.click()
    await expect(page.locator('[data-test="custom-day-clicked"]')).toHaveText(
      '2026-10-16'
    )
    await expect(target).toHaveAttribute('tabindex', '0')

    await page.locator('[data-test="focus-custom-day-ref"]').click()
    await expect(target).toBeFocused()
    await page.keyboard.press('ArrowRight')
    await expect(
      customCalendar.locator('td[data-day="2026-10-17"] button')
    ).toBeFocused()
  })

  test('keeps the navigation bounds and supports dropdown navigation', async ({
    page,
  }) => {
    await openStory(page, 'bounds-and-navigation')

    await expect(
      page.locator('[data-test="default-month"] .rdp-months_dropdown')
    ).toHaveValue('9')
    await expect(
      page.locator('[data-test="default-month"] .rdp-years_dropdown')
    ).toHaveValue('2026')

    const defaultYears = page.locator(
      '[data-test="bounds-default"] .rdp-years_dropdown option'
    )
    await expect(defaultYears.first()).toHaveAttribute('value', '2025')
    await expect(defaultYears.last()).toHaveAttribute('value', '2125')

    const explicitYears = page.locator(
      '[data-test="bounds-explicit"] .rdp-years_dropdown option'
    )
    await expect(explicitYears.first()).toHaveAttribute('value', '2020')
    await expect(explicitYears.last()).toHaveAttribute('value', '2028')

    await openStory(page, 'locale-and-overrides')
    const englishCalendar = page.locator('[data-test="calendar-en"]')
    await englishCalendar.locator('.rdp-years_dropdown').selectOption('2027')
    await englishCalendar.locator('.rdp-months_dropdown').selectOption('2')
    await expect(
      englishCalendar.locator('td[data-day="2027-03-15"]')
    ).toBeVisible()
  })

  test('retains single, multiple, range and disabled selection states', async ({
    page,
  }) => {
    await openStory(page, 'selection-and-grid-hooks')

    const single = page.locator('[data-test="calendar-single"]')
    await single.locator('td[data-day="2026-10-16"] button').click()
    const singleTimestamp = await page.evaluate(() =>
      new Date(2026, 9, 16).getTime()
    )
    await expect(page.locator('[data-test="single-value"]')).toHaveText(
      new Date(singleTimestamp).toISOString()
    )

    const disabled = single.locator('td[data-day="2026-10-20"] button')
    await expect(disabled).toBeDisabled()
    await disabled.click({ force: true })
    await expect(page.locator('[data-test="single-value"]')).toHaveText(
      new Date(singleTimestamp).toISOString()
    )

    const multiple = page.locator('[data-test="calendar-multiple"]')
    const initialMultiple = JSON.parse(
      await page.locator('[data-test="multiple-value"]').innerText()
    ) as number[]
    await multiple.locator('td[data-day="2026-10-14"] button').click()
    const multipleValues = JSON.parse(
      (await page.locator('[data-test="multiple-value"]').innerText())!
    ) as number[]
    expect(multipleValues).toHaveLength(initialMultiple.length + 1)
    expect(multipleValues).toEqual(expect.arrayContaining(initialMultiple))
    expect(multipleValues).toContain(
      await page.evaluate(() => new Date(2026, 9, 14).getTime())
    )

    const range = page.locator('[data-test="calendar-range"]')
    await range.locator('td[data-day="2026-10-05"] button').click()
    await range.locator('td[data-day="2026-10-21"] button').click()
    await expect(range.locator('button[data-range-start="true"]')).toHaveCount(
      1
    )
    await expect(range.locator('button[data-range-end="true"]')).toHaveCount(1)
    expect(
      await range.locator('button[data-range-middle="true"]').count()
    ).toBeGreaterThan(0)
    const rangeValue = JSON.parse(
      (await page.locator('[data-test="range-value"]').innerText())!
    ) as { from: number; to: number }
    expect(rangeValue).toEqual({
      from: await page.evaluate(() => new Date(2026, 9, 5).getTime()),
      to: await page.evaluate(() => new Date(2026, 9, 21).getTime()),
    })
  })

  test('uses the canonical grid hook and lets it win over legacy table', async ({
    page,
  }) => {
    await openStory(page, 'selection-and-grid-hooks')

    await expect(page.locator('[data-test="grid-legacy"] table')).toHaveClass(
      /grid-legacy-only/
    )
    await expect(
      page.locator('[data-test="grid-canonical"] table')
    ).toHaveClass(/grid-canonical-only/)
    const both = page.locator('[data-test="grid-both"] table')
    await expect(both).toHaveClass(/grid-canonical-wins/)
    await expect(both).not.toHaveClass(/grid-legacy-loses/)
  })

  test('moves one calendar day toward the left under RTL ArrowRight', async ({
    page,
  }) => {
    await openStory(page, 'direction-and-timezone')

    const rtl = page.locator('[data-test="calendar-rtl"]')
    await expect(rtl.locator('button[data-range-start="true"]')).toHaveCount(1)
    await expect(rtl.locator('button[data-range-end="true"]')).toHaveCount(1)
    const day = rtl.locator('td[data-day="2026-10-15"] button')
    await day.focus()
    await page.keyboard.press('ArrowRight')
    await expect(rtl.locator('td[data-day="2026-10-14"] button')).toBeFocused()
    await expect(rtl).toHaveAttribute('dir', 'rtl')
  })

  test('keeps the selected instant and calendar date explicit across zones', async ({
    page,
  }) => {
    // Playwright's fake Date erases TZDate subclass behavior; fixed instants and
    // explicit fixture bounds keep this native-zone case deterministic.
    await gotoStory(page, 'calendar-compatibility--direction-and-timezone')

    const instant = Date.parse('2026-10-15T02:30:00Z')
    await expect(page.locator('[data-test="browser-time-zone"]')).toHaveText(
      'America/Los_Angeles'
    )
    const hostDisplay = await page.evaluate(
      (timestamp) =>
        new Date(timestamp).toLocaleDateString('en-CA', {
          timeZone: 'America/Los_Angeles',
        }),
      instant
    )
    const utcDisplay = await page.evaluate(
      (timestamp) =>
        new Date(timestamp).toLocaleDateString('en-CA', {
          timeZone: 'UTC',
        }),
      instant
    )
    const kiritimatiDisplay = await page.evaluate(
      (timestamp) =>
        new Date(timestamp).toLocaleDateString('en-CA', {
          timeZone: 'Pacific/Kiritimati',
        }),
      instant
    )
    await expect(page.locator('[data-test="host-instant-day"]')).toHaveText(
      hostDisplay
    )
    await expect(page.locator('[data-test="utc-value"]')).toHaveText(
      String(instant)
    )
    await expect(page.locator('[data-test="utc-display"]')).toHaveText(
      utcDisplay
    )
    await expect(page.locator('[data-test="kiritimati-value"]')).toHaveText(
      String(instant)
    )
    await expect(page.locator('[data-test="kiritimati-display"]')).toHaveText(
      kiritimatiDisplay
    )
    expect(hostDisplay).not.toBe(utcDisplay)
    expect(hostDisplay).not.toBe(kiritimatiDisplay)

    for (const calendar of ['calendar-utc', 'calendar-kiritimati']) {
      await expect(
        page.locator(
          `[data-test="${calendar}"] td[data-selected="true"][data-day="2026-10-15"]`
        )
      ).toHaveCount(1)
    }

    const utcCalendar = page.locator('[data-test="calendar-utc"]')
    await utcCalendar.locator('td[data-day="2026-10-16"] button').click()
    await expect(page.locator('[data-test="utc-display"]')).toHaveText(
      await page.evaluate(() =>
        new Date(2026, 9, 16).toLocaleDateString('en-CA', {
          timeZone: 'UTC',
        })
      )
    )
    await expect(page.locator('[data-test="utc-value"]')).toHaveText(
      String(Date.UTC(2026, 9, 16))
    )
    const kiritimatiCalendar = page.locator('[data-test="calendar-kiritimati"]')
    await kiritimatiCalendar.locator('td[data-day="2026-10-16"] button').click()
    await expect(page.locator('[data-test="kiritimati-value"]')).toHaveText(
      String(Date.UTC(2026, 9, 15, 10))
    )
    await page.locator('[data-test="reset-time-zones"]').click()
    await expect(page.locator('[data-test="utc-value"]')).toHaveText(
      String(instant)
    )
    await expect(
      utcCalendar.locator('td[data-selected="true"][data-day="2026-10-15"]')
    ).toHaveCount(1)
  })

  test('shows Formik empty, invalid, error and disabled states', async ({
    page,
  }) => {
    await openStory(page, 'formik-pickers')

    const dateTrigger = page.locator('[data-test="formik-date-trigger"]')
    const datetimeTrigger = page.locator(
      '[data-test="formik-datetime-trigger"]'
    )
    await expect(dateTrigger).toBeEnabled()
    await expect(datetimeTrigger).toBeEnabled()
    await expect(dateTrigger).toHaveAccessibleName(/.+/)
    await expect(datetimeTrigger).toHaveAccessibleName(/.+/)
    await expect(dateTrigger).toHaveAccessibleName(/\*/)
    await expect(datetimeTrigger).toHaveAccessibleName(/\*/)

    await page.locator('[data-test="formik-empty-invalid"]').click()
    await expect(page.locator('[data-test="formik-date-value"]')).toHaveText(
      'null'
    )
    await expect(
      page.locator('[data-test="formik-datetime-value"]')
    ).toHaveText('null')
    await expect(dateTrigger).toHaveAttribute('aria-invalid', 'true')
    await expect(datetimeTrigger).toHaveAttribute('aria-invalid', 'true')
    const invalidState = JSON.parse(
      await page.locator('[data-test="formik-state"]').innerText()
    ) as { errors: { date: string; datetime: string } }
    await expect(
      page.getByRole('button', { name: invalidState.errors.date, exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('button', {
        name: invalidState.errors.datetime,
        exact: true,
      })
    ).toBeVisible()

    await page.locator('[data-test="formik-toggle-disabled"]').click()
    await expect(dateTrigger).toBeDisabled()
    await expect(datetimeTrigger).toBeDisabled()
    await page.locator('[data-test="formik-reset"]').click()
    await expect(dateTrigger).toBeEnabled()
    await expect(datetimeTrigger).toBeEnabled()
    const state = JSON.parse(
      (await page.locator('[data-test="formik-state"]').innerText())!
    ) as { disabled: boolean; errors: object; touched: object }
    expect(state).toEqual({ disabled: false, errors: {}, touched: {} })
  })

  test('preserves Formik selection, time editing and reset values', async ({
    page,
  }) => {
    await openStory(page, 'formik-pickers')

    const initialDate = JSON.parse(
      (await page.locator('[data-test="formik-date-value"]').innerText())!
    )
    const initialDatetime = JSON.parse(
      (await page.locator('[data-test="formik-datetime-value"]').innerText())!
    )
    expect(initialDate).not.toBeNull()
    expect(initialDatetime).not.toBeNull()

    const dateTrigger = page.locator('[data-test="formik-date-trigger"]')
    await dateTrigger.click()
    await page
      .locator(
        '[data-test="formik-date-calendar"] td[data-day="2026-10-18"] button'
      )
      .click()
    await page.keyboard.press('Escape')
    await expect(dateTrigger).toBeFocused()
    expect(
      JSON.parse(
        (await page.locator('[data-test="formik-date-value"]').innerText())!
      )
    ).toMatchObject({ day: 18, month: 9, year: 2026 })

    const datetimeTrigger = page.locator(
      '[data-test="formik-datetime-trigger"]'
    )
    await datetimeTrigger.click()
    await page
      .locator(
        '[data-test="formik-datetime-calendar"] td[data-day="2026-10-19"] button'
      )
      .click()
    const hours = page.locator('[data-test="formik-datetime-hours"]')
    await hours.fill('18')
    await hours.press('Escape')
    expect(
      JSON.parse(
        (await page.locator('[data-test="formik-datetime-value"]').innerText())!
      )
    ).toMatchObject({ day: 19, hour: 18, month: 9, year: 2026 })

    await page.locator('[data-test="formik-reset"]').click()
    await expect(page.locator('[data-test="formik-date-value"]')).toHaveText(
      JSON.stringify(initialDate)
    )
    await expect(
      page.locator('[data-test="formik-datetime-value"]')
    ).toHaveText(JSON.stringify(initialDatetime))
  })
})
