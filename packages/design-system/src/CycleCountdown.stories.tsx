import { useMemo, useState } from 'react'
import CycleCountdown from './CycleCountdown'

export const Default = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10)

  return <CycleCountdown expiresAt={time} totalDuration={10} />
}

export const Static = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10)

  return <CycleCountdown expiresAt={time} totalDuration={10} isStatic />
}

export const Small = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10)

  return (
    <CycleCountdown
      expiresAt={time}
      totalDuration={10}
      size="sm"
      strokeWidthRem={0.2}
    />
  )
}

export const Formatter = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10)

  return (
    <CycleCountdown
      expiresAt={time}
      totalDuration={10}
      formatter={(value) => {
        return `${value} s`
      }}
    />
  )
}

export const Expiration = () => {
  const [expired, setExpired] = useState(false)
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10)

  return (
    <div>
      <CycleCountdown
        expiresAt={time}
        totalDuration={10}
        onExpire={() => {
          setExpired(true)
        }}
      />
      onExpire function executed: {expired ? 'yes' : 'no'}
    </div>
  )
}

export const Updating = () => {
  const time = useMemo(() => {
    const t = new Date()
    t.setSeconds(t.getSeconds() + 10)
    return t
  }, [])

  const [number, setNumber] = useState(0)

  return (
    <div>
      This countdown uses the onUpdate function to update a state value. Note
      that we need to use a useMemo hook for the memoization of the time
      variable, otherwise the countdown will be re-rendered every second. Also,
      the time will not be updated on expiration and will therefore stay at 1 in
      the end.
      <CycleCountdown
        expiresAt={time}
        totalDuration={10}
        onUpdate={(value) => {
          setNumber(value)
        }}
      />
      Updated value: {number}
    </div>
  )
}

export const Styled = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10)

  return (
    <CycleCountdown
      expiresAt={time}
      totalDuration={10}
      color="#FF0000"
      strokeWidthRem={0.6}
      className={{ root: 'bg-blue-300', countdown: 'font-bold' }}
    />
  )
}

export const TerminalSettings = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10)

  return (
    <CycleCountdown
      expiresAt={time}
      totalDuration={10}
      terminalColor="#FF0000"
      terminalPercentage={100}
    />
  )
}
