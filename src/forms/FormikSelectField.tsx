import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Select, { Item } from '../Select'
import Label from './Label'

export interface SelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  tooltip?: string
  required?: boolean
  items: Item[]
  disabled?: boolean
  className?: {
    root?: string
    label?: string
    select?: string
    error?: string
  }
}

export function FormikSelectField({
  name,
  label,
  tooltip,
  required,
  className,
  items,
  ...props
}: SelectFieldProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <div className={twMerge('flex flex-col', className?.root)}>
      <div className="flex flex-row w-full">
        {label && (
          <Label
            forId={name}
            required={required}
            label={label}
            className={{
              root: twMerge(
                'my-auto mr-2 font-bold min-w-max',
                className?.label
              ),
              tooltip: 'text-sm font-normal opacity-100',
            }}
            tooltip={tooltip}
            showTooltipSymbol={typeof tooltip !== 'undefined'}
          />
        )}
        <Select {...field} name={name} items={items} {...props} />
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

export default FormikSelectField
