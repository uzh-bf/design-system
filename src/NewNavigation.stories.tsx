import React from 'react'
import Navigation from './NewNavigation'

export function Default() {
  const leftItems = [
    {
      type: 'button',
      title: 'button1',
      onClick: () => console.log('test button'),
    },
  ]
  const rightItems = [
    {
      type: 'button',
      title: 'button2',
      href: '/',
    },
    {
      type: 'button',
      title: 'button3',
      href: '/',
    },
  ]

  return <Navigation leftItems={leftItems} rightItems={rightItems} />
}
