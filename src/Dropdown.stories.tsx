import React from 'react'
import Dropdown from './Dropdown'

export const Default = () => {
  return (
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
  )
}

export const Groups = () => {
  return (
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
  )
}
