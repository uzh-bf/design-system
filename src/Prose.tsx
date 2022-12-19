import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface ProseProps {
  id?: string
  data_cy?: string
  className?: {
    root?: string
  }
  children: React.ReactNode
}

const defaultProps = {
  id: undefined,
  data_cy: undefined,
  className: undefined,
}

/**
 * This function returns a pre-styled prose component based on TailwindCSS prose and the custom theme.
 *
 * @param id - The id of the prose component.
 * @param data_cy - The data-cy attribute is used for testing purposes.
 * @param children - The content of the prose component.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Children with the standard prose and some custom styling applied to them.
 */
export function Prose({ id, data_cy, className, children }: ProseProps) {
  const theme = useContext(ThemeContext)

  return (
    <div
      id={id}
      data-cy={data_cy}
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

Prose.defaultProps = defaultProps
export default Prose
