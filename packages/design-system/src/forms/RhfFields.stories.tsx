import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../Button'
import { Form } from '../Form'
import { RhfMultiSelect } from './RhfMultiSelect'
import { RhfNumberField } from './RhfNumberField'
import { RhfSelectField } from './RhfSelectField'
import { RhfTextField } from './RhfTextField'

type Values = {
  name: string
  amount: number | ''
  location: string
  elements: string[]
}

const locations = [
  { value: 'zurich', label: 'Zurich' },
  { value: 'basel', label: 'Basel' },
]

const elements = [
  { value: 'story', label: 'Story' },
  { value: 'learning', label: 'Learning' },
  { value: 'event', label: 'Event' },
]

function Fields({
  control,
  rules,
}: {
  control?: ReturnType<typeof useForm<Values>>['control']
  rules?: boolean
}) {
  const textRef = useRef<HTMLInputElement>(null)
  const numberRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLButtonElement>(null)
  const multiSelectRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="flex w-96 flex-col gap-4">
      <RhfTextField
        control={control}
        name="name"
        ref={textRef}
        label="Name"
        description="The public name for this example."
        data={{ test: 'rhf-text' }}
        required={rules}
        rules={rules ? { required: 'A name is required.' } : undefined}
      />
      <RhfNumberField
        control={control}
        name="amount"
        ref={numberRef}
        label="Amount"
        description="Numbers remain numeric in RHF while the input keeps its editing buffer."
        data={{ test: 'rhf-number' }}
        min={0}
        max={100}
        precision={2}
        step={0.5}
        stepper
        rules={rules ? { required: 'An amount is required.' } : undefined}
        required={rules}
      />
      <RhfSelectField
        control={control}
        name="location"
        ref={selectRef}
        label="Location"
        items={locations}
        placeholder="Choose a location"
        data={{ test: 'rhf-select' }}
        required={rules}
        rules={rules ? { required: 'A location is required.' } : undefined}
      />
      <RhfMultiSelect
        control={control}
        name="elements"
        ref={multiSelectRef}
        label="Elements"
        items={elements}
        placeholder="Choose elements"
        data={{ test: 'rhf-multi-select' }}
        required={rules}
        rules={
          rules
            ? {
                validate: (value) =>
                  value.length > 0 || 'Choose at least one element.',
              }
            : undefined
        }
      />
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          data-test="rhf-focus-text"
          onClick={() => textRef.current?.focus()}
        >
          Focus name
        </Button>
        <Button
          type="button"
          data-test="rhf-focus-number"
          onClick={() => numberRef.current?.focus()}
        >
          Focus amount
        </Button>
        <Button
          type="button"
          data-test="rhf-focus-select"
          onClick={() => selectRef.current?.focus()}
        >
          Focus location
        </Button>
        <Button
          type="button"
          data-test="rhf-focus-multi-select"
          onClick={() => multiSelectRef.current?.focus()}
        >
          Focus elements
        </Button>
      </div>
    </div>
  )
}

function Harness({
  explicitControl = false,
  rules = false,
  disabled = false,
}: {
  explicitControl?: boolean
  rules?: boolean
  disabled?: boolean
}) {
  const form = useForm<Values>({
    disabled,
    mode: rules ? 'onBlur' : 'onSubmit',
    defaultValues: {
      name: '',
      amount: rules ? '' : 1,
      location: '',
      elements: [],
    },
  })
  const [submitted, setSubmitted] = useState('')

  const content = (
    <form
      onSubmit={form.handleSubmit((values) =>
        setSubmitted(JSON.stringify(values))
      )}
      className="flex flex-col gap-4"
    >
      <Fields
        control={explicitControl ? form.control : undefined}
        rules={rules}
      />
      <div className="flex gap-2">
        <Button type="submit" data-test="rhf-submit">
          Submit
        </Button>
        <Button
          type="button"
          data-test="rhf-reset"
          onClick={() =>
            form.reset({
              name: 'Reset value',
              amount: 42,
              location: 'basel',
              elements: ['event'],
            })
          }
        >
          Reset
        </Button>
        <Button
          type="button"
          data-test="rhf-reset-same"
          onClick={() => form.reset()}
        >
          Reset same
        </Button>
      </div>
      <output data-test="rhf-submitted">{submitted}</output>
    </form>
  )

  return explicitControl ? content : <Form {...form}>{content}</Form>
}

export const Default = () => <Harness />

export const Validation = () => <Harness rules />

export const ExplicitControl = () => <Harness explicitControl />

export const Disabled = () => <Harness disabled />
