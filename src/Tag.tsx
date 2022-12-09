import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface TagProps {
  className?: {
    root?: string
  }
  label: string
}

const defaultProps = {
  className: undefined,
  label: '',
}

/**
 * This function returns a pre-styled tag component
 *
 * @param label - The label of the tag.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tag component
 */
export function Tag({ className, label }: TagProps) {
  return (
    <div
      className={twMerge(
        'px-2 py-1 text-sm bg-slate-100 rounded text-slate-700',
        className?.root
      )}
    >
      {label}
    </div>
  )
}

Tag.defaultProps = defaultProps

export default Tag
