import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FieldInputProps } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Tooltip } from '../Tooltip'
import Label from './Label'

export interface TextFieldClassName {
  field?: string
  label?: string
  input?: string
  error?: string
  tooltip?: string
}

interface TextFieldProps {
  id?: string
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
  error?: string
  isTouched?: boolean
  disabled?: boolean
  onPaste?: (e: any) => void
  className?: TextFieldClassName
  icon?: IconProp
}

export interface TextFieldNameProps extends TextFieldProps {
  name: string
  field: FieldInputProps<any>
  value?: never
  onChange?: never
  [key: string]: any
}

export interface TextFieldOnChangeProps extends TextFieldProps {
  name?: never
  field?: never
  value: string
  onChange: (newValue: string) => void
  [key: string]: any
}

/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the input field.
 * @param field - The field object from formik.
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The placeholder text for the input field.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message that is shown below the field.
 * @param disabled - Indicate whether the field is disabled or not.
 * @param onPaste - The optional onPaste function is called when the user pastes text into the input field.
 * @param className - The optional className object allows you to override the default styling.
 * @param icon - The optional icon is shown on the right side of the input field.
 * @returns Text field component with optional label, tooltip, error message and icon.
 */

export function TextField({
  id,
  data,
  name,
  field,
  value,
  onChange,
  label,
  labelType = 'large',
  placeholder,
  tooltip,
  required,
  isTouched,
  hideError,
  error,
  disabled,
  onPaste,
  className,
  icon,
  ...props
}: TextFieldNameProps | TextFieldOnChangeProps) {
  return (
    <div
      className={twMerge(
        'flex w-full flex-row',
        labelType === 'small' && 'max-w-80 flex-col',
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
                '-mb-1 mt-1 text-sm leading-6 text-gray-600',
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
        <div className="relative">
          {name && field ? (
            <input
              {...field}
              id={id}
              data-cy={data?.cy}
              data-test={data?.test}
              name={name}
              type="text"
              placeholder={placeholder}
              disabled={disabled}
              onPaste={onPaste}
              className={twMerge(
                'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 pl-2 text-slate-600',
                icon && 'pl-8',
                disabled && 'cursor-not-allowed',
                !!error && isTouched && 'border-red-400 bg-red-50',
                className?.input
              )}
              {...props}
            />
          ) : (
            <input
              id={id}
              data-cy={data?.cy}
              data-test={data?.test}
              value={value}
              onChange={(e) => onChange!(e.target.value)}
              type="text"
              placeholder={placeholder}
              disabled={disabled}
              onPaste={onPaste}
              className={twMerge(
                'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 pl-2 text-slate-600',
                icon && 'pl-8',
                disabled && 'cursor-not-allowed',
                !!error && isTouched && 'border-red-400 bg-red-50',
                className?.input
              )}
              {...props}
            />
          )}

          {icon && (
            <FontAwesomeIcon
              className="absolute inset-y-2 left-2 text-slate-500"
              icon={icon}
              size="lg"
            />
          )}
        </div>
        {error && !hideError && isTouched && (
          <Tooltip tooltip={error} delay={0} className={{ tooltip: 'text-sm' }}>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="mr-1 text-red-600"
            />
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export default TextField
