import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface TextareaFieldProps {
  id?: string
  label?: string
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
export interface TextareaFieldWithNameProps extends TextareaFieldProps {
  name: string
  value?: never
  onChange?: never
}
export interface TextareaFieldWithOnChangeProps extends TextareaFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
}

export function FormikTextareaField({
  name,
  value,
  onChange,
  id,
  label,
  tooltip,
  required,
  className,
}: TextareaFieldWithNameProps | TextareaFieldWithOnChangeProps) {
  const [field, meta, helpers] = useField(name || 'missing')
  return (
    <div className={twMerge('flex flex-col', className?.root)} id={id}>
      <div className="flex flex-row w-full">
        {label && (
          <Label
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
            name={name}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 min-h-12',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
          />
        )}
        {typeof value !== undefined && onChange && (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={twMerge(
              'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 min-h-12',
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

export default FormikTextareaField