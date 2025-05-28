import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import Tooltip from '../Tooltip'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'

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
          value={field.value}
          onChange={async (newValue) => {
            await helpers.setValue(newValue)
            await helpers.setTouched(true)
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
                    !!meta.error && meta.touched && 'border-y border-red-600',
                    className?.inputItem
                  )}
                />
              ))}
          </InputOTPGroup>
        </InputOTP>
        {meta.error && !hideError && meta.touched && (
          <Tooltip
            tooltip={!!meta.error && meta.touched ? meta.error : undefined}
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

export default FormikPinField
