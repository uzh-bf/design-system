import { expect, test, type Page } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

const text = (testId: string) => `[data-test="${testId}"]`
const amountField = (page: Page, required = false) =>
  page.getByRole('textbox', {
    name: required ? 'Amount *' : 'Amount',
    exact: true,
  })

test.describe('RHF field wrappers', () => {
  test('context mode owns text, number, select, and multi-select values', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--default')

    const number = amountField(page)
    await expect(page.locator(text('rhf-text'))).toHaveAccessibleName('Name')
    await expect(number).toHaveAccessibleName('Amount')
    await expect(page.locator(text('rhf-text'))).toHaveAttribute('name', 'name')
    await expect(number).toHaveAttribute('name', 'amount')
    await expect(number).toHaveRole('textbox')
    await expect(page.locator(text('rhf-select'))).toHaveAccessibleName(
      'Location'
    )
    await expect(page.locator(text('rhf-multi-select'))).toHaveAccessibleName(
      'Elements'
    )

    await page.locator(text('rhf-text')).fill('Demo game')
    await number.fill('12.5')

    await page.locator(text('rhf-select')).click()
    await page.getByRole('option', { name: 'Zurich' }).click()

    await page.getByRole('combobox', { name: 'Elements' }).click()
    await page.getByRole('option', { name: 'Story' }).click()
    await page.keyboard.press('Escape')

    await page.locator(text('rhf-submit')).click()
    await expect(page.locator(text('rhf-submitted'))).toHaveText(
      JSON.stringify({
        name: 'Demo game',
        amount: 12.5,
        location: 'zurich',
        elements: ['story'],
      })
    )
  })

  test('number editing preserves incomplete input and reset-to-same-value semantics', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--default')
    const number = amountField(page)

    await number.fill('1.')
    await expect(number).toHaveValue('1.')

    await number.fill('-')
    await expect(number).toHaveValue('-')
    await number.blur()
    await expect(number).toHaveValue('1')

    await number.fill('.')
    await expect(number).toHaveValue('.')
    await number.blur()
    await expect(number).toHaveValue('1')

    await number.fill('-.')
    await expect(number).toHaveValue('-.')
    await number.blur()
    await expect(number).toHaveValue('1')

    await number.fill('')
    await expect(number).toHaveValue('')
    await number.fill('1')
    await page.getByRole('button', { name: 'Increase value' }).click()
    await expect(number).toHaveValue('1.50')
    await number.fill('12.5')
    await expect(number).toHaveValue('12.5')
    await number.fill('101')
    await expect(number).toHaveValue('12.5')
    await number.fill('12.345')
    await expect(number).toHaveValue('12.5')

    await number.fill('1.')
    await page.locator(text('rhf-set-value-same')).click()
    await expect(number).toHaveValue('1')

    await number.fill('1.')
    await page.locator(text('rhf-reset-field-same')).click()
    await expect(number).toHaveValue('1')

    await number.fill('1.')
    await page.locator(text('rhf-reset-same')).click()
    await expect(number).toHaveValue('1')

    await number.fill('1.')
    await page.locator(text('rhf-reset')).click()
    await expect(number).toHaveValue('42')
  })

  test('number editing accepts negative values and enforces the lower bound', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--number-range')
    const number = amountField(page)

    await number.fill('-3.5')
    await number.blur()
    await expect(number).toHaveValue('-3.5')
    await page.locator(text('rhf-range-submit')).click()
    await expect(page.locator(text('rhf-range-submitted'))).toHaveText(
      JSON.stringify({ amount: -3.5 })
    )

    await number.fill('-10')
    await page.locator(text('rhf-range-submit')).click()
    await expect(page.locator(text('rhf-range-submitted'))).toHaveText(
      JSON.stringify({ amount: -10 })
    )

    await page.locator(text('rhf-range-set-below-min')).click()
    await expect(number).toHaveValue('-11')
    await page.locator(text('rhf-range-submit')).click()
    await expect(page.getByRole('alert')).toContainText(
      'Amount must be at least -10.'
    )
  })

  test('validation appears after submit and is linked to every control', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--validation')
    await page.locator(text('rhf-submit')).click()

    for (const testId of [
      'rhf-text',
      'rhf-number',
      'rhf-select',
      'rhf-multi-select',
    ]) {
      const control =
        testId === 'rhf-number'
          ? amountField(page, true)
          : page.locator(text(testId))
      const describedBy = await control.getAttribute('aria-describedby')
      expect(describedBy, `${testId} has an error description`).toBeTruthy()
      const describedByIds = describedBy?.split(/\s+/) ?? []
      const alert = page.locator(
        describedByIds.map((id) => `[id="${id}"][role="alert"]`).join(', ')
      )
      await expect(alert).toHaveCount(1)
      await expect(control).toHaveAttribute('aria-invalid', 'true')
    }
  })

  test('message-less RHF errors still mark every control invalid', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--message-less-validation')
    await page.locator(text('rhf-submit')).click()

    for (const testId of [
      'rhf-text',
      'rhf-number',
      'rhf-select',
      'rhf-multi-select',
    ]) {
      const control =
        testId === 'rhf-number'
          ? amountField(page, true)
          : page.locator(text(testId))
      await expect(control).toHaveAttribute('aria-invalid', 'true')
    }
  })

  test('explicit control mode works without FormProvider context', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--explicit-control')
    await page.locator(text('rhf-text')).fill('Explicit')
    await amountField(page).fill('7')
    await page.locator(text('rhf-submit')).click()
    await expect(page.locator(text('rhf-submitted'))).toHaveText(
      JSON.stringify({
        name: 'Explicit',
        amount: 7,
        location: '',
        elements: [],
      })
    )
  })

  test('multi-select close marks the field touched without submitting', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--validation')
    await page.locator(text('rhf-multi-select')).click()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('alert')).toContainText(
      'Choose at least one element.'
    )
  })

  test('closed select blur marks the field touched', async ({ page }) => {
    await gotoStory(page, 'rhf-fields--validation')
    const select = page.locator(text('rhf-select'))

    await select.focus()
    await page.keyboard.press('Tab')

    await expect(page.getByRole('alert')).toContainText(
      'A location is required.'
    )
  })

  test('select open-close and multi-select internal focus use one blur boundary', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--validation')
    const select = page.locator(text('rhf-select'))
    const multiSelect = page.locator(text('rhf-multi-select'))

    await select.click()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('alert')).toContainText(
      'A location is required.'
    )

    await multiSelect.click()
    await page.getByPlaceholder('Search…').focus()
    await expect(
      page
        .getByRole('alert')
        .filter({ hasText: 'Choose at least one element.' })
    ).toHaveCount(0)
    await page.keyboard.press('Escape')
    await expect(
      page
        .getByRole('alert')
        .filter({ hasText: 'Choose at least one element.' })
    ).toContainText('Choose at least one element.')
  })

  test('closed composite controls notify blur once when focus leaves', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--composite-blur-contracts')

    await page.locator(text('blur-contract-select')).focus()
    await page.keyboard.press('Tab')
    await expect(page.locator(text('select-blur-count'))).toHaveText('1')

    await page.locator(text('blur-contract-multi-select')).focus()
    await page.keyboard.press('Tab')
    await expect(page.locator(text('multi-select-blur-count'))).toHaveText('1')
  })

  test('select blur fires once for Escape and pointer-outside close', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--composite-blur-contracts')
    const select = page.locator(text('blur-contract-select'))

    await select.click()
    await page.keyboard.press('Escape')
    await expect(page.locator(text('select-blur-count'))).toHaveText('1')

    await select.click()
    await expect(select).toHaveAttribute('aria-expanded', 'true')
    await page.locator(text('blur-contract-outside')).click({ force: true })
    await expect(page.locator(text('select-blur-count'))).toHaveText('2')
  })

  test('multi-select internal focus stays open and closes with one blur', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--composite-blur-contracts')
    const multiSelect = page.locator(text('blur-contract-multi-select'))

    await multiSelect.click()
    await page.getByPlaceholder('Search elements…').focus()
    await expect(page.locator(text('multi-select-blur-count'))).toHaveText('0')
    await page.keyboard.press('Escape')
    await expect(page.locator(text('multi-select-blur-count'))).toHaveText('1')

    await multiSelect.click()
    await expect(multiSelect).toHaveAttribute('aria-expanded', 'true')
    await page
      .locator(text('blur-contract-outside'))
      .click({ position: { x: 350, y: 20 } })
    await expect(page.locator(text('multi-select-blur-count'))).toHaveText('2')
  })

  test('caller refs focus each RHF wrapper target', async ({ page }) => {
    await gotoStory(page, 'rhf-fields--default')

    for (const [buttonId, fieldId] of [
      ['rhf-focus-text', 'rhf-text'],
      ['rhf-focus-number', 'rhf-number'],
      ['rhf-focus-select', 'rhf-select'],
      ['rhf-focus-multi-select', 'rhf-multi-select'],
    ]) {
      await page.locator(text(buttonId)).click()
      await expect(page.locator(text(fieldId))).toBeFocused()
    }
  })

  test('form-level disabled state reaches every wrapper primitive', async ({
    page,
  }) => {
    await gotoStory(page, 'rhf-fields--disabled')

    for (const testId of [
      'rhf-text',
      'rhf-number',
      'rhf-select',
      'rhf-multi-select',
    ]) {
      await expect(page.locator(text(testId))).toBeDisabled()
    }
  })

  test('raw multi-select preserves an externally associated label', async ({
    page,
  }) => {
    await gotoStory(page, 'multi-select--external-label')
    await expect(page.getByRole('combobox', { name: 'Elements' })).toBeVisible()
  })
})

