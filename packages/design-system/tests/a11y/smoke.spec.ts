import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// T1 tracer: prove the toolchain end-to-end on a single story. The broad
// story sweep (T2) and full a11y pass (T3) build on this.
test.describe('tracer: button--primary', () => {
  test('renders, no console errors, no serious/critical a11y', async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(String(err)))

    await page.goto('?story=button--primary&mode=preview')
    // Ladle flags the document once the story mounts; cap the wait so a hung
    // story fails fast instead of burning the default 30s (matters at scale).
    await page.waitForSelector('html[data-storyloaded]', { timeout: 10_000 })

    await expect(
      page.locator('button', { hasText: 'Button' }).first()
    ).toBeVisible()

    // Exclude the Ladle dev toolbar — it is workbench chrome, not a DS component.
    const { violations } = await new AxeBuilder({ page })
      .exclude('#ladle-theme-controls')
      .analyze()
    const blocking = violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact ?? '')
    )

    expect(
      blocking,
      blocking.map((v) => `${v.id}: ${v.help}`).join('\n')
    ).toEqual([])
    expect(errors, errors.join('\n')).toEqual([])
  })
})
