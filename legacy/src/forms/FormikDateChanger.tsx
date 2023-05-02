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
  dataButton?: {
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
    changer?: string
    label?: string
    field?: string
    input?: string
    error?: string
    editButton?: string
    saveButton?: string
  }
}

/**
 * This function returns a date field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the button
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
  dataButton,
  name,
  label,
  tooltip,
  required = false,
  hideError = false,
  disabled = false,
  className,
}: FormikDateChangerProps) {
  const [field, meta, helpers] = useField(name)
  const [edit, setEdit] = useState(false)

  return (
    <div className={className?.root}>
      <DateChanger
        id={id}
        data={data}
        dataButton={dataButton}
        disabled={disabled}
        label={label}
        required={required}
        tooltip={tooltip}
        className={{ ...className, root: className?.changer }}
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
