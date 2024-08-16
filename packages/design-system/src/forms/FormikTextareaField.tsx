import { useField } from 'formik'
import React from 'react'
import TextaraeField from './TextareaField'

interface FormikTextareaFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label?: string
  labelType?: 'small' | 'large'
  placeholder?: string
  tooltip?: string | React.ReactNode
  maxLength?: number
  maxLengthUnit?: string
  hideMaxLength?: boolean
  required?: boolean
  hideError?: boolean
  disabled?: boolean
  className?: {
    root?: string
    field?: string
    icon?: string
    label?: string
    input?: string
    error?: string
    tooltip?: string
  }
}

// type structure ensures that either a name or a value and onChange function are passed
export interface FormikTextareaFieldWithNameProps
  extends FormikTextareaFieldProps {
  name: string
  value?: never
  onChange?: never
  error?: never
  [key: string]: unknown
}
export interface FormikTextareaFieldWithOnChangeProps
  extends FormikTextareaFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
  error?: string
  [key: string]: unknown
}

/**
 * This function returns a text field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param value - The value of the field. This is used to manage the state internally. If no name is provided, this field is required.
 * @param onChange - The onChange function is called when the value of the field changes. This is used to manage the state internally. If no name is provided, this field is required.
 * @param error - The error message that is shown below the field. If a name is provided, this prop will not be used.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param maxLength - The optional maxLength is shown below the field to indicate the maximum number of characters allowed.
 * @param maxLengthUnit - The optional maxLengthUnit is shown next to the maxLength to indicate the unit of the maximum number of characters allowed.
 * @param hideMaxLength - Indicate whether the maxLength should be hidden or not.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export function FormikTextareaField({
  id,
  data,
  name,
  value,
  onChange,
  error,
  label,
  labelType = 'small',
  icon,
  placeholder,
  tooltip,
  required = false,
  hideError = false,
  disabled = false,
  className,
  ...props
}: FormikTextareaFieldWithNameProps | FormikTextareaFieldWithOnChangeProps) {
  const [field, meta] = useField(name || '')

  if (name) {
    return (
      <TextaraeField
        id={id}
        data={data}
        label={label}
        name={name}
        field={field}
        labelType={labelType}
        placeholder={placeholder}
        tooltip={tooltip}
        required={required}
        error={!!meta.error && meta.touched ? meta.error : undefined}
        isTouched={meta.touched}
        hideError={hideError}
        disabled={disabled}
        className={className}
        icon={icon}
        {...props}
      />
    )
  } else {
    return (
      <TextaraeField
        id={id}
        data={data}
        value={value!}
        onChange={onChange!}
        label={label}
        labelType={labelType}
        placeholder={placeholder}
        tooltip={tooltip}
        required={required}
        error={error}
        hideError={hideError}
        disabled={disabled}
        className={className}
        icon={icon}
        {...props}
      />
    )
  }
}

export default FormikTextareaField
