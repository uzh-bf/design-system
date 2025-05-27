import React, { useState } from 'react'
import Button from './Button'
import ModalLegacy from './ModalLegacy'

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalLegacy
      open={isOpen}
      title="ModalLegacy Title"
      trigger={
        <Button onClick={() => setIsOpen(true)}>Open ModalLegacy</Button>
      }
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
    </ModalLegacy>
  )
}

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalLegacy
      open={isOpen}
      trigger={
        <Button onClick={() => setIsOpen(true)}>Open ModalLegacy</Button>
      }
      onClose={() => setIsOpen(false)}
    >
      content
    </ModalLegacy>
  )
}

export const Trigger = () => {
  const [isOpen, setIsOpen] = useState(false)
  const StyledButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
  >((props, forwardedRef) => (
    <Button
      {...props}
      ref={forwardedRef}
      onClick={() => setIsOpen(true)}
      className={{ root: 'border-red-500 bg-blue-300' }}
    >
      Open ModalLegacy
    </Button>
  ))

  return (
    <div>
      In order for styles, etc. to be correctly applied to the trigger, it must
      be wrapped into a reference and prop passing component (since it is
      rendered with the `asChild` option in Radix)
      <ModalLegacy
        open={isOpen}
        trigger={<StyledButton />}
        onClose={() => setIsOpen(false)}
      >
        content
      </ModalLegacy>
    </div>
  )
}

export const Primary = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalLegacy
      open={isOpen}
      trigger={
        <Button onClick={() => setIsOpen(true)}>Open ModalLegacy</Button>
      }
      onClose={() => setIsOpen(false)}
      onPrimaryAction={
        <Button
          className={{ root: 'border-uzh-blue-80 bg-uzh-blue-100 text-white' }}
        >
          Primary
        </Button>
      }
    >
      content
    </ModalLegacy>
  )
}

export const Secondary = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalLegacy
      open={isOpen}
      trigger={
        <Button onClick={() => setIsOpen(true)}>Open ModalLegacy</Button>
      }
      onClose={() => setIsOpen(false)}
      onSecondaryAction={
        <Button
          className={{ root: 'border-uzh-grey-80 bg-uzh-grey-100 text-white' }}
        >
          Primary
        </Button>
      }
    >
      content
    </ModalLegacy>
  )
}

export const Fullscreen = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalLegacy
      fullScreen
      open={isOpen}
      trigger={
        <Button onClick={() => setIsOpen(true)}>Open ModalLegacy</Button>
      }
      onClose={() => setIsOpen(false)}
    >
      content
    </ModalLegacy>
  )
}

export const EscapeDisabled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalLegacy
      open={isOpen}
      trigger={
        <Button onClick={() => setIsOpen(true)}>Open ModalLegacy</Button>
      }
      onClose={() => setIsOpen(false)}
      escapeDisabled={true}
    >
      content
    </ModalLegacy>
  )
}

