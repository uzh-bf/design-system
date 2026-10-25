import { expect, test } from '@playwright/test'
import { gotoStory } from '../_support/ladle'

test('chat wrappers retain part selectors, classes, native refs and action targets', async ({
  page,
}) => {
  await gotoStory(page, 'chat-presentation--presentation')
  for (const name of [
    'message-avatar',
    'message-content',
    'message-header',
    'message-footer',
    'bubble-content',
    'bubble-reactions',
    'marker-icon',
    'marker-content',
    'attachment-media',
    'attachment-content',
    'attachment-title',
    'attachment-description',
    'attachment-actions',
  ]) {
    await expect(page.locator(`[data-test="${name}"]`)).toBeVisible()
  }
  await expect(page.locator('[data-test="message"]')).toHaveAttribute(
    'data-align',
    'end'
  )
  await expect(page.locator('[data-test="message"]')).toHaveClass(/gap-3/)
  await expect(page.locator('[data-test="bubble-content"]')).toHaveClass(
    /rounded-md/
  )
  await expect(page.locator('[data-test="marker-content"]')).toHaveClass(
    /font-medium/
  )
  const [reactions, footer] = await Promise.all([
    page.locator('[data-test="bubble-reactions"]').boundingBox(),
    page.locator('[data-test="message-footer"]').boundingBox(),
  ])
  expect(reactions!.y + reactions!.height).toBeLessThanOrEqual(footer!.y)
  const trigger = page.locator('[data-test="attachment-trigger"]')
  await expect(trigger).toHaveAccessibleName(
    await page.locator('[data-test="attachment-title"]').innerText()
  )
  await trigger.click()
  await page.locator('[data-test="remove-attachment"]').click()
  await expect
    .poll(async () =>
      JSON.parse(
        await page.locator('[data-test="attachment-events"]').innerText()
      )
    )
    .toEqual({ opened: 1, removed: 1, root: 0 })
  await page.locator('[data-test="inspect-attachment-refs"]').click()
  await expect(trigger).toBeFocused()
  await expect(page.locator('[data-test="attachment-refs"]')).toHaveText(
    'DIV/BUTTON'
  )
  await expect(
    page.locator('[data-test="passive-attachment"] button')
  ).toHaveCount(0)
  await expect(
    page.locator('[data-test="custom-attachment-content"]')
  ).toBeVisible()
  await expect(
    page.locator(
      '[data-test="custom-attachment"] [data-slot="attachment-content"]'
    )
  ).toHaveCount(0)
})

test('trace controlled disclosure and raw composition retain keyboard behavior', async ({
  page,
}) => {
  await gotoStory(page, 'chat-presentation--presentation')
  const toggle = page.locator('[data-test="trace-toggle"]')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  const detail = page.locator('[data-test="trace-detail"]')
  await expect(detail).toBeVisible()
  await expect
    .poll(async () =>
      detail.evaluate((el) => {
        const content = el.closest('[data-slot="trace-collapsible-content"]')!
        const outer = content.getBoundingClientRect()
        const inner = el.getBoundingClientRect()
        return outer.height > 0 && inner.bottom <= outer.bottom + 1
      })
    )
    .toBe(true)
  await page.keyboard.press('Space')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('[data-test="trace-error"]')).toHaveAttribute(
    'data-status',
    'error'
  )
  await expect(page.locator('[data-test="trace-custom"]')).toBeVisible()
  await expect(
    page.locator('[data-test="primitive-message"] [data-slot="bubble-content"]')
  ).toBeVisible()
  await expect(page.locator('[data-slot="attachment-action"]')).toBeVisible()
})

