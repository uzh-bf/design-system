import React, { useState } from 'react'
import StepProgress, { StepItem } from './StepProgress'

export const Default = () => {
  const [value, setValue] = useState(5)

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

const statusItems: StepItem[] = [
  { status: 'correct', id: 'id_1' },
  { status: 'incorrect', id: 'id_2' },
  {
    status: 'unanswered',
    id: 'id_3',
  },
  { status: 'partial', id: 'id_4' },
  { status: 'correct', id: 'id_5' },
  { status: 'correct', id: 'id_6' },
  {
    status: 'unanswered',
    id: 'id_7',
  },
  {
    status: 'unanswered',
    id: 'id_8',
  },
  {
    status: 'unanswered',
    id: 'id_9',
  },
]

export const Status = () => {
  const [value, setValue] = useState(6)

  return (
    <StepProgress
      value={value}
      onItemClick={(val, item) => {
        alert('Element that is being activated has id: ' + item?.id)
        setValue(val)
      }}
      items={statusItems}
    />
  )
}

export const StatusOffset = () => {
  const [value, setValue] = useState(6)

  return (
    <StepProgress
      value={value}
      onItemClick={(val, _) => {
        setValue(val)
      }}
      items={statusItems}
      displayOffset={2}
    />
  )
}
