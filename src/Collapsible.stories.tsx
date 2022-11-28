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
      children="Dynamic content"
    />
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
      children={
        <div>
          This node element us usually used to display{' '}
          <span className="font-bold">long content</span> that does not fit into
          the general layout otherwise
        </div>
      }
      customTrigger={<div>Custom Trigger</div>}
    />
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
      children="Dynamic content"
    />
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
      children="Dynamic content"
      className={{
        root: `border-1 ${theme.primaryBg}`,
        trigger: 'text-red-500',
        content: 'text-blue-500',
        staticContent: 'text-green-500',
        closedContent: 'text-yellow-500',
      }}
    />
  )
}
