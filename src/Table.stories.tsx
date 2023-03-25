import React, { useRef } from 'react'
import Button from './Button'
import Table from './Table'
import { data } from './tableData'

export const Simple = () => {
  const columns = [
    { label: 'Count', accessor: 'count', sortable: true },
    { label: 'Answer', accessor: 'answer', sortable: true },
    { label: 'Username', accessor: 'username', sortable: false },
  ]
  return (
    <Table columns={columns} data={data} caption="Table with example data" />
  )
}

export const Transformed = () => {
  const columns = [
    {
      label: 'Count',
      accessor: 'count',
      sortable: true,
      transformer: (value: number) => value * 2,
    },
    { label: 'Answer', accessor: 'answer', sortable: true },
    {
      label: 'Username',
      accessor: 'username',
      sortable: false,
      transformer: (value: string) => value.toUpperCase(),
    },
  ]
  return (
    <Table columns={columns} data={data} caption="Table with example data" />
  )
}

export const ResetTable = () => {
  const ref = useRef<{ reset: () => void }>(null)
  const columns = [
    { label: 'Count', accessor: 'count', sortable: true },
    { label: 'Answer', accessor: 'answer', sortable: true },
    { label: 'Username', accessor: 'username', sortable: false },
  ]

  return (
    <>
      <Button
        onClick={() => {
          ref.current!.reset()
        }}
      >
        Reset Table Filters
      </Button>
      <Table
        columns={columns}
        data={data}
        caption="Table with example data"
        ref={ref}
      />
    </>
  )
}

export const Formatted = () => {
  const columns = [
    {
      label: 'Count',
      accessor: 'count',
      sortable: true,
      formatter: (value: number) => `${value}%`,
    },
    {
      label: 'Answer',
      accessor: 'answer',
      sortable: true,
      formatter: (value: string) => <div className="bg-red-300">{value}</div>,
    },
    { label: 'Username', accessor: 'username', sortable: false },
  ]

  return (
    <Table
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
  )
}

export const Combined = () => {
  const columns = [
    {
      label: 'Count',
      accessor: 'count',
      sortable: true,
      // the transformer will be applied to the data before sorting
      transformer: (value: number) => (value > 10 ? value : value * 10),
      formatter: (value: number) => `${value}%`,
    },
    {
      label: 'Answer',
      accessor: 'answer',
      sortable: true,
      formatter: (value: string) => (
        <div className="bg-red-300">{value.toUpperCase()}</div>
      ),
    },
    { label: 'Username', accessor: 'username', sortable: false },
  ]

  return (
    <Table
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
  )
}
