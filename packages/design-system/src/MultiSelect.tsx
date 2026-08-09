'use client'

import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useRef, useState } from 'react'
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

export interface MultiSelectItem {
  value: string
  label: string | React.ReactNode
  disabled?: boolean
  data?: {
    cy?: string
    test?: string
  }
}

export interface MultiSelectClassName {
  trigger?: string
  content?: string
  item?: string
  chip?: string
}

export interface MultiSelectProps {
  id?: string
  ref?: React.Ref<HTMLButtonElement>
  name?: string
  items: MultiSelectItem[]
  value: string[]
  onChange: (newValue: string[]) => void
  onBlur?: () => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  ariaLabel?: string
  ariaRequired?: boolean
  ariaInvalid?: boolean
  ariaDescribedBy?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: MultiSelectClassName
}

/**
 * This function returns a pre-styled MultiSelect: a searchable multi-value select
 * built by composing the Popover and Command (cmdk) primitives. Selected values are
 * shown as removable chips below the trigger (kept OUTSIDE the trigger button so the
 * remove buttons are not nested inside another button). The popover stays open while
 * toggling. The selected values are managed externally via `value` / `onChange`.
 *
 * @param id - The id of the trigger.
 * @param items - The array of selectable items. Each item needs a unique string `value` and a `label`. String labels are searchable (passed to cmdk as keywords); a non-string label is matched only against its `value`.
 * @param value - The currently selected values (managed externally). Chips render in `items` order, not selection order.
 * @param onChange - Function called with the next array of values when an item is toggled or removed.
 * @param placeholder - Text shown on the trigger when nothing is selected.
 * @param searchPlaceholder - Placeholder text shown in the search input.
 * @param emptyText - Text shown when the search yields no results.
 * @param disabled - Specifies whether the multi-select is disabled or not.
 * @param ariaLabel - Optional accessible name for the trigger (use when the visible label is ambiguous).
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy).
 * @param className - The optional className object allows you to override the default styling.
 * @returns MultiSelect component
 */
export function MultiSelect({
  id,
  ref,
  name,
  items,
  value,
  onChange,
  onBlur,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  emptyText = 'No results found.',
  disabled = false,
  ariaLabel,
  ariaRequired,
  ariaInvalid,
  ariaDescribedBy,
  data,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const compositeRef = useRef<HTMLDivElement>(null)
  const openRef = useRef(false)
  const blurNotifiedRef = useRef(false)

  const notifyBlur = () => {
    if (blurNotifiedRef.current) return
    blurNotifiedRef.current = true
    onBlur?.()
  }

  const toggle = (itemValue: string) => {
    onChange(
      value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue]
    )
  }

  const selectedItems = items.filter((item) => value.includes(item.value))

  return (
    <div
      ref={compositeRef}
      className="flex w-60 flex-col gap-2"
      onFocusCapture={(event) => {
        const relatedTarget = event.relatedTarget
        if (
          !relatedTarget ||
          !compositeRef.current?.contains(relatedTarget as Node)
        ) {
          blurNotifiedRef.current = false
        }
      }}
      onBlurCapture={(event) => {
        const relatedTarget = event.relatedTarget
        if (
          relatedTarget &&
          compositeRef.current?.contains(relatedTarget as Node)
        ) {
          return
        }
        if (!openRef.current) notifyBlur()
      }}
    >
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            blurNotifiedRef.current = false
          } else if (openRef.current) {
            notifyBlur()
          }
          openRef.current = nextOpen
          setOpen(nextOpen)
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id={id}
            name={name}
            ref={ref}
            type="button"
            variant="outline"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={ariaLabel}
            aria-required={ariaRequired || undefined}
            aria-invalid={ariaInvalid || undefined}
            aria-describedby={ariaDescribedBy}
            disabled={disabled}
            data-cy={data?.cy}
            data-test={data?.test}
            className={twMerge(
              'w-full justify-between font-normal',
              className?.trigger
            )}
          >
            <span className="truncate">
              {value.length > 0 ? `${value.length} selected` : placeholder}
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
                    onSelect={() => toggle(item.value)}
                    className={className?.item}
                  >
                    <Check
                      className={twMerge(
                        'mr-2 h-4 w-4',
                        value.includes(item.value) ? 'opacity-100' : 'opacity-0'
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

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedItems.map((item) => (
            <span
              key={item.value}
              className={twMerge(
                'bg-primary-20 text-primary-100 inline-flex items-center gap-1 rounded-md py-0.5 pr-1 pl-2 text-sm',
                className?.chip
              )}
            >
              {item.label}
              <button
                type="button"
                aria-label={`Remove ${typeof item.label === 'string' ? item.label : item.value}`}
                disabled={disabled}
                onClick={() => toggle(item.value)}
                className="hover:bg-primary-40 inline-flex size-4 items-center justify-center rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiSelect
