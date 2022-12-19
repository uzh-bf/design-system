import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export interface CountdownProps {
  data_cy?: string
  countdownDuration: number
  size?: number
  strokeWidth?: number
  colors?: [`#${string}`, `#${string}`, ...`#${string}`[]]
  colorTimes?: [number, number, ...number[]]
  className?: {
    root?: string
  }
  formatter?: (value: any) => any
  onExpire?: () => void
  isStatic?: boolean
}

const defaultProps = {
  id: undefined,
  data_cy: undefined,
  size: undefined,
  strokeWidth: undefined,
  colors: undefined,
  colorTimes: undefined,
  className: undefined,
  formatter: undefined,
  onExpire: () => null,
  isStatic: false,
}

/**
 * This function returnes a pre-styled Countdown component based on the react-countdown-circle-timer component.
 *
 * @param data_cy - The data-cy attribute is used for testing purposes.
 * @param countdownDuration - The duration of the countdown in seconds.
 * @param size - The size of the countdown in pixels.
 * @param strokeWidth - The width of the countdown stroke in pixels.
 * @param colors - The colors that are shown in the countdown (from the start to the end). The length of this array needs to be consistent with the colorTimes array.
 * @param colorTimes - The times at which the colors change (automatic interpolation). The length of this array needs to be consistent with the colors array.
 * @param className - The optional className object allows you to override the default styling.
 * @param formatter - The function that is called to format the countdown value.
 * @param onExpire - The function that is called when the countdown expires.
 * @param isStatic - Indicate whether the countdown is static (does not run) or not.
 * @returns Countdown component
 */
export function Countdown({
  data_cy,
  countdownDuration,
  colors,
  colorTimes,
  size,
  strokeWidth,
  className,
  formatter,
  onExpire,
  isStatic,
}: CountdownProps): React.ReactElement {
  return (
    <div className={className?.root}>
      <CountdownCircleTimer
        data-cy={data_cy}
        isPlaying={!isStatic && countdownDuration > 0}
        duration={countdownDuration > 0 ? countdownDuration : 0}
        colors={colors || ['#00A321', '#00A321', '#F7B801', '#A30000']}
        colorsTime={
          colorTimes || [
            countdownDuration,
            (countdownDuration / 2) >> 0,
            (countdownDuration / 4) >> 0,
            0,
          ]
        }
        size={size || 45}
        strokeWidth={strokeWidth || 7}
        onComplete={onExpire}
      >
        {({ remainingTime }: any) => {
          return formatter
            ? formatter(remainingTime)
            : remainingTime > 0
            ? remainingTime
            : 0
        }}
      </CountdownCircleTimer>
    </div>
  )
}

Countdown.defaultProps = defaultProps

export default Countdown
