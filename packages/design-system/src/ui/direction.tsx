'use client'

import {
  DirectionProvider as RadixDirectionProvider,
  useDirection,
} from '@radix-ui/react-direction'
import * as React from 'react'

type DirectionProviderProps = Omit<
  React.ComponentProps<typeof RadixDirectionProvider>,
  'dir'
> & {
  dir?: 'ltr' | 'rtl'
  direction?: 'ltr' | 'rtl'
}

function DirectionProvider({
  dir,
  direction,
  children,
}: DirectionProviderProps) {
  const resolvedDirection = useDirection(direction ?? dir)
  return (
    <RadixDirectionProvider dir={resolvedDirection}>
      {children}
    </RadixDirectionProvider>
  )
}

export { DirectionProvider, useDirection }
