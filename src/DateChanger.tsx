import { faPencil, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import Label from './forms/Label'

export interface DateChangerClassName {
  override?: string
  root?: string
  label?: string
  field?: string
  input?: string
  disabled?: string
  editButton?: string
  saveButton?: string
  tooltip?: string
}

export interface DateChangerProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  dataButton?: {
    cy?: string
    test?: string
  }
  label?: string
  required?: boolean
  tooltip?: string | React.ReactNode
  disabled?: boolean
  format?: string
  edit: boolean
  date: string
  onEdit: () => void
  onSave: (date: string) => void
  editIcon?: IconDefinition
  className?: DateChangerClassName
}

/**
 * This component provides a simple date changer with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param id - The id of the date changer
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the button
 * @param label - The label of the date changer
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
 * @param disabled - Whether the date changer is disabled or not
 * @param format - The format of the date when the edit mode is not active (then the display is up to the browser implementation)
 * @param edit - Whether the date changer is in edit mode or not
 * @param date - The date to be displayed
 * @param onEdit - The function to be called when the edit button is clicked (external state management)
 * @param onSave - The function to be called when the save button is clicked (external state management)
 * @param editIcon - The icon to be displayed on the edit button
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date changer component with optional label, edit button and save button.
 */

export function DateChanger({
  id,
  data,
  dataButton,
  label = '',
  tooltip,
  required = false,
  disabled = false,
  format = 'DD / MM / YYYY',
  edit,
  date,
  onEdit,
  onSave,
  editIcon = faPencil,
  className,
}: DateChangerProps) {
  const [dateState, setDateState] = useState(dayjs(date).format('YYYY-MM-DD'))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus()
    }
  }, [edit])

  return (
    <div
      className={twMerge('flex w-max flex-row items-center', className?.root)}
    >
      {label && (
        <Label
          label={label}
          className={{
            root: twMerge('mr-1.5', className?.label),
            tooltip: className?.tooltip,
          }}
          tooltip={tooltip}
          showTooltipSymbol={!!tooltip}
          required={required}
        />
      )}
      {edit && !disabled ? (
        <div
          className={twMerge(
            'flex flex-row gap-2 rounded border border-solid',

            className?.field
          )}
        >
          <input
            ref={inputRef}
            data-cy={data?.cy}
            data-test={data?.test}
            id={id}
            type="date"
            className={twMerge(
              className?.override,
              'w-max border-none px-0 py-1 pl-2',
              className?.input
            )}
            value={dateState}
            onChange={(e) => setDateState(e.target.value)}
            onBlur={() => onSave(dateState)}
          />
        </div>
      ) : (
        <div className="flex flex-row gap-2 rounded border border-solid">
          <div
            className={twMerge(
              'py-1 pl-2',
              disabled && twMerge('text-uzh-grey-100', className?.disabled)
            )}
          >
            {dayjs(dateState).format(format || 'DD / MM / YYYY')}
          </div>
          <Button
            basic
            data={dataButton}
            onClick={onEdit}
            className={{
              root: twMerge(
                'bg-uzh-grey-20 px-2 py-1 hover:bg-uzh-grey-40',
                className?.editButton,
                disabled && twMerge('cursor-not-allowed', className?.disabled)
              ),
            }}
            disabled={disabled}
          >
            <FontAwesomeIcon
              icon={editIcon || faPencil}
              className={twMerge(disabled && 'text-uzh-grey-80')}
            />
          </Button>
        </div>
      )}
    </div>
  )
}

export default DateChanger
