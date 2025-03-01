import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Tooltip from './Tooltip' // New import for tooltips
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from './ui/select'

export interface SelectClassName {
  root?: string
  trigger?: string
  content?: string
  item?: string
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
  className?: SelectClassName
  placeholder?: string
  defaultValue?: string
  basic?: boolean
  contentPosition?: 'item-aligned' | 'popper'
}

export interface SelectItem {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  value: string
  disabled?: boolean
  label: string | React.ReactNode
  shortLabel?: string
  icon?: React.ReactNode
  className?: {
    item?: string
    tooltip?: string
    label?: string
    icon?: string
  }
  tooltip?: string
}

export interface SelectGroup {
  label?: string | React.ReactNode
  showSeparator?: boolean
  items: SelectItem[]
}

export interface SelectWithItemsProps extends SelectProps {
  items: SelectItem[]
  groups?: never
}

export interface SelectWithGroupsProps extends SelectProps {
  groups: SelectGroup[]
  items?: never
}

// helper component to render the content of the select item
const ItemContent = ({ item }: { item: SelectItem }) => (
  <div
    className={twMerge(
      'flex flex-row items-center gap-2',
      item.className?.item
    )}
  >
    <span className={item.className?.label}>{item.label}</span>
    {item.icon && <span className={item.className?.icon}>{item.icon}</span>}
  </div>
)

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
 * @param basic - Specifies whether the select component is basic or not. A basic select component does only have minimal styling of the trigger.
 * @param className - The optional className object allows you to override the default styling.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
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
  className,
  name,
  placeholder,
  defaultValue,
  basic = false,
  contentPosition = 'item-aligned',
}: SelectWithItemsProps | SelectWithGroupsProps) {
  const [open, setOpen] = useState(false)
  const [shortLabel, setShortLabel] = useState<string | undefined>(undefined)

  useEffect(() => {
    const flatItems = items || groups?.flatMap((group) => group.items) || []
    setShortLabel(flatItems?.find((item) => item.value === value)?.shortLabel)
  }, [value, items, groups])

  return (
    <div className={twMerge('relative flex', className?.root)}>
      <ShadcnSelect
        name={name}
        open={open}
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
        <SelectTrigger
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          className={twMerge(
            'w-[15rem] text-base [&>span]:text-start',
            disabled && 'bg-uzh-grey-20 opacity-70',
            basic && '[all:_unset]',
            className?.trigger
          )}
          hideIcon={basic}
          disabled={disabled}
        >
          {shortLabel ? (
            <SelectValue placeholder={placeholder} key={shortLabel}>
              {shortLabel}
            </SelectValue>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent
          position={contentPosition}
          className={twMerge('z-50', className?.content)}
        >
          {items
            ? items.map((item, ix) => (
                <SelectItem
                  id={id}
                  key={`${item.value}-${ix}`}
                  value={item.value}
                  disabled={item.disabled}
                  data-cy={item.data?.cy}
                  data-test={item.data?.test}
                  className={twMerge(
                    'text-base',
                    item.disabled && 'cursor-not-allowed',
                    className?.item
                  )}
                >
                  {item.tooltip ? (
                    <Tooltip tooltip={item.tooltip}>
                      <ItemContent item={item} />
                    </Tooltip>
                  ) : (
                    <ItemContent item={item} />
                  )}
                </SelectItem>
              ))
            : groups.map((group, ix) => (
                <SelectGroup key={`group-${group.label}-${ix}`}>
                  {group.showSeparator && <SelectSeparator />}
                  {group.label && (
                    <SelectLabel
                      className={twMerge('text-base', className?.groupLabel)}
                    >
                      {group.label}
                    </SelectLabel>
                  )}
                  {group.items.map((item, item_ix) => (
                    <SelectItem
                      id={id}
                      key={`${item.value}-${item_ix}`}
                      value={item.value}
                      disabled={item.disabled}
                      data-cy={item.data?.cy}
                      data-test={item.data?.test}
                      className={twMerge(
                        'text-base',
                        item.disabled && '!cursor-not-allowed',
                        className?.item
                      )}
                    >
                      {item.tooltip ? (
                        <Tooltip tooltip={item.tooltip}>
                          {<ItemContent item={item} />}
                        </Tooltip>
                      ) : (
                        <ItemContent item={item} />
                      )}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  )
}

export default Select
