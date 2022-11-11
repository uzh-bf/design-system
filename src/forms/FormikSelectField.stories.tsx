import { Form, Formik } from 'formik'
import React from 'react'
import Button from '../Button'
import FormikSelectField from './FormikSelectField'

export const Default = () => (
  <div>
    <Formik
      initialValues={{
        name: 'hello',
      }}
      onSubmit={async (values) => {
        alert(`Form submitted with value: ${values.name}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSelectField
                name="name"
                items={[
                  { value: 'hello', label: 'hello' },
                  { value: 'world', label: 'world' },
                ]}
                label="Name"
                placeholder="Select a name"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.name}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)
