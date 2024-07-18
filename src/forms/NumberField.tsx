import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Tooltip } from '../Tooltip'
import Label from './Label'

export interface NumberFieldClassName {
  field?: string
  label?: string
  input?: string
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
  [key: string]: any
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
  labelType,
  placeholder,
  precision,
  min,
  max,
  tooltip,
  required,
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
        <input
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          type="text"
          value={value}
          onChange={(e) => {
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
            'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 pl-2 text-slate-600',
            disabled && 'cursor-not-allowed',
            !!error && isTouched && 'border-red-400 bg-red-50',
            className?.input
          )}
          {...props}
        />
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

export default NumberField
