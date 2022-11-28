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
        {typeof value !== undefined && onChange && (
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
        <div className="text-sm text-right">
          {`${
            value?.length || field.value.length
          } / ${maxLength} ${maxLengthLabel}`}
        </div>
      )}
    </div>
  )
}

export default FormikTextareaField
