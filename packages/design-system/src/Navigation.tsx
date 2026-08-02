'use client'

import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Badge } from './ui/badge'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  Menubar as ShadcnMenubar,
} from './ui/menubar'

// ! Styles
const dynamicUnderline = twMerge(
  'relative after:absolute after:bottom-[0.15rem] after:left-[7.5px] after:h-[2px] after:w-[calc(100%-15px)] px-3',
  'after:origin-left after:scale-x-0 after:bg-slate-700 after:transition-transform after:duration-500',
  'after:ease-out hover:after:scale-x-100'
)

// ! Button
// #region
export interface BaseNavigationButtonProps {
  onClick: React.MouseEventHandler
  disabled?: boolean
  ariaLabel?: string
  data?: { cy?: string; test?: string }
  className?: { root?: string; label?: string; icon?: string }
  style?: {
    root?: React.CSSProperties
    label?: React.CSSProperties
    icon?: React.CSSProperties
  }
}

export interface LabelOnlyButtonProps extends BaseNavigationButtonProps {
  label: string
  icon?: IconDefinition
  active: boolean
  notification?: boolean
}

export interface IconOnlyButtonProps extends BaseNavigationButtonProps {
  icon: IconDefinition
  // Icon-only buttons have no visible text, so an accessible name is mandatory
  // (WCAG 2.1 4.1.2). Narrows the optional base ariaLabel to required.
  ariaLabel: string
  label?: undefined
  active?: undefined
  notification?: undefined
}

// combined type
export type NavigationButtonProps = LabelOnlyButtonProps | IconOnlyButtonProps

/**
 * This function returns a navigation button component based on the ShadcnUI menubar component.
 * The button can display either a label, an icon, or both, and supports dynamic styling based on its state.
 *
 * @param label - The text to display on the button (required for label or combined buttons).
 * @param icon - The FontAwesome icon definition to display (required for icon-only or combined buttons).
 * @param ariaLabel - Accessible name for the trigger button. Required for icon-only buttons (which have no visible text); ignored when a visible label is set.
 * @param onClick - The function to be called when the button is clicked.
 * @param disabled - Specifies whether the button is disabled or not.
 * @param active - Indicates whether the button is in an active state (only for label buttons).
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy).
 * @param className - The optional className object to override default styling for root, label, and icon.
 * @param style - The optional style object to override default styling for root, label, and icon.
 * @return NavigationButton component
 */
