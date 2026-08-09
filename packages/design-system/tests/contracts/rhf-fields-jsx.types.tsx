import type { Control } from 'react-hook-form'

import {
  RhfMultiSelect,
  RhfNumberField,
  RhfSelectField,
  RhfTextField,
} from '../../src'

type Values = {
  name: string
  amount: number | ''
  count: number
  location: string
  elements: string[]
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
