import { expect, test } from '@playwright/test'
import { gotoStory } from '../_support/ladle'

for (const theme of ['neutral', 'uzh'] as const) {
  test(`preserves omission geometry and supports compact presentation (${theme})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoStory(page, 'shared-presentation--surfaces', theme)
    const sizes = { omitted: 32, default: 32, sm: 28, md: 40, lg: 56 }
    for (const [size, width] of Object.entries(sizes)) {
      const avatar = page.locator(`[data-test="avatar-${size}"]`)
      await expect(avatar).toHaveCSS('width', `${width}px`)
      const badge = avatar.locator('[data-slot="avatar-badge"]')
      await expect(badge).toBeVisible()
      const badgeIsUnclipped = await badge.evaluate((node) => {
        const bounds = node.getBoundingClientRect()
        const point = { x: bounds.right - 2, y: bounds.bottom - 2 }
        const hit = document.elementFromPoint(point.x, point.y)
        return hit === node || node.contains(hit)
      })
      expect(badgeIsUnclipped).toBe(true)
      const imageIsRound = await avatar
        .locator('[data-slot="avatar-image"]')
        .evaluate(
          (node) =>
            Number.parseFloat(getComputedStyle(node).borderTopLeftRadius) >=
            node.getBoundingClientRect().width / 2
        )
      expect(imageIsRound).toBe(true)
    }
    const cardInset = async (size: string) =>
      page
        .locator(`[data-test="card-${size}"] [data-slot="card-content"]`)
        .evaluate((node) =>
          Number.parseFloat(getComputedStyle(node).paddingLeft)
        )
    expect(await cardInset('omitted')).toBe(await cardInset('default'))
    expect(await cardInset('sm')).toBeLessThan(await cardInset('default'))
    await expect(
      page.locator('[data-test="card-override"] > [data-slot="card-content"]')
    ).toHaveCSS('padding-left', '40px')
    await expect(
      page.locator('[data-test="card-nested"] > [data-slot="card-content"]')
    ).toHaveCSS('padding-left', '24px')
    const itemPadding = async (size: string) =>
      page
        .locator(`[data-test="item-${size}"]`)
        .evaluate((node) =>
          Number.parseFloat(getComputedStyle(node).paddingTop)
        )
    expect(await itemPadding('xs')).toBeLessThan(await itemPadding('sm'))
    expect(await itemPadding('sm')).toBeLessThan(await itemPadding('default'))
    await expect(
      page.locator('[data-test="item-description"]')
    ).toHaveJSProperty('tagName', 'P')
    await expect(
      page.locator('[data-test="generic-item-group"]')
    ).not.toHaveAttribute('role')
    await expect(page.locator('[data-test="badge-ghost"]')).toHaveAttribute(
      'data-variant',
      'ghost'
    )
    await expect(page.locator('[data-test="badge-link"]')).toHaveAttribute(
      'href',
      '#shared-end'
    )
    await page.getByRole('button', { name: 'Acknowledge' }).click()
    await expect(page.locator('[data-test="action-count"]')).toHaveText('1')
    const boxes = await page.locator('[data-slot="alert"]').evaluate((node) => {
      const description = node
        .querySelector('[data-slot="alert-description"]')!
        .getBoundingClientRect()
      const action = node
        .querySelector('[data-slot="alert-action"]')!
        .getBoundingClientRect()
      const root = node.getBoundingClientRect()
      return {
        overlap:
          description.left < action.right &&
          description.right > action.left &&
          description.top < action.bottom &&
          description.bottom > action.top,
        actionInside:
          action.right <= root.right && action.bottom <= root.bottom,
      }
    })
    expect(boxes).toEqual({ overlap: false, actionInside: true })
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true)
  })
}

test('controls preserve native submission, alias precedence and directional groups', async ({
  page,
}) => {
  await gotoStory(page, 'shared-presentation--controls')
  const omitted = page.locator('[data-test="switch-omitted"]')
  const normal = page.locator('[data-test="switch-default"]')
  const compact = page.locator('[data-test="switch-sm"]')
  expect((await omitted.boundingBox())?.width).toBe(
    (await normal.boundingBox())?.width
  )
  expect((await compact.boundingBox())!.width).toBeLessThan(
    (await normal.boundingBox())!.width
  )
  await page.locator('[data-test="switch-disabled"]').click({ force: true })
  await expect(page.locator('[data-test="switch-disabled"]')).toHaveAttribute(
    'data-state',
    'unchecked'
  )
  await omitted.click()
  await page.locator('[data-test="otp-default"]').fill('1234')
  await page.locator('[data-test="submit-controls"]').click()
  const submitted = JSON.parse(
    (await page.locator('[data-test="submitted-controls"]').textContent())!
  )
  expect(submitted).toMatchObject({ enabled: 'on', pin: '1234' })
  const joined = page.locator('[data-test="toggle-joined"]')
  const spaced = page.locator('[data-test="toggle-spaced"]')
  await expect(joined).toHaveCSS('gap', '0px')
  await expect(spaced).toHaveCSS('gap', '8px')
  await joined.getByRole('button', { name: 'Option A', exact: true }).click()
  await expect(page.locator('[data-test="toggle-value"]')).toHaveText('["a"]')
  const vertical = page.locator('[data-test="toggle-vertical"]')
  await expect(vertical).toHaveAttribute('data-orientation', 'vertical')
  const items = await vertical.locator('[data-slot="toggle-group-item"]').all()
  expect((await items[1].boundingBox())!.y).toBeGreaterThan(
    (await items[0].boundingBox())!.y
  )
  await items[0].focus()
  await page.keyboard.press('ArrowDown')
  await expect(items[1]).toBeFocused()
  const alias = page.locator('[data-test="pagination-text"]')
  await expect(alias).toContainText('Earlier')
  await expect(alias).toHaveAttribute('href', '#previous')
  await expect(alias).toHaveAccessibleName('Earlier')
  const legacy = page.locator('[data-test="pagination-label"]')
  await expect(legacy).toContainText('Legacy next')
  await expect(legacy).toHaveAccessibleName(
    'Legacy next: native pagination override'
  )
  await expect(
    page.locator('[data-test="pagination-empty"] .ds-pagination-label')
  ).toBeEmpty()
  await expect(
    page.locator('[data-test="pagination-empty"]')
  ).toHaveAccessibleName(/.+/)
})

test('retained element contracts and caller sizing compose with public parts', async ({
  page,
}) => {
  await gotoStory(page, 'shared-presentation--retained-composition')
  await expect(page.locator('[data-test="spinner-default"]')).toHaveCSS(
    'width',
    '28px'
  )
  for (const target of ['button', 'addon', 'item']) {
    const spinner = page.locator(`[data-test="spinner-${target}"]`)
    await expect(spinner).toHaveJSProperty('tagName', 'SPAN')
    await expect(spinner).toHaveCSS('width', '16px')
    await expect(spinner).toHaveAccessibleName(/.+/)
  }
  await expect(
    page.locator('[data-test="empty-description"]')
  ).toHaveJSProperty('tagName', 'DIV')
  await expect(page.locator('[data-test="kbd-group"]')).toHaveJSProperty(
    'tagName',
    'KBD'
  )
  await page.locator('[data-test="carousel-last"]').click()
  await expect(page.locator('[data-test="carousel-index"]')).toHaveText('2')
  await expect(page.getByRole('button', { name: 'Next slide' })).toBeDisabled()
})
