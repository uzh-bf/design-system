'use client'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { add } from 'date-fns'
import { enUS } from 'date-fns/locale'
import dayjs from 'dayjs'
import { Clock } from 'lucide-react'
import * as React from 'react'
import { useImperativeHandle, useRef } from 'react'
import { DayPickerProps } from 'react-day-picker'
import { twMerge } from 'tailwind-merge'
import FormLabel from './FormLabel'
import { cn } from './lib/utils'
import Tooltip from './Tooltip'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

// ! based on: https://github.com/hsuanyi-chou/shadcn-ui-expansions/blob/fab06096fe6b151c3915694f627f16b10e97e264/components/ui/datetime-picker.tsx

// ---------- utils start ----------
/**
 * regular expression to check for valid hour format (01-23)
 */
function isValidHour(value: string) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value)
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 */
function isValid12Hour(value: string) {
  return /^(0[1-9]|1[0-2])$/.test(value)
}

/**
 * regular expression to check for valid minute format (00-59)
 */
function isValidMinuteOrSecond(value: string) {
  return /^[0-5][0-9]$/.test(value)
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean }

function getValidNumber(
  value: string,
  { max, min = 0, loop = false }: GetValidNumberConfig
) {
  let numericValue = parseInt(value, 10)

  if (!Number.isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max
      if (numericValue < min) numericValue = min
    } else {
      if (numericValue > max) numericValue = min
      if (numericValue < min) numericValue = max
    }
    return numericValue.toString().padStart(2, '0')
  }

  return '00'
}

function getValidHour(value: string) {
  if (isValidHour(value)) return value
  return getValidNumber(value, { max: 23 })
}

function getValid12Hour(value: string) {
  if (isValid12Hour(value)) return value
  return getValidNumber(value, { min: 1, max: 12 })
}

function getValidMinuteOrSecond(value: string) {
  if (isValidMinuteOrSecond(value)) return value
  return getValidNumber(value, { max: 59 })
}

type GetValidArrowNumberConfig = {
  min: number
  max: number
  step: number
}

function getValidArrowNumber(
  value: string,
  { min, max, step }: GetValidArrowNumberConfig
) {
  let numericValue = parseInt(value, 10)
  if (!Number.isNaN(numericValue)) {
    numericValue += step
    return getValidNumber(String(numericValue), { min, max, loop: true })
  }
  return '00'
}

function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 23, step })
}

function getValidArrow12Hour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 1, max: 12, step })
}

function getValidArrowMinuteOrSecond(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step })
}

function setMinutes(date: Date, value: string) {
  const minutes = getValidMinuteOrSecond(value)
  date.setMinutes(parseInt(minutes, 10))
  return date
}

function setSeconds(date: Date, value: string) {
  const seconds = getValidMinuteOrSecond(value)
  date.setSeconds(parseInt(seconds, 10))
  return date
}

function setHours(date: Date, value: string) {
  const hours = getValidHour(value)
  date.setHours(parseInt(hours, 10))
  return date
}

function set12Hours(date: Date, value: string, period: Period) {
  const hours = parseInt(getValid12Hour(value), 10)
  const convertedHours = convert12HourTo24Hour(hours, period)
  date.setHours(convertedHours)
  return date
}

type TimePickerType = 'minutes' | 'seconds' | 'hours' | '12hours'
type Period = 'AM' | 'PM'

function setDateByType(
  date: Date,
  value: string,
  type: TimePickerType,
  period?: Period
) {
  switch (type) {
    case 'minutes':
      return setMinutes(date, value)
    case 'seconds':
      return setSeconds(date, value)
    case 'hours':
      return setHours(date, value)
    case '12hours': {
      if (!period) return date
      return set12Hours(date, value, period)
    }
    default:
      return date
  }
}

function getDateByType(date: Date | null, type: TimePickerType) {
  if (!date) return '00'
  switch (type) {
    case 'minutes':
      return getValidMinuteOrSecond(String(date.getMinutes()))
    case 'seconds':
      return getValidMinuteOrSecond(String(date.getSeconds()))
    case 'hours':
      return getValidHour(String(date.getHours()))
    case '12hours':
      return getValid12Hour(String(display12HourValue(date.getHours())))
    default:
      return '00'
  }
}

