import { useState } from 'react'
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

export const Compact = () => {
  const [value, setValue] = useState(0)

  return (
    <div className="w-full md:w-1/3">
      <Slider
        compact
        value={value}
        labels={{ min: '-5', max: '5' }}
        handleChange={(newValue: number) => setValue(newValue)}
        min={-5}
        max={5}
        step={0.2}
        data={{ cy: 'slider-cy', test: 'slider-test' }}
        dataThumb={{ cy: 'slider-thumb-cy', test: 'slider-thumb-test' }}
      />
      <Slider
        compact
        value={value}
        labels={{
          min: '-5',
          max: '5',
          mid: '0',
        }}
        handleChange={(newValue: number) => setValue(newValue)}
        min={-5}
        max={5}
        step={0.2}
        data={{ cy: 'slider-cy', test: 'slider-test' }}
        dataThumb={{ cy: 'slider-thumb-cy', test: 'slider-thumb-test' }}
      />
      <Slider
        compact
        value={value}
        handleChange={(newValue: number) => setValue(newValue)}
        min={-5}
        max={5}
        step={0.2}
        data={{ cy: 'slider-cy', test: 'slider-test' }}
        dataThumb={{ cy: 'slider-thumb-cy', test: 'slider-thumb-test' }}
      />
      <div>Slider value: {value}</div>
    </div>
  )
}

export const CompactNoLabels = () => {
  const [value, setValue] = useState<number | undefined>(undefined)

  return (
    <div className="w-full md:w-1/3">
      <Slider
        compact
        value={value}
        defaultValue={2}
        handleChange={(newValue: number) => setValue(newValue)}
        min={-5}
        max={5}
        step={0.3}
      />
      <div>Slider value: {String(value)}</div>
    </div>
  )
}

export const CompactDisabled = () => {
  const [value, setValue] = useState<number | undefined>(0)

  return (
    <div className="w-full md:w-1/3">
      <Slider
        compact
        disabled
        value={value}
        handleChange={(newValue: number) => setValue(newValue)}
        min={-5}
        max={5}
        step={0.3}
      />
      <div>Slider value: {String(value)}</div>
    </div>
  )
}

export const Icons = () => {
  const [value, setValue] = useState(0)

  return (
    <>
      <Slider
        value={value}
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
