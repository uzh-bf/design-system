import type * as React from 'react'

import type {
  Calendar,
  ColorPickerProps,
  DatePickerProps,
  DateRangePickerProps,
  DateTimePickerProps,
  TableProps,
  WorkflowProgressProps,
  WorkflowProps,
} from '../../src'

type Row = { count: number; answer: string; className?: string }

const columns = [
  { label: 'Count', accessor: 'count', sortable: true },
  { label: 'Answer', accessor: 'answer' },
]

const rows: Row[] = [{ count: 1, answer: 'First' }]

function acceptsTableProps(props: TableProps<Row>) {
  return props
}

acceptsTableProps({ columns, rows })
acceptsTableProps({ columns, rows, data: { cy: 'table', test: 'table' } })
acceptsTableProps({ columns, rows, data: { cy: 'table' } })
acceptsTableProps({ columns, rows, data: { test: 'table' } })

// `rows` is supplied so the only available error is the selector/row mix-up
// itself, not an incidental missing-prop error.
// @ts-expect-error Rows are passed through `rows`; `data` now carries selectors.
acceptsTableProps({ columns, rows, data: rows })

// @ts-expect-error `dataAttributes` was renamed to `data` in v5.
acceptsTableProps({ columns, rows, dataAttributes: { cy: 'table' } })

acceptsTableProps({
  columns,
  rows,
  // @ts-expect-error The selector contract is exactly `{ cy, test }`.
  data: { testid: 'table' },
})

acceptsTableProps({
  columns,
  rows,
  // @ts-expect-error `data-testid` is not part of the v5 selector contract.
  data: { 'data-testid': 'table' },
})

function acceptsWorkflowProps(props: WorkflowProps) {
  return props
}

acceptsWorkflowProps({
  activeIx: 0,
  items: [{ title: 'Step', data: { cy: 'step', test: 'step' } }],
  onClick: () => undefined,
})

acceptsWorkflowProps({
  activeIx: 0,
  // @ts-expect-error Step selectors use the `{ cy, test }` shape only.
  items: [{ title: 'Step', data: { testid: 'step' } }],
  onClick: () => undefined,
})

acceptsWorkflowProps({
  activeIx: 0,
  // @ts-expect-error Step selectors are an object, not a bare string.
  items: [{ title: 'Step', data: 'step' }],
  onClick: () => undefined,
})

function acceptsWorkflowProgressProps(props: WorkflowProgressProps) {
  return props
}

acceptsWorkflowProgressProps({
  items: [
    { title: 'Step', progress: 0.5, data: { cy: 'step', test: 'step' } },
    { title: 'Done', completed: true, data: { test: 'done' } },
  ],
  onClick: () => undefined,
})

acceptsWorkflowProgressProps({
  items: [
    // @ts-expect-error Step selectors use the `{ cy, test }` shape only.
    { title: 'Step', progress: 0.5, data: { 'data-testid': 'step' } },
  ],
  onClick: () => undefined,
})

// The five components that previously exposed per-element selectors but no way
// to address their own root. The root prop carries the same value shape, and
// the per-element props keep working alongside it. Calendar is pinned last: it
// is the only one of the five that used to accept raw `data-cy`/`data-test`
// attributes as well, so it carries a negative case proving that form is gone.

function acceptsDatePickerProps(props: DatePickerProps) {
  return props
}

acceptsDatePickerProps({
  date: undefined,
  onDateChange: () => undefined,
  data: { cy: 'picker', test: 'picker' },
  dataTrigger: { cy: 'trigger' },
  dataCalendar: { test: 'calendar' },
})

acceptsDatePickerProps({
  date: undefined,
  onDateChange: () => undefined,
  // @ts-expect-error Root selectors use the `{ cy, test }` shape only.
  data: { 'data-testid': 'picker' },
})

function acceptsDateRangePickerProps(props: DateRangePickerProps) {
  return props
}

acceptsDateRangePickerProps({
  range: undefined,
  onRangeChange: () => undefined,
  data: { cy: 'range' },
})

acceptsDateRangePickerProps({
  range: undefined,
  onRangeChange: () => undefined,
  // @ts-expect-error Root selectors use the `{ cy, test }` shape only.
  data: { 'data-testid': 'range' },
})

function acceptsDatetimePickerProps(props: DateTimePickerProps) {
  return props
}

acceptsDatetimePickerProps({ data: { cy: 'datetime', test: 'datetime' } })

acceptsDatetimePickerProps({
  // @ts-expect-error Root selectors are an object, not a bare string.
  data: 'datetime',
})

function acceptsColorPickerProps(props: ColorPickerProps) {
  return props
}

acceptsColorPickerProps({
  color: '#aa0000',
  onSubmit: () => undefined,
  submitText: 'Submit',
  colorLabel: 'Colour',
  triggerAriaLabel: 'Colour picker',
  data: { cy: 'colorpicker' },
  dataHexInput: { cy: 'hex', test: 'hex' },
})

acceptsColorPickerProps({
  color: '#aa0000',
  onSubmit: () => undefined,
  submitText: 'Submit',
  colorLabel: 'Colour',
  triggerAriaLabel: 'Colour picker',
  // @ts-expect-error Root selectors use the `{ cy, test }` shape only.
  data: { 'data-testid': 'colorpicker' },
})

function acceptsCalendarProps(props: React.ComponentProps<typeof Calendar>) {
  return props
}

acceptsCalendarProps({
  mode: 'single',
  data: { cy: 'calendar', test: 'calendar' },
  dataNextMonth: { cy: 'next' },
  dataPreviousMonth: { cy: 'previous' },
})

acceptsCalendarProps({
  mode: 'single',
  // @ts-expect-error Root selectors use the `{ cy, test }` shape only.
  data: { 'data-testid': 'calendar' },
})

// `data` is the supported form and is the one pinned here. Note this pins the
// object-literal position only: TypeScript exempts hyphenated names from excess
// property checks in JSX, so `<Calendar data-cy="x" />` still compiles and still
// reaches the DOM through DayPicker's prop passthrough. It is undocumented
// rather than rejected, and `data` now takes precedence over it.
acceptsCalendarProps({
  mode: 'single',
  // @ts-expect-error Selectors go through `data`, not a raw attribute prop.
  'data-cy': 'calendar',
})
