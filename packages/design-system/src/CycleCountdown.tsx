'use client'

import dayjs from 'dayjs'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Countdown from './Countdown'
import CycleProgress from './CycleProgress'

export interface CycleCountdownProps {
  expiresAt: Date
  totalDuration: number
  size?: 'sm' | 'md' | 'lg'
  overrideSize?: number
  color?: string
  strokeWidthRem?: number
  isStatic?: boolean
  terminalColor?: string
  terminalPercentage?: number
  formatter?: (value: number) => string | number | React.ReactNode
  onExpire?: () => void
  onUpdate?: (timeRemaining: number) => void
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    root?: string
    countdownWrapper?: string
    countdown?: string
  }
}

/**
 * This function combines the CycleProgress and Countdown components to create a circular progress bar with a countdown in the middle
 *
 * @param expiresAt - Date when the countdown should expire
 * @param totalDuration - Total duration of the countdown in seconds, which is needed to compute the progress in percent
 * @param size - Size of the progress bar, can be 'sm' or 'md'
 * @param overrideSize - Optional override for the size of the progress bar
 * @param color - Color of the progress bar (static for the moment)
 * @param strokeWidthRem - Width of the progress bar. For small size, a smaller value is recommended
 * @param isStatic - If true, the countdown will not be running, but instead show the initial value. However, as the end value is given by a date, reloading can modify the displayed countdown value
 * @param terminalColor - Color of the progress bar when the countdown is expired (total Duration 0 or expiration in the past)
 * @param terminalPercentage - Percentage of the progress bar when the countdown is expired (totalDuration 0 or expiration in the past)
 * @param formatter - Function to format the countdown value
 * @param onExpire - Function that is executed when the countdown expires
 * @param onUpdate - Function that is executed when the countdown is updated (not when it expires)
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A circular progress bar with a countdown in the middle
 */
export function CycleCountdown({
  expiresAt,
  totalDuration,
  size = 'md',
  overrideSize,
  color = 'var(--color-primary-100, #0028A5)',
  strokeWidthRem,
  isStatic,
  terminalColor = 'var(--color-destructive, #BD3902)',
  terminalPercentage,
  formatter,
  onExpire,
  onUpdate,
  data,
  className,
}: CycleCountdownProps) {
  const [percentage, setPercentage] = useState(
    totalDuration !== 0
      ? (dayjs(expiresAt).diff(dayjs(), 'second') / totalDuration) * 100
      : 0
  )
  const displayPercentage =
    typeof terminalPercentage === 'number' && percentage <= 0
      ? terminalPercentage
      : percentage
  const isExpired = percentage <= 0
  const isWarning =
    !isExpired && displayPercentage > 0 && displayPercentage <= 20
  const displayColor = isExpired
    ? terminalColor
    : isWarning
      ? 'var(--color-destructive, #BD3902)'
      : color
  const countdownFormatter =
    formatter ??
    ((value: number) => (
      <div
        className={twMerge(
          'flex flex-col items-center justify-center font-mono leading-none tabular-nums',
          isExpired || isWarning ? 'text-destructive' : 'text-[#111111]',
          className?.countdown
        )}
      >
        <span className="text-[22px] font-bold">{Math.max(0, value)}</span>
        <span className="mt-1 font-sans text-[11px] leading-none font-normal text-[#A3A3A3]">
          sec
        </span>
      </div>
    ))

  return (
    <CycleProgress
      size={size}
      overrideSize={overrideSize}
      percentage={displayPercentage}
      color={displayColor}
      strokeWidthRem={strokeWidthRem}
      data={data}
      className={{
        root: className?.root,
        children: className?.countdownWrapper,
      }}
    >
      <Countdown
        isStatic={isStatic}
        expiresAt={expiresAt}
        formatter={countdownFormatter}
        onExpire={() => {
          onExpire?.()
          setPercentage(0)
        }}
        onUpdate={(remainingSeconds) => {
          onUpdate?.(remainingSeconds)

          if (totalDuration !== 0) {
            setPercentage((remainingSeconds / totalDuration) * 100)
          } else {
            setPercentage(0)
          }
        }}
        className={{ root: formatter ? className?.countdown : undefined }}
      />
    </CycleProgress>
  )
}

export default CycleCountdown
