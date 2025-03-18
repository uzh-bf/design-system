import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button as ShadcnButton } from './ui/button'

export interface ButtonProps {
  id?: string
  children?: React.ReactNode
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  primary?: boolean
  destructive?: boolean
  active?: boolean
  fluid?: boolean
  basic?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: {
    root?: string
    active?: string
  }
  data?: {
    cy?: string
    test?: string
  }
  [x: string]: unknown
}

/**
 * This function returns a pre-styled Button component based on the custom theme.
 *
 * @param id - The id of the button.
 * @param children - The content of the button.
 * @param onClick - Function that is applied when the button is clicked.
 * @param disabled - Indicate whether the button is disabled or not. Conditional styling is applied, if this is true.
 * @param destructive - Indicate whether the button is destructive or not. Conditional styling is applied, if this is true.
 * @param primary - Indicate whether the button is primary or not. Conditional styling is applied, if this is true.
 * @param active - Indicate whether the button is active or not. Conditional styling is applied, if this is true.
 * @param fluid - Indicate whether the button should be fluid or not. Conditional styling is applied, if this is true.
 * @param basic - This attribute allows to directly remove significant pre-styling and only applies basic styles and functionally required attributes.
 * @param loading - Indicate whether the button is loading or not. Conditional styling / loading symbol is applied, if this is true.
 * @param type - The html type of the button.
 * @param className - The optional className object allows you to override the default styling.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @returns Button component
 */
export function Button({
  id,
  children,
  onClick,
  disabled = false,
  primary = false,
  destructive = false,
  active = false,
  fluid = false,
  basic = false,
  loading = false,
  type = 'button',
  className,
  data,
  ...props
}: ButtonProps) {
  return (
    <ShadcnButton
      id={id}
      variant={
        basic
          ? 'ghost'
          : primary
            ? 'default'
            : destructive
              ? 'destructive'
              : 'outline'
      }
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={twMerge(
        'h-max whitespace-normal px-3 py-1.5 text-base',
        // slightly increased margins are required for variants without border to ensure same size
        primary || destructive ? 'px-[0.8125rem] py-[0.4375rem]' : '',
        primary
          ? 'bg-primary-100 text-primary-foreground hover:bg-primary-80'
          : '',
        destructive ? 'bg-red-600 text-white hover:bg-red-700' : '',
        fluid ? 'w-full justify-center' : '',
        className?.root,
        active && 'border-primary-100 bg-primary-20 hover:bg-primary-20',
        active ? className?.active : ''
      )}
      data-cy={data?.cy}
      data-test={data?.test}
      {...props}
    >
      {loading && (
        <svg
          className={`-ml-1 mr-2 h-5 w-5 animate-spin text-primary`}
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
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </ShadcnButton>
  )
}

Button.Icon = function ButtonIcon({
  icon,
  withoutLabel,
  loading, // optional boolean to hide icon when loading is set -> only show loading spinner
  className,
}: {
  icon: IconDefinition
  withoutLabel?: boolean
  loading?: boolean
  className?: {
    root?: string
  }
}) {
  if (loading) {
    return null
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      className={twMerge('h-4 w-4', !withoutLabel && 'mr-2', className?.root)}
    />
  )
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

Button.Label = function ButtonLabel({
  className,
  children,
}: {
  className?: {
    root?: string
  }
  children: React.ReactNode
}) {
  return <div className={className?.root}>{children}</div>
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
  return (
    <div
      className={twMerge(
        'flex w-max flex-row justify-between rounded border border-solid border-primary-100',
        className?.root
      )}
    >
      {children.map((child, index) => {
        return (
          <Button
            key={index}
            className={{
              root: twMerge(
                'rounded-none border-0 px-2 first:rounded-l-sm last:rounded-r-sm',
                state === index
                  ? 'bg-primary-100 text-primary-foreground hover:bg-primary-80 hover:text-primary-foreground'
                  : 'bg-white hover:bg-primary-20',
                className?.children
              ),
            }}
            onClick={() => setState(index)}
          >
            {child}
          </Button>
        )
      })}
    </div>
  )
}

export default Button
