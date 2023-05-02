const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
// const cssnano = require('cssnano')
const tailwindcss = require('tailwindcss')
const tailwindcssNesting = require('tailwindcss/nesting')
const alias = require('@rollup/plugin-alias')
const html = require('@rollup/plugin-html')

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      html({
        include: '**/*.html',
      }),
      postcss({
        plugins: [tailwindcssNesting(), tailwindcss(), autoprefixer()],
        inject: false,
        extract: true,
      }),
      alias({
        entries: [
          { find: 'react', replacement: 'preact/compat' },
          { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
          { find: 'react-dom', replacement: 'preact/compat' },
          { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
        ],
      })
    )
    return config
  },
}
