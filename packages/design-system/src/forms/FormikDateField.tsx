import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import { Tooltip } from '../Tooltip'

export interface FormikDateFieldProps {
  id?: string
  name: string
  data?: {
    cy?: string
    test?: string
  }
  label?: string
  labelType?: 'small' | 'large'
  placeholder?: string
  tooltip?: string | React.ReactNode
  required?: boolean
  hideError?: boolean
  touchedOnChange?: boolean
  disabled?: boolean
  className?: {
    root?: string
    field?: string
    label?: string
    input?: string
    error?: string
    tooltip?: string
  }
  [key: string]: unknown
}

/**
 * This function returns a date field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param touchedOnChange - Indicate whether the field should be marked as touched on change.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date field component with Formik state management.
 */
export function FormikDateField({
  id,
  data,
  name,
  label,
  labelType = 'small',
  placeholder,
  tooltip,
  required = false,
  hideError = false,
  touchedOnChange = false,
  disabled = false,
  className,
  ...props
}: FormikDateFieldProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <div className={twMerge('w-max', className?.root)}>
      <div
        className={twMerge(
          'flex w-full flex-row',
          labelType === 'small' && 'flex-col',
          className?.field
        )}
      >
        {label && (
          <FormLabel
            id={id}
            required={required}
            label={label}
            labelType={labelType}
            tooltip={tooltip}
            className={className}
          />
        )}
        <div className="flex flex-row items-center gap-2">
          <input
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            type="datetime-local"
            value={field.value}
            onChange={(e) => {
              e?.stopPropagation()
              e?.preventDefault()

              if (e.target['validity'].valid) {
                helpers.setValue(e.target['value'])

                if (touchedOnChange) {
                  helpers.setTouched(true)
                }
              }
            }}
            onBlur={() => helpers.setTouched(true)}
            placeholder={placeholder}
            disabled={disabled}
            className={twMerge(
              'focus:border-uzh-blue-50 border-uzh-grey-60 bg-uzh-grey-20 h-9 w-full rounded border',
              disabled && 'text-uzh-grey-100 cursor-not-allowed',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
          {meta.error && !hideError && meta.touched && (
            <Tooltip
              tooltip={meta.error}
              delay={0}
              className={{ tooltip: 'text ml-3 max-w-[30rem]' }}
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="mr-1 text-red-600"
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormikDateField
