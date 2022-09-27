import React from 'react'
import Dropdown from './Dropdown'

export const Default = () => {
  return (
    <div>
      Werden dem Dropdown Menu items übergeben, so werden diese als einzelne
      Elemente angezeigt. Allfällige über das groups-Attribute übergebene Daten
      werden ignoriert und nicht angezeigt.
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

export const Groups = () => {
  return (
    <div>
      Werden dem Dropdown Menu groups übergeben, so werden diese als Gruppen im
      Dropdown angezeigt. Es ist unbedingt zu beachten, dass Gruppen nur dann
      gerendert werden, wenn keine items übergeben werden.
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
