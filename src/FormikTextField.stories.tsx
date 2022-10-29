import { Form, Formik } from 'formik'
import React from 'react'
import Button from './Button'
import FormikTextField from './FormikTextField'

export const Default = () => (
  <div>
    <div>The default Formik field works with a "name" input</div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values) => {
        alert(`Form submitted with value: ${values.name}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
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

export const OnChangeFunction = () => (
  <div>
    <div>
      An alternative version of the text field input allows to work with a
      "value" and "onChange" attribute instead of the "name" attribute. This
      field is modified in a way that whitespaces are removed from the input on
      change.
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
      {({ values, setFieldValue }) => {
        return (
          <div>
            <Form>
              <FormikTextField
                value={values.name}
                onChange={(newValue) => {
                  setFieldValue('name', newValue.replace(/\s/g, ''))
                }}
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
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

export const Styled = () => (
  <div>
    <div>The default Formik field works with a "name" input</div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values) => {
        alert(`Form submitted with value: ${values.name}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{
                  root: 'mb-1 w-1/2',
                  label: 'text-red-500',
                  input: 'bg-uzh-blue-20',
                  error: 'text-red-700',
                }}
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
