import { Form, Formik } from 'formik'
import React from 'react'
import Button from '../Button'
import FormikPinField from './FormikPinField'

export const Default = () => (
  <div>
    <div>
      The default 9-digit Formik pin field works with a "name" input and no
      other requirements. Form validation has to be done manually with a
      separate schema. The state is kept as a string including the whitespaces
      (see "value" below).
    </div>
    <Formik
      initialValues={{
        pin: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.pin}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikPinField name="pin" className={{ root: 'mb-1' }} />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.pin}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Required = () => (
  <div>
    <div>
      As most other formik fields as well, this form can be marked to be
      required with the "required" prop. The corresponding sign is shown next to
      the label.
    </div>
    <Formik
      initialValues={{
        pin: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.pin}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikPinField
                required
                label="PIN"
                name="pin"
                className={{ root: 'mb-1' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.pin}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const SmallLabel = () => (
  <div>
    <div>
      As especially useful for loginForms, etc. the label can be chosen to be
      smaller, while still offering the required prop and an optional tooltip
      (scaled accordingly).
    </div>
    <Formik
      initialValues={{
        pin: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.pin}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikPinField
                required
                labelType="small"
                tooltip="Tooltip for this input"
                label="PIN"
                name="pin"
                className={{ root: 'mb-1' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.pin}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Tooltip = () => (
  <div>
    <div>
      As most other formik components as well, the label can be accompanied by a
      tooltip with corresponding symbol.
    </div>
    <Formik
      initialValues={{
        pin: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.pin}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikPinField
                required
                label="PIN"
                tooltip="Tooltip for this input"
                name="pin"
                className={{ root: 'mb-1' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.pin}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Styled = () => (
  <div>
    <div>
      Custom styling can be applied through the className prop and testing is
      facilitated through data-props.
    </div>
    <Formik
      initialValues={{
        pin: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.pin}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikPinField
                required
                label="PIN"
                name="pin"
                className={{
                  root: 'mb-1 w-1/2',
                  field: 'bg-red-200',
                  label: 'text-blue-500',
                }}
                data={{ cy: 'test' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.pin}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)
