import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface NavigationProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  children: React.ReactNode
  className?: {
    root?: string
    indicator?: string
    viewport?: string
  }
  style?: {
    root?: React.CSSProperties
    indicator?: React.CSSProperties
    viewport?: React.CSSProperties
  }
}

/**
 * This function returns a pre-styled Navigation component based on the RadixUI navigation component and the custom theme.
 *
 * @param id - The id of the navigation.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - The content of the navigation. Children should be subcomponents of the Navigation component like TriggerItem / ButtonItem / CustomItem for the correct functionality.
 * @param className - The optional className object allows you to override the default styling.
 * @param style - The optional style object allows you to override the default styling using CSS key-value styles.
 * @returns Navigation component
 */
export function Navigation({
  id,
  data,
  children,
  className,
  style,
}: NavigationProps) {
  const theme = useContext(ThemeContext)

  return (
    <NavigationMenuPrimitive.Root
      className={twMerge(
        `relative ${theme.primaryBg} rounded-md w-max`,
        className?.root
      )}
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      style={style?.root}
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
            style={style?.indicator}
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
        style={style?.viewport}
      />
    </NavigationMenuPrimitive.Root>
  )
}

interface TriggerProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
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
  style?: {
    root?: React.CSSProperties
    label?: React.CSSProperties
    icon?: React.CSSProperties
    dropdown?: React.CSSProperties
    disabled?: React.CSSProperties
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

/**
 * This function returns a pre-styled TriggerItem component based on the RadixUI navigation component and the custom theme.
 *
 * @param id - The id of the trigger item.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label of the trigger item.
 * @param icon - The optional icon of the trigger item.
 * @param dropdownWidth - The width of the dropdown menu. Currently, this attribute needs to be provided in order to work around a bug in the RadixUI navigation component. Ensure that this width is correct for all responsive breakpoints.
 * @param disabled - Allows to disable the trigger item and apply some conditional styling.
 * @param children - The content of the dropdown menu.
 * @param className - The optional className object allows you to override the default styling.
 * @param style - The optional style object allows you to override the default styling using CSS key-value styles.
 * @returns Trigger component for a dropdown menu in the navigation component.
 */
Navigation.TriggerItem = function TriggerItem({
  id,
  data,
  label,
  icon,
  dropdownWidth,
  children,
  disabled,
  className,
  style,
}: TriggerIconProps | TriggerLabelProps) {
  const theme = useContext(ThemeContext)
  const computedClassName = twMerge(
    'px-3 py-2 rounded-md text-sm focus:outline-none focus-visible:ring flex flex-row items-center font-medium text-black hover:text-white',
    icon && !label && 'w-9 h-9 justify-center',
    !disabled && theme.primaryBgMediumHover,
    disabled && 'text-gray-400 hover:text-none cursor-not-allowed',
    className?.root,
    disabled && className?.disabled
  )

  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Trigger
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        className={computedClassName}
        disabled={disabled}
        style={disabled ? { ...style?.root, ...style?.disabled } : style?.root}
      >
        {icon && !label && (
          <div className={className?.icon} style={style?.icon}>
            {icon}
          </div>
        )}
        {icon && label && (
          <div
            className={twMerge('w-3 mr-3', className?.icon)}
            style={style?.icon}
          >
            {icon}
          </div>
        )}
        {label && (
          <div className={className?.label} style={style?.label}>
            {label}
          </div>
        )}
      </NavigationMenuPrimitive.Trigger>

      <NavigationMenuPrimitive.Content
        className={twMerge(
          'rounded-lg flex flex-col p-2 gap-2',
          dropdownWidth,
          className?.dropdown
        )}
        style={style?.dropdown}
      >
        {children}
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Item>
  )
}

