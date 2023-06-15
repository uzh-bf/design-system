import { faPalette, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import Label from './forms/Label'
import { ThemeContext } from './ThemeProvider'

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
  className?: {
    root?: string
    trigger?: string
    popover?: string
    presetButtons?: string
    label?: string
    input?: string
    abort?: string
    submit?: string
  }
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
  const theme = useContext(ThemeContext)
  const [newColor, setNewColor] = useState(color)

  return (
    <div
      className={twMerge(
        'flex relative w-20 rounded-lg align-center justify-end',
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
            'absolute flex flex-col p-1 bg-white rounded-md shadow-md w-80',
            position === 'bottom' && 'left-10 top-8',
            position === 'top' && 'left-10 bottom-8',
            className?.popover
          )}
        >
          <HexColorPicker
            style={{ width: 'auto' }}
            color={newColor}
            onChange={setNewColor}
          />
          <div className="grid grid-cols-5 gap-0.5 pt-3 pb-3 justify-items-center">
            {PRESET_COURSE_COLORS.map((presetColor, index) => (
              <Button
                key={index}
                className={{
                  root: twMerge(
                    'h-7 w-7 border-none rounded-2xl',
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
                root: twMerge('pr-1', className?.label),
                tooltip: 'ml-4',
              }}
              label="Farbe:"
              tooltip="Sie können auch direkt den Hex-Code einer Farbe eingeben"
              showTooltipSymbol
            />
            <HexColorInput
              className={twMerge(
                'w-full pl-2 border rounded border-uzh-grey-60 focus:border-uzh-blue-50 h-9 text-slate-600',
                className?.input
              )}
              color={newColor}
              onChange={setNewColor}
              data-cy={dataHexInput?.cy}
              data-text={dataHexInput?.test}
            />
          </div>
          <div className="flex flex-row justify-between w-full pt-5">
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
                  `float-right text-white disabled:opacity-60 ${theme.primaryBgDark}`,
                  className?.submit
                ),
              }}
              type="submit"
              onClick={() => {
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
