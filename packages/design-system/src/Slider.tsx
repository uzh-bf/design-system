import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixSlider from '@radix-ui/react-slider'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SliderProps {
  id?: string
  value?: number
  handleChange: (newValue: number) => void
  defaultValue?: number
  min: number
  max: number
  step: number
  disabled?: boolean
  compact?: boolean
  rangeColorMap?: Record<string, string>
  borderColorMap?: Record<string, string>
  className?: {
    root?: string
    icons?: string
    labels?: string
    label?: string
    track?: string
    range?: string
    thumb?: string
    lock?: string
  }
  data?: {
    cy?: string
    test?: string
  }
  dataThumb?: {
    cy?: string
    test?: string
  }
}
export interface SliderWithLabelProps extends SliderProps {
  labels?: {
    min?: string
    mid?: string
    max?: string
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

/**
 * This function returns a pre-styled Slider component based on the RadixUI slider component and the custom theme.
 *
 * @param id - The id of the slider.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the slider. The value should be between the min and max value and is maintained by the parent component.
 * @param defaultValue - The default value of the slider, if the value is undefined
 * @param labels - The labels that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param icons - The icons that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param handleChange - The function that is called when the slider value is changed. The new value is passed as a parameter.
 * @param min - The minimum value of the slider.
 * @param max - The maximum value of the slider.
 * @param step - The step size of the slider.
 * @param disabled - Indicator whether the slider is disabled or not.
 * @param compact - Indicator whether the slider should be shown in a compact formm or not
 * @param rangeColorMap - A map that maps a range of values to colors. The color is used to color the range of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param borderColorMap - A map that maps a range of values to colors. The color is used to color the thumb of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Slider component.
 */
export function Slider({
  id,
  value,
  labels,
  handleChange,
  defaultValue = 0,
  min,
  max,
  step,
  disabled = false,
  compact = false,
  icons,
  rangeColorMap,
  borderColorMap,
  className,
  data,
  dataThumb,
}: SliderWithLabelProps | SliderWithIconsProps): React.ReactElement {
  const steps =
    min < 0 && max > 0
      ? ((max - min + 1) / step) >> 0
      : ((max - min) / step) >> 0

  return (
    <div>
      <RadixSlider.Root
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        className={twMerge(
          'relative flex w-full select-none items-center',
          compact ? 'h-4' : 'h-14',
          className?.root
        )}
        defaultValue={[defaultValue]}
        disabled={disabled}
        max={max}
        min={min}
        step={step}
        value={[value ?? defaultValue]}
        onValueChange={([newValue]) => handleChange(newValue)}
      >
        <RadixSlider.Track
          className={twMerge(
            'relative h-4 flex-1 rounded-xl bg-gray-200',
            compact && 'h-1.5',
            className?.track
          )}
        >
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
            'flex h-12 w-12 flex-col items-center justify-center rounded-full border-[3px] border-solid bg-white shadow-lg focus:outline-none',
            compact && 'h-4 w-4 border-[1.5px]',
            disabled ? 'cursor-not-allowed' : 'cursor-move',
            disabled && compact ? 'bg-gray-100' : 'bg-white',
            disabled ||
              !borderColorMap ||
              Object.keys(borderColorMap).length !== steps
              ? 'border-gray-300'
              : borderColorMap[String(value)],
            className?.thumb
          )}
          data-cy={dataThumb?.cy}
          data-test={dataThumb?.test}
        >
          {disabled && !compact ? (
            <FontAwesomeIcon
              icon={faLock}
              className={twMerge(
                'h-5 w-5 text-gray-500',
                compact && 'h-2.5 w-2.5',
                className?.lock
              )}
            />
          ) : null}
        </RadixSlider.Thumb>
      </RadixSlider.Root>
      <div
        className={twMerge(
          'grid grid-cols-3 px-2.5 text-3xl',
          compact && 'px-[0.2rem]',
          className?.labels
        )}
      >
        <div className={twMerge('flex text-start', className?.icons)}>
          {icons?.min ? (
            icons.min
          ) : (
            <div className={twMerge('text-base', className?.label)}>
              {labels?.min}
            </div>
          )}
        </div>
        <div className={twMerge('flex justify-center', className?.icons)}>
          {icons?.mid ? (
            icons.mid
          ) : (
            <div className={twMerge('text-base', className?.label)}>
              {labels?.mid}
            </div>
          )}
        </div>
        <div className={twMerge('flex justify-end text-end', className?.icons)}>
          {icons?.max ? (
            icons.max
          ) : (
            <div className={twMerge('text-base', className?.label)}>
              {labels?.max}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Slider
