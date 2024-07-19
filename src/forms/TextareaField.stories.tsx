import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import TextareaField from './TextareaField'

export const Default = () => {
  const [value, setValue] = React.useState('')

  return (
    <div>
      <div>The default TextareaField</div>
      <TextareaField
        label="Label"
        tooltip="Tooltip for this input"
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        className={{ root: 'w-[30rem]' }}
      />
    </div>
  )
}

export const MaxLength = () => {
  const [value, setValue] = React.useState('')

  return (
    <div>
      <div>
        This TextareaField has an additional maximum length prop and shows a
        corresponding message at the bottom.
      </div>
      <TextareaField
        label="Label"
        tooltip="Tooltip for this input"
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        maxLength={30}
        className={{ root: 'mb-8' }}
      />
      <TextareaField
        label="Label"
        tooltip="Tooltip for this input"
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        maxLength={30}
        maxLengthUnit="characters"
        className={{ root: 'mb-8' }}
      />
      <TextareaField
        label="Label"
        tooltip="Tooltip for this input"
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        maxLength={30}
        hideMaxLength
        className={{ root: 'mb-8' }}
      />
      <TextareaField
        label="Label"
        labelType="small"
        tooltip="Tooltip for this input"
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        maxLength={30}
        maxLengthUnit="characters"
        className={{ root: 'mb-8' }}
      />
    </div>
  )
}

export const SmallLabel = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div>The TextareaField with a small label</div>
      <TextareaField
        label="Label"
        labelType="small"
        tooltip="Tooltip for this input"
        className={{ field: 'mb-1' }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
      />
      <TextareaField
        label="Search"
        labelType="small"
        tooltip="Tooltip for this input"
        className={{ field: 'mb-1' }}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
        icon={faMagnifyingGlass}
      />
      <TextareaField
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
      <div>The TextareaField can be disabled</div>
      <TextareaField
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
      <TextareaField
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
        The default TextareaField can be customized and icons from FontAwesome
        can be included at the beginning of the field
      </div>
      <TextareaField
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
