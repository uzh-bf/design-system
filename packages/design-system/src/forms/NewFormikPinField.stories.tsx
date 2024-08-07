import { Form, Formik } from 'formik'
import * as yup from 'yup'
import Button from '../Button'
import FormikPinField from './NewFormikPinField'

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
    <div>
      Values can be pasted into the field using either the format including
      spaces "123 456 789" or without "123456789"
    </div>
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

export const LargeLabel = () => (
  <div>
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
                labelType="large"
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
                  input: 'bg-red-200',
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

export const Validation = () => (
  <div>
    <div>
      This PIN field should have an exact length of 11 characters or will
      display an error after being touched otherwise.
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
      validationSchema={yup.object().shape({
        pin: yup
          .string()
          .required('This field is required')
          .min(11, 'Please ensure that the entire PIN is entered')
          .max(11, 'Please ensure that the entire PIN is entered'),
      })}
    >
      {({ values, isValid }) => {
        return (
          <div>
            <Form>
              <FormikPinField
                required
                label="PIN"
                name="pin"
                className={{ root: 'mb-1' }}
              />
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            </Form>
            <div>Value: {values.pin}</div>
            <div>Valid?: {String(isValid)}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)
