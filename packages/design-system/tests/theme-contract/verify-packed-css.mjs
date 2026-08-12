/**
 * Packed CSS ownership tracer (Slice 1 of the v5 theme extension contract).
 *
 * Builds and packs the local design system, extracts the packed ./css artifact
 * from the resulting tarball, loads it into a minimal browser page WITHOUT
 * Ladle, and records/asserts the computed-token contract matrix across
 * document roots, stylesheet orders, and a synthetic consumer primary ramp.
 *
 * The packed artifact is the source under test: this harness never reads
 * src/*.css or the workspace dist directly. All expected values below are
 * independent literals derived from the current compiled artifact, so a
 * deliberate change to the compiled cascade (e.g. Slice 2's ramp bridges)
 * flips this command red until the contract table is updated with it.
 */
import { chromium } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageDir = path.resolve(__dirname, '../..')

/* ---- Token inventory ---- */

const RAMP_TOKENS = [
  '--theme-color-primary',
  '--theme-color-primary-80',
  '--theme-color-primary-60',
  '--theme-color-primary-40',
  '--theme-color-primary-20',
]

const PUBLIC_RAMP_TOKENS = [
  '--color-primary-100',
  '--color-primary-80',
  '--color-primary-60',
  '--color-primary-40',
  '--color-primary-20',
]

const BRIDGE_TOKENS = [
  '--primary',
  '--ring',
  '--sidebar-primary',
  '--sidebar-ring',
  '--sidebar-accent',
  '--sidebar-accent-foreground',
]

const GENERIC_TOKENS = ['--accent', '--destructive']

const APP_TOKENS = ['--app-primary', '--app-accent', '--app-destructive']

const SENTINEL_TOKENS = [
  '--theme-color-secondary',
  '--theme-color-secondary-80',
  '--theme-color-secondary-60',
  '--theme-color-secondary-40',
  '--theme-color-secondary-20',
  '--theme-success',
  '--theme-success-foreground',
  '--theme-success-background',
  '--theme-warning',
  '--theme-warning-foreground',
  '--theme-warning-background',
  '--theme-info',
  '--theme-info-foreground',
  '--theme-info-background',
  '--theme-destructive-text',
  '--destructive-foreground',
  '--destructive-background',
  '--notification',
  '--theme-font-sans',
  '--theme-font-mono',
  '--chart-1',
  '--chart-2',
  '--chart-3',
  '--chart-4',
  '--chart-5',
]

const CORE_TOKENS = [
  ...RAMP_TOKENS,
  ...PUBLIC_RAMP_TOKENS,
  ...BRIDGE_TOKENS,
  ...GENERIC_TOKENS,
]

/* ---- Document roots ---- */

const ROOTS = {
  neutral: {},
  uzh: { 'data-theme': 'uzh' },
  'neutral-dark': { class: 'dark' },
  'uzh-dark': { class: 'dark', 'data-theme': 'uzh' },
}

/* ---- Synthetic consumer stylesheets ---- */

// Generic (unsupported) consumer collision: declares the shadcn/generic
// bridge names directly. Collision evidence, not a supported branding path.
const GENERIC_CONSUMER_CSS = `:root {
  --primary: #00ff00;
  --accent: #00ffff;
  --destructive: #ff00ff;
}`

// App-prefixed control: consumer semantic variables must never collide with
// design-system or shadcn bridge names.
const APP_PREFIXED_CONSUMER_CSS = `:root {
  --app-primary: #00ff00;
  --app-accent: #00ffff;
  --app-destructive: #ff00ff;
}`

// Complete synthetic five-step UZH primary-ramp override (the supported
// consumer-owned branding contract, applied after the DS stylesheet).
const RAMP_CONSUMER_CSS = `:root {
  --theme-color-primary: #d94f2b;
  --theme-color-primary-80: #e27454;
  --theme-color-primary-60: #ea997d;
  --theme-color-primary-40: #f2bfa7;
  --theme-color-primary-20: #fae4d9;
}`

const COLLISION_RESULT = {
  '--primary': '#00ff00',
  '--accent': '#00ffff',
  '--destructive': '#ff00ff',
}

