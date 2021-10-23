import { Form, Button } from "react-bootstrap";
import { Switch } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Formik } from "formik";

/**
 * @function Create - currency creation form
 * @param {Object} params
 * @param {Object} params.action
 * @param {Object} params.callback
 * @param {Object} params.payload
 * @returns
 */
function Create({ action, callback }) {
  return (
    <Formik
      initialValues={{
        iso_code: "",
        name: "",
        type: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          values = { ...values, iso_code: values?.iso_code?.toUpperCase() };
          let { data } = await action(values);
          if (data) {
            callback && callback();
          }
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, isSubmitting, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCurrencyCode">
            <Form.Label>
              <strong>Code</strong>
            </Form.Label>
            <Form.Control
              type="text"
              autoCapitalize="characters"
              name="iso_code"
              className="text-uppercase"
              defaultValue={values?.iso_code}
              placeholder="Currency symbol"
              onChange={handleChange}
            />

            <Form.Text className="mt-2 text-muted">
              ISO Code or Short name or Symbol
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCurrencyName">
            <Form.Label>
              <strong>Full name</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              defaultValue={values?.name}
              onChange={handleChange}
              placeholder="Currency name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCurrencyType">
            <Form.Label>
              <strong>Type</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="type"
              defaultValue={values?.type?.toLowerCase()}
              onChange={handleChange}
              aria-label="Select currency type"
            >
              <option>Select currency type</option>
              <option value="fiat">Fiat</option>
              <option value="crypto">Crypto</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" disabled={isSubmitting} block type="submit">
            {isSubmitting ? "Processing..." : "Finish"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

/**
 * @function Update - Update currecny form
 * @param {Object} params
 * @param {Object} params.action
 * @param {Object} params.callback
 * @param {Object} params.payload
 * @returns
 */
function Update({ action, callback, payload: initialData = {} }) {
  return (
    <Formik
      initialValues={{
        iso_code: initialData?.iso_code || null,
        id: initialData?.id || null,
        name: initialData?.name || null,
        type: initialData?.type || null,
        restore: false,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { data } = await action(values);
          data && callback && callback();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, isSubmitting, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCurrencyCode">
            <Form.Label>
              <strong>Code</strong>
            </Form.Label>
            <Form.Control
              type="text"
              autoCapitalize
              name="iso_code"
              defaultValue={values?.iso_code}
              placeholder="Currency symbol"
              onChange={handleChange}
            />

            <Form.Text className="mt-2 text-muted">
              ISO Code or Short name or Symbol
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCurrencyName">
            <Form.Label>
              <strong>Full name</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              defaultValue={values?.name}
              onChange={handleChange}
              placeholder="Currency name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCurrencyType">
            <Form.Label>
              <strong>Type</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={values?.type?.toLowerCase()}
              defaultValue={values?.type?.toLowerCase()}
              onChange={handleChange}
              aria-label="Select currency type"
            >
              <option>Select currency type</option>
              <option value="fiat">Fiat</option>
              <option value="crypto">Crypto</option>
            </Form.Control>
          </Form.Group>

          {(initialData?.archived_at || initialData?.archivedAt) && (
            <Form.Group>
              <Switch
                size="small"
                name="restore"
                checked={values?.restore}
                onChange={handleChange}
              />{" "}
              Restore
            </Form.Group>
          )}
          <Button variant="primary" disabled={isSubmitting} block type="submit">
            {isSubmitting ? "Processing..." : "Finish"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

/**
 * @function Remove - Currency removal from
 * @param {Object} params
 * @param {Function} params.action
 * @param {Function} params.callback
 * @param {Object} params.payload
 * @returns
 */
export function Remove({ action, callback, payload: initialData = {} }) {
  return (
    <Formik
      initialValues={{
        confirm: false,
        force: false,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { force } = values;
          let { data } = await action({ force });
          data && callback && callback();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
        initialData?.id !== null ? (
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
            <p className="">
              Are you sure you wish to proceed with this action?
            </p>

            <Form.Text controlId="delete_type" className="mt-3 mb-3">
              <label>
                <Checkbox name="confirm" onChange={handleChange} />I understand
                the implications of my action
              </label>
            </Form.Text>

            <Button
              variant="danger"
              disabled={isSubmitting || !values?.confirm}
              block
              type="submit"
            >
              {isSubmitting ? "Processing..." : "Confirm"}
            </Button>

            <Form.Text controlId="delete_type" className="text-muted mt-3 ">
              <label
                htmlFor="perm_delete"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Permanently delete</span>
                <Switch
                  onChange={handleChange}
                  name="force"
                  id="perm_delete"
                  size="small"
                  checked={values?.force}
                />
              </label>
            </Form.Text>
          </Form>
        ) : (
          <>No IDs provided</>
        )
      }
    </Formik>
  );
}

export default Object.assign(Create, {
  Remove,
  Update,
});
