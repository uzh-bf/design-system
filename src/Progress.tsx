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
  isMaxVisible: boolean
  [x: string]: any
}

const defaultProps = {
  isMaxVisible: true,
  indicatorClassName: undefined,
  formatter: (value: any) => value,
}

export function Progress({
  formatter,
  value,
  max,
  indicatorClassName,
  className,
  isMaxVisible,
  ...props
}: ProgressProps) {
  const theme = useContext(ThemeContext)

  const computedClassName = twMerge('relative h-7 text-sm rounded', className)

  return (
    <RadixProgress.Root
      className={computedClassName}
      value={value}
      max={max}
      {...props}
    >
      <div className="absolute flex flex-col justify-center w-full h-full px-2 py-1 text-right bg-gray-200 rounded">
        {isMaxVisible && formatter(max)}
      </div>

      <RadixProgress.Indicator
        style={{ width: `${(value / max) * 100}%` }}
        className={twMerge(
          'absolute px-2 py-1 min-w-[40px] text-white rounded flex flex-col justify-center text-right',
          theme.primaryBgDark,
          indicatorClassName
        )}
      >
        {formatter(value)}
      </RadixProgress.Indicator>
    </RadixProgress.Root>
  )
}

Progress.defaultProps = defaultProps

export default Progress