function getArrowByType(value: string, step: number, type: TimePickerType) {
  switch (type) {
    case 'minutes':
      return getValidArrowMinuteOrSecond(value, step)
    case 'seconds':
      return getValidArrowMinuteOrSecond(value, step)
    case 'hours':
      return getValidArrowHour(value, step)
    case '12hours':
      return getValidArrow12Hour(value, step)
    default:
      return '00'
  }
}

/**
 * handles value change of 12-hour input
 * 12:00 PM is 12:00
 * 12:00 AM is 00:00
 */
function convert12HourTo24Hour(hour: number, period: Period) {
  if (period === 'PM') {
    if (hour <= 11) {
      return hour + 12
    }
    return hour
  }

  if (period === 'AM') {
    if (hour === 12) return 0
    return hour
  }
  return hour
}

/**
 * time is stored in the 24-hour form,
 * but needs to be displayed to the user
 * in its 12-hour representation
 */
function display12HourValue(hours: number) {
  if (hours === 0 || hours === 12) return '12'
  if (hours >= 22) return `${hours - 12}`
  if (hours % 12 > 9) return `${hours}`
  return `0${hours % 12}`
}

// ---------- utils end ----------
interface PeriodSelectorProps {
  period: Period
  setPeriod?: (m: Period) => void
  date?: Date | null
  onDateChange?: (date: Date | undefined) => void
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

const TimePeriodSelect = React.forwardRef<
  HTMLButtonElement,
  PeriodSelectorProps
>(
  (
    { period, setPeriod, date, onDateChange, onLeftFocus, onRightFocus },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowRight') onRightFocus?.()
      if (e.key === 'ArrowLeft') onLeftFocus?.()
    }

    const handleValueChange = (value: Period) => {
      setPeriod?.(value)

      /**
       * trigger an update whenever the user switches between AM and PM;
       * otherwise user must manually change the hour each time
       */
      if (date) {
        const tempDate = new Date(date)
        const hours = display12HourValue(date.getHours())
        onDateChange?.(
          setDateByType(
            tempDate,
            hours.toString(),
            '12hours',
            period === 'AM' ? 'PM' : 'AM'
          )
        )
      }
    }

    return (
      <div className="flex h-10 items-center">
        <Select
          defaultValue={period}
          onValueChange={(value: Period) => handleValueChange(value)}
        >
          <SelectTrigger
            ref={ref}
            className="focus:bg-accent focus:text-accent-foreground w-[65px]"
            onKeyDown={handleKeyDown}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  }
)

TimePeriodSelect.displayName = 'TimePeriodSelect'

interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType
  date?: Date | null
  onDateChange?: (date: Date | undefined) => void
  period?: Period
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = 'tel',
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      onDateChange,
      onChange,
      onKeyDown,
      picker,
      period,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false)
    const [prevIntKey, setPrevIntKey] = React.useState<string>('0')

    /**
     * allow the user to enter the second digit within 2 seconds
     * otherwise start again with entering first digit
     */
    React.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false)
        }, 2000)

        return () => clearTimeout(timer)
      }
    }, [flag])

    const calculatedValue = React.useMemo(() => {
      return getDateByType(date, picker)
    }, [date, picker])

    const calculateNewValue = (key: string) => {
      /*
       * If picker is '12hours' and the first digit is 0, then the second digit is automatically set to 1.
       * The second entered digit will break the condition and the value will be set to 10-12.
       */
      if (picker === '12hours') {
        if (flag && calculatedValue.slice(1, 2) === '1' && prevIntKey === '0')
          return `0${key}`
      }

      return !flag ? `0${key}` : calculatedValue.slice(1, 2) + key
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return
      e.preventDefault()
      if (e.key === 'ArrowRight') onRightFocus?.()
      if (e.key === 'ArrowLeft') onLeftFocus?.()
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        const step = e.key === 'ArrowUp' ? 1 : -1
        const newValue = getArrowByType(calculatedValue, step, picker)
        if (flag) setFlag(false)
        const tempDate = date ? new Date(date) : new Date()
        onDateChange?.(setDateByType(tempDate, newValue, picker, period))
      }
      if (e.key >= '0' && e.key <= '9') {
        if (picker === '12hours') setPrevIntKey(e.key)

        const newValue = calculateNewValue(e.key)
        if (flag) onRightFocus?.()
        setFlag((prev) => !prev)
        const tempDate = date ? new Date(date) : new Date()
        onDateChange?.(setDateByType(tempDate, newValue, picker, period))
      }
    }

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          'focus:bg-accent focus:text-accent-foreground w-[48px] text-center font-mono text-base tabular-nums caret-transparent [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        value={value || calculatedValue}
        onChange={(e) => {
          e.preventDefault()
          onChange?.(e)
        }}
        type={type}
        inputMode="decimal"
        onKeyDown={(e) => {
          onKeyDown?.(e)
          handleKeyDown(e)
        }}
        {...props}
      />
    )
  }
)

