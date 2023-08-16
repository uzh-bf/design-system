import {
  IconDefinition,
  faCheck,
  faCheckDouble,
  faInbox,
  faX,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  { type: 'question', status: 'correct', id: 'id_1', points: 3, maxPoints: 3 },
  {
    type: 'question',
    status: 'incorrect',
    id: 'id_2',
    points: 0,
    maxPoints: 2,
  },
  {
    type: 'markdown',
    status: 'unanswered',
    id: 'id_3',
  },
  { type: 'question', status: 'partial', id: 'id_4', points: 1, maxPoints: 2 },
  { type: 'question', status: 'correct', id: 'id_5', points: 2, maxPoints: 2 },
  { type: 'question', status: 'correct', id: 'id_6', points: 2, maxPoints: 2 },
  { type: 'markdown', status: 'unanswered', id: 'id_7' },
  { type: 'markdown', status: 'unanswered', id: 'id_8' },
  { type: 'question', status: 'unanswered', id: 'id_9' },
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

export const CustomFormatter = () => {
  const [value, setValue] = useState(6)

  const ICON_MAP: Record<string, IconDefinition> = {
    correct: faCheckDouble,
    incorrect: faX,
    partial: faCheck,
    unanswered: faInbox,
  }

  return (
    <StepProgress
      value={value}
      onItemClick={(val, item) => {
        alert('Element that is being activated has id: ' + item?.id)
        setValue(val)
      }}
      items={statusItems}
      formatter={({ element, ix }) => {
        function render({ className, element }) {
          return {
            className,
            element: (
              <div className="flex w-full flex-row items-center justify-between px-2">
                <div>{ix + 1}</div>
                {typeof element.points !== 'undefined' &&
                  typeof element.maxPoints !== 'undefined' && (
                    <div>
                      {element.points}/{element.maxPoints} P
                    </div>
                  )}
                <FontAwesomeIcon icon={ICON_MAP[element.status]} />
              </div>
            ),
          }
        }

        if (element.status === 'correct') {
          return render({
            element,
            className: 'bg-green-600 bg-opacity-60 text-white',
          })
        }

        if (element.status === 'incorrect') {
          return render({
            element,
            className: 'bg-red-600 bg-opacity-60 text-white',
          })
        }

        if (element.status === 'partial') {
          return render({
            element,
            className: 'bg-uzh-red-100 bg-opacity-60 text-white',
          })
        }

        return render({
          element,
          className: '',
        })
      }}
    />
  )
}
