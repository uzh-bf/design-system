import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

import * as RadixProgress from '@radix-ui/react-progress'
import { ThemeContext } from './ThemeProvider'

export interface ProgressProps {
  className?: string
  value: number
  max: number
  indicatorClassName?: string
  formatter: (value: any) => any
  isMaxVisible?: boolean
  nonLinear?: boolean
  displayOffset?: number
  onItemClick?: (ix: number) => void
  [x: string]: any
}

const defaultProps = {
  isMaxVisible: true,
  indicatorClassName: undefined,
  displayOffset: undefined,
  formatter: (value: any) => value,
}

export function Progress({
  formatter,
  value,
  max,
  indicatorClassName,
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
      className={twMerge('relative h-7 text-sm rounded', className)}
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
          indicatorClassName
        )}
      >
        {!nonLinear && formatter(value)}
      </RadixProgress.Indicator>

      {nonLinear && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-row text-xs">
          {displayOffset && value - displayOffset > 0 && (
            <button
              className={twMerge(
                'px-2 py-1 rounded-l text-white',
                theme.primaryBgDark,
                theme.primaryTextHover,
                theme.primaryBgHover
              )}
              onClick={() => onItemClick && onItemClick(value - 1)}
            >
              1 ...
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
                'px-2 py-1 rounded-r',
                theme.primaryTextHover,
                theme.primaryBgHover
              )}
              onClick={() => onItemClick && onItemClick(value + 1)}
            >
              ... {max}
            </button>
          )}
        </div>
      )}
    </RadixProgress.Root>
  )
}

Progress.defaultProps = defaultProps

export default Progress
