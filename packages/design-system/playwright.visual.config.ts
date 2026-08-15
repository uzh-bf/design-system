import { defineConfig, devices } from '@playwright/test'

const PORT = 61011
const BASE_URL = 'http://127.0.0.1:' + PORT + '/design-system/'
const SKIP_BUILD = process.env.PWTEST_SKIP_BUILD === '1'
const PREVIEW = 'pnpm exec ladle preview --port ' + PORT + ' --host 127.0.0.1'

export default defineConfig({
  testDir: './visual',
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  timeout: 60_000,
  updateSnapshots: 'none',
  reporter: process.env.CI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  outputDir: 'visual/test-results',
  use: {
    baseURL: BASE_URL,
    locale: 'en-GB',
    timezoneId: 'UTC',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      threshold: 0,
      maxDiffPixels: 0,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        locale: 'en-GB',
        timezoneId: 'UTC',
        colorScheme: 'light',
        reducedMotion: 'reduce',
      },
    },
  ],
  webServer: {
    command: SKIP_BUILD ? PREVIEW : 'pnpm build:ladle && ' + PREVIEW,
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 180_000,
    stdout: 'pipe',
  },
})
