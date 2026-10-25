import * as React from 'react'
import type { GrammarState, HighlighterCore } from 'shiki/core'

const languages = {
  bash: () => import('shiki/langs/shellscript.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  jsx: () => import('shiki/langs/jsx.mjs'),
  markdown: () => import('shiki/langs/markdown.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  sql: () => import('shiki/langs/sql.mjs'),
  tsx: () => import('shiki/langs/tsx.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  yaml: () => import('shiki/langs/yaml.mjs'),
} as const

type Language = keyof typeof languages | 'ansi'
type HighlightResult = { lines: React.ReactNode[][]; state?: GrammarState }
type HighlightFunction = (code: string, state?: GrammarState) => HighlightResult
type LoadedHighlighter = { highlight: HighlightFunction }

const aliases: Record<string, keyof typeof languages> = {
  js: 'javascript',
  md: 'markdown',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  shellscript: 'bash',
  ts: 'typescript',
  yml: 'yaml',
  zsh: 'bash',
}

let highlighterPromise: Promise<HighlighterCore> | undefined
const loadedLanguages = new Set<keyof typeof languages>()
const languagePromises = new Map<keyof typeof languages, Promise<void>>()

function getHighlighter() {
  if (!highlighterPromise) {
    const pending = Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
      createHighlighterCore({
        themes: [
          import('shiki/themes/github-light.mjs').then(
            ({ default: theme }) => ({
              ...theme,
              name: 'design-system-light',
              // The original keyword red falls below AA on tinted code lines.
              tokenColors: theme.tokenColors?.map((rule) =>
                rule.settings?.foreground?.toLowerCase() === '#d73a49'
                  ? {
                      ...rule,
                      settings: { ...rule.settings, foreground: '#b31d28' },
                    }
                  : rule
              ),
            })
          ),
          import('shiki/themes/github-dark.mjs'),
        ],
        langs: [],
        engine: createJavaScriptRegexEngine({ forgiving: true }),
      })
    )
    highlighterPromise = pending
    void pending.catch(() => {
      if (highlighterPromise === pending) highlighterPromise = undefined
    })
  }
  return highlighterPromise
}

function getLanguage(language: string): Language | null {
  const name = language.toLowerCase()
  if (name === 'ansi') return name
  if (Object.prototype.hasOwnProperty.call(languages, name)) {
    return name as keyof typeof languages
  }
  return Object.prototype.hasOwnProperty.call(aliases, name)
    ? aliases[name]
    : null
}

async function loadLanguage(
  shiki: HighlighterCore,
  language: keyof typeof languages
) {
  if (loadedLanguages.has(language)) return
  let pending = languagePromises.get(language)
  if (!pending) {
    pending = languages[language]().then(async (grammar) => {
      await shiki.loadLanguage(grammar)
      loadedLanguages.add(language)
    })
    languagePromises.set(language, pending)
  }
  try {
    await pending
  } catch (error) {
    if (languagePromises.get(language) === pending) {
      languagePromises.delete(language)
    }
    throw error
  }
}

export async function loadHighlighter(
  language: string
): Promise<LoadedHighlighter | null> {
  const lang = getLanguage(language)
  if (!lang) return null

  const shiki = await getHighlighter()
  if (lang !== 'ansi') await loadLanguage(shiki, lang)

  return {
    highlight(code: string, state?: GrammarState) {
      const tokenize = (text: string) =>
        shiki.codeToTokens(text, {
          lang,
          themes: { light: 'design-system-light', dark: 'github-dark' },
          defaultColor: false,
          ...(lang === 'ansi' ? {} : { grammarState: state }),
        }).tokens

      const tokens =
        lang === 'ansi'
          ? code.split('\n').flatMap((line) => tokenize(line))
          : tokenize(code)

      return {
        lines: tokens.map((line) =>
          line.map((token, index) => (
            <span
              key={index}
              style={token.htmlStyle as React.CSSProperties}
              className="text-(--shiki-light) dark:text-(--shiki-dark)"
            >
              {token.content}
            </span>
          ))
        ),
        state: lang === 'ansi' ? undefined : shiki.getLastGrammarState(tokens),
      }
    },
  }
}

export async function highlightCode(
  code: string,
  language: string
): Promise<React.ReactNode[][] | null> {
  const highlighter = await loadHighlighter(language)
  return highlighter ? highlighter.highlight(code).lines : null
}
