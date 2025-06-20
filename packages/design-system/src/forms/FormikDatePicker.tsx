'use client'

import { useField } from 'formik'
import DatePicker, { DatePickerProps } from '../DatePicker'

export interface FormikDatePickerProps
  extends Omit<
    DatePickerProps,
    'date' | 'onDateChange' | 'error' | 'isTouched'
  > {
  name: string
}

/**
 * This component provides a simple date changer with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param id - The id of the date changer
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The label of the date changer
 * @param labelType - The type of the label (small or large)
 * @param placeholder - The placeholder of the date changer (is only shown if no date is selected)
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
 * @param disabled - Whether the date changer is disabled or not
 * @param hideError - Whether the error message should be hidden
 * @param format - The format of the date when the edit mode is not active (then the display is up to the browser implementation)
 * @param className - The optional className object allows you to override the default styling.
 * @param onDateChange - The function to be called when the date is changed (state management)
 * @param dataTrigger - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the popover trigger
 * @param dataCalendar - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the calendar
 * @param dataNextMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the next month button
 * @param dataPreviousMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the previous month button
 * @returns Date changer component with optional label, edit button and save button.
 */
export function FormikDatePicker({
  id,
  name,
  label = '',
  labelType = 'small',
  placeholder,
  tooltip,
  required = false,
  disabled = false,
  hideError = false,
  className,
  dataTrigger,
  dataCalendar,
  dataNextMonth,
  dataPreviousMonth,
  ...props
}: FormikDatePickerProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <DatePicker
      id={id}
      date={field.value}
      onDateChange={async (newValue) => {
        await helpers.setValue(newValue)
        await helpers.setTouched(true)
      }}
      label={label}
      labelType={labelType}
      placeholder={placeholder}
      tooltip={tooltip}
      required={required}
      disabled={disabled}
      error={meta.error}
      hideError={hideError}
      isTouched={meta.touched}
      className={className}
      dataTrigger={dataTrigger}
      dataCalendar={dataCalendar}
      dataNextMonth={dataNextMonth}
      dataPreviousMonth={dataPreviousMonth}
      {...props}
    />
  )
}

export default FormikDatePicker
