import React, { useState } from 'react'
import Workflow from './Workflow'

const itemsDescriptions = [
  {
    title: 'Step 1',
    description: 'This is the first step',
  },
  {
    title: 'Step 2',
    description: 'This is the second step',
  },
  {
    title: 'Step 3',
    description: 'This is the third step',
  },
  {
    title: 'Step 4',
  },
]

const items = [
  {
    title: 'Step 1',
  },
  {
    title: 'Step 2',
  },
  {
    title: 'Step 3',
  },
]

const tooltipItems = [
  {
    title: 'Step 1',
    tooltip: 'This is the first step',
    tooltipDisabled: 'This step is disabled',
  },
  {
    title: 'Step 2',
    tooltip: 'This is the second step',
  },
  {
    title: 'Step 3',
    tooltipDisabled: 'This step is disabled',
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
        onClick={(item, ix) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(ix)
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
        onClick={(item, ix) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(ix)
        }}
        activeIx={activeIx}
      />
    </div>
  )
}

export function Minimal() {
  const [activeIx, setActiveIx] = useState(0)
  return (
    <div className="w-full">
      <div>
        With the minimal prop set, the workflow component only takes up as much
        space as needed to display the items.
      </div>
      <Workflow
        items={items}
        onClick={(item, ix) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(ix)
        }}
        activeIx={activeIx}
        minimal
      />
    </div>
  )
}

export function Disabled() {
  const [activeIx, setActiveIx] = useState(0)
  return (
    <div className="w-full">
      <div>
        As many processes require the user to carry out some actions
        sequentially, the workflow component allows you to disable steps from a
        certain index onwards. This opens up the possibility to use validity
        checks to determine whether a step can be carried out or not. In this
        example, only the step following the current one is enabled.
      </div>
      <Workflow
        items={items}
        onClick={(item, ix) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(ix)
        }}
        activeIx={activeIx}
        disabledFrom={activeIx + 2}
      />
    </div>
  )
}

export function Tooltip() {
  const [activeIx, setActiveIx] = useState(0)
  return (
    <div className="w-full">
      <div>
        With the two props tooltip and tooltipDisabled, you can pass custom
        tooltips to the workflow component. The tooltipDisabled prop is used
        when the step is disabled. It is also possible to only define one of the
        two props.
      </div>
      <Workflow
        items={tooltipItems}
        onClick={(item, ix) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(ix)
        }}
        activeIx={activeIx}
        disabledFrom={activeIx + 2}
      />
    </div>
  )
}

export function TooltipSymbol() {
  const [activeIx, setActiveIx] = useState(0)
  const [activeIx2, setActiveIx2] = useState(1)

  return (
    <div className="w-full">
      <div>
        Optionally, in addition to the tooltips on hover, it is also possible to
        mark elements on the workflow bar with a tooltip symbol. This is done by
        passing the showTooltipSymbols prop to the Label component.
      </div>
      <Workflow
        items={tooltipItems}
        onClick={(item, ix) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(ix)
        }}
        activeIx={activeIx}
        disabledFrom={activeIx + 2}
        showTooltipSymbols
      />
      <div className="mt-2">Similar example with minimal height:</div>
      <Workflow
        items={tooltipItems}
        onClick={(item, ix) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx2(ix)
        }}
        activeIx={activeIx2}
        disabledFrom={activeIx2 + 2}
        minimal
        showTooltipSymbols
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
        onClick={(item, ix) => {
          alert(`Item with title ${item.title} was clicked!`)
          setActiveIx(ix)
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

export function Progress() {
  const [itemsProgress, setItemsProgress] = useState([
    {
      title: 'Step 1',
      progress: 1,
    },
    {
      title: 'Step 2',
      progress: 1,
      completed: true,
    },
    {
      title: 'Step 3',
      progress: 0.4,
    },
    {
      title: 'Step 4',
      progress: 0,
    },
  ])

  return (
    <div className="w-full">
      <div>
        An enhanced version of the workflow component also allows to display the
        progress of a certain step on the corresponding button. If it is
        completed, the button is marked with a checkmark and corresponding
        coloring. Click on one of the element to increase the progress by 10%.
        State and logic are kept outside of the component as they depend heavily
        on the custom application.
      </div>
      <Workflow
        items={itemsProgress}
        onClick={(item, ix) => {
          if (item.progress !== 1) {
            setItemsProgress((prev) => {
              const newItems = [...prev]
              newItems[ix].progress += 0.1
              if (newItems[ix].progress >= 0.999) {
                newItems[ix].progress = 1
                newItems[ix].completed = true
              }
              return newItems
            })
          }
        }}
      />
    </div>
  )
}
