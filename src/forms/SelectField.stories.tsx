import React, { useState } from 'react'
import SelectField from './SelectField'

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'pear', label: 'Pear' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'peach', label: 'Peach' },
  { value: 'mango', label: 'Mango' },
]

export const Default = () => {
  const [value, setValue] = useState(items[0].value)

  return (
    <SelectField
      items={items}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const Required = () => {
  const [value, setValue] = useState(items[0].value)

  return (
    <SelectField
      required
      label="Label"
      items={items}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const Disabled = () => {
  const [value, setValue] = useState(items[0].value)

  return (
    <SelectField
      disabled
      items={items}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const Label = () => {
  const [value, setValue] = useState(items[0].value)

  return (
    <SelectField
      label="Label"
      items={items}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const LargeLabel = () => {
  const [value, setValue] = useState(items[0].value)

  return (
    <SelectField
      label="Label"
      labelType="large"
      items={items}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const Error = () => {
  const [value, setValue] = useState(items[0].value)

  return (
    <div className="flex flex-col gap-4">
      <SelectField
        required
        label="Label"
        error="Error message"
        items={items}
        value={value}
        onChange={(newValue) => {
          alert(`Value changed to: ${newValue}`)
          setValue(newValue)
        }}
      />
      <SelectField
        required
        label="Label"
        labelType="large"
        error="Error message"
        items={items}
        value={value}
        onChange={(newValue) => {
          alert(`Value changed to: ${newValue}`)
          setValue(newValue)
        }}
      />
    </div>
  )
}

export const Tooltip = () => {
  const [value, setValue] = useState(items[0].value)

  return (
    <div className="flex flex-col gap-4">
      <SelectField
        required
        label="Label"
        tooltip="Tooltip for this input"
        items={items}
        value={value}
        onChange={(newValue) => {
          alert(`Value changed to: ${newValue}`)
          setValue(newValue)
        }}
      />
      <SelectField
        required
        label="Label"
        labelType="large"
        tooltip="Tooltip for this input"
        items={items}
        value={value}
        onChange={(newValue) => {
          alert(`Value changed to: ${newValue}`)
          setValue(newValue)
        }}
      />
      <SelectField
        required
        label="Label"
        labelType="large"
        tooltip="Tooltip for this input"
        error="Error message"
        items={items}
        value={value}
        onChange={(newValue) => {
          alert(`Value changed to: ${newValue}`)
          setValue(newValue)
        }}
      />
    </div>
  )
}
