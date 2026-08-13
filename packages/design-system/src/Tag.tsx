import type React from 'react'
import { twMerge } from 'tailwind-merge'

export interface TagProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    root?: string
    remove?: string
  }
  label: string
  active?: boolean
  dashed?: boolean
  removable?: boolean
  removeLabel?: string
  onRemove?: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * This function returns a pre-styled tag component
 *
 * @param id - The id of the tag.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label of the tag.
 * @param active - Indicate whether the tag is selected.
 * @param dashed - Indicate whether the tag should use a dashed border.
 * @param removable - Indicate whether the tag should show a remove button.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tag component
 */
export function Tag({
  id,
  data,
  className,
  label = '',
  active = false,
  dashed = false,
  removable = false,
  removeLabel,
  onRemove,
}: TagProps) {
  return (
    <div
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge(
        'inline-flex h-6 w-max items-center gap-1.5 rounded-sm border border-transparent bg-[#EFEFEF] px-2 text-xs font-medium text-[#333333]',
        active &&
          'border-primary-100 bg-primary-20 text-primary-100 font-semibold',
        dashed && 'border-border bg-background border-dashed',
        className?.root
      )}
    >
      <svg
        className="text-muted-foreground size-[11px] shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" x2="7.01" y1="7" y2="7" />
      </svg>
      {label}
      {removable ? (
        <button
          type="button"
          className={twMerge(
            'text-muted-foreground hover:text-destructive focus-visible:ring-ring/50 -mr-0.5 inline-flex size-3.5 cursor-pointer items-center justify-center rounded-xs text-[13px] leading-none focus-visible:ring-[3px] focus-visible:outline-hidden',
            className?.remove
          )}
          aria-label={removeLabel ?? `Remove ${label}`}
          onClick={(event) => {
            event.stopPropagation()
            onRemove?.(event)
          }}
        >
          ×
        </button>
      ) : null}
    </div>
  )
}

export default Tag
