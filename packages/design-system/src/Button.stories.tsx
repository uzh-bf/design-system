import {
  faEnvelope,
  faPlaneArrival,
  faPlaneDeparture,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Button from './Button'

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

export const Loading = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col gap-4">
      <Button loading className={{ root: 'w-max' }}>
        Button
      </Button>
      <div className="flex flex-col gap-2">
        <div>
          For Buttons with an icon, the loading parameter can optionally also be
          passed to the icon, causing it to be hidden when the loading spinner
          is shown:
        </div>
        <Button
          loading={loading}
          onClick={handleClick}
          disabled={loading}
          className={{ root: 'w-max' }}
        >
          <Button.Icon icon={faEnvelope} loading={loading} />
          <Button.Label>Button with Icon</Button.Label>
        </Button>
        <Button
          primary
          loading={loading}
          onClick={handleClick}
          disabled={loading}
          className={{ root: 'w-max' }}
        >
          <Button.Icon icon={faEnvelope} loading={loading} />
          <Button.Label>Button with Icon</Button.Label>
        </Button>
        <Button
          destructive
          loading={loading}
          onClick={handleClick}
          disabled={loading}
          className={{ root: 'w-max' }}
        >
          <Button.Icon icon={faEnvelope} loading={loading} />
          <Button.Label>Button with Icon</Button.Label>
        </Button>
      </div>
    </div>
  )
}

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
