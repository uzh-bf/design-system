import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface TextFieldProps {
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
  hasError?: boolean
  isTouched?: boolean
  disabled?: boolean
  className?: {
    root?: string
    field?: string
    label?: string
    input?: string
    error?: string
  }
  icon?: IconProp
  value: string
  onChange: (newValue: string) => void
}

/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The text displayed as label.
 * @param placeholder - The placeholder text for the input field.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param hasError - Indicate whether the field has an error or not (validation is not handled by this component).
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param disabled - Indicate whether the field is disabled or not.
 * @param className - The optional className object allows you to override the default styling.
 * @param icon - The optional icon is shown on the right side of the input field.
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @returns Text field component with optional label, tooltip, error message and icon.
 */

export function TextField({
  id,
  data,
  value,
  onChange,
  label,
  placeholder,
  tooltip,
  required,
  hasError,
  isTouched,
  hideError,
  disabled,
  className,
  icon,
  ...props
}: TextFieldProps) {
  return (
    <div className={twMerge('flex flex-row w-full', className?.field)}>
      {label && (
        <Label
          forId={id}
          required={required}
          label={label}
          className={{
            root: twMerge('my-auto mr-2 font-bold min-w-max', className?.label),
            tooltip: 'text-sm font-normal',
          }}
          tooltip={tooltip}
          showTooltipSymbol={typeof tooltip !== 'undefined'}
        />
      )}

      <div className="relative">
        <input
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          className={twMerge(
            'w-full rounded border border-uzh-grey-60 focus:border-uzh-blue-50 h-9 text-slate-600 pl-2',
            icon && 'pl-8',
            disabled && 'cursor-not-allowed',
            hasError && isTouched && 'border-red-400 bg-red-50',
            className?.input
          )}
          {...props}
        />
        {icon && (
          <FontAwesomeIcon
            className="absolute left-2 inset-y-2 text-slate-500"
            icon={icon}
            size="lg"
          />
        )}
      </div>
    </div>
  )
}

export default TextField
