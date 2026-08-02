'use client'

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useImperativeHandle, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type BaseRowType = {
  className?: string
}

export interface TableRef {
  reset(): void
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
  ref?: React.Ref<TableRef>
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
 * @param emptyCellText - The optional emptyCellText allows you to define the text that should be displayed in empty cells.
 * @param defaultSortField - The optional defaultSortField allows you to define the default sorting field.
 * @param defaultSortOrder - The optional defaultSortOrder allows you to define the default sorting order.
 * @returns Table component
 */
export function Table<
  RowType extends Record<string, string | number | boolean>,
>({
  id,
  dataAttributes,
  columns,
  data,
  caption,
  className,
  ref,
  emptyCellText = '——',
  defaultSortField,
  defaultSortOrder = 'asc',
}: TableProps<RowType>) {
  const [sortField, setSortField] = useState<string | undefined>(
    defaultSortField
  )
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultSortOrder)

  useImperativeHandle(ref, () => {
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
          'hover:bg-muted transition-colors',
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
                'border-border border-b px-4 py-[13px] align-middle',
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
      className={twMerge(
        'bg-card overflow-hidden rounded-md border',
        className?.root
      )}
      id={id}
      data-cy={dataAttributes?.cy}
      data-test={dataAttributes?.test}
    >
      <table className="w-full table-auto border-collapse text-sm">
        {caption && (
          <caption className="text-muted-foreground py-2 text-sm italic">
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortField === col.accessor
              const sortAriaValue = isSorted
                ? order === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
              return (
                <th
                  key={col.accessor}
                  scope="col"
                  aria-sort={col.sortable ? sortAriaValue : undefined}
                  className={twMerge(
                    'border-border bg-muted text-foreground whitespace-nowrap border-b text-start text-xs font-semibold uppercase tracking-[0.06em]',
                    !col.sortable && 'px-4 py-3',
                    className?.tableHeader,
                    col.className
                  )}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSortingChange(col.accessor)}
                      className="focus-visible:ring-ring focus-visible:outline-hidden flex w-full cursor-pointer items-center px-4 py-3 text-start focus-visible:ring-2 focus-visible:ring-inset"
                    >
                      <FontAwesomeIcon
                        className={twMerge(
                          'mr-2',
                          !isSorted && 'text-foreground'
                        )}
                        icon={
                          isSorted
                            ? order === 'asc'
                              ? faSortUp
                              : faSortDown
                            : faSort
                        }
                      />
                      {col.label}
                    </button>
                  ) : (
                    col.label
                  )}
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
