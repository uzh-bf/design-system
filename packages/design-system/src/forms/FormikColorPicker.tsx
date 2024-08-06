import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import ColorPicker, { ColorPickerClassName } from '../ColorPicker'
import Label from './Label'

export interface FormikColorPickerProps {
  id?: string
  name: string
  label?: string
  labelType?: 'small' | 'normal'
  tooltip?: string | React.ReactNode
  required?: boolean
  hideError?: boolean
  disabled?: boolean
  triggerIcon?: IconDefinition
  presetColors?: string[]
  position?: 'bottom' | 'top'
  abortText?: string
  submitText?: string
  className?: {
    root?: string
    label?: string
    field?: string
    tooltip?: string
    error?: string
    colorPicker?: ColorPickerClassName
  }
  dataTrigger?: {
    cy?: string
    test?: string
  }
  dataHexInput?: {
    cy?: string
    test?: string
  }
  dataAbort?: {
    cy?: string
    test?: string
  }
  dataSubmit?: {
    cy?: string
    test?: string
  }
}

export function FormikColorPicker({
  id,
  name,
  label,
  labelType,
  tooltip,
  required = false,
  hideError = false,
  disabled = false,
  triggerIcon,
  presetColors,
  position,
  abortText,
  submitText,
  className,
  dataTrigger,
  dataHexInput,
  dataAbort,
  dataSubmit,
}: FormikColorPickerProps) {
  const [field, meta, helpers] = useField(name || 'missing')

  return (
    <div className={twMerge('flex flex-col', className?.root)} id={id}>
      <div
        className={twMerge(
          'flex w-full flex-row',
          labelType === 'small' && 'flex-col',
          className?.field
        )}
      >
        {label && (
          <Label
            forId={id}
            required={required}
            label={label}
            className={{
              root: twMerge(
                'my-auto mr-2 min-w-max font-bold',
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
          onSubmit={(newColor: string) => helpers.setValue(newColor)}
          disabled={disabled}
          triggerIcon={triggerIcon}
          presetColors={presetColors}
          position={position}
          submitText={submitText ?? 'Submit'}
          colorLabel={label ?? 'Color'}
          dataTrigger={dataTrigger}
          dataHexInput={dataHexInput}
          dataSubmit={dataSubmit}
          className={className?.colorPicker}
        />
      </div>
      {!hideError && meta.touched && meta.error && (
        <div
          className={twMerge(
            'w-full text-right text-sm text-red-400',
            className?.error
          )}
        >
          {meta.error}
        </div>
      )}
    </div>
  )
}

export default FormikColorPicker
