import React from 'react'
import { twMerge } from 'tailwind-merge'

interface CycleProgressProps {
  size?: 'sm' | 'md'
  percentage: number
  color?: string
  strokeWidthRem?: number
  children?: React.ReactNode
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    root?: string
    children?: string
  }
}

/**
 * This function create a circular progress bar with custom content in the middle (children)
 *
 * @param size - Size of the progress bar, can be 'sm' or 'md'
 * @param percentage - Percentage of the progress bar (0-100)
 * @param color - Color of the progress bar (static for the moment)
 * @param strokeWidthRem - Width of the progress bar. For small size, a smaller value is recommended
 * @param children - Content of the progress bar, displayed in the center
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A circular progress bar with children content in the middle
 */
function CycleProgress({
  size = 'md',
  percentage,
  color = '#00A321',
  strokeWidthRem = 0.35,
  children,
  data,
  className,
}: CycleProgressProps) {
  const sizeNumber = size === 'sm' ? 14 : 24
  const r = Math.round(0.8 * sizeNumber)
  const circ = 2 * Math.PI * r
  const strokePct = ((100 - percentage) * circ) / 100

  return (
    <div
      className={twMerge(
        'relative h-12 w-12',
        size === 'sm' && 'h-7 w-7',
        className?.root
      )}
      data-cy={data?.cy}
      data-test={data?.test}
    >
      <svg className="absolute h-full w-full">
        <circle
          r={r}
          cx={sizeNumber}
          cy={sizeNumber}
          fill="transparent"
          stroke={'#D3D3D3'}
          strokeWidth={`${strokeWidthRem}rem`}
          strokeDasharray={circ}
          strokeLinecap="round"
        />
        <circle
          r={r}
          cx={sizeNumber}
          cy={sizeNumber}
          fill="transparent"
          stroke={strokePct !== circ ? color : ''}
          strokeWidth={`${strokeWidthRem}rem`}
          strokeDasharray={circ}
          strokeDashoffset={percentage ? strokePct : 0}
          strokeLinecap="round"
          transform={`rotate(-90 ${sizeNumber} ${sizeNumber})`}
        />
      </svg>
      <div
        className={twMerge(
          'absolute flex h-full w-full items-center justify-center bg-transparent text-sm',
          size === 'sm' && 'text-xs',
          className?.children
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default CycleProgress
