import type { Control } from 'react-hook-form'

import {
  RhfAlphaNumericPinField,
  RhfMultiSelect,
  RhfNumberField,
  RhfPinField,
  RhfSelectField,
  RhfSwitchField,
  RhfTextareaField,
  RhfTextField,
} from '../../src/react-hook-form'

type Values = {
  name: string
  amount: number | ''
  count: number
  location: string
  elements: string[]
  enabled: boolean
}

declare const control: Control<Values>

const validFields = (
  <>
    <RhfTextField control={control} name="name" />
    <RhfNumberField control={control} name="amount" />
    <RhfSelectField
      control={control}
      name="location"
      items={[{ value: 'zurich', label: 'Zurich' }]}
    />
    <RhfMultiSelect
      control={control}
      name="elements"
      items={[{ value: 'story', label: 'Story' }]}
    />
  </>
)

void validFields

// @ts-expect-error RhfTextField rejects number-valued paths in JSX.
const invalidTextField = <RhfTextField control={control} name="amount" />

// @ts-expect-error RhfNumberField rejects number-only paths because clearing writes ''.
const invalidNumberField = <RhfNumberField control={control} name="count" />

const invalidSelectField = (
  <RhfSelectField
    control={control}
    // @ts-expect-error RhfSelectField rejects number-valued paths in JSX.
    name="amount"
    items={[{ value: 'zurich', label: 'Zurich' }]}
  />
)

const invalidMultiSelect = (
  <RhfMultiSelect
    control={control}
    // @ts-expect-error RhfMultiSelect rejects non-array paths in JSX.
    name="name"
    items={[{ value: 'story', label: 'Story' }]}
  />
)

void invalidTextField
void invalidNumberField
void invalidSelectField
void invalidMultiSelect

// Native handlers on the wrappers keep the React event types of the rendered
// control, so its DOM properties stay reachable inside contextual callbacks.
const nativeEventFields = (
  <>
    <RhfTextField
      control={control}
      name="name"
      onPaste={(event) => {
        const pastedText: string = event.clipboardData.getData('text')
        const targetValue: string = event.currentTarget.value
        void pastedText
        void targetValue
      }}
      onKeyDown={(event) => {
        const pressedKey: string = event.key
        const targetValue: string = event.currentTarget.value
        void pressedKey
        void targetValue
      }}
    />
    <RhfNumberField
      control={control}
      name="amount"
      onKeyDown={(event) => {
        const pressedKey: string = event.key
        const targetValue: string = event.currentTarget.value
        void pressedKey
        void targetValue
      }}
    />
  </>
)

void nativeEventFields

const invalidMaxLength = (
  // @ts-expect-error `maxLength` is a number; a string is not assignable.
  <RhfTextField control={control} name="name" maxLength="ten" />
)

const invalidInputMode = (
  <RhfNumberField
    control={control}
    name="amount"
    // @ts-expect-error `inputMode` accepts only the fixed editing hints.
    inputMode="currency"
  />
)

void invalidMaxLength
void invalidInputMode

const newFieldTypes = (
  <>
    <RhfTextareaField control={control} name="name" maxLength={40} />
    <RhfSwitchField control={control} name="enabled" />
    <RhfPinField control={control} name="name" length={4} />
    <RhfAlphaNumericPinField
      control={control}
      name="name"
      length={4}
      uppercaseOnly
    />
  </>
)
void newFieldTypes
// @ts-expect-error Textarea requires a string-valued path.
const invalidTextarea = <RhfTextareaField control={control} name="amount" />
// @ts-expect-error Switch requires a boolean-valued path.
const invalidSwitch = <RhfSwitchField control={control} name="name" />
// @ts-expect-error PIN values retain leading zeros as strings.
const invalidPin = <RhfPinField control={control} name="count" length={4} />
const invalidTextareaField = (
  // @ts-expect-error Formik field props must not enter the RHF adapter API.
  <RhfTextareaField control={control} name="name" field={{ name: 'name' }} />
)
const invalidTextareaProp = (
  // @ts-expect-error Arbitrary props must not be accepted through an index signature.
  <RhfTextareaField control={control} name="name" unsupported />
)
void [
  invalidTextarea,
  invalidSwitch,
  invalidPin,
  invalidTextareaField,
  invalidTextareaProp,
]
