import React, { useRef } from 'react'
import Button from './Button'
import Table from './Table'
import { data } from './tableData'
import UserNotification from './UserNotification'

const GenericWarning = () => (
  <UserNotification
    type="info"
    message="When using the table component with custom transformers and / or formatters, be aware of the use of suitable generics to avoid type errors in your code. All column names (as well as possible derived ones) and their corresponding data type have to be combine in one key-value object and passed to the table component as a generic. E.g. the Combined component illustrates how this can be accomplished"
    className={{ root: 'mb-4' }}
  />
)

export const Simple = () => {
  const columns = [
    { label: 'Count', accessor: 'count', sortable: true },
    { label: 'Answer', accessor: 'answer', sortable: true },
    { label: 'Username', accessor: 'username', sortable: false },
  ]

  return (
    <div>
      <GenericWarning />
      <Table columns={columns} data={data} caption="Table with example data" />
    </div>
  )
}

export const ResetTable = () => {
  const ref = useRef<{ reset: () => void }>(null)

  type RowType = { count: number; answer: string; username: string }

  const columns = [
    {
      label: 'Count',
      accessor: 'count',
      sortable: true,
      transformer: ({ row }: { row: RowType }) => row['count'] * 200,
    },
    { label: 'Answer', accessor: 'answer', sortable: true },
    { label: 'Username', accessor: 'username', sortable: false },
  ]

  return (
    <>
      <GenericWarning />
      <Button
        onClick={() => {
          ref.current!.reset()
        }}
      >
        Reset Table Filters
      </Button>
      <Table<RowType>
        columns={columns}
        data={data}
        caption="Table with example data"
        forwardedRef={ref}
      />
    </>
  )
}

export const Formatted = () => {
  type RowType = {
    count: number
    answer: string
    username: string
    className?: string
  }
  const columns = [
    {
      label: 'Count',
      accessor: 'count',
      sortable: true,
      formatter: ({ row }: { row: RowType }) => `${row['count']}%`,
    },
    {
      label: 'Answer',
      accessor: 'answer',
      sortable: true,
      className: 'font-bold italic',
      formatter: ({ row }: { row: RowType }) => (
        <div className="bg-red-300">{row['answer']}</div>
      ),
    },
    { label: 'Username', accessor: 'username', sortable: false },
  ]

  return (
    <div>
      <GenericWarning />
      <Table<RowType>
        columns={columns}
        data={[
          {
            className: 'text-green-200',
            ...data[0],
          },
          ...data,
        ]}
        caption="Table with example data"
        className={{
          root: 'bg-white',
          tableHeader: 'bg-gray-200',
          body: 'bg-gray-100',
          row: 'bg-white',
        }}
      />
    </div>
  )
}

export const Combined = () => {
  type RowType = { count: number; answer: string; username: string }
  const columns = [
    {
      label: 'Count',
      accessor: 'count',
      sortable: true,
      // the transformer will be applied to the data before sorting
      transformer: ({ row }: { row: RowType }) =>
        row['count'] > 10 ? row['count'] : row['count'] * 10,
      formatter: ({ row }: { row: RowType }) => `${row['count']}%`,
    },
    {
      label: 'Answer',
      accessor: 'answer',
      sortable: true,
      formatter: ({ row }: { row: RowType }) => (
        <div className="bg-red-300">{row['answer'].toUpperCase()}</div>
      ),
    },
    { label: 'Username', accessor: 'username', sortable: false },
  ]

  return (
    <div>
      <GenericWarning />
      <Table<RowType>
        columns={columns}
        data={data}
        caption="Table with example data"
        className={{
          root: 'bg-white',
          tableHeader: 'bg-gray-200',
          body: 'bg-gray-100',
          row: 'bg-white',
        }}
      />
    </div>
  )
}