function NavigationButton({
  label,
  icon,
  ariaLabel,
  onClick,
  disabled = false,
  active,
  notification,
  data,
  className,
  style,
}: NavigationButtonProps) {
  const hasIconAndLabel =
    typeof label !== 'undefined' && typeof icon !== 'undefined'
  const iconOnly = typeof label === 'undefined' && typeof icon !== 'undefined'

  // A `type: 'button'` item performs an action; it has no menu. `MenubarTrigger`
  // is the only way to stay registered with the menubar's roving focus (so the
  // arrow keys keep working), but it unconditionally advertises a menu it does
  // not have and drives the menubar's open/close state machine — with no
  // `MenubarContent` to render, activating one used to leave the bar wedged in
  // its open state and the item announced as expanded for good.
  //
  // `Navigation` refuses the open state for these items (see `onValueChange`
  // there), so nothing below has to fight Radix for the state itself. What is
  // left are the side effects Radix performs on the way there, one per handler
  // below: it default-prevents the events it claims, costing the item its native
  // click and its click focus, and it treats a hover as a request to switch
  // menus.
  const actionItemProps = {
    'aria-haspopup': undefined,
    'aria-expanded': undefined,
    'aria-controls': undefined,
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      // Radix default-prevents both keys for its own menu toggle, which
      // suppresses the native click and left the item operable by mouse only.
      // Dispatching a real click keeps `onClick` receiving a real MouseEvent,
      // and a disabled button ignores it for free.
      event.preventDefault()
      event.currentTarget.click()
    },
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      // Mirrors the guard Radix applies to its own pointer-down handler, so a
      // right, middle or ctrl-click keeps falling through to the platform.
      if (event.button !== 0 || event.ctrlKey) return
      // Radix opens the menu here and default-prevents, which also drops the
      // focus a click would normally give the button — so take focus explicitly.
      event.preventDefault()
      event.currentTarget.focus()
    },
    onPointerEnter: (event: React.PointerEvent<HTMLButtonElement>) => {
      // Once any menu in the bar is open, Radix follows the pointer and opens
      // whichever item it enters. Merely refusing that open is not enough here:
      // the refusal closes the bar, so simply moving the mouse across an action
      // item would dismiss the dropdown the user is reading.
      event.preventDefault()
    },
  }

  return (
    <MenubarTrigger
      {...actionItemProps}
      onClick={onClick}
      disabled={disabled}
      aria-label={!label ? ariaLabel : undefined}
      data-cy={data?.cy}
      data-test={data?.test}
      style={style?.root}
      className={twMerge(
        'text-sm hover:cursor-pointer',
        !iconOnly && !disabled && dynamicUnderline,
        hasIconAndLabel && 'flex flex-row items-center gap-2',
        active && 'text-black after:scale-x-100',
        disabled &&
          'text-slate-400! hover:cursor-not-allowed hover:text-slate-400!',
        className?.root
      )}
    >
      {hasIconAndLabel ? (
        <>
          <FontAwesomeIcon
            icon={icon}
            style={style?.icon}
            className={className?.icon}
          />
          <div
            style={style?.label}
            className={twMerge('relative', className?.label)}
          >
            {label}
            {notification && (
              <div className="bg-notification absolute -top-0.5 -right-2 h-2.5 w-2.5 rounded-full" />
            )}
          </div>
        </>
      ) : label ? (
        <div
          style={style?.label}
          className={twMerge('relative', className?.label)}
        >
          {label}
          {notification && (
            <div className="bg-notification absolute -top-0.5 -right-2 h-2.5 w-2.5 rounded-full" />
          )}
        </div>
      ) : (
        <FontAwesomeIcon
          icon={icon!}
          size="lg"
          style={style?.icon}
          className={className?.icon}
        />
      )}
    </MenubarTrigger>
  )
}
// #endregion

// ! Dropdown
// #region
export type NavigationMenuItemProps = {
  key: string
  type: 'link'
  label: string
  badge?: string | React.ReactNode
  onClick: React.MouseEventHandler
  disabled?: boolean
  notification?: boolean
  data?: { cy?: string; test?: string }
  className?: { label?: string; text?: string; badge?: string }
  style?: {
    label?: React.CSSProperties
    text?: React.CSSProperties
    badge?: React.CSSProperties
  }
}

export type NavigationSeparatorProps = {
  key: string
  type: 'separator'
}

export type NavigationSubmenuProps = {
  key: string
  type: 'submenu'
  label: string
  options: NavigationMenuItemProps[]
  data?: { cy?: string; test?: string }
  className?: { label?: string }
  style?: { label?: React.CSSProperties }
}

export interface BaseNavigationDropdownProps {
  elements: (
    | NavigationMenuItemProps
    | NavigationSeparatorProps
    | NavigationSubmenuProps
  )[]
  disabled?: boolean
  active?: boolean
  notification?: boolean
  ariaLabel?: string
  data?: { cy?: string; test?: string }
  className?: {
    trigger?: string
    label?: string
    icon?: string
    content?: string
    separator?: string
  }
  style?: {
    trigger?: React.CSSProperties
    label?: React.CSSProperties
    icon?: React.CSSProperties
    content?: React.CSSProperties
    separator?: React.CSSProperties
  }
}

export interface LabelOnlyDropdownProps extends BaseNavigationDropdownProps {
  label: string
  icon?: IconDefinition
}

