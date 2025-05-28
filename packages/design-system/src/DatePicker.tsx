import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import React, { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from './FormLabel'
import Tooltip from './Tooltip'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export interface DatePickerClassName {
  trigger?: string
  label?: string
  input?: string
  tooltip?: string
}

export interface DatePickerProps {
  id?: string
  date: Date | undefined
  onDateChange: Dispatch<SetStateAction<Date | undefined>>
  label?: string
  labelType?: 'small' | 'large'
  placeholder?: string
  required?: boolean
  tooltip?: string | React.ReactNode
  disabled?: boolean
  error?: string
  hideError?: boolean
  isTouched?: boolean
  className?: DatePickerClassName
  dataTrigger?: {
    cy?: string
    test?: string
  }
  dataCalendar?: {
    cy?: string
    test?: string
  }
}

/**
 * This component provides a simple date changer with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param id - The id of the date changer
 * @param date - The date to be displayed (state)
 * @param onDateChange - The function to be called when the date is changed (state management)
 * @param label - The label of the date changer
 * @param labelType - The type of the label (small or large)
 * @param placeholder - The placeholder of the date changer (is only shown if no date is selected)
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
 * @param disabled - Whether the date changer is disabled or not
 * @param error - The error message to be displayed
 * @param hideError - Whether the error message should be hidden
 * @param isTouched - Whether the date changer has been touched
 * @param format - The format of the date when the edit mode is not active (then the display is up to the browser implementation)
 * @param className - The optional className object allows you to override the default styling.
 * @param onDateChange - The function to be called when the date is changed (state management)
 * @param dataTrigger - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the popover trigger
 * @param dataCalendar - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the calendar
 * @returns Date changer component with optional label, edit button and save button.
 */
export function DatePicker({
  id,
  date,
  onDateChange,
  label = '',
  labelType = 'small',
  placeholder,
  tooltip,
  required = false,
  disabled = false,
  error,
  hideError = false,
  isTouched = false,
  className,
  dataTrigger,
  dataCalendar,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger disabled={disabled} asChild>
        <div
          className={twMerge(
            'flex w-[280px] flex-row',
            labelType === 'small' && 'flex-col',
            className?.trigger
          )}
        >
          {label && (
            <FormLabel
              id={id}
              required={required}
              label={label}
              labelType={labelType}
              tooltip={tooltip}
              className={{
                label: className?.label,
                tooltip: className?.tooltip,
              }}
            />
          )}
          <div className="flex flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              className={twMerge(
                'w-36 justify-start text-left text-base font-normal',
                !date && 'text-muted-foreground',
                !!error && isTouched && 'border-red-600',
                className?.input
              )}
              data-cy={dataTrigger?.cy}
              data-test={dataTrigger?.test}
            >
              <FontAwesomeIcon icon={faCalendar} className="mr-2.5 h-4 w-4" />
              {date ? (
                dayjs(date).format('DD.MM.YYYY')
              ) : (
                <span>{placeholder ?? 'Pick a date'}</span>
              )}
            </Button>
            {error && !hideError && isTouched && (
              <Tooltip
                tooltip={error}
                delay={0}
                className={{
                  tooltip: twMerge('max-w-[30rem] text-sm', className?.tooltip),
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="mr-1 text-red-600"
                />
              </Tooltip>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          id={id}
          mode="single"
          weekStartsOn={1}
          disabled={disabled}
          selected={date}
          defaultMonth={date}
          onSelect={(newDate) => {
            if (typeof newDate !== 'undefined') {
              onDateChange(newDate)
            }
          }}
          data-cy={dataCalendar?.cy}
          data-test={dataCalendar?.test}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
