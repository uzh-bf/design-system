'use client'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { DayPicker } from 'react-day-picker'
import { twMerge } from 'tailwind-merge'
import FormLabel from './FormLabel'
import { testAttrs, type TestSelectors } from './lib/testSelectors'
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
  onBlur?: () => void
  resetKey?: number
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-invalid'?: React.AriaAttributes['aria-invalid']
  ref?: React.Ref<HTMLButtonElement>
  date: Date | undefined
  onDateChange: Dispatch<SetStateAction<Date | undefined>>
  label?: string
  labelType?: 'small' | 'large'
  align?: 'start' | 'center' | 'end'
  captionLayout?: Pick<
    React.ComponentProps<typeof DayPicker>,
    'captionLayout'
  >['captionLayout']
  placeholder?: string
  required?: boolean
  tooltip?: string | React.ReactNode
  disabled?: boolean
  error?: string
  hideError?: boolean
  isTouched?: boolean
  className?: DatePickerClassName
  data?: TestSelectors
  dataTrigger?: TestSelectors
  dataCalendar?: TestSelectors
  dataNextMonth?: TestSelectors
  dataPreviousMonth?: TestSelectors
}

/**
 * This component provides a simple date changer with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param id - The id of the date changer
 * @param date - The date to be displayed (state)
 * @param onDateChange - The function to be called when the date is changed (state management)
 * @param label - The label of the date changer
 * @param labelType - The type of the label (small or large)
 * @param align - The alignment of the label (start, center or end)
 * @param captionLayout - The layout of the calendar caption (dropdown or label)
 * @param placeholder - The placeholder of the date changer (is only shown if no date is selected)
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
 * @param disabled - Whether the date changer is disabled or not
 * @param error - The error message to be displayed
 * @param hideError - Whether the error message should be hidden
 * @param isTouched - Whether the date changer has been touched
 * @param className - The optional className object allows you to override the default styling.
 * @param onDateChange - The function to be called when the date is changed (state management)
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the trigger area. It does not enclose the popover; use dataCalendar to address the open calendar.
 * @param dataTrigger - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the popover trigger
 * @param dataCalendar - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the calendar
 * @param dataNextMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the next month button
 * @param dataPreviousMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the previous month button
 * @returns Date changer component with optional label, edit button and save button.
 */
export function DatePicker({
  id,
  onBlur,
  resetKey,
  'aria-label': ariaLabel,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  ref,
  date,
  onDateChange,
  label = '',
  labelType = 'small',
  align = 'start',
  captionLayout = 'dropdown',
  placeholder,
  tooltip,
  required = false,
  disabled = false,
  error,
  hideError = false,
  isTouched = false,
  className,
  data,
  dataTrigger,
  dataCalendar,
  dataNextMonth,
  dataPreviousMonth,
}: DatePickerProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const valueId = `${inputId}-value`
  const dateLabel = date
    ? dayjs(date).format('DD.MM.YYYY')
    : (placeholder ?? 'Pick a date')
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const blurNotified = useRef(false)
  const notifyBlur = useCallback(() => {
    if (blurNotified.current) return
    blurNotified.current = true
    onBlur?.()
  }, [onBlur])
  useEffect(() => {
    if (!disabled || !openRef.current) return
    openRef.current = false
    setOpen(false)
    notifyBlur()
  }, [disabled, notifyBlur])
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next && disabled) return
        if (next) blurNotified.current = false
        else if (openRef.current) notifyBlur()
        openRef.current = next
        setOpen(next)
      }}
    >
      <div
        className={twMerge(
          'flex w-[280px] flex-row',
          labelType === 'small' && 'flex-col',
          className?.trigger
        )}
        {...testAttrs(data)}
      >
        {label && (
          <FormLabel
            id={inputId}
            labelId={`${inputId}-label`}
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
          <PopoverTrigger disabled={disabled} asChild>
            <Button
              id={inputId}
              aria-label={
                labelledBy || label || !ariaLabel
                  ? undefined
                  : `${ariaLabel} ${dateLabel}`
              }
              aria-labelledby={
                labelledBy || label
                  ? `${labelledBy ?? `${inputId}-label`} ${valueId}`
                  : undefined
              }
              aria-describedby={describedBy}
              aria-invalid={invalid}
              onFocus={() => {
                blurNotified.current = false
              }}
              onBlur={() => {
                if (!openRef.current) notifyBlur()
              }}
              ref={ref}
              type="button"
              variant="outline"
              disabled={disabled}
              className={twMerge(
                'border-control-border text-content hover:bg-surface-hover h-10 min-w-[200px] justify-start rounded-md px-3 text-left text-sm font-normal',
                !date && 'text-content-muted',
                ((!!error && isTouched) ||
                  (invalid !== undefined &&
                    invalid !== false &&
                    invalid !== 'false')) && [
                  'border-destructive bg-destructive-background',
                  !date && 'text-content-secondary',
                ],
                className?.input
              )}
              {...testAttrs(dataTrigger)}
            >
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-content-muted mr-2.5 h-4 w-4"
              />
              <span id={valueId}>{dateLabel}</span>
            </Button>
          </PopoverTrigger>
          {error && !hideError && isTouched && (
            <Tooltip
              tooltip={error}
              ariaLabel={error}
              delay={0}
              className={{
                tooltip: twMerge('text-sm', className?.tooltip),
              }}
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-destructive-text mr-1"
              />
            </Tooltip>
          )}
        </div>
      </div>
      <PopoverContent
        aria-label={ariaLabel || label || placeholder || 'Pick a date'}
        className="w-auto border-none bg-transparent p-0 shadow-none"
        align={align}
      >
        <Calendar
          id={`${inputId}-calendar`}
          key={resetKey}
          mode="single"
          captionLayout={captionLayout}
          weekStartsOn={1}
          disabled={disabled}
          selected={date}
          defaultMonth={date}
          onSelect={(newDate) => {
            if (!disabled && typeof newDate !== 'undefined') {
              onDateChange(newDate)
            }
          }}
          data={dataCalendar}
          dataNextMonth={dataNextMonth}
          dataPreviousMonth={dataPreviousMonth}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
