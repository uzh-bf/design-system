import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixSelect from '@radix-ui/react-select'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

interface ClassName {
  root?: string
  trigger?: string
  content?: string
  item?: string
  text?: string
  groupLabel?: string
  separator?: string
}

interface SelectProps {
  name: string
  onChange: (newValue: string) => void
  value?: string
  disabled?: boolean
  size?: 'md' | 'sm'
  className?: ClassName
  placeholder?: string
}

export interface Item {
  value: string
  disabled?: boolean // disabled React select
  label: string // displayed name
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
  className: {},
  placeholder: undefined,
}

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

  // TODO: check if works - HANDLE GROUPS AS WELL!!
  const shortValue = value
    ? items?.find((item) => item.value === value)?.shortLabel
    : undefined

  return (
    <div className={twMerge('relative flex', className?.root)}>
      <RadixSelect.Root
        name={name}
        onValueChange={onChange}
        onOpenChange={(open) => setOpen(open)}
        value={value}
      >
        <RadixSelect.Trigger className="inline-flex items-center justify-center gap-2 bg-white rounded-md shadow-sm h-7">
          <Button
            disabled={disabled}
            className={twMerge(size === 'sm' && '!text-sm', className?.trigger)}
          >
            {shortValue || <RadixSelect.Value placeholder={placeholder} />}

            <RadixSelect.Icon
              className={twMerge('ml-2', size === 'sm' && 'ml-0.5')}
            >
              <FontAwesomeIcon
                icon={open ? faChevronUp : faChevronDown}
                size={size === 'sm' ? 'sm' : '1x'}
              />
            </RadixSelect.Icon>
          </Button>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className={twMerge(
              'overflow-hidden bg-white rounded-md shadow-md',
              className?.content
            )}
          >
            <RadixSelect.ScrollUpButton className="flex items-center justify-center bg-white h-7">
              <FontAwesomeIcon
                icon={faChevronUp}
                size={size === 'sm' ? 'sm' : '1x'}
              />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="p-1 rounded-lg dark:bg-gray-800 z-[9999]">
              {items
                ? items.map((item, ix) => (
                    <SelectItem key={ix} {...item} className={className} />
                  ))
                : groups.map((group, ix) => (
                    <SelectGroup key={ix} {...group} className={className} />
                  ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="flex items-center justify-center bg-white h-7">
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
    return (
      <RadixSelect.Item
        className={twMerge(
          'relative flex items-center px-8 py-2 rounded-md text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900',
          'rdx-disabled:opacity-50 focus:outline-none select-none',
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
  showSeparator?: boolean
  label?: string
  className?: ClassName
}

const SelectGroup = ({
  items,
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
      <RadixSelect.Group>
        <RadixSelect.Label
          className={twMerge('p-1 font-bold', className?.groupLabel)}
        >
          {label}
        </RadixSelect.Label>
        {items.map((item, ix) => (
          <SelectItem key={ix} {...item} className={className} />
        ))}
      </RadixSelect.Group>
    </>
  )
}

Select.defaultProps = defaultProps
export default Select
