// organize-imports-ignore
import type { GlobalProvider } from '@ladle/react'
import React from 'react'
import 'src/tailwind-with-preflight.css'

export const Provider: GlobalProvider = ({ children }) => <>{children}</>
