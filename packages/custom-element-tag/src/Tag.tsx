// @ts-ignore
import htm from 'htm'

import { h } from 'preact'

import cssText from 'bundle-text:./styles.css'

const html = htm.bind(h)

export interface TagProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    root?: string
  }
  label: string
}

/**
 * This function returns a pre-styled tag component
 *
 * @param id - The id of the tag.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label of the tag.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tag component
 */
export function Tag({ id, data, className, label = '' }: TagProps) {
  return html`
    <Fragment>
      <div
        id="${id}"
        data-cy="${data?.cy}"
        data-test="${data?.test}"
        className="px-2 py-1 text-sm rounded bg-slate-100 text-slate-700"
      >
        ${label}
      </div>
      <style>
        ${cssText}
      </style>
    </Fragment>
  `
}

export default Tag
