import { createRoot } from 'react-dom/client'

import Tag from './Tag'

const container = document.getElementById('app')
const root = createRoot(container!)
root.render(<Tag label="hello world" />)
