'use client'

import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { FieldErrorIndicator } from './FieldErrorIndicator'
import { useFieldError } from './useFieldError'

export interface FormikPinFieldProps {
  id?: string
  name: string
  length: number
  required?: boolean
  label?: string
  labelType?: 'small' | 'large'
  tooltip?: string | React.ReactNode
  hideError?: boolean
  className?: {
    field?: string
    label?: string
    tooltip?: string
    input?: string
    inputItem?: string
  }
  data?: {
    cy?: string
    test?: string
  }
}

/**
 * This function returns a pin field component for use with Formik.
 *
 * @param id - The id of the input field.
 * @param name - The name of the input field (used for Formik).
 * @param length - The length of the pin (number of digits).
 * @param required - Indicate whether the field is required or not.
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param className - The class names for the different parts of the component.
 * @param data - Optional data attributes for testing purposes.
 * @returns A pin field component that integrates with Formik for form handling.
 *
 * @deprecated Frozen in v5 and scheduled for removal in v6. New code should use
 * the react-hook-form `Form` binding (`Form` + `FormField` + a control) instead
 * of the Formik field family. See MIGRATION.md for the migration path.
 */
export function FormikPinField({
  id,
  name,
  length,
  required = false,
  label,
  labelType = 'small',
  tooltip,
  hideError = false,
  className,
  data,
}: FormikPinFieldProps) {
  const [field, meta, helpers] = useField(name)
  const { inputId, visibleError, errorId } = useFieldError({
    id,
    error: !!meta.error && meta.touched ? meta.error : undefined,
    isTouched: meta.touched,
    hideError,
  })

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
          aria-label={label ? undefined : 'PIN code'}
          aria-required={required || undefined}
          aria-describedby={visibleError ? errorId : undefined}
          maxLength={length}
          value={field.value}
          onChange={async (newValue) => {
            const sanitizedValue = newValue
              .replace(/\s+/g, '')
              .replace(/[^0-9]/g, '')
              .slice(0, length)
            await helpers.setValue(sanitizedValue)
            await helpers.setTouched(true)
          }}
          onPaste={async (event) => {
            const pastedValue = event.clipboardData?.getData('text')

            if (pastedValue) {
              event.preventDefault()
              const sanitizedValue = pastedValue
                .replace(/\s+/g, '')
                .replace(/[^0-9]/g, '')
                .slice(0, length)
              await helpers.setValue(sanitizedValue)
              await helpers.setTouched(true)
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
                    !!meta.error &&
                      meta.touched &&
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

export default FormikPinField