test('RHF-produced errors appear without touch, default inline and respect explicit suppression', async ({
  page,
}) => {
  await gotoStory(page, 'rhf-fields--error-timing')
  const live = page.locator(text('rhf-live-error'))
  await live.fill('a')
  await expect(live).toBeFocused()
  await expect(live).toHaveAttribute('aria-invalid', 'true')
  const liveErrorId = await live.getAttribute('aria-describedby')
  expect(liveErrorId).toBeTruthy()
  await expect(
    page.locator(`[id="${liveErrorId}"][role="alert"]`)
  ).toBeVisible()
  await live.fill('valid')
  await expect(live).toHaveAttribute('aria-invalid', 'false')
  await page.locator(text('rhf-manual-errors')).click()
  const manual = page.locator(text('rhf-manual-error'))
  await expect(manual).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator(text('rhf-error-touched'))).not.toContainText(
    'manual'
  )
  const ids = (await manual.getAttribute('aria-describedby'))!.split(/\s+/)
  await expect(
    page.locator(ids.map((id) => `[id="${id}"][role="alert"]`).join(','))
  ).toBeVisible()
  const hidden = page.locator(text('rhf-hidden-error'))
  await expect(hidden).toHaveAttribute('aria-invalid', 'true')
  await expect(hidden).not.toHaveAttribute('aria-describedby')
  const tooltip = page.locator(text('rhf-tooltip-error'))
  await expect(tooltip).toHaveAttribute('aria-invalid', 'true')
  const tooltipId = await tooltip.getAttribute('aria-describedby')
  expect(tooltipId).toBeTruthy()
  await expect(page.locator(`[id="${tooltipId}"][role="alert"]`)).toHaveClass(
    /sr-only/
  )
  await page.locator(text('rhf-clear-errors')).click()
  for (const input of [manual, hidden, tooltip])
    await expect(input).toHaveAttribute('aria-invalid', 'false')
})

