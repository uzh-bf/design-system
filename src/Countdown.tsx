import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export interface CountdownProps {
  countdownDuration: number
  size?: number
  strokeWidth?: number
  colors?: [`#${string}`, `#${string}`, ...`#${string}`[]]
  colorTimes?: [number, number, ...number[]]
  className?: string
  formatter?: (value: any) => any
  onExpire?: () => void
}

const defaultProps = {
  size: undefined,
  strokeWidth: undefined,
  colors: undefined,
  colorTimes: undefined,
  className: undefined,
  formatter: undefined,
  onExpire: () => null,
}

export function Countdown({
  countdownDuration,
  colors,
  colorTimes,
  size,
  strokeWidth,
  className,
  formatter,
  onExpire,
}: CountdownProps): React.ReactElement {
  return (
    <div className={className}>
      <CountdownCircleTimer
        isPlaying={countdownDuration > 0}
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
