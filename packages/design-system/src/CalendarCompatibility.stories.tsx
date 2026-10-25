import { arSA, de, enUS, faIR } from 'date-fns/locale'
import { Formik, useFormikContext } from 'formik'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  DayButton,
  DayPicker,
  TZDate,
  type DateLib,
  type DateRange,
  type DayPickerProps,
} from 'react-day-picker'
import { useForm } from 'react-hook-form'

import { Calendar, CalendarDayButton } from './Calendar'
import { DatePicker } from './DatePicker'
import { DateTimePicker } from './DatetimePicker'
import FormikDatePicker from './forms/FormikDatePicker'
import FormikDatetimePicker from './forms/FormikDatetimePicker'
import { Button } from './primitives'
import { Form, RhfDatetimePicker } from './react-hook-form'

export default { title: 'Calendar compatibility' }

const OCTOBER_2026 = new Date(2026, 9, 1, 12)
const OCTOBER_15 = new Date(2026, 9, 15, 12)
const FIXED_INSTANT = Date.UTC(2026, 9, 15, 2, 30)

function Surface({ children }: { children: ReactNode }) {
  return (
    <main className="bg-background text-foreground min-h-screen w-full max-w-full p-4 pt-16">
      <div className="mx-auto grid w-full max-w-6xl gap-6">{children}</div>
    </main>
  )
}

type CalendarLocale = DayPickerProps['locale']

function LocaleCalendar({
  label,
  test,
  locale,
  dir,
}: {
  label: string
  test: string
  locale?: CalendarLocale
  dir?: DayPickerProps['dir']
}) {
  return (
    <section className="max-w-full min-w-0" aria-label={label}>
      <h2 className="mb-2 text-sm font-semibold">{label}</h2>
      <Calendar
        aria-label={`${label} calendar`}
        labels={{ labelNav: () => `${label} navigation` }}
        captionLayout="dropdown"
        data={{ test }}
        defaultMonth={OCTOBER_2026}
        dir={dir}
        locale={locale}
        mode="single"
        selected={OCTOBER_15}
      />
    </section>
  )
}

type FormatterCall = {
  argumentCount: number
  dateIsDate: boolean
  dateLibFormat: string
  dateLibLocale: string | undefined
  month: number
  output: string
}

type CalendarWindow = Window & {
  __calendarCompatibilityFormatter?: FormatterCall[]
}

function formatterWithArguments(date: Date, dateLib?: DateLib) {
  const calendarWindow = window as CalendarWindow
  calendarWindow.__calendarCompatibilityFormatter ??= []
  const output = dateLib?.format(date, 'MMMM') ?? String(date.getMonth())
  calendarWindow.__calendarCompatibilityFormatter.push({
    argumentCount: arguments.length,
    dateIsDate: date instanceof Date,
    dateLibFormat: typeof dateLib?.format,
    dateLibLocale: dateLib?.options.locale?.code,
    month: date.getMonth(),
    output,
  })
  return output
}

const CustomDayContext = createContext<{
  buttonRef: RefObject<HTMLButtonElement | null>
  onDayClick: (day: string) => void
} | null>(null)

function CustomDayButton({
  day,
  modifiers,
  ...buttonProps
}: ComponentProps<typeof DayButton>) {
  const customDay = useContext(CustomDayContext)
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])
  return (
    <button
      {...buttonProps}
      ref={(node) => {
        ref.current = node
        if (modifiers.selected && customDay) customDay.buttonRef.current = node
      }}
      data-custom-day="true"
      onClick={(event) => {
        customDay?.onDayClick(day.isoDate)
        buttonProps.onClick?.(event)
      }}
    />
  )
}

