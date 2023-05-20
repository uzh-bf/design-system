import { Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
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
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
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
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
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

export const Validation = () => (
  <div>
    <div>
      This formik field has validation functionalities included. The value is
      required and should be at least 100.
    </div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${parseFloat(values.name || '')}`)
        resetForm()
      }}
      validationSchema={yup.object().shape({
        name: yup.number().required('This field is required.').min(100),
      })}
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

export const Decimals = () => (
  <div>
    <div>
      The default Formik field works with a "name" input and allows the user to
      input decimal numbers as well as integers. The number of decimal places
      can be specified through the precision prop (set to 2 for this example).
    </div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${parseFloat(values.name || '')}`)
        resetForm()
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
                precision={2}
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

export const Integer = () => (
  <div>
    <div>
      By fixing the precision parameter to 0, the user can only input integers.
    </div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${parseFloat(values.name || '')}`)
        resetForm()
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
                precision={0}
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
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
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

export const Styled = () => (
  <div>
    <div>The default Formik field works with a "name" input</div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
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

export const SmallLabel = () => (
  <div>
    <div>
      Formik text area component with a small label (designed e.g. for login
      forms)
    </div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
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
                labelType="small"
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
