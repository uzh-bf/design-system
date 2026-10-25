import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { gotoStory, TOOLBAR_SELECTOR } from '../_support/ladle'

const stories = [
  'dashboard',
  'authentication',
  'conversation',
  'persian-calendar',
] as const
const surfaces = [
  { theme: 'neutral', dark: false },
  { theme: 'neutral', dark: true },
  { theme: 'uzh', dark: false },
] as const

async function checkAccessibility(page: Page) {
  const report = await new AxeBuilder({ page })
    .exclude(TOOLBAR_SELECTOR)
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(
    report.violations.filter(
      (issue) => issue.impact === 'serious' || issue.impact === 'critical'
    )
  ).toEqual([])
}

async function journey(
  page: Page,
  story: (typeof stories)[number],
  width: number
) {
  if (story === 'dashboard') {
    const opener = page.locator('[data-test="comp-sidebar-trigger"]')
    if (width === 390) {
      await opener.click()
      await checkAccessibility(page)
    }
    await page.locator('[data-test="comp-nav-reports"]').click()
    await expect(page.locator('[data-test="comp-section"]')).toHaveAttribute(
      'data-section',
      'reports'
    )
    if (width === 390) {
      await expect(page.getByRole('dialog')).toBeHidden()
      await expect(opener).toBeFocused()
    }
    const chart = page.locator('[data-test="comp-chart"]')
    await expect(chart.locator('.recharts-surface')).toBeVisible()
    const bar = chart.locator('.recharts-bar-rectangle path').first()
    await expect(bar).toBeVisible()
    await bar.hover()
    await expect(chart.locator('.recharts-tooltip-wrapper')).toBeVisible()
  } else if (story === 'authentication') {
    await page.locator('[data-test="comp-auth-submit"]').click()
    const email = page.locator('input[name="email"]')
    await expect(email).toBeFocused()
    await expect(email).toHaveAttribute('aria-invalid', 'true')
    await checkAccessibility(page)
    await email.fill('learner@example.invalid')
    await page.locator('input[name="password"]').fill('synthetic-passphrase')
    await page.locator('[data-test="comp-auth-submit"]').click()
    await expect(
      page.locator('[data-test="comp-auth-result"]')
    ).toHaveAttribute('data-submitted', 'true')
    await checkAccessibility(page)
    await page.locator('[data-test="comp-auth-reset"]').click()
    await expect(email).toHaveValue('')
    await expect(page.locator('input[name="password"]')).toHaveValue('')
    await expect(
      page.locator('[data-test="comp-auth-result"]')
    ).toHaveAttribute('data-submitted', 'false')
  } else if (story === 'conversation') {
    const count = page.locator('[data-test="comp-message-count"]')
    const before = Number(await count.textContent())
    await page
      .locator('[data-test="comp-message-input"]')
      .fill('Synthetic follow-up')
    await page.locator('[data-test="comp-send"]').click()
    await expect(count).toHaveText(String(before + 1))
    const trace = page.locator('[data-test="comp-trace"] button').first()
    await trace.click()
    await expect(trace).toHaveAttribute('aria-expanded', 'true')
    const copy = page.locator('[data-test="comp-code-copy"]')
    await copy.click()
    const code = await page.locator('[data-test="comp-code"] code').innerText()
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe(code)
    await page.locator('[data-test="comp-questionnaire-choice"]').click()
    await page.locator('[data-test="comp-questionnaire-submit"]').click()
    const result = page.locator('[data-test="comp-questionnaire-result"]')
    await expect(result).toHaveAttribute('data-submitted', 'true')
    expect((await result.textContent())?.trim().length).toBeGreaterThan(0)
  } else {
    const calendar = page.locator('[data-test="comp-persian-calendar"]')
    const output = page.locator('[data-test="comp-persian-value"]')
    const timestamp = Number(await output.getAttribute('data-timestamp'))
    const selected = calendar
      .locator('button[data-selected-single="true"]')
      .first()
    const day = (await selected.innerText()).trim()
    expect(await selected.getAttribute('aria-label')).toContain(day)
    const caption = calendar.locator('.rdp-month_caption')
    const expectedMonth = await page.evaluate(
      (time) =>
        new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
          month: 'long',
          timeZone: 'UTC',
        }).format(new Date(time)),
      timestamp
    )
    await expect(caption).toContainText(expectedMonth)
    await selected.focus()
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('Enter')
    await expect
      .poll(async () =>
        Math.abs(
          Math.floor(
            Number(await output.getAttribute('data-timestamp')) / 86_400_000
          ) - Math.floor(timestamp / 86_400_000)
        )
      )
      .toBe(1)
    const newTimestamp = await output.getAttribute('data-timestamp')
    await page.locator('[data-test="comp-persian-toggle"]').click()
    await expect(output).toHaveAttribute('data-timestamp', newTimestamp!)
  }
}

for (const surface of surfaces)
  for (const width of [390, 1280])
    for (const story of stories) {
      test(`${story}: public composition at ${width}px (${surface.theme}, dark=${surface.dark})`, async ({
        page,
        context,
      }) => {
        await context.grantPermissions(['clipboard-read', 'clipboard-write'])
        await page.setViewportSize({ width, height: 1000 })
        await page.addInitScript(
          (dark) => localStorage.setItem('ladle-dark', JSON.stringify(dark)),
          surface.dark
        )
        await gotoStory(
          page,
          `application-compositions--${story}`,
          surface.theme
        )
        await journey(page, story, width)
        const dimensions = await page.evaluate(() => ({
          viewport: innerWidth,
          content: document.documentElement.scrollWidth,
        }))
        expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport)
        await checkAccessibility(page)
      })
    }