function CustomDayFixture() {
  const [selected, setSelected] = useState<Date | undefined>(OCTOBER_15)
  const [clicked, setClicked] = useState('')
  const customDayRef = useRef<HTMLButtonElement>(null)

  return (
    <section className="max-w-full min-w-0" aria-label="Caller components">
      <h2 className="mb-2 text-sm font-semibold">Caller formatter and day</h2>
      <div className="flex max-w-full flex-wrap items-start gap-4">
        <Calendar
          aria-label="Caller formatter calendar"
          labels={{ labelNav: () => 'Caller formatter calendar navigation' }}
          captionLayout="dropdown"
          data={{ test: 'calendar-formatter' }}
          defaultMonth={OCTOBER_2026}
          formatters={{ formatMonthDropdown: formatterWithArguments }}
          locale={de}
          mode="single"
          selected={OCTOBER_15}
        />
        <div className="grid min-w-0 gap-2">
          <CustomDayContext.Provider
            value={{ buttonRef: customDayRef, onDayClick: setClicked }}
          >
            <Calendar
              aria-label="Caller day button calendar"
              components={{ DayButton: CustomDayButton }}
              data={{ test: 'calendar-custom-day' }}
              defaultMonth={OCTOBER_2026}
              labels={{
                labelNav: () => 'Caller day navigation',
                labelDayButton: (date) => `Caller day ${date.getDate()}`,
              }}
              locale={enUS}
              mode="single"
              onSelect={setSelected}
              selected={selected}
            />
          </CustomDayContext.Provider>
          <DayPicker
            aria-label="Direct DayPicker composition"
            labels={{
              labelNav: () => 'Direct DayPicker composition navigation',
            }}
            className="[--cell-size:34px]"
            data-direct-calendar="true"
            components={{
              DayButton: (props) => (
                <CalendarDayButton locale={de} {...props} />
              ),
            }}
            defaultMonth={OCTOBER_2026}
            locale={de}
            mode="single"
            selected={OCTOBER_15}
          />
          <output
            className="min-w-0 text-xs [overflow-wrap:anywhere]"
            data-test="custom-day-clicked"
          >
            {clicked}
          </output>
          <output
            className="min-w-0 text-xs [overflow-wrap:anywhere]"
            data-test="custom-day-selected"
          >
            {selected?.getTime() ?? 'empty'}
          </output>
          <Button
            type="button"
            data-test="focus-custom-day-ref"
            onClick={() => customDayRef.current?.focus()}
          >
            Focus stored custom day ref
          </Button>
        </div>
      </div>
    </section>
  )
}

export const LocaleAndOverrides = () => (
  <Surface>
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <LocaleCalendar label="Host locale" test="calendar-host" />
      <LocaleCalendar label="English locale" test="calendar-en" locale={enUS} />
      <LocaleCalendar label="German locale" test="calendar-de" locale={de} />
      <LocaleCalendar
        label="Arabic locale"
        test="calendar-ar"
        locale={arSA}
        dir="rtl"
      />
      <LocaleCalendar
        label="Persian locale, Gregorian dates"
        test="calendar-fa"
        locale={faIR}
        dir="rtl"
      />
    </div>
    <CustomDayFixture />
  </Surface>
)

export const BoundsAndNavigation = () => (
  <Surface>
    <div className="grid min-w-0 gap-6 lg:grid-cols-3">
      <section aria-label="Clock default month">
        <h2 className="mb-2 text-sm font-semibold">Clock default month</h2>
        <Calendar
          aria-label="Clock default month calendar"
          labels={{ labelNav: () => 'Clock default month calendar navigation' }}
          captionLayout="dropdown"
          data={{ test: 'default-month' }}
          mode="single"
        />
      </section>
      <section aria-label="Default bounds">
        <h2 className="mb-2 text-sm font-semibold">Default bounds</h2>
        <Calendar
          aria-label="bounds-default calendar"
          labels={{ labelNav: () => 'bounds-default navigation' }}
          captionLayout="dropdown"
          data={{ test: 'bounds-default' }}
          defaultMonth={new Date(2026, 0, 15, 12)}
          mode="single"
        />
      </section>
      <section aria-label="Explicit bounds">
        <h2 className="mb-2 text-sm font-semibold">Explicit bounds</h2>
        <Calendar
          aria-label="Explicit bounds calendar"
          labels={{ labelNav: () => 'Explicit bounds calendar navigation' }}
          captionLayout="dropdown"
          data={{ test: 'bounds-explicit' }}
          defaultMonth={new Date(2026, 0, 15, 12)}
          endMonth={new Date(2028, 11)}
          mode="single"
          startMonth={new Date(2020, 0)}
        />
      </section>
    </div>
    <PickerBoundsFixture />
  </Surface>
)

