import React from 'react'
import { twMerge } from 'tailwind-merge'

interface HeaderProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    root?: string
  }
  children: React.ReactNode
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h1 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H1 component
 */
export function H1({ id, data, className, children }: HeaderProps) {
  return (
    <h1
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge(
        'mb-[0.2em] font-sans text-2xl font-bold',
        className?.root
      )}
    >
      {children}
    </h1>
  )
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h2 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H2 component
 */
export function H2({ id, data, className, children }: HeaderProps) {
  return (
    <h2
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge(
        'mb-[0.2em] font-sans text-xl font-bold',
        className?.root
      )}
    >
      {children}
    </h2>
  )
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h3 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H3 component
 */
export function H3({ id, data, className, children }: HeaderProps) {
  return (
    <h3
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge(
        'mb-[0.2em] font-sans text-lg font-bold',
        className?.root
      )}
    >
      {children}
    </h3>
  )
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h4 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H4 component
 */
export function H4({ id, data, className, children }: HeaderProps) {
  return (
    <h4
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge(
        'text-md mb-[0.2em] font-sans font-bold',
        className?.root
      )}
    >
      {children}
    </h4>
  )
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the chosen h* tag.
 */
const Header = {
  H1,
  H2,
  H3,
  H4,
}

export default Header
