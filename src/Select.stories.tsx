import React, { useState } from 'react'
import Select from './Select'

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'pear', label: 'Pear' },
  { value: 'watermeldon', label: 'Watermelon' },
  { value: 'peach', label: 'Peach' },
  { value: 'mango', label: 'Mango' },
]
const vegetables = [
  { value: 'carrot', label: 'Carrot' },
  { value: 'cucumber', label: 'Cucumber' },
  { value: 'onion', label: 'Onion' },
  { value: 'potato', label: 'Potato' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'broccoli', label: 'Broccoli' },
]
const transport = [
  { value: 'car', label: 'Car' },
  { value: 'bike', label: 'Bike' },
  { value: 'train', label: 'Train' },
  { value: 'plane', label: 'Plane' },
  { value: 'boat', label: 'Boat' },
  { value: 'bus', label: 'Bus' },
]
const programming = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
]

const groups = [
  { items: fruits },
  { items: vegetables, showSeparator: true },
  { items: transport, showSeparator: true, label: 'Transport' },
  { items: programming, showSeparator: true, label: 'Programming Languages' },
]

export const Default = () => {
  return (
    <Select
      name="default"
      placeholder="Select an item"
      items={fruits}
      onChange={(newValue) => {
        console.log(newValue)
      }}
    />
  )
}

export const Groups = () => {
  return (
    <Select
      name="default"
      placeholder="Select an item"
      groups={groups}
      onChange={(newValue) => {
        console.log(newValue)
      }}
    />
  )
}

export const Disabled = () => {
  const items = [{ value: 'apple', label: 'Apple' }]

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
    { value: 'apple', label: 'Apple' },
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
  return (
    <div className="w-full h-12 border border-solid rounded-md">
      <Select
        name="styled_select"
        placeholder="Select an item"
        items={fruits}
        onChange={() => null}
        className={{
          root: 'h-full border-none rounded-none',
          content: 'bg-green-200',
          trigger: 'bg-uzh-blue-20 border-none rounded-none',
          item: 'text-red-700',
        }}
      />
    </div>
  )
}

export const Small = () => {
  return (
    <Select
      name="small_select"
      placeholder="Select an item"
      groups={groups}
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
