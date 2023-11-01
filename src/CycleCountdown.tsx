import dayjs from 'dayjs'
import React, { useState } from 'react'
import Countdown from './Countdown'
import CycleProgress from './CycleProgress'

export interface CycleCountdownProps {
  expiresAt: Date
  totalDuration: number
  size?: 'sm' | 'md'
  color?: string
  strokeWidthRem?: number
  isStatic?: boolean
  formatter?: (value: any) => any
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

export function CycleCountdown({
  expiresAt,
  totalDuration,
  size = 'md',
  color = '#00A321',
  strokeWidthRem = 0.35,
  isStatic,
  formatter,
  onExpire,
  onUpdate,
  data,
  className,
}: CycleCountdownProps) {
  const [percentage, setPercentage] = useState(
    (dayjs(expiresAt).diff(dayjs(), 'second') / totalDuration) * 100
  )

  return (
    <CycleProgress
      size={size}
      percentage={percentage}
      color={color}
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
        formatter={formatter}
        onExpire={() => {
          onExpire?.()
          setPercentage(0)
        }}
        onUpdate={(remainingSeconds) => {
          onUpdate?.(remainingSeconds)
          setPercentage((remainingSeconds / totalDuration) * 100)
        }}
        className={{ root: className?.countdown }}
      />
    </CycleProgress>
  )
}

export default CycleCountdown
