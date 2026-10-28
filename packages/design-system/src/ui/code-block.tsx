'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon, CopyIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '../lib/utils'
import { Button } from './button'

const codeBlockVariants = cva(
  'group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-md border border-border bg-background text-foreground',
  {
    variants: {
      variant: {
        default: 'border-border',
        destructive:
          'border-destructive text-destructive-text dark:text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

function CodeBlock({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof codeBlockVariants> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      className={cn(codeBlockVariants({ variant }), className)}
      {...props}
    />
  )
}

function CodeBlockHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        'border-border flex min-w-0 shrink-0 items-center border-b px-3 py-2 group-data-[size=sm]/code-block:px-2 group-data-[size=sm]/code-block:py-1 *:has-[>[data-slot=code-block-title]]:min-w-0',
        className
      )}
      {...props}
    />
  )
}

function CodeBlockTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="code-block-title"
      className={cn(
        'text-foreground min-w-0 truncate [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle',
        className
      )}
      {...props}
    />
  )
}

function CodeBlockActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn('ms-auto flex shrink-0 items-center gap-1', className)}
      {...props}
    />
  )
}

export type CodeBlockCopyLabels = {
  copy?: string
  copied?: string
  error?: string
}

export type CodeBlockCopyButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'onClick'
> & {
  value: string
  type?: 'button'
  labels?: CodeBlockCopyLabels
  onCopied?: () => void
  onCopyError?: (error: Error) => void
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

type CopyState = 'idle' | 'copying' | 'copied' | 'error'

function saveSelection() {
  const activeElement = document.activeElement
  const selection = window.getSelection()
  const ranges = selection
    ? Array.from({ length: selection.rangeCount }, (_, index) =>
        selection.getRangeAt(index).cloneRange()
      )
    : []
  const input =
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement
      ? activeElement
      : undefined
  return {
    activeElement,
    ranges,
    inputSelection:
      input && input.selectionStart !== null && input.selectionEnd !== null
        ? {
            start: input.selectionStart,
            end: input.selectionEnd,
            direction: input.selectionDirection ?? 'none',
          }
        : undefined,
  }
}

function restoreSelection(saved: ReturnType<typeof saveSelection>) {
  const selection = window.getSelection()
  if (selection) {
    selection.removeAllRanges()
    for (const range of saved.ranges) {
      try {
        selection.addRange(range)
      } catch {
        // The selected node may have been removed during the copy operation.
      }
    }
  }
  if (
    saved.activeElement instanceof HTMLElement &&
    saved.activeElement.isConnected
  ) {
    saved.activeElement.focus({ preventScroll: true })
    if (
      saved.inputSelection &&
      (saved.activeElement instanceof HTMLInputElement ||
        saved.activeElement instanceof HTMLTextAreaElement)
    ) {
      try {
        saved.activeElement.setSelectionRange(
          saved.inputSelection.start,
          saved.inputSelection.end,
          saved.inputSelection.direction
        )
      } catch {
        // Unsupported input types have no selection range to restore.
      }
    }
  }
}

function copyFallback(value: string) {
  const saved = saveSelection()
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.setAttribute('aria-hidden', 'true')
  textarea.style.position = 'fixed'
  textarea.style.insetInlineStart = '-10000px'
  textarea.style.top = '0'
  document.body.append(textarea)
  try {
    textarea.focus({ preventScroll: true })
    textarea.select()
    if (!document.execCommand('copy'))
      throw new Error('Clipboard copy was rejected')
  } finally {
    textarea.remove()
    restoreSelection(saved)
  }
}

async function writeClipboard(value: string) {
  try {
    if (!navigator.clipboard?.writeText)
      throw new Error('Clipboard API is unavailable')
    await navigator.clipboard.writeText(value)
  } catch {
    copyFallback(value)
  }
}

function CodeBlockCopyButton({
  value,
  labels,
  onCopied,
  onCopyError,
  variant = 'ghost',
  size = 'icon-xs',
  className,
  children,
  onClick,
  'aria-label': ariaLabel,
  disabled,
  type = 'button',
  ...props
}: CodeBlockCopyButtonProps) {
  const [state, setState] = React.useState<CopyState>('idle')
  const [status, setStatus] = React.useState('')
  const mounted = React.useRef(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const copyLabel = labels?.copy ?? 'Copy'
  const copiedLabel = labels?.copied ?? 'Copied'
  const errorLabel = labels?.error ?? 'Unable to copy code'

  React.useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  const copy = async () => {
    if (state === 'copying') return
    if (timeout.current) clearTimeout(timeout.current)
    setState('copying')
    setStatus('')
    let error: Error | undefined
    try {
      await writeClipboard(value)
    } catch (cause) {
      error = cause instanceof Error ? cause : new Error(String(cause))
    }
    if (!mounted.current) return
    setState(error ? 'error' : 'copied')
    setStatus(error ? errorLabel : copiedLabel)
    if (!error) {
      timeout.current = setTimeout(() => {
        setState('idle')
        setStatus('')
      }, 2000)
    }
    if (error) onCopyError?.(error)
    else onCopied?.()
  }

  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-state={state}
        type={type}
        variant={variant}
        size={size}
        aria-label={ariaLabel ?? (state === 'copied' ? copiedLabel : copyLabel)}
        className={cn('text-muted-foreground', className)}
        disabled={disabled}
        aria-disabled={state === 'copying' || undefined}
        aria-busy={state === 'copying' || undefined}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) void copy()
        }}
        {...props}
      >
        {children ??
          (state === 'copied' ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          ))}
      </Button>
      <span
        data-slot="code-block-copy-status"
        role="status"
        aria-live="polite"
        className={
          state === 'error'
            ? 'text-destructive-text dark:text-destructive text-xs'
            : 'sr-only'
        }
      >
        {status}
      </span>
    </>
  )
}

