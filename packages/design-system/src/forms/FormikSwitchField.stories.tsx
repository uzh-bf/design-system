import { Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
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

export const StandardLabel = () => {
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
                <FormikSwitchField
                  name="switch"
                  label="unchecked"
                  tooltip="Switch Field Tooltip"
                  standardLabel
                  required
                />
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

export const Validation = () => {
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
        validationSchema={yup.object().shape({
          switch: yup
            .boolean()
            .required('Required')
            .equals([true], 'Must be checked'),
        })}
      >
        {() => {
          return (
            <div>
              <div>
                This switch is validated to be true and displayes an error
                otherwise
              </div>
              <Form>
                <FormikSwitchField
                  name="switch"
                  label="unchecked"
                  tooltip="Switch Field Tooltip"
                  standardLabel
                  required
                />
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
