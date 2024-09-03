import { Calendar } from '@/ui/calendar'
import type { Story, StoryDefault } from '@ladle/react'
import React from 'react'

export default {
  title: 'Shadcn/Calendar',
} satisfies StoryDefault

export const Default: Story = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  )
}
