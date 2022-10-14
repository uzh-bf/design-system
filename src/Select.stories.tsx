import React from 'react'
import Select from './Select'

export const Default = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach' },
    { value: 'mango', label: 'Mango' },
  ]
  return <Select items={items} onChange={() => {}}></Select>
}
