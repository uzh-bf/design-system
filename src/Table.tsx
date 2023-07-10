import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useImperativeHandle, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type BaseRowType = {
  className?: string
}

export type ColumnType<RowType> = {
  className?: string
  label: string
  accessor: string
  sortable?: boolean
  transformer?: ({
    row,
    ix,
  }: {
    row: RowType
    ix?: number
  }) => string | number | boolean
  formatter?: ({
    row,
    ix,
  }: {
    row: RowType
    ix?: number
  }) => string | number | React.ReactElement
}

export interface TableProps<RowType extends BaseRowType> {
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
  emptyCellText?: string
  defaultSortField?: string
  defaultSortOrder?: 'asc' | 'desc'
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
 * @param emptyCellText - The optional emptyCellText allows you to define the text that should be displayed in empty cells.
 * @param defaultSortField - The optional defaultSortField allows you to define the default sorting field.
 * @param defaultSortOrder - The optional defaultSortOrder allows you to define the default sorting order.
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
  emptyCellText = '——',
  defaultSortField,
  defaultSortOrder = 'asc',
}: TableProps<RowType>) {
  const [sortField, setSortField] = useState<string | undefined>(
    defaultSortField
  )
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultSortOrder)

  useImperativeHandle(forwardedRef, () => {
    return {
      reset() {
        setSortField(defaultSortField)
        setOrder(defaultSortOrder)
      },
    }
  })

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc'
    setSortField(accessor)
    setOrder(sortOrder)
  }

  const tableData = useMemo(() => {
    const transformedData = data.map(
      (row, index) =>
        columns
          .map((col) =>
            typeof col.transformer === 'function'
              ? {
                  [col.accessor]: col.transformer({ row, ix: index }),
                  className: row.className,
                }
              : { [col.accessor]: row[col.accessor], className: row.className }
          )
          .reduce((acc, cur) => ({ ...acc, ...cur }), {}) as RowType
    )

    const sortedData = sortField
      ? transformedData.sort((a, b) => {
          if (a[sortField] === null) return 1
          if (b[sortField] === null) return -1
          if (a[sortField] === null && b[sortField] === null) return 0

          const direction = order === 'asc' ? 1 : -1

          if (typeof a[sortField] === 'number') {
            return (
              ((a[sortField] as number) - (b[sortField] as number)) * direction
            )
          }

          return (
            a[sortField]
              .toString()
              .localeCompare(b[sortField].toString(), 'en', {
                numeric: true,
              }) * direction
          )
        })
      : transformedData

    return sortedData.map((row, index) => (
      <tr
        key={index}
        className={twMerge(
          'first:border-t-0 odd:bg-uzh-grey-20',
          className?.row,
          row.className as string
        )}
      >
        {columns.map((col) => {
          const field =
            typeof row[col.accessor] === 'undefined' ||
            row[col.accessor] === null
              ? emptyCellText
              : row[col.accessor]

          return (
            <td
              className={twMerge(
                'border-t-2 border-uzh-grey-60 p-4',
                col.className
              )}
              key={col.accessor}
            >
              {typeof col.formatter === 'function'
                ? col.formatter({ row, ix: index })
                : field}
            </td>
          )
        })}
      </tr>
    ))
  }, [data, columns, sortField, order, className, emptyCellText])

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
            {columns.map((col) => {
              return (
                <th
                  key={col.accessor}
                  onClick={
                    col.sortable
                      ? () => handleSortingChange(col.accessor)
                      : undefined
                  }
                  className={twMerge(
                    'mr-20 whitespace-nowrap border-b-2 border-b-gray-800 py-2 pl-4 pr-10 text-start text-lg text-gray-800',
                    col.sortable && 'cursor-pointer pl-0',
                    className?.tableHeader,
                    col.className
                  )}
                >
                  {col.sortable && (
                    <FontAwesomeIcon
                      className={twMerge(
                        'mr-2',
                        !(sortField === col.accessor) && 'text-uzh-grey-100'
                      )}
                      icon={
                        sortField === col.accessor
                          ? order === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    />
                  )}
                  {col.label}
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
