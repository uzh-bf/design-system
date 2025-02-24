import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Navigation, {
  NavigationItemProps,
  NavigationSubmenuProps,
} from './Navigation'

const buttonItem: NavigationItemProps = {
  type: 'button',
  key: 'navigation-button',
  label: 'Button',
  onClick: () => alert('Button clicked'),
  active: false,
}

const iconItem: NavigationItemProps = {
  type: 'button',
  key: 'support-menubar-item',
  icon: faQuestionCircle,
  onClick: () => alert('Support clicked'),
  className: { icon: '-mx-1 ' },
}

const combinedItem: NavigationItemProps = {
  type: 'button',
  key: 'support-menubar-item',
  label: 'Active Content',
  icon: faPlay,
  active: false,
  onClick: () => alert('Support clicked'),
}

const dropdownItem: NavigationItemProps = {
  type: 'dropdown',
  key: 'menubar-dropdown',
  label: 'Dropdown Menu',
  active: false,
  notification: true,
  elements: [
    {
      key: 'dropdown-menubar-item1',
      type: 'link',
      label: 'Item 1',
      onClick: () => alert('Item 1 clicked'),
      notification: true,
    },
    {
      key: 'dropdown-menubar-item2',
      type: 'link',
      label: 'Item 2',
      onClick: () => alert('Item 2 clicked'),
      badge: 'Coming Soon',
      className: { badge: 'bg-orange-500 hover:bg-orange-600' },
    },
    {
      key: 'analytics-all-courses-separator',
      type: 'separator',
    },
    {
      key: 'dropdown-menubar-item3',
      type: 'link',
      label: 'Item 3',
      onClick: () => alert('Item 3 clicked'),
    },
  ],
  data: { cy: 'analytics' },
  className: { icon: 'text-orange-400' },
}

const nestedDropdownItem: NavigationItemProps = {
  type: 'dropdown',
  key: 'menubar-nested-dropdown',
  label: 'Nested Dropdown',
  active: false,
  elements: [
    {
      key: 'dropdown-menubar-item1',
      type: 'link',
      label: 'Item 1',
      onClick: () => alert('Item 1 clicked'),
    },
    {
      key: 'dropdown-menubar-item2',
      type: 'link',
      label: 'Item 2',
      onClick: () => alert('Item 2 clicked'),
    },
    {
      key: 'analytics-all-courses-separator',
      type: 'separator',
    },
    {
      key: `dropdown-menubar-submenu-trigger`,
      type: 'submenu',
      label: 'Submenu',
      options: [
        {
          key: `dropdown-menubar-submenu-item1`,
          type: 'link',
          label: 'Option 1',
          onClick: () => alert('Option 1 clicked'),
        },
        {
          key: `dropdown-menubar-submenu-item2`,
          type: 'link',
          label: 'Option 2',
          onClick: () => alert('Option 2 clicked'),
        },
        {
          key: `dropdown-menubar-submenu-item3`,
          type: 'link',
          label: 'Option 3',
          onClick: () => alert('Option 3 clicked'),
          badge: 'New',
          className: { text: 'mr-4', badge: 'bg-green-700 hover:bg-green-800' },
        },
      ],
    },
  ],
  className: { icon: 'text-orange-400' },
}

export const Button = () => {
  const items = [buttonItem]

  return (
    <div>
      <div className="mb-3">
        This is a simple example of a menubar with a single button component. On
        click, the corresponding passed callback function will be executed.
      </div>
      <Navigation items={items} className={{ root: 'bg-slate-100' }} />
    </div>
  )
}

export const Active = () => {
  const items = [
    {
      ...buttonItem,
      active: true,
    },
  ]

  return (
    <div>
      <div className="mb-3">
        This is a simple example of a menubar with a single active button
        component. When active, the underlined style will remain visible.
      </div>
      <Navigation items={items} className={{ root: 'bg-slate-100' }} />
    </div>
  )
}

export const IconTrigger = () => {
  const items = [iconItem]

  return (
    <div>
      <div className="mb-3">
        Buttons or other trigger items can also simply consist of an icon.
      </div>
      <Navigation items={items} className={{ root: 'bg-slate-100' }} />
    </div>
  )
}

export const CombinedTrigger = () => {
  const items = [combinedItem]

  return (
    <div>
      <div className="mb-3">
        Beyond icons and labels, triggers for navigation dropdowns and button
        elements also support a combination of both.
      </div>
      <Navigation items={items} className={{ root: 'bg-slate-100' }} />
    </div>
  )
}

export const NotificationTrigger = () => {
  const items = [
    { ...buttonItem, notification: true },
    { ...combinedItem, notification: true },
  ]

  return (
    <div>
      <div className="mb-3">
        Beyond icons and labels, triggers for navigation dropdowns and button
        elements also support a combination of both.
      </div>
      <Navigation items={items} className={{ root: 'bg-slate-100' }} />
    </div>
  )
}

export const Dropdown = () => {
  const items = [dropdownItem]

  return (
    <div>
      <div className="mb-3">
        This is a simple example of a menubar with a single dropdown component.
        When clicked or navigated to from another open dropdown trigger, the
        dropdown will expose all its options, which are again clickable and will
        execute the corresponding callback function. Items in a dropdown can
        optionally be separated through a visual separator.
      </div>
      <Navigation items={items} className={{ root: 'bg-slate-100' }} />
    </div>
  )
}

export const NestedMenu = () => {
  const items = [nestedDropdownItem]

  return (
    <div>
      <div className="mb-3">
        The submenu component on the navigation does not only allow the
        definition of items on a dropdown, but adds support for an additional
        dimension. On hovering over the items in the dropdown, the corresponding
        children become available, which can be clicked and will execute the
        corresponding callback function. Separators are not supported on the
        nested level.
      </div>
      <Navigation items={items} className={{ root: 'bg-slate-100' }} />
    </div>
  )
}

export const Complex = () => {
  const items = [
    buttonItem,
    iconItem,
    combinedItem,
    dropdownItem,
    nestedDropdownItem,
  ]

  return (
    <div>
      <div className="mb-3">
        By simply adding all required components to the menubar, all different
        types of content illustrations can be combined. Moving back and forth
        over the triggers allows to expand / collapse the corresponding dropdown
        contents.
      </div>
      <Navigation items={items} className={{ root: 'bg-slate-100' }} />
    </div>
  )
}

export const Disabled = () => {
  const items = [
    { ...buttonItem, disabled: true },
    { ...iconItem, disabled: true },
    { ...dropdownItem, disabled: true },
    {
      ...dropdownItem,
      elements: [
        { ...dropdownItem.elements[0], disabled: true },
        dropdownItem.elements[1],
      ],
    },
    {
      ...nestedDropdownItem,
      elements: [
        ...nestedDropdownItem.elements,
        {
          ...nestedDropdownItem.elements[3],
          options: [
            ...(
              nestedDropdownItem.elements[3] as NavigationSubmenuProps
            ).options.map((option, ix) => ({
              ...option,
              disabled: ix % 2 === 0,
            })),
          ],
        },
      ],
    },
  ]

  return (
    <div>
      <div className="mb-3">
        By adding a disabled flag to different components of the navigation
        component, it is possible to disable the trigger, the children, or the
        nested children.
      </div>
      <Navigation items={items} className={{ root: 'bg-slate-100' }} />
    </div>
  )
}
