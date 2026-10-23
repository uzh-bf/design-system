'use client'

import {
  Form,
  RhfAlphaNumericPinField,
  RhfColorPicker,
  RhfDatePicker,
  RhfDatetimePicker,
  RhfMultiSelect,
  RhfNumberField,
  RhfPinField,
  RhfSelectField,
  RhfSwitchField,
  RhfTextField,
  RhfTextareaField,
} from '@uzh-bf/design-system/react-hook-form'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  amount: number | ''
  notes: string
  enabled: boolean
  pin: string
  code: string
  color: string
  day: Date | undefined
  timestamp: Date | undefined
  location: string
  elements: string[]
}

export function RhfLeaf() {
  const [allValues, setAllValues] = useState('')
  const [submittedName, setSubmittedName] = useState('')
  const [submittedAmount, setSubmittedAmount] = useState('')
  const [amountDisabled, setAmountDisabled] = useState(false)
  const amountRef = useRef<HTMLInputElement>(null)
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      amount: '',
      notes: '',
      enabled: false,
      pin: '',
      code: '',
      color: '#0028a5',
      day: undefined,
      timestamp: undefined,
      location: '',
      elements: [],
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          const { name, amount } = values
          setAllValues(JSON.stringify(values))
          setSubmittedName(name)
          setSubmittedAmount(String(amount))
        })}
      >
        <RhfTextField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter a name"
          rules={{ required: 'Name is required' }}
        />
        <RhfNumberField
          control={form.control}
          name="amount"
          label="Amount"
          placeholder="Enter an amount"
          disabled={amountDisabled}
          ref={amountRef}
        />
        <RhfTextareaField control={form.control} name="notes" label="Notes" />
        <RhfSwitchField control={form.control} name="enabled" label="Enabled" />
        <RhfPinField
          control={form.control}
          name="pin"
          label="Numeric PIN"
          length={4}
        />
        <RhfAlphaNumericPinField
          control={form.control}
          name="code"
          label="Access code"
          length={4}
          uppercaseOnly
        />
        <RhfColorPicker
          control={form.control}
          name="color"
          label="Color"
          submitText="Apply color"
          colorLabel="Hex color"
          triggerAriaLabel="Choose color"
          dataHexInput={{ test: 'packed-color-hex' }}
        />
        <RhfDatePicker control={form.control} name="day" label="Day" />
        <RhfDatetimePicker
          control={form.control}
          name="timestamp"
          label="Time"
        />
        <RhfSelectField
          control={form.control}
          name="location"
          label="Location"
          items={[{ value: 'zurich', label: 'Zurich' }]}
        />
        <RhfMultiSelect
          control={form.control}
          name="elements"
          label="Elements"
          items={[{ value: 'event', label: 'Event' }]}
        />
        <button
          type="button"
          onClick={() => {
            form.setValue('day', new Date(2025, 4, 15, 9))
            form.setValue('timestamp', new Date(2025, 4, 15, 9))
          }}
        >
          Set dates
        </button>
        <output data-testid="all-values">{allValues}</output>
        <button type="submit">Submit RHF form</button>
        <output data-testid="submitted-value">{submittedName}</output>
        <output data-testid="submitted-amount">{submittedAmount}</output>
      </form>
      <div>
        <button
          type="button"
          onClick={() =>
            form.reset({
              name: '',
              amount: 3,
              notes: '',
              enabled: false,
              pin: '',
              code: '',
              color: '#0028a5',
              day: undefined,
              timestamp: undefined,
              location: '',
              elements: [],
            })
          }
        >
          Reset amount to 3
        </button>
        <button type="button" onClick={() => form.setValue('amount', 7)}>
          Set amount to 7
        </button>
        <button type="button" onClick={() => form.resetField('amount')}>
          Reset amount field
        </button>
        <button
          type="button"
          onClick={() => setAmountDisabled((disabled) => !disabled)}
        >
          Toggle amount disabled
        </button>
        <button type="button" onClick={() => amountRef.current?.focus()}>
          Focus amount
        </button>
      </div>
    </Form>
  )
}
