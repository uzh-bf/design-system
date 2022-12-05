import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

type NavigationProps = {
  children: React.ReactNode
  className?: {
    root?: string
    indicator?: string
    viewport?: string
  }
}

export function Navigation({ children, className }: NavigationProps) {
  const theme = useContext(ThemeContext)

  return (
    <NavigationMenuPrimitive.Root
      className={twMerge(
        `relative ${theme.primaryBg} rounded-md w-max`,
        className?.root
      )}
    >
      <NavigationMenuPrimitive.List className="flex flex-row gap-1.5 p-2">
        {children}
        <NavigationMenuPrimitive.Indicator className="z-10 flex justify-center h-2 overflow-hidden duration-300 ease-in-out">
          <div
            className={twMerge(
              'relative w-2 h-2 rotate-45 rounded-tl-sm top-1',
              theme.primaryBg,
              className?.indicator
            )}
          />
        </NavigationMenuPrimitive.Indicator>
      </NavigationMenuPrimitive.List>

      <NavigationMenuPrimitive.Viewport
        className={twMerge(
          'mt-2 shadow-lg rounded-md overflow-hidden duration-300 ease-in-out',
          'w-rdx-navigation-menu-viewport h-rdx-navigation-menu-viewport absolute z-10',
          theme.primaryBg,
          className?.viewport
        )}
      />
    </NavigationMenuPrimitive.Root>
  )
}

interface TriggerProps {
  label: string
  dropdownWidth: string
  icon?: React.ReactNode
  children: React.ReactNode
  disabled?: boolean
  className?: {
    root?: string
    label?: string
    icon?: string
    dropdown?: string
    disabled?: string
  }
}

Navigation.TriggerItem = function TriggerItem({
  label,
  icon,
  dropdownWidth,
  children,
  disabled,
  className,
}: TriggerProps) {
  const theme = useContext(ThemeContext)

  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Trigger
        className={twMerge(
          'px-3 py-2 rounded-md text-sm focus:outline-none focus-visible:ring flex flex-row items-center font-medium text-black hover:text-white',
          !disabled && theme.primaryBgDarkHover,
          disabled && 'text-gray-400 hover:text-none cursor-not-allowed',
          className?.root,
          className?.disabled
        )}
        disabled={disabled}
      >
        {icon && (
          <div className={twMerge('w-3 mr-3', className?.icon)}>{icon}</div>
        )}
        <div className={className?.label}>{label}</div>
      </NavigationMenuPrimitive.Trigger>

      <NavigationMenuPrimitive.Content
        className={twMerge(
          'rounded-lg flex flex-col p-2 gap-2',
          dropdownWidth,
          className?.dropdown
        )}
      >
        {children}
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Item>
  )
}

interface DropdownItemProps {
  title: string

  subtitle?: string
  icon?: React.ReactNode
  className?: {
    root?: string
    title?: string
    icon?: string
    subtitle?: string
  }
}

interface DropdownItemWithHrefProps extends DropdownItemProps {
  href: string
  onClick?: never
}

interface DropdownItemWithOnClickProps extends DropdownItemProps {
  href?: never
  onClick: React.MouseEventHandler
}

Navigation.DropdownItem = function DropdownItem({
  title,
  href,
  onClick,
  subtitle,
  icon,
  className,
}: DropdownItemWithHrefProps | DropdownItemWithOnClickProps) {
  const theme = useContext(ThemeContext)

  return (
    <NavigationMenuPrimitive.Link
      href={href}
      onClick={onClick}
      className={twMerge(
        'w-full px-4 py-3 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 text-black hover:text-white',
        theme.primaryBgDarkHover,
        className?.root
      )}
    >
      <span
        className={twMerge(
          'text-sm font-medium flex flex-row',
          className?.title
        )}
      >
        {icon && (
          <div className={twMerge('w-3 mr-3', className?.icon)}>{icon}</div>
        )}
        <div>{title}</div>
      </span>

      {subtitle && (
        <div
          className={twMerge(
            'mt-1 text-sm text-left font-normal',
            className?.subtitle
          )}
        >
          {subtitle}
        </div>
      )}
    </NavigationMenuPrimitive.Link>
  )
}

interface ButtonItemProps {
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  className?: {
    root?: string
    label?: string
    icon?: string
    disabled?: string
  }
}

interface ButtonItemWithHrefProps extends ButtonItemProps {
  href: string
  onClick?: never
}

interface ButtonItemWithOnClickProps extends ButtonItemProps {
  href?: never
  onClick: React.MouseEventHandler
}

Navigation.ButtonItem = function ButtonItem({
  label,
  disabled,
  icon,
  href,
  onClick,
  className,
}: ButtonItemWithHrefProps | ButtonItemWithOnClickProps) {
  const theme = useContext(ThemeContext)
  return (
    <NavigationMenuPrimitive.Item asChild>
      <NavigationMenuPrimitive.Link
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
        className={twMerge(
          'px-3 py-2 text-sm rounded-md font-medium cursor-pointer text-black hover:text-white',
          !disabled && theme.primaryBgDarkHover,
          disabled && 'text-gray-400 hover:text-none cursor-not-allowed',
          className?.root,
          className?.disabled
        )}
      >
        <div className="flex flex-row">
          {icon && (
            <div className={twMerge('w-3 mr-3', className?.icon)}>{icon}</div>
          )}
          <div className={className?.label}>{label}</div>
        </div>
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  )
}

type CustomItemProps = {
  children: React.ReactNode
  className?: {
    root?: string
  }
}

Navigation.CustomItem = function CustomItem({
  children,
  className,
}: CustomItemProps) {
  return (
    <NavigationMenuPrimitive.Item asChild className={className?.root}>
      {children}
    </NavigationMenuPrimitive.Item>
  )
}

export default Navigation
