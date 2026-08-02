'use client'

import { faPalette, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import FormLabel from './FormLabel'
import { FieldErrorIndicator } from './forms/FieldErrorIndicator'
import Label from './forms/Label'
import { useFieldError } from './forms/useFieldError'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export interface ColorPickerClassName {
  root?: string
  pickerRoot?: string
  label?: string
  tooltip?: string
  trigger?: string
  popover?: string
  presetButtons?: string
  inputLabel?: string
  inputTooltip?: string
  input?: string
  abort?: string
  submit?: string
}

export interface ColorPickerProps {
  ref?: React.Ref<HTMLButtonElement>
  color: string
  label?: string
  labelType?: 'small' | 'large'
  required?: boolean
  onSubmit: (newColor: string) => void
  disabled?: boolean
  triggerIcon?: IconDefinition
  presetColors?: string[]
  position?: 'bottom' | 'top' | 'bottom-left' | 'top-left'
  submitText: string
  colorLabel: string
  triggerAriaLabel: string
  tooltip?: string | React.ReactNode
  colorTooltip?: string
  error?: string
  isTouched?: boolean
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

// The legacy `position` values predate the Radix popover and describe where the
// panel is pinned relative to the trigger, so they map onto a side plus an
// alignment rather than onto a side alone.
const POPOVER_PLACEMENT = {
  bottom: { side: 'bottom', align: 'start' },
  top: { side: 'top', align: 'start' },
  'bottom-left': { side: 'bottom', align: 'end' },
  'top-left': { side: 'top', align: 'end' },
} as const

/**
 * ColorPicker is a component that allows users to select a color from a palette or input a hex color code.
 *
 * @param color - The initial color value in hex format.
 * @param label - The label for the color picker.
 * @param labelType - The type of label, can be 'small' or 'large'.
 * @param required - Indicates whether the field is required.
 * @param onSubmit - Callback function to handle the submission of the selected color.
 * @param disabled - Indicates whether the color picker is disabled.
 * @param triggerIcon - An optional icon to display as a trigger for the color picker.
 * @param presetColors - An array of preset colors to display in the color picker.
 * @param position - The position of the color picker relative to the trigger icon.
 * @param submitText - The text to display on the submit button of the color picker.
 * @param colorLabel - The label for the color input field.
 * @param triggerAriaLabel - Accessible name for the icon-only trigger button (e.g. "Pick a course color"). Required, since the trigger has no visible text.
 * @param colorTooltip - Optional tooltip for the color input field.
 * @param tooltip - Optional tooltip text or component to display additional information.
 * @param error - An error message to display if the color picker has an error.
 * @param isTouched - Indicates whether the color picker has been touched (used for error display).
 * @param dataTrigger - Optional data attributes for the trigger icon (for testing purposes).
 * @param dataHexInput - Optional data attributes for the hex input field (for testing purposes).
 * @param dataSubmit - Optional data attributes for the submit button (for testing purposes).
 * @param className - Optional class names for styling the color picker and its components.
 * @returns A ColorPicker component that allows users to select a color and submit it.
 */
export function ColorPicker({
  ref,
  color,
  label,
  labelType = 'small',
  required = false,
  onSubmit,
  disabled,
  triggerIcon,
  presetColors = [],
  position = 'bottom',
  submitText,
  colorLabel,
  triggerAriaLabel,
  tooltip,
  colorTooltip,
  error,
  isTouched,
  dataTrigger,
  dataHexInput,
  dataSubmit,
  className,
}: ColorPickerProps) {
  const PRESET_COURSE_COLORS =
    presetColors && presetColors.length > 0
      ? presetColors
      : ['#262FAD', '#016272', '#5FB1F9', '#FE7408', '#D84B39']

  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [newColor, setNewColor] = useState(color)
  // Reuses the form-field error wiring: `inputId` names the hex input, and the
  // error surfaces both as the existing tooltip and as a hidden alert node the
  // trigger points at via aria-describedby.
  const { inputId, visibleError, errorId } = useFieldError({ error, isTouched })
  const { side, align } = POPOVER_PLACEMENT[position]

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
        <div
          className={twMerge(
            'align-center flex w-20 justify-end rounded-lg',
            className?.pickerRoot
          )}
          style={{ backgroundColor: color ?? '#0028A5' }}
        >
          <Popover
            open={colorPickerOpen}
            onOpenChange={(open) => {
              setColorPickerOpen(open)
              // Dismissing (Escape, outside click) discards the pending choice,
              // matching the previous outside-click behaviour. Submitting closes
              // the popover directly and therefore keeps the submitted colour.
              if (!open) {
                setNewColor(color)
              }
            }}
          >
            <PopoverTrigger asChild>
              <Button
                ref={ref}
                aria-label={triggerAriaLabel}
                aria-describedby={visibleError ? errorId : undefined}
                disabled={disabled}
                data={dataTrigger}
                className={{
                  root: twMerge(
                    'disabled:cursor-not-allowed disabled:opacity-100',
                    className?.trigger
                  ),
                }}
              >
                <FontAwesomeIcon
                  icon={triggerIcon || faPalette}
                  className={twMerge(disabled && 'opacity-50')}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              // Radix always gives the content role="dialog"; without a name it
              // announces as a bare dialog and swallows the naming work done on
              // the controls inside it.
              aria-label={triggerAriaLabel}
              side={side}
              align={align}
              className={twMerge(
                'w-92 flex h-40 flex-row rounded-md p-1 shadow-md',
                className?.popover
              )}
            >
              <HexColorPicker
                style={{ width: '300px', height: '150px' }}
                color={newColor}
                onChange={setNewColor}
              />
              <div className="grid grid-cols-1 justify-items-center gap-0.5 pl-2">
                {PRESET_COURSE_COLORS.map((presetColor, index) => (
                  <Button
                    key={index}
                    aria-label={`Preset color ${presetColor}`}
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

              <div className="ml-4 flex flex-col justify-between">
                <div className="flex flex-col">
                  <Label
                    label={colorLabel}
                    forId={inputId}
                    className={{
                      root: twMerge(
                        'my-auto -mb-0.5 min-w-max text-base font-bold leading-6 text-gray-600',
                        className?.inputLabel
                      ),
                      tooltip: twMerge(
                        'text-sm font-normal',
                        className?.inputTooltip
                      ),
                      tooltipSymbol: 'h-2 w-2',
                    }}
                    tooltip={colorTooltip}
                    showTooltipSymbol={typeof colorTooltip !== 'undefined'}
                  />
                  <HexColorInput
                    id={inputId}
                    className={twMerge(
                      'focus:border-primary-100 border-border h-9 w-24 rounded border pl-2 placeholder-slate-400',
                      className?.input
                    )}
                    color={newColor}
                    onChange={setNewColor}
                    data-cy={dataHexInput?.cy}
                    data-text={dataHexInput?.test}
                  />
                </div>
                <Button
                  primary
                  className={{
                    root: twMerge(
                      `float-right h-max w-full justify-center self-end`,
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
                  {submitText}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {visibleError && (
          <FieldErrorIndicator error={visibleError} errorId={errorId} />
        )}
      </div>
    </div>
  )
}

export default ColorPicker
