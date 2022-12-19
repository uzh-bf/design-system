import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface TagProps {
  id?: string
  data_cy?: string
  className?: {
    root?: string
  }
  label: string
}

const defaultProps = {
  id: undefined,
  data_cy: undefined,
  className: undefined,
  label: '',
}

/**
 * This function returns a pre-styled tag component
 *
 * @param id - The id of the tag.
 * @param data_cy - The data-cy attribute of the tag.
 * @param label - The label of the tag.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tag component
 */
export function Tag({ id, data_cy, className, label }: TagProps) {
  return (
    <div
      id={id}
      data-cy={data_cy}
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
