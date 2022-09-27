import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface DropdownProps {
  trigger: string | React.ReactNode
  items?: { label: string; onClick: () => void; shorting?: string }[]
  groups?: { label: string; onClick: () => void; shorting?: string }[][]
  className?: string
  triggerStyle?: string
}

const defaultProps = {
  items: undefined,
  groups: undefined,
  className: '',
  triggerStyle: '',
}
export function Dropdown({
  trigger,
  items,
  groups,
  className,
  triggerStyle,
}: DropdownProps) {
  const theme = useContext(ThemeContext)

  const DropdownItem = ({
    label,
    onClick,
    shorting,
  }: {
    label: string
    onClick: () => void
    shorting?: string
  }) => (
    <RadixDropdown.Item
      key={label}
      className={twMerge(
        `hover:${theme.primaryBgDark} hover:!text-white px-2 py-0.5 hover:cursor-pointer rounded flex flex-row`
      )}
      onClick={onClick}
    >
      <div className="flex-1">{label}</div>
      {shorting && <div className="ml-6">{shorting}</div>}
    </RadixDropdown.Item>
  )

  return (
    <RadixDropdown.Root>
      {typeof trigger === 'string' ? (
        <RadixDropdown.Trigger
          className={twMerge(
            'px-2 py-1 border border-solid border-uzh-grey-60 rounded-md',
            `hover:${theme.primaryBg}`,
            triggerStyle
          )}
        >
          {trigger}
        </RadixDropdown.Trigger>
      ) : (
        <RadixDropdown.Trigger>{trigger}</RadixDropdown.Trigger>
      )}

      <RadixDropdown.Content
        className={twMerge('p-1.5 rounded-md', theme.primaryBg, className)}
      >
        <RadixDropdown.Arrow
          className={twMerge(theme.primaryFill, 'opacity-25')}
        />

        {items && (
          <div className="pt-1 pb-1 border-b border-solid first:pt-0 last:pb-0 border-uzh-grey-100 last:border-b-0">
            {items.map((item) => (
              <DropdownItem
                label={item.label}
                onClick={item.onClick}
                shorting={item.shorting}
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
