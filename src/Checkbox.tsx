import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface CheckboxProps {
  children?: React.ReactNode
  checked: boolean | 'indeterminate'
  disabled?: boolean
  onCheck: () => void
  label?: string | React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: {
    root?: string
    label?: string
  }
}

const defaultProps = {
  children: undefined,
  disabled: false,
  label: '',
  size: 'md',
  className: undefined,
}

/**
 * This function returns a pre-styled Checkbox component based on the RadixUI Checkbox component and the custom theme.
 * State is not managed internally and needs to be passed to the component through the checked and onCheck props.
 *
 * @param children Optional content of the checkbox that is shown when the checked attribute is true. By default, this is just replaced by a tick symbol.
 * @param checked Indicate whether the checkbox is checked or not.
 * @param onCheck The function that is called when the checkbox is checked or unchecked.
 * @param disabled Indicate whether the checkbox is disabled or not.
 * @param label The label of the checkbox.
 * @param size The size of the checkbox (can be small, medium, large or extra large).
 * @param className The optional className object allows you to override the default styling.
 * @returns Checkbox component
 */
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
          className?.root
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
      <div
        className={twMerge(
          'flex flex-col justify-center h-full',
          className?.label
        )}
      >
        {label}
      </div>
    </div>
  )
}

Checkbox.defaultProps = defaultProps
export default Checkbox
