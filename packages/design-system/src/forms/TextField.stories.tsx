import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import TextField from './TextField'

export const Default = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div>The default TextField</div>
      <TextField
        label="Label"
        tooltip="Tooltip for this input"
        className={{
          field: 'mb-1 w-80',
        }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
      />
    </>
  )
}

export const Icon = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div>The default TextField</div>
      <TextField
        label="Label"
        tooltip="Tooltip for this input"
        className={{
          field: 'mb-1 w-80',
        }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        icon={faMagnifyingGlass}
        onIconClick={() => alert('Icon clicked')}
      />
    </>
  )
}

export const IconRight = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div>The default TextField</div>
      <TextField
        label="Label"
        tooltip="Tooltip for this input"
        className={{
          field: 'mb-1 w-80',
        }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        icon={faEyeSlash}
        iconPosition="right"
        onIconClick={() => alert('Icon clicked')}
      />
    </>
  )
}

export const SmallLabel = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div>The TextField with a small label</div>
      <TextField
        label="Label"
        labelType="small"
        tooltip="Tooltip for this input"
        className={{ field: 'mb-1' }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
      />
      <TextField
        label="Search"
        labelType="small"
        tooltip="Tooltip for this input"
        className={{ field: 'mb-1' }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        icon={faMagnifyingGlass}
      />
      <TextField
        required
        label="Label 3"
        labelType="small"
        tooltip="Tooltip for this input"
        className={{ field: 'mb-1' }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
      />
    </>
  )
}

export const Disabled = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div>The TextField can be disabled</div>
      <TextField
        disabled
        label="Label"
        tooltip="Tooltip for this input"
        className={{ field: 'mb-1' }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
      />
    </>
  )
}

export const Required = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div>
        By adding a required attribute, the label of the field changes it
        appearance
      </div>
      <TextField
        required
        label="Label"
        tooltip="Tooltip for this input"
        className={{ field: 'mb-1' }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
      />
    </>
  )
}

export const Styled = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div>
        The default TextField can be customized and icons from FontAwesome can
        be included at the beginning of the field
      </div>
      <TextField
        label="Label"
        tooltip="Tooltip for this input"
        className={{
          field: 'mb-1 w-1/2',
          label: 'text-red-500',
          input: 'bg-blue-100',
          error: 'text-red-700',
        }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        icon={faMagnifyingGlass}
      />
    </>
  )
}
