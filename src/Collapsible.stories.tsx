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

export const Buttons = () => {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible
      open={open}
      onChange={() => {
        setOpen(!open)
      }}
      staticContent="Static content"
      closedContent="Closed content"
      primary="Primary"
      secondary="Secondary"
      onPrimaryClick={() => alert('Primary button was pushed')}
      onSecondaryClick={() => alert('Secondary button was clicked')}
    >
      Dynamic content
    </Collapsible>
  )
}

export const PrimarySecondary = () => {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible
      open={open}
      onChange={() => {
        setOpen(!open)
      }}
      staticContent="Static content"
      closedContent="Closed content"
      primary={<div className="bg-red-300">Custom primary component</div>}
      secondary={<div className="bg-green-300">Custom secondary component</div>}
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
        <div className="flex flex-row items-center justify-between">
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
