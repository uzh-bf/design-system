import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

interface TextFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label?: string
  labelType?: 'small' | 'normal'
  icon?: IconDefinition
  onIconClick?: () => void
  placeholder?: string
  tooltip?: string | React.ReactNode
  required?: boolean
  hideError?: boolean
  disabled?: boolean
  className?: {
    override?: string
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
export interface TextFieldWithNameProps extends TextFieldProps {
  name: string
  value?: never
  onChange?: never
  error?: never
  [key: string]: any
}
export interface TextFieldWithOnChangeProps extends TextFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
  error?: string
  [key: string]: any
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
 * @param onIconClick - An optional function that is called when the icon (previous prop) is clicked
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
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
  labelType = 'normal',
  icon,
  onIconClick,
  placeholder,
  tooltip,
  required = false,
  hideError = false,
  disabled = false,
  className,
  ...props
}: TextFieldWithNameProps | TextFieldWithOnChangeProps) {
  const [field, meta] = useField(name || 'missing')

  return (
    <div className={twMerge('flex flex-col', className?.root)}>
      <div
        className={twMerge(
          'flex w-full flex-row',
          labelType === 'small' && 'flex-col',
          className?.field
        )}
      >
        {label && (
          <Label
            forId={id}
            required={required}
            label={label}
            className={{
              root: twMerge(
                'my-auto mr-2 min-w-max font-bold',
                labelType === 'small' &&
                  'mt-1 text-sm font-normal leading-6 text-gray-600',
                className?.label
              ),
              tooltip: twMerge('text-sm font-normal', className?.tooltip),
              tooltipSymbol: twMerge(labelType === 'small' && 'h-2 w-2'),
            }}
            tooltip={tooltip}
            showTooltipSymbol={typeof tooltip !== 'undefined'}
          />
        )}
        {name && (
          <div className={twMerge('relative flex w-full flex-row')}>
            <input
              {...field}
              id={id}
              data-cy={data?.cy}
              data-test={data?.test}
              name={name}
              type="text"
              placeholder={placeholder}
              disabled={disabled}
              className={twMerge(
                className?.override,
                'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 bg-uzh-grey-20',
                disabled && 'cursor-not-allowed',
                meta.error && meta.touched && 'border-red-400 bg-red-50',
                className?.input
              )}
              {...props}
            />
            {icon && (
              <FontAwesomeIcon
                icon={icon}
                onClick={onIconClick}
                className={twMerge(
                  'absolute right-2 z-10 self-center bg-uzh-grey-20 p-2 hover:cursor-pointer',
                  className?.icon
                )}
              />
            )}
          </div>
        )}
        {typeof value !== 'undefined' && onChange && (
          <div className={twMerge('relative flex w-full flex-row')}>
            <input
              {...field}
              id={id}
              data-cy={data?.cy}
              data-test={data?.test}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              type="text"
              placeholder={placeholder}
              disabled={disabled}
              className={twMerge(
                className?.override,
                'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 bg-uzh-grey-20',
                disabled && 'cursor-not-allowed',
                meta.error && meta.touched && 'border-red-400 bg-red-50',
                className?.input
              )}
              {...props}
            />
            {icon && (
              <FontAwesomeIcon
                icon={icon}
                onClick={onIconClick}
                className={twMerge(
                  'absolute right-2 z-10 self-center bg-uzh-grey-20 p-2 hover:cursor-pointer',
                  className?.icon
                )}
              />
            )}
          </div>
        )}
      </div>
      {!hideError && ((meta.touched && meta.error) || error) && (
        <div
          className={twMerge(
            'w-full text-right text-sm text-red-400',
            className?.error
          )}
        >
          {meta.error || error}
        </div>
      )}
    </div>
  )
}

export default FormikTextField
