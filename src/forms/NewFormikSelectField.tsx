import { useField } from 'formik'
import React from 'react'
import { Item, SelectClassName } from '../Select'
import SelectField from './SelectField'

interface FormikSelectFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  name: string
  label?: string
  labelType?: 'small' | 'large'
  placeholder?: string
  tooltip?: string | React.ReactNode
  required?: boolean
  disabled?: boolean
  error?: string
  hideError?: boolean
  contentPosition?: 'item-aligned' | 'popper'
  className?: {
    root?: string
    label?: string
    error?: string
    tooltip?: string
    select?: SelectClassName
  }
}

export interface FormikSelectFieldItemsProps extends FormikSelectFieldProps {
  items: Item[]
  groups?: never
}

export interface FormikSelectFieldGroupsProps extends FormikSelectFieldProps {
  groups: {
    label?: string
    showSeparator?: boolean
    items: Item[]
  }[]
  items?: never
}

/**
 * This component returns a select field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field.
 * @param items - The array of items that should be available on the select component.
 * @param groups - The optional groups array can be used to group items in the select component.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when no value is selected / initialization with 'undefined' is chosen.
 * @param disabled - The optional disabled prop disables the select component.
 * @param error - The optional error message is shown next to the component.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Select component with formik state management.
 */
export function FormikSelectField({
  id,
  data,
  name,
  items,
  groups,
  label,
  labelType = 'small',
  placeholder,
  tooltip,
  required = false,
  disabled = false,
  error,
  hideError = false,
  contentPosition = 'item-aligned',
  className,
  ...props
}: FormikSelectFieldItemsProps | FormikSelectFieldGroupsProps) {
  const [field, meta, helpers] = useField(name)

  if (items) {
    return (
      <SelectField
        id={id}
        data={data}
        name={name}
        value={field.value}
        onChange={(newValue: string) => helpers.setValue(newValue)}
        onBlur={() => helpers.setTouched(true)}
        label={label}
        labelType={labelType}
        placeholder={placeholder}
        tooltip={tooltip}
        required={required}
        items={items}
        disabled={disabled}
        error={!!meta.error && meta.touched ? meta.error : error}
        hideError={hideError}
        contentPosition={contentPosition}
        className={className}
        {...props}
      />
    )
  }

  return (
    <SelectField
      id={id}
      data={data}
      name={name}
      value={field.value}
      onChange={(newValue: string) => helpers.setValue(newValue)}
      onBlur={() => helpers.setTouched(true)}
      label={label}
      labelType={labelType}
      placeholder={placeholder}
      tooltip={tooltip}
      required={required}
      groups={groups}
      disabled={disabled}
      error={!!meta.error && meta.touched ? meta.error : error}
      hideError={hideError}
      contentPosition={contentPosition}
      className={className}
      {...props}
    />
  )
}

export default FormikSelectField
