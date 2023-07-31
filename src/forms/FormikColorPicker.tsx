import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import ColorPicker from '../ColorPicker'
import Label from './Label'

export interface FormikColorPickerProps {
  id?: string
  name: string
  label?: string
  labelType?: 'small' | 'normal'
  tooltip?: string
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
    field?: string
    label?: string
    input?: string
    error?: string
    pickerRoot?: string
    trigger?: string
    popover?: string
    presetButtons?: string
    inputLabel?: string
    pickerInput?: string
    abort?: string
    submit?: string
    tooltip?: string
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
          abortText={abortText}
          submitText={submitText}
          dataTrigger={dataTrigger}
          dataHexInput={dataHexInput}
          dataAbort={dataAbort}
          dataSubmit={dataSubmit}
          className={{
            root: className?.pickerRoot,
            trigger: className?.trigger,
            popover: className?.popover,
            presetButtons: className?.presetButtons,
            inputLabel: className?.inputLabel,
            input: className?.pickerInput,
            abort: className?.abort,
            submit: className?.submit,
          }}
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
