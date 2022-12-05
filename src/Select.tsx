import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixSelect from '@radix-ui/react-select'
import React, { useContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

interface ClassName {
  root?: string
  trigger?: string
  content?: string
  item?: string
  text?: string
  scrollButton?: string
  groupLabel?: string
  separator?: string
}

interface SelectProps {
  name?: string
  onChange: (newValue: string) => void
  value?: string
  disabled?: boolean
  size?: 'md' | 'sm'
  className?: ClassName
  placeholder?: string
}

export interface Item {
  value: string
  disabled?: boolean
  label: string
  shortLabel?: string
}

export interface SelectWithItemsProps extends SelectProps {
  items: Item[]
  groups?: never
}

export interface SelectWithGroupsProps extends SelectProps {
  groups: {
    label?: string
    showSeparator?: boolean
    items: Item[]
  }[]
  items?: never
}

const defaultProps = {
  disabled: false,
  size: 'md',
  className: undefined,
  placeholder: undefined,
}

/**
 * This function returns a pre-styled Select component based on the RadixUI select component and the custom theme.
 * While the open state of the component is managed internally, the value of the component is managed externally and passed to the function.
 *
 * @param items The array of items that are displayed in the select component. This prop is mutually exclusive with the groups prop. If items are provided, the component does not look for groups anymore.
 * @param groups The array of groups that are displayed in the select component. This prop is mutually exclusive with the items prop.
 * @param name The name attribute of the select component needed for Formik integration --> see FormikSelectField
 * @param onChange The function that is called when the value of the select component changes (changes externally managed value).
 * @param value The current value of the select component (managed externally).
 * @param placeholder The placeholder text that is displayed when no value is selected.
 * @param disabled Specifies whether the select component is disabled or not.
 * @param size The size of the select component. Currently only medium and small are supported.
 * @param className The optional className object allows you to override the default styling.
 * @return Select component
 */
export function Select({
  items,
  groups,
  onChange,
  value,
  disabled,
  size,
  className,
  name,
  placeholder,
}: SelectWithItemsProps | SelectWithGroupsProps) {
  const [open, setOpen] = useState(false)
  const theme = useContext(ThemeContext)

  const flatItems = items || groups?.flatMap((group) => group.items) || []

  return (
    <div className={twMerge('relative flex', className?.root)}>
      <RadixSelect.Root
        name={name}
        onValueChange={onChange}
        onOpenChange={(open) => setOpen(open)}
        value={value}
      >
        <RadixSelect.Trigger
          className={twMerge(
            'inline-flex items-center justify-center gap-2 p-4 bg-white rounded-md shadow-sm h-7 border',
            `hover:${theme.primaryBg} hover:${theme.primaryText}`,
            disabled &&
              'bg-uzh-grey-20 hover:bg-none, hover:text-none opacity-70 cursor-not-allowed shadow-sm',
            size === 'sm' && '!text-sm',
            className?.trigger
          )}
          disabled={disabled}
        >
          <div
            className={
              flatItems?.find((item) => item.value === value)?.shortLabel &&
              'hidden'
            }
          >
            <RadixSelect.Value placeholder={placeholder} />
          </div>
          <div
            className={twMerge(
              'hidden',
              flatItems?.find((item) => item.value === value)?.shortLabel &&
                'block'
            )}
          >
            {flatItems?.find((item) => item.value === value)?.shortLabel}
          </div>

          <RadixSelect.Icon
            className={twMerge('ml-2', size === 'sm' && 'ml-0.5')}
          >
            <FontAwesomeIcon
              icon={open ? faChevronUp : faChevronDown}
              size={size === 'sm' ? 'sm' : '1x'}
            />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className={twMerge(
              'overflow-hidden bg-white rounded-md shadow-md z-[9999]',
              className?.content
            )}
          >
            <RadixSelect.ScrollUpButton
              className={twMerge(
                'flex items-center justify-center bg-white h-7',
                className?.scrollButton
              )}
            >
              <FontAwesomeIcon
                icon={faChevronUp}
                size={size === 'sm' ? 'sm' : '1x'}
              />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="p-1 rounded-lg dark:bg-gray-800">
              {items
                ? items.map((item, ix) => (
                    <SelectItem
                      key={ix}
                      size={size}
                      {...item}
                      className={className}
                    />
                  ))
                : groups.map((group, ix) => (
                    <SelectGroup
                      key={ix}
                      size={size}
                      {...group}
                      className={className}
                    />
                  ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton
              className={twMerge(
                'flex items-center justify-center bg-white h-7',
                className?.scrollButton
              )}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                size={size === 'sm' ? 'sm' : '1x'}
              />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  )
}

interface SelectItemProps {
  label: string
  className?: ClassName
  size?: string
  value: string
  disabled?: boolean
}

const SelectItem = React.forwardRef(
  (
    { className, label, size, disabled, ...props }: SelectItemProps,
    forwardedRef
  ) => {
    const theme = useContext(ThemeContext)

    return (
      <RadixSelect.Item
        className={twMerge(
          'relative flex items-center px-8 py-2 rounded-md text-gray-700 dark:text-gray-300 font-medium hover:cursor-pointer',
          `focus:outline-none select-none  hover:${theme.primaryBg} hover:${theme.primaryText}`,
          'rdx-disabled:opacity-50 rdx-disabled:cursor-not-allowed rdx-disabled:hover:bg-white',
          'rdx-disabled:hover:text-gray-700 rdx-disabled:dark:hover:text-gray-300',
          size === 'sm' && 'px-7 text-sm',
          className?.item
        )}
        disabled={disabled}
        {...props}
        ref={forwardedRef as React.ForwardedRef<HTMLDivElement>}
      >
        <RadixSelect.ItemText className={twMerge(className?.text)}>
          {label}
        </RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute inline-flex items-center left-2">
          <FontAwesomeIcon icon={faCheck} size={size === 'sm' ? 'sm' : '1x'} />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    )
  }
)

interface SelectGroupProps {
  items: Item[]
  size?: 'md' | 'sm'
  showSeparator?: boolean
  label?: string
  className?: ClassName
}

const SelectGroup = ({
  items,
  size,
  showSeparator,
  label,
  className,
  ...props
}: SelectGroupProps) => {
  return (
    <>
      {showSeparator && (
        <RadixSelect.Separator
          className={twMerge('h-0.5 bg-black', className?.separator)}
        />
      )}
      <RadixSelect.Group {...props}>
        <RadixSelect.Label
          className={twMerge(
            'p-1 font-bold',
            size === 'sm' && '!text-sm',
            className?.groupLabel
          )}
        >
          {label}
        </RadixSelect.Label>
        {items.map((item, ix) => (
          <SelectItem key={ix} size={size} {...item} className={className} />
        ))}
      </RadixSelect.Group>
    </>
  )
}

Select.defaultProps = defaultProps
export default Select
