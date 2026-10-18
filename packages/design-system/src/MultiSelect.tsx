'use client'

import { defaultFilter } from 'cmdk'
import { Check, ChevronsUpDown, Search, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from './ui/button'
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
 * built with a Popover and a searchable multi-selection listbox. Selected values are
 * shown as removable chips below the trigger (kept OUTSIDE the trigger button so the
 * remove buttons are not nested inside another button). The popover stays open while
 * toggling. The selected values are managed externally via `value` / `onChange`.
 *
 * @param id - The id of the trigger.
 * @param items - The array of selectable items. Each item needs a unique string `value` and a `label`. String labels are searchable with the cmdk scoring function; a non-string label is matched only against its `value`.
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
  const [search, setSearch] = useState('')
  const [activeValue, setActiveValue] = useState<string | null>(null)
  const listId = useId()
  const compositeRef = useRef<HTMLDivElement>(null)
  const openRef = useRef(false)
  const blurNotifiedRef = useRef(false)

  const notifyBlur = useCallback(() => {
    if (blurNotifiedRef.current) return
    blurNotifiedRef.current = true
    onBlur?.()
  }, [onBlur])

  useEffect(() => {
    if (!disabled) return
    if (openRef.current) notifyBlur()
    openRef.current = false
    setOpen(false)
  }, [disabled, notifyBlur])

  const matches = items
    .map((item) => ({
      item,
      score: search
        ? defaultFilter(
            item.value,
            search,
            typeof item.label === 'string' ? [item.label] : undefined
          )
        : 1,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
  const enabledItems = matches.filter((item) => !item.disabled)
  const activeItem =
    enabledItems.find((item) => item.value === activeValue) ?? enabledItems[0]
  const optionId = (item: MultiSelectItem) => `${listId}-${items.indexOf(item)}`

  const activeId = activeItem ? optionId(activeItem) : undefined
  useEffect(() => {
    if (open && activeId)
      document.getElementById(activeId)?.scrollIntoView({ block: 'nearest' })
  }, [open, activeId])

  const toggle = (itemValue: string) => {
    if (disabled) return
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
          if (nextOpen && disabled) return
          setSearch('')
          setActiveValue(null)
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
            aria-haspopup="dialog"
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
          aria-label={ariaLabel ?? placeholder ?? 'Select options'}
          align="start"
          className={twMerge('w-60 p-0', className?.content)}
        >
          <div className="bg-popover text-popover-foreground flex h-max w-full flex-col overflow-hidden rounded-md">
            <div className="flex h-9 items-center gap-2 border-b px-3">
              <Search
                className="size-4 shrink-0 opacity-50"
                aria-hidden="true"
              />
              <input
                role="combobox"
                aria-label={searchPlaceholder}
                aria-controls={listId}
                aria-expanded={open}
                aria-autocomplete="list"
                aria-activedescendant={activeId}
                placeholder={searchPlaceholder}
                value={search}
                disabled={disabled}
                className="placeholder:text-muted-foreground flex h-10 w-full rounded-md border-none bg-transparent py-3 text-sm outline-hidden focus:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(event) => {
                  setSearch(event.target.value)
                  setActiveValue(null)
                }}
                onKeyDown={(event) => {
                  if (disabled || event.nativeEvent.isComposing) return
                  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault()
                    const index = enabledItems.indexOf(activeItem)
                    setActiveValue(
                      enabledItems[
                        (index +
                          (event.key === 'ArrowDown' ? 1 : -1) +
                          enabledItems.length) %
                          enabledItems.length
                      ]?.value ?? null
                    )
                  } else if (event.key === 'Enter') {
                    event.preventDefault()
                    if (activeItem) toggle(activeItem.value)
                  }
                }}
              />
            </div>
            <div
              id={listId}
              role="listbox"
              aria-label={ariaLabel ?? placeholder}
              aria-multiselectable="true"
              className="max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto p-1"
            >
              {matches.map((item) => (
                <div
                  key={item.value}
                  id={optionId(item)}
                  role="option"
                  tabIndex={-1}
                  aria-selected={value.includes(item.value)}
                  aria-disabled={disabled || item.disabled || undefined}
                  data-active={activeItem === item || undefined}
                  data-disabled={disabled || item.disabled || undefined}
                  data-cy={item.data?.cy}
                  data-test={item.data?.test}
                  onMouseDown={(event) => event.preventDefault()}
                  onPointerMove={() => {
                    if (!disabled && !item.disabled) setActiveValue(item.value)
                  }}
                  onClick={() => {
                    if (!item.disabled) toggle(item.value)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === ' ' || event.key === 'Enter') {
                      event.preventDefault()
                      if (!item.disabled) toggle(item.value)
                    }
                  }}
                  className={twMerge(
                    'data-[active=true]:bg-primary-20 data-[active=true]:text-primary-100 relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[active=true]:font-semibold data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
                    className?.item
                  )}
                >
                  <Check
                    aria-hidden="true"
                    className={twMerge(
                      'mr-2 h-4 w-4',
                      value.includes(item.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </div>
              ))}
            </div>
            {matches.length === 0 && (
              <div role="status" className="py-6 text-center text-sm">
                {emptyText}
              </div>
            )}
          </div>
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
