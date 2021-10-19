import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import country_list from "country-list";

// CREATOR FORM
export function Create({ action, callback }) {
  return (
    <Formik
      initialValues={{
        email: "",
        country: "CN",
        nickname: "",
        admin: false,
        other_names: "",
        last_name: "",
      }}
      // validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { admin, email, ...profile } = values;
          let role = admin ? "admin" : "basic";
          let payload = [{ email, role, profile }];
          // Send request
          let { success } = await action(payload);
          if (success) {
            callback && callback();
          }
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
            <Form.Label as="strong">Email address</Form.Label>
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
            <Row>
              <Col>
                <Form.Label as="strong">Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values?.last_name}
                  placeholder="Last name"
                />
              </Col>
              <Col>
                <Form.Label as="strong">Other names</Form.Label>
                <Form.Control
                  type="text"
                  name="other_names"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values?.other_names}
                  placeholder="Other names"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCurrencyCode">
            <Form.Label as="strong">Nickname</Form.Label>
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
            <Form.Label as="strong">Country</Form.Label>
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

          <Button variant="primary" disabled={isSubmitting} block type="submit">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>

          <Form.Group className="mt-3">
            <Form.Label
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <strong>Create as Administrator </strong>
              <Switch
                name="admin"
                checked={values?.admin}
                defaultValue={values?.admin}
                onChange={handleChange}
              />
            </Form.Label>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

// UPDATER FORM
export function Update({ action, callback, payload: initialData = null }) {
  return (
    <Formik
      initialValues={{
        // country: initialData?.country || "CN",
        // nickname: initialData?.nickname || "",
        permission: initialData?.permission || false,
        other_names: initialData?.other_names || "",
        last_name: initialData?.last_name || "",
        restore: false,
      }}
      // validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { success } = await action(values);
          if (success) {
            callback && callback();
          }
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
            <Form.Label as="strong">Email address</Form.Label>
            <Form.Text>
              <strong className="text-primary">{initialData?.email}</strong>
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col>
                <Form.Label as="strong">Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values?.last_name}
                  placeholder="Last name"
                />
              </Col>
              <Col>
                <Form.Label as="strong">Other names</Form.Label>
                <Form.Control
                  type="text"
                  name="other_names"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values?.other_names}
                  placeholder="Other names"
                />
              </Col>
            </Row>
          </Form.Group>

     {/*      <Form.Group className="mb-3" controlId="nickname">
            <Form.Label as="strong">Nickname</Form.Label>
            <Form.Control
              type="text"
              name="nickname"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values?.nickname}
              placeholder="User's nickname"
            />
          </Form.Group> */}

{/*           <Form.Group className="mb-4" controlId="country">
            <Form.Label as="strong">Country</Form.Label>
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
          </Form.Group> */}

          {initialData?.archived_at && (
            <Form.Label style={{  marginBottom: 10, display: 'flex', justifyContent: 'space-between', gap: 10}} >
              <Form.Text>This user is curently inactive. Activate?</Form.Text>
              <Switch size="small" color="default"
                onChange={handleChange}
                name="restore"
                checked={values?.restore}
                label="Restore"
              />
            </Form.Label>
          )}

          <Button variant="primary" disabled={isSubmitting} block type="submit">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

// REMOVAL FORM
export function Remove({ action, callback, payload: initialValues = {} }) {
  return (
    <Formik
      initialValues={{
        force: initialValues?.force || false,
        confirm: false,
      }}
      validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { force } = values;
          let { success } = await action({ force });
          success && callback && callback();
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
            <span className="simple-trash" style={{ fontSize: 45 }}></span>
          </div>
          <strong className="d-block text-center ">
            You are about to delete the user with the following email address
          </strong>

          <ul className="d-block text-center">
            <li className="badge badge-default text-white">
              {initialValues?.email}
            </li>
          </ul>

          <strong className="d-block text-danger text-center my-1">
            {values?.force && "This is an irreversible action!"}
          </strong>
          <Form.Group className="mt-3 mb-1">
            <Checkbox id="confirm_del" name="confirm" onChange={handleChange} />
            <Form.Label htmlFor="confirm_del">
              I understand the implications of my action
            </Form.Label>
          </Form.Group>

          <Button
            variant="danger"
            disabled={isSubmitting || !values?.confirm}
            block
            type="submit"
          >
            {isSubmitting ? "Processing..." : "Confirm"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Object.assign(Create, {
  Remove,
  Drop: Remove,
  Delete: Remove,
  Update,
  Modify: Update,
  Add: Create,
});
