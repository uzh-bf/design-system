import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RhfAlphaNumericPinField,
  RhfPinField,
  RhfSwitchField,
  RhfTextareaField,
} from '@uzh-bf/design-system/react-hook-form'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  enabled: boolean
}

type TransformedValues = {
  name: number
  enabled: boolean
}

// FormField must thread the transformed values type through ControllerProps
// so a Controller-based field can compose with a transformed submit payload.
export function TransformedOutputForm() {
  const form = useForm<FormValues, unknown, TransformedValues>({
    defaultValues: { name: '', enabled: false },
    resolver: (values) => ({
      values: { name: Number(values.name), enabled: values.enabled },
      errors: {},
    }),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: TransformedValues) => {
          const name: number = values.name
          void name
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input {...field} aria-invalid={fieldState.invalid} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RhfTextareaField control={form.control} name="name" />
        <RhfSwitchField control={form.control} name="enabled" />
        <RhfPinField control={form.control} name="name" length={4} />
        <RhfAlphaNumericPinField
          control={form.control}
          name="name"
          length={4}
        />
        <button type="submit">Submit transformed form</button>
      </form>
    </Form>
  )
}
