import React, { useContext, useState } from 'react'
import Collapsible from './Collapsible'
import { H2 } from './Header'
import { ThemeContext } from './ThemeProvider'

export const Default = () => {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible
      open={open}
      onChange={() => {
        setOpen(!open)
      }}
      staticContent="Static content"
      closedContent="Closed content"
    >
      Dynamic content
    </Collapsible>
  )
}

export const Complex = () => {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible
      open={open}
      onChange={() => {
        setOpen(!open)
      }}
      staticContent={
        <div className="flex flex-row justify-between items-center">
          <H2>This is a title</H2>
          <div className="text-sm">Meta-Info</div>
        </div>
      }
      closedContent={
        <div>
          This content is only visible when{' '}
          <span className="font-bold">closed</span>
        </div>
      }
      customTrigger={<div>Custom Trigger</div>}
    >
      <div>
        This node element us usually used to display{' '}
        <span className="font-bold">long content</span> that does not fit into
        the general layout otherwise
      </div>
    </Collapsible>
  )
}

export const Simple = () => {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible
      open={open}
      onChange={() => {
        setOpen(!open)
      }}
      staticContent="Simple version without any content when closed"
    >
      Dynamic content
    </Collapsible>
  )
}

export const Styled = () => {
  const [open, setOpen] = useState(false)
  const theme = useContext(ThemeContext)

  return (
    <Collapsible
      open={open}
      onChange={() => {
        setOpen(!open)
      }}
      staticContent="Static content"
      closedContent="Closed content"
      className={{
        root: `border-1 ${theme.primaryBg}`,
        trigger: 'text-red-500',
        content: 'text-blue-500',
        staticContent: 'text-green-500',
        closedContent: 'text-yellow-500',
      }}
    >
      Dynamic content
    </Collapsible>
  )
}
