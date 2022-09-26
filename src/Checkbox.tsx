import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface CheckboxProps {
  children?: React.ReactNode
  checked: boolean | 'indeterminate'
  disabled?: boolean
  onCheck: any
  label?: string | React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const defaultProps = {
  children: undefined,
  disabled: false,
  label: '',
  size: 'md',
  className: '',
}

export function Checkbox({
  children,
  checked,
  disabled,
  label,
  onCheck,
  size,
  className,
}: CheckboxProps): React.ReactElement {
  const tickStyle = {
    sm: 'h-[0.8rem] mb-[0.4rem]',
    md: 'h-4 mb-[0.19rem]',
    lg: 'h-5 mt-[0.09rem]',
    xl: 'h-6 mt-[0.09rem]',
  }
  const checkboxSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  }

  return (
    <div className="flex flex-row gap-2">
      <RadixCheckbox.Root
        defaultChecked
        checked={checked}
        className={twMerge(
          'flex justify-center p-0 bg-white border border-solid rounded-md border-grey-80 align-center my-auto',
          checked && 'border-black',
          disabled && 'cursor-not-allowed',
          checkboxSize[size || 'md'],
          className
        )}
        disabled={disabled}
        onCheckedChange={() => onCheck()}
      >
        <RadixCheckbox.CheckboxIndicator>
          {children || (
            <FontAwesomeIcon
              icon={faCheck}
              className={tickStyle[size || 'md']}
            />
          )}
        </RadixCheckbox.CheckboxIndicator>
      </RadixCheckbox.Root>
      <div className="flex flex-col justify-center h-full">{label}</div>
    </div>
  )
}

Checkbox.defaultProps = defaultProps
export default Checkbox
