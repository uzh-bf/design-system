import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@uzh-bf/design-system/react-hook-form'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
}

type TransformedValues = {
  name: number
}

// FormField must thread the transformed values type through ControllerProps
// so a Controller-based field can compose with a transformed submit payload.
export function TransformedOutputForm() {
  const form = useForm<FormValues, unknown, TransformedValues>({
    defaultValues: { name: '' },
    resolver: (values) => ({
      values: { name: Number(values.name) },
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
        <button type="submit">Submit transformed form</button>
      </form>
    </Form>
  )
}
