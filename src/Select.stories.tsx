import React, { useState } from 'react'
import Select from './Select'

export const Default = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach' },
    { value: 'mango', label: 'Mango' },
  ]

  return (
    <Select
      name="default"
      placeholder="Select an item"
      items={items}
      onChange={(newValue) => {
        console.log(newValue)
      }}
    />
  )
}

export const Disabled = () => {
  const items = [{ value: 'appple', label: 'Apple' }]

  return (
    <Select
      name="disabled"
      placeholder="Select an item"
      items={items}
      onChange={() => null}
      disabled
    />
  )
}

export const DisabledElements = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana', disabled: true },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach', disabled: true },
    { value: 'mango', label: 'Mango' },
  ]

  return (
    <Select
      name="disabled_elements_select"
      placeholder="Select an item"
      items={items}
      onChange={() => null}
    />
  )
}

export const Styled = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach' },
    { value: 'mango', label: 'Mango' },
  ]

  return (
    <div className="w-full h-12 border border-solid rounded-md">
      <Select
        name="styled_select"
        placeholder="Select an item"
        items={items}
        onChange={() => null}
        className={{
          root: 'h-full border-none rounded-none',
          viewport: 'bg-green-200',
          trigger: 'bg-uzh-blue-20 border-none rounded-none',
          item: 'text-red-700',
        }}
      />
    </div>
  )
}

export const Small = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach' },
    { value: 'mango', label: 'Mango' },
  ]

  return (
    <Select
      name="small_select"
      placeholder="Select an item"
      items={items}
      onChange={() => null}
      size="sm"
    />
  )
}

export const CustomTriggerLabel = () => {
  const items = [
    { value: 'apple', label: 'Apple long label', shortLabel: 'Apple' },
    { value: 'banana', label: 'Banana long label', shortLabel: 'Banana' },
    { value: 'pear', label: 'Pear long label' },
    { value: 'watermeldon', label: 'Watermelon long label' },
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
        selection of them.
      </div>
      <Select
        name="custom_trigger_label_select"
        placeholder="Select an item"
        items={items}
        onChange={(newValue) => setValue(newValue)}
        value={value}
      />
    </div>
  )
}
