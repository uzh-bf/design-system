import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface CheckboxProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
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

/**
 * This function returns a pre-styled Checkbox component based on the RadixUI Checkbox component and the custom theme.
 * State is not managed internally and needs to be passed to the component through the checked and onCheck props.
 *
 * @param id - The id of the checkbox.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - Optional content of the checkbox that is shown when the checked attribute is true. By default, this is just replaced by a tick symbol.
 * @param checked - Indicate whether the checkbox is checked or not.
 * @param onCheck - The function that is called when the checkbox is checked or unchecked.
 * @param disabled - Indicate whether the checkbox is disabled or not.
 * @param label - The label of the checkbox.
 * @param size - The size of the checkbox (can be small, medium, large or extra large).
 * @param className - The optional className object allows you to override the default styling.
 * @returns Checkbox component
 */
export function Checkbox({
  id,
  data,
  children,
  checked,
  disabled = false,
  label,
  onCheck,
  size = 'md',
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
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        defaultChecked
        checked={checked}
        className={twMerge(
          'border-grey-80 align-center my-auto flex justify-center rounded-md border border-solid bg-white p-0',
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
      {label && (
        <div
          className={twMerge(
            'flex h-full flex-col justify-center',
            className?.label
          )}
        >
          {label}
        </div>
      )}
    </div>
  )
}

export default Checkbox
