import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useField } from 'formik'
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import ColorPicker, { ColorPickerClassName } from '../ColorPicker'
import FormLabel from '../FormLabel'
import { Tooltip } from '../Tooltip'

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
  className?: {
    root?: string
    label?: string
    tooltip?: string
    picker?: ColorPickerClassName
  }
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
    <div
      className={twMerge(
        'flex w-full flex-row',
        labelType === 'small' && 'flex-col',
        className?.root
      )}
    >
      {label && (
        <FormLabel
          required={required}
          label={label}
          labelType={labelType}
          tooltip={tooltip}
          className={className}
        />
      )}
      <div className="flex flex-row items-center gap-2">
        <ColorPicker
          color={field.value}
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
          tooltip={colorTooltip}
          dataTrigger={dataTrigger}
          dataHexInput={dataHexInput}
          dataSubmit={dataSubmit}
          className={className?.picker}
        />
        {meta.error && meta.touched && (
          <Tooltip
            tooltip={meta.error}
            delay={0}
            className={{ tooltip: 'text-sm' }}
          >
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="mr-1 text-red-600"
            />
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export default FormikColorPicker
