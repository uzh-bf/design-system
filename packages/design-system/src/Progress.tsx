import * as RadixProgress from '@radix-ui/react-progress'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface BaseProgressProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  offset?: number
  max: number
  formatter: (value: string | number) => string | React.ReactNode
  isMaxVisible?: boolean
  noMinWidth?: boolean
  [x: string]: unknown
}

interface SingleValueProgressProps extends BaseProgressProps {
  value: number
  className?: {
    root?: string
    background?: string
    indicator?: string
  }
}

interface MultiValueProgressProps extends BaseProgressProps {
  value: number[]
  className?: {
    root?: string
    background?: string
    indicator?: string[]
  }
}

export type ProgressProps = SingleValueProgressProps | MultiValueProgressProps

/**
 * This function returns a pre-styled Progress component based on the RadixUI progress component and the custom theme.
 *
 * @param id - The id of the progress bar.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the progress bar. The value should be between 0 and an optionally provided max value. If multiple values are provided, the indicators are rendered on top of each other (allowing for stacked progress bars).
 * @param offset - The number that determines the offset of the progress bar. The offset is subtracted from the value.
 * @param max - The maximum value of the progress bar.
 * @param formatter - The function that formats the value of the progress bar.
 * @param isMaxVisible - The boolean that determines if the maximum value should be displayed.
 * @param noMinWidth - The boolean that determines if the progress bar should have a minimum width.
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
  noMinWidth = false,
  ...props
}: ProgressProps) {
  return (
    <RadixProgress.Root
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge('relative h-7 rounded text-sm', className?.root)}
      value={typeof value === 'number' ? value : value[0]}
      max={max}
      {...props}
    >
      <div
        className={twMerge(
          'absolute flex h-full w-full flex-col justify-center rounded bg-gray-200 px-2 py-1 text-right',
          className?.background
        )}
      >
        {isMaxVisible && formatter(max)}
      </div>

      {typeof value === 'number' ? (
        <ProgressIndicator
          value={value}
          offset={offset}
          max={max}
          formatter={formatter}
          noMinWidth={noMinWidth}
          className={className?.indicator as string | undefined}
        />
      ) : (
        value.map((v, ix) => (
          <ProgressIndicator
            value={v}
            offset={offset}
            max={max}
            formatter={formatter}
            noMinWidth={noMinWidth}
            className={className?.indicator?.[ix]}
          />
        ))
      )}
    </RadixProgress.Root>
  )
}

function ProgressIndicator({
  value,
  offset,
  max,
  formatter,
  noMinWidth,
  className,
}: {
  value: number
  offset: number
  max: number
  formatter: (value: string | number) => string | React.ReactNode
  noMinWidth: boolean
  className?: string
}) {
  const [internalValue, setInternalValue] = useState(0)

  useEffect(() => {
    if (offset > 0) {
      setInternalValue(Math.max(value - offset, 0))
    } else {
      setInternalValue(value)
    }
  }, [value, offset])

  return (
    <RadixProgress.Indicator
      style={{
        width: `${(internalValue / Math.max(max - offset, 0)) * 100}%`,
      }}
      className={twMerge(
        'absolute flex h-full flex-col justify-center rounded bg-primary-60 py-1 text-right text-white',
        !noMinWidth && 'min-w-[40px] px-2',
        className
      )}
    >
      {formatter(value)}
    </RadixProgress.Indicator>
  )
}

export default Progress
