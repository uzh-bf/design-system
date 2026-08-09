'use client'

import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import { FieldErrorIndicator } from './FieldErrorIndicator'
import type { RhfFieldClassName, RhfFieldData } from './rhf'

export interface RhfFieldShellProps {
  inputId: string
  label?: string
  labelType?: 'small' | 'large'
  tooltip?: string | React.ReactNode
  required?: boolean
  description?: React.ReactNode
  descriptionId?: string
  error?: string
  errorId: string
  showError: boolean
  className?: RhfFieldClassName
  data?: RhfFieldData
  children: React.ReactNode
}

export function RhfFieldShell({
  inputId,
  label,
  labelType = 'small',
  tooltip,
  required = false,
  description,
  descriptionId,
  error,
  errorId,
  showError,
  className,
  data,
  children,
}: RhfFieldShellProps) {
  return (
    <div className={twMerge('flex w-full flex-col', className?.root)}>
      {label && (
        <FormLabel
          id={`${inputId}-label`}
          required={required}
          label={label}
          labelType={labelType}
          tooltip={tooltip}
          className={{
            label: className?.label,
            tooltip: className?.tooltip,
          }}
        />
      )}
      <div
        className={twMerge(
          'flex w-full flex-row items-center gap-2',
          className?.field
        )}
      >
        {children}
        {showError && error && (
          <FieldErrorIndicator error={error} errorId={errorId} />
        )}
      </div>
      {typeof description !== 'undefined' && (
        <div
          id={descriptionId}
          data-cy={data?.cy ? `${data.cy}-description` : undefined}
          data-test={data?.test ? `${data.test}-description` : undefined}
          className={twMerge(
            'text-muted-foreground mt-1 text-sm',
            className?.description
          )}
        >
          {description}
        </div>
      )}
    </div>
  )
}