for (const story of [
  'rhf-fields--basic-inputs',
  'rhf-fields--explicit-basic-inputs',
]) {
  test(`${story}: values, native form participation, blur, reset and actual focus targets`, async ({
    page,
  }) => {
    await gotoStory(page, story)
    const notes = page.getByRole('textbox', { name: 'Notes', exact: true })
    const toggle = page.getByRole('switch', { name: 'Enabled', exact: true })
    const pin = page.getByRole('textbox', { name: 'Numeric PIN', exact: true })
    const code = page.getByRole('textbox', { name: 'Access code', exact: true })
    await notes.fill('An activity')
    await toggle.click()
    await expect(page.locator(text('rhf-basic-touched'))).not.toContainText(
      'enabled'
    )
    await toggle.press('Tab')
    await expect(page.locator(text('rhf-basic-touched'))).toContainText(
      'enabled'
    )
    for (const [input, pasted, expected] of [
      [pin, '0a 01234', '0012'],
      [code, 'a!b 12x', 'AB12'],
    ] as const) {
      await input.evaluate((element, value) => {
        const clipboard = new DataTransfer()
        clipboard.setData('text', value)
        element.dispatchEvent(
          new ClipboardEvent('paste', {
            bubbles: true,
            cancelable: true,
            clipboardData: clipboard,
          })
        )
      }, pasted)
      await expect(input).toHaveValue(expected)
    }
    await page.locator(text('rhf-basic-submit')).click()
    await expect(page.locator(text('rhf-basic-submitted'))).toHaveText(
      JSON.stringify({
        notes: 'An activity',
        enabled: true,
        pin: '0012',
        code: 'AB12',
      })
    )
    await page.locator(text('rhf-basic-native')).click()
    await expect(page.locator(text('rhf-basic-native-values'))).toContainText(
      '"notes":"An activity"'
    )
    for (const [target, input] of [
      ['notes', notes],
      ['switch', toggle],
      ['pin', pin],
      ['code', code],
    ] as const) {
      await page.locator(text(`rhf-basic-focus-${target}`)).click()
      await expect(input).toBeFocused()
    }
    await page.locator(text('rhf-basic-reset')).click()
    await expect(notes).toHaveValue('Reset')
    await expect(pin).toHaveValue('0021')
    await expect(code).toHaveValue('AB12')
    await page.locator(text('rhf-basic-set-value')).click()
    await expect(pin).toHaveValue('0007')
    await page.locator(text('rhf-basic-reset-field')).click()
    await expect(pin).toHaveValue('0021')
    await page.locator(text('rhf-basic-disable')).click()
    for (const input of [notes, toggle, pin, code])
      await expect(input).toBeDisabled()
    await page.locator(text('rhf-basic-native')).click()
    await expect(page.locator(text('rhf-basic-native-values'))).toHaveText('{}')
  })
}

