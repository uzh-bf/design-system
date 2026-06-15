'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export interface ComboboxItem {
  value: string
  label: string | React.ReactNode
  disabled?: boolean
  data?: {
    cy?: string
    test?: string
  }
}

export interface ComboboxClassName {
  trigger?: string
  content?: string
  item?: string
}

export interface ComboboxProps {
  id?: string
  items: ComboboxItem[]
  value?: string
  onChange: (newValue: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  ariaLabel?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: ComboboxClassName
}

/**
 * This function returns a pre-styled Combobox: a searchable single-select built by
 * composing the Popover and Command (cmdk) primitives. The open state is managed
 * internally, while the selected value is managed externally and passed in.
 *
 * @param id - The id of the combobox trigger.
 * @param items - The array of selectable items. Each item needs a unique string `value` and a `label`.
 * @param value - The currently selected value (managed externally).
 * @param onChange - Function called with the new value when an item is selected.
 * @param placeholder - Text shown on the trigger when no value is selected.
 * @param searchPlaceholder - Placeholder text shown in the search input.
 * @param emptyText - Text shown when the search yields no results.
 * @param disabled - Specifies whether the combobox is disabled or not.
 * @param ariaLabel - Optional accessible name for the trigger (use when the visible label is ambiguous).
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy).
 * @param className - The optional className object allows you to override the default styling.
 * @returns Combobox component
 */
export function Combobox({
  id,
  items,
  value,
  onChange,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  emptyText = 'No results found.',
  disabled = false,
  ariaLabel,
  data,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  const selectedItem = items.find((item) => item.value === value)

  // The trigger is a disclosure button (aria-haspopup), NOT a combobox itself —
  // cmdk's CommandInput is the real role="combobox". A plain button derives its
  // accessible name from its visible content (selected label / placeholder), so
  // the optional `ariaLabel` is only an override for ambiguous cases.
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel}
          disabled={disabled}
          data-cy={data?.cy}
          data-test={data?.test}
          className={twMerge(
            'w-60 justify-between font-normal',
            className?.trigger
          )}
        >
          <span className="truncate">
            {selectedItem ? selectedItem.label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={twMerge('w-60 p-0', className?.content)}
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  keywords={
                    typeof item.label === 'string' ? [item.label] : undefined
                  }
                  disabled={item.disabled}
                  data-cy={item.data?.cy}
                  data-test={item.data?.test}
                  onSelect={() => {
                    onChange(item.value)
                    setOpen(false)
                  }}
                  className={className?.item}
                >
                  <Check
                    className={twMerge(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Combobox
