import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Select, { Item } from '../Select'
import Label from './Label'

export interface SelectFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  name: string
  label?: string
  placeholder?: string
  tooltip?: string
  required?: boolean
  items: Item[]
  disabled?: boolean
  hideError?: boolean
  className?: {
    root?: string
    label?: string
    select?: string
    error?: string
  }
}

const defaultProps = {
  id: undefined,
  data: undefined,
  label: undefined,
  placeholder: undefined,
  tooltip: undefined,
  required: false,
  disabled: false,
  hideError: false,
  className: undefined,
}

// TODO: style error field to be below actual select field

/**
 * This component returns a select field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field. This is used to identify the field in Formik.
 * @param label - The optional label is shown next to the field in the form.
 * @param placeholder - The optional placeholder is shown when no value is selected / initialization with 'undefined' is chosen.
 * @param disabled - The optional disabled prop disables the select component.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param items - The array of items that should be available on the select component.
 * @param required - Indicate whether the field is required or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Select component with formik state management.
 */
export function FormikSelectField({
  id,
  data,
  name,
  label,
  placeholder,
  tooltip,
  required,
  items,
  disabled,
  hideError,
  className,
  ...props
}: SelectFieldProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <div className={twMerge('flex flex-col w-max', className?.root)} id={id}>
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
          data-cy={data?.cy}
          data-test={data?.test}
          onChange={(newValue: string) => helpers.setValue(newValue)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          name={name}
          items={items}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
      </div>
      {!hideError && meta.touched && meta.error && (
        <div
          className={twMerge(
            'w-full text-sm text-right text-red-400',
            className?.error
          )}
        >
          {meta.error}
        </div>
      )}
    </div>
  )
}

FormikSelectField.defaultProps = defaultProps
export default FormikSelectField
