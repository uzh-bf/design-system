import React, { useMemo } from 'react'
import katex from 'rehype-katex'
import rehype2react from 'rehype-react'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import math from 'remark-math'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import { unified } from 'unified'

export interface MarkdownProps {
  className?: string
  content?: any
  description?: string
}

const defaultProps = {
  className: undefined,
  content: undefined,
  description: 'Description missing',
}

export function Markdown({
  className,
  content,
  description,
  ...props
}: MarkdownProps) {
  const parsedContent = useMemo(() => {
    if (content?.length <= 2) {
      return content
    }
    try {
      return content
        ? unified()
            .use(markdown)
            .use(math, { singleDollarTextMath: false })
            .use(remark2rehype, { allowDangerousHtml: false })
            .use(rehypeSanitize, {
              ...defaultSchema,
              attributes: {
                ...defaultSchema.attributes,
                div: [
                  ...(defaultSchema?.attributes?.div || []),
                  ['className', 'math', 'math-display'],
                ],
                span: [
                  ...(defaultSchema?.attributes?.span || []),
                  ['className', 'math', 'math-inline'],
                ],
              },
            })
            .use(katex)
            .use(rehype2react, {
              createElement: React.createElement,
            })
            .processSync(content).result
        : description
    } catch (e) {
      return content
    }
  }, [content, description])

  return (
    <div className={className} {...props}>
      <link
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
        integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ"
        rel="stylesheet"
      />
      {parsedContent}
    </div>
  )
}

Markdown.defaultProps = defaultProps

export default Markdown
