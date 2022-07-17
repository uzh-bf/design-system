import { useState } from 'react'
import Button from './Button'
import Modal from './Modal'

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Modal
      open={isOpen}
      title="Modal Title"
      trigger={<Button onClick={() => setIsOpen(true)}>Open Modal</Button>}
      onPrev={() => {
        console.log('prev')
      }}
      onSecondaryAction={
        <Button onClick={() => setIsOpen(true)}>Secondary</Button>
      }
      onPrimaryAction={<Button onClick={() => setIsOpen(true)}>Primary</Button>}
      onNext={() => {
        console.log('next')
      }}
      onClose={() => setIsOpen(false)}
    >
      content
    </Modal>
  )
}

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Modal
      open={isOpen}
      trigger={<Button onClick={() => setIsOpen(true)}>Open Modal</Button>}
      onClose={() => setIsOpen(false)}
    >
      content
    </Modal>
  )
}

export const Primary = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Modal
      open={isOpen}
      trigger={<Button onClick={() => setIsOpen(true)}>Open Modal</Button>}
      onClose={() => setIsOpen(false)}
      onPrimaryAction={
        <Button className="text-white bg-uzh-blue-100 border-uzh-blue-80">
          Primary
        </Button>
      }
    >
      content
    </Modal>
  )
}

export const Secondary = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Modal
      open={isOpen}
      trigger={<Button onClick={() => setIsOpen(true)}>Open Modal</Button>}
      onClose={() => setIsOpen(false)}
      onSecondaryAction={
        <Button className="text-white bg-uzh-grey-100 border-uzh-grey-80">
          Primary
        </Button>
      }
    >
      content
    </Modal>
  )
}
