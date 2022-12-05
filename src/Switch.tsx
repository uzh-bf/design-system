import * as RadixLabel from '@radix-ui/react-label'
import * as RadixSwitch from '@radix-ui/react-switch'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface SwitchProps {
  disabled?: boolean
  id: string
  label: string
  checked: boolean
  onCheckedChange: (newValue: boolean) => void
  fluid?: boolean
  labelLeft?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: {
    root?: string
    element?: string
    thumb?: string
    label?: string
  }
}

const defaultProps = {
  className: undefined,
  disabled: false,
  fluid: false,
  labelLeft: false,
  size: 'md',
}

/**
 * This function returns a pre-styled Switch component based on the RadixUI switch component and the custom theme.
 * The state of the switch is maintained by the parent component.
 *
 * @param id The id of the switch.
 * @param label The label that is displayed next to the switch.
 * @param checked Indicator whether the switch is checked or not. State is managed by the parent component.
 * @param onCheckedChange The function that is called when the switch is checked or unchecked. The new value is passed as a parameter.
 * @param disabled Indicator whether the switch is disabled or not.
 * @param fluid Indicator whether the switch should be fluid or not.
 * @param labelLeft Indicator whether the label should be displayed on the left or right side of the switch.
 * @param size The size of the switch. The size can be small, medium or large.
 * @param className The optional className object allows you to override the default styling.
 * @returns Switch component
 */
export function Switch({
  disabled,
  id,
  label,
  checked,
  onCheckedChange,
  fluid,
  labelLeft,
  size,
  className,
}: SwitchProps) {
  const theme = useContext(ThemeContext)

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

  return (
    <div
      className={twMerge(
        'flex flex-row items-center gap-3',
        fluid && 'justify-between',
        className?.root
      )}
    >
      {labelLeft && (
        <RadixLabel.Root htmlFor={id} className={className?.label}>
          {label}
        </RadixLabel.Root>
      )}
      <RadixSwitch.Root
        checked={checked}
        className={twMerge(
          'relative bg-uzh-grey-80 rounded-full border-0',
          disabled && 'bg-uzh-grey-40 cursor-not-allowed',
          checked && theme.primaryBgDark,
          rootSize[size || 'md'],
          className?.element
        )}
        onCheckedChange={!disabled ? onCheckedChange : () => null}
      >
        <RadixSwitch.Thumb
          className={twMerge(
            'block bg-white rounded-full transition-transform',
            checked && transitionSize[size || 'md'],
            thumbSize[size || 'md'],
            className?.thumb
          )}
        />
      </RadixSwitch.Root>
      {!labelLeft && (
        <RadixLabel.Root htmlFor={id} className={className?.label}>
          {label}
        </RadixLabel.Root>
      )}
    </div>
  )
}

Switch.defaultProps = defaultProps
export default Switch
