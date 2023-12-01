import { faPalette, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import Label from './forms/Label'

export interface ColorPickerClassName {
  root?: string
  trigger?: string
  popover?: string
  presetButtons?: string
  inputLabel?: string
  input?: string
  abort?: string
  submit?: string
}

export interface ColorPickerProps {
  color: string
  onSubmit: (newColor: string) => void
  disabled?: boolean
  triggerIcon?: IconDefinition
  presetColors?: string[]
  position?: 'bottom' | 'top'
  submitText?: string
  abortText?: string
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
  className?: ColorPickerClassName
}

export function ColorPicker({
  color,
  onSubmit,
  disabled,
  triggerIcon,
  presetColors = [],
  position = 'bottom',
  submitText,
  abortText,
  dataTrigger,
  dataHexInput,
  dataAbort,
  dataSubmit,
  className,
}: ColorPickerProps) {
  const PRESET_COURSE_COLORS =
    presetColors && presetColors.length > 0
      ? presetColors
      : ['#262FAD', '#016272', '#5FB1F9', '#FE7408', '#D84B39']

  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [newColor, setNewColor] = useState(color)

  return (
    <div
      className={twMerge(
        'align-center relative flex w-20 justify-end rounded-lg',
        className?.root
      )}
      style={{ backgroundColor: color ?? '#0028A5' }}
    >
      <Button
        onClick={() => setColorPickerOpen(true)}
        disabled={disabled}
        data={dataTrigger}
        className={{ root: className?.trigger }}
      >
        <FontAwesomeIcon icon={triggerIcon || faPalette} />
      </Button>
      {colorPickerOpen && (
        <div
          className={twMerge(
            'absolute flex w-80 flex-col rounded-md bg-white p-1 shadow-md',
            position === 'bottom' && 'left-10 top-8',
            position === 'top' && 'bottom-8 left-10',
            className?.popover
          )}
        >
          <HexColorPicker
            style={{ width: 'auto' }}
            color={newColor}
            onChange={setNewColor}
          />
          <div className="grid grid-cols-5 justify-items-center gap-0.5 pb-3 pt-3">
            {PRESET_COURSE_COLORS.map((presetColor, index) => (
              <Button
                key={index}
                className={{
                  root: twMerge(
                    'h-7 w-7 rounded-2xl border-none',
                    className?.presetButtons
                  ),
                }}
                style={{ backgroundColor: presetColor }}
                onClick={() => setNewColor(presetColor)}
              />
            ))}
          </div>
          <div className="flex flex-row">
            <Label
              className={{
                root: twMerge('pr-1', className?.inputLabel),
                tooltip: 'ml-4',
              }}
              label="Farbe:"
              tooltip="Sie können auch direkt den Hex-Code einer Farbe eingeben"
              showTooltipSymbol
            />
            <HexColorInput
              className={twMerge(
                'focus:border-uzh-blue-50 h-9 w-full rounded border border-uzh-grey-60 pl-2 text-slate-600',
                className?.input
              )}
              color={newColor}
              onChange={setNewColor}
              data-cy={dataHexInput?.cy}
              data-text={dataHexInput?.test}
            />
          </div>
          <div className="flex w-full flex-row justify-between pt-5">
            <Button
              className={{ root: twMerge('float-right', className?.abort) }}
              type="submit"
              onClick={() => setColorPickerOpen(false)}
              data={dataAbort}
            >
              {abortText ?? 'Abbrechen'}
            </Button>
            <Button
              className={{
                root: twMerge(
                  `float-right bg-primary-80 text-white disabled:opacity-60`,
                  className?.submit
                ),
              }}
              type="submit"
              onClick={(e) => {
                e?.preventDefault()
                e?.stopPropagation()
                onSubmit(newColor)
                setColorPickerOpen(false)
              }}
              disabled={color === newColor}
              data={dataSubmit}
            >
              {submitText ?? 'Speichern'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
