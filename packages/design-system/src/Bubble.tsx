'use client'

import type { ComponentProps, ReactNode } from 'react'
import { testAttrs, type TestSelectors } from './lib/testSelectors'
import {
  BubbleContent,
  BubbleReactions,
  Bubble as Primitive,
} from './ui/bubble'

export interface BubbleClassName {
  root?: string
  content?: string
  reactions?: string
}
export interface BubbleProps
  extends Omit<ComponentProps<typeof Primitive>, 'className' | 'children'> {
  children?: ReactNode
  reactions?: ReactNode
  className?: BubbleClassName
  data?: TestSelectors
  dataContent?: TestSelectors
  dataReactions?: TestSelectors
}
export function Bubble({
  children,
  reactions,
  className,
  data,
  dataContent,
  dataReactions,
  ...props
}: BubbleProps) {
  return (
    <Primitive {...props} {...testAttrs(data)} className={className?.root}>
      <BubbleContent {...testAttrs(dataContent)} className={className?.content}>
        {children}
      </BubbleContent>
      {reactions != null && (
        <BubbleReactions
          {...testAttrs(dataReactions)}
          className={className?.reactions}
        >
          {reactions}
        </BubbleReactions>
      )}
    </Primitive>
  )
}
export default Bubble
