import tailwindRadix from 'tailwindcss-radix'
import { TailwindAnimations } from './src/constants'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      ...TailwindAnimations,
      fontFamily: 'TailwindFonts',
      colors: 'TailwindColorsUZH',
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    import('tailwindcss-animate'),
    import('@tailwindcss/typography'),
    import('@tailwindcss/aspect-ratio'),
    import('@tailwindcss/forms'),
    tailwindRadix({
      variantPrefix: 'rdx',
    }),
  ],
}