export interface IconOnlyDropdownProps extends BaseNavigationDropdownProps {
  label?: undefined
  icon: IconDefinition
  // Icon-only dropdown triggers have no visible text, so an accessible name is
  // mandatory (WCAG 2.1 4.1.2). Narrows the optional base ariaLabel to required.
  ariaLabel: string
}

// combined type
export type NavigationDropdownProps =
  | LabelOnlyDropdownProps
  | IconOnlyDropdownProps

function NavigationMenuItem({
  element,
}: {
  element: Omit<NavigationMenuItemProps, 'key'>
}) {
  return (
    <MenubarItem
      onClick={element.onClick}
      className={twMerge(
        'h-9 justify-between text-sm hover:cursor-pointer',
        element.disabled &&
          'text-slate-400! hover:cursor-not-allowed hover:text-slate-400!',
        element.className?.label
      )}
      style={element.style?.label}
      disabled={element.disabled}
      data-cy={element.data?.cy}
      data-test={element.data?.test}
    >
      <div className="relative">
        <span className={element.className?.text}>{element.label}</span>
        {element.notification && (
          <div className="bg-notification absolute -top-0 -right-2.5 h-2.5 w-2.5 rounded-full" />
        )}
      </div>
      {element.badge && (
        <Badge className={element.className?.badge}>{element.badge}</Badge>
      )}
    </MenubarItem>
  )
}

/**
 * This function returns a navigation dropdown component based on the ShadcnUI menubar component.
 * The dropdown can display either a label, an icon, or both, and supports dynamic styling based on its state.
 * The dropdown can contain multiple elements, including links, separators, and submenus.
 *
 * @param label - The text to display on the dropdown (required for label or combined dropdowns).
 * @param icon - The FontAwesome icon definition to display (required for icon-only or combined dropdowns).
 * @param ariaLabel - Accessible name for the trigger button. Required for icon-only dropdowns (which have no visible text); ignored when a visible label is set.
 * @param elements - The array of elements to display in the dropdown (required).
 * @param disabled - Specifies whether the dropdown is disabled or not.
 * @param active - Indicates whether the dropdown is in an active state (only for label dropdowns).
 * @param notification - Specifies whether the dropdown trigger has a notification badge or not.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy).
 * @param className - The optional className object to override default styling for trigger, label, icon, content, and separator.
 * @return NavigationDropdown component
 */
function NavigationDropdown({
  label,
  icon,
  ariaLabel,
  disabled = false,
  active = false,
  notification = false,
  elements,
  data,
  className,
  style,
}: NavigationDropdownProps) {
  const hasIconAndLabel =
    typeof label !== 'undefined' && typeof icon !== 'undefined'
  const iconOnly = typeof label === 'undefined' && typeof icon !== 'undefined'

  return (
    <>
      <MenubarTrigger
        disabled={disabled}
        aria-label={!label ? ariaLabel : undefined}
        data-cy={data?.cy}
        data-test={data?.test}
        style={style?.trigger}
        className={twMerge(
          'text-sm hover:cursor-pointer',
          hasIconAndLabel && 'flex flex-row items-center gap-2',
          !iconOnly && !disabled && dynamicUnderline,
          active && 'text-black after:scale-x-100',
          disabled &&
            'text-slate-400! hover:cursor-not-allowed hover:text-slate-400!',
          className?.trigger
        )}
      >
        {hasIconAndLabel ? (
          <>
            <FontAwesomeIcon
              icon={icon}
              style={style?.icon}
              className={className?.icon}
            />
            <div
              style={style?.label}
              className={twMerge('relative', className?.label)}
            >
              {label}
              {notification && (
                <div className="bg-notification absolute -top-0.5 -right-2 h-2.5 w-2.5 rounded-full" />
              )}
            </div>
          </>
        ) : label ? (
          <div
            style={style?.label}
            className={twMerge('relative', className?.label)}
          >
            {label}
            {notification && (
              <div className="bg-notification absolute -top-0.5 -right-2 h-2.5 w-2.5 rounded-full" />
            )}
          </div>
        ) : (
          <FontAwesomeIcon
            icon={icon!}
            size="lg"
            style={style?.icon}
            className={className?.icon}
          />
        )}
      </MenubarTrigger>
      {!disabled ? (
        <MenubarContent style={style?.content} className={className?.content}>
          {elements.map((element) => {
            if (element.type === 'link') {
              return <NavigationMenuItem key={element.key} element={element} />
            } else if (element.type === 'separator') {
              return (
                <MenubarSeparator
                  key={element.key}
                  style={style?.separator}
                  className={className?.separator}
                />
              )
            } else if (element.type === 'submenu') {
              return (
                <MenubarSub key={element.key}>
                  <MenubarSubTrigger
                    style={element.style?.label}
                    className={twMerge(
                      'h-9 text-sm hover:cursor-pointer',
                      element.className?.label
                    )}
                  >
                    {element.label}
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    {element.options.map((option) => {
                      return (
                        <NavigationMenuItem key={option.key} element={option} />
                      )
                    })}
                  </MenubarSubContent>
                </MenubarSub>
              )
            }
          })}
        </MenubarContent>
      ) : null}
    </>
  )
}
// #endregion

