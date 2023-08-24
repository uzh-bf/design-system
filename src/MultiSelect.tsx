import React from 'react'
import Creatable from 'react-select/creatable'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

export interface MultiSelectClassName {}

interface MultiSelectProps {}

export function MultiSelect({}: MultiSelectProps) {
  return (
    <Creatable
      isMulti
      options={options}
      classNames={{}}
      onCreateOption={(value) => console.log(value)}
    />
  )
}

export default MultiSelect
