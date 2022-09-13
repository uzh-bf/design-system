import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

type navigationMenuProps = {
  children: React.ReactNode
  position: string
}

type navigationProps = {
  children: React.ReactNode
  className?: string
}

type buttonProps = {
  children: React.ReactNode
}

export function Navigation(props: navigationProps) {
  const theme = useContext(ThemeContext)

  return (
    <div
      className={twMerge(
        'flex flex-row flex-wrap flex-1 w-full rounded-lg',
        theme.primaryBg,
        props.className
      )}
    >
      <div className="flex-1 order-2" />
      {props.children}
    </div>
  )
}

Navigation.NavigationMenu = function NavigationMenu(
  props: navigationMenuProps
) {
  const theme = useContext(ThemeContext)
  const computedViewportClassName = twMerge(
    'absolute z-50',
    props.position === 'left' && 'w-[80%] top-[100%] justify-start',
    props.position === 'right' && 'w-[140%] top-[100%] justify-end'
  )
  return (
    <NavigationMenuPrimitive.Root
      className={twMerge(
        'relative',
        props.position === 'left' && 'order-1',
        props.position === 'right' && 'order-3'
      )}
    >
      <NavigationMenuPrimitive.List className="flex flex-row p-2 space-x-2">
        {props.children}
        <NavigationMenuPrimitive.Indicator
          className={twMerge(
            'z-1',
            'top-[100%] flex items-end justify-center h-2 overflow-hidden',
            'rdx-state-visible:animate-fade-in',
            'rdx-state-hidden:animate-fade-out',
            'transition-[width_transform] duration-[250ms] ease-[ease]'
          )}
        >
          <div
            className={twMerge(
              'relative w-2 h-2 rotate-45 rounded-tl-sm top-1',
              theme.primaryBg
            )}
          />
        </NavigationMenuPrimitive.Indicator>
      </NavigationMenuPrimitive.List>

      <div
        className={computedViewportClassName}
        style={{
          perspective: '2000px',
        }}
      >
        <NavigationMenuPrimitive.Viewport
          className={twMerge(
            'relative mt-2 shadow-lg rounded-md overflow-hidden',
            'w-rdx-navigation-menu-viewport',
            'h-rdx-navigation-menu-viewport',
            'rdx-state-open:animate-scale-in-content',
            'rdx-state-closed:animate-scale-out-content',
            'origin-[top_center] transition-[width_height] duration-300 ease-[ease]',
            theme.primaryBg
          )}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  )
}

Navigation.TriggerItem = function TriggerItem({
  triggerName,
  triggerIcon,
  children,
}: {
  triggerName: string
  triggerIcon?: React.ReactNode
  children: React.ReactNode
}) {
  const theme = useContext(ThemeContext)
  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Trigger
        className={twMerge(
          'px-3 py-2 text-sm rounded-md dark:hover:bg-gray-900',
          'text-sm font-medium',
          ' dark:text-gray-100',
          'focus:outline-none focus-visible:ring',
          theme.primaryBgHoverNavbar,
          theme.primaryText
        )}
      >
        <div className="flex flex-row">
          {triggerIcon && (
            <div className={twMerge('w-3', 'mr-3')}>{triggerIcon}</div>
          )}
          {triggerName}
        </div>
      </NavigationMenuPrimitive.Trigger>

      <NavigationMenuPrimitive.Content
        className={twMerge(
          'absolute w-[16rem] top-0 left-0 right-0 rounded-lg',
          'rdx-motion-from-start:animate-enter-from-left',
          'rdx-motion-from-end:animate-enter-from-right',
          'rdx-motion-to-start:animate-exit-to-left',
          'rdx-motion-to-end:animate-exit-to-right'
        )}
      >
        <div className="p-3">
          <div className="flex flex-col space-y-2">{children}</div>
        </div>
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Item>
  )
}

Navigation.DropdownItem = function DropdownItem({
  title,
  onClick,
  subtitle,
  icon,
}: {
  title: string
  onClick: React.MouseEventHandler
  subtitle?: string
  icon?: React.ReactNode
}) {
  const theme = useContext(ThemeContext)
  return (
    <button
      className={twMerge(
        'w-full px-4 py-3 dark:hover:bg-gray-900 rounded-md',
        'focus:outline-none focus-visible:ring focus-visible:ring-opacity-75',
        theme.primaryBgHoverNavbar
      )}
      onClick={onClick}
    >
      <span
        className={twMerge(
          'text-sm font-medium dark:text-gray-100 flex flex-row',
          theme.primaryText
        )}
      >
        {icon && <div className={twMerge('w-3', 'mr-3')}>{icon}</div>}
        {title}
      </span>

      {subtitle && (
        <div
          className={twMerge(
            'mt-1 text-sm dark:text-gray-400 text-left',
            theme.primaryText
          )}
        >
          {subtitle}
        </div>
      )}
    </button>
  )
}

Navigation.LinkItem = function LinkItem({
  linkName,
  link,
  linkIcon,
}: {
  linkName: string
  link?: string
  linkIcon?: React.ReactNode
}) {
  const theme = useContext(ThemeContext)
  return (
    <NavigationMenuPrimitive.Item asChild>
      <NavigationMenuPrimitive.Link
        href={link}
        className={twMerge(
          'px-3 py-2 text-sm rounded-md dark:hover:bg-gray-900',
          'text-sm font-medium dark:text-gray-100',
          theme.primaryBgHoverNavbar,
          theme.primaryText
        )}
      >
        <div className="flex flex-row">
          {linkIcon && <div className={twMerge('w-3', 'mr-3')}>{linkIcon}</div>}
          {linkName}
        </div>
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  )
}

Navigation.ButtonItem = function ButtonItem(props: buttonProps) {
  return (
    <NavigationMenuPrimitive.Item asChild>
      {props.children}
    </NavigationMenuPrimitive.Item>
  )
}

export default Navigation
