import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import { Tooltip } from '../Tooltip'
import { Input } from '../ui/input'

export interface NumberFieldClassName {
  field?: string
  label?: string
  input?: string
  unit?: string
  error?: string
  tooltip?: string
}

export interface NumberFieldProps {
  id?: string
  value: string | number
  onChange: (newValue: string) => void
  label?: string
  labelType?: 'small' | 'large'
  placeholder?: string
  precision?: number
  min?: number
  max?: number
  unit?: string
  tooltip?: string | React.ReactNode
  required?: boolean
  hideError?: boolean
  error?: string
  isTouched?: boolean
  disabled?: boolean
  onBlur?: () => void
  data?: {
    cy?: string
    test?: string
  }
  className?: NumberFieldClassName
  [key: string]: unknown
}

/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The placeholder text for the input field.
 * @param precision - The optional precision defines the number of decimal places that are allowed.
 * @param min - The optional min defines the minimum value that is allowed.
 * @param max - The optional max defines the maximum value that is allowed.
 * @param unit - The optional unit is shown next to the input field.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message that is displayed below the input field.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param disabled - Indicate whether the field is disabled or not.
 * @param onBlur - The onBlur function of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 */
export function NumberField({
  id,
  value,
  onChange,
  label,
  labelType = 'small',
  placeholder,
  precision,
  min,
  max,
  unit,
  tooltip,
  required = false,
  hideError,
  error,
  isTouched,
  disabled,
  onBlur,
  data,
  className,
  ...props
}: NumberFieldProps): React.ReactElement {
  const validInput =
    typeof precision === 'number' && !isNaN(precision)
      ? precision === 0
        ? /^[-]?\d*$/
        : new RegExp(`^[-]?\\d*\\.?\\d{0,${precision}}$`)
      : /^[-]?\d*\.?\d*$/

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
        <div className="flex w-full flex-row items-center">
          <Input
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            type="text"
            value={value}
            onChange={(e) => {
              e?.stopPropagation()
              e?.preventDefault()

              if (
                e.target.value.match(validInput) !== null &&
                (e.target.value === '' ||
                  typeof min === 'undefined' ||
                  parseFloat(e.target.value) >= min) &&
                (e.target.value === '' ||
                  typeof max === 'undefined' ||
                  parseFloat(e.target.value) <= max)
              ) {
                onChange(e.target.value)
              } else {
                console.log(
                  `input ${e.target.value} does not match regex ${validInput}`
                )
              }
            }}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={twMerge(
              'h-9 w-full text-base focus:border-input',
              disabled && 'cursor-not-allowed bg-uzh-grey-20 opacity-70',
              !!error &&
                isTouched &&
                'border-red-400 bg-red-50 focus:border-red-400',
              !!unit && 'rounded-r-none',
              className?.input
            )}
            {...props}
          />
          {unit && (
            <div
              className={twMerge(
                'flex h-9 min-w-max flex-col items-center justify-center rounded-r bg-slate-600 px-4 text-white',
                className?.unit
              )}
              data-cy="input-numerical-unit"
            >
              {unit}
            </div>
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

export default NumberField
