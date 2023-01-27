import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import TextField from './TextField'

export const Default = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div>The default TextField works with a name input</div>
      <TextField
        label="label"
        tooltip="Tooltip for this input"
        className={{ root: 'mb-1' }}
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
        label="label"
        tooltip="Tooltip for this input"
        className={{ root: 'mb-1' }}
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
        label="label"
        tooltip="Tooltip for this input"
        className={{ root: 'mb-1' }}
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
        label="label"
        tooltip="Tooltip for this input"
        className={{
          root: 'mb-1 w-1/2',
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