test('shared numeric PIN preserves Formik paste, touched timing and reset', async ({
  page,
}) => {
  await gotoStory(page, 'rhf-fields--formik-pin-compatibility')
  const pin = page.getByRole('textbox', { name: 'Legacy PIN *', exact: true })
  await expect(page.locator(text('legacy-pin-state'))).toHaveText(
    JSON.stringify({ value: '', touched: false })
  )
  await pin.evaluate((element) => {
    const data = new DataTransfer()
    data.setData('text', '0a 01234')
    element.dispatchEvent(
      new ClipboardEvent('paste', {
        bubbles: true,
        cancelable: true,
        clipboardData: data,
      })
    )
  })
  await expect(pin).toHaveValue('0012')
  await expect(page.locator(text('legacy-pin-state'))).toHaveText(
    JSON.stringify({ value: '0012', touched: true })
  )
  await page.locator(text('legacy-pin-reset')).click()
  await expect(pin).toHaveValue('')
  await expect(page.locator(text('legacy-pin-state'))).toHaveText(
    JSON.stringify({ value: '', touched: false })
  )
})

test('basic adapter padding applies once and fluid switches span the field row', async ({
  page,
}) => {
  await gotoStory(page, 'rhf-fields--basic-inputs')
  const notes = page.getByRole('textbox', { name: 'Notes', exact: true })
  const toggle = page.getByRole('switch', { name: 'Enabled', exact: true })
  const pin = page.getByRole('textbox', { name: 'Numeric PIN', exact: true })
  const code = page.getByRole('textbox', { name: 'Access code', exact: true })
  for (const control of [notes, toggle, pin, code]) {
    const horizontalPadding = await control.evaluate((element) => {
      let padding = 0
      for (
        let node = element.parentElement;
        node && node.tagName !== 'FORM';
        node = node.parentElement
      ) {
        const style = getComputedStyle(node)
        padding +=
          parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
      }
      return padding
    })
    expect(horizontalPadding).toBe(32)
  }
  const dimensions = await toggle.evaluate((element) => {
    const inner = element.parentElement!
    const row = inner.parentElement!
    return {
      inner: inner.getBoundingClientRect().width,
      row: row.getBoundingClientRect().width,
    }
  })
  expect(Math.abs(dimensions.inner - dimensions.row)).toBeLessThan(1)
})