test('narrow variants contain separator labels and vertical attachments', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await gotoStory(page, 'chat-presentation--variants')
  const groupBox = await page
    .locator('[data-test="standalone-bubbles"]')
    .boundingBox()
  for (const name of [
    'standalone-root-bubble',
    'standalone-primitive-bubble',
  ]) {
    const box = await page.locator(`[data-test="${name}"]`).boundingBox()
    expect(
      Math.abs(box!.x + box!.width - groupBox!.x - groupBox!.width)
    ).toBeLessThan(1)
    expect(box!.width).toBeLessThanOrEqual(groupBox!.width * 0.8 + 1)
  }
  const attachments = page.locator('[data-test="attachment-group"]')
  await attachments.focus()
  await expect(attachments).toBeFocused()
  expect(
    await attachments.evaluate((el) => el.scrollWidth > el.clientWidth)
  ).toBe(true)
  await page.keyboard.press('ArrowRight')
  await expect
    .poll(() => attachments.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0)
  const marker = page.locator('[data-test="marker-separator"]')
  const markerBox = await marker.boundingBox()
  const labelBox = await marker
    .locator('[data-slot="marker-content"]')
    .boundingBox()
  expect(labelBox!.x).toBeGreaterThanOrEqual(markerBox!.x)
  expect(labelBox!.x + labelBox!.width).toBeLessThanOrEqual(
    markerBox!.x + markerBox!.width
  )
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth
    )
  ).toBe(true)
  const cards = page.locator(
    '[data-slot="attachment"][data-orientation="vertical"]'
  )
  for (const card of await cards.all()) {
    const bounds = await card.boundingBox()
    for (const part of ['attachment-media', 'attachment-title']) {
      const child = await card.locator(`[data-slot="${part}"]`).boundingBox()
      expect(child!.y).toBeGreaterThanOrEqual(bounds!.y)
      expect(child!.y + child!.height).toBeLessThanOrEqual(
        bounds!.y + bounds!.height
      )
    }
    const media = await card
      .locator('[data-slot="attachment-media"]')
      .boundingBox()
    expect(Math.abs(media!.width - media!.height)).toBeLessThan(1)
  }
})

