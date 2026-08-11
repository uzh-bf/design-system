import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../Button'
import MultiSelect from '../MultiSelect'
import Select from '../Select'
import {
  Form,
  RhfMultiSelect,
  RhfNumberField,
  RhfSelectField,
  RhfTextField,
} from '../react-hook-form'

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
  messageLess,
}: {
  control?: ReturnType<typeof useForm<Values>>['control']
  rules?: boolean
  messageLess?: boolean
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
        rules={
          rules
            ? messageLess
              ? { required: true }
              : { required: 'A name is required.' }
            : undefined
        }
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
        rules={
          rules
            ? messageLess
              ? { required: true }
              : { required: 'An amount is required.' }
            : undefined
        }
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
        rules={
          rules
            ? messageLess
              ? { required: true }
              : { required: 'A location is required.' }
            : undefined
        }
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
                  value.length > 0 ||
                  (messageLess ? false : 'Choose at least one element.'),
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
  messageLess = false,
}: {
  explicitControl?: boolean
  rules?: boolean
  disabled?: boolean
  messageLess?: boolean
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
      noValidate={messageLess}
      onSubmit={form.handleSubmit((values) =>
        setSubmitted(JSON.stringify(values))
      )}
      className="flex flex-col gap-4"
    >
      <Fields
        control={explicitControl ? form.control : undefined}
        rules={rules}
        messageLess={messageLess}
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
        <Button
          type="button"
          data-test="rhf-set-value-same"
          onClick={() => form.setValue('amount', 1)}
        >
          Set amount same
        </Button>
        <Button
          type="button"
          data-test="rhf-reset-field-same"
          onClick={() => form.resetField('amount')}
        >
          Reset amount
        </Button>
      </div>
      <output data-test="rhf-submitted">{submitted}</output>
    </form>
  )

  return explicitControl ? content : <Form {...form}>{content}</Form>
}

function NumberRangeForm() {
  const form = useForm<{ amount: number | '' }>({
    defaultValues: { amount: 0 },
  })
  const [submitted, setSubmitted] = useState('')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          setSubmitted(JSON.stringify(values))
        )}
        className="flex w-96 flex-col gap-4"
      >
        <RhfNumberField
          name="amount"
          label="Amount"
          min={-10}
          max={10}
          precision={1}
          rules={{
            min: { value: -10, message: 'Amount must be at least -10.' },
            max: { value: 10, message: 'Amount must be at most 10.' },
          }}
          data={{ test: 'rhf-range-number' }}
        />
        <div className="flex gap-2">
          <Button type="submit" data-test="rhf-range-submit">
            Submit
          </Button>
          <Button
            type="button"
            data-test="rhf-range-set-below-min"
            onClick={() => form.setValue('amount', -11)}
          >
            Set below minimum
          </Button>
        </div>
        <output data-test="rhf-range-submitted">{submitted}</output>
      </form>
    </Form>
  )
}

export const CompositeBlurContracts = () => {
  const [location, setLocation] = useState('')
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [selectBlurCount, setSelectBlurCount] = useState(0)
  const [multiSelectBlurCount, setMultiSelectBlurCount] = useState(0)

  return (
    <div className="flex w-96 flex-col gap-4">
      <div>
        <label htmlFor="blur-contract-select">Location</label>
        <Select
          id="blur-contract-select"
          items={locations}
          value={location}
          onChange={setLocation}
          onBlur={() => setSelectBlurCount((count) => count + 1)}
          placeholder="Choose a location"
          data={{ test: 'blur-contract-select' }}
        />
      </div>
      <div>
        <label htmlFor="blur-contract-multi-select">Elements</label>
        <MultiSelect
          id="blur-contract-multi-select"
          items={elements}
          value={selectedElements}
          onChange={setSelectedElements}
          onBlur={() => setMultiSelectBlurCount((count) => count + 1)}
          ariaLabel="Elements"
          placeholder="Choose elements"
          searchPlaceholder="Search elements…"
          data={{ test: 'blur-contract-multi-select' }}
        />
      </div>
      <Button type="button" data-test="blur-contract-outside">
        Outside
      </Button>
      <output aria-label="Select blur count" data-test="select-blur-count">
        {selectBlurCount}
      </output>
      <output
        aria-label="Multi-select blur count"
        data-test="multi-select-blur-count"
      >
        {multiSelectBlurCount}
      </output>
    </div>
  )
}

export const Default = () => <Harness />

export const Validation = () => <Harness rules />

export const MessageLessValidation = () => <Harness rules messageLess />

export const NumberRange = () => <NumberRangeForm />

export const ExplicitControl = () => <Harness explicitControl />

export const Disabled = () => <Harness disabled />
