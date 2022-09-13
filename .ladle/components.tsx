// organize-imports-ignore
import type { GlobalProvider } from '@ladle/react'
import React from 'react'

import 'tailwindcss/src/css/preflight.css'
import 'tailwindcss/tailwind.css'
import ThemeProvider from '../src/ThemeProvider'

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <>
    <ThemeProvider>{children}</ThemeProvider>
  </>
)
