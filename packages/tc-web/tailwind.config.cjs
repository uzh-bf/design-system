const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    extend: {
      colors: {
        uzhblue: '#0028A5',
        uzhcyan: '#4AC9E3',
        uzhapple: '#A4D233',
        uzhgold: '#FFC845',
        uzhorange: 'FC4C02',
        uzhberry: '#BF0D3E',
        uzhlgrey2: '#EFEFEF',
        uzhlgrey3: '#E7E7E7',
      },
      boxShadow: {
        uzh: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },

      fontFamily: {
        sans: [
          '"Source Sans 3"',
          '"Source Sans Pro"',
          ...defaultTheme.fontFamily.sans,
        ],
        title: [
          '"Source Sans 3"',
          '"Source Sans Pro"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  corePlugins: {
    preflight: false,
  },
}
