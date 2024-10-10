import register from 'preact-custom-element'

import Tag from './Tag'

register(Tag, 'x-tag', ['label'], {
  shadow: true,
})
