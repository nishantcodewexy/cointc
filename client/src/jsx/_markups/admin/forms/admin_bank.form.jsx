import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import services from "../../../_services";
import useService from "../../../_hooks/service.hook";
import { useEffect } from "react";
import country_list from "country-list";
// DELETE USER FORM
export function Drop({ action, callback, payload: initialData = {} }) {
  return (
    <Formik
      initialValues={{
        confirm: false,
        id: initialData?.id || null,
        sudo: true,
      }}
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
      {({ values, errors, isSubmitting, handleSubmit, handleChange }) =>
        values?.id !== null ? (
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
            <p className="">Are you sure you wish to delete this info</p>

            <Form.Group controlId="delete_type" className="mt-3 mb-3">
              <Form.Lable>
                <Checkbox name="confirm" onChange={handleChange} />I understand
                the implications of my action
              </Form.Lable>
            </Form.Group>
            <Form.Text controlId="delete_type" className="text-muted mt-3 mb-3">
              <Switch />
              Permanently delete
            </Form.Text>
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

// MODIFY BANK DETAIL FORM
export function BankDetailForm({
  action,
  callback,
  payload: initialData = {},
}) {
  const group = services.useGroupService();
  const currencyService = useService({
    list: group.listCurrency,
  });

  useEffect(() => {
    currencyService.dispatchRequest({ type: "list" });
  }, []);
  return (
    <Formik
      initialValues={{
        account_no: initialData?.account_no || "06910395",
        bank_name: initialData?.bank_name || "USBANK",
        currency: initialData?.currency || "AUD",
        country: initialData?.country || "CN",
        ifsc_code: initialData?.ifsc_code || "SBUNAS1213",
      }}
      validate={(values) => {}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log(values);
          // await action(values);
          // callback && callback();
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
              <option></option>
              {/*    {currencyService && currencyService?.data?.results.map((data, key) => {
                return <option key={key}>{data?.symbol}</option>;
              })} */}
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

export default Object.assign(BankDetailForm, {
  Delete: Drop,
  Drop,
});
