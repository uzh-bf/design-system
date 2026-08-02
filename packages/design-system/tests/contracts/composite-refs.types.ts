import type {
  AlphaNumericPinFieldProps,
  CheckboxProps,
  CollapsibleProps,
  ColorPickerProps,
  DatePickerProps,
  DateRangePickerProps,
  DateTimePickerProps,
  DropdownWithItemsProps,
  MultiSelectProps,
  SelectFieldItemsProps,
  SliderWithLabelProps,
  SwitchProps,
  TableProps,
  TableRef,
} from '../../src'

const buttonRef = (element: HTMLButtonElement | null) => {
  void element
}
const inputRef = (element: HTMLInputElement | null) => {
  void element
}
const spanRef = (element: HTMLSpanElement | null) => {
  void element
}
const wrongRef = (element: HTMLDivElement | null) => {
  void element
}
const wrongObjectRef = { current: null as HTMLDivElement | null }
const wrongSvgObjectRef = { current: null as SVGSVGElement | null }

function acceptsCheckboxProps(props: CheckboxProps) {
  return props
}

acceptsCheckboxProps({
  checked: false,
  onCheck: () => undefined,
  ref: buttonRef,
})
acceptsCheckboxProps({
  checked: false,
  onCheck: () => undefined,
  // @ts-expect-error Checkbox refs must target the Radix button root.
  ref: wrongSvgObjectRef,
})

function acceptsSwitchProps(props: SwitchProps) {
  return props
}

acceptsSwitchProps({
  checked: false,
  onCheckedChange: () => undefined,
  ref: buttonRef,
})
acceptsSwitchProps({
  checked: false,
  onCheckedChange: () => undefined,
  // @ts-expect-error Switch refs must target the Radix button root.
  ref: wrongRef,
})

function acceptsSliderProps(props: SliderWithLabelProps) {
  return props
}

acceptsSliderProps({
  min: 0,
  max: 10,
  step: 1,
  handleChange: () => undefined,
  ref: spanRef,
})
acceptsSliderProps({
  min: 0,
  max: 10,
  step: 1,
  handleChange: () => undefined,
  // @ts-expect-error Slider refs must target the focusable thumb span.
  ref: wrongSvgObjectRef,
})

function acceptsCollapsibleProps(props: CollapsibleProps) {
  return props
}

acceptsCollapsibleProps({
  open: false,
  onChange: () => undefined,
  staticContent: 'Static',
  children: 'Content',
  ref: buttonRef,
})
acceptsCollapsibleProps({
  open: false,
  onChange: () => undefined,
  staticContent: 'Static',
  children: 'Content',
  // @ts-expect-error Collapsible refs must target the trigger button.
  ref: wrongObjectRef,
})

function acceptsDropdownProps(props: DropdownWithItemsProps) {
  return props
}

acceptsDropdownProps({
  trigger: 'Open',
  ref: buttonRef,
  items: [{ id: 'one', label: 'One', onClick: () => undefined }],
})
acceptsDropdownProps({
  trigger: 'Open',
  items: [{ id: 'one', label: 'One', onClick: () => undefined }],
  // @ts-expect-error Dropdown refs must target the menu trigger button.
  ref: wrongRef,
})

function acceptsMultiSelectProps(props: MultiSelectProps) {
  return props
}

acceptsMultiSelectProps({
  items: [{ value: 'one', label: 'One' }],
  value: [],
  onChange: () => undefined,
  ref: buttonRef,
})
acceptsMultiSelectProps({
  items: [{ value: 'one', label: 'One' }],
  value: [],
  onChange: () => undefined,
  // @ts-expect-error MultiSelect refs must target the visible trigger button.
  ref: wrongObjectRef,
})

function acceptsSelectFieldProps(props: SelectFieldItemsProps) {
  return props
}

acceptsSelectFieldProps({
  items: [{ value: 'one', label: 'One' }],
  onChange: () => undefined,
  ref: buttonRef,
})
acceptsSelectFieldProps({
  items: [{ value: 'one', label: 'One' }],
  onChange: () => undefined,
  // @ts-expect-error SelectField refs must target the delegated trigger button.
  ref: wrongRef,
})

function acceptsAlphaNumericPinFieldProps(props: AlphaNumericPinFieldProps) {
  return props
}

acceptsAlphaNumericPinFieldProps({
  value: '',
  onChange: async () => undefined,
  length: 6,
  ref: inputRef,
})
acceptsAlphaNumericPinFieldProps({
  value: '',
  onChange: async () => undefined,
  length: 6,
  // @ts-expect-error AlphaNumericPinField refs must target the OTP input.
  ref: wrongObjectRef,
})

function acceptsColorPickerProps(props: ColorPickerProps) {
  return props
}

acceptsColorPickerProps({
  color: '#000000',
  onSubmit: () => undefined,
  submitText: 'Save',
  colorLabel: 'Color',
  triggerAriaLabel: 'Pick a color',
  ref: buttonRef,
})
acceptsColorPickerProps({
  color: '#000000',
  onSubmit: () => undefined,
  submitText: 'Save',
  colorLabel: 'Color',
  triggerAriaLabel: 'Pick a color',
  // @ts-expect-error ColorPicker refs must target the palette trigger button.
  ref: wrongRef,
})

function acceptsDatePickerProps(props: DatePickerProps) {
  return props
}

acceptsDatePickerProps({
  date: undefined,
  onDateChange: () => undefined,
  ref: buttonRef,
})
acceptsDatePickerProps({
  date: undefined,
  onDateChange: () => undefined,
  // @ts-expect-error DatePicker refs must target the calendar trigger button.
  ref: wrongObjectRef,
})

function acceptsDateRangePickerProps(props: DateRangePickerProps) {
  return props
}

acceptsDateRangePickerProps({
  range: undefined,
  onRangeChange: () => undefined,
  ref: buttonRef,
})
acceptsDateRangePickerProps({
  range: undefined,
  onRangeChange: () => undefined,
  // @ts-expect-error DateRangePicker refs must target the calendar trigger button.
  ref: wrongRef,
})

function acceptsDateTimePickerProps(props: DateTimePickerProps) {
  return props
}

acceptsDateTimePickerProps({
  locale: undefined,
  weekStartsOn: undefined,
  showWeekNumber: false,
  showOutsideDays: false,
  ref: buttonRef,
})
acceptsDateTimePickerProps({
  locale: undefined,
  weekStartsOn: undefined,
  showWeekNumber: false,
  showOutsideDays: false,
  // @ts-expect-error DateTimePicker refs must target the calendar trigger button.
  ref: wrongObjectRef,
})

type Row = { name: string; className?: string }

function acceptsTableProps(props: TableProps<Row>) {
  return props
}

const tableRef = (value: TableRef | null) => {
  void value
}

acceptsTableProps({
  columns: [{ accessor: 'name', label: 'Name' }],
  data: [{ name: 'Ada' }],
  ref: tableRef,
})
acceptsTableProps({
  columns: [{ accessor: 'name', label: 'Name' }],
  data: [{ name: 'Ada' }],
  // @ts-expect-error Table refs expose the imperative TableRef, not the DOM table element.
  ref: wrongObjectRef,
})
acceptsTableProps({
  columns: [{ accessor: 'name', label: 'Name' }],
  data: [{ name: 'Ada' }],
  // @ts-expect-error Table's removed forwardedRef alias must not compile.
  forwardedRef: tableRef,
})
