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
  await expect(page.locator('[data-test="trace-detail"]')).toBeVisible()
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
  await expect(viewport).toHaveAccessibleName('Synthetic conversation')
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
