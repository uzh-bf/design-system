import type {
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

// @ts-expect-error Rows are passed through `rows`; `data` now carries selectors.
acceptsTableProps({ columns, data: rows })

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
