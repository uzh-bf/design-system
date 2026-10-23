import { expect, test, type Page } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

import { gotoStory } from '../_support/ladle'

function renderChart(
  kind: 'bar' | 'line',
  initialDimension?: { width: number; height: number },
  id?: string
) {
  return renderOnServer(`
    const chart = createElement(${kind === 'bar' ? 'BarChart' : 'LineChart'},
      { data: [{ published: 0 }] },
      createElement(${kind === 'bar' ? 'Bar' : 'Line'}, { dataKey: 'published' }))
    console.log(renderToStaticMarkup(createElement(ChartContainer, {
      id: ${JSON.stringify(id)}, config: { published: { color: 'red' } },
      initialDimension: ${JSON.stringify(initialDimension)},
      style: { minHeight: 240, width: '100%' }
    }, chart)))
  `)
}

function renderOnServer(source: string) {
  // A real Node renderer avoids Playwright's component JSX transform.
  return execFileSync(
    process.execPath,
    [
      '--import',
      'tsx',
      '--input-type=module',
      '--eval',
      `
      import { createElement } from 'react'
      import { renderToStaticMarkup } from 'react-dom/server'
      import { Bar, BarChart, Line, LineChart } from 'recharts'
      import { ChartContainer, ChartTooltipContent, ChartLegendContent } from './src/Chart.tsx'
      ${source}
    `,
    ],
    { cwd: resolve(import.meta.dirname, '../..'), encoding: 'utf8' }
  )
}

function getWrapperTag(markup: string) {
  const wrapper = markup.match(/<div[^>]*recharts-wrapper[^>]*>/)?.[0]
  if (!wrapper)
    throw new Error('Server renderer omitted the initial chart wrapper')
  return wrapper
}

async function gotoChart(
  page: Page,
  story: string,
  theme: 'neutral' | 'uzh',
  dark = false
) {
  if (dark) {
    await page.addInitScript(() => {
      window.localStorage.setItem('ladle-dark', JSON.stringify(true))
    })
  }

  await gotoStory(page, story, theme)
}

test('chart container server-renders the default and override initial dimensions', () => {
  const defaultMarkup = renderChart('bar', undefined, 'contract')
  const overrideMarkup = renderChart('line', { width: 420, height: 260 })

  expect(getWrapperTag(defaultMarkup)).toContain('width="320"')
  expect(getWrapperTag(defaultMarkup)).toContain('height="200"')
  expect(getWrapperTag(overrideMarkup)).toContain('width="420"')
  expect(getWrapperTag(overrideMarkup)).toContain('height="260"')
  expect(defaultMarkup).toContain('min-height:240px')
  expect(defaultMarkup).toContain('width:100%')

  const chartId = defaultMarkup.match(/data-chart="([^"]+)"/)?.[1]
  expect(chartId).toBe('chart-contract')
  expect(defaultMarkup).toContain(`[data-chart=${chartId}]`)
})

test('generated chart ids produce a scoped theme rule', () => {
  const markup = renderChart('bar')
  const chartId = markup.match(/data-chart="([^"]+)"/)?.[1]

  expect(chartId).toMatch(/^chart-[a-zA-Z0-9_-]+$/)
  expect(markup).toContain(`[data-chart=${chartId}]`)
})

test('all six chart families expose rendered marks', async ({ page }) => {
  const families = [
    ['chart--default', '.recharts-bar-rectangle'],
    ['chart--area', '.recharts-area-area'],
    ['chart--line', '.recharts-line-curve'],
    ['chart--pie', '.recharts-pie-sector'],
    ['chart--radar', '.recharts-radar-polygon'],
    ['chart--radial', '.recharts-radial-bar-sector'],
  ] as const

  for (const [story, mark] of families) {
    await gotoChart(page, story, 'neutral')
    const chart = page.locator(
      `[data-test="${story.replace('chart--', 'chart-')}"]`
    )

    await expect(chart.locator('svg.recharts-surface')).toBeVisible()
    await expect(chart.locator(mark).first()).toBeVisible()
    await expect(chart).toHaveCSS('width', /[1-9]\d*px/)
  }
})

