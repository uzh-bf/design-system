import register from 'preact-custom-element'
import { Tag as BFTag } from './Tag'

register(BFTag, 'x-tag', ['label'], { shadow: false })
