import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  hideError?: boolean
  hasError?: boolean
  isTouched?: boolean
  disabled?: boolean
  className?: {
    root?: string
    field?: string
    label?: string
    input?: string
    error?: string
  }
  icon?: any
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

export function TextField({
  id,
  data,
  name,
  value,
  onChange,
  label,
  placeholder,
  tooltip,
  required,
  hasError,
  isTouched,
  hideError,
  disabled,
  className,
  icon,
  ...props
}: TextFieldWithNameProps | TextFieldWithOnChangeProps) {
  return (
    <div className={twMerge('flex flex-row w-full', className?.field)}>
      {label && (
        <Label
          forId={id}
          required={required}
          label={label}
          className={{
            root: twMerge('my-auto mr-2 font-bold min-w-max', className?.label),
            tooltip: 'text-sm font-normal',
          }}
          tooltip={tooltip}
          showTooltipSymbol={typeof tooltip !== 'undefined'}
        />
      )}
      {name && (
        <div className="relative">
          <input
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            name={name}
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            className={twMerge(
              `w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9 ${
                icon ? 'pl-8' : 'pl-2'
              }`,
              disabled && 'cursor-not-allowed',
              hasError && isTouched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
          {icon && (
            <FontAwesomeIcon
              className="absolute left-0 pl-1.5 inset-y-2"
              icon={icon}
              size="lg"
            />
          )}
        </div>
      )}
      {typeof value !== 'undefined' && onChange && (
        <div className="relative">
          <input
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            className={twMerge(
              `w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9 ${
                icon ? 'pl-8' : 'pl-2'
              }`,
              disabled && 'cursor-not-allowed',
              hasError && isTouched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
          {icon && (
            <FontAwesomeIcon
              className={`absolute pl-20 left-5 inset-y-20`}
              icon={icon}
              size="lg"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default TextField
