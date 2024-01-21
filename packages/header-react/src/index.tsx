import { createRoot } from 'react-dom/client'
import { H1, H2, H3, H4 } from './Header'

const container = document.getElementById('app')
const root = createRoot(container!)
root.render(
  <div>
    <H1>Header 1</H1>
    <H2>Header 2</H2>
    <H3>Header 3</H3>
    <H4>Header 4</H4>
  </div>
)
