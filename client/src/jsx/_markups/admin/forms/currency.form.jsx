import { Form, Button } from "react-bootstrap";
import {Switch} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Formik } from "formik";

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
          let payload = [values];
          let response = await action([values]);
          callback && callback(response);
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
          let response = await action([values]);
          callback && callback(response);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, isSubmitting, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          {console.log(initialData)}
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

export function Drop({ action, callback, payload: initialData = {} }) {
  return (
    <Formik
      initialValues={{
        confirm: false,
        ids: initialData?.ids || null,
        force: false,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { ids, force } = values;

          let response = await action({ data: ids, force });
          callback && callback(response);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
        values?.ids !== null ? (
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
              variant="primary"
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
  Drop,
  Update,
});
