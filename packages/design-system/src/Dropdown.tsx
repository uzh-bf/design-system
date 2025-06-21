'use client'

import { twMerge } from 'tailwind-merge'
import Tooltip from './Tooltip'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

type BaseItem = {
  id?: string
  disabled?: boolean
  shortcut?: string
  tooltip?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    item?: string
    tooltip?: string
  }
}

interface StandardItem extends BaseItem {
  type?: 'standard'
  value?: never
  label: string | React.ReactNode
  items?: never
  onClick: React.MouseEventHandler
  selected?: boolean
}

interface CheckboxItem extends BaseItem {
  type: 'checkbox'
  value?: never
  label: string | React.ReactNode
  items?: never
  onClick: React.MouseEventHandler
  selected: boolean
}

interface RadioItem extends BaseItem {
  type: 'radio'
  value: string
  label: string | React.ReactNode
  items?: never
  onClick: React.MouseEventHandler
  selected?: never
}

interface LabelItem extends BaseItem {
  type: 'label'
  value?: never
  label: string | React.ReactNode
  items?: never
  onClick?: never
  selected?: never
}

interface SeparatorItem extends BaseItem {
  type: 'separator'
  value?: never
  label?: never
  items?: never
  onClick?: never
  selected?: never
}

interface SubmenuItem extends BaseItem {
  type?: 'submenu'
  value?: never
  label: string | React.ReactNode
  items: Item[]
  onClick?: never
  selected?: never
}

type Item =
  | StandardItem
  | CheckboxItem
  | RadioItem
  | LabelItem
  | SeparatorItem
  | SubmenuItem

interface DropdownProps {
  id?: string
  disabled?: boolean
  trigger: string | React.ReactNode
  items?: Item[]
  radioGroups?: { value?: string; items: Item[] }[]
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    trigger?: string
    viewport?: string
    item?: string
    group?: string
  }
}

export interface DropdownWithItemsProps extends DropdownProps {
  items: Item[]
  radioGroups?: never
}
export interface DropdownWithGroupsProps extends DropdownProps {
  items?: never
  radioGroups: { value?: string; items: Item[] }[]
}

/**
 * This function returns a pre-styled Dropdown component based on the RadixUI dropdown component and the custom theme.
 *
 * @param id - The id of the dropdown.
 * @param trigger - The content of the trigger button or a custom trigger component to replace the default button.
 * @param items - The items that are displayed in the dropdown menu. This attribute should not be set, if groups are used.
 * @param radioGroups - The radio groups that are displayed in the dropdown menu. This attribute should not be set, if items are used.
 * @param className - The optional className object allows you to override the default styling.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param disabled - Indicate whether the dropdown is disabled or not. Conditional styling is applied, if this is true.
 * @returns Dropdown component
 */
export function Dropdown({
  id,
  disabled = false,
  trigger,
  items,
  radioGroups,
  data,
  className,
}: DropdownWithItemsProps | DropdownWithGroupsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        id={id}
        disabled={disabled}
        className={twMerge(
          'inline-flex h-max items-center justify-center whitespace-normal rounded-md border border-input bg-background px-3 py-1.5 text-base font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          className?.trigger
        )}
        data-cy={data?.cy}
        data-test={data?.test}
      >
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className?.viewport}>
        {typeof items !== 'undefined'
          ? items.map((item) => {
              return (
                <DropdownItem
                  key={item.id}
                  item={item}
                  className={className?.item}
                />
              )
            })
          : radioGroups.map((group, index) => (
              <DropdownMenuRadioGroup key={index} value={group.value}>
                {group.items.map((item) => {
                  return (
                    <DropdownItem
                      key={item.id}
                      item={item}
                      className={className?.item}
                    />
                  )
                })}
              </DropdownMenuRadioGroup>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownItem({
  item,
  className,
}: {
  item: Item
  className?: string
}) {
  switch (item.type) {
    case 'separator': {
      return (
        <DropdownMenuSeparator
          id={item.id}
          data-cy={item.data?.cy}
          data-test={item.data?.test}
          className={twMerge('text-base', className, item.className?.item)}
        />
      )
    }

    case 'label': {
      return (
        <DropdownMenuLabel
          id={item.id}
          data-cy={item.data?.cy}
          data-test={item.data?.test}
          className={twMerge(
            'text-base',
            item.disabled && 'cursor-not-allowed',
            className,
            item.className?.item
          )}
        >
          {item.label}
        </DropdownMenuLabel>
      )
    }

    case 'submenu': {
      return (
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            id={item.id}
            data-cy={item.data?.cy}
            data-test={item.data?.test}
            className={twMerge(
              'text-base',
              item.disabled && 'cursor-not-allowed',
              className,
              item.className?.item
            )}
          >
            {item.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {item.items.map((subItem) => (
              <DropdownItem
                key={subItem.id}
                item={subItem}
                className={twMerge(
                  'text-base',
                  item.disabled && 'cursor-not-allowed',
                  className,
                  subItem.className?.item
                )}
              />
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      )
    }

    case 'standard':
    case undefined: {
      return (
        <DropdownMenuItem
          id={item.id}
          disabled={item.disabled}
          onClick={item.onClick}
          data-cy={item.data?.cy}
          data-test={item.data?.test}
          className={twMerge(
            'text-base',
            item.disabled && 'cursor-not-allowed',
            className,
            item.className?.item
          )}
        >
          <DropdownLabelShortcut
            label={item.label}
            shortcut={item.shortcut}
            tooltip={item.tooltip}
            tooltipClassName={item.className?.tooltip}
          />
        </DropdownMenuItem>
      )
    }

    case 'radio': {
      return (
        <DropdownMenuRadioItem
          id={item.id}
          disabled={item.disabled}
          value={item.value}
          onClick={item.onClick}
          data-cy={item.data?.cy}
          data-test={item.data?.test}
          className={twMerge(
            'text-base',
            item.disabled && 'cursor-not-allowed',
            className,
            item.className?.item
          )}
        >
          <DropdownLabelShortcut
            label={item.label}
            shortcut={item.shortcut}
            tooltip={item.tooltip}
            tooltipClassName={item.className?.tooltip}
          />
        </DropdownMenuRadioItem>
      )
    }

    case 'checkbox': {
      return (
        <DropdownMenuCheckboxItem
          id={item.id}
          disabled={item.disabled}
          checked={item.selected}
          onClick={item.onClick}
          data-cy={item.data?.cy}
          data-test={item.data?.test}
          className={twMerge(
            'text-base',
            item.disabled && 'cursor-not-allowed',
            className,
            item.className?.item
          )}
        >
          <DropdownLabelShortcut
            label={item.label}
            shortcut={item.shortcut}
            tooltip={item.tooltip}
            tooltipClassName={item.className?.tooltip}
          />
        </DropdownMenuCheckboxItem>
      )
    }

    default:
      return null
  }
}

export function DropdownLabelShortcut({
  label,
  shortcut,
  tooltip,
  tooltipClassName,
}: {
  label: string | React.ReactNode
  shortcut?: string
  tooltip?: string
  tooltipClassName?: string
}) {
  const labelWithShortcut = (
    <>
      {label}
      {typeof shortcut !== 'undefined' ? (
        <DropdownMenuShortcut className="pl-4">{shortcut}</DropdownMenuShortcut>
      ) : null}
    </>
  )

  if (tooltip) {
    return (
      <Tooltip
        tooltip={tooltip}
        className={{
          tooltip: tooltipClassName,
        }}
      >
        {labelWithShortcut}
      </Tooltip>
    )
  }

  return labelWithShortcut
}

export default Dropdown
