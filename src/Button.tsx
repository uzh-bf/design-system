import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

export interface ButtonProps {
  active?: boolean
  className?: string
  children: React.ReactNode
  disabled?: boolean
  fluid?: boolean
  type?: 'button' | 'submit' | 'reset'

  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void

  [x: string]: any
}

const defaultProps = {
  active: false,
  className: undefined,
  disabled: false,
  fluid: false,
  type: 'button',

  onClick: () => null,
}

export function Button({
  children,
  className,
  onClick,
  disabled,
  active,
  fluid,
  ...props
}: ButtonProps) {
  const theme = useContext(ThemeContext)

  const computedClassName = twMerge(
    'border rounded px-[0.75em] py-[0.25em] shadow inline-flex flex-row bg-white items-center font-thesans gap-2',
    active && `${theme.primaryBg} ${theme.primaryFill} ${theme.primaryBorder}`,
    disabled
      ? 'bg-uzh-grey-20 text-uzh-grey-80 cursor-default fill-uzh-grey-80'
      : `${theme.primaryBgHover} ${theme.primaryBorderHover} ${theme.primaryTextHover} ${theme.primaryFillHover}`,
    fluid && 'w-full justify-center',
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

Button.Icon = function ButtonIcon({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={twMerge('w-3', className)}>{children}</div>
}

Button.Label = function ButtonLabel({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={twMerge('', className)}>{children}</div>
}

export default Button
