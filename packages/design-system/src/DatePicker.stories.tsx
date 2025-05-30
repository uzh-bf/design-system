import { useState } from 'react'
import DatePicker from './DatePicker'

export function Default() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-01-01'))
  return (
    <DatePicker
      date={date}
      onDateChange={(date) => setDate(date)}
      dataTrigger={{ cy: 'trigger-cy' }}
      dataCalendar={{ cy: 'calendar-cy' }}
      dataNextMonth={{ cy: 'next-month-cy' }}
      dataPreviousMonth={{ cy: 'previous-month-cy' }}
    />
  )
}

export function Disabled() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-01-01'))
  return (
    <DatePicker disabled date={date} onDateChange={(date) => setDate(date)} />
  )
}

export function Labelled() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-01-01'))
  return (
    <DatePicker
      required
      label="Testlabel"
      labelType="large"
      date={date}
      onDateChange={(date) => setDate(date)}
    />
  )
}

export function SmallLabel() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-01-01'))
  return (
    <DatePicker
      required
      label="Testlabel"
      labelType="small"
      tooltip="Tooltip for date changer with label"
      date={date}
      onDateChange={(date) => setDate(date)}
    />
  )
}

export function Error() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-01-01'))
  const [date2, setDate2] = useState<Date | undefined>(new Date('2025-01-01'))

  return (
    <div className="flex flex-col gap-4">
      <DatePicker
        required
        isTouched
        date={date}
        onDateChange={setDate}
        label="Testlabel"
        labelType="small"
        tooltip="Tooltip for date changer with label"
        error="This is an error"
      />
      <DatePicker
        required
        isTouched
        date={date2}
        onDateChange={setDate2}
        label="Testlabel"
        labelType="large"
        tooltip="Tooltip for date changer with label"
        error="This is an error"
      />
    </div>
  )
}
