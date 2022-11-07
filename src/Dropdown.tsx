import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

import { ThemeContext } from './ThemeProvider'

export interface DropdownProps {
  trigger: string | React.ReactNode
  items?: {
    label: string | React.ReactNode
    onClick: () => void
    shorting?: string
    selected?: boolean
  }[]
  groups?: {
    label: string | React.ReactNode
    onClick: () => void
    shorting?: string
    selected?: boolean
  }[][]
  className?: string
  triggerStyle?: string
  disabled?: boolean
}

const defaultProps = {
  items: undefined,
  groups: undefined,
  className: '',
  triggerStyle: '',
  disabled: false,
}
export function Dropdown({
  trigger,
  items,
  groups,
  className,
  triggerStyle,
  disabled,
}: DropdownProps) {
  const theme = useContext(ThemeContext)

  console.log(disabled)

  const DropdownItem = ({
    label,
    onClick,
    shorting,
    selected,
  }: {
    label: string | React.ReactNode
    onClick: () => void
    shorting?: string
    selected?: boolean
  }) => {
    if (typeof label === 'string') {
      return (
        <RadixDropdown.Item
          className={twMerge(
            `hover:${theme.primaryBgDark} hover:!text-white px-2 py-0.5 hover:cursor-pointer rounded flex flex-row`
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
      <RadixDropdown.Item onClick={onClick} className="rounded-md">
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
            triggerStyle
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
            triggerStyle
          )}
        >
          {trigger}
        </RadixDropdown.Trigger>
      )}

      <RadixDropdown.Content
        className={twMerge('p-1.5 rounded-md', theme.primaryBg, className)}
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
              <RadixDropdown.Group>
                {groupItems.map((item) => (
                  <DropdownItem
                    label={item.label}
                    onClick={item.onClick}
                    shorting={item.shorting}
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
