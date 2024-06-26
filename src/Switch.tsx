import * as RadixSwitch from '@radix-ui/react-switch'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './forms/Label'

export interface SwitchClassName {
  override?: string
  thumbOverride?: string
  root?: string
  element?: string
  thumb?: string
  label?: string
}

export interface SwitchProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  checked?: boolean
  onCheckedChange: (newValue: boolean) => void
  onBlur?: () => void
  disabled?: boolean
  label?: string
  fluid?: boolean
  labelLeft?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: SwitchClassName
}

/**
 * This function returns a pre-styled Switch component based on the RadixUI switch component and the custom theme.
 * The state of the switch is maintained by the parent component.
 *
 * @param id - The id of the switch.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label that is displayed next to the switch.
 * @param checked - Indicator whether the switch is checked or not (or indefinite if undefined value). State is managed by the parent component.
 * @param onCheckedChange - The function that is called when the switch is checked or unchecked. The new value is passed as a parameter.
 * @param onBlur - The function that is called when the switch loses focus.
 * @param disabled - Indicator whether the switch is disabled or not.
 * @param fluid - Indicator whether the switch should be fluid or not.
 * @param labelLeft - Indicator whether the label should be displayed on the left or right side of the switch.
 * @param size - The size of the switch. The size can be small, medium or large.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Switch component
 */
export function Switch({
  id,
  data,
  disabled = false,
  label,
  checked,
  onCheckedChange,
  onBlur,
  fluid = false,
  labelLeft = false,
  size = 'md',
  className,
}: SwitchProps) {
  const rootSize = {
    sm: 'w-10 h-[1.3rem]',
    md: 'w-12 h-[1.6rem]',
    lg: 'w-16 h-[1.9rem]',
  }
  const thumbSize = {
    sm: 'ml-[0.2rem] w-4 h-4',
    md: 'ml-1 w-5 h-5',
    lg: 'ml-1 w-6 h-6',
  }
  const transitionSize = {
    sm: 'translate-x-[1.1rem]',
    md: 'translate-x-[1.25rem]',
    lg: 'translate-x-[2rem]',
  }
  const transitionSizeUndefined = {
    sm: 'translate-x-[0.55rem]',
    md: 'translate-x-[0.625rem]',
    lg: 'translate-x-[1rem]',
  }

  return (
    <div
      className={twMerge(
        'flex flex-row items-center gap-3',
        fluid && 'justify-between',
        className?.root
      )}
    >
      {labelLeft && label && (
        <Label className={{ root: className?.label }} label={label} />
      )}
      <RadixSwitch.Root
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        checked={checked}
        className={twMerge(
          className?.override,
          'relative rounded-full border-0 bg-uzh-grey-80',
          disabled && 'cursor-not-allowed bg-uzh-grey-40',
          checked && 'bg-primary-60',
          checked && disabled && 'bg-primary-20',
          rootSize[size || 'md'],
          className?.element
        )}
        onCheckedChange={!disabled ? onCheckedChange : () => null}
        onClick={() => (onBlur ? onBlur() : null)}
      >
        <RadixSwitch.Thumb
          className={twMerge(
            className?.thumbOverride,
            'block rounded-full bg-white transition-transform',
            typeof checked === 'undefined' &&
              transitionSizeUndefined[size || 'md'],
            checked === true && transitionSize[size || 'md'],
            thumbSize[size || 'md'],
            className?.thumb
          )}
        />
      </RadixSwitch.Root>
      {!labelLeft && label && (
        <Label className={{ root: className?.label }} label={label} />
      )}
    </div>
  )
}

export default Switch
