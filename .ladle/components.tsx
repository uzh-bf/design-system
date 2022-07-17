import React from 'react'
import type { GlobalProvider } from '@ladle/react'

import ThemeProvider from '../src/ThemeProvider'
import 'tailwindcss/tailwind.css'

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <>
    <ThemeProvider>{children}</ThemeProvider>
  </>
)
