import type {
  ButtonProps,
  ComboboxProps,
  NumberFieldProps,
  SelectWithItemsProps,
  TextareaFieldOnChangeProps,
  TextFieldOnChangeProps,
} from '../../src'

const buttonRef = (element: HTMLButtonElement | null) => {
  void element
}
const inputRef = (element: HTMLInputElement | null) => {
  void element
}
const textareaRef = (element: HTMLTextAreaElement | null) => {
  void element
}
const wrongRef = (element: HTMLDivElement | null) => {
  void element
}
const wrongObjectRef = { current: null as HTMLDivElement | null }

function acceptsButtonProps(props: ButtonProps) {
  return props
}

acceptsButtonProps({ ref: buttonRef })

// @ts-expect-error A native button ref is not sound when Button renders an arbitrary child.
acceptsButtonProps({ asChild: true, ref: buttonRef })

// @ts-expect-error Button refs must target the native button element.
acceptsButtonProps({ ref: wrongRef })

function acceptsTextFieldProps(props: TextFieldOnChangeProps) {
  return props
}

acceptsTextFieldProps({
  value: '',
  onChange: () => undefined,
  ref: inputRef,
})

acceptsTextFieldProps({
  value: '',
  onChange: () => undefined,
  // @ts-expect-error TextField refs must target the underlying input element.
  ref: wrongObjectRef,
})

function acceptsNumberFieldProps(props: NumberFieldProps) {
  return props
}

acceptsNumberFieldProps({ value: '', onChange: () => undefined, ref: inputRef })

acceptsNumberFieldProps({
  value: '',
  onChange: () => undefined,
  // @ts-expect-error NumberField refs must target the underlying input element.
  ref: wrongObjectRef,
})

function acceptsTextareaFieldProps(props: TextareaFieldOnChangeProps) {
  return props
}

acceptsTextareaFieldProps({
  value: '',
  onChange: () => undefined,
  ref: textareaRef,
})

acceptsTextareaFieldProps({
  value: '',
  onChange: () => undefined,
  // @ts-expect-error TextareaField refs must target the underlying textarea element.
  ref: wrongRef,
})

function acceptsSelectProps(props: SelectWithItemsProps) {
  return props
}

acceptsSelectProps({
  items: [{ value: 'one', label: 'One' }],
  onChange: () => undefined,
  ref: buttonRef,
})

acceptsSelectProps({
  items: [{ value: 'one', label: 'One' }],
  onChange: () => undefined,
  // @ts-expect-error Select refs must target the visible trigger button.
  ref: wrongRef,
})

function acceptsComboboxProps(props: ComboboxProps) {
  return props
}

acceptsComboboxProps({
  items: [{ value: 'one', label: 'One' }],
  onChange: () => undefined,
  ref: buttonRef,
})

acceptsComboboxProps({
  items: [{ value: 'one', label: 'One' }],
  onChange: () => undefined,
  // @ts-expect-error Combobox refs must target the visible trigger button.
  ref: wrongRef,
})
