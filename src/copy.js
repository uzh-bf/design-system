const fs = require('fs')
const path = require('path')

fs.copyFileSync(
  path.resolve(__dirname, './fonts-kollektif.css'),
  path.resolve(__dirname, '../dist/fonts-kollektif.css')
)

fs.copyFileSync(
  path.resolve(__dirname, './fonts-kollektif-next13.css'),
  path.resolve(__dirname, '../dist/fonts-kollektif-next13.css')
)

fs.copyFileSync(
  path.resolve(__dirname, './fonts-thesans.css'),
  path.resolve(__dirname, '../dist/fonts-thesans.css')
)

fs.copyFileSync(
  path.resolve(__dirname, './fonts-thesans-next13.css'),
  path.resolve(__dirname, '../dist/fonts-thesans-next13.css')
)
