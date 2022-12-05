import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface NavigationProps {
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
  dropdownWidth: string
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

export interface TriggerIconProps extends TriggerProps {
  icon: React.ReactNode
  label?: never
}
export interface TriggerLabelProps extends TriggerProps {
  label: string
  icon?: React.ReactNode
}

Navigation.TriggerItem = function TriggerItem({
  label,
  icon,
  dropdownWidth,
  children,
  disabled,
  className,
}: TriggerIconProps | TriggerLabelProps) {
  const theme = useContext(ThemeContext)
  const computedClassName = twMerge(
    'px-3 py-2 rounded-md text-sm focus:outline-none focus-visible:ring flex flex-row items-center font-medium text-black hover:text-white',
    icon && !label && 'w-9 h-9 justify-center',
    !disabled && theme.primaryBgDarkHover,
    disabled && 'text-gray-400 hover:text-none cursor-not-allowed',
    className?.root,
    disabled && className?.disabled
  )

  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Trigger
        className={computedClassName}
        disabled={disabled}
      >
        {icon && !label && <div className={className?.icon}>{icon}</div>}
        {icon && label && (
          <div className={twMerge('w-3 mr-3', className?.icon)}>{icon}</div>
        )}
        {label && <div className={className?.label}>{label}</div>}
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

export interface DropdownItemWithHrefProps extends DropdownItemProps {
  href: string
  onClick?: never
}

export interface DropdownItemWithOnClickProps extends DropdownItemProps {
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

export interface ButtonItemWithHrefProps extends ButtonItemProps {
  href: string
  onClick?: never
}

export interface ButtonItemWithOnClickProps extends ButtonItemProps {
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
  const computedClassName = twMerge(
    'px-3 py-2 text-sm rounded-md font-medium cursor-pointer text-black hover:text-white',
    !disabled && theme.primaryBgDarkHover,
    disabled && 'text-gray-400 hover:text-none cursor-not-allowed',
    className?.root,
    disabled && className?.disabled
  )

  return (
    <NavigationMenuPrimitive.Item asChild>
      <NavigationMenuPrimitive.Link
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
        className={computedClassName}
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

interface IconItemProps {
  icon: React.ReactNode
  disabled?: boolean
  className?: {
    root?: string
    icon?: string
    disabled?: string
  }
}

export interface IconItemWithHrefProps extends IconItemProps {
  href: string
  onClick?: never
}

export interface IconItemWithOnClickProps extends IconItemProps {
  href?: never
  onClick: React.MouseEventHandler
}

/**
 * This function returns a pre-styled IconItem component based on the custom theme.
 *
 * @param icon The icon of the icon item.
 * @param disabled Allows to disable the icon item and apply some conditional styling.
 * @param href The optional href of the icon item. This attribute is mutually exclusive with the onClick attribute.
 * @param onClick The optional onClick handler of the icon item. This attribute is mutually exclusive with the href attribute.
 * @param className The optional className object allows you to override the default styling.
 * @returns Icon item component for a dropdown menu in the navigation component.
 */
Navigation.IconItem = function IconItem({
  icon,
  disabled,
  href,
  onClick,
  className,
}: IconItemWithHrefProps | IconItemWithOnClickProps) {
  const theme = useContext(ThemeContext)
  const computedClassName = twMerge(
    'w-9 h-9 flex items-center justify-center rounded-md text-black hover:text-white',
    !disabled && theme.primaryBgDarkHover,
    disabled && 'text-gray-400 hover:text-none cursor-not-allowed',
    className?.root,
    disabled && className?.disabled
  )

  return (
    <NavigationMenuPrimitive.Item asChild>
      <NavigationMenuPrimitive.Link
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
        className={computedClassName}
      >
        {icon}
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
