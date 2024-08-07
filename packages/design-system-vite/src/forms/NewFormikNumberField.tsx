import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import NumberField, { NumberFieldClassName } from './NumberField'

interface FormikNumberFieldProps {
  id?: string
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
  disabled?: boolean
  onBlur?: () => void
  data?: {
    cy?: string
    test?: string
  }
  className?: NumberFieldClassName & { root?: string }
  [key: string]: any
}

export interface FormikNumberFieldNameProps extends FormikNumberFieldProps {
  name: string
  value?: never
  onChange?: never
  isTouched?: never
}

export interface FormikNumberFieldOnChangeProps extends FormikNumberFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
  isTouched?: boolean
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
export function FormikNumberField({
  id,
  name,
  value,
  onChange,
  label,
  labelType = 'small',
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
}: FormikNumberFieldNameProps | FormikNumberFieldOnChangeProps) {
  const [field, meta, helpers] = useField(name || '')

  if (name) {
    return (
      <div className={twMerge('w-full', className?.root)}>
        <NumberField
          id={id}
          value={field.value}
          onChange={(newValue: string) => helpers.setValue(newValue)}
          label={label}
          labelType={labelType}
          placeholder={placeholder}
          precision={precision}
          min={min}
          max={max}
          tooltip={tooltip}
          required={required}
          hideError={hideError}
          error={meta.error}
          isTouched={meta.touched}
          disabled={disabled}
          onBlur={() => {
            helpers.setTouched(true)
            onBlur?.()
          }}
          data={data}
          className={className}
          {...props}
        />
      </div>
    )
  }

  return (
    <div className={twMerge('w-full', className?.root)}>
      <NumberField
        id={id}
        value={value!}
        onChange={onChange!}
        label={label}
        labelType={labelType}
        placeholder={placeholder}
        precision={precision}
        min={min}
        max={max}
        tooltip={tooltip}
        required={required}
        hideError={hideError}
        error={error}
        isTouched={isTouched}
        disabled={disabled}
        onBlur={() => {
          helpers.setTouched(true)
          onBlur?.()
        }}
        data={data}
        className={className}
        {...props}
      />
    </div>
  )
}

export default FormikNumberField
