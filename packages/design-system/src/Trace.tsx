'use client'

import type { ComponentProps, ReactNode } from 'react'
import { testAttrs, type TestSelectors } from './lib/testSelectors'
import {
  Trace as Primitive,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from './ui/trace'

export interface TraceClassName {
  root?: string
  line?: string
  icon?: string
  title?: string
  description?: string
  trigger?: string
  content?: string
}
export type TraceItem = Pick<ComponentProps<typeof TraceLine>, 'status'> & {
  id: string
  title: ReactNode
  icon?: ReactNode
  description?: ReactNode
  content?: ReactNode
  data?: TestSelectors
} & (
    | {
        open?: undefined
        defaultOpen?: boolean
        onOpenChange?: (open: boolean) => void
      }
    | {
        open: boolean
        defaultOpen?: never
        onOpenChange: (open: boolean) => void
      }
  )
interface TraceBaseProps
  extends Omit<ComponentProps<typeof Primitive>, 'className' | 'children'> {
  className?: TraceClassName
  data?: TestSelectors
}
export type TraceProps = TraceBaseProps &
  (
    | { items: readonly TraceItem[]; children?: never }
    | { items?: never; children: ReactNode }
  )

export function Trace({
  items,
  children,
  className,
  data,
  ...props
}: TraceProps) {
  return (
    <Primitive {...props} {...testAttrs(data)} className={className?.root}>
      {items
        ? items.map(
            ({
              id,
              title,
              icon,
              description,
              content,
              status,
              data: itemData,
              ...itemProps
            }) => {
              const line = (
                <TraceLine
                  status={status}
                  {...(content == null ? testAttrs(itemData) : {})}
                  className={className?.line}
                >
                  {icon != null && (
                    <TraceIcon className={className?.icon}>{icon}</TraceIcon>
                  )}
                  <TraceTitle className={className?.title}>{title}</TraceTitle>
                  {description != null && (
                    <TraceDescription className={className?.description}>
                      {description}
                    </TraceDescription>
                  )}
                </TraceLine>
              )
              return content != null ? (
                <TraceCollapsible key={id} {...itemProps}>
                  <TraceCollapsibleTrigger
                    {...testAttrs(itemData)}
                    className={className?.trigger}
                  >
                    {line}
                  </TraceCollapsibleTrigger>
                  <TraceCollapsibleContent className={className?.content}>
                    {content}
                  </TraceCollapsibleContent>
                </TraceCollapsible>
              ) : (
                <div key={id}>{line}</div>
              )
            }
          )
        : children}
    </Primitive>
  )
}
export default Trace
