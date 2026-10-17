import { useState } from 'react'
import { useForm } from 'react-hook-form'

import NumberField from './forms/NumberField'
import SelectField from './forms/SelectField'
import TextareaField from './forms/TextareaField'
import TextField from './forms/TextField'
import {
  Form,
  RhfMultiSelect,
  RhfNumberField,
  RhfSelectField,
  RhfTextField,
} from './react-hook-form'

const choices = [
  { value: 'one', label: 'Option one' },
  { value: 'two', label: 'Option two' },
]
const helpId = 'field-ux-external-help'
const invalidMessage =
  'Synthetic validation error. Choose a value that satisfies this example field.'
const description =
  'This description explains the expected value and remains available when validation changes.'

export function Standalone() {
  const [text, setText] = useState('')
  const [number, setNumber] = useState('')
  const [area, setArea] = useState('')
  const [choice, setChoice] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [inline, setInline] = useState(false)
  const [descriptions, setDescriptions] = useState(true)
  const [hidden, setHidden] = useState(false)
  const common = {
    description: descriptions ? description : undefined,
    error: invalid ? invalidMessage : undefined,
    isTouched: invalid,
    errorDisplay: inline ? ('inline' as const) : ('tooltip' as const),
    hideError: hidden,
    'aria-describedby': `${helpId}  ${helpId}`,
  }
  return (
    <form
      className="mt-16 flex w-96 max-w-full flex-col gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <p id={helpId}>Shared external guidance for these synthetic controls.</p>
      <TextField
        {...common}
        label="Text value"
        value={text}
        onChange={setText}
        data={{ test: 'ux-text' }}
        autoComplete="off"
      />
      <NumberField
        {...common}
        label="Number value"
        value={number}
        onChange={setNumber}
        data={{ test: 'ux-number' }}
        inputMode="decimal"
      />
      <TextareaField
        {...common}
        label="Long value"
        value={area}
        onChange={setArea}
        data={{ test: 'ux-area' }}
      />
      <SelectField
        {...common}
        label="Choice"
        value={choice}
        onChange={setChoice}
        items={choices}
        data={{ test: 'ux-select' }}
      />
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setInvalid(!invalid)}>
          Toggle validation
        </button>
        <button type="button" onClick={() => setInline(!inline)}>
          Toggle inline errors
        </button>
        <button type="button" onClick={() => setDescriptions(!descriptions)}>
          Toggle descriptions
        </button>
        <button type="button" onClick={() => setHidden(!hidden)}>
          Toggle hidden errors
        </button>
      </div>
    </form>
  )
}

type Values = {
  text: string
  number: number | ''
  choice: string
  multiple: string[]
}

export function Rhf() {
  const form = useForm<Values>({
    defaultValues: { text: '', number: '', choice: '', multiple: [] },
  })
  const [hidden, setHidden] = useState(false)
  const common = {
    control: form.control,
    description: (
      <div>
        <strong>Rich guidance.</strong>
        <p>Block content remains valid markup.</p>
      </div>
    ),
    errorDisplay: 'inline' as const,
    hideError: hidden,
    'aria-describedby': `${helpId} ${helpId}`,
    rules: { required: invalidMessage },
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => undefined)}
        className="mt-16 flex w-96 max-w-full flex-col gap-4"
      >
        <p id={helpId}>
          External help remains associated with every RHF control.
        </p>
        <RhfTextField
          {...common}
          name="text"
          label="RHF text"
          data={{ test: 'ux-text' }}
        />
        <RhfNumberField
          {...common}
          name="number"
          label="RHF number"
          data={{ test: 'ux-number' }}
        />
        <RhfSelectField
          {...common}
          name="choice"
          label="RHF choice"
          items={choices}
          data={{ test: 'ux-select' }}
        />
        <RhfMultiSelect
          {...common}
          name="multiple"
          label="RHF multiple"
          items={choices}
          data={{ test: 'ux-multi' }}
        />
        <button type="submit">Validate fields</button>
        <button type="button" onClick={() => form.clearErrors()}>
          Clear validation
        </button>
        <button type="button" onClick={() => setHidden(!hidden)}>
          Toggle hidden errors
        </button>
      </form>
    </Form>
  )
}
