// @ts-ignore
import register from 'preact-custom-element'
import cssText from 'bundle-text:./index.css'

import Tag from './Tag'

register(Tag, 'x-tag', ['label'], {
  shadow: false,
})

let style = document.createElement('style')
style.textContent = cssText
document.appendChild(style)
