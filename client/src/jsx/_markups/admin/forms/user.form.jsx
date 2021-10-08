import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";

export function UserForm({ action, payload = {} }) {
  return <Formik>A form</Formik>;
}
export function Create({ action, callback, payload: initialData = {} }) {
  return (
    <Formik
      initialValues={{
        email: initialData?.emaill || "",
        role: "admin",
        sudo: true,
      }}
      validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let response = await action(values);
          callback && callback(response);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
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

          <Button variant="primary" disabled={isSubmitting} block type="submit">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export function Modify({ action, callback, payload: initialValues = {} }) {
  return (
    <Formik
      initialValues={{
        ...initialValues,
        sudo: true,
      }}
      validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let response = await action(values);
          callback && callback(response);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
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
          <Form.Group className="mt-3 mb-3" controlId="user_email">
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

          {values?.role !== "admin" && (
            <Form.Group className="mt-3 mb-3" controlId="user_role">
              <Form.Text>Set as Administrator</Form.Text>
              <Switch /> Admin
            </Form.Group>
          )}
          <Button variant="primary" disabled={isSubmitting} block type="submit">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export function Drop({ action, callback, payload: initialValues = {} }) {
  return (
    <Formik
      initialValues={{
        ...initialValues,
        sudo: true,
      }}
      validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let response = await action(values);
          callback && callback(response);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
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
          <div
            style={{
              display: "flex",
              marginBottom: 20,
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              color: "#d33",
            }}
          >
            <span className="simple-trash" style={{ fontSize: 70 }}></span>
          </div>
          <h4 className="">Hold on!</h4>
          <p className="">
            You are about to delete the user with the following email address
          </p>
          <ul className="text-danger fw-bold" style={{ fontWeight: "bold" }}>
            <li>{values?.email}</li>
          </ul>

         

          <Form.Group controlId="delete_type" className="mt-3 mb-3">
            <Checkbox />I understand the implications of my action
          </Form.Group>

          <Button variant="primary" disabled={isSubmitting} block type="submit">
            {isSubmitting ? "Processing..." : "Confirm"}
          </Button>
           <Form.Text controlId="delete_type" className="text-muted">
            <Switch />
            Permanently delete
          </Form.Text>
        </Form>
      )}
    </Formik>
  );
}
export default Object.assign(UserForm, {
  Modify,
  Create,
  Delete: Drop,
  Drop,
});
