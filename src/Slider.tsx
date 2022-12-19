import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixSlider from '@radix-ui/react-slider'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SliderProps {
  id?: string
  data_cy?: string
  value: number
  handleChange: (newValue: number) => void
  min: number
  max: number
  step: number
  disabled?: boolean

  rangeColorMap?: Record<string, string>
  borderColorMap?: Record<string, string>
  className?: {
    root?: string
    icons?: string
    labels?: string
    range?: string
    thumb?: string
  }
}
export interface SliderWithLabelProps extends SliderProps {
  labels: {
    min: string
    mid: string
    max: string
  }
  icons?: never
}
export interface SliderWithIconsProps extends SliderProps {
  icons: {
    min: React.ReactNode
    mid: React.ReactNode
    max: React.ReactNode
  }
  labels?: never
}

const defaultProps = {
  id: undefined,
  data_cy: undefined,
  disabled: false,
  icons: undefined,
  labels: undefined,
  rangeColorMap: undefined,
  borderColorMap: undefined,
  className: undefined,
}

/**
 * This function returns a pre-styled Slider component based on the RadixUI slider component and the custom theme.
 *
 * @param id - The id of the slider.
 * @param data_cy - The data-cy attribute of the slider.
 * @param value - The value of the slider. The value should be between the min and max value and is maintained by the parent component.
 * @param labels - The labels that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param icons - The icons that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param handleChange - The function that is called when the slider value is changed. The new value is passed as a parameter.
 * @param min - The minimum value of the slider.
 * @param max - The maximum value of the slider.
 * @param step - The step size of the slider.
 * @param disabled - Indicator whether the slider is disabled or not.
 * @param rangeColorMap - A map that maps a range of values to colors. The color is used to color the range of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param borderColorMap - A map that maps a range of values to colors. The color is used to color the thumb of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Slider component.
 */
export function Slider({
  id,
  data_cy,
  value,
  labels,
  handleChange,
  min,
  max,
  step,
  disabled,
  icons,
  rangeColorMap,
  borderColorMap,
  className,
}: SliderWithLabelProps | SliderWithIconsProps): React.ReactElement {
  const steps =
    min < 0 && max > 0
      ? ((max - min + 1) / step) >> 0
      : ((max - min) / step) >> 0

  return (
    <RadixSlider.Root
      id={id}
      data-cy={data_cy}
      className={twMerge(
        'relative flex items-center w-full h-24 select-none',
        className?.root
      )}
      defaultValue={[0]}
      disabled={disabled}
      max={max}
      min={min}
      step={step}
      value={[value]}
      onValueChange={([newValue]) => handleChange(newValue)}
    >
      <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-between text-3xl">
        {icons?.min ? (
          <div className={className?.icons}>{icons.min}</div>
        ) : (
          <div className={twMerge('text-base italic', className?.labels)}>
            {labels?.min}
          </div>
        )}
        {icons?.mid ? (
          <div className={className?.icons}>{icons.mid}</div>
        ) : (
          <div className={twMerge('text-base italic', className?.labels)}>
            {labels?.mid}
          </div>
        )}
        {icons?.max ? (
          <div className={className?.icons}>{icons.max}</div>
        ) : (
          <div className={twMerge('text-base italic', className?.labels)}>
            {labels?.max}
          </div>
        )}
      </div>

      <RadixSlider.Track className="relative flex-1 h-4 bg-gray-200 rounded-xl">
        <RadixSlider.Range
          className={twMerge(
            'absolute h-full rounded-full',
            rangeColorMap && Object.keys(rangeColorMap).length === steps
              ? rangeColorMap[String(value)]
              : 'bg-gray-500',
            className?.range
          )}
        />
      </RadixSlider.Track>

      <RadixSlider.Thumb
        className={twMerge(
          'w-12 h-12 flex flex-col items-center justify-center bg-white border-[3px] border-solid rounded-full shadow-lg focus:outline-none',
          disabled ? 'cursor-not-allowed' : 'cursor-move',
          disabled ||
            !borderColorMap ||
            Object.keys(borderColorMap).length !== steps
            ? 'border-gray-300'
            : borderColorMap[String(value)],
          className?.thumb
        )}
      >
        {disabled && (
          <FontAwesomeIcon icon={faLock} size="lg" className="text-gray-500" />
        )}
      </RadixSlider.Thumb>
    </RadixSlider.Root>
  )
}

Slider.defaultProps = defaultProps

export default Slider