// ! Navigation
// #region
export type NavigationButtonItemProps = NavigationButtonProps & {
  type: 'button'
  key: string
}

export type NavigationDropdownItemProps = NavigationDropdownProps & {
  type: 'dropdown'
  key: string
}

export type NavigationItemProps =
  | NavigationButtonItemProps
  | NavigationDropdownItemProps

type NavigationPrimitiveProps = ComponentPropsWithoutRef<typeof ShadcnMenubar>

export interface NavigationProps
  extends Omit<
    NavigationPrimitiveProps,
    | 'children'
    | 'className'
    | 'defaultValue'
    | 'onValueChange'
    | 'style'
    | 'value'
  > {
  items: NavigationItemProps[]
  className?: { root?: string }
  style?: { root?: React.CSSProperties }
}

/**
 * This function returns a pre-styled navigation component based on the ShadcnUI menubar component.
 * The navigation component can contain multiple items, including buttons and dropdowns, which are
 * defined through a corresponding data structure passed to the function.
 *
 * @param items - The array of items to display in the navigation (required).
 * @param className - The optional className object to override default styling for the root.
 * @return Navigation component
 */
export function Navigation({
  items,
  className,
  style,
  ...props
}: NavigationProps) {
  // Which menu the bar currently has open, keyed by item. Radix would happily
  // track this itself, but only the owner of the state can refuse a value: a
  // `type: 'button'` item has no `MenubarContent`, so "open" is a state it must
  // never enter.
  const [openItem, setOpenItem] = useState('')

  return (
    <ShadcnMenubar
      className={twMerge(
        'border-none bg-transparent shadow-none',
        className?.root
      )}
      style={style?.root}
      {...props}
      value={openItem}
      // `MenubarContent` moves between menus on ArrowLeft/ArrowRight by calling
      // the bar's open handler directly, and composes that handler with
      // `checkForDefaultPrevented: false` — so arrowing sideways out of an open
      // dropdown onto an action item cannot be intercepted at the trigger the
      // way the other entry paths can. Rejecting the value here catches every
      // path at the one point they all funnel through: the state itself.
      // Closing the bar (rather than holding the previous menu open) is what
      // keeps arrow navigation moving — Radix then hands focus back to the bar,
      // and the next arrow press walks on to the item the user was heading for.
      onValueChange={(next) =>
        setOpenItem(
          items.some((item) => item.type === 'button' && item.key === next)
            ? ''
            : next
        )
      }
    >
      {items.map((item) => (
        <MenubarMenu value={item.key} key={item.key}>
          {item.type === 'button' ? (
            <NavigationButton {...item} />
          ) : (
            <NavigationDropdown {...item} />
          )}
        </MenubarMenu>
      ))}
    </ShadcnMenubar>
  )
}
// #endregion

export default Navigation
