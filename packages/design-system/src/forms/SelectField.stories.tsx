import { useState } from 'react'
import { fruitsValues, groupValues } from '../Select.stories'
import SelectField from './SelectField'

export const Default = () => {
  const [value, setValue] = useState(fruitsValues[0].value)

  return (
    <SelectField
      items={fruitsValues}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const Groups = () => {
  const [value, setValue] = useState(groupValues[0].items[0].value)

  return (
    <SelectField
      groups={groupValues}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const Required = () => {
  const [value, setValue] = useState(fruitsValues[0].value)

  return (
    <SelectField
      required
      label="Label"
      items={fruitsValues}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const Disabled = () => {
  const [value, setValue] = useState(fruitsValues[0].value)

  return (
    <SelectField
      disabled
      items={fruitsValues}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const Label = () => {
  const [value, setValue] = useState(fruitsValues[0].value)

  return (
    <SelectField
      label="Label"
      items={fruitsValues}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const LargeLabel = () => {
  const [value, setValue] = useState(fruitsValues[0].value)

  return (
    <SelectField
      label="Label"
      labelType="large"
      items={fruitsValues}
      value={value}
      onChange={(newValue) => {
        alert(`Value changed to: ${newValue}`)
        setValue(newValue)
      }}
    />
  )
}

export const Error = () => {
  const [value, setValue] = useState(fruitsValues[0].value)

  return (
    <div className="flex flex-col gap-4">
      <SelectField
        required
        label="Label"
        error="Error message"
        items={fruitsValues}
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
        items={fruitsValues}
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
  const [value, setValue] = useState(fruitsValues[0].value)

  return (
    <div className="flex flex-col gap-4">
      <SelectField
        required
        label="Label"
        tooltip="Tooltip for this input"
        items={fruitsValues}
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
        items={fruitsValues}
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
        items={fruitsValues}
        value={value}
        onChange={(newValue) => {
          alert(`Value changed to: ${newValue}`)
          setValue(newValue)
        }}
      />
    </div>
  )
}
