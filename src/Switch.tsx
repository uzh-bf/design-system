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
}

export function Switch({
  className,
  disabled,
  id,
  label,
  checked,
  onCheckedChange,
  fluid,
}: SwitchProps) {
  const theme = useContext(ThemeContext)

  return (
    <div
      className={twMerge(
        'flex flex-row items-center gap-3',
        fluid && 'justify-between',
        className
      )}
    >
      <RadixLabel.Root htmlFor={id}>{label}</RadixLabel.Root>
      <RadixSwitch.Root
        disabled={disabled}
        id={id}
        className={twMerge(
          'w-8 h-4 rounded-full',
          theme.primaryBgDark,
          disabled && 'bg-gray-700'
        )}
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <RadixSwitch.Thumb
          className={twMerge(
            'block w-4 h-4 bg-white border rounded-full shadow',
            disabled && 'bg-gray-700'
          )}
        />
      </RadixSwitch.Root>
    </div>
  )
}

export default Switch
