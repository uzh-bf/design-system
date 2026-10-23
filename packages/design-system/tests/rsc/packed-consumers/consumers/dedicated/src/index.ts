import { FormLabel as RootFormLabel } from '@uzh-bf/design-system'
import '@uzh-bf/design-system/css'
import '@uzh-bf/design-system/preflight.css'
import { Field } from '@uzh-bf/design-system/primitives'
import {
  Form,
  RhfAlphaNumericPinField,
  FormLabel as RhfFormLabel,
  RhfPinField,
  RhfSwitchField,
  RhfTextField,
  RhfTextareaField,
} from '@uzh-bf/design-system/react-hook-form'
import type { ComponentProps } from 'react'

export type RootFormLabelProps = ComponentProps<typeof RootFormLabel>
export type RhfFormLabelProps = ComponentProps<typeof RhfFormLabel>

export const contract = {
  Field,
  Form,
  RhfFormLabel,
  RhfTextField,
  RhfTextareaField,
  RhfSwitchField,
  RhfPinField,
  RhfAlphaNumericPinField,
  RootFormLabel,
}