interface DropdownItemProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  title: string
  subtitle?: string
  icon?: React.ReactNode
  className?: {
    root?: string
    title?: string
    icon?: string
    subtitle?: string
  }
  style?: {
    root?: React.CSSProperties
    title?: React.CSSProperties
    icon?: React.CSSProperties
    subtitle?: React.CSSProperties
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

/**
 * This function returns a pre-styled DropdownItem component based on the RadixUI navigation component and the custom theme.
 * It is designed for use in the dropdown menu (child) of the TriggerItem component.
 *
 * @param id The id of the dropdown item.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param title The title of the dropdown item.
 * @param subtitle The optional subtitle of the dropdown item.
 * @param icon The optional icon of the dropdown item.
 * @param href The optional href of the dropdown item. This attribute is mutually exclusive with the onClick attribute.
 * @param onClick The optional onClick handler of the dropdown item. This attribute is mutually exclusive with the href attribute.
 * @param className The optional className object allows you to override the default styling.
 * @param style The optional style object allows you to override the default styling using CSS key-value styles.
 * @returns Dropdown item component for a dropdown menu in the navigation component.
 */
Navigation.DropdownItem = function DropdownItem({
  id,
  data,
  title,
  href,
  onClick,
  subtitle,
  icon,
  className,
  style,
}: DropdownItemWithHrefProps | DropdownItemWithOnClickProps) {
  const theme = useContext(ThemeContext)

  return (
    <NavigationMenuPrimitive.Link
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      href={href}
      onClick={onClick}
      className={twMerge(
        'w-full px-4 py-3 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 text-black sm:hover:text-white',
        theme.primaryBgMediumHover,
        className?.root
      )}
      style={style?.root}
    >
      <span
        className={twMerge(
          'text-sm font-medium flex flex-row',
          className?.title
        )}
        style={style?.title}
      >
        {icon && (
          <div
            className={twMerge('w-3 mr-3', className?.icon)}
            style={style?.icon}
          >
            {icon}
          </div>
        )}
        <div>{title}</div>
      </span>

      {subtitle && (
        <div
          className={twMerge(
            'mt-1 text-sm text-left font-normal',
            className?.subtitle
          )}
          style={style?.subtitle}
        >
          {subtitle}
        </div>
      )}
    </NavigationMenuPrimitive.Link>
  )
}

interface ButtonItemProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  className?: {
    root?: string
    label?: string
    icon?: string
    disabled?: string
  }
  style?: {
    root?: React.CSSProperties
    label?: React.CSSProperties
    icon?: React.CSSProperties
    disabled?: React.CSSProperties
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

/**
 * This function returns a pre-styled ButtonItem component based on the RadixUI navigation component and the custom theme.
 *
 * @param id The id of the button item.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label The label of the button item.
 * @param icon The optional icon of the button item.
 * @param disabled Allows to disable the button item and apply some conditional styling.
 * @param href The optional href of the button item. This attribute is mutually exclusive with the onClick attribute.
 * @param onClick The optional onClick handler of the button item. This attribute is mutually exclusive with the href attribute.
 * @param className The optional className object allows you to override the default styling.
 * @param style The optional style object allows you to override the default styling using CSS key-value styles.
 * @returns Button item component to be used in the navigation component.
 */
Navigation.ButtonItem = function ButtonItem({
  id,
  data,
  label,
  disabled,
  icon,
  href,
  onClick,
  className,
  style,
}: ButtonItemWithHrefProps | ButtonItemWithOnClickProps) {
  const theme = useContext(ThemeContext)
  const computedClassName = twMerge(
    'px-3 py-2 text-sm rounded-md font-medium cursor-pointer text-black sm:hover:text-white',
    !disabled && theme.primaryBgMediumHover,
    disabled && 'text-gray-400 hover:text-none cursor-not-allowed',
    className?.root,
    disabled && className?.disabled
  )

  return (
    <NavigationMenuPrimitive.Item asChild>
      <NavigationMenuPrimitive.Link
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
        className={computedClassName}
        style={disabled ? { ...style?.root, ...style?.disabled } : style?.root}
      >
        <div className="flex flex-row">
          {icon && (
            <div
              className={twMerge('w-3 mr-3', className?.icon)}
              style={style?.icon}
            >
              {icon}
            </div>
          )}
          <div className={className?.label} style={style?.label}>
            {label}
          </div>
        </div>
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  )
}

interface IconItemProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  icon: React.ReactNode
  disabled?: boolean
  className?: {
    root?: string
    disabled?: string
  }
  style?: {
    root?: React.CSSProperties
    disabled?: React.CSSProperties
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
 * @param id The id of the icon item.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param icon The icon of the icon item.
 * @param disabled Allows to disable the icon item and apply some conditional styling.
 * @param href The optional href of the icon item. This attribute is mutually exclusive with the onClick attribute.
 * @param onClick The optional onClick handler of the icon item. This attribute is mutually exclusive with the href attribute.
 * @param className The optional className object allows you to override the default styling.
 * @param style The optional style object allows you to override the default styling using CSS key-value styles.
 * @returns Icon item component for a dropdown menu in the navigation component.
 */
Navigation.IconItem = function IconItem({
  id,
  data,
  icon,
  disabled,
  href,
  onClick,
  className,
  style,
}: IconItemWithHrefProps | IconItemWithOnClickProps) {
  const theme = useContext(ThemeContext)
  const computedClassName = twMerge(
    'w-9 h-9 flex items-center justify-center rounded-md text-black sm:hover:text-white',
    !disabled && theme.primaryBgMediumHover,
    disabled && 'text-gray-400 hover:text-none cursor-not-allowed',
    className?.root,
    disabled && className?.disabled
  )

  return (
    <NavigationMenuPrimitive.Item asChild>
      <NavigationMenuPrimitive.Link
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
        className={computedClassName}
        style={disabled ? { ...style?.root, ...style?.disabled } : style?.root}
      >
        {icon}
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  )
}

type CustomItemProps = {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  children: React.ReactNode
  className?: {
    root?: string
  }
  style?: {
    root?: React.CSSProperties
  }
}

/**
 * This function returns a Navigation CustomItem component.
 *
 * @param id The id of the custom item.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children The custom component that should be rendered as an item in the navigation component.
 * @param className The optional className object allows you to override the default styling of the wrapper.
 * @param style The optional style object allows you to override the default styling of the wrapper using CSS key-value styles.
 * @returns Custom item component to be used in the navigation component.
 */
Navigation.CustomItem = function CustomItem({
  id,
  data,
  children,
  className,
  style,
}: CustomItemProps) {
  return (
    <NavigationMenuPrimitive.Item
      asChild
      className={className?.root}
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      style={style?.root}
    >
      {children}
    </NavigationMenuPrimitive.Item>
  )
}

export default Navigation
