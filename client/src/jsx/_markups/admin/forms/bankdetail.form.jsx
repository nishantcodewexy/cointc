import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import services from "../../../_services";
import useService from "../../../_hooks/service.hook";
import { useEffect } from "react";
import country_list from "country-list";
import { SERVICE } from "../../../_constants";

/**
 * @function Remove - Bank detail removal form
 * @param {Object} params
 * @returns
 */
export function Remove({ action, callback, payload: initialData = {} }) {
  return (
    <Formik
      initialValues={{
        confirm: false,
        id: initialData?.id || null,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { success } = await action({
            id: values?.id,
            force: values?.force,
          });
          success && callback && callback();
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
        values?.id !== null ? (
          <Form onSubmit={handleSubmit}>
            <strong className="text-danger text-center d-block">
              This operation will permanently delete this item. Continue?
            </strong>
            <Form.Group className="mt-3 mb-1">
              <Checkbox
                id="delete_bankdetail"
                name="confirm"
                onChange={handleChange}
              />
              <Form.Label htmlFor="delete_bankdetail">
                I understand the implications of my action
              </Form.Label>
            </Form.Group>

            <Button
              variant="primary"
              disabled={isSubmitting || !values?.confirm}
              block
              type="submit"
            >
              {isSubmitting ? "Processing..." : "Confirm"}
            </Button>
          </Form>
        ) : (
          <>No ID provided</>
        )
      }
    </Formik>
  );
}

/**
 * @function Update - Bank detail modifier form
 * @param {Object} param0
 * @returns
 */
export function Update({ action, callback, payload: initialData = {} }) {
  const group = services.useGroupService();
  const currencyService = useService({
    [SERVICE?.BULK_RETRIEVE]: group.bulkRetrieveCurrency,
  });

  useEffect(() => {
    currencyService.dispatchRequest({ type: SERVICE?.BULK_RETRIEVE });
  }, []);
  return (
    <Formik
      initialValues={{
        id: initialData?.id,
        account_no: initialData?.account_no || "",
        bank_name: initialData?.bank_name || "",
        currency: initialData?.currency || "",
        country: initialData?.country || "",
        ifsc_code: initialData?.ifsc_code || "",
      }}
      validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { success } = await action(values);
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
      }) =>
        values?.id ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formCurrencyCode">
              <Form.Label>Account number</Form.Label>
              <Form.Control
                type="text"
                name="account_no"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.account_no}
                placeholder="Account Number"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formCurrencyCode">
              <Form.Label>Bank name</Form.Label>
              <Form.Control
                type="text"
                name="bank_name"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bank_name}
                placeholder="Bank Name"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formCurrencyCode">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="currency"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.currency}
                placeholder="Currency"
              >
                <option>Select currency</option>
                {currencyService &&
                  currencyService?.data?.results.map((data, key) => {
                    return (
                      <option value={data?.iso_code} key={key}>
                        {data?.name} ({data?.iso_code?.toUpperCase()})
                      </option>
                    );
                  })}
              </Form.Control>
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

            <Form.Group className="mb-4" controlId="formCurrencyCode">
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control
                type="text"
                name="ifsc_code"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ifsc_code}
                placeholder="IFSC Code"
              />
            </Form.Group>

            <Button
              variant="primary"
              disabled={isSubmitting}
              block
              type="submit"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </Form>
        ) : (
          "ID not provided"
        )
      }
    </Formik>
  );
}

/**
 * @function Create - Bank detail Creator form
 * @param {Object} param0
 * @returns
 */
export function Create({ action, callback }) {
  const group = services.useGroupService();
  const currencyService = useService({
    [SERVICE?.BULK_RETRIEVE]: group.bulkRetrieveCurrency,
  });

  useEffect(() => {
    currencyService.dispatchRequest({ type: SERVICE?.BULK_RETRIEVE });
  }, []);

  return (
    <Formik
      initialValues={{
        account_no: "",
        bank_name: "",
        currency: "",
        country: "",
        ifsc_code: "",
      }}
      validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let { success } = await action(values);
          if (success) callback && callback();
        } catch (error) {
          console.error( error);
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
          <Form.Group className="mb-4" controlId="formCurrencyCode">
            <Form.Label>Account number</Form.Label>
            <Form.Control
              type="text"
              name="account_no"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.account_no}
              placeholder="Account Number"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formCurrencyCode">
            <Form.Label>Bank name</Form.Label>
            <Form.Control
              type="text"
              name="bank_name"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bank_name}
              placeholder="Bank Name"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formCurrencyCode">
            <Form.Label>Currency</Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="currency"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.currency}
              placeholder="Currency"
            >
              <option>Select currency</option>
              {currencyService &&
                currencyService?.data?.results.map((data, key) => {
                  return (
                    <option value={data?.iso_code} key={key}>
                      {data?.name} ({data?.iso_code?.toUpperCase()})
                    </option>
                  );
                })}
            </Form.Control>
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

          <Form.Group className="mb-4" controlId="formCurrencyCode">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="text"
              name="ifsc_code"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ifsc_code}
              placeholder="IFSC Code"
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

export default Object.assign(Create, {
  Remove,
  Drop: Remove,
  Delete: Remove,
  Update,
  Modify: Update,
  Add: Create,
});
