import { useEffect } from "react";
import { Card, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import useToggler from "../../../_hooks/toggler.hook";

// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";

function ChatHistory({ services, useService }) {
  const { useGroupService } = services;
  const group = useGroupService();

  let service = useService({
    get: group.listChatHistory,
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
      <PageTitle activeMenu="History" motherMenu="Chat management" />
      <header className="mb-4">
        <h3>Chat History</h3>
      </header>
      <Row style={{ marginBottom: 20, width: "100%" }}>
        <Col>
          <div className="input-group search-area right d-lg-inline-flex d-none">
            <input
              type="text"
              className="form-control"
              placeholder="Filter in record"
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <Link to={"#"}>
                  <i className="themify-glyph-162"></i>
                </Link>
              </span>
            </div>
          </div>
        </Col>
        <Col sm="auto" style={{ padding: 0 }}></Col>
      </Row>

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
              extras={[
                "creation_date",
                "visitor_email",
                "country",
                "browser",
                "duration",
                "action",
              ]}
              transformers={{
                creation_date: ({ key, value }) => (
                  <>{value ? "permitted" : "Not permitted"}</>
                ),
                visitor_email: ({ key, value }) => (
                  <>{value ? "permitted" : "Not permitted"}</>
                ),
                country: ({ key, value }) => (
                  <>{value ? "permitted" : "Not permitted"}</>
                ),
                browser: ({ key, value }) => (
                  <>{value ? "permitted" : "Not permitted"}</>
                ),
                duration: ({ key, value }) => (
                  <>{value ? "permitted" : "Not permitted"}</>
                ),
                action: ({ key, value }) => (
                  <>
                    <span className="themify-glyph-165"></span> Delete
                  </>
                ),
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ChatHistory;