function PickerBoundsFixture() {
  const year = new Date().getFullYear()
  const initial = new Date(year, 9, 15, 14, 35, 10)
  const [range, setRange] = useState('2')
  const [value, setValue] = useState<Date | undefined>(initial)
  const [changes, setChanges] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const [invalid, setInvalid] = useState(false)
  const form = useForm<{ datetime: Date | undefined }>({
    defaultValues: { datetime: undefined },
  })
  const ranges: Record<string, number | undefined> = {
    '2': 2,
    '0': 0,
    fraction: 2.9,
    capped: 1000,
    negative: -1,
    nan: NaN,
    infinity: Infinity,
    omitted: undefined,
  }
  const yearRange = ranges[range]
  return (
    <section aria-label="Picker navigation bounds" className="grid gap-4">
      <h2 className="text-sm font-semibold">Picker navigation bounds</h2>
      <label className="grid max-w-xs gap-1">
        Years before and after this year
        <select
          data-test="picker-year-range"
          value={range}
          onChange={(event) => setRange(event.target.value)}
        >
          {Object.keys(ranges).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap gap-3">
        <Button
          data-test="picker-bounds-outside"
          onClick={() => setValue(new Date(year - 8, 9, 15, 14, 35, 10))}
        >
          Set a date outside the navigation window
        </Button>
        <Button
          data-test="picker-bounds-clear"
          onClick={() => {
            setValue(undefined)
            setResetKey((key) => key + 1)
          }}
        >
          Clear the date
        </Button>
        <Button
          data-test="picker-bounds-reset"
          onClick={() => setValue(initial)}
        >
          Reset the date
        </Button>
        <Button
          data-test="picker-bounds-invalid"
          onClick={() => {
            setInvalid((state) => !state)
            if (invalid) form.clearErrors('datetime')
            else
              form.setError('datetime', {
                type: 'manual',
                message: 'Choose a date',
              })
          }}
        >
          Toggle validation
        </Button>
      </div>
      <div className="flex flex-wrap gap-6">
        <DateTimePicker
          label="Bounded date and time"
          value={value}
          resetKey={resetKey}
          yearRange={yearRange}
          defaultPopupValue={new Date(year + 8, 9, 15, 14, 35, 10)}
          aria-invalid={invalid}
          dataTrigger={{ test: 'picker-bounds-trigger' }}
          dataCalendar={{ test: 'picker-bounds-calendar' }}
          onChange={(date) => {
            setValue(date)
            setChanges((count) => count + 1)
          }}
        />
        <DatePicker
          label="Empty date"
          aria-invalid={invalid}
          dataTrigger={{ test: 'picker-empty-date' }}
        />
        <Form {...form}>
          <RhfDatetimePicker
            control={form.control}
            name="datetime"
            label="RHF date and time"
            yearRange={yearRange}
            dataTrigger={{ test: 'picker-rhf-trigger' }}
            dataCalendar={{ test: 'picker-rhf-calendar' }}
          />
        </Form>
        <Formik
          initialValues={{ datetime: initial }}
          onSubmit={() => undefined}
        >
          <FormikDatetimePicker
            name="datetime"
            label="Formik date and time"
            yearRange={yearRange}
            dataTrigger={{ test: 'picker-formik-trigger' }}
            dataCalendar={{ test: 'picker-formik-calendar' }}
          />
        </Formik>
      </div>
      <output data-test="picker-bounds-value">
        {JSON.stringify(serializeDate(value))}
      </output>
      <output data-test="picker-bounds-changes">{changes}</output>
    </section>
  )
}

function SelectionFixture() {
  const [single, setSingle] = useState<Date | undefined>(OCTOBER_15)
  const [multiple, setMultiple] = useState<Date[] | undefined>([
    new Date(2026, 9, 10, 12),
    new Date(2026, 9, 12, 12),
  ])
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-3">
      <section aria-label="Single selection">
        <h2 className="mb-2 text-sm font-semibold">Single and disabled</h2>
        <Calendar
          aria-label="Single selection calendar"
          labels={{ labelNav: () => 'Single selection calendar navigation' }}
          data={{ test: 'calendar-single' }}
          defaultMonth={OCTOBER_2026}
          disabled={[
            { before: new Date(2026, 9, 1) },
            new Date(2026, 9, 20, 12),
          ]}
          mode="single"
          onSelect={setSingle}
          selected={single}
        />
        <output
          className="min-w-0 text-xs [overflow-wrap:anywhere]"
          data-test="single-value"
        >
          {single?.toISOString() ?? 'empty'}
        </output>
      </section>
      <section aria-label="Multiple selection">
        <h2 className="mb-2 text-sm font-semibold">Multiple</h2>
        <Calendar
          aria-label="Multiple selection calendar"
          labels={{ labelNav: () => 'Multiple selection calendar navigation' }}
          data={{ test: 'calendar-multiple' }}
          defaultMonth={OCTOBER_2026}
          mode="multiple"
          onSelect={setMultiple}
          selected={multiple}
        />
        <output
          className="min-w-0 text-xs [overflow-wrap:anywhere]"
          data-test="multiple-value"
        >
          {JSON.stringify(multiple?.map((date) => date.getTime()) ?? [])}
        </output>
      </section>
      <section aria-label="Range selection">
        <h2 className="mb-2 text-sm font-semibold">Range</h2>
        <Calendar
          aria-label="Range selection calendar"
          labels={{ labelNav: () => 'Range selection calendar navigation' }}
          data={{ test: 'calendar-range' }}
          defaultMonth={OCTOBER_2026}
          mode="range"
          onSelect={setRange}
          selected={range}
        />
        <output
          className="min-w-0 text-xs [overflow-wrap:anywhere]"
          data-test="range-value"
        >
          {JSON.stringify({
            from: range?.from?.getTime() ?? null,
            to: range?.to?.getTime() ?? null,
          })}
        </output>
      </section>
    </div>
  )
}

