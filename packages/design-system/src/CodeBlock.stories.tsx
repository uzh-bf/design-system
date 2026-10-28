import { useRef, useState } from 'react'
import { CodeBlock } from './CodeBlock'
import {
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlock as Primitive,
} from './ui/code-block'
import { Input } from './ui/input'

export const Configured = () => {
  const [code, setCode] = useState('const answer = 42\n\nanswer + 1\n')
  const [language, setLanguage] = useState('typescript')
  const [highlight, setHighlight] = useState(false)
  const [wrap, setWrap] = useState(false)
  const [cancelCopy, setCancelCopy] = useState(false)
  const [events, setEvents] = useState({ copied: 0, errors: 0, submitted: 0 })
  const [refs, setRefs] = useState('')
  const root = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLPreElement>(null)
  const copy = useRef<HTMLButtonElement>(null)

  return (
    <div
      className="bg-background text-foreground flex w-full max-w-3xl flex-col gap-4 p-4"
      data-test="code-story"
    >
      <label>
        Source
        <textarea
          data-test="code-input"
          className="bg-background min-h-24 w-full rounded-md border p-2 font-mono"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
      </label>
      <label>
        Language
        <select
          data-test="code-language"
          className="bg-background text-foreground rounded-md border p-2"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          {[
            'typescript',
            'json',
            'python',
            'ansi',
            'unknown',
            'constructor',
          ].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        <input
          data-test="highlight-toggle"
          type="checkbox"
          checked={highlight}
          onChange={(event) => setHighlight(event.target.checked)}
        />
        Highlight syntax
      </label>
      <label>
        <input
          data-test="wrap-toggle"
          type="checkbox"
          checked={wrap}
          onChange={(event) => setWrap(event.target.checked)}
        />
        Wrap lines
      </label>
      <label>
        <input
          type="checkbox"
          data-test="cancel-copy"
          checked={cancelCopy}
          onChange={(event) => setCancelCopy(event.target.checked)}
        />
        Cancel copy
      </label>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setEvents((value) => ({ ...value, submitted: value.submitted + 1 }))
        }}
      >
        <CodeBlock
          ref={root}
          title="Native tooltip"
          titleContent={<span>example.ts</span>}
          code={code}
          language={language}
          highlight={highlight}
          wrap={wrap}
          lineNumbers
          startLine={7}
          contentProps={{ ref: content, 'aria-label': 'Example source' }}
          copy={{
            ref: copy,
            onClick: (event) => {
              if (cancelCopy) event.preventDefault()
            },
            onCopied: () =>
              setEvents((value) => ({ ...value, copied: value.copied + 1 })),
            onCopyError: () =>
              setEvents((value) => ({ ...value, errors: value.errors + 1 })),
          }}
          lines={[
            { variant: 'highlighted', data: { test: 'highlighted-line' } },
          ]}
          data={{ test: 'code-root' }}
          dataHeader={{ test: 'code-header' }}
          dataTitle={{ test: 'code-title' }}
          dataActions={{ test: 'code-actions' }}
          dataCopy={{ test: 'code-copy' }}
          dataContent={{ test: 'code-content' }}
          dataFooter={{ test: 'code-footer' }}
          className={{ root: 'code-root-override', content: 'max-h-64' }}
          footer={<span>Read-only example</span>}
        />
      </form>
      <button
        type="button"
        data-test="inspect-code-refs"
        onClick={() => {
          setRefs(
            [
              root.current?.tagName,
              content.current?.tagName,
              copy.current?.tagName,
            ].join('/')
          )
          content.current?.focus()
        }}
      >
        Inspect references
      </button>
      <output data-test="code-refs">{refs}</output>
      <output data-test="code-events">{JSON.stringify(events)}</output>
    </div>
  )
}

export const Parts = () => (
  <div
    className="bg-background text-foreground flex w-full max-w-3xl flex-col gap-4 p-4"
    dir="rtl"
  >
    <Primitive variant="destructive" size="sm" data-test="raw-code">
      <CodeBlockHeader>
        <CodeBlockTitle>תוצאת בדיקה</CodeBlockTitle>
        <CodeBlockCopyButton value="-old\n+new" data-test="raw-copy" />
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers startLine={12} wrap data-test="raw-content">
        <CodeBlockLine variant="removed">previous()</CodeBlockLine>
        <CodeBlockLine variant="added">replacement()</CodeBlockLine>
        <CodeBlockLine />
        <CodeBlockLine variant="highlighted">
          {'<script>example()</script>'}
        </CodeBlockLine>
      </CodeBlockContent>
      <CodeBlockFooter>Output stays selectable.</CodeBlockFooter>
    </Primitive>
    <CodeBlock data={{ test: 'custom-code' }}>
      <CodeBlockContent>custom composition</CodeBlockContent>
    </CodeBlock>
    <Input aria-label="Following control" />
  </div>
)

export const Utilities = () => (
  <div className="bg-background text-foreground flex max-w-xl flex-col gap-6 p-4">
    <p className="shimmer shimmer-duration-1000" data-test="utility-shimmer">
      Processing example
    </p>
    <div
      className="scroll-fade-x max-w-64 overflow-auto border p-2"
      tabIndex={0}
      data-test="utility-scroll"
    >
      <div className="w-200">
        {Array.from({ length: 15 }, (_, index) => `item-${index}`).join(' · ')}
      </div>
    </div>
  </div>
)
