import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { gotoStory, TOOLBAR_SELECTOR } from '../_support/ladle'

test('code wrapper keeps selectors, native refs, exact copy value and form semantics', async ({
  page,
}) => {
  await gotoStory(page, 'code-block--configured')
  const source = 'const protocol = "<script>safe()</script>"\n\nprotocol\n'
  await page.locator('[data-test="code-input"]').fill(source)
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          document.documentElement.dataset.copiedCode = value
        },
      },
    })
  })
  const copy = page.locator('[data-test="code-copy"]')
  await copy.click()
  await expect(copy).toHaveAttribute('data-state', 'copied')
  await expect(page.locator('html')).toHaveAttribute('data-copied-code', source)
  await expect
    .poll(async () =>
      JSON.parse(await page.locator('[data-test="code-events"]').innerText())
    )
    .toEqual({ copied: 1, errors: 0, submitted: 0 })
  for (const part of [
    'root',
    'header',
    'title',
    'actions',
    'copy',
    'content',
    'footer',
  ]) {
    await expect(page.locator(`[data-test="code-${part}"]`)).toBeVisible()
  }
  await expect(page.locator('[data-test="code-root"]')).toHaveAttribute('title')
  await expect(page.locator('[data-test="code-content"] script')).toHaveCount(0)
  await page.locator('[data-test="cancel-copy"]').check()
  await page.locator('[data-test="code-input"]').fill('const changed = 1')
  await copy.click()
  await expect(page.locator('html')).toHaveAttribute('data-copied-code', source)
  await page.locator('[data-test="inspect-code-refs"]').click()
  await expect(page.locator('[data-test="code-refs"]')).toHaveText(
    'DIV/PRE/BUTTON'
  )
  await expect(page.locator('[data-test="code-content"]')).toBeFocused()
})

test('copy fallback restores focus and denied copy reports failure', async ({
  page,
}) => {
  await gotoStory(page, 'code-block--configured')
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    })
    document.execCommand = () => true
  })
  const copy = page.locator('[data-test="code-copy"]')
  await copy.click()
  await expect(copy).toHaveAttribute('data-state', 'copied')
  await expect(copy).toBeFocused()
  await page.evaluate(() => {
    document.execCommand = () => false
  })
  await copy.click()
  await expect(copy).toHaveAttribute('data-state', 'error')
  await expect(
    page.locator('[data-slot="code-block-copy-status"]')
  ).not.toBeEmpty()
  await expect
    .poll(async () =>
      JSON.parse(await page.locator('[data-test="code-events"]').innerText())
    )
    .toEqual({ copied: 1, errors: 1, submitted: 0 })
  await expect(page.locator('textarea[aria-hidden="true"]')).toHaveCount(0)
  await page.getByRole('checkbox', { name: 'dark', exact: true }).check()
  const { violations } = await new AxeBuilder({ page })
    .exclude(TOOLBAR_SELECTOR)
    .analyze()
  expect(
    violations.filter((entry) =>
      ['serious', 'critical'].includes(entry.impact ?? '')
    )
  ).toEqual([])
})

test('highlighting is opt-in and stays readable across streamed values and unsupported languages', async ({
  page,
}) => {
  await gotoStory(page, 'code-block--configured', 'uzh')
  const content = page.locator('[data-test="code-content"]')
  await expect(content.locator('[style*="--shiki"]')).toHaveCount(0)
  await page.locator('[data-test="highlight-toggle"]').check()
  await expect(content.locator('[style*="--shiki"]').first()).toBeVisible()
  const { violations } = await new AxeBuilder({ page })
    .exclude(TOOLBAR_SELECTOR)
    .analyze()
  expect(
    violations.filter((entry) =>
      ['serious', 'critical'].includes(entry.impact ?? '')
    )
  ).toEqual([])
  const source = 'const x = "<tag>"\n\nconst y = 2\nx + y'
  await page.locator('[data-test="code-input"]').fill(source)
  await expect(content.locator('[data-slot="code-block-line"]')).toHaveCount(4)
  await expect(content).toContainText('const y = 2')
  await expect(content.locator('tag')).toHaveCount(0)
  await page.locator('[data-test="code-language"]').selectOption('json')
  await page.locator('[data-test="code-input"]').fill('{"ok":true}')
  await expect(content.locator('[style*="--shiki"]').first()).toBeVisible()
  await page.locator('[data-test="code-language"]').selectOption('constructor')
  await expect(content.locator('[style*="--shiki"]')).toHaveCount(0)
  await expect(content).toContainText('{"ok":true}')
  await page.locator('[data-test="code-language"]').selectOption('typescript')
  await expect(content.locator('[style*="--shiki"]').first()).toBeVisible()
})

test('code content scrolls with the keyboard and wraps within narrow RTL composition', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await gotoStory(page, 'code-block--configured', 'uzh')
  await page
    .locator('[data-test="code-input"]')
    .fill(
      'const entry = [' +
        Array.from({ length: 40 }, (_, index) => index).join(', ') +
        ']'
    )
  const content = page.locator('[data-test="code-content"]')
  expect(
    await content.evaluate((node) => node.scrollWidth > node.clientWidth)
  ).toBe(true)
  await content.focus()
  await page.keyboard.press('ArrowRight')
  await expect
    .poll(() => content.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(0)
  await page.locator('[data-test="wrap-toggle"]').check()
  await expect
    .poll(() => content.evaluate((node) => node.scrollWidth - node.clientWidth))
    .toBeLessThanOrEqual(1)
  const defaultFont = await content.evaluate((node) =>
    parseFloat(getComputedStyle(node).fontSize)
  )
  await gotoStory(page, 'code-block--parts', 'uzh')
  expect(
    await page
      .locator('[data-test="raw-content"]')
      .evaluate((node) => parseFloat(getComputedStyle(node).fontSize))
  ).toBeLessThan(defaultFont)
  await expect(page.locator('[data-test="raw-content"]')).toHaveAttribute(
    'dir',
    'ltr'
  )
  await expect(page.locator('[data-test="raw-code"]')).toHaveAttribute(
    'data-variant',
    'destructive'
  )
  await expect(page.locator('[data-test="raw-content"] script')).toHaveCount(0)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    )
  ).toBeLessThanOrEqual(1)
})

test('failed lazy assets leave plain source readable', async ({ page }) => {
  await gotoStory(page, 'code-block--configured')
  const content = page.locator('[data-test="code-content"]')
  const before = await content.innerText()
  let blocked = 0
  await page.route('**/assets/*.js', async (route) => {
    blocked += 1
    await route.abort('failed')
  })
  await page.locator('[data-test="highlight-toggle"]').check()
  await expect.poll(() => blocked).toBeGreaterThan(0)
  await expect(content).toHaveText(before)
  await expect(content.locator('[style*="--shiki"]')).toHaveCount(0)
})
