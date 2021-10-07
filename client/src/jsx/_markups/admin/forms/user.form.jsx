import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";

export function UserForm({ action, data = {} }) {
  return <Formik>A form</Formik>;
}
export function Modify({ action, callback , data: initialData = {} }) {
  return (
    <Formik
    initialValues={{ email: initialData?.emaill || "", role: "admin", sudo: true }}
    validate={(values) => {}}
    onSubmit={async (values, { setSubmitting }) => {
      try{
        let response = await action(values);
        callback && callback(response);
      } catch (error) {
        console.error(error)
      }finally{
        setSubmitting(false)
      }
    }}
    >
    {({
      values,
      errors,
      isSubmitting,
      handleSubmit,
      handleChange,
      handleBlur,
      touched,
    }) => (
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formCurrencyCode">
      <Form.Label>Email address</Form.Label>
      <Form.Control
      type="email"
      name="email"
      required
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
      placeholder="Email address"
      />
      </Form.Group>
      <Button variant="primary" disabled={isSubmitting} block type="submit">{isSubmitting ? 'Saving...': 'Save'}</Button>
      </Form>
    )}
    </Formik>
  );
}
export function Create({ action, callback , data: initialData = {} }) {
  return (
    <Formik
    initialValues={{ email: initialData?.emaill || "", role: "admin", sudo: true }}
    validate={(values) => {}}
    onSubmit={async (values, { setSubmitting }) => {
      try{
        let response = await action(values);
        callback && callback(response);
      } catch (error) {
        console.error(error)
      }finally{
        setSubmitting(false)
      }
    }}
    >
    {({
      values,
      errors,
      isSubmitting,
      handleSubmit,
      handleChange,
      handleBlur,
      touched,
    }) => (
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formCurrencyCode">
      <Form.Label>Email address</Form.Label>
      <Form.Control
      type="email"
      name="email"
      required
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
      placeholder="Email address"
      />
      </Form.Group>
      <Button variant="primary" disabled={isSubmitting} block type="submit">{isSubmitting ? 'Saving...': 'Save'}</Button>
      </Form>
    )}
    </Formik>
  );
}

export default Object.assign(UserForm, {
  Modify,
  Create,
});
