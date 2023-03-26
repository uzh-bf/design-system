import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useImperativeHandle, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export type ColumnType<RowType> = {
  label: string
  accessor: string
  sortable?: boolean
  transformer?: (row: RowType, ix?: number) => string | number | boolean
  formatter?: (
    row: RowType,
    ix?: number
  ) => string | number | React.ReactElement
}

export interface TableProps<RowType> {
  id?: string
  dataAttributes?: {
    cy?: string
    test?: string
  }
  columns: ColumnType<RowType>[]
  data: RowType[]
  caption?: string
  className?: {
    root?: string
    tableHeader?: string
    body?: string
    row?: string
  }
  forwardedRef?: React.Ref<any>
}

/**
 * This function returns a pre-styled Table component based on the RadixUI table component and the custom theme.
 * The table is sortable by clicking on the column header.
 * Before the table is being sorted according to the sorting parameters, the transformer will be applied to the data.
 * The formatter is meant to be used for visual modifications of the fields and applied after sorting.
 *
 * @param id - The id of the table.
 * @param dataAttributes - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param columns - The columns of the table. The columns are defined by an array of objects where each object has a label, an accessor and optional transformer and formatters.
 * @param data - The data of the table. The data is defined by an array of objects where each object has a key-value pair for each column.
 * @param caption - The optional caption of the table.
 * @param ref - The optional ref object allows you to access the table methods.
 * @param className - The optional className object allows you to override the default styling.
 * @param forwardedRef - The optional forwardedRef object allows you to access table methods from the parent component.
 * @returns Table component
 */
export function Table<
  RowType extends Record<string, string | number | boolean>
>({
  id,
  dataAttributes,
  columns,
  data,
  caption,
  className,
  forwardedRef,
}: TableProps<RowType>) {
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  useImperativeHandle(forwardedRef, () => {
    return {
      reset() {
        setSortField(undefined)
        setOrder('asc')
      },
    }
  })

  const handleTransforming = (
    data: RowType[],
    columns: ColumnType<RowType>[]
  ): RowType[] => {
    return data.map(
      (row) =>
        columns
          .map(({ accessor, transformer }) =>
            transformer
              ? { [accessor]: transformer(row) }
              : { [accessor]: row[accessor] }
          )
          .reduce((acc, cur) => ({ ...acc, ...cur }), {}) as RowType
    )
  }

  const handleSorting = (
    data: RowType[],
    sortField: string,
    sortOrder: string
  ) =>
    data.sort((a, b) => {
      if (a[sortField] === null) return 1
      if (b[sortField] === null) return -1
      if (a[sortField] === null && b[sortField] === null) return 0
      return (
        a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
          numeric: true,
        }) * (sortOrder === 'asc' ? 1 : -1)
      )
    })

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc'
    setSortField(accessor)
    setOrder(sortOrder)
  }

  const tableData = useMemo(() => {
    const transformedData = handleTransforming(data, columns)
    const sortedData = sortField
      ? handleSorting(transformedData, sortField, order)
      : transformedData

    return sortedData.map((row, index) => (
      <tr
        key={index}
        className={twMerge(
          'odd:bg-uzh-grey-20 first:border-t-0',
          className?.row
        )}
      >
        {columns.map(({ accessor, formatter }) => {
          const field =
            typeof row[accessor] === 'undefined' || row[accessor] === null
              ? '——'
              : row[accessor]

          return (
            <td className="p-4 border-t-2 border-uzh-grey-60" key={accessor}>
              {formatter ? formatter(row, index) : field}
            </td>
          )
        })}
      </tr>
    ))
  }, [
    data,
    columns,
    sortField,
    order,
    className,
    handleSorting,
    handleTransforming,
  ])

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
        <tbody className={className?.body}>{tableData}</tbody>
      </table>
    </div>
  )
}

export default Table
