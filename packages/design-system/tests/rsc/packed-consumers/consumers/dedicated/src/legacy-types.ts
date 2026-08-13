import type { RhfTextFieldProps } from '@uzh-bf/design-system/react-hook-form'

type Values = {
  name: string
}

const props: RhfTextFieldProps<Values, 'name'> = { name: 'name' }

void props
