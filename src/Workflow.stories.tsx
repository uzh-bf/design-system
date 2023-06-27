import React, { useState } from 'react'
import Workflow from './Workflow'

const itemsDescriptions = [
  {
    title: 'Step 1',
    description: 'This is the first step',
    ix: 0,
  },
  {
    title: 'Step 2',
    description: 'This is the second step',
    ix: 1,
  },
  {
    title: 'Step 3',
    description: 'This is the third step',
    ix: 2,
  },
  {
    title: 'Step 4',
    ix: 3,
  },
]

const items = [
  {
    title: 'Step 1',
    ix: 0,
  },
  {
    title: 'Step 2',
    ix: 1,
  },
  {
    title: 'Step 3',
    ix: 2,
  },
]

export function Default() {
  const [activeIx, setActiveIx] = useState(0)
  return (
    <div className="w-full">
      <div>
        The workflow component always grows to 100% width of the parent
        container and splits the available space evenly between the number of
        passed items. If a description is passed, the height of the component
        adapts accordingly. Limited custom styling is available. The items can
        contain custom data, which is passed back to the onClick handler.
      </div>
      <Workflow
        items={items}
        onClick={(item) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(item.ix)
        }}
        activeIx={activeIx}
      />
    </div>
  )
}

export function Description() {
  const [activeIx, setActiveIx] = useState(0)
  return (
    <div className="w-full">
      <div>
        The workflow component always grows to 100% width of the parent
        container and splits the available space evenly between the number of
        passed items. If a description is passed, the height of the component
        adapts accordingly. Limited custom styling is available. The items can
        contain custom data, which is passed back to the onClick handler.
      </div>
      <Workflow
        items={itemsDescriptions}
        onClick={(item) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(item.ix)
        }}
        activeIx={activeIx}
      />
    </div>
  )
}

export function Styled() {
  const [activeIx, setActiveIx] = useState(0)
  return (
    <div className="w-full">
      <div>
        The workflow component always grows to 100% width of the parent
        container and splits the available space evenly between the number of
        passed items. If a description is passed, the height of the component
        adapts accordingly. Limited custom styling is available. The items can
        contain custom data, which is passed back to the onClick handler.
      </div>
      <Workflow
        items={items}
        onClick={(item) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(item.ix)
        }}
        activeIx={activeIx}
        className={{
          root: 'w-1/2',
          item: 'bg-blue-400',
          active: 'bg-green-400',
        }}
      />
    </div>
  )
}
