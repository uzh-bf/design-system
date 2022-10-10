import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SelectPrimitive from '@radix-ui/react-select'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

export interface SelectProps {
  items: (string | number)[]
  onChange: () => void
}

export function Select({ items, onChange }: SelectProps) {
  return (
    <SelectPrimitive.Root
      defaultValue={String(items[0])}
      onValueChange={onChange}
    >
      <SelectPrimitive.Trigger asChild>
        <Button className="text-sm">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-2">
            <FontAwesomeIcon icon={faChevronDown} />
          </SelectPrimitive.Icon>
        </Button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon icon={faChevronUp} />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 z-[9999]">
          <SelectPrimitive.Group>
            {items.map((item, ix) => (
              <SelectPrimitive.Item
                key={ix}
                value={String(item)}
                className={twMerge(
                  'relative flex items-center px-8 py-2 rounded-md text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900',
                  'radix-disabled:opacity-50',
                  'focus:outline-none select-none'
                )}
              >
                <SelectPrimitive.ItemText>
                  {String(item)}
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
