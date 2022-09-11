import React, { useState } from 'react'
import Slider from './Slider'

export const Default = () => {
  const [value, setValue] = useState(0)

  return (
    <>
      <Slider
        value={value}
        labels={{ min: 'min', mid: 'mid', max: 'max' }}
        handleChange={(newValue: number) => setValue(newValue)}
        min={-5}
        max={5}
        step={1}
      />
      <div>Slider value: {value}</div>
    </>
  )
}

export const Disabled = () => {
  const [value, setValue] = useState(0)

  return (
    <>
      <Slider
        value={value}
        labels={{ min: 'min', mid: 'mid', max: 'max' }}
        handleChange={(newValue: number) => setValue(newValue)}
        min={-5}
        max={5}
        step={1}
        disabled={true}
      />
      <div>Slider value: {value}</div>
    </>
  )
}

export const Icons = () => {
  const [value, setValue] = useState(0)

  return (
    <>
      <Slider
        value={value}
        labels={{ min: 'min', mid: 'mid', max: 'max' }}
        icons={{ min: '😴', mid: '😀', max: '🤯' }}
        handleChange={(newValue: number) => setValue(newValue)}
        min={-5}
        max={5}
        step={1}
      />
      <div>Slider value: {value}</div>
    </>
  )
}

export const Styled = () => {
  const [value, setValue] = useState(0)
  const RANGE_COLOR_MAP: Record<string, string> = {
    '-2': 'bg-red-200',
    '-1': 'bg-yellow-200',
    '0': 'bg-green-200',
    '1': 'bg-yellow-200',
    '2': 'bg-red-200',
  }
  const BORDER_COLOR_MAP: Record<string, string> = {
    '-2': 'border-red-300',
    '-1': 'border-yellow-300',
    '0': 'border-green-300',
    '1': 'border-yellow-300',
    '2': 'border-red-300',
  }

  return (
    <>
      <Slider
        value={value}
        labels={{ min: 'min', mid: 'mid', max: 'max' }}
        icons={{ min: '😴', mid: '😀', max: '🤯' }}
        handleChange={(newValue: number) => setValue(newValue)}
        min={-2}
        max={2}
        step={1}
        rangeColorMap={RANGE_COLOR_MAP}
        borderColorMap={BORDER_COLOR_MAP}
      />
      <div>Slider value: {value}</div>
    </>
  )
}
