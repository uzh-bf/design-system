import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const distDir = path.resolve(__dirname, '../dist')

// Ship the standalone preflight/reset layer.
fs.copyFileSync(
  path.resolve(__dirname, '../node_modules/tailwindcss/preflight.css'),
  path.resolve(distDir, 'preflight.css')
)

// Self-hosted webfonts (THEME-7). Vite's library mode base64-inlines every
// asset a stylesheet references and ignores `assetsInlineLimit` for CSS
// `url()`, which bloats design-system.css ~8x (30KB -> 263KB gzipped) and
// forces every consumer to download all font subsets up front. Undo that here:
// for each font this package references, pull its `data:` URI back out into a
// real dist/fonts/*.woff2 file and repoint the stylesheet at it. Fonts then
// load lazily per unicode-range, and a consumer on the neutral (system-font)
// theme never downloads them at all. The source bytes are read from the same
// @fontsource files Vite inlined, so the base64 match is exact.
//
// Grouped by @fontsource package so each font's OFL-1.1 licence ships beside
// the binaries: the SIL Open Font License requires the copyright notice and
// licence text to travel with any redistributed font software.
const fontPackages = [
  {
    pkg: '@fontsource-variable/source-sans-3',
    files: [
      'source-sans-3-latin-wght-normal.woff2',
      'source-sans-3-latin-ext-wght-normal.woff2',
      'source-sans-3-latin-wght-italic.woff2',
      'source-sans-3-latin-ext-wght-italic.woff2',
    ],
  },
  {
    pkg: '@fontsource-variable/jetbrains-mono',
    files: [
      'jetbrains-mono-latin-wght-normal.woff2',
      'jetbrains-mono-latin-ext-wght-normal.woff2',
    ],
  },
]

const cssPath = path.resolve(distDir, 'design-system.css')
let css = fs.readFileSync(cssPath, 'utf-8')
const fontsDir = path.resolve(distDir, 'fonts')
fs.mkdirSync(fontsDir, { recursive: true })

let extracted = 0
let expected = 0
for (const { pkg, files } of fontPackages) {
  const pkgDir = path.resolve(__dirname, '../node_modules', pkg)
  fs.copyFileSync(
    path.resolve(pkgDir, 'LICENSE'),
    path.resolve(fontsDir, `${path.basename(pkg)}.LICENSE.txt`)
  )
  for (const file of files) {
    expected++
    const bytes = fs.readFileSync(path.resolve(pkgDir, 'files', file))
    const dataUri = `data:font/woff2;base64,${bytes.toString('base64')}`
    if (!css.includes(dataUri)) {
      console.warn(`[copy] font not inlined, skipping extraction: ${file}`)
      continue
    }
    fs.writeFileSync(path.resolve(fontsDir, file), bytes)
    css = css.split(dataUri).join(`./fonts/${file}`)
    extracted++
  }
}

fs.writeFileSync(cssPath, css)

// Fail the build rather than silently shipping the base64-bloated stylesheet:
// a missed match means Vite's data-URI format changed and this extraction no
// longer works, which would quietly regress design-system.css to ~263KB gzip.
if (extracted !== expected) {
  throw new Error(
    `[copy] expected to extract ${expected} inlined fonts but only extracted ` +
      `${extracted}; the Vite data-URI format has likely changed. Refusing to ` +
      `ship design-system.css with megabytes of base64-inlined fonts.`
  )
}
console.log(`[copy] extracted ${extracted}/${expected} inlined fonts + licences`)
