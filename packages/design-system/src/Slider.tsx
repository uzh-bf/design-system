'use client'

import * as RadixSlider from '@radix-ui/react-slider'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SliderProps {
  id?: string
  ref?: React.Ref<HTMLSpanElement>
  ariaLabel?: string
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
 * @param ariaLabel - Accessible name for the slider thumb.
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
  ref,
  ariaLabel,
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
  const currentValue = value ?? defaultValue
  const steps = Math.floor((max - min) / step) + 1
  const hasRangeColorMap =
    rangeColorMap && Object.keys(rangeColorMap).length === steps
  const hasBorderColorMap =
    borderColorMap && Object.keys(borderColorMap).length === steps

  return (
    <div>
      <RadixSlider.Root
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        className={twMerge(
          'relative flex w-full items-center select-none',
          compact ? 'h-4' : 'h-[18px]',
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
            'relative h-1.5 flex-1 rounded-full bg-[#EFEFEF]',
            compact && 'h-1.5',
            className?.track
          )}
        >
          <RadixSlider.Range
            className={twMerge(
              'absolute h-full rounded-full',
              disabled
                ? 'bg-muted-foreground'
                : hasRangeColorMap
                  ? rangeColorMap[String(currentValue)]
                  : 'bg-primary-100',
              className?.range
            )}
          />
        </RadixSlider.Track>

        <RadixSlider.Thumb
          ref={ref}
          aria-label={ariaLabel}
          className={twMerge(
            'focus:ring-ring/50 flex size-[18px] flex-col items-center justify-center rounded-full border-2 border-solid bg-white shadow-sm transition-[color,box-shadow] focus:ring-[3px] focus:outline-hidden',
            compact && 'size-4 border-[1.5px]',
            disabled ? 'cursor-not-allowed' : 'cursor-move',
            disabled && compact ? 'bg-gray-100' : 'bg-white',
            disabled
              ? 'border-gray-300'
              : hasBorderColorMap
                ? borderColorMap[String(currentValue)]
                : 'border-primary-100',
            className?.thumb
          )}
          data-cy={dataThumb?.cy}
          data-test={dataThumb?.test}
        />
      </RadixSlider.Root>
      <div
        className={twMerge(
          'mt-2 grid grid-cols-3 px-2.5 text-3xl',
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
