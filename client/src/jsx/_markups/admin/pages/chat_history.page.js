import { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
// import useToggler from "../../../_hooks/toggler.hook";

// CONSTANTS
import { SERVICE } from "../../../_constants";

// COMPONENTS
import TableGenerator from "../components/tableGenerator.component";

function ChatHistory({ services, useService }) {
  const { useGroupService } = services;
  const group = useGroupService();

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: group.bulkRetrieveChatHistory,
  });

  const { data, dispatchRequest, isFetching } = service;

  useEffect(() => {
    dispatchRequest({ type: SERVICE.BULK_RETRIEVE });
  }, []);

  /* const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onModalClose,
    toggledPayload: modalPayload,
  } = useToggler();
 */
  /* function useFormRenderer(formData = { method: null, payload: null }) {}
   */
  return (
    <>
      <PageTitle activeMenu="History" motherMenu="Chat management" />
      <header className="mb-4">
        <h3>Chat History</h3>
      </header>
      <Row style={{ marginBottom: 20, width: "100%" }}>
        <Col>
          {isFetching ? (
            "Loading..."
          ) : data?.results?.length ? (
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
          ) : null}
        </Col>
        <Col sm="auto" style={{ padding: 0 }}></Col>
      </Row>

      <Row style={{ marginBottom: 60 }}>
        <Col>
          <Card>
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
