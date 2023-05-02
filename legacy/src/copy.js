const fs = require('fs')
const path = require('path')

fs.copyFileSync(
  path.resolve(__dirname, '../node_modules/tailwindcss/src/css/preflight.css'),
  path.resolve(__dirname, '../dist/preflight.css')
)
