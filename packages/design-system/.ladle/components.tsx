// organize-imports-ignore
import type { GlobalProvider } from '@ladle/react'
import React from 'react'
import { ThemeProvider, type Theme } from 'src/ThemeProvider'
import 'src/tailwind.css'

/**
 * Ladle global provider with a design-system theme switcher.
 *
 * Wraps every story in the design-system `ThemeProvider` (neutral | uzh) and an
 * optional `.dark` class, so the v5 dual-theme system can be previewed live in
 * the demo.
 */
// Persist the preview controls so the selected theme survives Ladle's full-page
// reload on every story navigation (otherwise it silently reverts to neutral).
const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback
  const v = window.localStorage.getItem(key)
  return v === null ? fallback : (JSON.parse(v) as T)
}

export const Provider: GlobalProvider = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme>(() =>
    read<Theme>('ladle-theme', 'neutral')
  )
  const [dark, setDark] = React.useState<boolean>(() =>
    read<boolean>('ladle-dark', false)
  )

  React.useEffect(() => {
    window.localStorage.setItem('ladle-theme', JSON.stringify(theme))
  }, [theme])
  React.useEffect(() => {
    window.localStorage.setItem('ladle-dark', JSON.stringify(dark))
  }, [dark])

  return (
    <ThemeProvider theme={theme} className={dark ? 'dark' : undefined}>
      <div
        style={{
          position: 'fixed',
          top: 8,
          right: 8,
          zIndex: 9999,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          padding: '6px 8px',
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.12)',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(4px)',
          color: '#111',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontSize: 12,
        }}
      >
        <label style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
          >
            <option value="neutral">neutral</option>
            <option value="uzh">uzh</option>
          </select>
        </label>
        <label style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
          />
          dark
        </label>
      </div>
      {children}
    </ThemeProvider>
  )
}
