import { Form, Formik } from 'formik'
import React from 'react'
import Button from '../Button'
import FormikSwitchField from './FormikSwitchField'

export const Default = () => {
  return (
    <div>
      <Formik
        initialValues={{
          switch: false,
        }}
        isInitialValid={false}
        onSubmit={(values) => {
          alert(`Switch value:  ${values.switch}`)
        }}
      >
        {() => {
          return (
            <div>
              <Form>
                <FormikSwitchField name="switch" label="unchecked" />
                <Button className={{ root: 'mt-2' }} type="submit">
                  Submit
                </Button>
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
          switch: false,
        }}
        isInitialValid={false}
        onSubmit={(values) => {
          alert('Switch is disabled')
        }}
      >
        {() => {
          return (
            <div>
              <Form>
                <FormikSwitchField name="switch" label="disabled" disabled />
                <Button className={{ root: 'mt-2' }} type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}