export const SelectionAndGridHooks = () => (
  <Surface>
    <SelectionFixture />
    <section aria-label="Grid class hooks">
      <h2 className="mb-2 text-sm font-semibold">Grid class hooks</h2>
      <div className="grid min-w-0 gap-6 lg:grid-cols-3">
        <Calendar
          aria-label="Legacy grid calendar"
          labels={{ labelNav: () => 'Legacy grid calendar navigation' }}
          classNames={{ table: 'grid-legacy-only' }}
          data={{ test: 'grid-legacy' }}
          defaultMonth={OCTOBER_2026}
          mode="single"
        />
        <Calendar
          aria-label="Canonical grid calendar"
          labels={{ labelNav: () => 'Canonical grid calendar navigation' }}
          classNames={{ month_grid: 'grid-canonical-only' }}
          data={{ test: 'grid-canonical' }}
          defaultMonth={OCTOBER_2026}
          mode="single"
        />
        <Calendar
          aria-label="Both grid hooks calendar"
          labels={{ labelNav: () => 'Both grid hooks calendar navigation' }}
          classNames={{
            month_grid: 'grid-canonical-wins',
            table: 'grid-legacy-loses',
          }}
          data={{ test: 'grid-both' }}
          defaultMonth={OCTOBER_2026}
          mode="single"
        />
      </div>
    </section>
  </Surface>
)

