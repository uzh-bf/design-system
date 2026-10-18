/* global console, process, TextDecoder */

import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const FAMILIES = {
  'uzh-red': 'uzh-orange',
  'uzh-yellow': 'uzh-gold',
  'uzh-lightgreen': 'uzh-apple',
  'uzh-turqoise': 'uzh-cyan',
  'uzh-grey': 'df-grey',
  'uzh-darkgreen': 'df-darkgreen',
}

const COLOR_UTILITY =
  /^(!?)(-?)((?:bg|text|border(?:-[xysetblr])?|ring(?:-offset)?|fill|stroke|from|via|to|decoration|outline|divide(?:-[xy])?|shadow|caret|accent|placeholder)-)(uzh-(?:red|yellow|lightgreen|turqoise|grey|darkgreen))(-(?:100|80|60|40|20))?(\/(?:[\d.]+|\[[^\]]+\]))?(!?)$/

function renameToken(token) {
  let depth = 0
  let start = 0
  for (let index = 0; index < token.length; index++) {
    if (token[index] === '[') depth++
    if (token[index] === ']') depth--
    if (token[index] === ':' && depth === 0) start = index + 1
  }
  if (depth !== 0) return token
  const utility = token.slice(start)
  const match = COLOR_UTILITY.exec(utility)
  if (!match) return token
  const [
    ,
    important,
    negative,
    prefix,
    family,
    rung = '',
    opacity = '',
    trailing = '',
  ] = match
  return (
    token.slice(0, start) +
    important +
    negative +
    prefix +
    FAMILIES[family] +
    rung +
    opacity +
    trailing
  )
}

/** Rename complete static utility tokens; leave interpolated strings untouched. */
export function renamePaletteUtilities(source) {
  const unsupported = []
  let changes = 0
  const renameList = (value) =>
    value.replace(/\S+/g, (token) => {
      const renamed = renameToken(token)
      if (renamed !== token) changes++
      return renamed
    })
  let code = ''
  let index = 0
  while (index < source.length) {
    if (source.startsWith('<!--', index)) {
      const end = source.indexOf('-->', index + 4)
      const next = end < 0 ? source.length : end + 3
      code += source.slice(index, next)
      index = next
      continue
    }
    if (source.startsWith('//', index) || source.startsWith('/*', index)) {
      const line = source.startsWith('//', index)
      const end = source.indexOf(line ? '\n' : '*/', index + 2)
      const next = end < 0 ? source.length : end + (line ? 0 : 2)
      code += source.slice(index, next)
      index = next
      continue
    }
    if (/^@apply\s/.test(source.slice(index))) {
      const end = source.indexOf(';', index)
      if (end >= 0) {
        code += '@apply' + renameList(source.slice(index + 6, end)) + ';'
        index = end + 1
        continue
      }
    }
    const quote = source[index]
    if (!['"', "'", '`'].includes(quote)) {
      code += source[index++]
      continue
    }
    const before = source.slice(0, index)
    const attribute = /\b([\w:-]+)\s*=\s*\{?\s*$/.exec(before)?.[1]
    const declaration = /\b(?:const|let|var)\s+[\w$]+\s*=\s*$/.test(before)
    const expression = /(?:^\s*|[([,:?=]\s*|=>\s*|\breturn\s+)$/.test(before)
    const tagStart = before.lastIndexOf('<')
    const tagEnd = before.lastIndexOf('>')
    const afterTag = before.slice(tagEnd + 1)
    const jsxText =
      tagStart >= 0 &&
      /^<\/?[A-Za-z]/.test(before.slice(tagStart)) &&
      tagEnd > tagStart &&
      afterTag.split('{').length === afterTag.split('}').length
    if (jsxText || (!attribute && !declaration && !expression)) {
      code += source[index++]
      continue
    }
    let end = index + 1
    while (end < source.length) {
      if (source[end] === '\\') {
        end += 2
        continue
      }
      if (source[end] === quote) break
      end++
    }
    if (end >= source.length) {
      unsupported.push({ offset: index, reason: 'unterminated quote' })
      code += source.slice(index)
      break
    }
    const value = source.slice(index + 1, end)
    if (quote === "'" && /[<\r\n]/.test(value)) {
      unsupported.push({ offset: index, reason: 'ambiguous quote context' })
      code += source[index++]
      continue
    }
    const ordinaryString =
      !attribute || declaration || ['class', 'className'].includes(attribute)
    const dynamic =
      value.includes('${') ||
      value.includes('\\') ||
      /(?:bg|text|border)-\[/.test(value)
    if (
      ordinaryString &&
      dynamic &&
      /uzh-(?:red|yellow|lightgreen|turqoise|grey|darkgreen)/.test(value)
    ) {
      unsupported.push({
        offset: index,
        reason: 'dynamic or escaped expression',
      })
    }
    if (
      !ordinaryString &&
      value.split(/\s+/).some((token) => renameToken(token) !== token)
    ) {
      unsupported.push({
        offset: index,
        reason: 'non-class attribute or ambiguous assignment',
      })
    }
    code +=
      quote + (ordinaryString && !dynamic ? renameList(value) : value) + quote
    index = end + 1
  }
  return { code, changes, unsupported }
}

function main(args) {
  if (args.includes('--help')) {
    console.log(
      'Usage: node rename-palette-utilities.mjs [--write] FILE...\nDefaults to a dry run. Only named UTF-8 files are read. Dynamic/escaped expressions are reported and left unchanged.'
    )
    return
  }
  const write = args.includes('--write')
  const files = args.filter((arg) => arg !== '--write')
  if (!files.length || files.some((file) => file.startsWith('-')))
    throw new Error('Provide named files; use --help for usage')
  for (const file of files) {
    const source = new TextDecoder('utf-8', { fatal: true }).decode(
      readFileSync(file)
    )
    if (source.includes('\0'))
      throw new Error(`Refusing non-text input: ${file}`)
    const result = renamePaletteUtilities(source)
    if (write && result.changes) writeFileSync(file, result.code)
    console.log(
      `${file}: ${result.changes} ${write ? 'changed' : 'would change'}, ${result.unsupported.length} unsupported expression(s)`
    )
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    main(process.argv.slice(2))
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
