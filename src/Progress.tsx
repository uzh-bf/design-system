import React, { useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import * as RadixProgress from '@radix-ui/react-progress'
import { ThemeContext } from './ThemeProvider'

export interface ProgressProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  value: number
  offset?: number
  max: number
  formatter: (value: any) => any
  isMaxVisible?: boolean
  className?: {
    root?: string
    indicator?: string
  }
  [x: string]: any
}

/**
 * This function returns a pre-styled Progress component based on the RadixUI progress component and the custom theme.
 *
 * @param id - The id of the progress bar.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the progress bar. The value should be between 0 and an optionally provided max value.
 * @param offset - The number that determines the offset of the progress bar. The offset is subtracted from the value.
 * @param max - The maximum value of the progress bar.
 * @param formatter - The function that formats the value of the progress bar.
 * @param isMaxVisible - The boolean that determines if the maximum value should be displayed.
 * @param className - The optional className object allows you to override the default styling.
 * @return Progress component
 */
export function Progress({
  id,
  data,
  formatter,
  value,
  offset = 0,
  max,
  className,
  isMaxVisible = true,
  ...props
}: ProgressProps) {
  const theme = useContext(ThemeContext)
  const [internalValue, setInternalValue] = useState(0)

  useEffect(() => {
    if (offset > 0) {
      setInternalValue(Math.max(value - offset, 0))
    } else {
      setInternalValue(value)
    }
  }, [value, offset])

  return (
    <RadixProgress.Root
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge('relative h-7 rounded text-sm', className?.root)}
      value={internalValue}
      max={max}
      {...props}
    >
      <div className="absolute flex h-full w-full flex-col justify-center rounded bg-gray-200 px-2 py-1 text-right">
        {isMaxVisible && formatter(max)}
      </div>

      <RadixProgress.Indicator
        style={{
          width: `${(internalValue / Math.max(max - offset, 0)) * 100}%`,
        }}
        className={twMerge(
          'absolute flex h-full min-w-[40px] flex-col justify-center rounded px-2 py-1 text-right text-white',
          theme.primaryBgMedium,
          className?.indicator
        )}
      >
        {formatter(value)}
      </RadixProgress.Indicator>
    </RadixProgress.Root>
  )
}

export default Progress
