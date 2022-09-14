import React, { useState } from 'react'
import Switch from './Switch'

export const Default = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Switch
      id="default"
      checked={isChecked}
      label="Unchecked"
      onCheckedChange={(newValue) => setIsChecked(newValue)}
    />
  )
}

export const Disabled = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Switch
      disabled
      id="default"
      checked={isChecked}
      label="Unchecked"
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
          id="default"
          checked={isChecked1}
          label="Standard switch"
          onCheckedChange={(newValue) => setIsChecked1(newValue)}
        />
      </div>
      <div className="mb-3">
        <Switch
          id="default"
          checked={isChecked2}
          size="lg"
          label="Large switch"
          onCheckedChange={(newValue) => setIsChecked2(newValue)}
        />
      </div>
      <div>
        <Switch
          id="default"
          checked={isChecked3}
          size="sm"
          label="Small switch"
          onCheckedChange={(newValue) => setIsChecked3(newValue)}
        />
      </div>
    </>
  )
}
