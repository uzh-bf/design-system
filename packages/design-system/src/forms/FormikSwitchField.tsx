'use client'

import { useField } from 'formik'
import React from 'react'
import Switch, { SwitchClassName } from '../Switch'

export interface FormikSwitchFieldProps {
  id?: string
  name: string
  data?: {
    cy?: string
    test?: string
  }
  disabled?: boolean
  error?: string
  hideError?: boolean
  label?: string
  labelLeft?: boolean
  size?: 'sm' | 'md' | 'lg'
  tooltip?: string | React.ReactNode
  required?: boolean
  className?: SwitchClassName
}

/**
 * This function extends the pre-styled Switch component so that it works as to be expected in a Formik environment.
 * State, in this case, is managed by Formik through the name attribute.
 *
 * @param id - The id of the switch.
 * @param name - The name of the field. This is used to identify the field in Formik.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label that is displayed next to the switch.
 * @param labelLeft - Indicator whether the label should be displayed on the left or right side of the switch.
 * @param disabled - Indicator whether the switch is disabled or not.
 * @param error - The error message that is shown below the switch.
 * @param hideError - Indicator whether the error message is displayed or not.
 * @param size - The size of the switch. The size can be small, medium or large.
 * @param tooltip - The tooltip that is displayed when hovering over the label. Tooltips are only available with the standardLabel setting.
 * @param required - Indicator whether the field is required or not. This is only available with the standardLabel setting.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Switch component with formik state management
 */
export function FormikSwitchField({
  id,
  name,
  data,
  disabled = false,
  error,
  hideError = false,
  label,
  labelLeft,
  size = 'md',
  required = false,
  tooltip,
  className,
}: FormikSwitchFieldProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <Switch
      id={id}
      required={required}
      checked={field.value}
      onCheckedChange={async (newValue) => {
        await helpers.setValue(newValue)
        await helpers.setTouched(true)
      }}
      data={data}
      disabled={disabled}
      label={label}
      labelLeft={labelLeft}
      tooltip={tooltip}
      size={size}
      error={!!meta.error && meta.touched ? meta.error : error}
      hideError={hideError}
      className={className}
    />
  )
}

export default FormikSwitchField
