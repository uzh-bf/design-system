'use client'

import { useId, type ComponentProps, type ReactNode, type Ref } from 'react'
import { testAttrs, type TestSelectors } from './lib/testSelectors'
import {
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  Attachment as Primitive,
} from './ui/attachment'

export interface AttachmentClassName {
  root?: string
  media?: string
  content?: string
  title?: string
  description?: string
  actions?: string
  trigger?: string
}
export type AttachmentTriggerProps = Omit<
  ComponentProps<typeof AttachmentTrigger>,
  'asChild' | 'className' | 'children' | 'ref'
>
interface AttachmentBaseProps
  extends Omit<
    ComponentProps<typeof Primitive>,
    'className' | 'children' | 'title'
  > {
  className?: AttachmentClassName
  data?: TestSelectors
  dataMedia?: TestSelectors
  dataContent?: TestSelectors
  dataTitle?: TestSelectors
  dataDescription?: TestSelectors
  dataActions?: TestSelectors
  dataTrigger?: TestSelectors
  triggerRef?: Ref<HTMLButtonElement>
}
type AttachmentContentProps =
  | {
      children: ReactNode
      media?: never
      title?: never
      description?: never
      actions?: never
    }
  | {
      children?: never
      media?: ReactNode
      title?: ReactNode
      description?: ReactNode
      actions?: ReactNode
    }
type AttachmentActionProps =
  | { triggerProps?: undefined; triggerAriaLabel?: never }
  | {
      triggerProps: AttachmentTriggerProps &
        ({ 'aria-label': string } | { 'aria-labelledby': string })
      triggerAriaLabel?: string
    }
  | { triggerProps: AttachmentTriggerProps; triggerAriaLabel: string }
  | {
      triggerProps: AttachmentTriggerProps
      title: Exclude<ReactNode, null | undefined | boolean>
      triggerAriaLabel?: string
    }
export type AttachmentProps = AttachmentBaseProps &
  AttachmentContentProps &
  AttachmentActionProps

export function Attachment({
  children,
  media,
  title,
  description,
  actions,
  triggerProps,
  triggerAriaLabel,
  triggerRef,
  className,
  data,
  dataMedia,
  dataContent,
  dataTitle,
  dataDescription,
  dataActions,
  dataTrigger,
  ...props
}: AttachmentProps) {
  const titleId = useId()
  const hasTitle = title != null && typeof title !== 'boolean'
  const labelledBy =
    triggerProps?.['aria-labelledby'] ??
    (!triggerProps?.['aria-label'] && !triggerAriaLabel && hasTitle
      ? titleId
      : undefined)
  return (
    <Primitive {...props} {...testAttrs(data)} className={className?.root}>
      {children !== undefined ? (
        children
      ) : (
        <>
          {media != null && (
            <AttachmentMedia
              {...testAttrs(dataMedia)}
              className={className?.media}
            >
              {media}
            </AttachmentMedia>
          )}
          {(hasTitle || description != null) && (
            <AttachmentContent
              {...testAttrs(dataContent)}
              className={className?.content}
            >
              {hasTitle && (
                <AttachmentTitle
                  id={titleId}
                  {...testAttrs(dataTitle)}
                  className={className?.title}
                >
                  {title}
                </AttachmentTitle>
              )}
              {description != null && (
                <AttachmentDescription
                  {...testAttrs(dataDescription)}
                  className={className?.description}
                >
                  {description}
                </AttachmentDescription>
              )}
            </AttachmentContent>
          )}
          {actions != null && (
            <AttachmentActions
              {...testAttrs(dataActions)}
              className={className?.actions}
            >
              {actions}
            </AttachmentActions>
          )}
        </>
      )}
      {triggerProps && (
        <AttachmentTrigger
          {...triggerProps}
          {...testAttrs(dataTrigger)}
          ref={triggerRef}
          aria-labelledby={labelledBy}
          aria-label={triggerProps['aria-label'] ?? triggerAriaLabel}
          className={className?.trigger}
        />
      )}
    </Primitive>
  )
}
export default Attachment
