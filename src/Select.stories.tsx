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

  return (
    <Select
      items={items}
      onChange={(newValue) => {
        console.log(newValue)
      }}
    />
  )
}

export const Disabled = () => {
  const items = [{ value: 'appple', label: 'Apple' }]

  return <Select items={items} onChange={() => null} disabled />
}

export const DisabledElements = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana', disabled: true },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach', disabled: true },
    { value: 'mango', label: 'Mango' },
  ]

  return <Select items={items} onChange={() => null} />
}

export const Styled = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach' },
    { value: 'mango', label: 'Mango' },
  ]

  return (
    <Select
      items={items}
      onChange={() => null}
      triggerStyle="bg-uzh-blue-20"
      itemStyle="text-red-700"
      className="bg-green-200"
    />
  )
}

export const Scroll = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach' },
    { value: 'mango', label: 'Mango' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'orange', label: 'Orange' },
  ]

  return <Select items={items} onChange={() => null} />
}

export const Small = () => {
  const items = [
    { value: 'appple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'pear', label: 'Pear' },
    { value: 'watermeldon', label: 'Watermelon' },
    { value: 'peach', label: 'Peach' },
    { value: 'mango', label: 'Mango' },
  ]

  return <Select items={items} onChange={() => null} size="sm" />
}
