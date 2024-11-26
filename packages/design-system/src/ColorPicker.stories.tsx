import { useState } from 'react'
import ColorPicker from './ColorPicker'

export const Default = () => {
  const [color, setColor] = useState('#0028A5')
  return (
    <ColorPicker
      color={color}
      onSubmit={(newColor) => {
        setColor(newColor)
        alert('Color set to ' + newColor)
      }}
      tooltip="This is a tooltip"
      colorLabel="Color"
      submitText="Save"
    />
  )
}

export const Label = () => {
  const [color, setColor] = useState('#0028A5')
  return (
    <ColorPicker
      color={color}
      onSubmit={(newColor) => {
        setColor(newColor)
        alert('Color set to ' + newColor)
      }}
      label="Color Picker"
      tooltip="This is a tooltip"
      colorLabel="Color"
      submitText="Save"
      required
    />
  )
}

export const Disabled = () => {
  const [color, setColor] = useState('#0028A5')
  return (
    <ColorPicker
      disabled
      color={color}
      onSubmit={(newColor) => {
        setColor(newColor)
        alert('Color set to ' + newColor)
      }}
      submitText="Speichern"
      colorLabel="Farbe"
    />
  )
}

export const Position = () => {
  const [color, setColor] = useState('#0028A5')
  return (
    <div>
      <div className="mb-60">
        In some cases, for example when the component is close to a hard bottom
        limit of the page, the absolute positioning above makes more sense. The
        position prop allows to define different default positions. Others can
        be added using the className override.
      </div>
      <div className="flex flex-col gap-4">
        <ColorPicker
          position="top"
          color={color}
          onSubmit={(newColor) => {
            setColor(newColor)
            alert('Color set to ' + newColor)
          }}
          submitText="Save"
          colorLabel="Color"
        />
        <ColorPicker
          position="top-left"
          color={color}
          onSubmit={(newColor) => {
            setColor(newColor)
            alert('Color set to ' + newColor)
          }}
          submitText="Save"
          colorLabel="Color"
        />
        <ColorPicker
          position="bottom-left"
          color={color}
          onSubmit={(newColor) => {
            setColor(newColor)
            alert('Color set to ' + newColor)
          }}
          submitText="Save"
          colorLabel="Color"
        />
      </div>
    </div>
  )
}

export const Styled = () => {
  const [color, setColor] = useState('#0028A5')
  return (
    <ColorPicker
      position="bottom"
      color={color}
      onSubmit={(newColor) => {
        setColor(newColor)
        alert('Color set to ' + newColor)
      }}
      submitText="Save"
      colorLabel="Color"
      className={{
        root: 'bg-gray-100',
        trigger: 'bg-gray-200',
        popover: 'bg-yellow-200',
        presetButtons: 'bg-yellow-200',
        inputLabel: 'bg-green-200',
        input: 'bg-green-200',
        abort: 'bg-blue-200',
        submit: 'bg-blue-200',
      }}
    />
  )
}

export const CustomText = () => {
  const [color, setColor] = useState('#0028A5')
  return (
    <ColorPicker
      position="bottom"
      color={color}
      onSubmit={(newColor) => {
        setColor(newColor)
        alert('Color set to ' + newColor)
      }}
      submitText="Custom Submit"
      colorLabel="Custom Color Label"
    />
  )
}
