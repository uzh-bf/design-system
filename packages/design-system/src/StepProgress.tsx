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

function defaultFormatter({ element, ix }: FormatterArgs) {
  if (element.status === 'correct') {
    return {
      className: 'bg-green-600 bg-opacity-60 text-white',
      element: <FontAwesomeIcon icon={faCheckDouble} />,
    }
  }

  if (element.status === 'incorrect') {
    return {
      className: 'bg-red-600 bg-opacity-60 text-white',
      element: <FontAwesomeIcon icon={faX} />,
    }
  }

  if (element.status === 'partial') {
    return {
      className: 'bg-uzh-red-100 bg-opacity-60 text-white',
      element: <FontAwesomeIcon icon={faCheck} />,
    }
  }

  if (!element.status || element.status === 'unanswered') {
    return {
      element: <div>{ix + 1}</div>,
    }
  }

  return {
    element: <div>{ix + 1}</div>,
  }
}

export interface StepItem {
  [x: string]: any
}

interface StepProgressBaseProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  value?: number
  onItemClick: (ix: number, item?: StepItem) => void
  displayOffsetLeft?: number
  displayOffsetRight?: number
  className?: {
    root?: string
  }
  formatter?: ({ element, ix }: { element: StepItem; ix: number }) => {
    className?: string
    element: React.ReactNode
  }
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
  formatter = defaultFormatter,
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
            data-cy={data?.cy ? `${data?.cy}-left` : undefined}
            className={twMerge(
              'hover:text-primary-100 rounded-l px-3 py-1 hover:bg-primary-20',
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
            data-cy={data?.cy ? `${data?.cy}-${ix}` : undefined}
            className={twMerge(
              'hover:text-primary-100 flex flex-1 items-center justify-center border-r border-white p-1 last:border-r-0 hover:bg-primary-20',
              ix === 0 && 'rounded-l',
              ix === length - 1 && 'rounded-r',
              (value || 0) > ix && !items && 'bg-primary-60 text-white',
              value === ix && 'bg-gray-400 font-bold text-white',
              typeof displayOffsetLeft !== 'undefined' &&
                ix < (value || 0) - displayOffsetLeft &&
                'hidden',
              typeof displayOffsetRight !== 'undefined' &&
                ix > (value || 0) + displayOffsetRight &&
                'hidden',
              formattedElement.className,
              value === ix && 'bg-opacity-100'
            )}
            onClick={() => onItemClick(ix, items && items[ix])}
          >
            {formattedElement.element}
          </button>
        )
      })}
      {typeof displayOffsetRight !== 'undefined' &&
        length > (value || 0) + displayOffsetRight + 1 && (
          <button
            data-cy={data?.cy ? `${data?.cy}-right` : undefined}
            className={twMerge(
              'hover:text-primary-100 rounded-r px-3 py-1 hover:bg-primary-20'
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
