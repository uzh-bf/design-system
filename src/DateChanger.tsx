import { faSave } from '@fortawesome/free-regular-svg-icons'
import { faPencil, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import Label from './forms/Label'

export interface DateChangerProps {
  label?: string
  required?: boolean
  tooltip?: string
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
    editButton?: string
    saveButton?: string
  }
}

const defaultProps = {
  label: '',
  tooltip: undefined,
  required: false,
  format: 'DD / MM / YYYY',
  editIcon: faPencil,
  saveIcon: faSave,
  className: undefined,
}

/**
 * This component provides a simple date changer with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param label - The label of the date changer
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
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
  label,
  tooltip,
  required,
  format,
  edit,
  date,
  onEdit,
  onSave,
  editIcon,
  saveIcon,
  className,
}: DateChangerProps) {
  const [dateState, setDateState] = useState(dayjs(date).format('YYYY-MM-DD'))

  return (
    <div
      className={twMerge('flex flex-row items-center w-max', className?.root)}
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
      {edit ? (
        <div
          className={twMerge(
            'flex flex-row gap-2 border border-solid rounded',
            className?.field
          )}
        >
          <input
            type="date"
            className={twMerge(
              'px-0 py-1 pl-2 border-none w-max',
              className?.input
            )}
            value={dateState}
            onChange={(e) => setDateState(e.target.value)}
          />
          <Button
            basic
            onClick={() => onSave(dateState)}
            className={{
              root: twMerge(
                'px-2 py-1 bg-uzh-blue-20 hover:bg-uzh-blue-40',
                className?.saveButton
              ),
            }}
          >
            <Button.Icon>
              <FontAwesomeIcon icon={saveIcon || faSave} />
            </Button.Icon>
          </Button>
        </div>
      ) : (
        <div className="flex flex-row gap-2 border border-solid rounded">
          <div className="py-1 pl-2">
            {dayjs(dateState).format(format || 'DD / MM / YYYY')}
          </div>
          <Button
            basic
            onClick={onEdit}
            className={{
              root: twMerge('bg-uzh-grey-20 py-1 px-2', className?.editButton),
            }}
          >
            <Button.Icon>
              <FontAwesomeIcon icon={editIcon || faPencil} />
            </Button.Icon>
          </Button>
        </div>
      )}
    </div>
  )
}

DateChanger.defaultProps = defaultProps
export default DateChanger
