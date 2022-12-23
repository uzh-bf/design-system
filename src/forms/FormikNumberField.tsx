import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface NumberFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label?: string
  placeholder?: string
  tooltip?: string
  required?: boolean
  hideError?: boolean
  allowDecimals?: boolean
  className?: {
    root?: string
    field?: string
    label?: string
    input?: string
    error?: string
  }
}

// type structure ensures that either a name or a value and onChange function are passed
export interface NumberFieldWithNameProps extends NumberFieldProps {
  name: string
  value?: never
  onChange?: never
  [key: string]: any
}
export interface NumberFieldWithOnChangeProps extends NumberFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
  [key: string]: any
}

const defaultProps = {
  id: undefined,
  data: undefined,
  label: undefined,
  placeholder: undefined,
  tooltip: undefined,
  required: false,
  hideError: false,
  allowDecimals: false,
  className: undefined,
}

/**
 * This function returns a text field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param value - The value of the field. This is used to manage the state internally. If no name is provided, this field is required.
 * @param onChange - The onChange function is called when the value of the field changes. This is used to manage the state internally. If no name is provided, this field is required.
 * @param label - The optional label is shown next to the field in the form.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param allowDecimals - Allow the user to enter decimal numbers instead of only integers
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export function FormikNumberField({
  id,
  data,
  name,
  value,
  onChange,
  label,
  placeholder,
  tooltip,
  required,
  hideError,
  allowDecimals,
  className,
  ...props
}: NumberFieldWithNameProps | NumberFieldWithOnChangeProps) {
  const [field, meta, helpers] = useField(name || 'missing')

  return (
    <div className={twMerge('flex flex-col', className?.root)}>
      <div className={twMerge('flex flex-row w-full', className?.field)}>
        {label && (
          <Label
            forId={id}
            required={required}
            label={label}
            className={{
              root: twMerge(
                'my-auto mr-2 font-bold min-w-max',
                className?.label
              ),
              tooltip: 'text-sm font-normal',
            }}
            tooltip={tooltip}
            showTooltipSymbol={typeof tooltip !== 'undefined'}
          />
        )}
        {name && (
          <input
            {...field}
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            type="text"
            value={field.value}
            onChange={(e) =>
              allowDecimals
                ? helpers.setValue(e.target.value.replace(/[^0-9.]/g, ''))
                : helpers.setValue(e.target.value.replace(/[^0-9]/g, ''))
            }
            placeholder={placeholder}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
        )}
        {typeof value !== 'undefined' && onChange && (
          <input
            {...field}
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            type="text"
            value={value}
            onChange={(e) =>
              allowDecimals
                ? onChange(e.target.value.replace(/[^0-9.]/g, ''))
                : onChange(e.target.value.replace(/[^0-9]/g, ''))
            }
            placeholder={placeholder}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
        )}
      </div>
      {!hideError && meta.touched && meta.error ? (
        <div
          className={twMerge(
            'w-full text-sm text-right text-red-400',
            className?.error
          )}
        >
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

FormikNumberField.defaultProps = defaultProps
export default FormikNumberField
