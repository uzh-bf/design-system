import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface ButtonProps {
  active?: boolean
  className?: string
  children: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'

  onClick?: () => void

  [x: string]: any
}

const defaultProps = {
  active: false,
  className: undefined,
  disabled: false,
  type: 'button',

  onClick: () => null,
}

export function Button({
  children,
  className,
  onClick,
  disabled,
  active,
  ...props
}: ButtonProps) {
  const theme = useContext(ThemeContext)

  const computedClassName = twMerge(
    'border rounded px-[0.75em] py-[0.25em] shadow inline-flex bg-white items-center font-thesans',
    active && theme.primaryBg,
    disabled
      ? 'bg-uzh-grey-20 text-uzh-grey-80 cursor-default'
      : `${theme.primaryBgHover} ${theme.primaryBorderHover}`,
    className
  )

  return (
    <button
      {...props}
      className={computedClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.defaultProps = defaultProps

export default Button
