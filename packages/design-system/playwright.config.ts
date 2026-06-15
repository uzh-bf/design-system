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
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
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
