import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'
import NumberField from './NumberField'

export interface FormikNumberFieldProps {
  id?: string
  name: string
  data?: {
    cy?: string
    test?: string
  }
  label?: string
  placeholder?: string
  tooltip?: string
  required?: boolean
  hideError?: boolean
  precision?: number
  disabled?: boolean
  className?: {
    root?: string
    field?: string
    label?: string
    input?: string
    error?: string
  }
}

/**
 * This function returns a text field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param label - The optional label is shown next to the field in the form.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param precision - The optional precision defines the number of decimal places that are allowed.
 * @param disabled - Disables the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export function FormikNumberField({
  id,
  data,
  name,
  label,
  placeholder,
  tooltip,
  required = false,
  hideError = false,
  precision,
  disabled = false,
  className,
  ...props
}: FormikNumberFieldProps) {
  const [field, meta, helpers] = useField(name)

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
        <NumberField
          id={id}
          data={data}
          value={field.value}
          onChange={(newValue) => helpers.setValue(newValue)}
          onBlur={() => helpers.setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          precision={
            typeof precision !== 'undefined' ? Math.round(precision) : undefined
          }
          className={{
            input: twMerge(
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            ),
          }}
        />
      </div>
      {!hideError && meta.touched && meta.error && (
        <div
          className={twMerge(
            'w-full text-sm text-right text-red-400',
            className?.error
          )}
        >
          {meta.error}
        </div>
      )}
    </div>
  )
}

export default FormikNumberField
