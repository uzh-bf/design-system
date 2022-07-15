const { TailwindColorsUZH, TailwindFonts } = require('./src/constants')

module.exports = {
  content: ['src/**/**.tsx'],
  theme: {
    extend: {
      colors: {
        ...TailwindColorsUZH,
      },
      fontFamily: {
        ...TailwindFonts,
      },
    },
  },
  plugins: [],
}
