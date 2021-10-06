import { Row, Col, Card, Button, Modal, Form} from "react-bootstrap";
import AdminBankDetailsTable from "../components/AdminBankDetails.Component";
import EmptyRecord from "../components/EmptyRecord.Component";
import useToggler from "../../../_hooks/toggler.hook";
import PageTitle from "../layouts/PageTitle";

function AdminBankDetails({ services, useService }) {
  const { group } = services;
  let { data, error, isFetching, dispatchRequest } = useService(
    { get: group.getKYC }
  );
  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onModalClose,
  } = useToggler();

  return (
    <>
      <PageTitle
        pageContent={
          <h2 className="font-w600 mb-2 mr-auto ">Admin Bank Details</h2>
        }
        activeMenu="Admin bank details"
        motherMenu="Dashboard"
      >
        <Row style={{ marginBottom: 20, width: "100%" }}>
          <Col></Col>
          <Col sm="auto" style={{ padding: 0 }}>
            <Button onClick={() => dispatchRequest({type:"post"})}>
              <i className="fa fa-plus"></i> Add New
            </Button>
          </Col>
        </Row>
      </PageTitle>

      <Row>
        <Col>
          <Card>
            {isFetching ? (
              <div>Loading...</div>
            ) : data?.length ? (
              <AdminBankDetailsTable data={data} />
            ) : (
              <EmptyRecord />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}

function modificationForm({ children, data: _data = {}, isOpen, onClose }) {
  return (
    <>
      {children}

      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add bank detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formCurrencyCode">
                  <Form.Label>Account number</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={_data?.account_no}
                    placeholder="Account number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCurrencyName">
                  <Form.Label>Bank name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={_data?.bank_name}
                    placeholder="Bank name"
                  />
                 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCurrencyType">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={_data?.ifsc_code}
                    placeholder="IFSC Code"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCurrencyType">
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={_data?.user_id?.toLowerCase()}
                    aria-label="Select User"
                  >
                    <option>Select user {_data?.user_id}</option>
                    <option value="user_id">Users</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminBankDetails;
