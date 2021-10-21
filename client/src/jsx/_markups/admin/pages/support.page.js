import { Card, Row, Col, Button, Dropdown, Table } from "react-bootstrap";
import { useEffect } from "react";
import PageTitle from "../layouts/PageTitle";
import useToggler from "../../../_hooks/toggler.hook";
// CONSTANTS
import { SERVICE } from "../../../_constants";

// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";

function Support({ services, useService }) {
  const { useGroupService } = services;
  const group = useGroupService();

  // console.log({ support_ticket });
  let service = useService({
    get: group.listSupportTickets,
  });

  const { dispatchRequest, isFetching } = service;

  useEffect(() => {
    dispatchRequest({ type: "get" });
  }, []);

  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onModalClose,
    toggledPayload: modalPayload,
  } = useToggler();

  function useFormRenderer(formData = { method: null, payload: null }) {}

  return (
    <>
      <PageTitle activeMenu="Support" motherMenu="Support management" />
      <header className="mb-4">
        <h3>Support Tickets</h3>
      </header>
      <Row style={{ marginBottom: 60 }}>
        <Col>
          <Card
            style={{
              padding: 10,
            }}
          >
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
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default Support;
