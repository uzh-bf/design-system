import { Formik, Form as FormikForm } from 'formik'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormikPinField from './FormikPinField'

import { Button } from '../Button'
import MultiSelect from '../MultiSelect'
import Select from '../Select'
import {
  Form,
  RhfAlphaNumericPinField,
  RhfMultiSelect,
  RhfNumberField,
  RhfPinField,
  RhfSelectField,
  RhfSwitchField,
  RhfTextareaField,
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

function ErrorTimingForm() {
  const form = useForm<{
    live: string
    manual: string
    hidden: string
    tooltip: string
  }>({
    mode: 'onChange',
    defaultValues: { live: '', manual: '', hidden: '', tooltip: '' },
  })
  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-96 flex-col gap-4"
        onSubmit={form.handleSubmit(() => undefined)}
      >
        <RhfTextField
          name="live"
          label="Live validation"
          rules={{
            minLength: {
              value: 3,
              message: 'Enter at least three characters.',
            },
          }}
          data={{ test: 'rhf-live-error' }}
        />
        <RhfTextField
          name="manual"
          label="Server validation"
          description="A server error can arrive before touch."
          data={{ test: 'rhf-manual-error' }}
        />
        <RhfTextField
          name="hidden"
          label="Hidden message"
          hideError
          data={{ test: 'rhf-hidden-error' }}
        />
        <RhfTextField
          name="tooltip"
          label="Tooltip message"
          errorDisplay="tooltip"
          data={{ test: 'rhf-tooltip-error' }}
        />
        <Button
          type="button"
          data-test="rhf-manual-errors"
          onClick={() => {
            form.setError('manual', {
              type: 'server',
              message: 'This value is unavailable.',
            })
            form.setError('hidden', {
              type: 'server',
              message: 'Suppressed error.',
            })
            form.setError('tooltip', {
              type: 'server',
              message: 'Tooltip recovery guidance.',
            })
          }}
        >
          Set server errors
        </Button>
        <Button
          type="button"
          data-test="rhf-clear-errors"
          onClick={() => form.clearErrors()}
        >
          Clear errors
        </Button>
        <output data-test="rhf-error-touched">
          {JSON.stringify(form.formState.touchedFields)}
        </output>
      </form>
    </Form>
  )
}

export const ErrorTiming = () => <ErrorTimingForm />

type BasicValues = {
  notes: string
  enabled: boolean
  pin: string
  code: string
}
function BasicInputsForm({ explicit = false }: { explicit?: boolean }) {
  const [disabled, setDisabled] = useState(false)
  const [submitted, setSubmitted] = useState('')
  const [native, setNative] = useState('')
  const form = useForm<BasicValues>({
    mode: 'onBlur',
    disabled,
    defaultValues: { notes: '', enabled: false, pin: '', code: '' },
  })
  const notesRef = useRef<HTMLTextAreaElement>(null)
  const switchRef = useRef<HTMLButtonElement>(null)
  const pinRef = useRef<HTMLInputElement>(null)
  const codeRef = useRef<HTMLInputElement>(null)
  const control = explicit ? form.control : undefined
  const content = (
    <form
      noValidate
      className="flex w-full max-w-96 flex-col gap-4"
      onSubmit={form.handleSubmit((values) =>
        setSubmitted(JSON.stringify(values))
      )}
    >
      <RhfTextareaField
        control={control}
        name="notes"
        label="Notes"
        description="Longer text for the activity."
        maxLength={40}
        className={{ root: 'p-4' }}
        ref={notesRef}
        rules={{ required: 'Enter notes.' }}
        data={{ test: 'rhf-notes' }}
      />
      <RhfSwitchField
        control={control}
        name="enabled"
        label="Enabled"
        fluid
        className={{ root: 'p-4' }}
        ref={switchRef}
        rules={{ validate: (value) => value || 'Enable this option.' }}
        data={{ test: 'rhf-enabled' }}
      />
      <RhfPinField
        control={control}
        name="pin"
        label="Numeric PIN"
        className={{ field: 'p-4' }}
        length={4}
        ref={pinRef}
        rules={{ minLength: { value: 4, message: 'Enter four digits.' } }}
        data={{ test: 'rhf-pin' }}
      />
      <RhfAlphaNumericPinField
        control={control}
        name="code"
        label="Access code"
        className={{ field: 'p-4' }}
        length={4}
        uppercaseOnly
        ref={codeRef}
        data={{ test: 'rhf-code' }}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" data-test="rhf-basic-submit">
          Submit
        </Button>
        <Button
          type="button"
          data-test="rhf-basic-native"
          onClick={(event) => {
            if (!event?.currentTarget.form) return
            setNative(
              JSON.stringify(
                Object.fromEntries(new FormData(event.currentTarget.form))
              )
            )
          }}
        >
          Read native values
        </Button>
        <Button
          type="button"
          data-test="rhf-basic-reset"
          onClick={() =>
            form.reset({
              notes: 'Reset',
              enabled: true,
              pin: '0021',
              code: 'AB12',
            })
          }
        >
          Reset values
        </Button>
        <Button
          type="button"
          data-test="rhf-basic-reset-field"
          onClick={() => form.resetField('pin')}
        >
          Reset PIN
        </Button>
        <Button
          type="button"
          data-test="rhf-basic-set-value"
          onClick={() => form.setValue('pin', '0007')}
        >
          Set PIN
        </Button>
        <Button
          type="button"
          data-test="rhf-basic-disable"
          onClick={() => setDisabled((value) => !value)}
        >
          Toggle disabled
        </Button>
        {[
          ['notes', notesRef],
          ['switch', switchRef],
          ['pin', pinRef],
          ['code', codeRef],
        ].map(([name, ref]) => (
          <Button
            key={String(name)}
            type="button"
            data-test={`rhf-basic-focus-${name}`}
            onClick={() =>
              (
                ref as React.RefObject<
                  HTMLTextAreaElement | HTMLButtonElement | HTMLInputElement
                >
              ).current?.focus()
            }
          >
            Focus {String(name)}
          </Button>
        ))}
      </div>
      <output data-test="rhf-basic-submitted">{submitted}</output>
      <output data-test="rhf-basic-native-values">{native}</output>
      <output data-test="rhf-basic-values">
        {JSON.stringify(form.watch())}
      </output>
      <output data-test="rhf-basic-touched">
        {JSON.stringify(form.formState.touchedFields)}
      </output>
      <output data-test="rhf-basic-dirty">
        {JSON.stringify(form.formState.dirtyFields)}
      </output>
    </form>
  )
  return explicit ? content : <Form {...form}>{content}</Form>
}

export const BasicInputs = () => <BasicInputsForm />
export const ExplicitBasicInputs = () => <BasicInputsForm explicit />

export const FormikPinCompatibility = () => (
  <Formik
    initialValues={{ pin: '' }}
    validate={(values) =>
      values.pin.length === 4 ? {} : { pin: 'Enter four digits.' }
    }
    onSubmit={() => undefined}
  >
    {(form) => (
      <FormikForm className="flex w-full max-w-96 flex-col gap-4">
        <FormikPinField
          name="pin"
          label="Legacy PIN"
          length={4}
          required
          data={{ test: 'legacy-pin' }}
        />
        <output data-test="legacy-pin-state">
          {JSON.stringify({
            value: form.values.pin,
            touched: form.touched.pin ?? false,
          })}
        </output>
        <Button
          type="button"
          data-test="legacy-pin-reset"
          onClick={() => form.resetForm()}
        >
          Reset
        </Button>
      </FormikForm>
    )}
  </Formik>
)
