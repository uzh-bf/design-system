import React from 'react'

import { twMerge } from 'tailwind-merge'

export interface TagProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    root?: string
  }
  label: string
}

/**
 * This function returns a pre-styled tag component
 *
 * @param id - The id of the tag.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label of the tag.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tag component
 */
export function Tag({ id, data, className, label = '' }: TagProps) {
  return (
    <div
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge(
        'px-2 py-1 text-sm bg-slate-100 rounded text-slate-700',
        className?.root
      )}
    >
      {label}
    </div>
  )
}

export default Tag
