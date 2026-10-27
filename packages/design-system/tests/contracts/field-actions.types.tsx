import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import type { SelectFieldItemsProps, TextFieldOnChangeProps } from '../../src'

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