for (const scenario of [
  { name: 'neutral light', theme: 'neutral', dark: false },
  { name: 'UZH light', theme: 'uzh', dark: false },
  { name: 'neutral dark', theme: 'neutral', dark: true },
] as const) {
  test(`${scenario.name} uses the active chart theme tokens`, async ({
    page,
  }) => {
    await gotoChart(page, 'chart--default', scenario.theme, scenario.dark)

    const frame = page.locator('[data-test="chart-default-frame"]')
    const chart = page.locator('[data-test="chart-default"]')
    const themeState = await frame.evaluate((element) => ({
      background: getComputedStyle(element).backgroundColor,
      color: getComputedStyle(element).color,
      dark: document.documentElement.classList.contains('dark'),
      theme: document.documentElement.dataset.theme,
    }))

    expect(themeState.background).not.toBe('rgba(0, 0, 0, 0)')
    expect(themeState.color).not.toBe('')
    expect(themeState.theme).toBe(scenario.theme)
    expect(themeState.dark).toBe(scenario.dark)

    const chartId = await chart.getAttribute('data-chart')
    const styleText = await chart.locator('style').textContent()
    expect(styleText).toContain(`[data-chart=${chartId}]`)
    expect(
      await chart.evaluate((element) =>
        getComputedStyle(element).getPropertyValue('--color-published').trim()
      )
    ).not.toBe('')
    const ratios = await chart.evaluate((element) => {
      const canvas = document.createElement('canvas').getContext('2d')!
      const luminance = (color: string) => {
        canvas.fillStyle = color
        canvas.fillRect(0, 0, 1, 1)
        const channels = [...canvas.getImageData(0, 0, 1, 1).data]
          .slice(0, 3)
          .map((value) => {
            const channel = value / 255
            return channel <= 0.04045
              ? channel / 12.92
              : ((channel + 0.055) / 1.055) ** 2.4
          })
        return (
          channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
        )
      }
      const background = luminance(
        getComputedStyle(element.closest('figure')!).backgroundColor
      )
      return [...element.querySelectorAll('.recharts-bar-rectangle path')].map(
        (mark) => {
          const foreground = luminance(getComputedStyle(mark).fill)
          return (
            (Math.max(foreground, background) + 0.05) /
            (Math.min(foreground, background) + 0.05)
          )
        }
      )
    })
    expect(ratios.length).toBeGreaterThan(0)
    for (const ratio of ratios) expect(ratio).toBeGreaterThanOrEqual(3)

    await gotoChart(page, 'chart--radial', scenario.theme, scenario.dark)
    const rings = page.locator(
      '[data-test="chart-radial"] .recharts-radial-bar-sector'
    )
    await expect(rings.first()).toBeVisible()
    const colors = await rings.evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).fill)
    )
    expect(new Set(colors).size).toBeGreaterThan(1)
  })
}

test('pointer hover reveals the composed tooltip', async ({ page }) => {
  await gotoChart(page, 'chart--default', 'neutral')
  const chart = page.locator('[data-test="chart-default"]')

  await chart.locator('.recharts-bar-rectangle').first().hover()
  const tooltip = chart.locator('.recharts-tooltip-wrapper')
  await expect(tooltip).toBeVisible()
  await expect(tooltip.getByText('24', { exact: true })).toBeVisible()
})

test('keyboard navigation activates the accessible chart tooltip', async ({
  page,
}) => {
  await gotoChart(page, 'chart--default', 'neutral')
  const chart = page.locator('[data-test="chart-default"]')
  const surface = chart.locator('svg.recharts-surface')

  await expect(surface).toHaveAttribute('tabindex', '0')
  await expect(surface).toHaveAttribute('role', 'application')
  await surface.focus()
  await page.keyboard.press('ArrowRight')

  const tooltip = chart.locator('.recharts-tooltip-wrapper')
  await expect(tooltip).toBeVisible()
  await expect(tooltip.locator('.font-mono').first()).toBeVisible()
})

test('controlled tooltip preserves zero and formatter output while null is omitted', async ({
  page,
}) => {
  await gotoChart(page, 'chart--tooltip-states', 'neutral')
  const chart = page.locator('[data-test="chart-tooltip-states"]')
  const tooltip = chart.locator('.recharts-tooltip-wrapper')

  await expect(tooltip).toBeVisible()
  await expect(tooltip.getByText('0 units', { exact: true })).toBeVisible()
  await expect(
    tooltip.locator('[data-test="formatted-tooltip-value"]')
  ).toHaveCount(1)

  await page.locator('[data-test="chart-tooltip-toggle"]').click()
  await expect(tooltip).not.toBeVisible()
  await page.locator('[data-test="chart-tooltip-toggle"]').click()
  await expect(tooltip).toBeVisible()
})

