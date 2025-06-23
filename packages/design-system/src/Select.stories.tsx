import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Select from './Select'
import { fruitsValues, groupValues } from './values'

export const Default = () => {
  return (
    <Select
      placeholder="Select an item"
      items={fruitsValues}
      onChange={(newValue) => {
        console.log(newValue)
      }}
    />
  )
}

export const Popper = () => {
  return (
    <Select
      contentPosition="popper"
      placeholder="Select an item"
      items={fruitsValues}
      onChange={(newValue) => {
        console.log(newValue)
      }}
    />
  )
}

export const Basic = () => {
  return (
    <Select
      placeholder="Select an item"
      items={fruitsValues}
      onChange={(newValue) => {
        console.log(newValue)
      }}
      basic
    />
  )
}

export const DefaultValue = () => {
  return (
    <Select
      placeholder="Select an item"
      items={fruitsValues}
      onChange={(newValue) => {
        console.log(newValue)
      }}
      defaultValue={fruitsValues[2].value}
    />
  )
}

export const Groups = () => {
  const [value, setValue] = useState<string>()

  return (
    <div>
      <div>
        To use the shortLabel functionality on this example, the state needs to
        be kept outside of the component. If this is not done, the Select
        component still works without issues, but the shortLabel attribute is
        ignored
      </div>
      <Select
        placeholder="Select an item"
        groups={[
          ...groupValues,
          {
            label: 'Short labels',
            items: [
              {
                value: 'apple_short',
                label: 'Apple long label',
                shortLabel: 'Apple',
              },
              {
                value: 'banana_short',
                label: 'Banana',
                disabled: true,
                shortLabel: 'Banana',
              },
              {
                value: 'pear_short',
                label: 'Pear long label',
                shortLabel: 'Pear',
              },
              { value: 'watermelon_short', label: 'Watermelon' },
            ],
          },
        ]}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          console.log(newValue)
        }}
      />
    </div>
  )
}

export const Disabled = () => {
  const items = [{ value: 'apple', label: 'Apple' }]

  return (
    <Select
      placeholder="Select an item"
      items={items}
      onChange={(newValue) => {
        console.log(newValue)
      }}
      disabled
    />
  )
}

export const DisabledElements = () => {
  const items = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana', disabled: true },
    { value: 'pear', label: 'Pear' },
    { value: 'watermelon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach', disabled: true },
    { value: 'mango', label: 'Mango' },
  ]

  return (
    <Select
      placeholder="Select an item"
      items={items}
      onChange={(newValue) => {
        console.log(newValue)
      }}
    />
  )
}

export const Styled = () => {
  return (
    <div className="h-12 w-full rounded-md border border-solid">
      <Select
        placeholder="Select an item"
        groups={groupValues}
        onChange={(newValue) => {
          console.log(newValue)
        }}
        className={{
          root: 'h-full rounded-none border-none',
          content: 'bg-green-200',
          trigger: 'bg-uzh-blue-20 rounded-none border-none text-lg',
          item: 'text-red-700',
          groupLabel: 'text-red-700',
          separator: 'bg-green-700',
        }}
      />
    </div>
  )
}

export const CustomTriggerLabel = () => {
  const items = [
    { value: 'apple', label: 'Apple long label', shortLabel: 'Apple' },
    { value: 'banana', label: 'Banana long label', shortLabel: 'Banana' },
    { value: 'pear', label: 'Pear long label' },
    { value: 'watermelon', label: 'Watermelon long label' },
    { value: 'peach', label: 'Peach long label' },
    { value: 'mango', label: 'Mango long label', shortLabel: 'Mango' },
  ]

  const [value, setValue] = useState<string>()

  return (
    <div>
      <div>
        Adding a shortLabel to the items of the component, the shortened version
        will be displayed on the trigger if the select component is collapsed.
        These additional attributes can be added to all items or only a
        selection of them. To use this shortLabel functionality, the state needs
        to be kept outside of the component.
      </div>
      <Select
        placeholder="Select an item"
        items={items}
        onChange={(newValue) => {
          setValue(newValue)
          console.log(newValue)
        }}
        value={value}
      />
    </div>
  )
}

export const WithTooltips = () => {
  const itemsWithTooltips = [
    {
      value: 'apple',
      label: 'Apple',
      tooltip: 'A delicious red fruit',
    },
    {
      value: 'banana',
      label: 'Banana',
      icon: <FontAwesomeIcon icon={faInfoCircle} />,
      className: { icon: 'text-uzh-blue-100' },
      tooltip: 'Rich in potassium and great for athletes',
    },
    {
      value: 'orange',
      label: 'Orange',
      icon: <FontAwesomeIcon icon={faInfoCircle} />,
      className: { icon: 'text-uzh-red-100' },
      tooltip: 'Full of Vitamin C',
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div>
        This example shows tooltips on select items, both with and without
        icons. Hover over the items to see the tooltips.
      </div>
      <Select
        placeholder="Select a fruit"
        items={itemsWithTooltips}
        onChange={(newValue) => {
          console.log(newValue)
        }}
      />
    </div>
  )
}
