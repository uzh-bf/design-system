import { twMerge } from 'tailwind-merge'
import Button from './Button'
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
  onClick: React.MouseEventHandler
  selected?: boolean
}

interface CheckboxItem extends BaseItem {
  type: 'checkbox'
  value?: never
  label: string | React.ReactNode
  onClick: React.MouseEventHandler
  selected: boolean
}

interface RadioItem extends BaseItem {
  type: 'radio'
  value: string
  label: string | React.ReactNode
  onClick: React.MouseEventHandler
  selected?: never
}

interface LabelItem extends BaseItem {
  type: 'label'
  value?: never
  label: string | React.ReactNode
  onClick?: never
  selected?: never
}

interface SeparatorItem extends BaseItem {
  type: 'separator'
  value?: never
  label?: never
  onClick?: never
  selected?: never
}

type Item = StandardItem | CheckboxItem | RadioItem | LabelItem | SeparatorItem

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
        className={className?.trigger}
        data-cy={data?.cy}
        data-test={data?.test}
      >
        {typeof trigger === 'string' ? (
          <Button disabled={disabled}>{trigger}</Button>
        ) : (
          trigger
        )}
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
