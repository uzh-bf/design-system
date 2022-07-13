const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano')
const tailwindcss = require('tailwindcss');
const tailwindcssNesting = require('tailwindcss/nesting');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [tailwindcssNesting(), tailwindcss(), autoprefixer()],
        inject: false,
        extract: true,
      })
    );
    return config;
  },
};
