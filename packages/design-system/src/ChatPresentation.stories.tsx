import { CheckIcon, FileTextIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { Attachment } from './Attachment'
import { Bubble } from './Bubble'
import { Marker } from './Marker'
import { Message } from './Message'
import { MessageScroller, useMessageScroller } from './MessageScroller'
import { Trace } from './Trace'
import {
  AttachmentAction,
  AttachmentActions,
  AttachmentTitle,
  AttachmentTrigger,
  Attachment as RawAttachment,
} from './ui/attachment'
import { BubbleContent, Bubble as RawBubble } from './ui/bubble'
import { Button } from './ui/button'
import { MessageContent, Message as RawMessage } from './ui/message'
import {
  MessageScroller as RawScroller,
  MessageScrollerButton as RawScrollerButton,
  MessageScrollerContent as RawScrollerContent,
  MessageScrollerItem as RawScrollerItem,
  MessageScrollerProvider as RawScrollerProvider,
  MessageScrollerViewport as RawScrollerViewport,
} from './ui/message-scroller'

export const Presentation = () => {
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState({ opened: 0, removed: 0, root: 0 })
  const attachmentRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [refTarget, setRefTarget] = useState('')
  return (
    <main
      className="bg-background text-foreground mx-auto flex max-w-2xl flex-col gap-4 p-4"
      data-test="chat-presentation"
    >
      <h1 className="text-xl font-semibold">Conversation presentation</h1>
      <Message
        avatar={<span>U</span>}
        header={<span>Participant</span>}
        footer={<span>Saved locally</span>}
        align="end"
        data={{ test: 'message' }}
        dataAvatar={{ test: 'message-avatar' }}
        dataContent={{ test: 'message-content' }}
        dataHeader={{ test: 'message-header' }}
        dataFooter={{ test: 'message-footer' }}
        className={{
          root: 'gap-3',
          avatar: 'size-8',
          content: 'gap-2',
          header: 'font-medium',
          footer: 'text-sm',
        }}
      >
        <Bubble
          variant="muted"
          data={{ test: 'bubble' }}
          dataContent={{ test: 'bubble-content' }}
          dataReactions={{ test: 'bubble-reactions' }}
          reactions={
            <Button size="sm" variant="ghost">
              Helpful
            </Button>
          }
          className={{ content: 'rounded-md', reactions: 'mt-1' }}
        >
          A concise response with application-owned content.
        </Bubble>
      </Message>
      <Marker
        icon={<CheckIcon />}
        variant="separator"
        className={{
          root: 'py-2',
          icon: 'text-primary',
          content: 'font-medium',
        }}
        data={{ test: 'marker' }}
        dataIcon={{ test: 'marker-icon' }}
        dataContent={{ test: 'marker-content' }}
      >
        Checkpoint saved
      </Marker>
      <Attachment
        ref={attachmentRef}
        triggerRef={triggerRef}
        title="Example document"
        description="Synthetic attachment"
        media={<FileTextIcon />}
        actions={
          <Button
            type="button"
            size="icon-sm"
            aria-label="Remove attachment"
            data-test="remove-attachment"
            onClick={(event) => {
              event.stopPropagation()
              setEvents((v) => ({ ...v, removed: v.removed + 1 }))
            }}
          >
            ×
          </Button>
        }
        triggerProps={{
          onClick: (event) => {
            event.stopPropagation()
            setEvents((v) => ({ ...v, opened: v.opened + 1 }))
          },
        }}
        onClick={() => setEvents((v) => ({ ...v, root: v.root + 1 }))}
        className={{
          root: 'w-full',
          media: 'size-10',
          content: 'flex-1',
          title: 'font-semibold',
          description: 'text-sm',
          actions: 'p-1',
          trigger: 'focus-visible:ring-2',
        }}
        data={{ test: 'attachment' }}
        dataMedia={{ test: 'attachment-media' }}
        dataContent={{ test: 'attachment-content' }}
        dataTitle={{ test: 'attachment-title' }}
        dataDescription={{ test: 'attachment-description' }}
        dataActions={{ test: 'attachment-actions' }}
        dataTrigger={{ test: 'attachment-trigger' }}
      />
      <Attachment title="Passive file" data={{ test: 'passive-attachment' }} />
      <Attachment data={{ test: 'custom-attachment' }}>
        <span data-test="custom-attachment-content">
          Custom attachment content
        </span>
      </Attachment>
      <Button
        data-test="inspect-attachment-refs"
        onClick={() => {
          triggerRef.current?.focus()
          setRefTarget(
            `${attachmentRef.current?.tagName}/${triggerRef.current?.tagName}`
          )
        }}
      >
        Inspect attachment refs
      </Button>
      <output data-test="attachment-events">{JSON.stringify(events)}</output>
      <output data-test="attachment-refs">{refTarget}</output>
      <Trace
        data={{ test: 'trace' }}
        className={{
          root: 'gap-3',
          line: 'gap-2',
          icon: 'size-5',
          title: 'font-medium',
          description: 'text-sm',
          trigger: 'rounded-md',
          content: 'p-2',
        }}
        items={[
          {
            id: 'done',
            title: 'Prepared',
            description: 'Complete',
            icon: <CheckIcon />,
            data: { test: 'trace-static' },
          },
          {
            id: 'running',
            title: 'Review details',
            description: 'Running',
            status: 'running',
            icon: <FileTextIcon />,
            content: (
              <p data-test="trace-detail">Application-owned status detail.</p>
            ),
            open,
            onOpenChange: setOpen,
            data: { test: 'trace-toggle' },
          },
          {
            id: 'pending',
            title: 'Waiting',
            description: 'Pending',
            status: 'pending',
            data: { test: 'trace-pending' },
          },
          {
            id: 'error',
            title: 'Could not finish',
            description: 'Try again',
            status: 'error',
            data: { test: 'trace-error' },
          },
        ]}
      />
      <Trace data={{ test: 'custom-trace' }}>
        <span data-test="trace-custom">Custom status content</span>
      </Trace>
      <RawMessage data-test="primitive-message">
        <MessageContent>
          <RawBubble variant="outline">
            <BubbleContent>Composed primitive content</BubbleContent>
          </RawBubble>
        </MessageContent>
      </RawMessage>
      <RawAttachment>
        <AttachmentTitle id="raw-attachment-title">Raw file</AttachmentTitle>
        <AttachmentTrigger aria-labelledby="raw-attachment-title" />
        <AttachmentActions>
          <AttachmentAction aria-label="Raw file action">×</AttachmentAction>
        </AttachmentActions>
      </RawAttachment>
    </main>
  )
}

export const Rtl = () => (
  <div dir="rtl">
    <Presentation />
  </div>
)

export const Variants = () => (
  <main
    className="bg-background text-foreground mx-auto flex max-w-2xl flex-col gap-8 p-4"
    data-test="chat-variants"
  >
    <h1 className="text-xl font-semibold">Conversation variants</h1>
    <section className="grid gap-8" aria-label="Bubble variants">
      {(
        [
          'default',
          'secondary',
          'muted',
          'tinted',
          'outline',
          'ghost',
          'destructive',
        ] as const
      ).map((variant) => (
        <Bubble
          key={variant}
          variant={variant}
          data={{ test: `bubble-${variant}` }}
        >
          {variant}
        </Bubble>
      ))}
    </section>
    <section className="grid gap-4" aria-label="Marker variants">
      {(['default', 'separator', 'border'] as const).map((variant) => (
        <Marker
          key={variant}
          variant={variant}
          icon={<CheckIcon />}
          data={{ test: `marker-${variant}` }}
        >
          {variant === 'separator'
            ? 'Synthetic separator context with a long label that should wrap within the conversation at narrow widths.'
            : variant}
        </Marker>
      ))}
    </section>
    <section className="flex flex-wrap gap-4" aria-label="Attachment states">
      {(['idle', 'uploading', 'processing', 'error', 'done'] as const).map(
        (state) => (
          <Attachment
            key={state}
            state={state}
            title={state}
            description="Synthetic attachment state"
            media={<FileTextIcon />}
          />
        )
      )}
    </section>
    <section className="flex flex-wrap gap-4" aria-label="Attachment sizes">
      {(['default', 'sm', 'xs'] as const).map((size) => (
        <Attachment
          key={size}
          size={size}
          orientation="vertical"
          title={size}
          media={<FileTextIcon />}
        />
      ))}
    </section>
  </main>
)

const INITIAL_MESSAGES = Array.from({ length: 24 }, (_, index) => ({
  id: `message-${index}`,
  content: (
    <p
      className="bg-muted rounded-md p-3"
      data-test={`message-content-${index}`}
    >
      Synthetic message {index + 1}
    </p>
  ),
}))

function ScrollerFooter() {
  const { scrollToEnd, scrollToStart, scrollToMessage } = useMessageScroller()
  const [result, setResult] = useState(false)
  return (
    <div className="flex flex-wrap gap-2 p-2">
      <Button
        data-test="scroll-start"
        onClick={() => setResult(scrollToStart({ behavior: 'instant' }))}
      >
        Start
      </Button>
      <Button
        data-test="scroll-end"
        onClick={() => setResult(scrollToEnd({ behavior: 'instant' }))}
      >
        End
      </Button>
      <Button
        data-test="scroll-anchor"
        onClick={() =>
          setResult(
            scrollToMessage('message-10', {
              behavior: 'instant',
              align: 'start',
            })
          )
        }
      >
        Anchor
      </Button>
      <output data-test="scroll-command">{String(result)}</output>
    </div>
  )
}

export const Scrolling = () => {
  const [items, setItems] = useState(INITIAL_MESSAGES)
  const [stream, setStream] = useState(1)
  const [smooth, setSmooth] = useState(false)
  const [focused, setFocused] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [events, setEvents] = useState(0)
  return (
    <main
      className="bg-background text-foreground mx-auto flex max-w-2xl flex-col gap-3 p-4"
      data-test="chat-scrolling"
    >
      <h1 className="text-xl font-semibold">Conversation scrolling</h1>
      <div className="flex flex-wrap gap-2">
        <Button
          data-test="toggle-scroll-behavior"
          onClick={() => setSmooth((v) => !v)}
        >
          Toggle explicit smooth behavior
        </Button>
        <Button
          data-test="append-message"
          onClick={() =>
            setItems((v) => [
              ...v,
              {
                id: `new-${v.length}`,
                content: (
                  <p className="bg-muted rounded-md p-3">
                    New synthetic message
                  </p>
                ),
              },
            ])
          }
        >
          Append
        </Button>
        <Button
          data-test="prepend-message"
          onClick={() =>
            setItems((v) => [
              {
                id: `old-${v.length}`,
                content: (
                  <p className="bg-muted rounded-md p-3">
                    Earlier synthetic message
                  </p>
                ),
              },
              ...v,
            ])
          }
        >
          Prepend
        </Button>
        <Button
          data-test="grow-message"
          onClick={() => setStream((v) => v + 1)}
        >
          Grow last message
        </Button>
        <Button
          data-test="focus-viewport"
          onClick={() => {
            viewportRef.current?.focus()
            setFocused(viewportRef.current === document.activeElement)
          }}
        >
          Focus viewport
        </Button>
      </div>
      <MessageScroller
        ref={viewportRef}
        style={{ height: 420 }}
        autoScroll
        buttonProps={{ behavior: smooth ? 'smooth' : undefined }}
        items={[
          ...items,
          {
            id: 'stream',
            content: (
              <p
                className="bg-muted rounded-md p-3"
                style={{ minHeight: stream * 45 }}
              >
                Growing synthetic content
              </p>
            ),
          },
        ]}
        ariaLabel="Synthetic conversation"
        data={{ test: 'scroller' }}
        dataViewport={{ test: 'scroller-viewport' }}
        dataContent={{ test: 'scroller-content' }}
        dataButton={{ test: 'scroller-jump' }}
        dataFooter={{ test: 'scroller-footer' }}
        className={{
          root: 'border-border rounded-md border',
          viewport: 'px-3',
          content: 'gap-3',
          item: 'min-w-0',
          button: 'z-20',
          footer: 'border-t',
          spacer: 'min-h-0',
        }}
        viewportProps={{ onScroll: () => setEvents((v) => v + 1) }}
        footer={<ScrollerFooter />}
      />
      <output data-test="viewport-focused">{String(focused)}</output>
      <output data-test="viewport-events">{events}</output>
      <RawScrollerProvider defaultScrollPosition="start">
        <RawScroller style={{ height: 120 }}>
          <RawScrollerViewport aria-label="Primitive conversation">
            <RawScrollerContent>
              <RawScrollerItem messageId="raw">
                <span>Raw composed message</span>
              </RawScrollerItem>
            </RawScrollerContent>
          </RawScrollerViewport>
          <RawScrollerButton />
        </RawScroller>
      </RawScrollerProvider>
    </main>
  )
}
