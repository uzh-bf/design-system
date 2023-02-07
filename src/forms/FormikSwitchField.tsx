import { useField } from 'formik'
import React from 'react'
import Switch from '../Switch'

export interface FormikSwitchFieldProps {
  id?: string
  name: string
  data?: {
    cy?: string
    test?: string
  }
  disabled?: boolean
  label?: string
  fluid?: boolean
  labelLeft?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: {
    root?: string
    element?: string
    thumb?: string
    label?: string
  }
}

const defaultProps = {
  id: undefined,
  data: undefined,
  className: undefined,
  disabled: false,
  label: undefined,
  labelLeft: false,
  fluid: false,
  size: 'md',
}

/**
 * This function extends the pre-styled Switch component so that it works as to be expected in a Formik environment.
 * State, in this case, is managed by Formik through the name attribute.
 *
 * @param id - The id of the switch.
 * @param name - The name of the field. This is used to identify the field in Formik.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label that is displayed next to the switch.
 * @param disabled - Indicator whether the switch is disabled or not.
 * @param fluid - Indicator whether the switch should be fluid or not.
 * @param labelLeft - Indicator whether the label should be displayed on the left or right side of the switch.
 * @param size - The size of the switch. The size can be small, medium or large.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Switch component with formik state management
 */
export function FormikSwitchField({
  id,
  name,
  data,
  disabled,
  label,
  fluid,
  labelLeft,
  size,
  className,
}: FormikSwitchFieldProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <Switch
      id={id}
      checked={field.value}
      onCheckedChange={helpers.setValue}
      data={data}
      disabled={disabled}
      fluid={fluid}
      labelLeft={labelLeft}
      label={label}
      size={size}
      className={className}
    />
  )
}

FormikSwitchField.defaultProps = defaultProps
export default FormikSwitchField
