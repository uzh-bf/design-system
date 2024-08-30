import {
  faCircleExclamation,
  faPalette,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import FormLabel from './FormLabel'
import Label from './forms/Label'
import { Tooltip } from './Tooltip'

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

function useOutsideAlerter(elementRef: any, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef])
}

export function ColorPicker({
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
  const overlayRef = useRef(null)
  useOutsideAlerter(overlayRef, () => {
    setColorPickerOpen(false)
    setNewColor(color)
  })

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
            'align-center relative flex w-20 justify-end rounded-lg',
            className?.pickerRoot
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
                'absolute flex h-[10rem] w-[23rem] flex-row rounded-md bg-white p-1 shadow-md outline outline-2 outline-uzh-grey-40',
                position === 'bottom' && 'left-10 top-8',
                position === 'top' && 'bottom-8 left-10',
                position === 'bottom-left' && '-left-[18rem] top-8',
                position === 'top-left' && '-left-[18rem] bottom-8',
                className?.popover
              )}
              ref={overlayRef}
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
                    className={twMerge(
                      'focus:border-uzh-blue-50 h-9 w-24 rounded border border-uzh-grey-60 pl-2 placeholder-slate-400',
                      className?.input
                    )}
                    color={newColor}
                    onChange={setNewColor}
                    data-cy={dataHexInput?.cy}
                    data-text={dataHexInput?.test}
                  />
                </div>
                <Button
                  className={{
                    root: twMerge(
                      `float-right h-max w-full justify-center self-end bg-primary-80 text-white disabled:opacity-60`,
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
            </div>
          )}
        </div>
        {error && isTouched && (
          <Tooltip tooltip={error} delay={0} className={{ tooltip: 'text-sm' }}>
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

export default ColorPicker