export const WithoutClose = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalLegacy
      hideCloseButton
      escapeDisabled={true}
      open={isOpen}
      trigger={
        <Button onClick={() => setIsOpen(true)}>Open ModalLegacy</Button>
      }
      onClose={() => setIsOpen(false)}
      className={{ content: 'flex flex-col' }}
      title="ModalLegacy Title"
    >
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed
        quam quis libero tempor faucibus vel nec est. Vestibulum euismod dolor a
        libero ornare hendrerit. Aenean fermentum tempus malesuada. Aliquam
        tempor leo quis semper aliquam. Duis sagittis viverra lectus, eget
        molestie arcu vulputate in. Donec quis aliquet ligula. Donec aliquam
        lectus nec justo pretium, ac feugiat diam consectetur. Donec rutrum
        placerat finibus. Nam accumsan justo quam. Morbi suscipit pellentesque
        diam, et consectetur risus varius at. Suspendisse vel nisi tempor,
        blandit nibh quis, tempor quam. Aliquam eget erat a orci cursus
        venenatis. Integer vel nisl molestie, pellentesque nibh et, interdum
        leo. Morbi eu enim ipsum. Phasellus blandit tortor quis augue rhoncus
        dictum. Mauris bibendum lectus in ipsum ornare congue. Morbi ac magna a
        felis gravida commodo sed et ligula. Nam lorem tortor, lacinia eu lorem
        et, facilisis finibus orci. Curabitur tempus nibh eget sem mattis, sit
        amet venenatis ante pretium. Ut elementum nec felis in ultricies. In
        quis nulla vel lectus rhoncus suscipit. Pellentesque et semper neque.
        Sed mattis quam ante, eu ultricies ex fermentum vitae. Proin egestas,
        metus quis efficitur scelerisque, tellus nisl tempor metus, nec tempor
        quam tortor id ipsum. Proin faucibus erat ex, vitae placerat nisi
        dignissim eget. Aliquam erat volutpat. Cras a nisl neque. Phasellus
        maximus et massa vitae interdum. Donec finibus eu arcu ac venenatis.
        Pellentesque malesuada orci ac auctor volutpat. Ut placerat vel justo
        vitae rutrum. Morbi pharetra viverra nisi, id gravida urna interdum non.
        Curabitur ipsum dui, tempus sed dignissim vitae, facilisis non neque.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies
        augue nec ultricies gravida. Donec posuere id justo sit amet accumsan.
        Mauris auctor nisl ut urna rhoncus, sed condimentum eros bibendum. Nunc
        at condimentum velit. Vestibulum tristique erat ut dui luctus, non
        posuere eros feugiat. Sed vel venenatis lorem. Sed tempor, diam ut
        imperdiet convallis, ex eros auctor tellus, a lacinia orci massa eget
        metus. Morbi ante sem, dictum at orci vitae, tempor vehicula augue.
        Quisque sed quam elementum, auctor magna nec, sodales elit. Suspendisse
        potenti. Suspendisse sed mauris quis ligula pretium tincidunt quis sit
        amet risus. Aliquam eu nisl eget tortor molestie euismod quis eu eros.
        Phasellus commodo ullamcorper quam, vitae pharetra odio commodo id. Duis
        sodales fermentum tortor eu tristique. Duis a maximus mauris, vel semper
        nunc. Ut fermentum, dui mollis faucibus ultrices, risus velit faucibus
        metus, vel imperdiet purus libero ac neque. Fusce iaculis facilisis elit
        non hendrerit. Aliquam vel congue mauris. Ut a nulla quis ante
        ullamcorper pellentesque ac in urna. Duis ut interdum enim. In hac
        habitasse platea dictumst. Nam finibus volutpat purus. Donec ut diam in
        risus tristique mattis. Donec laoreet augue in ullamcorper sagittis.{' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed
        quam quis libero tempor faucibus vel nec est. Vestibulum euismod dolor a
        libero ornare hendrerit. Aenean fermentum tempus malesuada. Aliquam
        tempor leo quis semper aliquam. Duis sagittis viverra lectus, eget
        molestie arcu vulputate in. Donec quis aliquet ligula. Donec aliquam
        lectus nec justo pretium, ac feugiat diam consectetur. Donec rutrum
        placerat finibus. Nam accumsan justo quam. Morbi suscipit pellentesque
        diam, et consectetur risus varius at. Suspendisse vel nisi tempor,
        blandit nibh quis, tempor quam. Aliquam eget erat a orci cursus
        venenatis. Integer vel nisl molestie, pellentesque nibh et, interdum
        leo. Morbi eu enim ipsum. Phasellus blandit tortor quis augue rhoncus
        dictum. Mauris bibendum lectus in ipsum ornare congue. Morbi ac magna a
        felis gravida commodo sed et ligula. Nam lorem tortor, lacinia eu lorem
        et, facilisis finibus orci. Curabitur tempus nibh eget sem mattis, sit
        amet venenatis ante pretium. Ut elementum nec felis in ultricies. In
        quis nulla vel lectus rhoncus suscipit. Pellentesque et semper neque.
        Sed mattis quam ante, eu ultricies ex fermentum vitae. Proin egestas,
        metus quis efficitur scelerisque, tellus nisl tempor metus, nec tempor
        quam tortor id ipsum. Proin faucibus erat ex, vitae placerat nisi
        dignissim eget. Aliquam erat volutpat. Cras a nisl neque. Phasellus
        maximus et massa vitae interdum. Donec finibus eu arcu ac venenatis.
        Pellentesque malesuada orci ac auctor volutpat. Ut placerat vel justo
        vitae rutrum. Morbi pharetra viverra nisi, id gravida urna interdum non.
        Curabitur ipsum dui, tempus sed dignissim vitae, facilisis non neque.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies
        augue nec ultricies gravida. Donec posuere id justo sit amet accumsan.
        Mauris auctor nisl ut urna rhoncus, sed condimentum eros bibendum. Nunc
        at condimentum velit. Vestibulum tristique erat ut dui luctus, non
        posuere eros feugiat. Sed vel venenatis lorem. Sed tempor, diam ut
        imperdiet convallis, ex eros auctor tellus, a lacinia orci massa eget
        metus. Morbi ante sem, dictum at orci vitae, tempor vehicula augue.
        Quisque sed quam elementum, auctor magna nec, sodales elit. Suspendisse
        potenti. Suspendisse sed mauris quis ligula pretium tincidunt quis sit
        amet risus. Aliquam eu nisl eget tortor molestie euismod quis eu eros.
        Phasellus commodo ullamcorper quam, vitae pharetra odio commodo id. Duis
        sodales fermentum tortor eu tristique. Duis a maximus mauris, vel semper
        nunc. Ut fermentum, dui mollis faucibus ultrices, risus velit faucibus
        metus, vel imperdiet purus libero ac neque. Fusce iaculis facilisis elit
        non hendrerit. Aliquam vel congue mauris. Ut a nulla quis ante
        ullamcorper pellentesque ac in urna. Duis ut interdum enim. In hac
        habitasse platea dictumst. Nam finibus volutpat purus. Donec ut diam in
        risus tristique mattis. Donec laoreet augue in ullamcorper sagittis.
      </div>
      <Button onClick={() => setIsOpen(false)}>Close</Button>
    </ModalLegacy>
  )
}
