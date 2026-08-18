'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import { Input } from '../ui/input'
import { FieldErrorIndicator } from './FieldErrorIndicator'
import { useFieldError } from './useFieldError'

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
  ariaLabel?: string
  precision?: number
  min?: number
  max?: number
  step?: number
  stepper?: boolean
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
  ref?: React.Ref<HTMLInputElement>
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
 * @param step - The optional step defines the increment used by stepper buttons.
 * @param stepper - The optional stepper flag renders compact increment/decrement controls around the input.
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
 * @param ref - A ref to the underlying input element.
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
  step = 1,
  stepper = false,
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
  ref,
  ...props
}: NumberFieldProps): React.ReactElement {
  const { inputId, visibleError, errorId } = useFieldError({
    id,
    error,
    isTouched,
    hideError,
  })
  const validInput =
    typeof precision === 'number' && !isNaN(precision)
      ? precision === 0
        ? /^[-]?\d*$/
        : new RegExp(`^[-]?\\d*\\.?\\d{0,${precision}}$`)
      : /^[-]?\d*\.?\d*$/

  const numericValue =
    typeof value === 'number' ? value : parseFloat(String(value))
  const hasNumericValue = Number.isFinite(numericValue)
  const isAtMin =
    typeof min === 'number' && hasNumericValue && numericValue <= min
  const isAtMax =
    typeof max === 'number' && hasNumericValue && numericValue >= max
  const stepSize = Math.abs(step) || 1

  const countDecimalPlaces = (numberLike: string | number | undefined) => {
    if (typeof numberLike === 'undefined' || numberLike === '') return 0

    const valueString = String(numberLike)
    const exponentMatch = valueString.match(/e-(\d+)$/i)
    if (exponentMatch) return Number(exponentMatch[1])

    return valueString.split('.')[1]?.length ?? 0
  }

  const formatSteppedValue = (newValue: number) => {
    if (typeof precision === 'number' && !isNaN(precision)) {
      return newValue.toFixed(Math.max(0, precision))
    }

    const decimalPlaces = Math.max(
      countDecimalPlaces(value),
      countDecimalPlaces(stepSize),
      countDecimalPlaces(min),
      countDecimalPlaces(max)
    )
    const roundedValue = Number(newValue.toFixed(decimalPlaces))

    return String(roundedValue)
  }

  const handleStep = (direction: -1 | 1) => {
    const fallbackValue = typeof min === 'number' ? min : 0
    const currentValue = hasNumericValue ? numericValue : fallbackValue
    const nextValue = currentValue + stepSize * direction
    const boundedValue = Math.min(
      max ?? nextValue,
      Math.max(min ?? nextValue, nextValue)
    )

    onChange(formatSteppedValue(boundedValue))
  }

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
          id={inputId}
          required={required}
          label={label}
          labelType={labelType}
          tooltip={tooltip}
          className={className}
        />
      )}

      <div className="flex w-full flex-row items-center gap-2">
        <div
          className={twMerge(
            'flex w-full flex-row items-center',
            stepper &&
              'focus-within:border-primary-100 focus-within:ring-primary-100/20 w-fit overflow-hidden rounded-md border border-[#E0E0E0] bg-white focus-within:ring-[3px]',
            disabled && stepper && 'bg-muted opacity-70'
          )}
        >
          {stepper && (
            <>
              <button
                type="button"
                aria-label="Decrease value"
                disabled={disabled || isAtMin}
                onClick={() => handleStep(-1)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-white text-[#666666] hover:bg-[#FAFAFA] disabled:cursor-not-allowed disabled:text-[#A3A3A3] disabled:hover:bg-white"
              >
                <MinusIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span aria-hidden="true" className="h-10 w-px bg-[#E0E0E0]" />
            </>
          )}
          <Input
            id={inputId}
            ref={ref}
            // Last-resort name for a standalone field without any label. An
            // aria-label would outrank an external one, so it must stand down
            // as soon as the caller points at a label element.
            aria-label={
              !label && !props['aria-labelledby']
                ? ((props.ariaLabel as string | undefined) ??
                  (props['aria-label'] as string | undefined) ??
                  placeholder ??
                  'Number')
                : undefined
            }
            aria-required={required || undefined}
            aria-describedby={visibleError ? errorId : undefined}
            data-cy={data?.cy}
            data-test={data?.test}
            type="text"
            value={value}
            onChange={(e) => {
              e?.stopPropagation()
              e?.preventDefault()

              const isIncompleteValue = /^-?$|^\.?$|^-\.$/.test(e.target.value)

              if (
                e.target.value.match(validInput) !== null &&
                (e.target.value === '' ||
                  isIncompleteValue ||
                  typeof min === 'undefined' ||
                  parseFloat(e.target.value) >= min) &&
                (e.target.value === '' ||
                  isIncompleteValue ||
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
              'focus:border-input h-10 w-full text-base',
              disabled && 'bg-muted cursor-not-allowed opacity-70',
              !!error &&
                isTouched &&
                'border-destructive focus:border-destructive bg-destructive-background',
              !!unit && !stepper && 'rounded-r-none',
              stepper &&
                'h-10 w-16 rounded-none border-0 bg-transparent px-2 text-center font-mono text-sm text-[#111111] tabular-nums shadow-none focus-visible:ring-0 disabled:bg-transparent disabled:opacity-100',
              className?.input
            )}
            {...props}
          />
          {unit && (
            <div
              className={twMerge(
                !stepper &&
                  'flex h-10 min-w-max flex-col items-center justify-center rounded-r bg-slate-600 px-4 text-white',
                stepper &&
                  'flex h-10 min-w-max flex-col items-center justify-center rounded-none border-0 bg-transparent px-2 pr-3 font-mono text-xs font-normal text-[#666666]',
                className?.unit
              )}
              data-cy="input-numerical-unit"
            >
              {unit}
            </div>
          )}
          {stepper && (
            <>
              <span aria-hidden="true" className="h-10 w-px bg-[#E0E0E0]" />
              <button
                type="button"
                aria-label="Increase value"
                disabled={disabled || isAtMax}
                onClick={() => handleStep(1)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-white text-[#666666] hover:bg-[#FAFAFA] disabled:cursor-not-allowed disabled:text-[#A3A3A3] disabled:hover:bg-white"
              >
                <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        {visibleError && (
          <FieldErrorIndicator error={visibleError} errorId={errorId} />
        )}
      </div>
    </div>
  )
}

export default NumberField
