'use client'

import { useField } from 'formik'
import React from 'react'
import PinField from './PinField'

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

  return (
    <PinField
      id={id}
      value={field.value}
      onChange={async (newValue) => {
        await helpers.setValue(newValue)
        await helpers.setTouched(true)
      }}
      length={length}
      required={required}
      label={label}
      labelType={labelType}
      tooltip={tooltip}
      hideError={hideError}
      error={!!meta.error && meta.touched ? meta.error : undefined}
      isTouched={meta.touched}
      className={className}
      data={data}
    />
  )
}

export default FormikPinField
