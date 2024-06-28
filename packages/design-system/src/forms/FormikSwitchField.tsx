import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Switch, { SwitchClassName } from '../Switch'
import Label from './Label'

export interface FormikSwitchFieldProps {
  id?: string
  name: string
  data?: {
    cy?: string
    test?: string
  }
  disabled?: boolean
  hideError?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  standardLabel?: boolean
  tooltip?: string | React.ReactNode
  required?: boolean
  className?: {
    root?: string
    label?: string
    tooltip?: string
    error?: string
    switch?: SwitchClassName
  }
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
 * @param hideError - Indicator whether the error message is displayed or not.
 * @param size - The size of the switch. The size can be small, medium or large.
 * @param standardLabel - Indicator whether the label is displayed in the standard format (left of the component) instead of being optimized to a switch.
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
  hideError = false,
  label,
  size = 'md',
  standardLabel = false,
  required = false,
  tooltip,
  className,
}: FormikSwitchFieldProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <div className={twMerge('w-max', className?.root)}>
      <div className="flex flex-row items-center">
        {standardLabel && label && (
          <Label
            forId={name}
            required={required}
            label={label}
            className={{
              root: twMerge(
                'my-auto mr-2 min-w-max font-bold',
                className?.label
              ),
              tooltip: twMerge('text-sm font-normal', className?.tooltip),
            }}
            tooltip={tooltip}
            showTooltipSymbol={typeof tooltip !== 'undefined'}
          />
        )}
        <Switch
          id={id}
          checked={field.value}
          onCheckedChange={(newValue) => helpers.setValue(newValue)}
          onBlur={() => helpers.setTouched(true)}
          data={data}
          disabled={disabled}
          label={standardLabel ? undefined : label}
          size={size}
          className={className?.switch}
        />
      </div>
      {!hideError && meta.touched && meta.error && (
        <div
          className={twMerge(
            'text-right text-sm text-red-400',
            className?.error
          )}
        >
          {meta.error}
        </div>
      )}
    </div>
  )
}

export default FormikSwitchField
