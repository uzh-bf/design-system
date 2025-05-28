'use client'
import { useState } from 'react'
import { DateTimePicker } from './DatetimePicker'

const DefaultDate = new Date()
DefaultDate.setHours(13, 14, 0, 0)

export const Default = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="mb-8">
      <div>Default Component</div>
      <DateTimePicker
        value={date}
        defaultPopupValue={date ?? DefaultDate}
        onChange={setDate}
      />
    </div>
  )
}

export const Disabled = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="mb-8">
      <div>Disabled Component</div>
      <DateTimePicker
        disabled
        value={date}
        defaultPopupValue={date ?? DefaultDate}
        onChange={setDate}
      />
    </div>
  )
}

export const MinutePrecision = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="mb-8">
      <div>Minute Precision Component</div>
      <DateTimePicker
        value={date}
        defaultPopupValue={date}
        onChange={setDate}
        granularity="minute"
      />
    </div>
  )
}

export const HourPrecision = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="mb-8">
      <div>Hour Precision Component</div>
      <DateTimePicker
        value={date}
        defaultPopupValue={date}
        onChange={setDate}
        granularity="hour"
      />
    </div>
  )
}

export function Labelled() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-01-01'))
  return (
    <DateTimePicker
      required
      value={date}
      defaultPopupValue={date}
      onChange={setDate}
      className={{ trigger: 'w-[280px]' }}
      label="Testlabel"
      labelType="large"
      granularity="minute"
    />
  )
}

export function SmallLabel() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-01-01'))
  return (
    <DateTimePicker
      required
      value={date}
      defaultPopupValue={date}
      onChange={setDate}
      className={{ trigger: 'w-[280px]' }}
      label="Testlabel"
      labelType="small"
      granularity="minute"
    />
  )
}

export function Error() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-01-01'))
  const [date2, setDate2] = useState<Date | undefined>(new Date('2025-01-01'))

  return (
    <div className="flex flex-col gap-4">
      <DateTimePicker
        required
        isTouched
        value={date}
        defaultPopupValue={date}
        onChange={setDate}
        label="Testlabel"
        labelType="small"
        tooltip="Tooltip for date changer with label"
        error="This is an error"
      />
      <DateTimePicker
        required
        isTouched
        value={date}
        defaultPopupValue={date2}
        onChange={setDate2}
        label="Testlabel"
        labelType="large"
        tooltip="Tooltip for date changer with label"
        error="This is an error"
      />
    </div>
  )
}
