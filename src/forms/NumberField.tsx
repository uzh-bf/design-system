import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface NumberFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  value: string | number
  onChange: (newValue: string) => void
  onBlur?: () => void
  placeholder?: string
  disabled?: boolean
  className?: {
    input?: string
  }
  precision?: number
  [key: string]: any
}

export function NumberField({
  id,
  data,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  className,
  precision,
}: NumberFieldProps): React.ReactElement {
  return (
    <input
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      type="text"
      value={value}
      onChange={(e) => {
        let regex

        if (typeof precision !== 'undefined') {
          regex =
            precision === 0
              ? /^[-]?\d*$/
              : new RegExp(`^[-]?\\d*\\.?\\d{0,${precision}}$`)
        } else {
          regex = /^[-]?\d*\.?\d*$/
        }

        if (e.target.value.match(regex) !== null) {
          onChange(e.target.value)
        }
      }}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={twMerge(
        'w-full rounded bg-uzh-grey-20 border border-uzh-grey-60 focus:border-uzh-blue-50 h-9',
        disabled && 'cursor-not-allowed',
        className?.input
      )}
    />
  )
}

export default NumberField
