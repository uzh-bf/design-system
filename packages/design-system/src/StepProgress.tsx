'use client'

import {
  faCheck,
  faCheckDouble,
  faChevronLeft,
  faChevronRight,
  faX,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface FormatterArgs {
  element: StepItem
  ix: number
}

// The status icons are decorative (FontAwesome renders them aria-hidden), so
// every branch carries its own visually hidden text. Without it the wrapping
// button has no accessible name at all as soon as a status is set, and the
// plain number alone reads as a bare digit.
function contentFormatter({ element, ix }: FormatterArgs) {
  const step = `Step ${ix + 1}`

  if (element.status === 'correct') {
    return (
      <>
        <FontAwesomeIcon icon={faCheckDouble} />
        <span className="sr-only">{step}: correct</span>
      </>
    )
  }

  if (element.status === 'incorrect') {
    return (
      <>
        <FontAwesomeIcon icon={faX} />
        <span className="sr-only">{step}: incorrect</span>
      </>
    )
  }

  if (element.status === 'partial') {
    return (
      <>
        <FontAwesomeIcon icon={faCheck} />
        <span className="sr-only">{step}: partially correct</span>
      </>
    )
  }

  return (
    <>
      <span aria-hidden="true">{ix + 1}</span>
      <span className="sr-only">{step}</span>
    </>
  )
}

export interface StepItem {
  disabled?: boolean
  status?: 'correct' | 'incorrect' | 'partial' | 'unanswered'
  className?: string
  [x: string]: string | number | boolean | React.ReactElement | undefined | null
}

interface StepProgressBaseProps {
  id?: string
  data?: { cy?: string; test?: string }
  value?: number
  onItemClick: (ix: number, item?: StepItem) => void
  displayOffsetLeft?: number
  displayOffsetRight?: number
  className?: { root?: string }
  formatter?: ({
    element,
    ix,
  }: {
    element: StepItem
    ix: number
  }) => React.ReactNode
}

export interface StepProgressProps extends StepProgressBaseProps {
  max: number
  items?: never
}

export interface StepProgressItemProps extends StepProgressBaseProps {
  max?: never
  items: StepItem[]
}

/**
 * This function returns a pre-styled Progress component based on the RadixUI progress component and the custom theme.
 *
 * @param id - The id of the progress bar.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the progress bar. The value should be between 0 and an optionally provided max value.
 * @param max - The maximum value of the progress bar.
 * @param items - The array of items that are displayed in the step progress bar.
 * @param onItemClick - The function that is called when an item is clicked.
 * @param displayOffsetLeft - The number that determines the maximum number of elements that are shown to the left of the current value on the step progress bar.
 * @param displayOffsetRight - The number that determines the maximum number of elements that are shown to the right of the current value on the step progress bar.
 * @param className - The optional className object allows you to override the default styling.
 * @param formatter - The optional formatter function allows you to override the rendering of each item.
 * @return Step progress component
 */
export function StepProgress({
  id,
  data,
  value,
  max,
  items,
  onItemClick,
  displayOffsetLeft,
  displayOffsetRight,
  className,
  formatter = contentFormatter,
}: StepProgressProps | StepProgressItemProps) {
  const length = items ? items.length : max
  const elements = items || new Array(length).fill(0)

  return (
    <div
      className={twMerge(
        'flex h-7 flex-row rounded bg-gray-200 text-xs',
        className?.root
      )}
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
    >
      {typeof displayOffsetLeft !== 'undefined' &&
        (value || 0) - displayOffsetLeft > 0 && (
          <button
            type="button"
            aria-label="Go to previous step"
            data-cy={data?.cy ? `${data?.cy}-left` : undefined}
            className={twMerge(
              'hover:bg-primary-20 hover:text-primary-100 rounded-l px-3 py-1',
              !items && 'bg-primary-60 text-white'
            )}
            onClick={() =>
              onItemClick(
                (typeof value === 'undefined' ? 1 : value) - 1,
                items && items[(typeof value === 'undefined' ? 1 : value) - 1]
              )
            }
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
      {elements.map((element, ix) => {
        const formattedElement = formatter({ element, ix })
        return (
          <button
            key={ix}
            type="button"
            aria-current={value === ix ? 'step' : undefined}
            data-cy={data?.cy ? `${data?.cy}-${ix}` : undefined}
            disabled={element.disabled ?? false}
            className={twMerge(
              'hover:bg-primary-20 hover:text-primary-100 flex flex-1 cursor-pointer items-center justify-center border-r border-white p-1 last:border-r-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200! disabled:hover:text-black',
              ix === 0 && 'rounded-l',
              ix === length - 1 && 'rounded-r',
              (value || 0) > ix && !items && 'bg-primary-60 text-white',
              value === ix &&
                'bg-gray-400! font-bold! text-white hover:text-white',
              typeof displayOffsetLeft !== 'undefined' &&
                ix < (value || 0) - displayOffsetLeft &&
                'hidden',
              typeof displayOffsetRight !== 'undefined' &&
                ix > (value || 0) + displayOffsetRight &&
                'hidden',
              element.status === 'correct' &&
                'bg-success text-success-foreground hover:bg-success hover:text-success-foreground',
              element.status === 'incorrect' &&
                'bg-destructive text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground',
              element.status === 'partial' &&
                'bg-opacity-60! bg-secondary-100/90! hover:bg-secondary-100! text-white hover:text-white',
              value === ix && 'bg-opacity-100',
              element.className
            )}
            onClick={() => onItemClick(ix, items && items[ix])}
          >
            {formattedElement}
          </button>
        )
      })}
      {typeof displayOffsetRight !== 'undefined' &&
        length > (value || 0) + displayOffsetRight + 1 && (
          <button
            type="button"
            aria-label="Go to next step"
            data-cy={data?.cy ? `${data?.cy}-right` : undefined}
            className={twMerge(
              'hover:bg-primary-20 hover:text-primary-100 rounded-r px-3 py-1'
            )}
            onClick={() =>
              onItemClick(
                (typeof value === 'undefined' ? -1 : value) + 1,
                items && items[(typeof value === 'undefined' ? -1 : value) + 1]
              )
            }
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
    </div>
  )
}

export default StepProgress
