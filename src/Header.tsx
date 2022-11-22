import React from 'react'
import { twMerge } from 'tailwind-merge'

interface HeaderProps {
  className?: string
  children: React.ReactNode
}

export function H1({ className, children }: HeaderProps) {
  return (
    <h1
      className={twMerge('mb-[0.2em] font-sans text-2xl font-bold', className)}
    >
      {children}
    </h1>
  )
}

export function H2({ className, children }: HeaderProps) {
  return (
    <h2
      className={twMerge('mb-[0.2em] font-sans text-xl font-bold', className)}
    >
      {children}
    </h2>
  )
}

export function H3({ className, children }: HeaderProps) {
  return (
    <h3
      className={twMerge('mb-[0.2em] font-sans text-lg font-bold', className)}
    >
      {children}
    </h3>
  )
}

export function H4({ className, children }: HeaderProps) {
  return (
    <h4
      className={twMerge('text-md mb-[0.2em] font-sans font-bold', className)}
    >
      {children}
    </h4>
  )
}

const Header = {
  H1,
  H2,
  H3,
  H4,
}

export default Header
