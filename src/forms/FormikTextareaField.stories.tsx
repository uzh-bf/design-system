import { Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import Button from '../Button'
import FormikTextareaField from './FormikTextareaField'

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
              <FormikTextareaField
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
      The textarea Formik field can be easily disabled using a corresponding
      prop, keeping the user from changing the field's value.
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
              <FormikTextareaField
                disabled
                name="name"
                label="Label"
                tooltip="Disabled textarea input field tooltip"
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

export const MaxLength = () => (
  <div>
    <div>
      Providing a max length to the formik field does not allow the user to
      enter more characters than specified. At the same time the option
      "showMaxLength" can be used to display the character limit to the user.
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
              <FormikTextareaField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
                maxLength={80}
                maxLengthLabel="Characters"
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
              <FormikTextareaField
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
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
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
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
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

export const Validation = () => (
  <div>
    <div>
      This textarea field should have at most 10 characters and will display an
      error otherwise
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
      validationSchema={yup.object({
        name: yup
          .string()
          .required('This field is requried')
          .max(10, 'Max 10 characters'),
      })}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{
                  root: 'mb-1 w-1/2',
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
