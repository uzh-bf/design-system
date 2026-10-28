'use client'

import type { ComponentProps, ReactNode } from 'react'
import { testAttrs, type TestSelectors } from './lib/testSelectors'
import {
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  Message as Primitive,
} from './ui/message'

export interface MessageClassName {
  root?: string
  avatar?: string
  content?: string
  header?: string
  footer?: string
}
export interface MessageProps
  extends Omit<ComponentProps<typeof Primitive>, 'className' | 'children'> {
  children?: ReactNode
  avatar?: ReactNode
  header?: ReactNode
  footer?: ReactNode
  className?: MessageClassName
  data?: TestSelectors
  dataAvatar?: TestSelectors
  dataContent?: TestSelectors
  dataHeader?: TestSelectors
  dataFooter?: TestSelectors
}

export function Message({
  children,
  avatar,
  header,
  footer,
  className,
  data,
  dataAvatar,
  dataContent,
  dataHeader,
  dataFooter,
  ...props
}: MessageProps) {
  return (
    <Primitive {...props} {...testAttrs(data)} className={className?.root}>
      {avatar != null && (
        <MessageAvatar {...testAttrs(dataAvatar)} className={className?.avatar}>
          {avatar}
        </MessageAvatar>
      )}
      <MessageContent
        {...testAttrs(dataContent)}
        className={className?.content}
      >
        {header != null && (
          <MessageHeader
            {...testAttrs(dataHeader)}
            className={className?.header}
          >
            {header}
          </MessageHeader>
        )}
        {children}
        {footer != null && (
          <MessageFooter
            {...testAttrs(dataFooter)}
            className={className?.footer}
          >
            {footer}
          </MessageFooter>
        )}
      </MessageContent>
    </Primitive>
  )
}
export default Message
