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
  position?: 'bottom' | 'top'
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
