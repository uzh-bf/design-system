'use client'

import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as RadixLabel from '@radix-ui/react-label'
import React, { useId } from 'react'
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
  ariaLabel?: string
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
 * @param ariaLabel - Accessible name for the checkbox when no visible label is provided (e.g. a checkbox in a table row). Ignored when label is set.
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
  ariaLabel,
  onCheck,
  size = 'md',
  style,
  className,
}: CheckboxProps): React.ReactElement {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const labelId = `${inputId}-label`
  const tickStyle = {
    sm: 'h-[0.8rem]',
    md: 'h-3',
    lg: 'h-5',
    xl: 'h-6',
  }
  const checkboxSize = {
    sm: 'w-4 h-4',
    md: 'w-[18px] h-[18px]',
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
        id={inputId}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel : undefined}
        data-cy={data?.cy}
        data-test={data?.test}
        defaultChecked
        checked={checked || partial}
        className={twMerge(
          'peer border-input ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground disabled:bg-muted disabled:border-border shrink-0 cursor-pointer rounded-[4px] border-[1.5px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed',
          (checked || partial) && 'border-primary',
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
        <RadixLabel.Root
          id={labelId}
          htmlFor={inputId}
          style={style?.label}
          className={twMerge(
            'flex h-full cursor-pointer flex-col justify-center',
            disabled && 'cursor-not-allowed',
            maxLabelWidth[size],
            className?.label
          )}
        >
          {label}
        </RadixLabel.Root>
      )}
    </div>
  )
}

export default Checkbox
