import { useMemo, useState } from 'react'
import Countdown from './Countdown'

export const Default = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 40)

  return <Countdown expiresAt={time} />
}

export const Static = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 40)

  return <Countdown expiresAt={time} isStatic />
}

export const Formatter = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 40)

  return (
    <Countdown
      expiresAt={time}
      formatter={(value) => {
        return `${value} seconds`
      }}
    />
  )
}

export const onExpire = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 10)

  return (
    <Countdown
      expiresAt={time}
      onExpire={() => {
        alert('expired')
      }}
    />
  )
}

export const UpdateFunction = () => {
  const time = useMemo(() => {
    const t = new Date()
    t.setSeconds(t.getSeconds() + 40)
    return t
  }, [])

  const [number, setNumber] = useState(0)

  return (
    <div>
      <Countdown
        expiresAt={time}
        onUpdate={(value) => {
          setNumber(value)
        }}
      />
      Number through onUpdate: {number}
    </div>
  )
}

export const Styled = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 40)

  return (
    <Countdown
      expiresAt={time}
      className={{
        root: 'w-max bg-red-300 text-blue-500',
      }}
    />
  )
}
