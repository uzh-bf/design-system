import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import Checkbox from './Checkbox'
import Dropdown from './Dropdown'
import { ThemeContext } from './ThemeProvider'

export const Default = () => {
  return (
    <div>
      <div>
        If items are given to the dropdown menu component, they are rendered as
        single elements. Any data passed via the groups attribute is ignored and
        not displayed.
      </div>
      <Dropdown
        trigger="Test"
        items={[
          {
            label: 'Element 1 long',
            onClick: () => alert('Element 1 clicked'),
          },
          { label: 'Element 2', onClick: () => alert('Element 2 clicked') },
          {
            label: 'Element 3 short',
            onClick: () => alert('Element 3 clicked'),
          },
          { label: 'Element 4', onClick: () => alert('Element 4 clicked') },
        ]}
      />
    </div>
  )
}

export const Disabled = () => {
  return (
    <div>
      <div>Disabled dropdowns cannot be opened and have greyed out text.</div>
      <Dropdown
        disabled
        trigger="Test"
        items={[
          {
            label: 'Element 1 long',
            onClick: () => alert('Element 1 clicked'),
          },
          { label: 'Element 2', onClick: () => alert('Element 2 clicked') },
          {
            label: 'Element 3 short',
            onClick: () => alert('Element 3 clicked'),
          },
          { label: 'Element 4', onClick: () => alert('Element 4 clicked') },
        ]}
      />
    </div>
  )
}

export const Groups = () => {
  return (
    <div>
      <div>
        If groups are given to the dropdown menu component, they are rendered as
        groups. Any data passed via the items attribute is ignored and not
        displayed.
      </div>
      <Dropdown
        trigger="Test"
        groups={[
          [
            {
              label: 'Element 1 long',
              onClick: () => alert('Element 1 clicked'),
              shorting: 'E1',
            },
            { label: 'Element 2', onClick: () => alert('Element 2 clicked') },
          ],
          [
            {
              label: 'Element 3',
              onClick: () => alert('Element 3 clicked'),
              shorting: 'E3',
            },
            { label: 'Element 4', onClick: () => alert('Element 4 clicked') },
          ],
          [{ label: 'Element 5', onClick: () => alert('Element 5 clicked') }],
        ]}
      />
    </div>
  )
}

export const Selection = () => {
  return (
    <div>
      <div>
        The optional selection attribute can be used to highlight an item as
        selected (styling for string labels is font-bold).
      </div>
      <Dropdown
        trigger="Test"
        items={[
          {
            label: 'Element 1 long',
            onClick: () => alert('Element 1 clicked'),
            selected: true,
          },
          { label: 'Element 2', onClick: () => alert('Element 2 clicked') },
          {
            label: 'Element 3 short',
            onClick: () => alert('Element 3 clicked'),
            selected: true,
          },
          { label: 'Element 4', onClick: () => alert('Element 4 clicked') },
        ]}
      />
    </div>
  )
}
export const CustomLabel = () => {
  const theme = useContext(ThemeContext)
  const [label1Active, setLabel1Active] = useState(false)
  const [label4Active, setLabel4Active] = useState(false)

  return (
    <div>
      <div>
        The trigger as well as the labels of the items can be customized by
        passing React nodes instead of simple strings. Note that passing custom
        label nodes instead of strings also automatically removes all the
        styling that is applied to string labels. Additionally, any shorting
        attribute provided for this item will be ignored. Custom triggers and
        items work for both standard and grouped dropdowns.
      </div>
      <Dropdown
        trigger={
          <div
            className={twMerge(
              'flex flex-row items-center gap-2 p-2 border border-solid border-uzh-grey-60 rounded-md shadow-md  hover:shadow-none',
              `hover:${theme.primaryBg}`
            )}
          >
            <div>Trigger Icon </div>
            <FontAwesomeIcon icon={faFilter} />
          </div>
        }
        groups={[
          [
            {
              label: (
                <span
                  className={twMerge(
                    'flex items-center hover:cursor-pointer px-2 py-0.5',
                    `hover:${theme.primaryBgDark}`
                  )}
                >
                  <Checkbox checked={label1Active} onCheck={undefined} />
                  Element 1
                </span>
              ),
              onClick: () => setLabel1Active(!label1Active),
            },
            { label: 'Element 2', onClick: () => alert('Element 2 clicked') },
          ],
          [
            {
              label: 'Element 3',
              onClick: () => alert('Element 3 clicked'),
              shorting: 'E3',
            },
            {
              label: (
                <span
                  className={twMerge(
                    'flex items-center hover:cursor-pointer px-2 py-0.5',
                    `hover:${theme.primaryBgDark}`
                  )}
                >
                  <Checkbox checked={label4Active} onCheck={undefined} />
                  Element 4
                </span>
              ),
              onClick: () => setLabel4Active(!label4Active),
            },
          ],
          [{ label: 'Element 5', onClick: () => alert('Element 5 clicked') }],
        ]}
      />
    </div>
  )
}
