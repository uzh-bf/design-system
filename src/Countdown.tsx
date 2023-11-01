import React from 'react'
import ReactCountdown from 'react-countdown'

interface CountdownProps {
  isStatic?: boolean
  expiresAt: Date
  formatter?: (value: any) => any
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

function Countdown({
  isStatic,
  expiresAt,
  formatter,
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
      renderer={(props) => (
        <div
          className={className?.root}
          data-cy={data?.cy}
          data-test={data?.test}
        >
          {formatter
            ? formatter(Math.round(props.total / 1000))
            : Math.round(props.total / 1000)}
        </div>
      )}
      onComplete={onExpire}
      onTick={(timeDelta) => onUpdate?.(timeDelta.total / 1000)}
    />
  )
}

export default Countdown
