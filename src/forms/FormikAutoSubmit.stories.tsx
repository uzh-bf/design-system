import { Form, Formik } from 'formik'
import React from 'react'
import FormikAutoSubmit from './FormikAutoSubmit'
import FormikTextField from './NewFormikTextField'

export const Default = () => (
  <div>
    <div>
      Formik with an AutoSubmit component calls onSubmit with a given debounce
      (here 1000)
    </div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values) => {
        alert(`Form submitted with value: ${values.name}`)
      }}
    >
      <div>
        <Form>
          <FormikAutoSubmit debounceWait={1000} />
          <FormikTextField
            name="name"
            label="Label"
            tooltip="Tooltip for this input"
            className={{ root: 'mb-1 w-80' }}
            placeholder="Placeholder"
          />
        </Form>
      </div>
    </Formik>
  </div>
)
