'use client'

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import Tooltip from '../Tooltip'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'

export interface AlphaNumericPinFieldClassName {
  field?: string
  label?: string
  tooltip?: string
  input?: string
  inputItem?: string
}

export interface AlphaNumericPinFieldProps {
  id?: string
  value: string
  onChange: (newValue: string) => Promise<void>
  length: number
  required?: boolean
  label?: string
  labelType?: 'small' | 'large'
  tooltip?: string | React.ReactNode
  hideError?: boolean
  error?: string
  isTouched?: boolean
  uppercaseOnly?: boolean
  className?: AlphaNumericPinFieldClassName
  data?: { cy?: string; test?: string }
}

/**
 * This function returns an alphanumeric pin field component for use without Formik.
 * It mirrors the styling and behavior of the numeric FormikPinField, but allows A–Z and 0–9 input.
 *
 * @param id - The id of the input field.
 * @param value - The current value of the segmented alphanumeric input (string of length 0..length).
 * @param onChange - The change handler called with the updated value when input changes.
 * @param length - The length of the pin (number of characters).
 * @param required - Indicate whether the field is required or not.
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message to display as a tooltip on the right side when the field has been touched.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param uppercaseOnly - If true, lowercase characters are automatically converted to uppercase.
 * @param className - The class names for the different parts of the component.
 * @param data - Optional data attributes for testing purposes.
 * @returns An alphanumeric pin field component with segmented input.
 */
export function AlphaNumericPinField({
  id,
  value,
  onChange,
  length,
  required = false,
  label,
  labelType = 'small',
  tooltip,
  hideError = false,
  error,
  isTouched,
  uppercaseOnly = false,
  className,
  data,
}: AlphaNumericPinFieldProps) {
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
          className={{ label: className?.label, tooltip: className?.tooltip }}
        />
      )}

      <div className="flex w-full flex-row items-center gap-2">
        <InputOTP
          maxLength={length}
          inputMode="text" // accept alphanumeric input
          pattern="[A-Za-z0-9]*" // restrict to alphanumeric at the input level
          value={value}
          onChange={async (newValue) => {
            const next = uppercaseOnly ? newValue.toUpperCase() : newValue
            const sanitized = next.replace(/[^A-Za-z0-9]/g, '').slice(0, length) // enforce max length
            await onChange(sanitized)
          }}
          onPaste={async (event) => {
            const pastedValue = event.clipboardData?.getData('text')

            if (pastedValue) {
              event.preventDefault()
              const next = uppercaseOnly
                ? pastedValue.toUpperCase()
                : pastedValue
              const sanitized = next
                .replace(/[^A-Za-z0-9]/g, '')
                .slice(0, length)
              await onChange(sanitized)
            }
          }}
          className={className?.input}
        >
          <InputOTPGroup>
            {...Array(length)
              .fill('')
              .map((_, index) => (
                <InputOTPSlot
                  index={index}
                  data-cy={`${data?.cy}-${index + 1}`}
                  data-test={`${data?.test}-${index + 1}`}
                  className={twMerge(
                    'h-9 text-base',
                    !!error &&
                      isTouched &&
                      'border-destructive bg-destructive-background border-y',
                    className?.inputItem
                  )}
                />
              ))}
          </InputOTPGroup>
        </InputOTP>
        {error && !hideError && isTouched && (
          <Tooltip
            tooltip={error}
            delay={0}
            className={{ tooltip: 'max-w-120 text-sm' }}
          >
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-destructive mr-1"
            />
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export default AlphaNumericPinField
