import React from 'react'
import { twMerge } from 'tailwind-merge'

interface CycleProgressProps {
  size?: 'sm' | 'md'
  percentage: number
  color?: string
  strokeWidthRem?: number
  children?: React.ReactNode
}

function CycleProgress({
  size = 'md',
  percentage,
  color = '#00A321',
  strokeWidthRem = 0.35,
  children,
}: CycleProgressProps) {
  const sizeNumber = size === 'sm' ? 14 : 24
  const r = Math.round(0.8 * sizeNumber)
  const circ = 2 * Math.PI * r
  const strokePct = ((100 - percentage) * circ) / 100

  return (
    <div className={twMerge('relative h-12 w-12', size === 'sm' && 'h-7 w-7')}>
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
          'absolute left-1/2 top-1/2 flex h-full w-full items-center justify-center bg-transparent text-sm',
          size === 'sm' && 'text-xs'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default CycleProgress
