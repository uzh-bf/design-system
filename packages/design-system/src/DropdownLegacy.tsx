import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Tooltip from './Tooltip'

interface Item {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label: string | React.ReactNode
  onClick: React.MouseEventHandler
  shorting?: string
  selected?: boolean
  icon?: React.ReactNode
  tooltip?: string
  disabled?: boolean
  className?: {
    item?: string
    tooltip?: string
    label?: string
    icon?: string
  }
}
interface DropdownProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  trigger: string | React.ReactNode
  triggerIcon?: IconDefinition
  items?: Item[]
  activeItems?: string[]
  groups?: Item[][]
  className?: {
    trigger?: string
    triggerDisabled?: string
    viewport?: string
    item?: string
    activeItem?: string
    group?: string
    arrow?: string
  }
  disabled?: boolean
}

export interface DropdownLegacyWithItemsProps extends DropdownProps {
  items: Item[]
  groups?: never
}
export interface DropdownLegacyWithGroupsProps extends DropdownProps {
  items?: never
  groups: Item[][]
}

/**
 * This function returns a pre-styled Dropdown component based on the RadixUI dropdown component and the custom theme.
 *
 * @param id - The id of the dropdown.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param trigger - The content of the trigger button or a custom trigger component to replace the default button.
 * @param triggerIcon - The icon that is displayed next to the trigger content.
 * @param items - The items that are displayed in the dropdown menu. This attribute should not be set, if groups are used.
 * @param activeItems - List of labels that should be considered active. This attribute has a similar function as the "select" attribute on the item props and should not be used at the same time.
 * @param groups - The groups of items that are displayed in the dropdown menu. This attribute should not be set, if items are used.
 * @param className - The optional className object allows you to override the default styling.
 * @param disabled - Indicate whether the dropdown is disabled or not. Conditional styling is applied, if this is true.
 * @returns Dropdown component
 */
export function DropdownLegacy({
  id,
  data,
  trigger,
  triggerIcon,
  items,
  activeItems,
  groups,
  className,
  disabled = false,
}: DropdownLegacyWithItemsProps | DropdownLegacyWithGroupsProps) {
  return (
    <RadixDropdown.Root>
      {typeof trigger === 'string' ? (
        <RadixDropdown.Trigger
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          className={twMerge(
            'inline-flex h-7 items-center justify-between gap-3 rounded-md border',
            'hover:bg-primary-20 hover:text-primary-100 bg-white py-1.5 pl-2 pr-2 shadow-sm',
            disabled &&
              'hover:bg-none, hover:text-none bg-uzh-grey-20 cursor-not-allowed opacity-70 shadow-sm',
            className?.trigger
          )}
          disabled={disabled}
        >
          <div>{trigger}</div>
          {triggerIcon && (
            <FontAwesomeIcon icon={triggerIcon} size="sm" className="mb-0.5" />
          )}
        </RadixDropdown.Trigger>
      ) : (
        <RadixDropdown.Trigger
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          disabled={disabled}
          className={twMerge(
            disabled && 'cursor-not-allowed text-gray-500 hover:bg-white',
            className?.trigger
          )}
        >
          {trigger}
        </RadixDropdown.Trigger>
      )}

      <RadixDropdown.Content
        className={twMerge(
          'rounded-lg border border-solid bg-white p-1 shadow-md',
          className?.viewport
        )}
      >
        <RadixDropdown.Arrow
          className={twMerge('fill-gray-500 opacity-25', className?.arrow)}
        />

        {items && (
          <div className="border-uzh-grey-100 border-b border-solid pb-1 first:pt-0 last:border-b-0 last:pb-0">
            {items.map((item, index) => (
              <DropdownItem
                key={index}
                label={item.label}
                onClick={item.onClick}
                shorting={item.shorting}
                selected={item.selected}
                active={
                  typeof item.label === 'string' &&
                  activeItems?.includes(item.label)
                }
                className={{
                  root: className?.item,
                  active: className?.activeItem,
                }}
                data={item.data}
                icon={item.icon}
                tooltip={item.tooltip}
                disabled={item.disabled}
              />
            ))}
          </div>
        )}

        {groups &&
          !items &&
          groups.map((groupItems, groupIndex) => (
            <div
              key={groupIndex}
              className="border-uzh-grey-100 border-b border-solid pb-1 pt-1 first:pt-0 last:border-b-0 last:pb-0"
            >
              <RadixDropdown.Group className={className?.group}>
                {groupItems.map((item) => (
                  <DropdownItem
                    label={item.label}
                    onClick={item.onClick}
                    shorting={item.shorting}
                    className={{
                      root: className?.item,
                      active: className?.activeItem,
                    }}
                    data={item.data}
                    icon={item.icon}
                    tooltip={item.tooltip}
                    disabled={item.disabled}
                  />
                ))}
              </RadixDropdown.Group>
            </div>
          ))}
      </RadixDropdown.Content>
    </RadixDropdown.Root>
  )
}

// helper component to render the content of the dropdown item
const ItemContent = ({
  label,
  icon,
  shorting,
  className,
}: {
  label: string
  icon: React.ReactNode
  shorting?: string
  className?: {
    label?: string
    icon?: string
  }
}) => (
  <div className="flex flex-row items-center gap-2">
    <span className={className?.label}>{label}</span>
    {icon && <span className={className?.icon}>{icon}</span>}
    {shorting && <div className="ml-6">{shorting}</div>}
  </div>
)

const DropdownItem = ({
  id,
  data,
  label,
  active = false,
  onClick,
  shorting,
  selected,
  className,
  icon,
  tooltip,
  disabled = false,
}: {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label: string | React.ReactNode
  active?: boolean
  onClick: React.MouseEventHandler
  shorting?: string
  selected?: boolean
  disabled?: boolean
  className?: {
    root?: string
    active?: string
    icon?: string
    label?: string
    tooltip?: string
  }
  icon?: React.ReactNode
  tooltip?: string
}) => {
  if (typeof label === 'string') {
    const ItemContentTooltip = (
      <RadixDropdown.Item
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        className={twMerge(
          'hover:bg-primary-20 hover:text-primary-100 flex w-full flex-row rounded px-2 py-0.5 hover:cursor-pointer',
          active && twMerge('font-bold', className?.active),
          selected && twMerge('font-bold', className?.active),
          disabled &&
            'text-gray-400 hover:cursor-not-allowed hover:bg-transparent hover:text-gray-400',
          className?.root
        )}
        onClick={(e: React.MouseEvent) => {
          if (disabled) {
            e.preventDefault()
            return
          }
          onClick(e)
        }}
        disabled={disabled}
      >
        {tooltip ? (
          <Tooltip
            tooltip={tooltip}
            className={{
              tooltip: className?.tooltip,
            }}
          >
            <ItemContent
              label={label}
              icon={icon}
              shorting={shorting}
              className={className}
            />
          </Tooltip>
        ) : (
          <ItemContent
            label={label}
            icon={icon}
            shorting={shorting}
            className={className}
          />
        )}
      </RadixDropdown.Item>
    )

    return ItemContentTooltip
  }

  return (
    <RadixDropdown.Item
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      onClick={(e: React.MouseEvent) => {
        if (disabled) {
          e.preventDefault()
          return
        }
        onClick(e)
      }}
      className={twMerge(
        'rounded-md',
        disabled &&
          'text-gray-400 hover:cursor-not-allowed hover:bg-transparent hover:text-gray-400',
        className?.root
      )}
      disabled={disabled}
    >
      {label}
    </RadixDropdown.Item>
  )
}

export default DropdownLegacy