for (const theme of ['neutral', 'uzh'] as const) {
  test(`chat remains contained and readable in RTL at phone width (${theme})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoStory(page, 'chat-presentation--rtl', theme)
    await expect(page.locator('[data-test="chat-presentation"]')).toHaveCSS(
      'direction',
      'rtl'
    )
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    ).toBe(true)
    await expect(
      page.locator('[data-test="attachment-trigger"]')
    ).toHaveAccessibleName(
      await page.locator('[data-test="attachment-title"]').innerText()
    )
  })
}

async function scrollState(page: import('@playwright/test').Page) {
  return page.locator('[data-test="scroller-viewport"]').evaluate((el) => ({
    top: el.scrollTop,
    gap: el.scrollHeight - el.clientHeight - el.scrollTop,
  }))
}

test('native scrolling follows the live edge, yields to user intent and preserves prepend geometry', async ({
  page,
}) => {
  await gotoStory(page, 'chat-presentation--scrolling')
  const viewport = page.locator('[data-test="scroller-viewport"]')
  await expect.poll(async () => (await scrollState(page)).gap).toBeLessThan(3)
  await page.locator('[data-test="append-message"]').click()
  await page.locator('[data-test="grow-message"]').click()
  await expect.poll(async () => (await scrollState(page)).gap).toBeLessThan(3)
  await viewport.hover()
  await page.mouse.wheel(0, -650)
  await expect
    .poll(async () => (await scrollState(page)).gap)
    .toBeGreaterThan(150)
  const before = await viewport.evaluate((el) => el.scrollTop)
  await page.locator('[data-test="append-message"]').click()
  await expect
    .poll(async () => Math.abs((await scrollState(page)).top - before))
    .toBeLessThan(3)
  const anchor = page.locator('[data-message-id="message-10"]')
  const relativeTop = async () => {
    const [a, v] = await Promise.all([
      anchor.boundingBox(),
      viewport.boundingBox(),
    ])
    return a!.y - v!.y
  }
  const anchorBefore = await relativeTop()
  await page.locator('[data-test="prepend-message"]').click()
  await expect
    .poll(async () => Math.abs((await relativeTop()) - anchorBefore))
    .toBeLessThan(3)
  await expect(page.locator('[data-test="scroller-jump"]')).toHaveAttribute(
    'data-active',
    'true'
  )
  await page.locator('[data-test="scroller-jump"]').click()
  await expect.poll(async () => (await scrollState(page)).gap).toBeLessThan(3)
})

test('viewport refs, native hooks and target-specific props remain usable', async ({
  page,
}) => {
  await gotoStory(page, 'chat-presentation--scrolling')
  const viewport = page.locator('[data-test="scroller-viewport"]')
  await page.locator('[data-test="focus-viewport"]').click()
  await expect(viewport).toBeFocused()
  await expect(page.locator('[data-test="viewport-focused"]')).toHaveText(
    'true'
  )
  await expect(viewport).toHaveAttribute('aria-label', /\S/)
  await expect(page.locator('[data-test="scroller"]')).not.toHaveAttribute(
    'aria-label'
  )
  await page.locator('[data-test="scroll-anchor"]').click()
  await expect(page.locator('[data-test="scroll-command"]')).toHaveText('true')
  await expect
    .poll(async () =>
      Number(await page.locator('[data-test="viewport-events"]').innerText())
    )
    .toBeGreaterThan(0)
  const [footer, box] = await Promise.all([
    page.locator('[data-test="scroller-footer"]').boundingBox(),
    viewport.boundingBox(),
  ])
  expect(footer!.y).toBeGreaterThanOrEqual(box!.y + box!.height - 1)
})

test('reduced motion defaults to instant while explicit caller scrolling wins', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    const original = Element.prototype.scrollTo
    const behaviors: string[] = []
    Object.assign(window, { syntheticScrollBehaviors: behaviors })
    Element.prototype.scrollTo = function (
      ...args: Parameters<typeof original>
    ) {
      const options = args[0]
      if (typeof options === 'object' && options?.behavior)
        behaviors.push(options.behavior)
      return Reflect.apply(original, this, args)
    }
  })
  await gotoStory(page, 'chat-presentation--scrolling')
  const viewport = page.locator('[data-test="scroller-viewport"]')
  const lastBehavior = () =>
    page.evaluate(() =>
      (
        window as unknown as { syntheticScrollBehaviors: string[] }
      ).syntheticScrollBehaviors.at(-1)
    )
  await viewport.hover()
  await page.mouse.wheel(0, -500)
  await expect(page.locator('[data-test="scroller-jump"]')).toHaveAttribute(
    'data-active',
    'true'
  )
  await page.locator('[data-test="scroller-jump"]').click()
  await expect.poll(lastBehavior).toBe('instant')
  await expect.poll(async () => (await scrollState(page)).gap).toBeLessThan(3)
  await page.locator('[data-test="toggle-scroll-behavior"]').click()
  await viewport.hover()
  await page.mouse.wheel(0, -500)
  await expect(page.locator('[data-test="scroller-jump"]')).toHaveAttribute(
    'data-active',
    'true'
  )
  await page.locator('[data-test="scroller-jump"]').click()
  await expect.poll(lastBehavior).toBe('smooth')
})

test('questionnaire validates, preserves multiple answers, skips and resets through native form events', async ({
  page,
}) => {
  await gotoStory(page, 'questionnaire--configured')
  const form = page.locator('[data-test="questionnaire"]')
  const progress = page.locator('[data-test="questionnaire-progress"]')
  await expect(form).toHaveAccessibleName(await page.locator('h1').innerText())
  await expect(progress).not.toHaveAccessibleName(
    await page.locator('h1').innerText()
  )
  await expect(progress).toHaveAttribute('aria-valuemax', '3')
  await expect(progress).toHaveAttribute('aria-valuenow', '1')
  await expect(page.locator('[data-test="question-disabled"]')).toBeHidden()
  await expect(
    page.locator('[data-test="choice-disabled"] input')
  ).toBeDisabled()
  await expect(form).toHaveClass(/rounded-md/)
  await expect(page.locator('[data-test="choice-brief"]')).toHaveClass(
    /rounded-md/
  )
  await page.locator('[data-test="questionnaire-next"]').click()
  const first = page.locator('[data-test="question-format"]')
  await expect(first).toHaveAttribute('aria-invalid', 'true')
  const error = first.getByRole('alert')
  await expect(error).toBeVisible()
  const described = await first.getAttribute('aria-describedby')
  expect(described?.split(' ')).toContain(await error.getAttribute('id'))
  await first.focus()
  await page.keyboard.press('a')
  await expect(page.locator('[data-test="choice-brief"] input')).toBeChecked()
  await page.locator('[data-test="questionnaire-next"]').click()
  await expect(page.locator('[data-test="question-tools"]')).toBeFocused()
  await page.locator('[data-test="choice-table"] input').check()
  await page.locator('[data-test="choice-diagram"] input').check()
  await expect(page.locator('[data-test="input-tools"]')).toHaveAccessibleName(
    /\S/
  )
  const inputDescription = await page
    .locator('[data-test="input-tools"]')
    .getAttribute('aria-describedby')
  const inputErrorId = await page
    .locator('[data-test="question-tools"] [data-slot="questionnaire-error"]')
    .getAttribute('id')
  expect(inputDescription?.split(' ') ?? []).not.toContain(inputErrorId)
  await page.locator('[data-test="input-tools"]').fill('Outline')
  await page.locator('[data-test="questionnaire-previous"]').click()
  await expect(page.locator('[data-test="choice-brief"] input')).toBeChecked()
  await page.locator('[data-test="questionnaire-next"]').click()
  await expect(page.locator('[data-test="choice-table"] input')).toBeChecked()
  await expect(page.locator('[data-test="choice-diagram"] input')).toBeChecked()
  await expect(page.locator('[data-test="input-tools"]')).toHaveValue('Outline')
  await page.locator('[data-test="questionnaire-next"]').click()
  await expect(progress).toHaveAttribute('aria-valuenow', '3')
  await page.locator('[data-test="questionnaire-skip"]').click()
  await expect
    .poll(async () =>
      JSON.parse(
        await page.locator('[data-test="questionnaire-answers"]').innerText()
      )
    )
    .toEqual([
      ['format', 'brief'],
      ['tools', 'table'],
      ['tools', 'diagram'],
      ['tools', 'Outline'],
    ])
  await page.locator('[data-test="questionnaire-reset"]').click()
  await expect(page.locator('[data-test="questionnaire-active"]')).toHaveText(
    'format'
  )
  await expect(
    page.locator('[data-test="choice-brief"] input')
  ).not.toBeChecked()
  await expect
    .poll(async () =>
      JSON.parse(
        await page.locator('[data-test="questionnaire-events"]').innerText()
      )
    )
    .toMatchObject({ submitted: 1, reset: 1 })
  await page.locator('[data-test="questionnaire-active-notes"]').click()
  await expect(page.locator('[data-test="question-notes"]')).toBeFocused()
  await page.locator('[data-test="input-notes"]').fill('Synthetic note')
  await page.locator('[data-test="questionnaire-submit"]').click()
  await expect(first).toBeVisible()
  expect(await page.locator('form form, button button').count()).toBe(0)
})

for (const theme of ['neutral', 'uzh'] as const) {
  test(`questionnaire uses localized progress and actions within narrow RTL layout (${theme})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoStory(page, 'questionnaire--localized', theme)
    const progress = page.locator('[data-test="localized-progress"]')
    await expect(progress).toHaveAttribute(
      'aria-valuetext',
      await progress.innerText()
    )
    await expect(
      page.locator('[data-test="questionnaire-localized"]')
    ).toHaveCSS('direction', 'rtl')
    await expect(
      page.locator('[data-test="localized-next"]')
    ).toHaveAccessibleName(/\S/)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true)
    await page.locator('[data-test="localized-next"]').click()
    await expect(page.getByRole('alert')).toBeVisible()
    await expect(progress).toHaveAttribute('aria-valuenow', '1')
  })
}

test('Questionnaire preserves native input validity when opted in', async ({
  page,
}) => {
  await gotoStory(page, 'questionnaire--native-validity')
  const input = page.locator('[data-test="validity-email"]')
  await input.fill('invalid')
  await page.locator('[data-test="validity-submit"]').click()
  await expect(page.locator('[data-test="validity-submitted"]')).toHaveText('0')
  await expect(input).toBeFocused()
  expect(
    await input.evaluate((el) => (el as HTMLInputElement).validity.typeMismatch)
  ).toBe(true)
  await input.fill('synthetic@example.test')
  await page.locator('[data-test="validity-submit"]').click()
  await expect(page.locator('[data-test="validity-submitted"]')).toHaveText('1')
})
