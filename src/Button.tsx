import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps {
  className?: string
  children: React.ReactNode
  disabled?: boolean
  active?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  [x: string]: any
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
    'border rounded px-3 py-1 shadow',
    active && 'bg-orange-100',
    disabled ? 'bg-gray-100 text-gray-300' : 'hover:bg-orange-100',
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

export default Button