const APP_RESULT = {
  '--app-primary': '#00ff00',
  '--app-accent': '#00ffff',
  '--app-destructive': '#ff00ff',
}

const RAMP_RESULT = {
  '--theme-color-primary': '#d94f2b',
  '--theme-color-primary-80': '#e27454',
  '--theme-color-primary-60': '#ea997d',
  '--theme-color-primary-40': '#f2bfa7',
  '--theme-color-primary-20': '#fae4d9',
  '--color-primary-100': '#d94f2b',
  '--color-primary-80': '#e27454',
  '--color-primary-60': '#ea997d',
  '--color-primary-40': '#f2bfa7',
  '--color-primary-20': '#fae4d9',
}

/* ---- Baseline computed literals per root (current packed artifact) ---- */

const NEUTRAL_FONT_SANS =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
const NEUTRAL_FONT_MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
const UZH_FONT_SANS =
  '"Source Sans 3", "Source Sans Pro", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
const UZH_FONT_MONO =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

const BASE = {
  neutral: {
    '--theme-color-primary': 'oklch(20.5% 0 0)',
    '--theme-color-primary-80': 'oklch(37% 0 0)',
    '--theme-color-primary-60': 'oklch(55% 0 0)',
    '--theme-color-primary-40': 'oklch(72% 0 0)',
    '--theme-color-primary-20': 'oklch(92% 0 0)',
    '--color-primary-100': 'oklch(20.5% 0 0)',
    '--color-primary-80': 'oklch(37% 0 0)',
    '--color-primary-60': 'oklch(55% 0 0)',
    '--color-primary-40': 'oklch(72% 0 0)',
    '--color-primary-20': 'oklch(92% 0 0)',
    '--primary': 'oklch(20.5% 0 0)',
    '--ring': 'oklch(70.8% 0 0)',
    '--sidebar-primary': 'oklch(20.5% 0 0)',
    '--sidebar-ring': 'oklch(70.8% 0 0)',
    '--sidebar-accent': 'oklch(97% 0 0)',
    '--sidebar-accent-foreground': 'oklch(20.5% 0 0)',
    '--accent': 'oklch(97% 0 0)',
    '--destructive': 'oklch(57.71% .2152 27.33)',
    '--theme-color-secondary': 'oklch(45% 0 0)',
    '--theme-color-secondary-80': 'oklch(55% 0 0)',
    '--theme-color-secondary-60': 'oklch(65% 0 0)',
    '--theme-color-secondary-40': 'oklch(80% 0 0)',
    '--theme-color-secondary-20': 'oklch(92% 0 0)',
    '--theme-success': 'oklch(50% .13 150)',
    '--theme-success-foreground': 'oklch(98.5% 0 0)',
    '--theme-success-background': 'oklch(96% .03 150)',
    '--theme-warning': 'oklch(80% .16 80)',
    '--theme-warning-foreground': 'oklch(27% .02 80)',
    '--theme-warning-background': 'oklch(96% .05 90)',
    '--theme-info': 'oklch(50% .14 245)',
    '--theme-info-foreground': 'oklch(98.5% 0 0)',
    '--theme-info-background': 'oklch(96% .03 240)',
    '--theme-destructive-text': '#b91c1c',
    '--destructive-foreground': 'oklch(98.38% .0035 247.86)',
    '--destructive-background': 'oklch(97.05% .0129 17.38)',
    '--notification': 'oklch(57.71% .2152 27.33)',
    '--theme-font-sans': NEUTRAL_FONT_SANS,
    '--theme-font-mono': NEUTRAL_FONT_MONO,
    '--chart-1': 'oklch(64.6% .222 41.116)',
    '--chart-2': 'oklch(60% .118 184.704)',
    '--chart-3': 'oklch(39.8% .07 227.392)',
    '--chart-4': 'oklch(82.8% .189 84.429)',
    '--chart-5': 'oklch(76.9% .188 70.08)',
  },
  uzh: {
    '--theme-color-primary': '#0028a5',
    '--theme-color-primary-80': '#001e7c',
    '--theme-color-primary-60': '#3062ff',
    '--theme-color-primary-40': '#7596ff',
    '--theme-color-primary-20': '#bdc9e8',
    '--color-primary-100': '#0028a5',
    '--color-primary-80': '#001e7c',
    '--color-primary-60': '#3062ff',
    '--color-primary-40': '#7596ff',
    '--color-primary-20': '#bdc9e8',
    '--primary': 'oklch(20.5% 0 0)',
    '--ring': 'oklch(70.8% 0 0)',
    '--sidebar-primary': 'oklch(20.5% 0 0)',
    '--sidebar-ring': 'oklch(70.8% 0 0)',
    '--sidebar-accent': 'oklch(97% 0 0)',
    '--sidebar-accent-foreground': 'oklch(20.5% 0 0)',
    '--accent': 'oklch(97% 0 0)',
    '--destructive': 'oklch(57.71% .2152 27.33)',
    '--theme-color-secondary': '#bf0d3e',
    '--theme-color-secondary-80': '#d9305f',
    '--theme-color-secondary-60': '#f3537f',
    '--theme-color-secondary-40': '#f78caa',
    '--theme-color-secondary-20': '#fbc6d4',
    '--theme-success': '#7ca023',
    '--theme-success-foreground': '#111',
    '--theme-success-background': '#ecf6d6',
    '--theme-warning': '#ffc845',
    '--theme-warning-foreground': '#111',
    '--theme-warning-background': '#fff4da',
    '--theme-info': '#1ea7c4',
    '--theme-info-foreground': '#111',
    '--theme-info-background': '#dbf4f9',
    '--theme-destructive-text': '#111',
    '--destructive-foreground': 'oklch(98.38% .0035 247.86)',
    '--destructive-background': 'oklch(97.05% .0129 17.38)',
    '--notification': 'oklch(57.71% .2152 27.33)',
    '--theme-font-sans': UZH_FONT_SANS,
    '--theme-font-mono': UZH_FONT_MONO,
    '--chart-1': 'oklch(64.6% .222 41.116)',
    '--chart-2': 'oklch(60% .118 184.704)',
    '--chart-3': 'oklch(39.8% .07 227.392)',
    '--chart-4': 'oklch(82.8% .189 84.429)',
    '--chart-5': 'oklch(76.9% .188 70.08)',
  },
  'neutral-dark': {
    '--theme-color-primary': 'oklch(20.5% 0 0)',
    '--theme-color-primary-80': 'oklch(37% 0 0)',
    '--theme-color-primary-60': 'oklch(55% 0 0)',
    '--theme-color-primary-40': 'oklch(72% 0 0)',
    '--theme-color-primary-20': 'oklch(92% 0 0)',
    '--color-primary-100': 'oklch(20.5% 0 0)',
    '--color-primary-80': 'oklch(37% 0 0)',
    '--color-primary-60': 'oklch(55% 0 0)',
    '--color-primary-40': 'oklch(72% 0 0)',
    '--color-primary-20': 'oklch(92% 0 0)',
    '--primary': 'oklch(92.2% 0 0)',
    '--ring': 'oklch(55.6% 0 0)',
    '--sidebar-primary': 'oklch(48.8% .243 264.376)',
    '--sidebar-ring': 'oklch(55.6% 0 0)',
    '--sidebar-accent': 'oklch(26.9% 0 0)',
    '--sidebar-accent-foreground': 'oklch(98.5% 0 0)',
    '--accent': 'oklch(26.9% 0 0)',
    '--destructive': 'oklch(70.4% .191 22.216)',
    '--theme-color-secondary': 'oklch(45% 0 0)',
    '--theme-color-secondary-80': 'oklch(55% 0 0)',
    '--theme-color-secondary-60': 'oklch(65% 0 0)',
    '--theme-color-secondary-40': 'oklch(80% 0 0)',
    '--theme-color-secondary-20': 'oklch(92% 0 0)',
    '--theme-success': 'oklch(50% .13 150)',
    '--theme-success-foreground': 'oklch(98.5% 0 0)',
    '--theme-success-background': 'oklch(24% .04 150)',
    '--theme-warning': 'oklch(80% .16 80)',
    '--theme-warning-foreground': 'oklch(27% .02 80)',
    '--theme-warning-background': 'oklch(26% .04 80)',
    '--theme-info': 'oklch(50% .14 245)',
    '--theme-info-foreground': 'oklch(98.5% 0 0)',
    '--theme-info-background': 'oklch(24% .04 245)',
    '--theme-destructive-text': '#b91c1c',
    '--destructive-foreground': 'oklch(98.38% .0035 247.86)',
    '--destructive-background': 'oklch(55.6% .191 22.216)',
    '--notification': 'oklch(70.4% .191 22.216)',
    '--theme-font-sans': NEUTRAL_FONT_SANS,
    '--theme-font-mono': NEUTRAL_FONT_MONO,
    '--chart-1': 'oklch(48.8% .243 264.376)',
    '--chart-2': 'oklch(69.6% .17 162.48)',
    '--chart-3': 'oklch(76.9% .188 70.08)',
    '--chart-4': 'oklch(62.7% .265 303.9)',
    '--chart-5': 'oklch(64.5% .246 16.439)',
  },
  'uzh-dark': {
    '--theme-color-primary': '#0028a5',
    '--theme-color-primary-80': '#001e7c',
    '--theme-color-primary-60': '#3062ff',
    '--theme-color-primary-40': '#7596ff',
    '--theme-color-primary-20': '#bdc9e8',
    '--color-primary-100': '#0028a5',
    '--color-primary-80': '#001e7c',
    '--color-primary-60': '#3062ff',
    '--color-primary-40': '#7596ff',
    '--color-primary-20': '#bdc9e8',
    '--primary': 'oklch(92.2% 0 0)',
    '--ring': 'oklch(55.6% 0 0)',
    '--sidebar-primary': 'oklch(48.8% .243 264.376)',
    '--sidebar-ring': 'oklch(55.6% 0 0)',
    '--sidebar-accent': 'oklch(26.9% 0 0)',
    '--sidebar-accent-foreground': 'oklch(98.5% 0 0)',
    '--accent': 'oklch(26.9% 0 0)',
    '--destructive': 'oklch(70.4% .191 22.216)',
    '--theme-color-secondary': '#bf0d3e',
    '--theme-color-secondary-80': '#d9305f',
    '--theme-color-secondary-60': '#f3537f',
    '--theme-color-secondary-40': '#f78caa',
    '--theme-color-secondary-20': '#fbc6d4',
    '--theme-success': '#7ca023',
    '--theme-success-foreground': '#111',
    '--theme-success-background': 'oklch(25% .04 165)',
    '--theme-warning': '#ffc845',
    '--theme-warning-foreground': '#111',
    '--theme-warning-background': 'oklch(27% .05 95)',
    '--theme-info': '#1ea7c4',
    '--theme-info-foreground': '#111',
    '--theme-info-background': 'oklch(25% .04 200)',
    '--theme-destructive-text': '#111',
    '--destructive-foreground': 'oklch(98.38% .0035 247.86)',
    '--destructive-background': 'oklch(55.6% .191 22.216)',
    '--notification': 'oklch(70.4% .191 22.216)',
    '--theme-font-sans': UZH_FONT_SANS,
    '--theme-font-mono': UZH_FONT_MONO,
    '--chart-1': 'oklch(48.8% .243 264.376)',
    '--chart-2': 'oklch(69.6% .17 162.48)',
    '--chart-3': 'oklch(76.9% .188 70.08)',
    '--chart-4': 'oklch(62.7% .265 303.9)',
    '--chart-5': 'oklch(64.5% .246 16.439)',
  },
}

