import { faTruckLoading } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from './button'

export const Simple = () => <Button>Test-Text</Button>

// export const Loading = () => <Button loading>Test-Text</Button>

export const Default = () => (
  <Button>
    <FontAwesomeIcon icon={faTruckLoading} />
    Test-Text
  </Button>
)

// export const Active = () => (
//   <Button active>
//     <Button.Icon>{ExampleIcon}</Button.Icon>
//     <Button.Label>Test-Text</Button.Label>
//   </Button>
// )

// export const Disabled = () => (
//   <Button disabled>
//     <Button.Icon>{ExampleIcon}</Button.Icon>
//     <Button.Label>Test-Text</Button.Label>
//   </Button>
// )

// export const Fluid = () => (
//   <Button fluid>
//     <Button.Icon>{ExampleIcon}</Button.Icon>
//     <Button.Label>Test-Text</Button.Label>
//   </Button>
// )

// export const BasicButton = () => (
//   <Button basic>
//     <Button.Icon>{ExampleIcon}</Button.Icon>
//     <Button.Label>Test-Text</Button.Label>
//   </Button>
// )

// export const ColorButton = () => (
//   <Button
//     className={{ root: 'h-8 w-8 rounded-full bg-red-300 hover:bg-red-500' }}
//     onClick={() => alert('Red button was pressed!')}
//   />
// )

// export const ButtonIconGroup = () => {
//   const [state, setState] = useState<number | undefined>(undefined)

//   return (
//     <Button.IconGroup state={state} setState={setState}>
//       <FontAwesomeIcon icon={faPlaneArrival} />
//       <FontAwesomeIcon icon={faPlaneDeparture} />
//       <FontAwesomeIcon icon={faHouse} />
//     </Button.IconGroup>
//   )
// }
