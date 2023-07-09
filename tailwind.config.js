const {
  TailwindColorsUZH,
  TailwindFonts,
  TailwindAnimations,
} = require('./src/constants')

module.exports = {
  content: ['src/**/**.tsx'],
  theme: {
    extend: {
      ...TailwindAnimations,
      colors: {
        ...TailwindColorsUZH,
        primary: 'var(--theme-color-primary)',
      },
      fontFamily: {
        ...TailwindFonts,
      },
    },
  },
  plugins: [
    require('tailwindcss-radix')({ variantPrefix: 'rdx' }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    preflight: false,
  },
}