/* ---- Matrix cells ---- */

const CELLS = [
  {
    id: 'ds-only',
    consumerCss: null,
    after: true,
    tokens: [...CORE_TOKENS, ...SENTINEL_TOKENS],
  },
  {
    id: 'generic-after-ds',
    consumerCss: GENERIC_CONSUMER_CSS,
    after: true,
    tokens: CORE_TOKENS,
    override: COLLISION_RESULT,
  },
  {
    id: 'generic-before-ds',
    consumerCss: GENERIC_CONSUMER_CSS,
    after: false,
    tokens: CORE_TOKENS,
  },
  {
    id: 'app-after-ds',
    consumerCss: APP_PREFIXED_CONSUMER_CSS,
    after: true,
    tokens: [...CORE_TOKENS, ...APP_TOKENS],
    override: APP_RESULT,
  },
  {
    id: 'app-before-ds',
    consumerCss: APP_PREFIXED_CONSUMER_CSS,
    after: false,
    tokens: [...CORE_TOKENS, ...APP_TOKENS],
    override: APP_RESULT,
  },
  {
    id: 'ramp-after-ds',
    consumerCss: RAMP_CONSUMER_CSS,
    after: true,
    tokens: [...CORE_TOKENS, ...SENTINEL_TOKENS],
    override: RAMP_RESULT,
  },
]

