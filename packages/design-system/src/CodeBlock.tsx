'use client'

import type { ComponentProps, ReactNode } from 'react'
import { useHighlightedCode } from './hooks/use-highlighted-code'
import { testAttrs, type TestSelectors } from './lib/testSelectors'
import {
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlock as Primitive,
} from './ui/code-block'

export interface CodeBlockClassName {
  root?: string
  header?: string
  title?: string
  actions?: string
  copy?: string
  content?: string
  line?: string
  footer?: string
}

export type CodeBlockCopyOptions = Omit<
  ComponentProps<typeof CodeBlockCopyButton>,
  'value' | 'className' | 'children' | 'asChild'
>

export interface CodeBlockLineConfig {
  variant?: ComponentProps<typeof CodeBlockLine>['variant']
  data?: TestSelectors
}

interface CodeBlockBaseProps
  extends Omit<ComponentProps<typeof Primitive>, 'className' | 'children'> {
  className?: CodeBlockClassName
  data?: TestSelectors
  dataHeader?: TestSelectors
  dataTitle?: TestSelectors
  dataActions?: TestSelectors
  dataCopy?: TestSelectors
  dataContent?: TestSelectors
  dataFooter?: TestSelectors
}

export type CodeBlockProps = CodeBlockBaseProps &
  (
    | {
        code: string
        children?: never
        titleContent?: ReactNode
        actions?: ReactNode
        footer?: ReactNode
        language?: string
        highlight?: boolean
        wrap?: boolean
        lineNumbers?: boolean
        startLine?: number
        lines?: readonly CodeBlockLineConfig[]
        contentProps?: Omit<
          ComponentProps<typeof CodeBlockContent>,
          'children' | 'className' | 'wrap' | 'lineNumbers' | 'startLine'
        >
        copy?: boolean | CodeBlockCopyOptions
      }
    | {
        children: ReactNode
        code?: never
        titleContent?: never
        actions?: never
        footer?: never
        language?: never
        highlight?: never
        wrap?: never
        lineNumbers?: never
        startLine?: never
        lines?: never
        contentProps?: never
        copy?: never
      }
  )

export function CodeBlock({
  code,
  children,
  titleContent,
  actions,
  footer,
  language = 'text',
  highlight = false,
  wrap,
  lineNumbers,
  startLine,
  lines,
  contentProps,
  copy = true,
  className,
  data,
  dataHeader,
  dataTitle,
  dataActions,
  dataCopy,
  dataContent,
  dataFooter,
  ...props
}: CodeBlockProps) {
  const renderedLines = useHighlightedCode(
    code ?? '',
    highlight ? language : ''
  )
  const configured = code !== undefined

  return (
    <Primitive {...props} {...testAttrs(data)} className={className?.root}>
      {configured ? (
        <>
          {(titleContent != null || actions != null || copy) && (
            <CodeBlockHeader
              {...testAttrs(dataHeader)}
              className={className?.header}
            >
              {titleContent != null && (
                <CodeBlockTitle
                  {...testAttrs(dataTitle)}
                  className={className?.title}
                >
                  {titleContent}
                </CodeBlockTitle>
              )}
              {(actions != null || copy) && (
                <CodeBlockActions
                  {...testAttrs(dataActions)}
                  className={className?.actions}
                >
                  {actions}
                  {copy && (
                    <CodeBlockCopyButton
                      {...(typeof copy === 'object' ? copy : {})}
                      {...testAttrs(dataCopy)}
                      className={className?.copy}
                      value={code}
                    />
                  )}
                </CodeBlockActions>
              )}
            </CodeBlockHeader>
          )}
          <CodeBlockContent
            {...contentProps}
            {...testAttrs(dataContent)}
            className={className?.content}
            wrap={wrap}
            lineNumbers={lineNumbers}
            startLine={startLine}
          >
            {renderedLines.map((line, index) => (
              <CodeBlockLine
                key={index}
                {...testAttrs(lines?.[index]?.data)}
                className={className?.line}
                variant={lines?.[index]?.variant}
              >
                {line}
              </CodeBlockLine>
            ))}
          </CodeBlockContent>
          {footer != null && (
            <CodeBlockFooter
              {...testAttrs(dataFooter)}
              className={className?.footer}
            >
              {footer}
            </CodeBlockFooter>
          )}
        </>
      ) : (
        children
      )}
    </Primitive>
  )
}

export default CodeBlock
