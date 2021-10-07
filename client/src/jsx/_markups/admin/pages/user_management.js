import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import UsersTable from "../tables/user.table";
import { useEffect, useState } from "react";
import UserForm from "../forms/user.form";
import useToggler from "../../../_hooks/toggler.hook";

// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";

function UserManagement({ services, useService }) {
  const { useGroupService } = services;
  const group = useGroupService();

  const [params, setParams] = useState({
    q: "",
    limit: 10,
    offset: 10,
    // data: {
    //   name: "akan",
    //   data: {
    //     newName: "akan",
    //   },
    // },
  });

  let { data, error, isFetching, dispatchRequest } = useService({
    get: group.listUsers,
  });

  useEffect(() => {
    dispatchRequest({ type: "get" });
  }, []);

  const handleChange = (e) => {
    setParams((prev) => ({ ...prev, q: e.target.value }));
  };

  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onModalClose,
  } = useToggler();

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 8) {
      setParams((prev) => ({ ...prev, q: "" }));
    }
  };

  const actions = (id) => <></>;
  return (
    <>
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <div className="input-group search-area right d-lg-inline-flex d-none">
            <input
              value={params.q}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              className="form-control"
              placeholder="Find user here..."
            />
            {/* <div className="input-group-append">
              <span className="input-group-text">
                <Link to={"#"}>
                  <i className="simple-magnifier"></i>
                </Link>
              </span>
            </div> */}
          </div>
        </Col>
        <Col sm="auto">
          {data && (
            <ModifierForm
              action={(payload) => dispatchRequest({ type: "post", payload })}
              isOpen={isModalOpen}
              onClose={onModalClose}
            >
              <Button onClick={onOpenModal}>
                <i className="fa fa-plus"></i> Add User
              </Button>
            </ModifierForm>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <TableGenerator
              data={data?.results}
              actions={actions}
              mapping={{}}
              omit={[
                "archived_at",
                "created_by",
                "createdAt",
                "updatedAt",
                "updated_at",
                "created_at",
                "profile",
              ]}
              transformers={{
                permission: ({ key, value }) => (
                  <>{value ? "permitted" : "Not permitted"}</>
                ),
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

function ModifierForm({ action, children, data: _data = {}, isOpen, onClose }) {
  return (
    <>
      {children}
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <UserForm.Modify action={action} callback={onClose} />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UserManagement;
