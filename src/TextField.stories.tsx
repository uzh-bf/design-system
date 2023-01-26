import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import TextField from './TextField'

export const Default = () => (
  <>
    <div>The default TextField works with a name input</div>
    <TextField
      name="name"
      label="label"
      tooltip="Tooltip for this input"
      className={{ root: 'mb-1' }}
      placeholder="Placeholder"
    />
  </>
)

export const Disabled = () => (
  <>
    <div>The TextField can be disabled</div>
    <TextField
      disabled
      name="name"
      label="label"
      tooltip="Tooltip for this input"
      className={{ root: 'mb-1' }}
      placeholder="Placeholder"
    />
  </>
)

export const Required = () => (
  <>
    <div>
      By adding a required attribute, the label of the field changes it
      appearance
    </div>
    <TextField
      required
      name="name"
      label="label"
      tooltip="Tooltip for this input"
      className={{ root: 'mb-1' }}
      placeholder="Placeholder"
    />
  </>
)

export const Styled = () => (
  <>
    <div>
      The default TextField can be customized and icons from FontAwesome can be
      included at the beginning of the field
    </div>
    <TextField
      name="name"
      label="label"
      tooltip="Tooltip for this input"
      className={{
        root: 'mb-1 w-1/2',
        label: 'text-red-500',
        input: 'bg-uzh-blue-20',
        error: 'text-red-700',
      }}
      placeholder="Placeholder"
      icon={faMagnifyingGlass}
    />
  </>
)
