import React from 'react'
import StepProgress from './StepProgress'

export const Default = () => {
  const [value, setValue] = React.useState(5)

  return (
    <StepProgress value={value} onItemClick={(val) => setValue(val)} max={20} />
  )
}

export const WithOffset = () => {
  const [value, setValue] = React.useState(0)

  return (
    <StepProgress
      value={value}
      max={20}
      displayOffset={7}
      onItemClick={(val) => setValue(val)}
    />
  )
}
