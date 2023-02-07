import { Form, Formik } from 'formik'
import React from 'react'
import FormikSwitchField from './FormikSwitchField'

export const Default = () => {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
        }}
        isInitialValid={false}
        onSubmit={() => {
          console.log('nothing to submit')
        }}
      >
        {() => {
          return (
            <div>
              <Form>
                <FormikSwitchField name="switch" label="unchecked" />
              </Form>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export const Disabled = () => {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
        }}
        isInitialValid={false}
        onSubmit={() => {
          console.log('nothing to submit')
        }}
      >
        {() => {
          return (
            <div>
              <Form>
                <FormikSwitchField name="switch" label="disabled" disabled />
              </Form>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}
