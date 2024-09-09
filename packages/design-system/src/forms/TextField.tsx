import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FieldInputProps } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import { Tooltip } from '../Tooltip'

export interface TextFieldClassName {
  field?: string
  label?: string
  input?: string
  error?: string
  tooltip?: string
  icon?: string
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
  iconPosition?: 'left' | 'right'
  onIconClick?: () => void
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
 * @param iconPosition - The optional iconPosition can be used to change the position of the icon to the left side of the input field.
 * @param onIconClick - The optional onIconClick function is called when the icon is clicked.
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
  labelType = 'small',
  placeholder,
  tooltip,
  required = false,
  isTouched,
  hideError,
  error,
  disabled,
  onPaste,
  className,
  icon,
  iconPosition = 'left',
  onIconClick,
  ...props
}: TextFieldNameProps | TextFieldOnChangeProps) {
  return (
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

      <div className="flex w-full flex-row items-center gap-2">
        <div className="relative flex w-full flex-row items-center">
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
                'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 pl-2 placeholder-slate-400',
                icon && iconPosition === 'left' && 'pl-8',
                icon && iconPosition === 'right' && 'pr-10',
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
                'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 pl-2 placeholder-slate-400',
                icon && iconPosition === 'left' && 'pl-8',
                icon && iconPosition === 'right' && 'pr-10',
                disabled && 'cursor-not-allowed',
                !!error && isTouched && 'border-red-400 bg-red-50',
                className?.input
              )}
              {...props}
            />
          )}

          {icon && iconPosition === 'left' && (
            <FontAwesomeIcon
              className={twMerge(
                'absolute inset-y-2 left-2 text-slate-500',
                className?.icon
              )}
              onClick={onIconClick}
              icon={icon}
              size="lg"
            />
          )}
          {icon && iconPosition === 'right' && (
            <FontAwesomeIcon
              icon={icon}
              onClick={onIconClick}
              className={twMerge(
                'absolute right-0 z-10 p-2 pr-3 hover:cursor-pointer',
                className?.icon
              )}
            />
          )}
        </div>
        {error && !hideError && isTouched && (
          <Tooltip
            tooltip={error}
            delay={0}
            className={{ tooltip: 'max-w-[30rem] text-sm' }}
          >
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
