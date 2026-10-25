'use client'

import * as React from 'react'
import { loadHighlighter } from '../lib/highlighter'

export function useHighlightedCode(
  value: string,
  language: string
): React.ReactNode[] {
  const code = value.endsWith('\n') ? value.slice(0, -1) : value
  const [loaded, setLoaded] = React.useState<{
    language: string
    highlighter: Awaited<ReturnType<typeof loadHighlighter>>
  } | null>(null)
  const highlighter = loaded?.language === language ? loaded.highlighter : null
  React.useEffect(() => {
    let cancelled = false
    loadHighlighter(language)
      .then((next) => {
        if (!cancelled) setLoaded({ language, highlighter: next })
      })
      .catch(() => {
        if (!cancelled) setLoaded({ language, highlighter: null })
      })
    return () => {
      cancelled = true
    }
  }, [language])
  const cache = React.useRef<{
    highlighter: typeof highlighter
    text: string
    lines: React.ReactNode[]
    state?: Parameters<NonNullable<typeof highlighter>['highlight']>[1]
  }>({ highlighter: null, text: '', lines: [] })
  return React.useMemo(() => {
    if (!highlighter) return code.split('\n')
    let next = cache.current
    if (next.highlighter !== highlighter || !code.startsWith(next.text))
      next = { highlighter, text: '', lines: [] }
    try {
      const end = code.lastIndexOf('\n') + 1
      if (end > next.text.length) {
        const result = highlighter.highlight(
          code.slice(next.text.length, end - 1),
          next.state
        )
        next = {
          highlighter,
          text: code.slice(0, end),
          lines: [...next.lines, ...result.lines],
          state: result.state,
        }
      }
      cache.current = next
      return [
        ...next.lines,
        highlighter.highlight(code.slice(end), next.state).lines[0],
      ]
    } catch {
      cache.current = { highlighter: null, text: '', lines: [] }
      return code.split('\n')
    }
  }, [code, highlighter])
}
