import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface CycleProgressProps {
  size?: 'sm' | 'md' | 'lg'
  overrideSize?: number
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
 * @param overrideSize - If size adjustments of the relative placement are required due to font changes, this value can be used to override the circle size
 * @param percentage - Percentage of the progress bar (0-100)
 * @param color - Color of the progress bar (static for the moment)
 * @param strokeWidthRem - Width of the progress bar. For small size, a smaller value is recommended
 * @param children - Content of the progress bar, displayed in the center
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A circular progress bar with children content in the middle
 */
export function CycleProgress({
  size = 'md',
  overrideSize,
  percentage,
  color = 'var(--color-primary-100, #0028A5)',
  strokeWidthRem,
  children,
  data,
  className,
}: CycleProgressProps) {
  const diameter = overrideSize
    ? overrideSize * 2
    : size === 'sm'
      ? 56
      : size === 'lg'
        ? 128
        : 96
  const strokeWidth =
    typeof strokeWidthRem === 'number'
      ? strokeWidthRem * 16
      : size === 'sm'
        ? 6
        : size === 'lg'
          ? 10
          : 8
  const radius = (diameter - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100)
  const strokeOffset = ((100 - clampedPercentage) * circumference) / 100

  return (
    <div
      className={twMerge('relative shrink-0 font-sans', className?.root)}
      style={{ width: diameter, height: diameter }}
      data-cy={data?.cy}
      data-test={data?.test}
    >
      <svg
        className="absolute inset-0"
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <circle
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
          fill="transparent"
          stroke="#EFEFEF"
          strokeWidth={strokeWidth}
        />
        <circle
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
          fill="transparent"
          stroke={clampedPercentage ? color : 'transparent'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
        />
      </svg>
      <div
        className={twMerge(
          'absolute inset-0 flex flex-col items-center justify-center bg-transparent text-center font-mono text-xl leading-none font-bold text-[#111111]',
          size === 'sm' && 'text-base',
          size === 'lg' && 'text-2xl',
          className?.children
        )}
      >
        {children ?? (
          <>
            <span>{Math.round(clampedPercentage)}%</span>
            <span className="mt-1 font-sans text-[11px] leading-none font-normal text-[#A3A3A3]">
              complete
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default CycleProgress
