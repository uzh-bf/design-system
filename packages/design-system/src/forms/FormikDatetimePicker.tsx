import { useField } from 'formik'
import { DateTimePicker, DateTimePickerProps } from '../DatetimePicker'

export interface FormikDatetimePickerProps
  extends Omit<
    DateTimePickerProps,
    'date' | 'onDateChange' | 'error' | 'isTouched'
  > {
  name: string
}

/**
 * This component provides a simple datetime picker with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The label of the datetime picker.
 * @param labelType - The type of the label (small or large).
 * @param placeholder - The placeholder of the datetime picker (is only shown if no date is selected).
 * @param tooltip - The tooltip of the datetime picker (is only shown if a label is given).
 * @param required - Whether the datetime label should contain a required symbol.
 * @param disabled - Whether the datetime picker is disabled or not.
 * @param hideError - Whether the error message should be hidden.
 * @param className - The optional className object allows you to override the default styling.
 * @param dataTrigger - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the popover trigger.
 * @param dataHours - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the hours input.
 * @param dataMinutes - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the minutes input.
 * @param dataSeconds - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the seconds input.
 * @param dataPreviousMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the previous month button.
 * @param dataNextMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the next month button.
 * @returns Datetime picker component with optional label, edit button and save button.
 */
export function FormikDatetimePicker({
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
  dataHours,
  dataMinutes,
  dataSeconds,
  dataPreviousMonth,
  dataNextMonth,
  ...props
}: FormikDatetimePickerProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <DateTimePicker
      value={field.value}
      onChange={async (newValue) => {
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
      dataHours={dataHours}
      dataMinutes={dataMinutes}
      dataSeconds={dataSeconds}
      dataPreviousMonth={dataPreviousMonth}
      dataNextMonth={dataNextMonth}
      {...props}
    />
  )
}

export default FormikDatetimePicker
