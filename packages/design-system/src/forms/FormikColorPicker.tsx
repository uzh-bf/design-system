import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { useField } from 'formik'
import React, { useEffect } from 'react'
import ColorPicker, { ColorPickerClassName } from '../ColorPicker'

export interface FormikColorPickerProps {
  name: string
  label?: string
  labelType?: 'small' | 'large'
  validateForm?: () => void
  tooltip?: string | React.ReactNode
  required?: boolean
  disabled?: boolean
  triggerIcon?: IconDefinition
  presetColors?: string[]
  position?: 'bottom' | 'top' | 'bottom-left' | 'top-left'
  submitText: string
  colorLabel: string
  colorTooltip?: string
  dataTrigger?: {
    cy?: string
    test?: string
  }
  dataHexInput?: {
    cy?: string
    test?: string
  }
  dataSubmit?: {
    cy?: string
    test?: string
  }
  className?: ColorPickerClassName
}

/**
 * FormikColorPicker is a wrapper around the ColorPicker component that integrates with Formik for form handling.
 *
 * @param name - The name of the field (used for Formik).
 * @param label - The label for the color picker.
 * @param labelType - The type of label, can be 'small' or 'large'.
 * @param validateForm - A function to validate the form when the color is changed.
 * @param tooltip - Optional tooltip text or component to display additional information.
 * @param required - Indicates whether the field is required.
 * @param disabled - Indicates whether the color picker is disabled.
 * @param triggerIcon - An optional icon to display as a trigger for the color picker.
 * @param presetColors - An array of preset colors to display in the color picker.
 * @param position - The position of the color picker relative to the trigger icon.
 * @param submitText - The text to display on the submit button of the color picker.
 * @param colorLabel - The label for the color input field.
 * @param colorTooltip - Optional tooltip for the color input field.
 * @param dataTrigger - Optional data attributes for the trigger icon (for testing purposes).
 * @param dataHexInput - Optional data attributes for the hex input field (for testing purposes).
 * @returns A ColorPicker component that integrates with Formik for form handling.
 */
export function FormikColorPicker({
  name,
  label,
  labelType = 'small',
  validateForm,
  tooltip,
  required = false,
  disabled,
  triggerIcon,
  presetColors,
  position,
  submitText,
  colorLabel,
  colorTooltip,
  dataTrigger,
  dataHexInput,
  dataSubmit,
  className,
}: FormikColorPickerProps) {
  const [field, meta, helpers] = useField(name)

  useEffect(() => {
    validateForm?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value])

  return (
    <ColorPicker
      color={field.value}
      label={label}
      labelType={labelType}
      required={required}
      onSubmit={(newValue) => {
        helpers.setValue(newValue)
        helpers.setTouched(true)
      }}
      disabled={disabled}
      triggerIcon={triggerIcon}
      presetColors={presetColors}
      position={position}
      submitText={submitText}
      colorLabel={colorLabel}
      tooltip={tooltip}
      colorTooltip={colorTooltip}
      error={meta.error}
      isTouched={meta.touched}
      dataTrigger={dataTrigger}
      dataHexInput={dataHexInput}
      dataSubmit={dataSubmit}
      className={className}
    />
  )
}

export default FormikColorPicker
