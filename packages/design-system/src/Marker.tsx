'use client'

import type { ComponentProps, ReactNode } from 'react'
import { testAttrs, type TestSelectors } from './lib/testSelectors'
import { MarkerContent, MarkerIcon, Marker as Primitive } from './ui/marker'

export interface MarkerClassName {
  root?: string
  icon?: string
  content?: string
}
export interface MarkerProps
  extends Omit<
    ComponentProps<typeof Primitive>,
    'className' | 'children' | 'asChild'
  > {
  children?: ReactNode
  icon?: ReactNode
  className?: MarkerClassName
  data?: TestSelectors
  dataIcon?: TestSelectors
  dataContent?: TestSelectors
}
export function Marker({
  children,
  icon,
  className,
  data,
  dataIcon,
  dataContent,
  ...props
}: MarkerProps) {
  return (
    <Primitive {...props} {...testAttrs(data)} className={className?.root}>
      {icon != null && (
        <MarkerIcon {...testAttrs(dataIcon)} className={className?.icon}>
          {icon}
        </MarkerIcon>
      )}
      <MarkerContent {...testAttrs(dataContent)} className={className?.content}>
        {children}
      </MarkerContent>
    </Primitive>
  )
}
export default Marker
