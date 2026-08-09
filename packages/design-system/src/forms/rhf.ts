'use client'

import type { Ref } from 'react'
import { useEffect, useId, useState } from 'react'
import type {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RefCallBack,
  UseControllerProps,
} from 'react-hook-form'
import { useController, useFormContext } from 'react-hook-form'

export interface RhfFieldClassName {
  root?: string
  field?: string
  label?: string
  description?: string
  error?: string
  tooltip?: string
}

export interface RhfFieldData {
  cy?: string
  test?: string
}

export type FieldPathByExactValue<TFieldValues extends FieldValues, TValue> = {
  [TName in FieldPath<TFieldValues>]: [
    FieldPathValue<TFieldValues, TName>,
  ] extends [TValue]
    ? [TValue] extends [FieldPathValue<TFieldValues, TName>]
      ? TName
      : never
    : never
}[FieldPath<TFieldValues>]

export type RhfFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  UseControllerProps<TFieldValues, TName, TTransformedValues>,
  'control'
> & {
  control?: Control<TFieldValues, TContext, TTransformedValues>
  id?: string
  label?: string
  labelType?: 'small' | 'large'
  tooltip?: string | React.ReactNode
  description?: React.ReactNode
  required?: boolean
  className?: RhfFieldClassName
  data?: RhfFieldData
}

export interface RhfFieldState<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  field: ReturnType<typeof useController<TFieldValues, TName>>['field']
  fieldState: ReturnType<
    typeof useController<TFieldValues, TName>
  >['fieldState']
  formState: ReturnType<typeof useController<TFieldValues, TName>>['formState']
  inputId: string
  descriptionId?: string
  errorId: string
  describedBy?: string
  error?: string
  showError: boolean
  resetVersion: number
}

export function mergeRefs<T>(
  ...refs: Array<Ref<T> | RefCallBack | undefined>
): RefCallBack {
  return (value) => {
    for (const ref of refs) {
      if (!ref) continue
      if (typeof ref === 'function') {
        ref(value)
      } else {
        ref.current = value
      }
    }
  }
}

const rhfPropNames = [
  'name',
  'control',
  'rules',
  'defaultValue',
  'shouldUnregister',
  'id',
  'label',
  'labelType',
  'tooltip',
  'description',
  'required',
  'disabled',
  'className',
  'data',
  'ref',
] as const

export function omitRhfProps<T extends object>(props: T): Partial<T> {
  const primitiveProps = { ...props } as T & Record<string, unknown>
  for (const propName of rhfPropNames) {
    delete primitiveProps[propName]
  }
  return primitiveProps
}

export function useRhfField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>
): RhfFieldState<TFieldValues, TName> {
  const formContext = useFormContext<
    TFieldValues,
    TContext,
    TTransformedValues
  >()
  const control = props.control ?? formContext?.control

  if (!control) {
    throw new Error(
      `RHF field "${String(props.name)}" requires a control prop or FormProvider context.`
    )
  }

  const [resetVersion, setResetVersion] = useState(0)

  useEffect(() => {
    const subscription = control._subjects.state.subscribe({
      next: (event) => {
        // RHF emits a values event without a field name for reset(). This is
        // the only reliable signal for a reset that restores the same value.
        if (
          !event.name &&
          Object.prototype.hasOwnProperty.call(event, 'values')
        ) {
          setResetVersion((version) => version + 1)
        }
      },
    })

    return () => subscription.unsubscribe()
  }, [control])

  const controller = useController({
    name: props.name,
    control,
    rules: props.rules,
    defaultValue: props.defaultValue as FieldPathValue<TFieldValues, TName>,
    shouldUnregister: props.shouldUnregister,
    disabled: props.disabled,
  })
  const generatedId = useId()
  const inputId = props.id ?? generatedId
  const error = controller.fieldState.error?.message
  const errorMessage = error ? String(error) : undefined
  const hasError = Boolean(controller.fieldState.error)
  const showError = Boolean(
    hasError &&
      (controller.fieldState.isTouched || controller.formState.isSubmitted)
  )
  const descriptionId =
    typeof props.description === 'undefined'
      ? undefined
      : `${inputId}-description`
  const errorId = `${inputId}-error`
  const describedBy =
    [descriptionId, showError && errorMessage ? errorId : undefined]
      .filter(Boolean)
      .join(' ') || undefined

  return {
    field: controller.field,
    fieldState: controller.fieldState,
    formState: controller.formState,
    inputId,
    descriptionId,
    errorId,
    describedBy,
    error: errorMessage,
    showError,
    resetVersion,
  }
}
