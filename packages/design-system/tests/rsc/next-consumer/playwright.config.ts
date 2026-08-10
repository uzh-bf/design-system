import { defineConfig } from '@playwright/test'

const port = process.env.RSC_FIXTURE_PORT ?? '4173'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
  },
})
