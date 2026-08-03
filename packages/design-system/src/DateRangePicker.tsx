'use client'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import React from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'
import { twMerge } from 'tailwind-merge'

import FormLabel from './FormLabel'
import { testAttrs, type TestSelectors } from './lib/testSelectors'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export interface DateRangePickerClassName {
  root?: string
  label?: string
  trigger?: string
}

export interface DateRangePickerProps {
  id?: string
  ref?: React.Ref<HTMLButtonElement>
  range: DateRange | undefined
  onRangeChange: (range: DateRange | undefined) => void
  label?: string
  labelType?: 'small' | 'large'
  align?: 'start' | 'center' | 'end'
  captionLayout?: Pick<
    React.ComponentProps<typeof DayPicker>,
    'captionLayout'
  >['captionLayout']
  numberOfMonths?: number
  placeholder?: string
  required?: boolean
  tooltip?: string | React.ReactNode
  disabled?: boolean
  className?: DateRangePickerClassName
  data?: TestSelectors
  dataTrigger?: TestSelectors
  dataCalendar?: TestSelectors
  dataNextMonth?: TestSelectors
  dataPreviousMonth?: TestSelectors
}

const DATE_FORMAT = 'DD.MM.YYYY'

/**
 * This component provides a date range picker (from–to) built on the Calendar
 * primitive in range mode. The open state is internal; the selected range is
 * managed externally via `range` / `onRangeChange`. Not coupled to a formik context.
 *
 * @param id - The id of the range picker.
 * @param range - The selected range ({ from?, to? }), managed externally.
 * @param onRangeChange - Called with the new range when the selection changes.
 * @param label - Optional label shown above/next to the trigger.
 * @param labelType - The type of the label (small or large).
 * @param align - The alignment of the popover content (start, center or end).
 * @param captionLayout - The layout of the calendar caption (dropdown or label).
 * @param numberOfMonths - Number of months shown side by side (default 2).
 * @param placeholder - Trigger text shown when no range is selected.
 * @param required - Whether the label should contain a required symbol.
 * @param tooltip - Tooltip shown next to the label (only when a label is given).
 * @param disabled - Whether the range picker is disabled.
 * @param className - The optional className object allows you to override the default styling.
 * @param data - Data attributes for the component root (e.g. data-test, data-cy).
 * @param dataTrigger - Data attributes for the popover trigger (e.g. data-test, data-cy).
 * @param dataCalendar - Data attributes for the calendar.
 * @param dataNextMonth - Data attributes for the next-month button.
 * @param dataPreviousMonth - Data attributes for the previous-month button.
 * @returns Date range picker component.
 */
export function DateRangePicker({
  id,
  ref,
  range,
  onRangeChange,
  label = '',
  labelType = 'small',
  align = 'start',
  captionLayout = 'dropdown',
  numberOfMonths = 2,
  placeholder,
  required = false,
  tooltip,
  disabled = false,
  className,
  data,
  dataTrigger,
  dataCalendar,
  dataNextMonth,
  dataPreviousMonth,
}: DateRangePickerProps) {
  const toLabel = range?.to ? dayjs(range.to).format(DATE_FORMAT) : '…'
  const triggerLabel = range?.from
    ? `${dayjs(range.from).format(DATE_FORMAT)} – ${toLabel}`
    : (placeholder ?? 'Pick a date range')

  return (
    <Popover>
      <div
        className={twMerge(
          'flex w-auto flex-row',
          labelType === 'small' && 'flex-col',
          className?.root
        )}
        {...testAttrs(data)}
      >
        {label && (
          <FormLabel
            id={id}
            required={required}
            label={label}
            labelType={labelType}
            tooltip={tooltip}
            className={{ label: className?.label }}
          />
        )}
        <PopoverTrigger disabled={disabled} asChild>
          <Button
            id={id}
            ref={ref}
            type="button"
            variant="outline"
            disabled={disabled}
            className={twMerge(
              'h-10 min-w-64 justify-start rounded-md border-[#E0E0E0] px-3 text-left text-sm font-normal text-[#111111] hover:bg-[#FAFAFA]',
              !range?.from && 'text-[#666666]',
              className?.trigger
            )}
            {...testAttrs(dataTrigger)}
          >
            <FontAwesomeIcon
              icon={faCalendar}
              className="mr-2.5 h-4 w-4 text-[#666666]"
            />
            {triggerLabel}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="w-auto border-none bg-transparent p-0 shadow-none"
        align={align}
      >
        <Calendar
          mode="range"
          captionLayout={captionLayout}
          weekStartsOn={1}
          numberOfMonths={numberOfMonths}
          disabled={disabled}
          selected={range}
          defaultMonth={range?.from ?? range?.to}
          onSelect={onRangeChange}
          data={dataCalendar}
          dataNextMonth={dataNextMonth}
          dataPreviousMonth={dataPreviousMonth}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DateRangePicker
