import { defineConfig, devices } from '@playwright/test'

// Tests run against the built static Ladle (what CI deploys), served by
// `ladle preview` on a dedicated port so it never clashes with a running
// `ladle serve` dev server (61000).
const PORT = 61011
const BASE_URL = `http://127.0.0.1:${PORT}/design-system/`

// Local fast-iteration escape hatch: `PWTEST_SKIP_BUILD=1 pnpm test` reuses the
// existing `build/` instead of rebuilding Ladle on every run. CI never skips.
const SKIP_BUILD = process.env.PWTEST_SKIP_BUILD === '1'
const PREVIEW = `pnpm exec ladle preview --port ${PORT} --host 127.0.0.1`

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // The a11y harness (tests/_support/ladle.ts) can wait up to ~35s before axe
  // even runs (15s data-storyloaded + 15s story mount + 3s fonts + 2.5s settle).
  // Playwright's 30s default would let a slow-but-healthy run under contention
  // time out with zero violations behind it, which is exactly the false-red the
  // gate must not produce. 60s clears the worst case; retries:1 absorbs a stray.
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    // Kill open/close transitions so axe never scans a mid-animation state.
    reducedMotion: 'reduce',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: SKIP_BUILD ? PREVIEW : `pnpm build:ladle && ${PREVIEW}`,
    url: BASE_URL,
    // Locally, reuse a preview already on this port (skips the rebuild). The dev
    // owns freshness then; CI always starts clean and rebuilds.
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'pipe',
  },
})
