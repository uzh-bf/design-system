import { useState } from 'react'
import { Calendar } from './Calendar'

export const Default = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow-sm"
    />
  )
}
