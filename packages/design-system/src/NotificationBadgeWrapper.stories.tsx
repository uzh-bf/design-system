import NotificationBadgeWrapper from './NotificationBadgeWrapper'

export const Default = () => {
  return (
    <div>
      Please note: This component is meant as a wrapper component that can be
      used to display a notification badge on top of its child component.
      Various positioning and styling options are available, while still hiding
      as much of the logic as possible.
      <NotificationBadgeWrapper count={4} className={{ root: 'w-32' }}>
        <div className="border-uzh-grey-80 flex h-10 w-32 flex-col justify-center rounded-md border border-solid">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
    </div>
  )
}

export const Sizes = () => {
  return (
    <div>
      Please note: This component is meant as a wrapper component that can be
      used to display a notification badge on top of its child component.
      Various positioning and styling options are available, while still hiding
      as much of the logic as possible.
      <NotificationBadgeWrapper
        count={4}
        size="xl"
        className={{ root: 'w-32' }}
      >
        <div className="border-uzh-grey-80 flex h-20 w-32 flex-col justify-center rounded-md border border-solid">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
    </div>
  )
}

export const Positions = () => {
  return (
    <div>
      Please note: This component is meant as a wrapper component that can be
      used to display a notification badge on top of its child component.
      Various positioning and styling options are available, while still hiding
      as much of the logic as possible.
      <NotificationBadgeWrapper
        count={4}
        className={{ root: 'w-32', badge: 'top-5 left-0' }}
      >
        <div className="border-uzh-grey-80 flex h-10 w-32 flex-col justify-center rounded-md border border-solid pl-6">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
      <NotificationBadgeWrapper
        count={4}
        className={{ root: 'w-32', badge: 'top-5 right-0' }}
      >
        <div className="border-uzh-grey-80 flex h-10 w-32 flex-col justify-center rounded-md border border-solid">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
    </div>
  )
}

export const Styled = () => {
  return (
    <div>
      Please note: This component is meant as a wrapper component that can be
      used to display a notification badge on top of its child component.
      Various positioning and styling options are available, while still hiding
      as much of the logic as possible.
      <NotificationBadgeWrapper
        count={4}
        className={{
          root: 'w-32',
          badge: 'bg-green-400 font-bold text-red-800',
        }}
      >
        <div className="border-uzh-grey-80 flex h-10 w-32 flex-col justify-center rounded-md border border-solid">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
    </div>
  )
}

export const NoCount = () => {
  return (
    <div>
      Please note: This component is meant as a wrapper component that can be
      used to display a notification badge on top of its child component.
      Various positioning and styling options are available, while still hiding
      as much of the logic as possible.
      <NotificationBadgeWrapper className={{ root: 'w-32' }}>
        <div className="border-uzh-grey-80 flex h-10 w-28 flex-col justify-center rounded-md border border-solid">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
    </div>
  )
}

export const NoBatch = () => {
  return (
    <div>
      No batch will be displayed, whenever the count is undefined and showBadge
      is not set to true.
      <NotificationBadgeWrapper className={{ root: 'w-32' }}>
        <div className="border-uzh-grey-80 flex h-10 w-28 flex-col justify-center rounded-md border border-solid">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
      <NotificationBadgeWrapper className={{ root: 'w-32' }} showBadge>
        <div className="border-uzh-grey-80 flex h-10 w-28 flex-col justify-center rounded-md border border-solid">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
      <NotificationBadgeWrapper className={{ root: 'w-32' }} count={3}>
        <div className="border-uzh-grey-80 flex h-10 w-28 flex-col justify-center rounded-md border border-solid">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
    </div>
  )
}
