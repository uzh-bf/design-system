import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../Button'
import FormikDateChanger from './FormikDateChanger'

export const Default = () => (
  <div>
    <Formik
      initialValues={{
        date: '2023-01-01',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with date: ${values.date}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikDateChanger name="date" className={{ root: 'mb-2' }} />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.date}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Disabled = () => (
  <div>
    <Formik
      initialValues={{
        date: '2023-01-01',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with date: ${values.date}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikDateChanger
                name="date"
                className={{ root: 'mb-2' }}
                disabled
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.date}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Labelled = () => (
  <div>
    <Formik
      initialValues={{
        date: '2023-01-01',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with date: ${values.date}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikDateChanger
                name="date"
                className={{ root: 'mb-2' }}
                label="Label"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.date}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Tooltip = () => (
  <div>
    <Formik
      initialValues={{
        date: '2023-01-01',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with date: ${values.date}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikDateChanger
                name="date"
                className={{ root: 'mb-2' }}
                label="Testlabel"
                required
                tooltip="Test Tooltip"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.date}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Validation = () => (
  <div>
    <div>
      The date has to be chosen to be after 2020 - otherwise the component
      displays an error.
    </div>
    <Formik
      initialValues={{
        date: '2023-01-01',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with date: ${values.date}`)
        resetForm()
      }}
      validationSchema={Yup.object().shape({
        date: Yup.date().min('2020-01-01', 'Date has to be after 2020'),
      })}
    >
      {({ values, isValid, validateForm }) => {
        return (
          <div>
            <Form>
              {String(isValid)}
              <FormikDateChanger
                required
                name="date"
                className={{ root: 'mb-2' }}
                label="Testlabel"
                tooltip="Test Tooltip"
                validateField={() => validateForm()}
              />
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            </Form>
            <div>Value: {values.date}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)
