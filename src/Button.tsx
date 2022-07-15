import React from 'react'
import { twMerge } from 'tailwind-merge'

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
  const computedClassName = twMerge(
    'border rounded px-[0.75em] py-[0.25em] shadow inline-flex bg-white items-center font-thesans',
    active && 'bg-uzh-red-20',
    disabled
      ? 'bg-gray-100 text-gray-300 cursor-default'
      : 'hover:bg-uzh-red-20 hover:border-uzh-red-40',
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
