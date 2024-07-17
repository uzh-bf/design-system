import React, { useState } from 'react'
import Switch from './Switch'

export const Default = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Switch
      checked={isChecked}
      label={isChecked ? 'Checked' : 'Unchecked'}
      onCheckedChange={(newValue) => setIsChecked(newValue)}
    />
  )
}

export const Required = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Switch
      required
      checked={isChecked}
      label={isChecked ? 'Checked' : 'Unchecked'}
      onCheckedChange={(newValue) => setIsChecked(newValue)}
    />
  )
}

export const Tooltip = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <>
      <Switch
        required
        checked={isChecked}
        label={isChecked ? 'Checked' : 'Unchecked'}
        tooltip="This is a tooltip"
        onCheckedChange={(newValue) => setIsChecked(newValue)}
      />
      <Switch
        required
        checked={isChecked}
        label={isChecked ? 'Checked' : 'Unchecked'}
        tooltip="This is a tooltip"
        error="Error message"
        onCheckedChange={(newValue) => setIsChecked(newValue)}
      />
    </>
  )
}

export const Error = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Switch
      required
      error={isChecked ? undefined : 'This field is required'}
      checked={isChecked}
      label={isChecked ? 'Checked' : 'Unchecked'}
      onCheckedChange={(newValue) => setIsChecked(newValue)}
    />
  )
}

export const Undefined = () => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(undefined)

  return (
    <Switch
      checked={isChecked}
      label={
        typeof isChecked === 'undefined'
          ? 'Undefined'
          : isChecked
          ? 'Checked'
          : 'Unchecked'
      }
      onCheckedChange={(newValue) => setIsChecked(newValue)}
    />
  )
}

export const Disabled = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Switch
      disabled
      checked={isChecked}
      label={isChecked ? 'Checked' : 'Unchecked'}
      onCheckedChange={(newValue) => setIsChecked(newValue)}
    />
  )
}

export const DisabledActive = () => {
  const [isChecked, setIsChecked] = useState(true)
  return (
    <Switch
      disabled
      checked={isChecked}
      label={isChecked ? 'Checked' : 'Unchecked'}
      onCheckedChange={(newValue) => setIsChecked(newValue)}
    />
  )
}

export const Sizes = () => {
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(false)

  return (
    <>
      <div className="mb-3">
        <Switch
          checked={isChecked1}
          label="Standard switch"
          onCheckedChange={(newValue) => setIsChecked1(newValue)}
        />
      </div>
      <div className="mb-3">
        <Switch
          checked={isChecked2}
          size="lg"
          label="Large switch"
          onCheckedChange={(newValue) => setIsChecked2(newValue)}
        />
      </div>
      <div>
        <Switch
          checked={isChecked3}
          size="sm"
          label="Small switch"
          onCheckedChange={(newValue) => setIsChecked3(newValue)}
        />
      </div>
    </>
  )
}
