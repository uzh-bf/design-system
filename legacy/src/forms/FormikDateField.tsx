import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface DateFieldProps {
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
  disabled?: boolean
  className?: {
    root?: string
    field?: string
    label?: string
    input?: string
    error?: string
  }
  name: string
  [key: string]: any
}

/**
 * This function returns a date field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The optional label is shown next to the field in the form.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date field component with Formik state management.
 */
export function FormikDateField({
  id,
  data,
  name,
  label,
  placeholder,
  tooltip,
  required = false,
  hideError = false,
  disabled = false,
  className,
  ...props
}: DateFieldProps) {
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

        <input
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          type="datetime-local"
          value={field.value}
          onChange={(e) => {
            if (e.target['validity'].valid) {
              helpers.setValue(e.target['value'])
            }
          }}
          onBlur={() => helpers.setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={twMerge(
            'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9',
            disabled && 'cursor-not-allowed text-uzh-grey-100',
            meta.error && meta.touched && 'border-red-400 bg-red-50',
            className?.input
          )}
          {...props}
        />
      </div>
      {!hideError && meta.error && (
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

export default FormikDateField
