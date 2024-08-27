// https://github.com/jaredpalmer/formik/issues/2769#issuecomment-1872382784

import debounce from 'debounce'
import { useFormikContext } from 'formik'
import { useEffect, useMemo } from 'react'

export interface AutoSubmitProps {
  debounceWait: number
}

export function FormikAutoSubmit({ debounceWait }: AutoSubmitProps) {
  /*
      This component is used to automatically submit the form when the form is valid
      and has been changed(dirty).
     */
  const { isValid, values, dirty, submitForm } = useFormikContext()

  // avoid repetitive calls to debounce
  const debouncedSubmit = useMemo(
    () =>
      debounce(() => {
        if (isValid && dirty) {
          void submitForm()
        }
      }, debounceWait),
    [isValid, dirty, submitForm, debounceWait]
  )

  useEffect(() => {
    debouncedSubmit()
  }, [isValid, values, dirty, submitForm, debouncedSubmit])

  return null
}

export default FormikAutoSubmit
