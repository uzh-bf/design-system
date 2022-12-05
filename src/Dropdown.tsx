import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

import { ThemeContext } from './ThemeProvider'

interface Item {
  label: string | React.ReactNode
  onClick: () => void
  shorting?: string
  selected?: boolean
}
interface DropdownProps {
  trigger: string | React.ReactNode
  items?: Item[]
  groups?: Item[][]
  className?: {
    trigger?: string
    triggerDisabled?: string
    viewport?: string
    item?: string
    group?: string
  }
  disabled?: boolean
}

export interface DropdownWithItemsProps extends DropdownProps {
  items: Item[]
  groups?: never
}
export interface DropdownWithGroupsProps extends DropdownProps {
  items?: never
  groups: Item[][]
}

const defaultProps = {
  items: undefined,
  groups: undefined,
  className: undefined,
  disabled: false,
}

/**
 * This function returns a pre-styled Dropdown component based on the RadixUI dropdown component and the custom theme.
 *
 * @param trigger The content of the trigger button or a custom trigger component to replace the default button.
 * @param items The items that are displayed in the dropdown menu. This attribute should not be set, if groups are used.
 * @param groups The groups of items that are displayed in the dropdown menu. This attribute should not be set, if items are used.
 * @param className The optional className object allows you to override the default styling.
 * @param disabled Indicate whether the dropdown is disabled or not. Conditional styling is applied, if this is true.
 * @returns Dropdown component
 */
export function Dropdown({
  trigger,
  items,
  groups,
  className,
  disabled,
}: DropdownWithItemsProps | DropdownWithGroupsProps) {
  const theme = useContext(ThemeContext)

  const DropdownItem = ({
    label,
    onClick,
    shorting,
    selected,
    className,
  }: {
    label: string | React.ReactNode
    onClick: () => void
    shorting?: string
    selected?: boolean
    className?: string
  }) => {
    if (typeof label === 'string') {
      return (
        <RadixDropdown.Item
          className={twMerge(
            `hover:${theme.primaryBgDark} hover:!text-white px-2 py-0.5 hover:cursor-pointer rounded flex flex-row`,
            className
          )}
          onClick={onClick}
        >
          <div className={twMerge('flex-1', selected && 'font-bold')}>
            {label}
          </div>
          {shorting && <div className="ml-6">{shorting}</div>}
        </RadixDropdown.Item>
      )
    }
    return (
      <RadixDropdown.Item
        onClick={onClick}
        className={twMerge('rounded-md', className)}
      >
        {label}
      </RadixDropdown.Item>
    )
  }

  return (
    <RadixDropdown.Root>
      {typeof trigger === 'string' ? (
        <RadixDropdown.Trigger
          className={twMerge(
            'px-2 py-1 border border-solid border-uzh-grey-60 rounded-md',
            `hover:${theme.primaryBg}`,
            disabled && 'cursor-not-allowed text-gray-500 hover:bg-white',
            className?.trigger,
            className?.triggerDisabled
          )}
          disabled={disabled}
        >
          {trigger}
        </RadixDropdown.Trigger>
      ) : (
        <RadixDropdown.Trigger
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
          'p-1.5 rounded-md',
          theme.primaryBg,
          className?.viewport
        )}
      >
        <RadixDropdown.Arrow
          className={twMerge(theme.primaryFill, 'opacity-25')}
        />

        {items && (
          <div className="pt-1 pb-1 border-b border-solid first:pt-0 last:pb-0 border-uzh-grey-100 last:border-b-0">
            {items.map((item, index) => (
              <DropdownItem
                key={index}
                label={item.label}
                onClick={item.onClick}
                shorting={item.shorting}
                selected={item.selected}
                className={className?.item}
              />
            ))}
          </div>
        )}

        {groups &&
          !items &&
          groups.map((groupItems, groupIndex) => (
            <div
              key={groupIndex}
              className="pt-1 pb-1 border-b border-solid first:pt-0 last:pb-0 border-uzh-grey-100 last:border-b-0"
            >
              <RadixDropdown.Group className={className?.group}>
                {groupItems.map((item) => (
                  <DropdownItem
                    label={item.label}
                    onClick={item.onClick}
                    shorting={item.shorting}
                    className={className?.item}
                  />
                ))}
              </RadixDropdown.Group>
            </div>
          ))}
      </RadixDropdown.Content>
    </RadixDropdown.Root>
  )
}

Dropdown.defaultProps = defaultProps
export default Dropdown
