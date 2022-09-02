import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

import * as RadixProgress from '@radix-ui/react-progress'
import { ThemeContext } from './ThemeProvider'

export interface ProgressProps {
  className?: string
  value: number
  max: number
  color?: string
  formatter: (value: any) => any
  [x: string]: any
}

const defaultProps = {
  color: undefined,
  formatter: (value: any) => value,
}

export function Progress({
  formatter,
  value,
  max,
  color,
  className,
  ...props
}: ProgressProps) {
  const theme = useContext(ThemeContext)

  const computedClassName = twMerge(
    'relative h-6 text-sm bg-gray-100 rounded',
    className
  )

  return (
    <RadixProgress.Root
      className={computedClassName}
      value={value}
      max={max}
      {...props}
    >
      <div className="absolute w-full px-2 py-1 text-right bg-gray-200 rounded">
        {formatter(max)}
      </div>

      <RadixProgress.Indicator
        style={{ width: `${(value / max) * 100}%` }}
        className={twMerge(
          'absolute px-2 py-1 text-right min-w-[40px] text-white rounded h-full',
          color || theme.primaryBgDark
        )}
      >
        {formatter(value)}
      </RadixProgress.Indicator>
    </RadixProgress.Root>
  )
}

Progress.defaultProps = defaultProps

export default Progress
