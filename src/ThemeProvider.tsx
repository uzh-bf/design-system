import React, { createContext } from 'react'

type Theme = {
  primaryBg: string
  primaryBgMedium: string
  primaryBgDark: string
  primaryBgHover: string
  primaryBgMediumHover: string
  primaryBgDarkHover: string
  primaryBorder: string
  primaryBorderHover: string
  primaryText: string
  primaryTextHover: string
  primaryProseHover: string
  primaryFill: string
  primaryFillHover: string
}

interface Props {
  theme?: Partial<Theme>
  children: React.ReactNode
}

const BASE_THEME: Theme = {
  primaryBg: 'bg-uzh-red-20',
  primaryBgMedium: 'bg-uzh-red-60',
  primaryBgDark: 'bg-uzh-red-80',
  primaryBgHover: 'hover:bg-uzh-red-20',
  primaryBgMediumHover: 'hover:bg-uzh-red-60',
  primaryBgDarkHover: 'hover:bg-uzh-red-80',
  primaryBorder: 'border-uzh-red-40',
  primaryBorderHover: 'hover:border-uzh-red-40',
  primaryText: 'text-uzh-red-100',
  primaryTextHover: 'hover:text-uzh-red-100',
  primaryProseHover: 'hover:prose-a:text-uzh-red-100',
  primaryFill: 'fill-uzh-red-80',
  primaryFillHover: 'hover:fill-uzh-red-100',
}

export const ThemeContext = createContext<Theme>(BASE_THEME)

export function ThemeProvider({ theme, children }: Props) {
  return (
    <ThemeContext.Provider value={{ ...BASE_THEME, ...theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.defaultProps = {
  theme: {},
}

export default ThemeProvider
