'use client'

import * as React from 'react'
import { twMerge } from 'tailwind-merge'

export type Theme = 'neutral' | 'uzh'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const noop = () => {}

/**
 * Wraps an application (or subtree) in a design-system theme.
 *
 * Renders a `data-theme` container so all design-system components below it
 * resolve their tokens against the chosen theme. The default theme is
 * `neutral` (de-branded shadcn); UZH apps pass `theme="uzh"`.
 *
 * Works controlled (`theme` prop) or uncontrolled (`defaultTheme` + `useTheme`).
 *
 * @param theme - Controlled theme. When set, the provider is fully controlled.
 * @param defaultTheme - Initial theme for uncontrolled usage (default `neutral`).
 * @param className - Optional classes for the wrapping container. The container
 *   uses `display: contents`, so only inherited classes (e.g. `dark`) take
 *   effect; box-model classes (padding, sizing, background) are a no-op.
 * @param children - The subtree that should consume the theme.
 */
export function ThemeProvider({
  theme: controlledTheme,
  defaultTheme = 'neutral',
  className,
  children,
}: {
  theme?: Theme
  defaultTheme?: Theme
  className?: string
  children: React.ReactNode
}) {
  const [uncontrolledTheme, setUncontrolledTheme] =
    React.useState<Theme>(defaultTheme)
  const isControlled = controlledTheme !== undefined
  const theme = controlledTheme ?? uncontrolledTheme

  // In controlled mode the parent owns `theme`, so `setTheme` is a no-op rather
  // than writing to internal state that is never rendered (which would desync if
  // the consumer later dropped the `theme` prop).
  const value: ThemeContextValue = {
    theme,
    setTheme: isControlled ? noop : setUncontrolledTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={theme} className={twMerge('contents', className)}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

/**
 * Reads the current design-system theme from the nearest `ThemeProvider`.
 *
 * @returns The active `theme` and a `setTheme` setter (no-op target when the
 *   provider is controlled via its `theme` prop).
 * @throws If used outside a `ThemeProvider`.
 */
// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its provider
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
