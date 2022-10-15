import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SelectPrimitive from '@radix-ui/react-select'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

// TODO Attention: scrolling does not work because apparently overflow is set to "hidden" on the body

interface Item {
  value: string
  disabled?: boolean // disabled React select
  label: string // displayed name
}

export interface SelectProps {
  items: Item[]
  disabled?: boolean
  className?: string
  triggerStyle?: string
  itemStyle?: string
  onChange: (newValue: String) => void
}
export function Select({
  items,
  disabled,
  className,
  triggerStyle,
  itemStyle,
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false)

  return (
    <SelectPrimitive.Root
      defaultValue={items[0].value}
      onValueChange={onChange}
      onOpenChange={(open) => setOpen(open)}
    >
      <SelectPrimitive.Trigger asChild className={triggerStyle}>
        <Button disabled={disabled}>
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-2">
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
          </SelectPrimitive.Icon>
        </Button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon icon={faChevronUp} />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport
          className={twMerge(
            'p-1 bg-white rounded-lg shadow-lg dark:bg-gray-800 z-[9999]',
            className
          )}
        >
          <SelectPrimitive.Group>
            {items.map((item, ix) => (
              <SelectPrimitive.Item
                disabled={item.disabled}
                key={ix}
                value={item.value}
                className={twMerge(
                  'relative flex items-center px-8 py-2 rounded-md text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900',
                  'rdx-disabled:opacity-50 focus:outline-none select-none'
                )}
              >
                <SelectPrimitive.ItemText>
                  <div className={itemStyle}>{item.label}</div>
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute inline-flex items-center left-2">
                  <FontAwesomeIcon icon={faCheck} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon icon={faChevronDown} />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}

export default Select
