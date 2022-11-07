import * as RadixLabel from '@radix-ui/react-label'
import * as RadixSwitch from '@radix-ui/react-switch'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface SwitchProps {
  className?: string
  disabled?: boolean
  id: string
  label: string
  checked: boolean
  onCheckedChange: (newValue: boolean) => void
  fluid?: boolean
  labelLeft?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const defaultProps = {
  className: '',
  disabled: false,
  fluid: false,
  labelLeft: false,
  size: 'md',
}

export function Switch({
  className,
  disabled,
  id,
  label,
  checked,
  onCheckedChange,
  fluid,
  labelLeft,
  size,
}: SwitchProps) {
  const theme = useContext(ThemeContext)

  const rootSize = {
    sm: 'w-10 h-[1.3rem]',
    md: 'w-12 h-[1.6rem]',
    lg: 'w-16 h-[1.8rem]',
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
        className
      )}
    >
      {labelLeft && <RadixLabel.Root htmlFor={id}>{label}</RadixLabel.Root>}
      <RadixSwitch.Root
        checked={checked}
        className={twMerge(
          'relative bg-uzh-grey-80 rounded-full border-0',
          disabled && 'bg-uzh-grey-40 cursor-not-allowed',
          checked && theme.primaryBgDark,
          rootSize[size || 'md']
        )}
        onCheckedChange={!disabled ? onCheckedChange : () => null}
      >
        <RadixSwitch.Thumb
          className={twMerge(
            'block bg-white rounded-full transition-transform',
            checked && transitionSize[size || 'md'],
            thumbSize[size || 'md']
          )}
        />
      </RadixSwitch.Root>
      {!labelLeft && <RadixLabel.Root htmlFor={id}>{label}</RadixLabel.Root>}
    </div>
  )
}

Switch.defaultProps = defaultProps
export default Switch
