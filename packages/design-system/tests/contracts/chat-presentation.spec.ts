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
