import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import { FormControlUnstyled } from "@mui/core";

export function UserForm({ action, payload = {} }) {
  return <Formik>A form</Formik>;
}

// CREATE NEW USER FORM
export function Create({ action, callback, payload: initialData = {} }) {
  return (
    <Formik
      initialValues={{
        email: initialData?.emaill || "",
        asAdmin: initialData?.role == "admin" || false,
        sudo: true,
      }}
      validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { asAdmin, ...others } = values;
          let dataPayload = { ...others, role: asAdmin ? "admin" : "basic" };
          await action(dataPayload);
          callback && callback();
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
          <Form.Group>
            <Form.Label
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Form.Text>Create as Administrator</Form.Text>
              <Switch name="asAdmin" onChange={handleChange} />
            </Form.Label>
          </Form.Group>

          <Button variant="primary" disabled={isSubmitting} block type="submit">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

// UPDATE USER FORM
export function Update({ action, callback, payload: initialValues = {} }) {
  return (
    <Formik
      initialValues={{
        email: initialValues?.email || '',
        asAdmin:  initialValues?.role == 'admin' ? true : false,
        suspend: initialValues?.archivedAt ? true : false,
        sudo: true,
        role: initialValues?.role,
        id: initialValues?.id
      }}
      validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { asAdmin, sudo, suspend, ...others } = values;
          let dataPayload = { ...others, role: asAdmin ? "admin" : "basic" };
          console.log(dataPayload)
          let response = await action({data: [dataPayload], sudo});
          // callback && callback(response);
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
            <Form.Text>
              Current role: <strong>{values?.role}</strong>
            </Form.Text>
          </Form.Group>

          {values?.role !== "admin" && (
            <>
              <Form.Group className="mt-3 mb-3" controlId="user_as_admin">
                <Form.Label
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Text>Administrator</Form.Text>
                  <Switch name="asAdmin" onChange={handleChange} />
                </Form.Label>
              </Form.Group>

              <Form.Group className="mt-3 mb-3" controlId="user_suspended">
                <Form.Label
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Text>Suspend</Form.Text>
                  <Switch name="suspend" onChange={handleChange} />
                </Form.Label>
              </Form.Group>
            </>
          )}
          <Button variant="primary" disabled={isSubmitting} block type="submit">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

// DELETE USER FORM
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
  Modify: Update,
  Create,
  Delete: Drop,
  Drop,
});
