/**
 * Packed CSS ownership tracer for the v5 theme extension contract.
 *
 * Builds and packs the local design system, extracts the packed ./css artifact
 * from the resulting tarball, loads it into a minimal browser page WITHOUT
 * Ladle, and records/asserts the computed-token contract matrix across
 * document roots, stylesheet orders, and a synthetic consumer primary ramp.
 *
 * The packed artifact is the source under test: this harness never reads
 * src/*.css or the workspace dist directly. All expected values below are
 * independent literals derived from the current compiled artifact, so a
 * deliberate change to the compiled cascade (e.g. the ramp bridges or the
 * fixed foreground sentinels) flips this command red until the contract
 * table is updated with it.
 */
/* global console, document, getComputedStyle, process */

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

const FONT_TOKENS = new Set(['--theme-font-sans', '--theme-font-mono'])

const SENTINEL_TOKENS = [
  '--primary-foreground',
  '--sidebar-primary-foreground',
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
  '--theme-color-link',
  '--theme-color-link-visited',
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

/* ---- Fixed public palette (independent expectation literals) ---- */
const PALETTE = [
  ['uzh-blue', '#0028a5'],
  ['uzh-blue-100', '#0028a5'],
  ['uzh-blue-80', '#001e7c'],
  ['uzh-blue-60', '#3062ff'],
  ['uzh-blue-40', '#7596ff'],
  ['uzh-blue-20', '#bdc9e8'],
  ['uzh-grey', '#a3adb7'],
  ['uzh-grey-100', '#a3adb7'],
  ['uzh-grey-80', '#b5bdc5'],
  ['uzh-grey-60', '#c8ced4'],
  ['uzh-grey-40', '#dadee2'],
  ['uzh-grey-20', '#edeff1'],
  ['uzh-red', '#dc6027'],
  ['uzh-red-100', '#dc6027'],
  ['uzh-red-80', '#e38052'],
  ['uzh-red-60', '#eaa07d'],
  ['uzh-red-40', '#f1bfa9'],
  ['uzh-red-20', '#f8dfd4'],
  ['uzh-berry', '#bf0d3e'],
  ['uzh-berry-100', '#bf0d3e'],
  ['uzh-berry-80', '#d9305f'],
  ['uzh-berry-60', '#f3537f'],
  ['uzh-berry-40', '#f78caa'],
  ['uzh-berry-20', '#fbc6d4'],
  ['uzh-yellow', '#fede00'],
  ['uzh-yellow-100', '#fede00'],
  ['uzh-yellow-80', '#fbe651'],
  ['uzh-yellow-60', '#fcec7c'],
  ['uzh-yellow-40', '#fdf3a8'],
  ['uzh-yellow-20', '#fef9d3'],
  ['uzh-lightgreen', '#91c34a'],
  ['uzh-lightgreen-100', '#91c34a'],
  ['uzh-lightgreen-80', '#aad470'],
  ['uzh-lightgreen-60', '#bfdfc4'],
  ['uzh-lightgreen-40', '#d5e9b7'],
  ['uzh-lightgreen-20', '#eaf4db'],
  ['uzh-darkgreen', '#2a7f62'],
  ['uzh-darkgreen-100', '#2a7f62'],
  ['uzh-darkgreen-80', '#569d85'],
  ['uzh-darkgreen-60', '#80b6a4'],
  ['uzh-darkgreen-40', '#abcec2'],
  ['uzh-darkgreen-20', '#d5e7e1'],
  ['uzh-turqoise', '#0b82a0'],
  ['uzh-turqoise-100', '#0b82a0'],
  ['uzh-turqoise-80', '#3c9fb6'],
  ['uzh-turqoise-60', '#6bb7c7'],
  ['uzh-turqoise-40', '#9ed0d9'],
  ['uzh-turqoise-20', '#cfe8ec'],
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

const UZH_RAMP_BRIDGE_RESULT = {
  '--primary': '#d94f2b',
  '--ring': '#d94f2b',
  '--sidebar-primary': '#d94f2b',
  '--sidebar-ring': '#d94f2b',
  '--sidebar-accent': '#fae4d9',
  '--sidebar-accent-foreground': '#d94f2b',
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
    '--primary-foreground': 'oklch(98.5% 0 0)',
    '--ring': 'oklch(70.8% 0 0)',
    '--sidebar-primary': 'oklch(20.5% 0 0)',
    '--sidebar-primary-foreground': 'oklch(98.5% 0 0)',
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
    '--theme-color-link': '#1d4ed8',
    '--theme-color-link-visited': '#6d28d9',
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
    '--primary': '#0028a5',
    '--primary-foreground': '#fff',
    '--ring': '#0028a5',
    '--sidebar-primary': '#0028a5',
    '--sidebar-primary-foreground': '#fff',
    '--sidebar-ring': '#0028a5',
    '--sidebar-accent': '#bdc9e8',
    '--sidebar-accent-foreground': '#0028a5',
    '--accent': 'oklch(97% 0 0)',
    '--destructive': '#fc4c02',
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
    '--theme-destructive-text': '#bf0d3e',
    '--theme-color-link': '#365dd5',
    '--theme-color-link-visited': '#5972c5',
    '--destructive-foreground': '#111',
    '--destructive-background': '#ffdbcc',
    '--notification': '#bf0d3e',
    '--theme-font-sans': UZH_FONT_SANS,
    '--theme-font-mono': UZH_FONT_MONO,
    '--chart-1': '#0028a5',
    '--chart-2': '#1ea7c4',
    '--chart-3': '#7ca023',
    '--chart-4': '#ffc845',
    '--chart-5': '#bf0d3e',
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
    '--primary-foreground': 'oklch(20.5% 0 0)',
    '--ring': 'oklch(55.6% 0 0)',
    '--sidebar-primary': 'oklch(48.8% .243 264.376)',
    '--sidebar-primary-foreground': 'oklch(98.5% 0 0)',
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
    '--theme-color-link': '#60a5fa',
    '--theme-color-link-visited': '#a78bfa',
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
    '--primary': '#0028a5',
    '--primary-foreground': '#fff',
    '--ring': '#0028a5',
    '--sidebar-primary': '#0028a5',
    '--sidebar-primary-foreground': '#fff',
    '--sidebar-ring': '#0028a5',
    '--sidebar-accent': '#bdc9e8',
    '--sidebar-accent-foreground': '#0028a5',
    '--accent': 'oklch(26.9% 0 0)',
    '--destructive': '#fc4c02',
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
    '--theme-destructive-text': '#bf0d3e',
    '--theme-color-link': '#7596ff',
    '--theme-color-link-visited': '#bdc9e8',
    '--destructive-foreground': '#111',
    '--destructive-background': '#ffdbcc',
    '--notification': '#bf0d3e',
    '--theme-font-sans': UZH_FONT_SANS,
    '--theme-font-mono': UZH_FONT_MONO,
    '--chart-1': '#0028a5',
    '--chart-2': '#1ea7c4',
    '--chart-3': '#7ca023',
    '--chart-4': '#ffc845',
    '--chart-5': '#bf0d3e',
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
  const expected = { ...BASE[rootId], ...(cell.override ?? {}) }
  if (rootId.startsWith('uzh') && cell.id === 'ramp-after-ds') {
    Object.assign(expected, UZH_RAMP_BRIDGE_RESULT)
  }
  return expected
}

/* Keep quoted names byte-for-byte while canonicalizing CSS whitespace outside them. */
function normalizeFontValue(value) {
  let normalized = ''
  let quote = null
  let escaped = false
  let pendingWhitespace = false

  for (const char of value) {
    if (quote !== null) {
      normalized += char
      if (escaped) escaped = false
      else if (char === '\\') escaped = true
      else if (char === quote) quote = null
    } else if (char === '"' || char === "'") {
      if (pendingWhitespace && normalized && !normalized.endsWith(',')) {
        normalized += ' '
      }
      pendingWhitespace = false
      normalized += char
      quote = char
    } else if (char === ',') {
      normalized = normalized.trimEnd()
      normalized += ','
      pendingWhitespace = false
    } else if (/\s/.test(char)) {
      pendingWhitespace = true
    } else {
      if (pendingWhitespace && normalized && !normalized.endsWith(',')) {
        normalized += ' '
      }
      pendingWhitespace = false
      normalized += char
    }
  }

  return normalized
}

function valuesMatch(token, got, want) {
  return FONT_TOKENS.has(token)
    ? normalizeFontValue(got) === normalizeFontValue(want)
    : got === want
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
  // Compile a consumer independently, with conflicting utilities used elsewhere.
  // Component nodes use scoped defaults; explicit utilities still take priority.
  const { default: postcss } = await import('postcss')
  const { default: tailwindPostcss } = await import('@tailwindcss/postcss')
  const packedClasses = new Set()
  postcss.parse(packedCss).walkRules((rule) => {
    if (/^\.[a-z][a-z0-9-]*$/.test(rule.selector))
      packedClasses.add(rule.selector.slice(1))
  })
  const paletteUtilities = PALETTE.flatMap(([name, expected]) =>
    ['bg', 'text', 'border'].map((prefix) => ({
      name: `${prefix}-${name}`,
      expected,
      property: {
        bg: 'backgroundColor',
        text: 'color',
        border: 'borderTopColor',
      }[prefix],
    }))
  )
  const available = paletteUtilities.filter(({ name }) =>
    packedClasses.has(name)
  )
  const missing = paletteUtilities.filter(
    ({ name }) => !packedClasses.has(name)
  )
  // These utilities ship before the token layer completes the full palette.
  // Keep their presence independent of the CSS inventory under test.
  const required = [
    ...[
      'uzh-blue',
      'uzh-grey',
      'uzh-red',
      'uzh-berry',
      'uzh-yellow',
      'uzh-lightgreen',
      'uzh-darkgreen',
      'uzh-turqoise',
    ].flatMap((family) =>
      [100, 80, 60, 40, 20].map((rung) => `bg-${family}-${rung}`)
    ),
    'text-uzh-blue-100',
    'border-uzh-blue-80',
    'border-uzh-grey-100',
    'border-uzh-grey-80',
    'text-uzh-red-100',
  ]
  const lost = required.filter((name) => !packedClasses.has(name))
  if (lost.length)
    throw new Error(`Packed palette utilities missing: ${lost.join(', ')}`)
  for (const theme of ['neutral', 'uzh']) {
    await page.setContent(
      `<html data-theme="${theme}"><head><style>${packedCss}</style></head><body></body></html>`
    )
    const failures = await page.evaluate((utilities) => {
      const probe = document.createElement('div')
      const oracle = document.createElement('div')
      document.body.append(probe, oracle)
      const failures = []
      for (const { name, expected, property } of utilities) {
        probe.className = name
        oracle.style[property] = expected
        if (
          getComputedStyle(probe)[property] !==
          getComputedStyle(oracle)[property]
        )
          failures.push(name)
      }
      probe.remove()
      oracle.remove()
      return failures
    }, available)
    if (failures.length)
      throw new Error(
        `Packed palette values differ (${theme}): ${failures.join(', ')}`
      )
  }
  console.log(
    `[theme-contract] palette inventory: ${available.length}/${paletteUtilities.length} emitted; available values verified in neutral/UZH`
  )
  console.log(
    `[theme-contract] absent utilities require token-layer delivery (not counted as passes): ${missing.map(({ name }) => name).join(', ')}`
  )

  // Browsers hide visited history from script. Substitute the complementary
  // link state to verify that the compiled selector targets the anchor itself.
  const visitedSelectors = []
  postcss.parse(packedCss).walkRules((rule) => {
    if (
      rule.selector.includes('prose-a') &&
      rule.selector.includes('text-link-visited')
    ) {
      visitedSelectors.push(rule.selector.replace(/(?<!\\):visited/g, ':link'))
    }
  })
  const packedProse = readFileSync(
    path.join(extractDir, 'package', 'dist', 'Prose.js'),
    'utf8'
  )
  const visitedClass = packedProse.match(
    /[\w:-]*prose-a[\w:-]*text-link-visited/
  )
  if (!visitedClass) throw new Error('packed Prose has no visited link class')
  await page.setContent(
    `<div class="${visitedClass[0]}"><a id="prose-link" href="https://example.invalid/visited-contract">Link</a></div>`
  )
  const visitedTargetsAnchor = await page.evaluate(
    (selectors) =>
      selectors.some((selector) =>
        document.getElementById('prose-link').matches(selector)
      ),
    visitedSelectors
  )
  if (!visitedTargetsAnchor)
    throw new Error('packed Prose visited selector does not target its anchor')
  console.log('[theme-contract] Prose visited selector targets the anchor')

  const consumerCss = String(
    await postcss([tailwindPostcss({ base: packageDir })]).process(
      '@import "tailwindcss" source(none); @source inline("text-center flex-col-reverse flex-col hidden w-full gap-0.5 p-6 grid-cols-5 col-span-2 max-w-96 max-w-[calc(100%-2rem)]");',
      { from: path.join(packageDir, 'consumer-contract.css') }
    )
  )
  const layouts = [
    [
      'header',
      'ds-dialog-header',
      'textAlign',
      ['center', 'left', 'left', 'left'],
      'text-center',
      'center',
    ],
    [
      'footer',
      'ds-dialog-footer',
      'flexDirection',
      ['column-reverse', 'row', 'row', 'row'],
      'flex-col-reverse',
      'column-reverse',
    ],
    [
      'calendar',
      'ds-calendar-months',
      'flexDirection',
      ['column', 'column', 'row', 'row'],
      'flex-col',
      'column',
    ],
    [
      'pagination',
      'ds-pagination-label',
      'display',
      ['none', 'block', 'block', 'block'],
      'hidden',
      'none',
    ],
    [
      'sidebar-root',
      'ds-sidebar-root',
      'display',
      ['none', 'none', 'block', 'block'],
      'hidden',
      'none',
    ],
    [
      'sidebar-container',
      'ds-sidebar-container',
      'display',
      ['none', 'none', 'flex', 'flex'],
      'hidden',
      'none',
    ],
    [
      'sidebar-rail',
      'ds-sidebar-rail',
      'display',
      ['none', 'flex', 'flex', 'flex'],
      'hidden',
      'none',
    ],
    [
      'drawer',
      'ds-drawer-header',
      'gap',
      ['2px', '2px', '6px', '6px'],
      'gap-0.5',
      '2px',
    ],
    [
      'empty',
      'ds-empty',
      'paddingTop',
      ['24px', '24px', '48px', '48px'],
      'p-6',
      '24px',
    ],
    [
      'action',
      'ds-collapsible-action',
      'gridColumnStart',
      ['span 2', 'span 3', 'span 4', 'span 5'],
      'col-span-2',
      'span 2',
    ],
    [
      'alert',
      'ds-alert-dialog-content',
      'maxWidth',
      ['calc(100% - 32px)', '520px', '520px', '520px'],
      'max-w-96',
      '384px',
    ],
    [
      'nav-content',
      'ds-navigation-menu-content',
      'width',
      ['300px', '300px', '80px', '80px'],
      'w-full',
      '300px',
    ],
    [
      'nav-viewport',
      'ds-navigation-menu-viewport',
      'width',
      ['300px', '300px', '180px', '180px'],
      'w-full',
      '300px',
    ],
  ]
  let layoutAssertions = 0
  for (const theme of ['neutral', 'uzh']) {
    for (const [widthIndex, width] of [390, 700, 900, 1100].entries()) {
      await page.setViewportSize({ width, height: 844 })
      for (const withConsumer of [false, true]) {
        const nodes = layouts
          .map(([id, cls, , , override]) => {
            const style =
              id === 'nav-content'
                ? 'display:inline-block'
                : id === 'nav-viewport'
                  ? '--radix-navigation-menu-viewport-width:180px'
                  : ''
            const child =
              id === 'nav-content' ? '<div style="width:80px"></div>' : ''
            return `<div id="${id}" class="${cls}" style="${style}">${child}</div><div id="${id}-override" class="${cls} ${override}" style="${style}">${child}</div>`
          })
          .join('')
        await page.setContent(
          `<!doctype html><html data-theme="${theme}"><head><style>${packedCss}</style>${withConsumer ? `<style>${consumerCss}</style>` : ''}</head><body><div style="width:300px">${nodes}<div id="grid" class="ds-collapsible-actions" style="display:grid;width:300px"></div><div id="grid-override" class="ds-collapsible-actions grid-cols-5" style="display:grid;width:300px"></div></div></body></html>`
        )
        for (const [id, , property, expected, , overridden] of layouts) {
          const actualValue = await page
            .locator(`[id="${id}"]`)
            .evaluate((el, prop) => getComputedStyle(el)[prop], property)
          if (actualValue !== expected[widthIndex])
            throw new Error(
              `${theme}/${width}/${withConsumer}/${id}: ${actualValue} != ${expected[widthIndex]}`
            )
          layoutAssertions++
          if (withConsumer) {
            const overrideValue = await page
              .locator(`[id="${id}-override"]`)
              .evaluate((el, prop) => getComputedStyle(el)[prop], property)
            if (overrideValue !== overridden)
              throw new Error(
                `${id} explicit override: ${overrideValue} != ${overridden}`
              )
            layoutAssertions++
          }
        }
        const measured = await page.evaluate(() => ({
          grid: getComputedStyle(
            document.getElementById('grid')
          ).gridTemplateColumns.split(' ').length,
          gridOverride: getComputedStyle(
            document.getElementById('grid-override')
          ).gridTemplateColumns.split(' ').length,
        }))
        if (measured.grid !== [5, 7, 9, 11][widthIndex])
          throw new Error('responsive action grid changed')
        if (withConsumer && measured.gridOverride !== 5)
          throw new Error('explicit action grid override failed')
        layoutAssertions += withConsumer ? 2 : 1
      }
    }
  }
  console.log(
    `[theme-contract] ${layoutAssertions} responsive and consumer override assertions passed`
  )

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
        if (!valuesMatch(token, got, want)) {
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