test('series visibility and responsive width update chart geometry', async ({
  page,
}) => {
  await gotoChart(page, 'chart--tooltip-states', 'neutral')
  const chart = page.locator('[data-test="chart-tooltip-states"]')
  const bars = chart.locator('.recharts-bar-rectangle')
  await expect(bars.first()).toBeVisible()
  const initialBars = await bars.count()

  await page.locator('[data-test="chart-series-toggle"]').click()
  await expect.poll(() => bars.count()).toBeLessThan(initialBars)
  await page.locator('[data-test="chart-series-toggle"]').click()
  await expect.poll(() => bars.count()).toBe(initialBars)

  const initialWidth = (await chart.boundingBox())?.width
  expect(initialWidth).toBeGreaterThan(0)
  await page.locator('[data-test="chart-width-toggle"]').click()
  await expect
    .poll(async () => (await chart.boundingBox())?.width)
    .toBeLessThan(initialWidth ?? 0)
})

test('chart recovers when its containing panel becomes visible', async ({
  page,
}) => {
  await gotoChart(page, 'chart--default', 'neutral')
  const chart = page.locator('[data-test="chart-default"]')
  const surface = chart.locator('svg.recharts-surface')
  await expect(surface).toBeVisible()
  await chart.evaluate((element) => {
    element.style.display = 'none'
  })
  await expect(surface).not.toBeVisible()
  await chart.evaluate((element) => {
    element.style.display = ''
  })
  await expect(surface).toBeVisible()
  await expect
    .poll(async () => (await surface.boundingBox())?.width ?? 0)
    .toBeGreaterThan(0)
})

test('tooltip and legend retain formatter, icon, key and hidden-label behavior', () => {
  const result = renderOnServer(`
    const payload = [
      { name: 'series', dataKey: 'value', value: 0, color: 'red', payload: { category: 'mapped' } },
      { name: 'missing', dataKey: 'missing', value: null, payload: {} },
      { name: 'undefined', dataKey: 'undefined', value: undefined, payload: {} },
    ]
    const config = { mapped: { label: 'Mapped', color: 'red', icon: () => createElement('i', { 'data-icon': true }) } }
    const renderContent = (Component, props) => renderToStaticMarkup(createElement(ChartContainer,
      { config }, createElement(Component, props)))
    const base = { active: true, payload, nameKey: 'category', labelKey: 'category',
      labelFormatter: () => createElement('b', { 'data-label': true }) }
    console.log(JSON.stringify({
      zero: renderContent(ChartTooltipContent, base),
      hidden: renderContent(ChartTooltipContent, { ...base, hideLabel: true }),
      formatted: renderContent(ChartTooltipContent, { ...base, formatter: (value, name, item, index) =>
        createElement('span', { 'data-value': value, 'data-index': index, 'data-key': item.dataKey, 'data-name': name }) }),
      indicator: renderContent(ChartTooltipContent, { active: true, payload: [payload[0]], indicator: 'dashed' }),
      noIndicator: renderContent(ChartTooltipContent, { active: true, payload: [payload[0]], hideIndicator: true }),
      legend: renderContent(ChartLegendContent, { nameKey: 'category', payload: [{ value: 'series', color: 'red', payload: { category: 'mapped' } }] }),
      hiddenIcon: renderContent(ChartLegendContent, { hideIcon: true, nameKey: 'category', payload: [{ value: 'series', color: 'red', payload: { category: 'mapped' } }] }),
    }))
  `)
  const output = JSON.parse(result) as Record<string, string>
  expect(output.zero).toContain('>0</span>')
  expect(output.zero).toContain('data-icon="true"')
  expect(output.zero).toContain('data-label="true"')
  expect(output.hidden).not.toContain('data-label="true"')
  expect(output.formatted).toContain('data-value="0"')
  expect(output.formatted.match(/data-value=/g)).toHaveLength(1)
  expect(output.formatted).toContain('data-index="0"')
  expect(output.formatted).toContain('data-key="value"')
  expect(output.indicator).toContain('border-dashed')
  expect(output.noIndicator).not.toContain('border-dashed')
  expect(output.legend).toContain('data-icon="true"')
  expect(output.hiddenIcon).not.toContain('data-icon="true"')
})
