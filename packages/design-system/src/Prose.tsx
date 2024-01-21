import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface ProseProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    root?: string
  }
  children: React.ReactNode
}

/**
 * This function returns a pre-styled prose component based on TailwindCSS prose and the custom theme.
 *
 * @param id - The id of the prose component.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - The content of the prose component.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Children with the standard prose and some custom styling applied to them.
 */
export function Prose({ id, data, className, children }: ProseProps) {
  return (
    <div
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge(
        'prose-h4:text-md prose prose-headings:font-sans prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg sm:hover:prose-a:text-primary',
        className?.root
      )}
    >
      {children}
    </div>
  )
}

export default Prose
