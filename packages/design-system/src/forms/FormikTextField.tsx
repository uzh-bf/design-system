import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import TextField, { TextFieldClassName } from './TextField'

interface FormikTextFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label?: string
  labelType?: 'small' | 'large'
  icon?: IconDefinition
  iconPosition?: 'left' | 'right'
  onIconClick?: () => void
  placeholder?: string
  tooltip?: string | React.ReactNode
  required?: boolean
  hideError?: boolean
  disabled?: boolean
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>
  className?: TextFieldClassName & {
    root?: string
  }
}

// type structure ensures that either a name or a value and onChange function are passed
export interface FormikTextFieldWithNameProps extends FormikTextFieldProps {
  name: string
  value?: never
  onChange?: never
  error?: never
  isTouched?: never
  [key: string]: unknown
}
export interface FormikTextFieldWithOnChangeProps extends FormikTextFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
  error?: string
  isTouched?: boolean
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
 * @param icon - An optional icon (FontAwesomeIcon IconDefinition) that is shown on the right side of the text input component
 * @param iconPosition - The optional iconPosition can be used to change the position of the icon according to pre-defined standards.
 * @param onIconClick - An optional function that is called when the icon (previous prop) is clicked
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param onPaste - An optional function that is called when the user pastes text into the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export function FormikTextField({
  id,
  data,
  name,
  value,
  onChange,
  error,
  label,
  labelType = 'small',
  icon,
  iconPosition = 'left',
  onIconClick,
  placeholder,
  tooltip,
  required = false,
  hideError = false,
  isTouched = false,
  disabled = false,
  onPaste,
  className,
  ...props
}: FormikTextFieldWithNameProps | FormikTextFieldWithOnChangeProps) {
  const [field, meta] = useField(name || '')

  if (name) {
    return (
      <div className={twMerge('w-full', className?.root)}>
        <TextField
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
          onPaste={onPaste}
          className={className}
          icon={icon}
          iconPosition={iconPosition}
          onIconClick={onIconClick}
          {...props}
        />
      </div>
    )
  } else {
    return (
      <div className={twMerge('w-full', className?.root)}>
        <TextField
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
          isTouched={isTouched}
          hideError={hideError}
          disabled={disabled}
          onPaste={onPaste}
          className={className}
          icon={icon}
          iconPosition={iconPosition}
          onIconClick={onIconClick}
          {...props}
        />
      </div>
    )
  }
}

export default FormikTextField
