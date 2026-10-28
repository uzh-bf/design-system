'use client'

import { ArrowDownIcon } from 'lucide-react'
import type { ComponentProps, ReactNode, Ref } from 'react'
import { testAttrs, type TestSelectors } from './lib/testSelectors'
import {
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScroller as Primitive,
} from './ui/message-scroller'

export interface MessageScrollerClassName {
  root?: string
  viewport?: string
  content?: string
  item?: string
  button?: string
  spacer?: string
  footer?: string
}
export interface MessageScrollerEntry {
  id: string
  content: ReactNode
  scrollAnchor?: boolean
  data?: TestSelectors
}
type ProviderOptions = Omit<
  ComponentProps<typeof MessageScrollerProvider>,
  'children'
>
export type MessageScrollerViewportProps = Omit<
  ComponentProps<typeof MessageScrollerViewport>,
  'className' | 'children' | 'ref'
>
export type MessageScrollerButtonProps = Omit<
  ComponentProps<typeof MessageScrollerButton>,
  'className' | 'children' | 'render' | 'ref'
>
interface MessageScrollerBaseProps
  extends Omit<
      ComponentProps<typeof Primitive>,
      'className' | 'children' | 'ref'
    >,
    ProviderOptions {
  ref?: Ref<HTMLDivElement>
  footer?: ReactNode
  viewportProps?: MessageScrollerViewportProps
  buttonProps?: MessageScrollerButtonProps
  jumpButtonRef?: Ref<HTMLButtonElement>
  jumpLabel?: string
  ariaLabel?: string
  className?: MessageScrollerClassName
  data?: TestSelectors
  dataViewport?: TestSelectors
  dataContent?: TestSelectors
  dataButton?: TestSelectors
  dataFooter?: TestSelectors
}
export type MessageScrollerProps = MessageScrollerBaseProps &
  (
    | { items: readonly MessageScrollerEntry[]; children?: never }
    | { items?: never; children: ReactNode }
  )

export function MessageScroller({
  items,
  children,
  footer,
  ref,
  viewportProps,
  buttonProps,
  jumpButtonRef,
  jumpLabel,
  ariaLabel,
  className,
  data,
  dataViewport,
  dataContent,
  dataButton,
  dataFooter,
  autoScroll,
  defaultScrollPosition,
  scrollEdgeThreshold,
  scrollPreviousItemPeek,
  scrollMargin,
  ...props
}: MessageScrollerProps) {
  return (
    <MessageScrollerProvider
      autoScroll={autoScroll}
      defaultScrollPosition={defaultScrollPosition}
      scrollEdgeThreshold={scrollEdgeThreshold}
      scrollPreviousItemPeek={scrollPreviousItemPeek}
      scrollMargin={scrollMargin}
    >
      <Primitive {...props} {...testAttrs(data)} className={className?.root}>
        <div className="relative min-h-0 flex-1">
          <MessageScrollerViewport
            {...viewportProps}
            {...testAttrs(dataViewport)}
            ref={ref}
            aria-label={
              viewportProps?.['aria-labelledby']
                ? undefined
                : (viewportProps?.['aria-label'] ?? ariaLabel)
            }
            className={className?.viewport}
          >
            <MessageScrollerContent
              {...testAttrs(dataContent)}
              className={className?.content}
              spacerClassName={className?.spacer}
            >
              {items
                ? items.map((item) => (
                    <MessageScrollerItem
                      key={item.id}
                      messageId={item.id}
                      scrollAnchor={item.scrollAnchor}
                      {...testAttrs(item.data)}
                      className={className?.item}
                    >
                      {item.content}
                    </MessageScrollerItem>
                  ))
                : children}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton
            {...buttonProps}
            {...testAttrs(dataButton)}
            ref={jumpButtonRef}
            className={className?.button}
          >
            {jumpLabel ? (
              <>
                <ArrowDownIcon aria-hidden="true" />
                <span className="sr-only">{jumpLabel}</span>
              </>
            ) : undefined}
          </MessageScrollerButton>
        </div>
        {footer != null && (
          <div {...testAttrs(dataFooter)} className={className?.footer}>
            {footer}
          </div>
        )}
      </Primitive>
    </MessageScrollerProvider>
  )
}

export {
  // eslint-disable-next-line react-refresh/only-export-components -- public hook re-export
  useMessageScroller,
  // eslint-disable-next-line react-refresh/only-export-components -- public hook re-export
  useMessageScrollerScrollable,
  // eslint-disable-next-line react-refresh/only-export-components -- public hook re-export
  useMessageScrollerVisibility,
} from './ui/message-scroller'
export default MessageScroller
