import type { ComponentProps } from 'react'
import { FormLabel as RootFormLabel } from '@uzh-bf/design-system'
import { Field } from '@uzh-bf/design-system/primitives'
import {
  Form,
  FormLabel as RhfFormLabel,
  RhfTextField,
} from '@uzh-bf/design-system/react-hook-form'
import '@uzh-bf/design-system/css'
import '@uzh-bf/design-system/preflight.css'

export type RootFormLabelProps = ComponentProps<typeof RootFormLabel>
export type RhfFormLabelProps = ComponentProps<typeof RhfFormLabel>

export const contract = {
  Field,
  Form,
  RhfFormLabel,
  RhfTextField,
  RootFormLabel,
}
