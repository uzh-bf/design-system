'use client'

import { Form, RhfTextField } from '@uzh-bf/design-system/react-hook-form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
}

export function RhfLeaf() {
  const [submittedValue, setSubmittedValue] = useState('')
  const form = useForm<FormValues>({
    defaultValues: { name: '' },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(({ name }) => setSubmittedValue(name))}>
        <RhfTextField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter a name"
        />
        <button type="submit">Submit RHF form</button>
        <output data-testid="submitted-value">{submittedValue}</output>
      </form>
    </Form>
  )
}
