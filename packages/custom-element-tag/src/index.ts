// @ts-ignore
import register from 'preact-custom-element'

import cssText from 'bundle-text:./Tag.css'

import Tag from './Tag'

register(Tag, 'x-tag', ['label'], {
  shadow: true,
})

var sheet = new CSSStyleSheet()
sheet.replaceSync(cssText)

host.shadowRoot.adoptedStyleSheets = [sheet]
