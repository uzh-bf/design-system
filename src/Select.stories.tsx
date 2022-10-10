import React from 'react'
import Select from './Select'

export const Default = () => {
  const items = [
    'Apple',
    'Banana',
    'Ananas',
    'Orange',
    'Grapes',
    'Pear',
    'Mango',
    'Strawberry',
    'Persimon',
    'Lemon',
  ]
  return <Select items={items} onChange={() => {}}></Select>
}
