import React from 'react'
import NotificationBadgeWrapper from './NotificationBadgeWrapper'

export const Default = () => {
  return (
    <div>
      Please note: This component is meant as a wrapper component that can be
      used to display a notification badge on top of its child component.
      Various positioning and styling options are available, while still hiding
      as much of the logic as possible.
      <NotificationBadgeWrapper count={4} className="w-32">
        <div className="flex flex-col justify-center w-32 h-10 border border-solid rounded-md border-uzh-grey-80">
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
      <NotificationBadgeWrapper count={4} size="xl" className="w-32">
        <div className="flex flex-col justify-center w-32 h-20 border border-solid rounded-md border-uzh-grey-80">
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
        className="w-32"
        badgePosition="left-0 top-5"
      >
        <div className="flex flex-col justify-center w-32 h-10 pl-6 border border-solid rounded-md border-uzh-grey-80">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
      <NotificationBadgeWrapper
        count={4}
        className="w-32"
        badgePosition="top-5 right-0"
      >
        <div className="flex flex-col justify-center w-32 h-10 border border-solid rounded-md border-uzh-grey-80">
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
        className="w-32"
        badgeStyle="bg-green-400 font-bold text-red-800"
      >
        <div className="flex flex-col justify-center w-32 h-10 border border-solid rounded-md border-uzh-grey-80">
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
      <NotificationBadgeWrapper withoutCount={true} className="w-32">
        <div className="flex flex-col justify-center h-10 border border-solid rounded-md w-28 border-uzh-grey-80">
          Content DIV
        </div>
      </NotificationBadgeWrapper>
    </div>
  )
}
