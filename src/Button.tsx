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
  loading?: boolean

  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void

  [x: string]: any
}

const defaultProps = {
  active: false,
  className: undefined,
  disabled: false,
  fluid: false,
  type: 'button',
  loading: false,
  onClick: () => null,
}

export function Button({
  children,
  className,
  onClick,
  disabled,
  active,
  fluid,
  loading,
  ...props
}: ButtonProps) {
  const theme = useContext(ThemeContext)

  const computedClassName = twMerge(
    'border rounded px-[0.75em] py-[0.25em] shadow inline-flex flex-row bg-white items-center font-thesans font-thesans-plain gap-2',
    active && `${theme.primaryBg} ${theme.primaryFill} ${theme.primaryBorder}`,
    disabled || loading
      ? 'bg-uzh-grey-20 text-uzh-grey-80 cursor-default fill-uzh-grey-80'
      : `${theme.primaryBgHover} ${theme.primaryBorderHover} ${theme.primaryTextHover} ${theme.primaryFillHover}`,
    fluid && 'w-full justify-center',
    className
  )

  return (
    <button
      {...props}
      className={computedClassName}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <svg
          className={`w-5 h-5 -ml-1 ${theme.primaryText} animate-spin`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
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