function TimeZoneFixture() {
  const utcInitial = new TZDate(FIXED_INSTANT, 'UTC')
  const kiritimatiInitial = new TZDate(FIXED_INSTANT, 'Pacific/Kiritimati')
  const [utcValue, setUtcValue] = useState<Date | undefined>(utcInitial)
  const [kiritimatiValue, setKiritimatiValue] = useState<Date | undefined>(
    kiritimatiInitial
  )

  return (
    <section aria-label="Time zones" className="min-w-0">
      <h2 className="mb-2 text-sm font-semibold">Time zones</h2>
      <output
        className="min-w-0 text-xs [overflow-wrap:anywhere]"
        data-test="browser-time-zone"
      >
        {Intl.DateTimeFormat().resolvedOptions().timeZone}
      </output>
      <output
        className="min-w-0 text-xs [overflow-wrap:anywhere]"
        data-test="host-instant-day"
      >
        {new Date(FIXED_INSTANT).toLocaleDateString('en-CA', {
          timeZone: 'America/Los_Angeles',
        })}
      </output>
      <div className="mt-3 grid min-w-0 gap-6 lg:grid-cols-2">
        <section aria-label="UTC calendar">
          <h3 className="mb-2 text-sm font-semibold">UTC</h3>
          <Calendar
            aria-label="UTC calendar"
            labels={{ labelNav: () => 'UTC calendar navigation' }}
            data={{ test: 'calendar-utc' }}
            defaultMonth={utcInitial}
            mode="single"
            onSelect={setUtcValue}
            selected={utcValue}
            timeZone="UTC"
            startMonth={new TZDate(2026, 0, 1, 'UTC')}
            endMonth={new TZDate(2027, 0, 1, 'UTC')}
          />
          <output
            className="min-w-0 text-xs [overflow-wrap:anywhere]"
            data-test="utc-value"
          >
            {utcValue?.getTime() ?? 'empty'}
          </output>
          <output
            className="min-w-0 text-xs [overflow-wrap:anywhere]"
            data-test="utc-display"
          >
            {utcValue?.toLocaleDateString('en-CA', { timeZone: 'UTC' }) ??
              'empty'}
          </output>
        </section>
        <section aria-label="Kiritimati calendar">
          <h3 className="mb-2 text-sm font-semibold">Pacific/Kiritimati</h3>
          <Calendar
            aria-label="Kiritimati calendar"
            labels={{ labelNav: () => 'Kiritimati calendar navigation' }}
            data={{ test: 'calendar-kiritimati' }}
            defaultMonth={kiritimatiInitial}
            mode="single"
            onSelect={setKiritimatiValue}
            selected={kiritimatiValue}
            timeZone="Pacific/Kiritimati"
            startMonth={new TZDate(2026, 0, 1, 'Pacific/Kiritimati')}
            endMonth={new TZDate(2027, 0, 1, 'Pacific/Kiritimati')}
          />
          <output
            className="min-w-0 text-xs [overflow-wrap:anywhere]"
            data-test="kiritimati-value"
          >
            {kiritimatiValue?.getTime() ?? 'empty'}
          </output>
          <output
            className="min-w-0 text-xs [overflow-wrap:anywhere]"
            data-test="kiritimati-display"
          >
            {kiritimatiValue?.toLocaleDateString('en-CA', {
              timeZone: 'Pacific/Kiritimati',
            }) ?? 'empty'}
          </output>
        </section>
      </div>
      <Button
        type="button"
        className="mt-3"
        data-test="reset-time-zones"
        onClick={() => {
          setUtcValue(utcInitial)
          setKiritimatiValue(kiritimatiInitial)
        }}
      >
        Reset timezone selections
      </Button>
    </section>
  )
}

export const DirectionAndTimezone = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 9, 12),
    to: new Date(2026, 9, 18),
  })
  return (
    <Surface>
      <section aria-label="Right to left navigation" className="min-w-0">
        <h2 className="mb-2 text-sm font-semibold">Right to left arrows</h2>
        <Calendar
          aria-label="Right to left calendar"
          labels={{ labelNav: () => 'Right to left calendar navigation' }}
          data={{ test: 'calendar-rtl' }}
          defaultMonth={OCTOBER_2026}
          dir="rtl"
          locale={enUS}
          mode="range"
          onSelect={setRange}
          selected={range}
        />
      </section>
      <TimeZoneFixture />
    </Surface>
  )
}

type FormValues = {
  date: Date | undefined
  datetime: Date | undefined
}

const FORM_INITIAL: FormValues = {
  date: new Date(2026, 9, 12, 12),
  datetime: new Date(2026, 9, 12, 14, 35, 10),
}

