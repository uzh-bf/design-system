import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface NumberFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  value: string | number
  onChange: (newValue: string) => void
  label?: string
  tooltip?: string
  required?: boolean
  onBlur?: () => void
  placeholder?: string
  disabled?: boolean
  className?: {
    root?: string
    input?: string
    label?: string
    tooltip?: string
  }
  precision?: number
  [key: string]: any
}

export function NumberField({
  id,
  data,
  value,
  onChange,
  label,
  tooltip,
  required,
  onBlur,
  placeholder,
  disabled,
  className,
  precision,
}: NumberFieldProps): React.ReactElement {
  return (
    <div className={twMerge('flex flex-row', className?.root)}>
      {label && (
        <Label
          forId={id}
          required={required}
          label={label}
          className={{
            root: twMerge('my-auto mr-2 min-w-max font-bold', className?.label),
            tooltip: twMerge('text-sm font-normal', className?.tooltip),
          }}
          tooltip={tooltip}
          showTooltipSymbol={typeof tooltip !== 'undefined'}
        />
      )}

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
          'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 bg-uzh-grey-20',
          disabled && 'cursor-not-allowed',
          className?.input
        )}
      />
    </div>
  )
}

export default NumberField
