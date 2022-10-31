import React, { useState } from 'react'
import Countdown from './Countdown'

export const Default = () => {
  return <Countdown countdownDuration={20} />
}

export const Static = () => {
  return (
    <Countdown
      isStatic
      countdownDuration={5}
      onExpire={() => {
        return { shouldRepeat: true, delay: 1.5 }
      }}
    />
  )
}

export const Repeating = () => {
  return (
    <Countdown
      countdownDuration={5}
      onExpire={() => {
        return { shouldRepeat: true, delay: 1.5 }
      }}
    />
  )
}

export const Coloring = () => {
  return (
    <Countdown
      size={70}
      strokeWidth={10}
      countdownDuration={15}
      colors={['#4fda22', '#1c17bf', '#edff18', '#A30000']}
      colorTimes={[15, 10, 2, 0]}
      onExpire={() => {
        return { shouldRepeat: true, delay: 1.5 }
      }}
    />
  )
}

export const Formatted = () => {
  return (
    <Countdown
      size={100}
      countdownDuration={15}
      formatter={(time) =>
        time === 0 ? (
          <div>Time's up</div>
        ) : (
          <div className="text-center">
            {time}s<br />
            remaining
          </div>
        )
      }
    />
  )
}

export const Expiration = () => {
  const [expired, setExpired] = useState(false)
  return (
    <>
      <Countdown
        countdownDuration={5}
        onExpire={() => {
          setExpired(true)
        }}
      />
      Function executed: {expired ? 'yes' : 'no'}
    </>
  )
}
