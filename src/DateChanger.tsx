import { faSave } from '@fortawesome/free-regular-svg-icons'
import { faPencil, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import Label from './forms/Label'

interface DateChangerProps {
  label?: string
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
  format: 'DD / MM / YYYY',
}

function DateChanger({
  label,
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
    <div className={twMerge('flex flex-row items-center', className?.root)}>
      {label && (
        <Label
          label={label}
          className={{ root: twMerge('mr-1.5', className?.label) }}
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