function serializeDate(date: Date | undefined) {
  return date
    ? {
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        month: date.getMonth(),
        timestamp: date.getTime(),
        year: date.getFullYear(),
      }
    : null
}

function FormikPickersFixture() {
  const [pickersDisabled, setPickersDisabled] = useState(false)

  return (
    <Formik
      initialValues={FORM_INITIAL}
      onSubmit={() => undefined}
      validate={(values) => {
        const errors: Partial<Record<keyof FormValues, string>> = {}
        if (!values.date) errors.date = 'Date is required'
        if (!values.datetime) errors.datetime = 'Date and time are required'
        return errors
      }}
    >
      <FormikFields
        disabled={pickersDisabled}
        onToggleDisabled={() => setPickersDisabled((disabled) => !disabled)}
      />
    </Formik>
  )
}

function FormikFields({
  disabled,
  onToggleDisabled,
}: {
  disabled: boolean
  onToggleDisabled: () => void
}) {
  const formik = useFormikContext<FormValues>()
  const [locale, setLocale] = useState<DayPickerProps['locale']>(de)
  const setEmptyInvalid = () => {
    void formik.setValues({ date: undefined, datetime: undefined }, false)
    formik.setErrors({
      date: 'Date is required',
      datetime: 'Date and time are required',
    })
    void formik.setTouched({ date: true, datetime: true }, false)
  }

  const reset = () => {
    formik.resetForm()
    if (disabled) onToggleDisabled()
  }

  return (
    <div className="grid min-w-0 gap-4">
      <div data-test="formik-fields" className="grid min-w-0 gap-4">
        <FormikDatePicker
          aria-invalid={Boolean(formik.touched.date && formik.errors.date)}
          dataCalendar={{ test: 'formik-date-calendar' }}
          dataTrigger={{ test: 'formik-date-trigger' }}
          disabled={disabled}
          label="Date"
          name="date"
          required
        />
        <FormikDatetimePicker
          aria-invalid={Boolean(
            formik.touched.datetime && formik.errors.datetime
          )}
          dataCalendar={{ test: 'formik-datetime-calendar' }}
          dataHours={{ test: 'formik-datetime-hours' }}
          dataMinutes={{ test: 'formik-datetime-minutes' }}
          dataSeconds={{ test: 'formik-datetime-seconds' }}
          dataTrigger={{ test: 'formik-datetime-trigger' }}
          disabled={disabled}
          label="Date and time"
          defaultPopupValue={FORM_INITIAL.datetime}
          locale={locale}
          name="datetime"
          required
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          data-test="formik-empty-invalid"
          onClick={setEmptyInvalid}
        >
          Set empty invalid values
        </Button>
        <Button
          type="button"
          data-test="formik-default-locale"
          onClick={() => setLocale(undefined)}
        >
          Use default picker locale
        </Button>
        <Button type="button" data-test="formik-reset" onClick={reset}>
          Reset form
        </Button>
        <Button
          type="button"
          data-test="formik-toggle-disabled"
          onClick={onToggleDisabled}
        >
          Toggle disabled
        </Button>
      </div>
      <output
        className="min-w-0 text-xs [overflow-wrap:anywhere]"
        data-test="formik-date-value"
      >
        {JSON.stringify(serializeDate(formik.values.date))}
      </output>
      <output
        className="min-w-0 text-xs [overflow-wrap:anywhere]"
        data-test="formik-datetime-value"
      >
        {JSON.stringify(serializeDate(formik.values.datetime))}
      </output>
      <output
        className="min-w-0 text-xs [overflow-wrap:anywhere]"
        data-test="formik-state"
      >
        {JSON.stringify({
          disabled,
          errors: formik.errors,
          touched: formik.touched,
        })}
      </output>
    </div>
  )
}

export const FormikPickers = () => (
  <Surface>
    <section
      aria-label="Formik date pickers"
      className="w-full max-w-md min-w-0"
    >
      <h2 className="mb-2 text-sm font-semibold">Formik fields</h2>
      <FormikPickersFixture />
    </section>
  </Surface>
)
