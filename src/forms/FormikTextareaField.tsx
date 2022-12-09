import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface TextareaFieldProps {
  id?: string
  label?: string
  placeholder?: string
  tooltip?: string
  required?: boolean
  maxLength?: number
  maxLengthLabel?: string
  className?: {
    root?: string
    label?: string
    input?: string
    error?: string
  }
}

// type structure ensures that either a name or a value and onChange function are passed
export interface TextareaFieldWithNameProps extends TextareaFieldProps {
  name: string
  value?: never
  onChange?: never
  [key: string]: any
}
export interface TextareaFieldWithOnChangeProps extends TextareaFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
  [key: string]: any
}

/**
 * This component returns a textarea field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param label - The optional label is shown next to the field in the form.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param value - The value of the field. This is used to manage the state internally. If no name is provided, this field is required.
 * @param onChange - The onChange function is called when the value of the field changes. This is used to manage the state internally. If no name is provided, this field is required.
 * @param maxLength - The optional maxLength is used to limit the number of characters that can be entered in the field.
 * @param maxLengthLabel - This optional label allows to specify a custom label for the maxLength indicator (e.g. "characters left" supporting internationalization).
 * @param className - The optional className object allows you to override the default styling.
 * @returns Textarea component with Formik state management.
 */
export function FormikTextareaField({
  name,
  value,
  onChange,
  id,
  label,
  placeholder,
  tooltip,
  required,
  maxLength,
  maxLengthLabel,
  className,
  ...props
}: TextareaFieldWithNameProps | TextareaFieldWithOnChangeProps) {
  const [field, meta] = useField(name || 'missing')
  return (
    <div className={twMerge('flex flex-col', className?.root)} id={id}>
      <div className="flex flex-row w-full">
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
          <textarea
            {...field}
            id={id}
            name={name}
            placeholder={placeholder}
            maxLength={maxLength}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 min-h-12',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
        )}
        {typeof value !== 'undefined' && onChange && (
          <textarea
            {...field}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 min-h-12',
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
      {maxLength && (
        <div className="text-sm italic text-right">
          {`${
            value?.length || field.value.length
          } / ${maxLength} ${maxLengthLabel}`}
        </div>
      )}
    </div>
  )
}

export default FormikTextareaField
