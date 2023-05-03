import register from 'preact-custom-element'

import Tag from './Tag'

// @ts-ignore
register(Tag, 'x-tag', ['label'], {
  shadow: true,
})
