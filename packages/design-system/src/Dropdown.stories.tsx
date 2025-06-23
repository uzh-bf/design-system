import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Dropdown from './Dropdown'

const STANDARD_ITEMS = [
  {
    label: 'Element 1 long',
    onClick: () => alert('Element 1 clicked'),
  },
  {
    label: 'Element 2',
    onClick: () => alert('Element 2 clicked'),
  },
  {
    label: 'Element 3 short',
    onClick: () => alert('Element 3 clicked'),
  },
  {
    label: 'Element 4',
    onClick: () => alert('Element 4 clicked'),
  },
]

export const Default = () => {
  return (
    <div>
      <div>
        If items are given to the dropdown menu component, they are rendered as
        single elements. Any data passed via the groups attribute is ignored and
        not displayed.
      </div>
      <Dropdown trigger="Test Content" items={STANDARD_ITEMS} />
    </div>
  )
}

export const AlignedEnd = () => {
  return (
    <div>
      <div>
        The alignment of the popover with respect to the trigger can be chosen
        by setting the alignment prop accordingly.
      </div>
      <Dropdown trigger="Test Content" items={STANDARD_ITEMS} align="end" />
    </div>
  )
}

export const Submenu = () => {
  return (
    <div>
      <div>
        An item can be defined with a submenu, where the contained items are
        defined with the same props again.
      </div>
      <Dropdown
        trigger="Test Content"
        items={[
          {
            label: 'Element 1 long',
            onClick: () => alert('Element 1 clicked'),
          },
          {
            label: 'Element 2',
            type: 'submenu',
            items: [
              {
                label: 'Sub Element 1',
                onClick: () => alert('Sub Element 1 clicked'),
              },
              {
                label: 'Sub Element 2',
                onClick: () => alert('Sub Element 2 clicked'),
              },
            ],
          },
        ]}
        className={{ item: 'text-sm' }}
      />
    </div>
  )
}

export const Disabled = () => {
  return (
    <div>
      <div>Disabled dropdowns cannot be opened and have greyed out text.</div>
      <Dropdown disabled trigger="Test" items={STANDARD_ITEMS} />
    </div>
  )
}

export const CustomTrigger = () => {
  return (
    <div>
      <Dropdown
        trigger={
          <div className="flex flex-row items-center gap-2">
            Trigger with Icon <FontAwesomeIcon icon={faInfoCircle} />
          </div>
        }
        items={STANDARD_ITEMS}
      />
    </div>
  )
}

export const RadioGroups = () => {
  const [value, setValue] = useState('value2')
  const [value2, setValue2] = useState('value4')

  return (
    <div>
      <div>
        If radio groups are given to the dropdown menu component, they are
        rendered as groups of radio items. Any data passed via the items
        attribute is ignored and not displayed.
      </div>
      <Dropdown
        trigger="Test"
        radioGroups={[
          {
            value,
            items: [
              {
                id: 'item1',
                type: 'radio',
                value: 'value1',
                label: 'Item 1',
                onClick: () => setValue('value1'),
              },
              {
                id: 'item2',
                type: 'radio',
                value: 'value2',
                label: 'Item 2',
                onClick: () => setValue('value2'),
              },
              {
                id: 'item3',
                type: 'radio',
                value: 'value3',
                label: 'Item 3',
                onClick: () => setValue('value3'),
              },
            ],
          },
          {
            items: [{ type: 'separator' }],
          },
          {
            value: value2,
            items: [
              {
                id: 'item4',
                type: 'radio',
                value: 'value4',
                label: 'Item 4',
                onClick: () => setValue2('value4'),
              },
              {
                id: 'item5',
                type: 'radio',
                value: 'value5',
                label: 'Item 5',
                onClick: () => setValue2('value5'),
              },
            ],
          },
        ]}
      />
    </div>
  )
}

export const Selection = () => {
  return (
    <div>
      <div>
        To signal that an item is selected / active, either a custom classname
        can be passed or the checkbox option can be used.
      </div>
      <Dropdown
        trigger="Test"
        items={[
          {
            type: 'checkbox',
            label: 'Element 1 long',
            onClick: () => alert('Element 1 clicked'),
            selected: false,
          },
          {
            type: 'checkbox',
            label: 'Element 2',
            onClick: () => alert('Element 2 clicked'),
            selected: true,
          },
          {
            type: 'checkbox',
            label: 'Element 3 short',
            onClick: () => alert('Element 3 clicked'),
            selected: true,
          },
          {
            type: 'checkbox',
            label: 'Element 4',
            onClick: () => alert('Element 4 clicked'),
            selected: false,
          },
          { type: 'separator' },
          {
            label: 'Element 5',
            onClick: () => alert('Element 5 clicked'),
            className: { item: 'text-uzh-blue-100 font-bold' },
          },
          {
            label: 'Element 6',
            onClick: () => alert('Element 6 clicked'),
          },
        ]}
      />
    </div>
  )
}

export const DisabledItems = () => {
  return (
    <div>
      <div>
        Individual dropdown items can be disabled with the disabled property.
        Disabled items cannot be clicked and have greyed out text.
      </div>
      <Dropdown
        trigger="Menu with Disabled Items"
        items={[
          {
            label: 'Available Item',
            onClick: () => alert('Available item clicked'),
          },
          {
            label: 'Disabled Item',
            onClick: () => alert('This should never show'),
            disabled: true,
          },
          {
            label: 'Item with Icon',
            onClick: () => alert('Item with icon clicked'),
          },
          {
            label: 'Disabled with Icon',
            onClick: () => alert('This should never show'),
            disabled: true,
          },
          {
            label: 'Disabled with Tooltip',
            onClick: () => alert('This should never show'),
            tooltip: 'You cannot click this item',
            disabled: true,
          },
        ]}
      />
    </div>
  )
}

export const Shortcuts = () => {
  return (
    <div>
      <div>
        This example demonstrates dropdown items with keyboard shortcuts
        displayed on the right side.
      </div>
      <Dropdown
        trigger="Menu with Shortcuts"
        items={STANDARD_ITEMS.map((item, index) => {
          const shortcuts = ['⌘A', '⌘S', '⌘D', '⌘F']
          return { ...item, shortcut: shortcuts[index] }
        })}
      />
    </div>
  )
}

export const ItemTooltips = () => {
  return (
    <div>
      <div>
        This example shows dropdown items with icons and tooltips. Hover over
        the items to see the tooltips.
      </div>
      <Dropdown
        trigger="Items with Icons & Tooltips"
        items={[
          {
            label: 'Basic Item',
            onClick: () => console.log('Basic clicked'),
            tooltip: 'A basic item without icon',
          },
          {
            label: (
              <div className="flex flex-row items-center gap-2">
                <span>With Info</span>
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
            ),
            onClick: () => console.log('Info clicked'),
            tooltip: 'An item with a blue info icon',
          },
          {
            label: 'Warning Item',
            onClick: () => console.log('Warning clicked'),
            tooltip: 'An item with a red warning icon',
          },
        ]}
      />
    </div>
  )
}
