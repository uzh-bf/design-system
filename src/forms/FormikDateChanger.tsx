import { useField } from 'formik'
import React, { useState } from 'react'
import DateChanger from '../DateChanger'

export interface FormikDateChangerProps {
  id?: string
  name: string
  data?: {
    cy?: string
    test?: string
  }
  label?: string
  tooltip?: string
  required?: boolean
  hideError?: boolean
  disabled?: boolean
  className?: {
    root?: string
    label?: string
    field?: string
    input?: string
    error?: string
    editButton?: string
    saveButton?: string
  }
}

const defaultProps = {
  id: undefined,
  data: undefined,
  label: undefined,
  tooltip: undefined,
  required: false,
  hideError: false,
  disabled: false,
  className: undefined,
}

/**
 * This function returns a date field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The optional label is shown next to the field in the form.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date field component with Formik state management.
 */

export function FormikDateChanger({
  id,
  data,
  name,
  label,
  tooltip,
  required,
  hideError,
  disabled,
  className,
}: FormikDateChangerProps) {
  const [field, meta, helpers] = useField(name)
  const [edit, setEdit] = useState(false)

  return (
    <div>
      <DateChanger
        id={id}
        data={data}
        disabled={disabled}
        label={label}
        required={required}
        tooltip={tooltip}
        className={className}
        onSave={(newValue) => {
          helpers.setValue(newValue)
          helpers.setTouched(true)
          setEdit(false)
        }}
        onEdit={() => setEdit(true)}
        edit={edit}
        date={field.value}
      />
      {meta.error && meta.touched && !hideError && (
        <div className="text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  )
}

export default FormikDateChanger
