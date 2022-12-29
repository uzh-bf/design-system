import { Form, Formik } from 'formik'
import React from 'react'
import Button from '../Button'
import FormikNumberField from './FormikNumberField'

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
              <FormikNumberField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
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

export const Disabled = () => (
  <div>
    <div>
      Number inputs can also be disabled with a corresponding prop, not allowing
      the user to make changes to the field.
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
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikNumberField
                disabled
                name="name"
                label="Label"
                tooltip="Tooltip for disabled field"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder (disabled field)"
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

export const Decimals = () => (
  <div>
    <div>
      The default Formik field works with a "name" input and allows the user to
      input decimal numbers as well as integers
    </div>
    <Formik
      initialValues={{
        name: undefined,
      }}
      isInitialValid={false}
      onSubmit={async (values) => {
        alert(`Form submitted with value: ${parseFloat(values.name || '')}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikNumberField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
                allowDecimals
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>
              Value that will be submitted with parseFloat():{' '}
              {parseFloat(values.name || '')}
            </div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Required = () => (
  <div>
    <div>
      By adding a required attribute, the label of the field changes it
      appearance
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
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikNumberField
                required
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
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
              <FormikNumberField
                value={values.name}
                onChange={(newValue) => {
                  setFieldValue('name', newValue.replace(/\s/g, ''))
                }}
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
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
              <FormikNumberField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{
                  root: 'mb-1 w-1/2',
                  label: 'text-red-500',
                  input: 'bg-uzh-blue-20',
                  error: 'text-red-700',
                }}
                placeholder="Placeholder"
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
