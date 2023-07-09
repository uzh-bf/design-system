import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixSelect from '@radix-ui/react-select'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

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
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  name?: string
  onChange: (newValue: string) => void
  onBlur?: () => void
  value?: string
  disabled?: boolean
  size?: 'md' | 'sm'
  className?: ClassName
  placeholder?: string
  defaultValue?: string
  basic?: boolean
  asPortal?: boolean
}

export interface Item {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
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

/**
 * This function returns a pre-styled Select component based on the RadixUI select component and the custom theme.
 * While the open state of the component is managed internally, the value of the component is managed externally and passed to the function.
 *
 * @param id - The id of the select component.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param items - The array of items that are displayed in the select component. This prop is mutually exclusive with the groups prop. If items are provided, the component does not look for groups anymore.
 * @param groups - The array of groups that are displayed in the select component. This prop is mutually exclusive with the items prop.
 * @param name - The name attribute of the select component needed for Formik integration --> see FormikSelectField
 * @param onChange - The function that is called when the value of the select component changes (changes externally managed value).
 * @param onBlur - The function that is called when the viewport of the select component is closed.
 * @param value - The current value of the select component (managed externally).
 * @param defaultValue - The default value of the select component set initially.
 * @param placeholder - The placeholder text that is displayed when no value is selected.
 * @param disabled - Specifies whether the select component is disabled or not.
 * @param size - The size of the select component. Currently only medium and small are supported.
 * @param basic - Specifies whether the select component is basic or not. A basic select component does only have minimal styling of the trigger.
 * @param className - The optional className object allows you to override the default styling.
 * @param asPortal - If true, the select component is rendered as a portal.
 * @return Select component
 */
export function Select({
  id,
  data,
  items,
  groups,
  onChange,
  onBlur,
  value,
  disabled = false,
  size = 'md',
  className,
  name,
  placeholder,
  defaultValue,
  basic = false,
  asPortal = false,
}: SelectWithItemsProps | SelectWithGroupsProps) {
  const [open, setOpen] = useState(false)
  const flatItems = items || groups?.flatMap((group) => group.items) || []

  const selectContent = (
    <RadixSelect.Content
      className={twMerge(
        'z-50 overflow-hidden rounded-md bg-white shadow-md',
        className?.content
      )}
    >
      <RadixSelect.ScrollUpButton
        className={twMerge(
          'flex h-7 items-center justify-center bg-white',
          className?.scrollButton
        )}
      >
        <FontAwesomeIcon
          icon={faChevronUp}
          size={size === 'sm' ? 'sm' : '1x'}
        />
      </RadixSelect.ScrollUpButton>
      <RadixSelect.Viewport className="rounded-lg p-1">
        {items
          ? items.map((item, ix) => (
              <SelectItem
                id={id}
                data-cy={data?.cy}
                data-test={data?.test}
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
          'flex h-7 items-center justify-center bg-white',
          className?.scrollButton
        )}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          size={size === 'sm' ? 'sm' : '1x'}
        />
      </RadixSelect.ScrollDownButton>
    </RadixSelect.Content>
  )

  return (
    <div className={twMerge('relative flex', className?.root)}>
      <RadixSelect.Root
        name={name}
        onValueChange={onChange}
        onOpenChange={(open) => {
          setOpen(open)
          if (!open && onBlur) {
            onBlur()
          }
        }}
        value={value}
        defaultValue={defaultValue}
      >
        <RadixSelect.Trigger
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          className={twMerge(
            'rounded-md px-2 py-1',
            !basic &&
              'inline-flex h-7 items-center justify-center gap-2 border  bg-white p-4 shadow-sm hover:bg-primary-20 sm:hover:text-primary',
            disabled &&
              'hover:bg-none, hover:text-none cursor-not-allowed bg-uzh-grey-20 opacity-70 shadow-sm',
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

          {!basic && (
            <RadixSelect.Icon
              className={twMerge('ml-2', size === 'sm' && 'ml-0.5')}
            >
              <FontAwesomeIcon
                icon={open ? faChevronUp : faChevronDown}
                size={size === 'sm' ? 'sm' : '1x'}
              />
            </RadixSelect.Icon>
          )}
        </RadixSelect.Trigger>
        {asPortal ? (
          <RadixSelect.Portal>{selectContent}</RadixSelect.Portal>
        ) : (
          selectContent
        )}
      </RadixSelect.Root>
    </div>
  )
}

interface SelectItemProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label: string
  className?: ClassName
  size?: string
  value: string
  disabled?: boolean
}

const SelectItem = React.forwardRef(
  (
    { id, data, className, label, size, disabled, ...props }: SelectItemProps,
    forwardedRef
  ) => {
    return (
      <RadixSelect.Item
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        className={twMerge(
          'relative flex select-none items-center rounded-md px-8 py-2 font-medium text-gray-700',
          'hover:cursor-pointer hover:bg-primary-20 hover:outline-none focus:border-primary-40 sm:hover:text-primary',
          disabled &&
            'cursor-not-allowed opacity-50 hover:bg-white hover:text-gray-700',
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
        <RadixSelect.ItemIndicator className="absolute left-2 inline-flex items-center">
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

export default Select
