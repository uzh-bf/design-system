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
        name="default"
        placeholder="Select an item"
        groups={[
          ...groups,
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
              { value: 'watermeldon_short', label: 'Watermelon' },
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
      name="disabled"
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
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach', disabled: true },
    { value: 'mango', label: 'Mango' },
  ]

  return (
    <Select
      name="disabled_elements_select"
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
    <div className="w-full h-12 border border-solid rounded-md">
      <Select
        name="styled_select"
        placeholder="Select an item"
        groups={groups}
        onChange={(newValue) => {
          console.log(newValue)
        }}
        className={{
          root: 'h-full border-none rounded-none',
          content: 'bg-green-200',
          trigger: 'bg-uzh-blue-20 border-none rounded-none',
          item: 'text-red-700',
          scrollButton: 'bg-blue-400',
          groupLabel: 'text-red-700',
          separator: 'bg-green-700',
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
      onChange={(newValue) => console.log(newValue)}
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
        selection of them. To use this shortLabel functionality, the state needs
        to be kept outside of the component.
      </div>
      <Select
        name="custom_trigger_label_select"
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
