import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface NumberFieldClassName {
  root?: string
  input?: string
  label?: string
  tooltip?: string
}

export interface NumberFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  value: string | number
  onChange: (newValue: string) => void
  label?: string
  tooltip?: string | React.ReactNode
  required?: boolean
  onBlur?: () => void
  placeholder?: string
  disabled?: boolean
  className?: NumberFieldClassName
  precision?: number
  min?: number
  max?: number
  [key: string]: any
}

/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @param label - The text displayed as label.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param onBlur - The onBlur function of the input field.
 * @param placeholder - The placeholder text for the input field.
 * @param disabled - Indicate whether the field is disabled or not.
 * @param precision - The optional precision defines the number of decimal places that are allowed.
 * @param min - The optional min defines the minimum value that is allowed.
 * @param max - The optional max defines the maximum value that is allowed.
 * @param className - The optional className object allows you to override the default styling.
 */

export function NumberField({
  id,
  data,
  value,
  onChange,
  label,
  tooltip,
  required,
  onBlur,
  placeholder,
  disabled,
  precision,
  min,
  max,
  className,
}: NumberFieldProps): React.ReactElement {
  const regex =
    typeof precision === 'number' && !isNaN(precision)
      ? precision === 0
        ? /^[-]?\d*$/
        : new RegExp(`^[-]?\\d*\\.?\\d{0,${precision}}$`)
      : /^[-]?\d*\.?\d*$/

  return (
    <div className={twMerge('flex flex-row', className?.root)}>
      {label && (
        <Label
          forId={id}
          required={required}
          label={label}
          className={{
            root: twMerge('my-auto mr-2 min-w-max font-bold', className?.label),
            tooltip: twMerge('text-sm font-normal', className?.tooltip),
          }}
          tooltip={tooltip}
          showTooltipSymbol={typeof tooltip !== 'undefined'}
        />
      )}

      <input
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        type="text"
        value={value}
        onChange={(e) => {
          if (
            e.target.value.match(regex) !== null &&
            (e.target.value === '' ||
              typeof min === 'undefined' ||
              parseFloat(e.target.value) >= min) &&
            (e.target.value === '' ||
              typeof max === 'undefined' ||
              parseFloat(e.target.value) <= max)
          ) {
            onChange(e.target.value)
          } else {
            console.log(`input ${e.target.value} does not match regex ${regex}`)
          }
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={twMerge(
          'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 bg-uzh-grey-20',
          disabled && 'cursor-not-allowed',
          className?.input
        )}
      />
    </div>
  )
}

export default NumberField
