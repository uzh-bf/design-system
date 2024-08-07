import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

fs.copyFileSync(
  path.resolve(__dirname, '../node_modules/tailwindcss/src/css/preflight.css'),
  path.resolve(__dirname, '../dist/preflight.css')
)
