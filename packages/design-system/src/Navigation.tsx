import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'
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

// ! Syles
const dynamicUnderline = twMerge(
  'relative  after:absolute after:bottom-[0.3rem] after:left-[7.5px] after:h-[2px] after:w-[calc(100%-15px)] ',
  'after:origin-left after:scale-x-0 after:bg-slate-700 after:transition-transform after:duration-500',
  'after:ease-out hover:after:scale-x-100'
)

// ! Button
// #region
export interface BaseNavigationButtonProps {
  onClick: () => void
  disabled?: boolean
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

  return (
    <MenubarMenu>
      <MenubarTrigger
        onClick={onClick}
        disabled={disabled}
        data-cy={data?.cy}
        data-test={data?.test}
        style={style?.root}
        className={twMerge(
          'text-base hover:cursor-pointer',
          !iconOnly && !disabled && dynamicUnderline,
          hasIconAndLabel && 'flex flex-row items-center gap-2',
          active && 'text-black after:scale-x-100',
          disabled &&
            '!text-slate-400 hover:cursor-not-allowed hover:!text-slate-400',
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
                <div className="absolute -right-2 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-600" />
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
              <div className="absolute -right-2 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-600" />
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
    </MenubarMenu>
  )
}
// #endregion

// ! Dropdown
// #region
export type NavigationMenuItemProps = {
  key: string
  type: 'link'
  label: string
  onClick: () => void
  disabled?: boolean
  data?: { cy?: string; test?: string }
  className?: { label?: string }
  style?: { label?: React.CSSProperties }
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
        'h-7 text-base hover:cursor-pointer',
        element.disabled &&
          '!text-slate-400 hover:cursor-not-allowed hover:!text-slate-400',
        element.className?.label
      )}
      style={element.style?.label}
      disabled={element.disabled}
      data-cy={element.data?.cy}
      data-test={element.data?.test}
    >
      {element.label}
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
 * @param elements - The array of elements to display in the dropdown (required).
 * @param disabled - Specifies whether the dropdown is disabled or not.
 * @param active - Indicates whether the dropdown is in an active state (only for label dropdowns).
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy).
 * @param className - The optional className object to override default styling for trigger, label, icon, content, and separator.
 * @return NavigationDropdown component
 */
function NavigationDropdown({
  label,
  icon,
  disabled = false,
  active = false,
  elements,
  data,
  className,
  style,
}: NavigationDropdownProps) {
  const hasIconAndLabel =
    typeof label !== 'undefined' && typeof icon !== 'undefined'
  const iconOnly = typeof label === 'undefined' && typeof icon !== 'undefined'

  return (
    <MenubarMenu>
      <MenubarTrigger
        disabled={disabled}
        data-cy={data?.cy}
        data-test={data?.test}
        style={style?.trigger}
        className={twMerge(
          'text-base hover:cursor-pointer',
          hasIconAndLabel && 'flex flex-row items-center gap-2',
          !iconOnly && !disabled && dynamicUnderline,
          active && 'text-black after:scale-x-100',
          disabled &&
            '!text-slate-400 hover:cursor-not-allowed hover:!text-slate-400',
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
            <div className={className?.label}>{label}</div>
          </>
        ) : label ? (
          <div style={style?.label} className={className?.label}>
            {label}
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
                      'h-8 text-base hover:cursor-pointer',
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
    </MenubarMenu>
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

export interface NavigationProps {
  items: NavigationItemProps[]
  className?: { root?: string }
  style?: { root?: React.CSSProperties }
  [x: string]: unknown
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
  return (
    <ShadcnMenubar
      className={twMerge('border-none bg-transparent', className?.root)}
      style={style?.root}
      {...props}
    >
      {items.map((item) => {
        if (item.type === 'button') {
          return <NavigationButton {...item} key={item.key} />
        } else if (item.type === 'dropdown') {
          return <NavigationDropdown {...item} key={item.key} />
        }
      })}
    </ShadcnMenubar>
  )
}
// #endregion

export default Navigation