for (const story of [
  'rhf-fields--picker-inputs',
  'rhf-fields--explicit-picker-inputs',
]) {
  test(`${story}: color stages until Apply, cancels, resets and marks touched only after close`, async ({
    page,
  }) => {
    await gotoStory(page, story)
    const trigger = page.locator(text('rhf-color-trigger'))
    await trigger.click()
    const hex = page.locator(text('rhf-color-hex'))
    await hex.fill('bf0d3e')
    await expect(page.locator(text('rhf-picker-values'))).toContainText(
      '"color":"#0028a5"'
    )
    await expect(page.locator(text('rhf-picker-touched'))).not.toContainText(
      'color'
    )
    await page.keyboard.press('Escape')
    await expect(trigger).toBeFocused()
    await expect(page.locator(text('rhf-picker-touched'))).toContainText(
      'color'
    )
    await trigger.click()
    await expect(hex).toHaveValue(/0028a5/i)
    await hex.fill('bf0d3e')
    await page.locator(text('rhf-color-apply')).click()
    await expect(page.locator(text('rhf-picker-values'))).toContainText(
      '"color":"#bf0d3e"'
    )
    await trigger.click()
    await hex.fill('ffffff')
    await page.locator(text('rhf-picker-reset-color')).dispatchEvent('click')
    await expect(hex).toHaveValue(/0028a5/i)
    await page.keyboard.press('Escape')
    await page.locator(text('rhf-picker-set-color')).click()
    await trigger.click()
    await expect(hex).toHaveValue(/bf0d3e/i)
    await page.locator(text('rhf-picker-disable')).dispatchEvent('click')
    await expect(trigger).toBeDisabled()
    await expect(page.getByRole('dialog')).toHaveCount(0)
  })
  test(`${story}: date/time browsing, transient drafts and same-value resets preserve the form contract`, async ({
    page,
  }) => {
    await gotoStory(page, story)
    const date = page.locator(text('rhf-date-trigger'))
    const assertDateName = async () => {
      const visibleValue = (await date.innerText()).trim()
      await expect(date).toHaveAccessibleName(
        new RegExp(visibleValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      )
    }
    await assertDateName()
    const time = page.locator(text('rhf-time-trigger'))
    await time.click()
    const hours = page.getByRole('textbox', { name: 'Hours', exact: true })
    await expect(hours).toBeVisible()
    await page.locator(text('rhf-time-next')).click()
    await hours.fill('10')
    const edited = JSON.parse(
      await page.locator(text('rhf-picker-values')).innerText()
    )
    expect(new Date(edited.timestamp).getDate()).toBe(15)
    expect(new Date(edited.timestamp).getMonth()).toBe(4)
    await hours.fill('')
    await page.locator(text('rhf-picker-set-same')).dispatchEvent('click')
    await expect(hours).toHaveValue('10')
    await page.locator(text('rhf-picker-reset')).dispatchEvent('click')
    await expect(hours).toHaveValue('09')
    await page.keyboard.press('Escape')
    await expect(time).toBeFocused()
    for (const target of ['color', 'date', 'time']) {
      await page.locator(text(`rhf-picker-focus-${target}`)).click()
      await expect(page.locator(text(`rhf-${target}-trigger`))).toBeFocused()
    }
    await page.locator(text('rhf-date-trigger')).click()
    await page.locator(text('rhf-date-next')).click()
    await page.keyboard.press('Escape')
    const browsed = JSON.parse(
      await page.locator(text('rhf-picker-values')).innerText()
    )
    expect(new Date(browsed.date).getDate()).toBe(15)
    expect(new Date(browsed.date).getMonth()).toBe(4)
    await page.locator(text('rhf-picker-clear')).click()
    const cleared = JSON.parse(
      await page.locator(text('rhf-picker-values')).innerText()
    )
    expect(cleared.date).toBeUndefined()
    expect(cleared.timestamp).toBeUndefined()
    await assertDateName()
    await page.locator(text('rhf-picker-reset')).click()
    await page.locator(text('rhf-picker-submit')).click()
    const submitted = JSON.parse(
      await page.locator(text('rhf-picker-submitted')).innerText()
    )
    expect(new Date(submitted.date).getDate()).toBe(15)
    expect(new Date(submitted.timestamp).getHours()).toBe(9)
  })
}

test('picker server errors associate once and required refs focus the visible triggers', async ({
  page,
}) => {
  await gotoStory(page, 'rhf-fields--picker-inputs')
  await page.locator(text('rhf-picker-errors')).click()
  for (const target of ['color', 'date', 'time']) {
    const trigger = page.locator(text(`rhf-${target}-trigger`))
    await expect(trigger).toHaveAttribute('aria-invalid', 'true')
    const ids = (await trigger.getAttribute('aria-describedby'))!.split(/\s+/)
    await expect(
      page.locator(ids.map((id) => `[id="${id}"][role="alert"]`).join(','))
    ).toHaveCount(1)
  }
})

test('localized adapter labels wrap and controls retain focus in both text directions', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const direction of ['ltr', 'rtl']) {
    for (const story of [
      'rhf-fields--localized-basic-inputs',
      'rhf-fields--localized-picker-inputs',
    ]) {
      await gotoStory(page, story)
      await page.evaluate((dir) => {
        document.documentElement.dir = dir
      }, direction)
      const labels = page.locator('form[lang="de"] label')
      for (const label of await labels.all()) {
        const bounds = await label.boundingBox()
        expect(bounds).not.toBeNull()
        expect(bounds!.x).toBeGreaterThanOrEqual(0)
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390)
      }
      if (story.endsWith('basic-inputs')) {
        const switchBounds = await page.getByRole('switch').boundingBox()
        expect(switchBounds!.width).toBeGreaterThanOrEqual(48)
        await page.locator(text('rhf-basic-focus-notes')).click()
        await expect(page.locator(text('rhf-notes'))).toBeFocused()
        await page.locator(text('rhf-notes')).fill('Synthetic note')
        await page.locator(text('rhf-basic-focus-pin')).click()
        await expect(page.locator('input[name="pin"]')).toBeFocused()
      } else {
        const trigger = page.locator(text('rhf-date-trigger'))
        await trigger.click()
        await expect(page.getByRole('dialog')).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(trigger).toBeFocused()
        const visibleValue = (await trigger.innerText()).trim()
        expect(await trigger.getAttribute('aria-labelledby')).toBeTruthy()
        await expect(trigger).toHaveAccessibleName(
          new RegExp(visibleValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        )
      }
    }
  }
})
