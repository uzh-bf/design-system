import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixProgress from '@radix-ui/react-progress'
import { ThemeContext } from './ThemeProvider'

export interface ProgressProps {
  value: number
  max: number
  formatter: (value: any) => any
  isMaxVisible?: boolean
  nonLinear?: boolean
  displayOffset?: number
  onItemClick?: (ix: number) => void
  className?: {
    root?: string
    indicator?: string
  }
  [x: string]: any
}

const defaultProps = {
  isMaxVisible: true,
  displayOffset: undefined,
  formatter: (value: any) => value,
  className: undefined,
}

/**
 * This function returns a pre-styled Progress component based on the RadixUI progress component and the custom theme.
 *
 * @param value - The value of the progress bar. The value should be between 0 and an optionally provided max value.
 * @param max - The maximum value of the progress bar.
 * @param formatter - The function that formats the value of the progress bar.
 * @param isMaxVisible - The boolean that determines if the maximum value should be displayed.
 * @param nonLinear - The boolean that determines if the progress bar should have discrete steps and allow the user to jump between different elements.
 * @param displayOffset - The number that determines the maximum number of elements that are shown on a non-linear progress bar.
 * @param onItemClick - The function that is called when a non-linear progress bar item is clicked.
 * @param className - The optional className object allows you to override the default styling.
 * @return Progress component
 */
export function Progress({
  formatter,
  value,
  max,
  className,
  isMaxVisible,
  nonLinear,
  displayOffset,
  onItemClick,
  ...props
}: ProgressProps) {
  const theme = useContext(ThemeContext)

  return (
    <RadixProgress.Root
      className={twMerge('relative h-7 text-sm rounded', className?.root)}
      value={value}
      max={max}
      {...props}
    >
      <div className="absolute flex flex-col justify-center w-full h-full px-2 py-1 text-right bg-gray-200 rounded">
        {!nonLinear && isMaxVisible && formatter(max)}
      </div>

      <RadixProgress.Indicator
        style={{ width: `${(value / max) * 100}%` }}
        className={twMerge(
          'absolute px-2 py-1 min-w-[40px] h-full text-white rounded flex flex-col justify-center text-right',
          !nonLinear && theme.primaryBgDark,
          className?.indicator
        )}
      >
        {!nonLinear && formatter(value)}
      </RadixProgress.Indicator>

      {nonLinear && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-row text-xs">
          {displayOffset && value - displayOffset > 0 && (
            <button
              className={twMerge(
                'px-3 py-1 rounded-l text-white',
                theme.primaryBgDark,
                theme.primaryTextHover,
                theme.primaryBgHover
              )}
              onClick={() => onItemClick && onItemClick(value - 1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}
          {new Array(max).fill(0).map((item, ix) => (
            <button
              className={twMerge(
                'p-1 flex-1',
                ix === 0 && 'rounded-l',
                ix === max - 1 && 'rounded-r',
                value > ix && `text-white ${theme.primaryBgDark}`,
                value === ix && `font-bold bg-gray-400 text-white`,
                displayOffset && ix < value - displayOffset && 'hidden',
                displayOffset && ix > value + displayOffset && 'hidden',
                theme.primaryTextHover,
                theme.primaryBgHover
              )}
              onClick={() => onItemClick && onItemClick(ix)}
            >
              {ix + 1}
            </button>
          ))}
          {displayOffset && max > value + displayOffset + 1 && (
            <button
              className={twMerge(
                'px-3 py-1 rounded-r',
                theme.primaryTextHover,
                theme.primaryBgHover
              )}
              onClick={() => onItemClick && onItemClick(value + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
      )}
    </RadixProgress.Root>
  )
}

Progress.defaultProps = defaultProps

export default Progress
