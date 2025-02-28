import {
  faEnvelope,
  faPlaneArrival,
  faPlaneDeparture,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Button from './Button'

export const Loading = () => <Button loading>Button</Button>

export const Default = () => (
  <Button>
    <Button.Icon icon={faEnvelope} />
    <Button.Label>Button</Button.Label>
  </Button>
)

export const Icon = () => (
  <Button>
    <Button.Icon icon={faEnvelope} withoutLabel />
  </Button>
)

export const Primary = () => (
  <Button primary>
    <Button.Icon icon={faEnvelope} />
    <Button.Label>Button</Button.Label>
  </Button>
)

export const Destructive = () => (
  <Button destructive>
    <Button.Icon icon={faEnvelope} />
    <Button.Label>Button</Button.Label>
  </Button>
)

export const Active = () => (
  <div className="flex flex-col gap-4">
    <Button active className={{ root: 'w-max' }}>
      <Button.Icon icon={faEnvelope} />
      <Button.Label>Button</Button.Label>
    </Button>
    <Button
      active
      className={{
        root: 'w-max',
        active: 'bg-red-300 hover:bg-red-400 hover:text-black',
      }}
    >
      <Button.Icon icon={faEnvelope} />
      <Button.Label>Custom Active Style</Button.Label>
    </Button>
  </div>
)

export const Disabled = () => (
  <div className="flex flex-col gap-4">
    <Button disabled>
      <Button.Icon icon={faEnvelope} />
      <Button.Label>Button</Button.Label>
    </Button>
    <Button primary disabled>
      <Button.Icon icon={faEnvelope} />
      <Button.Label>Primary Button</Button.Label>
    </Button>
    <Button destructive disabled>
      <Button.Icon icon={faEnvelope} />
      <Button.Label>Destructive Button</Button.Label>
    </Button>
  </div>
)

export const Fluid = () => (
  <Button fluid>
    <Button.Icon icon={faEnvelope} />
    <Button.Label>Button</Button.Label>
  </Button>
)

export const BasicButton = () => (
  <Button basic>
    <Button.Icon icon={faEnvelope} />
    <Button.Label>Button</Button.Label>
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
      <Button.Icon icon={faPlaneArrival} withoutLabel />
      <Button.Icon icon={faPlaneDeparture} withoutLabel />
      <Button.Icon icon={faEnvelope} withoutLabel />
    </Button.IconGroup>
  )
}
