import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Tooltip } from '../Tooltip'
import Label from './Label'

export interface NewFormikDateFieldProps {
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
  disabled?: boolean
  className?: {
    root?: string
    field?: string
    label?: string
    input?: string
    error?: string
    tooltip?: string
  }
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
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date field component with Formik state management.
 */
export function NewFormikDateField({
  id,
  data,
  name,
  label,
  labelType = 'small',
  placeholder,
  tooltip,
  required = false,
  hideError = false,
  disabled = false,
  className,
  ...props
}: NewFormikDateFieldProps) {
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
          <Label
            forId={id}
            required={required}
            label={label}
            className={{
              root: twMerge(
                'my-auto mr-2 min-w-max font-bold',
                labelType === 'small' &&
                  'mt-1 text-sm font-normal leading-6 text-gray-600',
                className?.label
              ),
              tooltip: twMerge('text-sm font-normal', className?.tooltip),
              tooltipSymbol: twMerge(labelType === 'small' && 'h-2 w-2'),
            }}
            tooltip={tooltip}
            showTooltipSymbol={typeof tooltip !== 'undefined'}
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
              if (e.target['validity'].valid) {
                helpers.setValue(e.target['value'])
              }
            }}
            onBlur={() => helpers.setTouched(true)}
            placeholder={placeholder}
            disabled={disabled}
            className={twMerge(
              'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 bg-uzh-grey-20',
              disabled && 'cursor-not-allowed text-uzh-grey-100',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
          {meta.error && !hideError && meta.touched && (
            <Tooltip
              tooltip={meta.error}
              delay={0}
              className={{ tooltip: 'text ml-3' }}
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

export default NewFormikDateField
