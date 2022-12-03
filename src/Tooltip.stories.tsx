import React from 'react'
import Button from './Button'
import Tooltip from './Tooltip'

export const Default = () => {
  return (
    <Tooltip tooltip="Content Tooltip">
      <div className="p-2 border border-solid shadow-md border-uzh-grey-100">
        Hover Me!
      </div>
    </Tooltip>
  )
}

export const Styled = () => {
  return (
    <Tooltip
      className={{ tooltip: 'bg-red-400', arrow: 'fill-red-400' }}
      tooltip={
        <div className="italic font-bold text-black">Styled Tooltip</div>
      }
      withArrow={true}
    >
      <Button
        className={{
          root: 'p-2 border border-solid shadow-md border-uzh-grey-100',
        }}
      >
        Hover Me! and I can still be a Button
      </Button>
    </Tooltip>
  )
}

export const Delay = () => {
  return (
    <Tooltip tooltip="Content Tooltip" delay={3000}>
      <div className="p-2 border border-solid shadow-md border-uzh-grey-100">
        Delayed Tooltip...
      </div>
    </Tooltip>
  )
}
