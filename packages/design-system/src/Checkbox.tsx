'use client'

import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
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
  partial?: boolean
  disabled?: boolean
  onCheck: () => void
  label?: string | React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  style?: { root?: React.CSSProperties; label?: React.CSSProperties }
  className?: {
    root?: string
    label?: string
    indicator?: string
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
 * @param partial - Indicate whether the checkbox is partially checked or not. If the checked attribute is true, it will alwawys override the partial condition simplified logic.
 * @param onCheck - The function that is called when the checkbox is checked or unchecked.
 * @param disabled - Indicate whether the checkbox is disabled or not.
 * @param label - The label of the checkbox.
 * @param size - The size of the checkbox (can be small, medium, large or extra large).
 * @param style - The optional style object allows you to override the default styling.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Checkbox component
 */
export function Checkbox({
  id,
  data,
  children,
  checked,
  partial = false,
  disabled = false,
  label,
  onCheck,
  size = 'md',
  style,
  className,
}: CheckboxProps): React.ReactElement {
  const tickStyle = {
    sm: 'h-[0.8rem]',
    md: 'h-4',
    lg: 'h-5',
    xl: 'h-6',
  }
  const checkboxSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  }
  const maxLabelWidth = {
    sm: 'max-w-[calc(100%-1.5rem)]',
    md: 'max-w-[calc(100%-1.75rem)]',
    lg: 'max-w-[calc(100%-2rem)]',
    xl: 'max-w-[calc(100%-2.25rem)]',
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <RadixCheckbox.Root
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        defaultChecked
        checked={checked || partial}
        className={twMerge(
          'peer border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground disabled:bg-uzh-grey-20 disabled:border-border h-4 w-4 shrink-0 cursor-pointer rounded-md border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed',
          (checked || partial) && 'border-black',
          disabled && 'cursor-not-allowed',
          checkboxSize[size],
          className?.root
        )}
        style={style?.root}
        disabled={disabled}
        onCheckedChange={() => onCheck()}
      >
        <RadixCheckbox.CheckboxIndicator
          className={twMerge(
            'flex items-center justify-center text-current',
            className?.indicator
          )}
        >
          {children || (
            <FontAwesomeIcon
              icon={checked ? faCheck : faMinus}
              className={tickStyle[size || 'md']}
            />
          )}
        </RadixCheckbox.CheckboxIndicator>
      </RadixCheckbox.Root>
      {label && (
        <div
          style={style?.label}
          className={twMerge(
            'flex h-full flex-col justify-center',
            maxLabelWidth[size],
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
