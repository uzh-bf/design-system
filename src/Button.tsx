import React, { Dispatch, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'
import Tooltip from './Tooltip'

export interface ButtonProps {
  id?: string
  active?: boolean
  children?: React.ReactNode
  disabled?: boolean
  fluid?: boolean
  basic?: boolean
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  tooltip?: string
  tooltipDelay?: number
  className?: {
    root?: string
    active?: string
    disabled?: string
    tooltip?: string
  }
  data?: {
    cy?: string
    test?: string
  }
  [x: string]: any
}

/**
 * This function returns a pre-styled Button component based on the custom theme.
 *
 * @param id - The id of the button.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - The content of the button.
 * @param active - Indicate whether the button is active or not. Conditional styling is applied, if this is true.
 * @param disabled - Indicate whether the button is disabled or not. Conditional styling is applied, if this is true.
 * @param fluid - Indicate whether the button should be fluid or not. Conditional styling is applied, if this is true.
 * @param basic - This attribute allows to directly remove significant pre-styling and only applies basic styles and functionally required attributes.
 * @param type - The html type of the button.
 * @param loading - Indicate whether the button is loading or not. Conditional styling / loading symbol is applied, if this is true.
 * @param onClick - Function that is applied when the button is clicked.
 * @param tooltip - The tooltip text that is displayed when hovering over the button.
 * @param tooltipDelay - The delay in ms before the tooltip is shown.
 * @param className - The optional className object allows you to override the default styling. Active and disabled styles will not be applied to basic buttons
 * @returns Button component
 */
export function Button({
  id,
  children,
  onClick,
  disabled = false,
  active = false,
  fluid = false,
  basic = false,
  loading = false,
  type = 'button',
  tooltip,
  tooltipDelay = 1000,
  className,
  data,
  ...props
}: ButtonProps) {
  const theme = useContext(ThemeContext)

  const computedClassName = twMerge(
    !basic && 'border rounded px-[0.75em] py-[0.25em] shadow bg-white ',
    'inline-flex flex-row items-center font-sans gap-2',
    fluid && 'w-full justify-center',
    className?.root,
    disabled || loading
      ? !basic
        ? twMerge(
            'bg-uzh-grey-20 text-uzh-grey-80 cursor-default fill-uzh-grey-80',
            className?.disabled
          )
        : 'cursor-default'
      : !basic &&
          `${theme.primaryBgHover} ${theme.primaryBorderHover} ${theme.primaryTextHover} ${theme.primaryFillHover}`,
    !basic &&
      active &&
      twMerge(
        `${theme.primaryBg} ${theme.primaryFill} ${theme.primaryBorder}`,
        className?.active
      )
  )

  const buttonComponent = (
    <button
      {...props}
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={computedClassName}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
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

  if (tooltip) {
    return (
      <Tooltip
        tooltip={tooltip}
        delay={tooltipDelay}
        className={{ tooltip: className?.tooltip }}
      >
        {buttonComponent}
      </Tooltip>
    )
  }

  return buttonComponent
}

Button.Icon = function ButtonIcon({
  className,
  children,
}: {
  className?: {
    root?: string
  }
  children: React.ReactNode
}) {
  return <div className={twMerge('w-3', className?.root)}>{children}</div>
}

Button.Label = function ButtonLabel({
  className,
  children,
}: {
  className?: {
    root?: string
  }
  children: React.ReactNode
}) {
  return <div className={twMerge('', className?.root)}>{children}</div>
}

export interface ButtonIconGroupProps {
  state: number | undefined
  setState: Dispatch<React.SetStateAction<number | undefined>>
  className?: {
    root?: string
    children?: string
  }
  children: React.ReactNode[]
}

Button.IconGroup = function ButtonIconGroup({
  state,
  setState,
  className,
  children,
}: ButtonIconGroupProps) {
  const theme = useContext(ThemeContext)

  return (
    <div
      className={twMerge(
        'flex flex-row justify-between border border-solid w-max rounded',
        theme.primaryBorder,
        className?.root
      )}
    >
      {children.map((child, index) => {
        return (
          <Button
            key={index}
            className={{
              root: twMerge(
                'p-1.5 first:rounded-l-sm last:rounded-r-sm',
                theme.primaryBgHover,
                state === index
                  ? `${theme.primaryBgDark} text-white hover:bg-unset`
                  : 'bg-white',
                className?.children
              ),
            }}
            onClick={() => setState(index)}
            basic
          >
            {child}
          </Button>
        )
      })}
    </div>
  )
}

export default Button
