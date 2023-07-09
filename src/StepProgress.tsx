import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface StepProgressProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  value: number
  max: number
  onItemClick: (ix: number) => void
  displayOffset?: number
  className?: {
    root?: string
  }
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
  onItemClick,
  displayOffset,
  className,
}: StepProgressProps) {
  const theme = useContext(ThemeContext)

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
            'rounded-l px-3 py-1 text-white',
            theme.primaryBgMedium,
            theme.primaryTextHover,
            theme.primaryBgHover
          )}
          onClick={() => onItemClick(value - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}
      {new Array(max).fill(0).map((_, ix) => (
        <button
          className={twMerge(
            'flex-1 p-1',
            ix === 0 && 'rounded-l',
            ix === max - 1 && 'rounded-r',
            value > ix && `text-white ${theme.primaryBgMedium}`,
            value === ix && `bg-gray-400 font-bold text-white`,
            displayOffset && ix < value - displayOffset && 'hidden',
            displayOffset && ix > value + displayOffset && 'hidden',
            theme.primaryTextHover,
            theme.primaryBgHover
          )}
          onClick={() => onItemClick(ix)}
        >
          {ix + 1}
        </button>
      ))}
      {displayOffset && max > value + displayOffset + 1 && (
        <button
          className={twMerge(
            'rounded-r px-3 py-1',
            theme.primaryTextHover,
            theme.primaryBgHover
          )}
          onClick={() => onItemClick(value + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  )
}

export default StepProgress
