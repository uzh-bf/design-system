'use client'

import {
  Form,
  RhfNumberField,
  RhfTextField,
} from '@uzh-bf/design-system/react-hook-form'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  amount: number | ''
}

export function RhfLeaf() {
  const [submittedName, setSubmittedName] = useState('')
  const [submittedAmount, setSubmittedAmount] = useState('')
  const [amountDisabled, setAmountDisabled] = useState(false)
  const amountRef = useRef<HTMLInputElement>(null)
  const form = useForm<FormValues>({
    defaultValues: { name: '', amount: '' },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ name, amount }) => {
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
        <button type="submit">Submit RHF form</button>
        <output data-testid="submitted-value">{submittedName}</output>
        <output data-testid="submitted-amount">{submittedAmount}</output>
      </form>
      <div>
        <button
          type="button"
          onClick={() => form.reset({ name: '', amount: 3 })}
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
