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
 * Wraps an application in a design-system theme.
 *
 * Writes `data-theme` to `document.documentElement` in an effect and keeps it in
 * sync with the active theme, so every design-system component resolves its
 * tokens against one theme on the document root — including Radix overlays that
 * portal to `document.body`. The default theme is `neutral` (de-branded
 * shadcn); UZH apps pass `theme="uzh"`.
 *
 * Works controlled (`theme` prop) or uncontrolled (`defaultTheme` + `useTheme`).
 *
 * Because the attribute is written from an effect, server-rendered markup is
 * unthemed on first paint. Render `<html data-theme="uzh">` yourself for the
 * theme the app starts in; this provider then syncs and toggles it on the
 * client. The rendered container is `display: contents` and carries no theme of
 * its own, so it never scopes a theme to a subtree: with several providers
 * mounted, the document root holds the theme of whichever one wrote last (the
 * outermost on mount, then the most recent change).
 *
 * @param theme - Controlled theme. When set, the provider is fully controlled.
 * @param defaultTheme - Initial theme for uncontrolled usage (default `neutral`).
 * @param className - Optional classes for the container. The container uses
 *   `display: contents`, so only inherited classes take effect; box-model
 *   classes (padding, sizing, background) are a no-op. The `dark` axis belongs
 *   on the document root next to `data-theme` — passing `dark` here leaves the
 *   dark status surfaces of the `uzh` theme unmatched.
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

  // The theme lives on the document root, never on this container: a themed
  // container re-declares the whole token layer for its subtree and would
  // shadow a consumer ramp override made at `:root[data-theme='uzh']`. The
  // attribute is left in place on unmount, so tearing down a provider cannot
  // strip the theme from an app that still renders themed content.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={value}>
      <div className={twMerge('contents', className)}>{children}</div>
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
