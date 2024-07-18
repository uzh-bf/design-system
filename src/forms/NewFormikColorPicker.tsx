import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import ColorPicker, { ColorPickerClassName } from '../ColorPicker'
import { Label } from './Label'

export interface FormikColorPickerProps {
  name: string
  label?: string
  labelType?: 'small' | 'large'
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
  tooltip,
  required,
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
  const [field, _, helpers] = useField(name)

  return (
    <div
      className={twMerge(
        'flex w-full flex-row',
        labelType === 'small' && 'flex-col',
        className?.root
      )}
    >
      {label && (
        <Label
          required={required}
          label={label}
          className={{
            root: twMerge(
              'my-auto -mb-1 mr-2 min-w-max font-bold',
              labelType === 'small' &&
                'mt-1 text-sm font-normal leading-6 text-gray-600',
              className?.label
            ),
            tooltip: twMerge('text-sm font-normal', className?.tooltip),
            tooltipSymbol: twMerge(labelType === 'small' && 'h-2 w-2'),
          }}
          tooltip={tooltip}
          showTooltipSymbol={typeof tooltip !== 'undefined'}
        />
      )}
      <ColorPicker
        color={field.value}
        onSubmit={(newValue) => helpers.setValue(newValue)}
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
    </div>
  )
}

export default FormikColorPicker