function expectedFor(rootId, cell) {
  return { ...BASE[rootId], ...(cell.override ?? {}) }
}

/* ---- Packed artifact preparation ---- */

const tmpDir = mkdtempSync(path.join(tmpdir(), 'theme-contract-'))
const extractDir = path.join(tmpDir, 'extracted')

let browser
try {
  console.log('[theme-contract] building the design system package')
  execFileSync('pnpm', ['build'], { cwd: packageDir, stdio: 'inherit' })

  console.log('[theme-contract] packing the design system package')
  execFileSync('pnpm', ['pack', '--pack-destination', tmpDir], {
    cwd: packageDir,
    stdio: 'inherit',
  })

  const tarball = readdirSync(tmpDir).find((file) => file.endsWith('.tgz'))
  if (!tarball) throw new Error('pnpm pack produced no tarball')
  const tarballPath = path.join(tmpDir, tarball)

  mkdirSync(extractDir)
  execFileSync('tar', ['-xzf', tarballPath, '-C', extractDir])

  // The packed ./css export is the artifact under test; never read src or the
  // workspace dist directly.
  const packedCssPath = path.join(
    extractDir,
    'package',
    'dist',
    'design-system.css'
  )
  const packedCss = readFileSync(packedCssPath, 'utf8')
  console.log(
    `[theme-contract] artifact under test: ${packedCssPath} (${packedCss.length} bytes)`
  )

  /* ---- Browser matrix ---- */

  browser = await chromium.launch()
  const page = await browser.newPage()
  const actual = {}

  for (const rootId of Object.keys(ROOTS)) {
    const attrs = Object.entries(ROOTS[rootId])
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')
    for (const cell of CELLS) {
      const consumerStyle = cell.consumerCss
        ? `<style>${cell.consumerCss}</style>`
        : ''
      const dsStyle = `<style>${packedCss}</style>`
      const styles = cell.after
        ? `${dsStyle}${consumerStyle}`
        : `${consumerStyle}${dsStyle}`
      const html = `<!doctype html><html ${attrs}><head><meta charset="utf-8">${styles}</head><body></body></html>`
      await page.setContent(html)
      actual[`${rootId}:${cell.id}`] = await page.evaluate((tokens) => {
        const styles = getComputedStyle(document.documentElement)
        return Object.fromEntries(
          tokens.map((token) => [token, styles.getPropertyValue(token)])
        )
      }, cell.tokens)
    }
  }
  await browser.close()

  /* ---- Record and assert ---- */

  let failures = 0
  let assertions = 0
  for (const rootId of Object.keys(ROOTS)) {
    for (const cell of CELLS) {
      const key = `${rootId}:${cell.id}`
      const expected = expectedFor(rootId, cell)
      const values = actual[key]
      console.log(`\n=== ${key} ===`)
      for (const token of cell.tokens) {
        const got = values[token]
        const want = expected[token]
        assertions++
        if (got !== want) {
          failures++
          console.log(
            `  FAIL ${token}\n    expected: ${want}\n    actual:   ${got}`
          )
        }
      }
    }
  }

  console.log(
    `\n[theme-contract] ${assertions - failures}/${assertions} token assertions passed`
  )
  if (failures > 0) {
    console.error(
      `[theme-contract] contract matrix changed: ${failures} assertion(s) failed`
    )
    process.exitCode = 1
  } else {
    console.log('[theme-contract] packed CSS ownership contract is green')
  }
} finally {
  if (browser) await browser.close().catch(() => {})
  rmSync(tmpDir, { recursive: true, force: true })
}
