import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import type {
  NumberFieldProps,
  SelectFieldItemsProps,
  TextareaFieldOnChangeProps,
  TextFieldOnChangeProps,
} from '../../src'

function acceptsTextFieldProps(props: TextFieldOnChangeProps) {
  return props
}

acceptsTextFieldProps({
  value: '',
  onChange: () => undefined,
  icon: faMagnifyingGlass,
  iconAriaLabel: 'Run search',
  onIconClick: () => undefined,
  resetAriaLabel: 'Clear search',
  onReset: () => undefined,
})

function acceptsSelectFieldProps(props: SelectFieldItemsProps) {
  return props
}

acceptsSelectFieldProps({
  items: [{ value: 'zurich', label: 'Zurich' }],
  onChange: () => undefined,
  error: 'Required',
  hideError: true,
  ariaInvalid: false,
})

// Native handlers keep their React event types through the props interface, so
// the rendered input's properties stay reachable inside a contextual callback.
acceptsTextFieldProps({
  value: '',
  onChange: () => undefined,
  onPaste: (event) => {
    const pastedText: string = event.clipboardData.getData('text')
    const targetValue: string = event.currentTarget.value
    void pastedText
    void targetValue
  },
  onKeyDown: (event) => {
    const pressedKey: string = event.key
    const targetValue: string = event.currentTarget.value
    void pressedKey
    void targetValue
  },
})

acceptsTextFieldProps({
  value: '',
  onChange: () => undefined,
  // @ts-expect-error `maxLength` is a number; a string is not assignable.
  maxLength: 'ten',
})

acceptsSelectFieldProps({
  items: [{ value: 'zurich', label: 'Zurich' }],
  onChange: () => undefined,
  // @ts-expect-error `hideError` is a boolean; a string is not assignable.
  hideError: 'yes',
})

const nativeNumber: NumberFieldProps = {
  value: '',
  onChange: () => undefined,
  inputMode: 'decimal',
  onFocus: (event) => {
    const input: HTMLInputElement = event.currentTarget
    void input
  },
}
const nativeTextarea: TextareaFieldOnChangeProps = {
  value: '',
  onChange: () => undefined,
  rows: 4,
  onKeyDown: (event) => {
    const area: HTMLTextAreaElement = event.currentTarget
    void area
  },
}
void nativeNumber
void nativeTextarea
