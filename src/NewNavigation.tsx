import * as RadixNavigation from '@radix-ui/react-navigation-menu'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

interface ButtonItem {
  type: 'button'
  title: string
  href?: string
  onClick?: () => void
  active?: boolean
  className?: {
    root?: string
    active?: string
  }
}

// TODO: add icon support in dropdowns
export interface DropdownItem {
  type: 'dropdown'
  title: string
  elements: {
    title: string
    onClick?: () => void
    href?: string
    active?: boolean
  }[]
  className?: {
    root?: string
    item?: string
    active?: string
  }
}

export interface CustomElement {
  type: 'custom'
  element: React.ReactNode
}

export interface NavigationProps {
  leftItems: (ButtonItem | DropdownItem | CustomElement)[]
  rightItems: (ButtonItem | DropdownItem | CustomElement)[]
  className?: {
    root?: string
    left?: string
    right?: string
    button?: string
  }
}

export function Navigation({
  leftItems,
  rightItems,
  className,
}: NavigationProps) {
  const theme = useContext(ThemeContext)

  return (
    <RadixNavigation.Root
      className={twMerge(
        `${theme.primaryBg} p-3 rounded-md flex flex-row justify-between`,
        className?.root
      )}
    >
      <RadixNavigation.List
        className={twMerge('flex flex-row gap-2', className?.left)}
      >
        {leftItems.map((item) => {
          switch (item.type) {
            case 'button':
              return (
                <Button
                  theme={theme}
                  className={{ super: className?.button, ...item.className }}
                  {...item}
                />
              )

            case 'dropdown':
              return <Dropdown />

            case 'custom':
              return <RadixNavigation.Item>{item.element}</RadixNavigation.Item>

            default:
              return <></>
          }
        })}

        {/* <RadixNavigation.Indicator /> */}
      </RadixNavigation.List>

      <RadixNavigation.List
        className={twMerge('flex flex-row gap-2', className?.right)}
      >
        {/* // TODO: consolidate this switching logic in a generaic component or something */}
        {rightItems.map((item) => {
          switch (item.type) {
            case 'button':
              return (
                <Button
                  theme={theme}
                  className={{ super: className?.button, ...item.className }}
                  {...item}
                />
              )

            case 'dropdown':
              return <Dropdown />

            case 'custom':
              return <RadixNavigation.Item>{item.element}</RadixNavigation.Item>

            default:
              return <></>
          }
        })}

        {/* // TODO: remove if unneeded
        <RadixNavigation.Indicator /> */}
      </RadixNavigation.List>
    </RadixNavigation.Root>
  )
}

export function Dropdown({}: DropdownItem) {
  return (
    <RadixNavigation.Item>
      <RadixNavigation.Trigger />
      <RadixNavigation.Content>
        <RadixNavigation.Link />
      </RadixNavigation.Content>
    </RadixNavigation.Item>
  )
}

// TODO: add icon support and corresponding style
// TODO: maybe remove theme bg hover style
export function Button({
  theme,
  title,
  onClick,
  href,
  active,
  className,
}: { theme: any; className: Record<string, string | undefined> } & ButtonItem) {
  return (
    <RadixNavigation.Item>
      <RadixNavigation.Link
        onClick={onClick}
        href={href}
        className={twMerge(
          `p-2 rounded-md cursor-pointer ${theme.primaryBgHoverNavbar}`,
          className?.super,
          className?.root,
          active && className?.active
        )}
      >
        {title}
      </RadixNavigation.Link>
    </RadixNavigation.Item>
  )
}

export default Navigation
