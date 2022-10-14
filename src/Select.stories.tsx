import React from 'react'
import Select from './Select'

export const Default = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach', disabled: true },
    { value: 'mango', label: 'Mango' },
  ]

  // Attention: scrolling does not work because apparently overflow is set to "hidden" on the body
  return (
    <Select
      items={items}
      onChange={(newValue) => {
        console.log(newValue)
      }}
    ></Select>
  )
}