TimePickerInput.displayName = 'TimePickerInput'

interface TimePickerProps {
  date?: Date | null
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  hourCycle?: 12 | 24
  /**
   * Determines the smallest unit that is displayed in the datetime picker.
   * Default is 'second'.
   * */
  granularity?: Granularity
  dataHours?: { cy?: string; test?: string }
  dataMinutes?: { cy?: string; test?: string }
  dataSeconds?: { cy?: string; test?: string }
}

interface TimePickerRef {
  minuteRef: HTMLInputElement | null
  hourRef: HTMLInputElement | null
  secondRef: HTMLInputElement | null
}

const TimePicker = React.forwardRef<TimePickerRef, TimePickerProps>(
  (
    {
      date,
      onChange,
      disabled = false,
      hourCycle = 24,
      granularity = 'second',
      dataHours,
      dataMinutes,
      dataSeconds,
    },
    ref
  ) => {
    const minuteRef = React.useRef<HTMLInputElement>(null)
    const hourRef = React.useRef<HTMLInputElement>(null)
    const secondRef = React.useRef<HTMLInputElement>(null)
    const periodRef = React.useRef<HTMLButtonElement>(null)
    const [period, setPeriod] = React.useState<Period>(
      date && date.getHours() >= 12 ? 'PM' : 'AM'
    )

    useImperativeHandle(
      ref,
      () => ({
        minuteRef: minuteRef.current,
        hourRef: hourRef.current,
        secondRef: secondRef.current,
        periodRef: periodRef.current,
      }),
      [minuteRef, hourRef, secondRef]
    )
    return (
      <div className="flex items-center justify-center gap-2">
        <label htmlFor="datetime-picker-hour-input" className="cursor-pointer">
          <Clock className="mr-2 h-4 w-4" />
        </label>
        <TimePickerInput
          disabled={disabled}
          picker={hourCycle === 24 ? 'hours' : '12hours'}
          date={date}
          id="datetime-picker-hour-input"
          onDateChange={onChange}
          ref={hourRef}
          period={period}
          onRightFocus={() => minuteRef?.current?.focus()}
          className="h-8 text-sm"
          data-cy={dataHours?.cy}
          data-test={dataHours?.test}
        />
        {(granularity === 'minute' || granularity === 'second') && (
          <>
            :
            <TimePickerInput
              disabled={disabled}
              picker="minutes"
              date={date}
              onDateChange={onChange}
              ref={minuteRef}
              onLeftFocus={() => hourRef?.current?.focus()}
              onRightFocus={() => secondRef?.current?.focus()}
              className="h-8 text-sm"
              data-cy={dataMinutes?.cy}
              data-test={dataMinutes?.test}
            />
          </>
        )}
        {granularity === 'second' && (
          <>
            :
            <TimePickerInput
              disabled={disabled}
              picker="seconds"
              date={date}
              onDateChange={onChange}
              ref={secondRef}
              onLeftFocus={() => minuteRef?.current?.focus()}
              onRightFocus={() => periodRef?.current?.focus()}
              className="h-8 text-sm"
              data-cy={dataSeconds?.cy}
              data-test={dataSeconds?.test}
            />
          </>
        )}
        {hourCycle === 12 && (
          <div className="grid gap-1 text-center">
            <TimePeriodSelect
              period={period}
              setPeriod={setPeriod}
              date={date}
              onDateChange={(date) => {
                onChange?.(date)
                if (date && date?.getHours() >= 12) {
                  setPeriod('PM')
                } else {
                  setPeriod('AM')
                }
              }}
              ref={periodRef}
              onLeftFocus={() => secondRef?.current?.focus()}
            />
          </div>
        )}
      </div>
    )
  }
)
TimePicker.displayName = 'TimePicker'