function CodeBlockContent({
  className,
  children,
  style,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  ...props
}: React.ComponentProps<'pre'> & {
  wrap?: boolean
  lineNumbers?: boolean
  startLine?: number
}) {
  const code = typeof children === 'string' ? children : undefined
  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      data-numbered={lineNumbers || undefined}
      dir="ltr"
      tabIndex={0}
      style={{ counterReset: `line ${startLine - 1}`, ...style }}
      className={cn(
        'text-foreground focus-visible:ring-ring m-0 min-h-0 min-w-0 overflow-auto p-4 text-start font-mono text-sm leading-relaxed outline-none group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:py-2 group-data-[size=sm]/code-block:text-xs focus-visible:ring-2 data-wrap:break-words data-wrap:whitespace-pre-wrap data-[numbered]:[&_[data-slot=code-block-line]]:[counter-increment:line] data-[numbered]:[&_[data-slot=code-block-line]]:before:pe-4 data-[numbered]:[&_[data-slot=code-block-line]]:before:content-[counter(line)] data-[numbered]:[&_[data-slot=code-block-line]]:before:select-none',
        wrap ? 'whitespace-pre-wrap' : 'whitespace-pre',
        className
      )}
      {...props}
    >
      <code
        data-slot="code-block-code"
        className={cn(
          'grid min-h-lh content-start',
          wrap ? 'min-w-0' : 'min-w-max'
        )}
      >
        {lineNumbers && code !== undefined
          ? code
              .replace(/\n$/, '')
              .split('\n')
              .map((line, index) => (
                <CodeBlockLine key={index}>{line}</CodeBlockLine>
              ))
          : children}
      </code>
    </pre>
  )
}

const codeBlockLineVariants = cva(
  'text-foreground relative block min-h-lh min-w-0 after:absolute after:top-0 after:end-1 after:select-none',
  {
    variants: {
      variant: {
        default: '',
        added:
          'bg-success-background/50 pe-6 after:text-success-foreground after:content-["+"]',
        removed:
          'bg-destructive-background/50 pe-6 after:text-destructive-text after:content-["−"]',
        highlighted:
          'bg-warning-background/50 pe-6 after:text-warning-foreground after:content-["›"]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

function CodeBlockLine({
  className,
  variant = 'default',
  children,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof codeBlockLineVariants>) {
  const empty =
    children === undefined ||
    children === null ||
    children === '' ||
    (Array.isArray(children) && children.length === 0)

  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      className={cn(codeBlockLineVariants({ variant }), className)}
      {...props}
    >
      <span data-slot="code-block-line-content" className="min-w-0">
        {variant !== 'default' && (
          <span className="sr-only select-none">
            {variant === 'added'
              ? 'Added line: '
              : variant === 'removed'
                ? 'Removed line: '
                : 'Highlighted line: '}
          </span>
        )}
        {empty ? '\n' : children}
      </span>
    </span>
  )
}

function CodeBlockFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="code-block-footer"
      className={cn(
        'border-border text-muted-foreground flex min-w-0 shrink-0 items-center border-t px-3 py-2 group-data-[size=sm]/code-block:px-2 group-data-[size=sm]/code-block:py-1',
        className
      )}
      {...props}
    />
  )
}

export {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
}
