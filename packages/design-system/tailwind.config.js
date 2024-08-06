const {
  TailwindColorsUZH,
  TailwindFonts,
  TailwindAnimations,
} = require('./src/constants')

module.exports = {
  content: ['src/**/**.tsx'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      ...TailwindAnimations,
      colors: {
        ...TailwindColorsUZH,
        primary: 'var(--theme-color-primary)',
        'primary-80': 'var(--theme-color-primary-80)',
        'primary-60': 'var(--theme-color-primary-60)',
        'primary-40': 'var(--theme-color-primary-40)',
        'primary-20': 'var(--theme-color-primary-20)',
        secondary: 'var(--theme-color-secondary)',
        'secondary-80': 'var(--theme-color-secondary-80)',
        'secondary-60': 'var(--theme-color-secondary-60)',
        'secondary-40': 'var(--theme-color-secondary-40)',
        'secondary-20': 'var(--theme-color-secondary-20)',
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
