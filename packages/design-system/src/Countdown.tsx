'use client'

import ReactCountdown from 'react-countdown'
import { twMerge } from 'tailwind-merge'

export interface CountdownProps {
  isStatic?: boolean
  expiresAt: Date
  formatter?: (value: number) => string | number | React.ReactNode
  warning?: boolean
  warningThresholdSeconds?: number
  onExpire?: () => void
  onUpdate?: (timeRemaining: number) => void
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    root?: string
  }
}

/**
 * This function creates a styled countdown component with a formatter escape hatch.
 *
 * @param isStatic - If true, the countdown will not be running, but instead show the initial value. However, as the end value is given by a date, reloading can modify the displayed countdown value
 * @param expiresAt - Date when the countdown should expire
 * @param formatter - Function to format the countdown value. Its output is wrapped in the timer role, so it must represent the remaining time, and it owns the warning styling (the built-in non-colour warning cue only applies to the default rendering).
 * @param warning - Force the countdown into its warning style.
 * @param warningThresholdSeconds - Remaining seconds threshold for automatic warning style.
 * @param onExpire - Function that is executed when the countdown expires
 * @param onUpdate - Function that is executed when the countdown is updated (not when it expires)
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A simple text countdown component
 */
export function Countdown({
  isStatic,
  expiresAt,
  formatter,
  warning = false,
  warningThresholdSeconds = 10,
  onExpire,
  onUpdate,
  data,
  className,
}: CountdownProps) {
  return (
    <ReactCountdown
      autoStart={!isStatic}
      date={expiresAt}
      intervalDelay={0}
      renderer={(props) => {
        const totalSeconds = Math.max(0, Math.round(props.total / 1000))

        if (formatter) {
          return (
            <div
              role="timer"
              className={className?.root}
              data-cy={data?.cy}
              data-test={data?.test}
            >
              {formatter(totalSeconds)}
            </div>
          )
        }

        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        const isWarning = warning || totalSeconds <= warningThresholdSeconds
        // The warning state used to be conveyed by the red text alone (WCAG
        // 1.4.1). The underline is the redundant non-colour cue; it rides along
        // the existing text box, so switching it on never reflows the digits.
        const warningClassName = isWarning
          ? 'text-destructive underline decoration-2 underline-offset-2'
          : 'text-foreground'
        const cellClassName =
          'font-mono text-[32px] leading-none font-bold tabular-nums'
        const labelClassName =
          'text-muted-foreground text-[11px] leading-none font-semibold tracking-[0.08em] uppercase'

        return (
          <div
            role="timer"
            className={twMerge(
              'inline-flex items-start gap-2.5 font-sans',
              className?.root
            )}
            data-cy={data?.cy}
            data-test={data?.test}
          >
            <div className="flex flex-col items-center gap-1">
              <span className={twMerge(cellClassName, warningClassName)}>
                {String(minutes).padStart(2, '0')}
              </span>
              <span className={labelClassName}>min</span>
            </div>
            <span className={twMerge(cellClassName, 'text-muted-foreground')}>
              :
            </span>
            <div className="flex flex-col items-center gap-1">
              <span className={twMerge(cellClassName, warningClassName)}>
                {String(seconds).padStart(2, '0')}
              </span>
              <span className={labelClassName}>sec</span>
            </div>
          </div>
        )
      }}
      onComplete={onExpire}
      onTick={(timeDelta) => onUpdate?.(timeDelta.total / 1000)}
    />
  )
}

export default Countdown