type Granularity = 'day' | 'hour' | 'minute' | 'second'
type DateTimePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  onMonthChange?: (date: Date | undefined) => void
  disabled?: boolean
  /** showing `AM/PM` or not. */
  hourCycle?: 12 | 24
  placeholder?: string
  /**
   * The year range will be: `This year + yearRange` and `this year - yearRange`.
   * Default is 50.
   * For example:
   * This year is 2024, The year dropdown will be 1974 to 2024 which is generated by `2024 - 50 = 1974` and `2024 + 50 = 2074`.
   * */
  yearRange?: number
  // dayjs format string to display the date in the input field.
  displayFormat?: string
  /**
   * The granularity prop allows you to control the smallest unit that is displayed by DateTimePicker.
   * By default, the value is `second` which shows all time inputs.
   **/
  granularity?: Granularity
  className?: {
    trigger?: string
    input?: string
    label?: string
    tooltip?: string
    error?: string
  }
  /**
   * Show the default month and time when popup the calendar. Default is the current Date().
   **/
  defaultPopupValue?: Date
  dataTrigger?: { cy?: string; test?: string }
  dataCalendar?: { cy?: string; test?: string }
  dataHours?: { cy?: string; test?: string }
  dataMinutes?: { cy?: string; test?: string }
  dataSeconds?: { cy?: string; test?: string }
  dataNextMonth?: { cy?: string; test?: string }
  dataPreviousMonth?: { cy?: string; test?: string }
  error?: string
  hideError?: boolean
  isTouched?: boolean
  label?: string
  labelType?: 'small' | 'large'
  align?: 'start' | 'center' | 'end'
  required?: boolean
  tooltip?: string | React.ReactNode
} & Pick<
  DayPickerProps,
  'locale' | 'weekStartsOn' | 'showWeekNumber' | 'showOutsideDays'
>

type DateTimePickerRef = {
  value?: Date
} & Omit<HTMLButtonElement, 'value'>

/**
 * This component provides a date and time picker with optional label, error handling, and customizable display and granularity.
 *
 * @param value - The currently selected date value.
 * @param onChange - Callback function called when the date value changes.
 * @param onMonthChange - Callback function called when the displayed month changes.
 * @param disabled - Whether the picker is disabled.
 * @param hourCycle - Whether to use 12-hour or 24-hour time format.
 * @param placeholder - Placeholder text shown when no date is selected / the state is undefined.
 * @param yearRange - The range of years to display in the year dropdown, relative to the current year.
 * @param displayFormat - The dayjs format string to display the date in the input field.
 * @param granularity - The smallest unit displayed by the picker (e.g., 'second', 'minute', 'hour', 'day').
 * @param className - Optional object to override default styling for trigger, input, label, tooltip, and error.
 * @param defaultPopupValue - The default date and time shown when the calendar popup opens.
 * @param dataTrigger - Data attributes for testing the popover trigger.
 * @param dataCalendar - Data attributes for testing the calendar.
 * @param dataHours - Data attributes for testing the hours input.
 * @param dataMinutes - Data attributes for testing the minutes input.
 * @param dataSeconds - Data attributes for testing the seconds input.
 * @param dataNextMonth - Data attributes for testing the next month button.
 * @param dataPreviousMonth - Data attributes for testing the previous month button.
 * @param error - Error message to display.
 * @param hideError - Whether to hide the error message.
 * @param isTouched - Whether the picker has been interacted with.
 * @param label - The label for the picker.
 * @param labelType - The type of label to display ('small' or 'large').
 * @param align - The alignment of the label ('start', 'center', or 'end').
 * @param required - Whether the label should indicate a required field.
 * @param tooltip - Tooltip content shown with the label.
 * @param locale - The locale for date formatting and calendar display.
 * @param weekStartsOn - The day the week starts on in the calendar.
 * @param showWeekNumber - Whether to show the week number in the calendar.
 * @param showOutsideDays - Whether to show days from adjacent months in the calendar.
 * @returns Date and time picker component with optional label, error display, and customizable granularity and formatting.
 */
const DateTimePicker = React.forwardRef<
  Partial<DateTimePickerRef>,
  DateTimePickerProps
