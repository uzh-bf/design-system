'use client'

import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import AlphaNumericPinField, {
  AlphaNumericPinFieldClassName,
} from './AlphaNumericPinField'

interface FormikAlphaNumericPinFieldProps {
  id?: string
  name: string
  data?: { cy?: string; test?: string }
  length: number
  label?: string
  labelType?: 'small' | 'large'
  tooltip?: string | React.ReactNode
  required?: boolean
  hideError?: boolean
  uppercaseOnly?: boolean
  className?: AlphaNumericPinFieldClassName & {
    root?: string
  }
  [key: string]: unknown
}

/**
 * This function returns an alphanumeric pin field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param value - The value of the field. This is used to manage the state internally. If no name is provided, this field is required.
 * @param onChange - The onChange function is called when the value of the field changes. This is used to manage the state internally. If no name is provided, this field is required.
 * @param length - The length of the pin (number of characters).
 * @param error - The error message that is shown below the field. If a name is provided, this prop will not be used.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param isTouched - Indicate whether the field has been touched or not (when using external state management).
 * @param uppercaseOnly - If true, lowercase characters are automatically converted to uppercase.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Alphanumeric pin field component with Formik state management.
 */
export function FormikAlphaNumericPinField({
  id,
  data,
  name,
  length,
  label,
  labelType = 'small',
  tooltip,
  required = false,
  hideError = false,
  uppercaseOnly = false,
  className,
  ...props
}: FormikAlphaNumericPinFieldProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <div className={twMerge('w-full', className?.root)}>
      <AlphaNumericPinField
        id={id}
        data={data}
        value={field.value}
        onChange={async (newVal) => {
          await helpers.setValue(newVal)
          await helpers.setTouched(true)
        }}
        length={length}
        label={label}
        labelType={labelType}
        tooltip={tooltip}
        required={required}
        hideError={hideError}
        error={!!meta.error && meta.touched ? meta.error : undefined}
        isTouched={meta.touched}
        uppercaseOnly={uppercaseOnly}
        className={className}
        {...props}
      />
    </div>
  )
}

export default FormikAlphaNumericPinField
