import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface TextFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label?: string
  placeholder?: string
  tooltip?: string
  required?: boolean
  className?: {
    root?: string
    field?: string
    label?: string
    input?: string
    error?: string
  }
}

// type structure ensures that either a name or a value and onChange function are passed
export interface TextFieldWithNameProps extends TextFieldProps {
  name: string
  value?: never
  onChange?: never
  [key: string]: any
}
export interface TextFieldWithOnChangeProps extends TextFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
  [key: string]: any
}

const defaultProps = {
  id: undefined,
  data: undefined,
  label: undefined,
  placeholder: undefined,
  tooltip: undefined,
  required: false,
  className: undefined,
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
 * @param label - The optional label is shown next to the field in the form.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export function FormikTextField({
  id,
  data,
  name,
  value,
  onChange,
  label,
  placeholder,
  tooltip,
  required,
  className,
  ...props
}: TextFieldWithNameProps | TextFieldWithOnChangeProps) {
  const [field, meta] = useField(name || 'missing')
  return (
    <div className={twMerge('flex flex-col', className?.root)}>
      <div className={twMerge('flex flex-row w-full', className?.field)}>
        {label && (
          <Label
            forId={id}
            required={required}
            label={label}
            className={{
              root: twMerge(
                'my-auto mr-2 font-bold min-w-max',
                className?.label
              ),
              tooltip: 'text-sm font-normal',
            }}
            tooltip={tooltip}
            showTooltipSymbol={typeof tooltip !== 'undefined'}
          />
        )}
        {name && (
          <input
            {...field}
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            name={name}
            type="text"
            placeholder={placeholder}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
        )}
        {typeof value !== 'undefined' && onChange && (
          <input
            {...field}
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            placeholder={placeholder}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
        )}
      </div>
      {meta.touched && meta.error ? (
        <div
          className={twMerge(
            'w-full text-sm text-right text-red-400',
            className?.error
          )}
        >
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

FormikTextField.defaultProps = defaultProps
export default FormikTextField
