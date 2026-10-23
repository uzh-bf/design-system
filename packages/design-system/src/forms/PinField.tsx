'use client'

import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { FieldErrorIndicator } from './FieldErrorIndicator'
import { useFieldError } from './useFieldError'

export interface PinFieldClassName {
  field?: string
  label?: string
  tooltip?: string
  input?: string
  inputItem?: string
}

export interface PinFieldProps {
  id?: string
  name?: string
  ref?: React.Ref<HTMLInputElement>
  value: string
  onChange: (newValue: string) => void | Promise<void>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  length: number
  required?: boolean
  disabled?: boolean
  label?: string
  labelType?: 'small' | 'large'
  tooltip?: string | React.ReactNode
  hideError?: boolean
  error?: string
  isTouched?: boolean
  className?: PinFieldClassName
  data?: { cy?: string; test?: string }
  'aria-invalid'?: React.AriaAttributes['aria-invalid']
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

/**
 * This function returns a controlled numeric pin field component.
 *
 * @param id - The id of the input field.
 * @param name - The native name of the input field.
 * @param ref - The ref forwarded to the native input.
 * @param value - The current value of the segmented input (string of length 0..length).
 * @param onChange - The change handler called with the sanitized numeric value.
 * @param onBlur - The blur handler called by the native input.
 * @param length - The length of the pin (number of digits).
 * @param required - Indicate whether the field is required or not.
 * @param disabled - Indicate whether the field is disabled or not.
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message to display when the field has been touched.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param className - The class names for the different parts of the component.
 * @param data - Optional data attributes for testing purposes.
 * @returns A controlled numeric pin field component with segmented input.
 */
export function PinField({
  id,
  name,
  ref,
  value,
  onChange,
  onBlur,
  length,
  required = false,
  disabled = false,
  label,
  labelType = 'small',
  tooltip,
  hideError = false,
  error,
  isTouched,
  className,
  data,
  'aria-invalid': ariaInvalid,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedBy,
}: PinFieldProps) {
  const { inputId, visibleError, errorId, describedBy } = useFieldError({
    id,
    error,
    isTouched,
    hideError,
    describedBy: ariaDescribedBy,
  })
  const isInvalid =
    (!!error && !!isTouched) ||
    (ariaInvalid !== undefined &&
      ariaInvalid !== false &&
      ariaInvalid !== 'false')

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
          className={{ label: className?.label, tooltip: className?.tooltip }}
        />
      )}

      <div className="flex w-full flex-row items-center gap-2">
        <InputOTP
          id={inputId}
          ref={ref}
          name={name}
          disabled={disabled}
          onBlur={onBlur}
          aria-invalid={ariaInvalid}
          aria-label={
            ariaLabel ?? (label || ariaLabelledby ? undefined : 'PIN code')
          }
          aria-labelledby={ariaLabelledby}
          aria-required={required || undefined}
          aria-describedby={describedBy}
          maxLength={length}
          value={value}
          onChange={async (newValue) => {
            const sanitizedValue = newValue
              .replace(/\s+/g, '')
              .replace(/[^0-9]/g, '')
              .slice(0, length)
            await onChange(sanitizedValue)
          }}
          onPaste={async (event) => {
            const pastedValue = event.clipboardData?.getData('text')

            if (pastedValue) {
              event.preventDefault()
              const sanitizedValue = pastedValue
                .replace(/\s+/g, '')
                .replace(/[^0-9]/g, '')
                .slice(0, length)
              await onChange(sanitizedValue)
            }
          }}
          className={className?.input}
        >
          <InputOTPGroup>
            {...Array(length)
              .fill('')
              .map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  data-cy={`${data?.cy}-${index + 1}`}
                  data-test={`${data?.test}-${index + 1}`}
                  className={twMerge(
                    isInvalid &&
                      'border-destructive bg-destructive-background border-y',
                    className?.inputItem
                  )}
                />
              ))}
          </InputOTPGroup>
        </InputOTP>
        {visibleError && (
          <FieldErrorIndicator error={visibleError} errorId={errorId} />
        )}
      </div>
    </div>
  )
}

export default PinField
