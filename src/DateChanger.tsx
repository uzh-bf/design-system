import { faSave } from '@fortawesome/free-regular-svg-icons'
import { faPencil, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import Label from './forms/Label'

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
  tooltip?: string
  disabled?: boolean
  format?: string
  edit: boolean
  date: string
  onEdit: () => void
  onSave: (date: string) => void
  editIcon?: IconDefinition
  saveIcon?: IconDefinition
  className?: {
    root?: string
    label?: string
    field?: string
    input?: string
    disabled?: string
    editButton?: string
    saveButton?: string
  }
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
 * @param saveIcon - The icon to be displayed on the save button
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
  saveIcon = faSave,
  className,
}: DateChangerProps) {
  const [dateState, setDateState] = useState(dayjs(date).format('YYYY-MM-DD'))

  return (
    <div
      className={twMerge('flex w-max flex-row items-center', className?.root)}
    >
      {label && (
        <Label
          label={label}
          className={{ root: twMerge('mr-1.5', className?.label) }}
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
            data-cy={data?.cy}
            data-test={data?.test}
            id={id}
            type="date"
            className={twMerge(
              'w-max border-none px-0 py-1 pl-2',
              className?.input
            )}
            value={dateState}
            onChange={(e) => setDateState(e.target.value)}
          />
          <Button
            basic
            data={dataButton}
            onClick={() => onSave(dateState)}
            className={{
              root: twMerge(
                'bg-uzh-blue-20 px-2 py-1 hover:bg-uzh-blue-40',
                className?.saveButton
              ),
            }}
          >
            <FontAwesomeIcon icon={saveIcon || faSave} />
          </Button>
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
