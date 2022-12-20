import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export interface TableProps {
  id?: string
  dataAttributes?: {
    cy?: string
    test?: string
  }
  columns: {
    label: string
    accessor: string
    sortable?: boolean
    transformer?: (value: any, row: any) => any
  }[]
  data: Record<string, string | number>[]
  caption?: string
  className?: {
    root?: string
    tableHeader?: string
    body?: string
    row?: string
  }
}

const defaultProps = {
  id: undefined,
  dataAttributes: undefined,
  caption: undefined,
  className: undefined,
}

/**
 * This function returns a pre-styled Table component based on the RadixUI table component and the custom theme.
 * The table is sortable by clicking on the column header.
 *
 * @param id - The id of the table.
 * @param dataAttributes - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param columns - The columns of the table. The columns are defined by an array of objects where each object has a label, an accessor and an optional transformer.
 * @param data - The data of the table. The data is defined by an array of objects where each object has a key-value pair for each column.
 * @param caption - The optional caption of the table.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Table component
 */
export function Table({
  id,
  dataAttributes,
  className,
  columns,
  data,
  caption,
}: TableProps) {
  const [tableData, setTableData] = useState(data)
  const [sortField, setSortField] = useState('')
  const [order, setOrder] = useState('asc')

  useEffect(() => {
    setTableData(data)
  }, [data])

  const tableContents = useMemo(
    () =>
      tableData.map((d, index) => {
        return (
          <tr
            key={index}
            className={twMerge(
              'odd:bg-uzh-grey-20 first:border-t-0',
              className?.row
            )}
          >
            {columns.map(({ accessor, transformer }) => {
              const tData = d[accessor] ? d[accessor] : '——'
              const transformedData = transformer
                ? transformer(tData, d)
                : tData
              return (
                <td
                  className="p-4 border-t-2 border-uzh-grey-60"
                  key={accessor}
                >
                  {transformedData}
                </td>
              )
            })}
          </tr>
        )
      }),
    [tableData, columns, className]
  )

  const handleSorting = (sortField: string, sortOrder: string) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1
        if (b[sortField] === null) return -1
        if (a[sortField] === null && b[sortField] === null) return 0
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        )
      })
      setTableData(sorted)
    }
  }

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc'
    setSortField(accessor)
    setOrder(sortOrder)
    handleSorting(accessor, sortOrder)
  }

  return (
    <div
      className={twMerge('table w-full', className?.root)}
      id={id}
      data-cy={dataAttributes?.cy}
      data-test={dataAttributes?.test}
    >
      <table className="w-full table-auto">
        <caption className="text-sm italic">{caption}</caption>
        <thead>
          <tr>
            {columns.map(({ label, accessor, sortable }) => {
              return (
                <th
                  key={accessor}
                  onClick={
                    sortable ? () => handleSortingChange(accessor) : undefined
                  }
                  className={twMerge(
                    'py-2 pl-4 pr-10 mr-20 border-b-2 text-lg border-b-gray-800 text-start text-gray-800 whitespace-nowrap',
                    sortable && 'cursor-pointer pl-0',
                    className?.tableHeader
                  )}
                >
                  {sortable && (
                    <FontAwesomeIcon
                      className={twMerge(
                        'mr-2',
                        !(sortField === accessor) && 'text-uzh-grey-100'
                      )}
                      icon={
                        sortField === accessor
                          ? order === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    />
                  )}
                  {label}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className={className?.body}>{tableContents}</tbody>
      </table>
    </div>
  )
}

Table.defaultProps = defaultProps
export default Table
