import { FormLabel as RootFormLabel } from '@uzh-bf/design-system'
import '@uzh-bf/design-system/css'
import '@uzh-bf/design-system/preflight.css'
import { Field } from '@uzh-bf/design-system/primitives'
import {
  Form,
  FormLabel as RhfFormLabel,
  RhfTextField,
} from '@uzh-bf/design-system/react-hook-form'
import type { ComponentProps } from 'react'

export type RootFormLabelProps = ComponentProps<typeof RootFormLabel>
export type RhfFormLabelProps = ComponentProps<typeof RhfFormLabel>

export const contract = {
  Field,
  Form,
  RhfFormLabel,
  RhfTextField,
  RootFormLabel,
}
