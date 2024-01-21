import register from 'preact-custom-element'
import { H1 as BFH1, H2 as BFH2, H3 as BFH3, H4 as BFH4 } from './Header'

register(BFH1, 'x-h1', ['text'], { shadow: false })
register(BFH2, 'x-h2', ['text'], { shadow: false })
register(BFH3, 'x-h3', ['text'], { shadow: false })
register(BFH4, 'x-h4', ['text'], { shadow: false })
