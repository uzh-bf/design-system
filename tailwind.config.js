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
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
