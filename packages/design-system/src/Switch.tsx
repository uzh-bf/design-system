'use client'

import { faCircleExclamation, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixSwitch from '@radix-ui/react-switch'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from './FormLabel'
import { Tooltip } from './Tooltip'

export interface SwitchClassName {
  root?: string
  element?: string
  thumb?: string
  label?: string
  tooltip?: string
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
  tooltip?: string | React.ReactNode
  fluid?: boolean
  error?: string
  hideError?: boolean
  required?: boolean
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
 * @param tooltip - The tooltip that is displayed when hovering over the label.
 * @param checked - Indicator whether the switch is checked or not (or indefinite if undefined value). State is managed by the parent component.
 * @param onCheckedChange - The function that is called when the switch is checked or unchecked. The new value is passed as a parameter.
 * @param onBlur - The function that is called when the switch loses focus.
 * @param disabled - Indicator whether the switch is disabled or not.
 * @param fluid - Indicator whether the switch should be fluid or not.
 * @param error - The error message that is shown next the switch.
 * @param hideError - Indicator whether the error message should be hidden or not.
 * @param required - Indicator whether the switch is required or not.
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
  tooltip,
  checked,
  onCheckedChange,
  onBlur,
  fluid = false,
  error,
  hideError = false,
  required = false,
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
    md: 'translate-x-5',
    lg: 'translate-x-8',
  }
  const transitionSizeUndefined = {
    sm: 'translate-x-[0.55rem]',
    md: 'translate-x-2.5',
    lg: 'translate-x-4',
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
        <FormLabel
          className={{
            label: twMerge('mr-0', className?.label),
            tooltip: className?.tooltip,
          }}
          label={label}
          labelType="large"
          required={required}
          tooltip={tooltip}
        />
      )}
      <RadixSwitch.Root
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        checked={checked}
        className={twMerge(
          'bg-uzh-grey-80 disabled:bg-uzh-grey-40 relative cursor-pointer rounded-full border-0 disabled:cursor-not-allowed',
          checked && 'bg-primary-60',
          checked && disabled && 'bg-primary-20!',
          !!error && !hideError && 'outline-destructive outline-2',
          rootSize[size || 'md'],
          labelLeft && 'mr-2',
          className?.element
        )}
        onCheckedChange={!disabled ? onCheckedChange : () => null}
        onClick={() => (onBlur ? onBlur() : null)}
        disabled={disabled}
      >
        <RadixSwitch.Thumb
          className={twMerge(
            'flex items-center justify-center rounded-full bg-white transition-transform',
            typeof checked === 'undefined' &&
              transitionSizeUndefined[size || 'md'],
            checked === true && transitionSize[size || 'md'],
            thumbSize[size || 'md'],
            className?.thumb
          )}
        >
          {disabled && (
            <FontAwesomeIcon icon={faLock} className="h-3 w-3 text-gray-400" />
          )}
        </RadixSwitch.Thumb>
      </RadixSwitch.Root>
      {!labelLeft && label && (
        <FormLabel
          className={{ label: className?.label, tooltip: className?.tooltip }}
          label={label}
          labelType="large"
          required={required}
          tooltip={tooltip}
        />
      )}
      {error && !hideError && (
        <Tooltip
          tooltip={error}
          delay={0}
          className={{ tooltip: 'max-w-120 text-sm' }}
        >
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-destructive -mx-2"
          />
        </Tooltip>
      )}
    </div>
  )
}

export default Switch
