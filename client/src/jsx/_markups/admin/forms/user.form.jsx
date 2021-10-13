import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import country_list from "country-list";

// CREATE NEW USER FORM
export function Create({ action, callback }) {
  return (
    <Formik
      initialValues={{
        email: "",
        country: "CN",
        nickname: "",
        permission: false,
        role: "basic",
      }}
      // validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let payload = [values];
          await action(payload);
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

          <Form.Group className="mb-3" controlId="formCurrencyCode">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              name="nickname"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values?.nickname}
              placeholder="User's nickname"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formCurrencyCode">
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="country"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.country}
              placeholder="Country"
            >
              {country_list.getNames().map((country, key) => {
                return (
                  <option key={key} value={country_list.getCode(country)}>
                    {country}
                  </option>
                );
              })}
            </Form.Control>
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
              <Form.Text>Has Permission </Form.Text>
              <Switch
                name="permission"
                checked={values?.permission}
                onChange={handleChange}
              />
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
export function Update({ action, callback, payload: initialData = null }) {
  return (
    <Formik
      initialValues={{
        email: initialData?.email || "",
        country: initialData?.country || "CN",
        nickname:
          initialData?.role == "admin"
            ? initialData?.admin_profile?.nickname
            : initialData?.profile?.nickname || "",
        permission: initialData?.permission || false,
        role: initialData?.role || "basic",
      }}
      // validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { email, ...rest } = values;
          let payload = rest;
          if (!initialData)
            payload = [{ email: values?.email, role: rest?.role }];

          await action(payload);
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
            {!initialData ? (
              <Form.Control
                type="email"
                name="email"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email address"
              />
            ) : (
              <Form.Text>
                <strong className="text-primary">{initialData?.email}</strong>
              </Form.Text>
            )}
          </Form.Group>

          {initialData && (
            <>
              <Form.Group className="mb-3" controlId="formCurrencyCode">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  type="text"
                  name="nickname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values?.nickname}
                  placeholder="User's nickname"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formCurrencyCode">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="country"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  placeholder="Country"
                >
                  {country_list.getNames().map((country, key) => {
                    return (
                      <option key={key} value={country_list.getCode(country)}>
                        {country}
                      </option>
                    );
                  })}
                </Form.Control>
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
                  <Form.Text>Has Permission </Form.Text>
                  <Switch
                    name="permission"
                    checked={values?.permission}
                    onChange={handleChange}
                  />
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
        force: false,
        confirm: false,
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
          {console.log(values)}
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
            <span className="simple-trash" style={{ fontSize: 45 }}></span>
          </div>
          <strong className="d-block text-center ">
            You are about to delete the user with the following email address
          </strong>

          <ul className="d-block text-center">
            <li className="badge badge-default text-white">{values?.email}</li>
          </ul>

          <strong className="d-block text-danger text-center my-1">
            {values?.force && "This is an irreversible action!"}
          </strong>
          <Form.Group className="mt-3 mb-1">
              <Checkbox
                id="confirm_del"
                name="confirm"
                onChange={handleChange}
              />
              <Form.Label htmlFor="confirm_del">
                I understand the implications of my action
              </Form.Label>
            </Form.Group>

          <Button variant="danger" disabled={isSubmitting || !values?.confirm} block type="submit">
            {isSubmitting ? "Processing..." : "Confirm"}
          </Button>
          <Form.Text className="text-muted mt-3 ">
            <Form.Label
              htmlFor="perm_del"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Permanently delete</span>
              <Switch
                name="force"
                onChange={handleChange}
                id="perm_del"
                defaultValue={values?.force}
              />
            </Form.Label>
          </Form.Text>
        </Form>
      )}
    </Formik>
  );
}
export default Object.assign(Create, {
  Update,
  Delete: Drop,
  Drop,
});