>(
  (
    {
      locale = enUS,
      defaultPopupValue = new Date(new Date().setHours(0, 0, 0, 0)),
      value,
      onChange,
      onMonthChange,
      hourCycle = 24,
      disabled = false,
      displayFormat,
      granularity = 'second',
      placeholder = 'Pick a date',
      error,
      hideError,
      isTouched,
      className,
      label,
      labelType = 'small',
      align = 'start',
      required = false,
      tooltip,
      ...props
    },
    ref
  ) => {
    const [month, setMonth] = React.useState<Date>(value ?? defaultPopupValue)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [displayDate, setDisplayDate] = React.useState<Date | undefined>(
      value ?? undefined
    )

    /**
     * Makes sure display date updates when value change on
     * parent component
     */
    React.useEffect(() => {
      setDisplayDate(value)
    }, [value])

    /**
     * carry over the current time when a user clicks a new day
     * instead of resetting to 00:00
     */
    const handleMonthChange = (newDay: Date | undefined) => {
      if (!newDay) {
        return
      }
      if (!defaultPopupValue) {
        newDay.setHours(
          month?.getHours() ?? 0,
          month?.getMinutes() ?? 0,
          month?.getSeconds() ?? 0
        )
        onMonthChange?.(newDay)
        setMonth(newDay)
        return
      }
      const diff = newDay.getTime() - defaultPopupValue.getTime()
      const diffInDays = diff / (1000 * 60 * 60 * 24)
      const newDateFull = add(defaultPopupValue, {
        days: Math.ceil(diffInDays),
      })
      newDateFull.setHours(
        month?.getHours() ?? 0,
        month?.getMinutes() ?? 0,
        month?.getSeconds() ?? 0
      )
      onMonthChange?.(newDateFull)
      setMonth(newDateFull)
    }

    const onSelect = (newDay?: Date) => {
      if (!newDay) {
        return
      }
      onChange?.(newDay)
      setMonth(newDay)
      setDisplayDate(newDay)
    }

    useImperativeHandle(
      ref,
      () => ({
        ...buttonRef.current,
        value: displayDate,
      }),
      [displayDate]
    )

    return (
      <Popover>
        <div
          className={twMerge(
            'flex w-[280px] flex-row',
            labelType === 'small' && 'flex-col',
            className?.trigger
          )}
        >
          {label && (
            <FormLabel
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
            <PopoverTrigger asChild disabled={disabled}>
              <Button
                variant="outline"
                type="button"
                disabled={disabled}
                className={cn(
                  'w-44 justify-start text-left text-base font-normal',
                  !displayDate && 'text-muted-foreground',
                  !!error &&
                    isTouched &&
                    'border-destructive bg-destructive-background',
                  className?.input
                )}
                ref={buttonRef}
                data-cy={props.dataTrigger?.cy}
                data-test={props.dataTrigger?.test}
              >
                <FontAwesomeIcon icon={faCalendar} className="mr-2.5 h-4 w-4" />
                {displayDate ? (
                  dayjs(displayDate).format(
                    displayFormat ?? 'DD.MM.YYYY, HH:mm'
                  )
                ) : (
                  <span>{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            {error && !hideError && isTouched && (
              <Tooltip
                tooltip={error}
                delay={0}
                className={{
                  tooltip: twMerge('max-w-120 text-sm', className?.error),
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-destructive mr-1"
                />
              </Tooltip>
            )}
          </div>
        </div>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            mode="single"
            disabled={disabled}
            selected={displayDate}
            month={month}
            onSelect={(newDate) => {
              if (newDate) {
                newDate.setHours(
                  month?.getHours() ?? 0,
                  month?.getMinutes() ?? 0,
                  month?.getSeconds() ?? 0
                )
                onSelect(newDate)
              }
            }}
            onMonthChange={handleMonthChange}
            locale={locale}
            dataNextMonth={props.dataNextMonth}
            dataPreviousMonth={props.dataPreviousMonth}
            data-cy={props.dataCalendar?.cy}
            data-test={props.dataCalendar?.test}
            {...props}
          />
          {granularity !== 'day' && (
            <div className="border-border border-t p-3">
              <TimePicker
                disabled={disabled}
                onChange={(value) => {
                  onChange?.(value)
                  setDisplayDate(value)
                  if (value) {
                    setMonth(value)
                  }
                }}
                date={month}
                hourCycle={hourCycle}
                granularity={granularity}
                dataHours={props.dataHours}
                dataMinutes={props.dataMinutes}
                dataSeconds={props.dataSeconds}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    )
  }
)

DateTimePicker.displayName = 'DateTimePicker'

export { DateTimePicker, TimePicker, TimePickerInput }
export type { DateTimePickerProps, DateTimePickerRef, TimePickerType }
