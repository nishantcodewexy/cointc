import { Card, Row, Col, Button, Dropdown, Table } from "react-bootstrap";
import { useEffect } from "react";
import PageTitle from "../layouts/PageTitle";
import useToggler from "../../../_hooks/toggler.hook";
// CONSTANTS
import { SERVICE } from "../../../_constants";

// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";

function Support({ services, useService }) {
  const { support_ticket } = services;

  // console.log({ support_ticket });
  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: () => support_ticket.bulkRetrieveSupportTicket(),
  });

  const { dispatchRequest } = service;

  useEffect(async () => {
    if (support_ticket) {
      dispatchRequest({ type: SERVICE?.BULK_RETRIEVE });
    }
  }, []);

  return (
    <>
      <PageTitle activeMenu="Support" motherMenu="Support management" />
      <header className="mb-4">
        <h3>Support Tickets</h3>
      </header>

      <TableGenerator
        {...{ service }}
        mapping={{}}
        omit="*"
        extras={["user_id", "email", "subject", "status", "action"]}
        transformers={{
          user_id: ({ key, value }) => (
            <>{value ? "permitted" : "Not permitted"}</>
          ),
          email: ({ key, value }) => (
            <>{value ? "permitted" : "Not permitted"}</>
          ),
          subject: ({ key, value }) => (
            <>{value ? "permitted" : "Not permitted"}</>
          ),
          status: ({ key, value }) => (
            <>{value ? "permitted" : "Not permitted"}</>
          ),
          action: ({ key, value }) => (
            <div className="d-flex" style={{ gap: 20 }}>
              <a href="">
                <span className="themify-glyph-29"></span> Edit
              </a>
              <a href="">
                <span className="themify-glyph-165"></span> Delete
              </a>
            </div>
          ),
        }}
      />
    </>
  );
}
export default Support;
