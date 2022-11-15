import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixSelect from '@radix-ui/react-select'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from './Button'

// TODO Attention: scrolling does not work because apparently overflow is set to "hidden" on the body

interface ClassName {
  root?: string
  trigger?: string
  viewport?: string
  item?: string
  text?: string
}

export interface Item {
  value: string
  disabled?: boolean // disabled React select
  label: string // displayed name
  shortLabel?: string
}

export interface SelectProps {
  name: string
  items: Item[]
  onChange: (newValue: string) => void
  value?: string
  disabled?: boolean
  size?: 'md' | 'sm'
  className?: ClassName
  placeholder?: string
}

interface SelectItemProps {
  className?: ClassName
  label: string
  size?: string
  value: string
}

const defaultProps = {
  disabled: false,
  size: 'md',
  className: {},
  placeholder: undefined,
}

const SelectItem = React.forwardRef(
  ({ className, label, size, ...props }: SelectItemProps, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={twMerge(
          'relative flex items-center px-8 py-2 rounded-md text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900',
          'rdx-disabled:opacity-50 focus:outline-none select-none',
          size === 'sm' && 'px-7 text-sm',
          className?.item
        )}
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

export function Select({
  items,
  onChange,
  value,
  disabled,
  size,
  className,
  name,
  placeholder,
}: SelectProps) {
  const [open, setOpen] = useState(false)

  const shortValue = value
    ? items.find((item) => item.value === value)?.shortLabel
    : undefined

  return (
    <div className={twMerge('relative flex', className?.root)}>
      <RadixSelect.Root
        name={name}
        onValueChange={onChange}
        onOpenChange={(open) => setOpen(open)}
        value={value}
      >
        <RadixSelect.Trigger asChild id={name}>
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
        <RadixSelect.Content>
          <RadixSelect.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon
              icon={faChevronUp}
              size={size === 'sm' ? 'sm' : '1x'}
            />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport
            className={twMerge(
              'p-1 bg-white rounded-lg shadow-lg dark:bg-gray-800 z-[9999]',
              className?.viewport
            )}
          >
            {items.map((item, ix) => (
              <SelectItem key={ix} {...item} className={className} />
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon
              icon={faChevronDown}
              size={size === 'sm' ? 'sm' : '1x'}
            />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Root>
    </div>
  )
}

Select.defaultProps = defaultProps
export default Select
