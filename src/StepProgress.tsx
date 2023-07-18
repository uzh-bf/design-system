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

export interface StepItem {
  status: 'correct' | 'incorrect' | 'partial' | 'unanswered'
  [x: string]: any
}

interface StepProgressBaseProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  value: number
  onItemClick: (ix: number, item?: StepItem) => void
  displayOffset?: number
  className?: {
    root?: string
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
 * @param onItemClick - The function that is called when an item is clicked.
 * @param displayOffset - The number that determines the maximum number of elements that are shown to the left and right of the current value on the step progress bar.
 * @param className - The optional className object allows you to override the default styling.
 * @return Step progress component
 */
export function StepProgress({
  id,
  data,
  value,
  max,
  items,
  onItemClick,
  displayOffset,
  className,
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
      {displayOffset && value - displayOffset > 0 && (
        <button
          className={twMerge(
            'rounded-l px-3 py-1 hover:bg-primary-20 hover:text-primary',
            !items && 'bg-primary-60 text-white'
          )}
          onClick={() => onItemClick(value - 1, items && items[value - 1])}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}
      {elements.map((element, ix) => (
        <button
          className={twMerge(
            'flex flex-1 items-center justify-center p-1 hover:bg-primary-20 hover:text-primary',
            ix === 0 && 'rounded-l',
            ix === length - 1 && 'rounded-r',
            value > ix && !items && 'bg-primary-60 text-white',
            value === ix && 'bg-gray-400 font-bold text-white',
            element.status === 'correct' &&
              'bg-green-600 bg-opacity-60 text-white',
            element.status === 'incorrect' &&
              'bg-red-600 bg-opacity-60 text-white',
            element.status === 'partial' &&
              'bg-uzh-red-100 bg-opacity-60 text-white',
            value === ix && 'bg-opacity-100',
            displayOffset && ix < value - displayOffset && 'hidden',
            displayOffset && ix > value + displayOffset && 'hidden'
          )}
          onClick={() => onItemClick(ix, items && items[ix])}
        >
          {element.status === 'correct' && (
            <FontAwesomeIcon icon={faCheckDouble} />
          )}
          {element.status === 'incorrect' && <FontAwesomeIcon icon={faX} />}
          {element.status === 'partial' && <FontAwesomeIcon icon={faCheck} />}
          {(!element.status || element.status === 'unanswered') && (
            <div>{ix + 1}</div>
          )}
        </button>
      ))}
      {displayOffset && length > value + displayOffset + 1 && (
        <button
          className="rounded-r px-3 py-1 hover:bg-primary-20 hover:text-primary"
          onClick={() => onItemClick(value + 1, items && items[value + 1])}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  )
}

export default StepProgress
