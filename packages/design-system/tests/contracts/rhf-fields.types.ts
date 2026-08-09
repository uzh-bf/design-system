import type {
  RhfMultiSelectProps,
  RhfNumberFieldProps,
  RhfSelectFieldProps,
  RhfTextFieldProps,
} from '../../src'

type Values = {
  name: string
  amount: number | ''
  count: number
  location: string
  elements: string[]
}

const textProps: RhfTextFieldProps<Values, 'name'> = { name: 'name' }
const numberProps: RhfNumberFieldProps<Values, 'amount'> = { name: 'amount' }
const selectProps: RhfSelectFieldProps<Values, 'location'> = {
  name: 'location',
  items: [{ value: 'zurich', label: 'Zurich' }],
}
const multiSelectProps: RhfMultiSelectProps<Values, 'elements'> = {
  name: 'elements',
  items: [{ value: 'story', label: 'Story' }],
}

void textProps
void numberProps
void selectProps
void multiSelectProps

// @ts-expect-error RhfTextField only accepts string-valued field paths.
type InvalidTextPath = RhfTextFieldProps<Values, 'amount'>

// @ts-expect-error RhfNumberField rejects number-only paths because clearing writes ''.
type InvalidNumberPath = RhfNumberFieldProps<Values, 'count'>

// @ts-expect-error RhfSelectField only accepts string-valued field paths.
type InvalidSelectPath = RhfSelectFieldProps<Values, 'amount'>

// @ts-expect-error RhfMultiSelect only accepts string[] field paths.
type InvalidMultiSelectPath = RhfMultiSelectProps<Values, 'name'>

type InvalidPathChecks = [
  InvalidTextPath,
  InvalidNumberPath,
  InvalidSelectPath,
  InvalidMultiSelectPath,
]

void (null as unknown as InvalidPathChecks)
