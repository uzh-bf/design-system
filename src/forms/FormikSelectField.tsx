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

const defaultProps = {
  label: undefined,
  placeholder: undefined,
  tooltip: undefined,
  required: false,
  disabled: false,
  className: undefined,
}

/**
 * This component returns a select field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param name - The name of the field. This is used to identify the field in Formik.
 * @param label - The optional label is shown next to the field in the form.
 * @param placeholder - The optional placeholder is shown when no value is selected / initialization with 'undefined' is chosen.
 * @param disabled - The optional disabled prop disables the select component.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param items - The array of items that should be available on the select component.
 * @param required - Indicate whether the field is required or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Select component with formik state management.
 */
export function FormikSelectField({
  name,
  label,
  placeholder,
  tooltip,
  required,
  items,
  disabled,
  className,
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
              tooltip: 'text-sm font-normal',
            }}
            tooltip={tooltip}
            showTooltipSymbol={typeof tooltip !== 'undefined'}
          />
        )}
        <Select
          {...field}
          onChange={(newValue: string) => helpers.setValue(newValue)}
          value={field.value}
          name={name}
          items={items}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
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

FormikSelectField.defaultProps = defaultProps
export default FormikSelectField
