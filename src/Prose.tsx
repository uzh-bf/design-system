import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface ProseProps {
  className?: {
    root?: string
  }
  children: React.ReactNode
}

export function Prose({ className, children }: ProseProps) {
  const theme = useContext(ThemeContext)

  return (
    <div
      className={twMerge(
        'prose-h4:text-md prose prose-headings:font-sans prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
        theme.primaryProseHover,
        className?.root
      )}
    >
      {children}
    </div>
  )
}

export default Prose
