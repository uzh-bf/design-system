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
