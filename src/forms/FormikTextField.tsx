import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface TextFieldProps {
  id?: string
  label?: string
  placeholder?: string
  tooltip?: string
  required?: boolean
  className?: {
    root?: string
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
}
export interface TextFieldWithOnChangeProps extends TextFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
}

export function FormikTextField({
  name,
  value,
  onChange,
  id,
  label,
  placeholder,
  tooltip,
  required,
  className,
}: TextFieldWithNameProps | TextFieldWithOnChangeProps) {
  const [field, meta, helpers] = useField(name || 'missing')
  return (
    <div className={twMerge('flex flex-col', className?.root)} id={id}>
      <div className="flex flex-row w-full">
        {label && (
          <Label
            forId={id}
            required={required}
            label={label}
            className={twMerge(
              'my-auto mr-2 font-bold min-w-max',
              className?.label
            )}
            tooltip={tooltip}
            tooltipStyle="text-sm font-normal !w-1/2 opacity-100"
            showTooltipSymbol={typeof tooltip !== 'undefined'}
          />
        )}
        {name && (
          <input
            {...field}
            id={id}
            name={name}
            type="text"
            placeholder={placeholder}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
          />
        )}
        {typeof value !== undefined && onChange && (
          <input
            {...field}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            placeholder={placeholder}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
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

export default FormikTextField
