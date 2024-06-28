import {
  faHouse,
  faPlaneArrival,
  faPlaneDeparture,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Button from './Button'

const ExampleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z" />
  </svg>
)

export const Simple = () => <Button>Test-Text</Button>

export const Loading = () => <Button loading>Test-Text</Button>

export const Default = () => (
  <Button>
    <Button.Icon>{ExampleIcon}</Button.Icon>
    <Button.Label>Test-Text</Button.Label>
  </Button>
)

export const Active = () => (
  <div className="flex flex-col gap-4">
    <Button active className={{ root: 'w-max' }}>
      <Button.Icon>{ExampleIcon}</Button.Icon>
      <Button.Label>Test-Text</Button.Label>
    </Button>
    <Button
      active
      className={{
        root: 'w-max',
        active: 'bg-red-300 hover:bg-red-400 hover:text-black',
      }}
    >
      <Button.Icon>{ExampleIcon}</Button.Icon>
      <Button.Label>Custom Active Style</Button.Label>
    </Button>
  </div>
)

export const Disabled = () => (
  <Button disabled>
    <Button.Icon>{ExampleIcon}</Button.Icon>
    <Button.Label>Test-Text</Button.Label>
  </Button>
)

export const Fluid = () => (
  <Button fluid>
    <Button.Icon>{ExampleIcon}</Button.Icon>
    <Button.Label>Test-Text</Button.Label>
  </Button>
)

export const BasicButton = () => (
  <Button basic>
    <Button.Icon>{ExampleIcon}</Button.Icon>
    <Button.Label>Test-Text</Button.Label>
  </Button>
)

export const ColorButton = () => (
  <Button
    className={{ root: 'h-8 w-8 rounded-full bg-red-300 hover:bg-red-500' }}
    onClick={() => alert('Red button was pressed!')}
  />
)

export const ButtonIconGroup = () => {
  const [state, setState] = useState<number | undefined>(undefined)

  return (
    <Button.IconGroup state={state} setState={setState}>
      <FontAwesomeIcon icon={faPlaneArrival} />
      <FontAwesomeIcon icon={faPlaneDeparture} />
      <FontAwesomeIcon icon={faHouse} />
    </Button.IconGroup>
  )
}
