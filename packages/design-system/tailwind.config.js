import {
  TailwindAnimations,
  TailwindColorsUZH,
  TailwindFonts,
} from './src/constants'

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
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      ...TailwindAnimations,
      fontFamily: {
        ...TailwindFonts,
      },
      colors: {
        ...TailwindColorsUZH,
        'primary-100': 'var(--theme-color-primary)',
        'primary-80': 'var(--theme-color-primary-80)',
        'primary-60': 'var(--theme-color-primary-60)',
        'primary-40': 'var(--theme-color-primary-40)',
        'primary-20': 'var(--theme-color-primary-20)',
        'secondary-100': 'var(--theme-color-secondary)',
        'secondary-80': 'var(--theme-color-secondary-80)',
        'secondary-60': 'var(--theme-color-secondary-60)',
        'secondary-40': 'var(--theme-color-secondary-40)',
        'secondary-20': 'var(--theme-color-secondary-20)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    import('tailwindcss-animate'),
    import('@tailwindcss/typography'),
    import('@tailwindcss/aspect-ratio'),
    import('@tailwindcss/forms'),
  ],
}
