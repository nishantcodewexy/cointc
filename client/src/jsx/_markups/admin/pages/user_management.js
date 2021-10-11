import { Card, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import useToggler from "../../../_hooks/toggler.hook";
import Moment from "react-moment";
import moment from "moment";
// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";
import { ModalForm } from "../components/ModalForm.Component.jsx";
import UserForm from "../forms/user.form";

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

  let service = useService({
    get: group.listUsers,
    post: group.createUsers,
    put: group.updateUsers,
    drop: group.dropUsers,
  });

  const { data,  dispatchRequest } = service;
  useEffect(() => {
    dispatchRequest({
      type: "get",
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        "options[paranoid]": false,
      },
    });
  }, []);

  const handleChangePage = (e) => {
    setParams((prev) => ({ ...prev, q: e.target.value }));
  };
  const handleChangeRowsPerPage = (e) => {
    setParams((prev) => ({ ...prev, q: e.target.value }));
  };

  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onModalClose,
    toggledPayload: modalPayload,
  } = useToggler();

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 8) {
      setParams((prev) => ({ ...prev, q: "" }));
    }
  };
  /**
   * @function useFormRenderer
   * @param {Object} formData
   * @param {String} formData.method
   * @param {Object} formData.payload
   * @returns
   */
  function useFormRenderer(formData = { method: null, payload: null }) {
    const [title, form] = (() => {
      try {
        switch (formData?.method) {
          case "post":
            return [
              "Create new User",
              <UserForm.Create
                action={(requestPayload) =>
                  dispatchRequest({ type: "post", payload: requestPayload })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case "put":
            return [
              "Update User",
              <UserForm.Modify
                action={(requestPayload) =>
                  dispatchRequest({ type: "put", payload: requestPayload })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case "drop":
          case "delete":
            return [
              "Delete User",
              <UserForm.Delete
                action={(requestPayload) =>
                  dispatchRequest({ type: "drop", payload: requestPayload })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          default:
            return [null, null];
        }
      } catch (error) {
        console.error(
          "Must pass in method and payload key to the formData argument"
        );
      }
    })();
    return [
      title,
      <Row>
        <Col>{form}</Col>
      </Row>,
    ];
  }

  return (
    <>
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <div className="input-group search-area right d-lg-inline-flex d-none">
            {/*   <input
              value={params.q}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              className="form-control"
              placeholder="Find user here..."
            /> */}
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
            <Button onClick={() => onOpenModal({ method: "post" })}>
              <i className="fa fa-plus"></i> Add User
            </Button>
          )}
        </Col>
      </Row>

      <ModalForm
        useFormRenderer={useFormRenderer}
        formData={modalPayload}
        isOpen={isModalOpen}
        onClose={onModalClose}
      ></ModalForm>

      <Row>
        <Col>
          <Card>
            <TableGenerator
              mapping={{
                id: "user_id",
              }}
              {...{service}}
              omit="*"
              extras={[
                "user_id",
                "created_at",
                "email",
                "kyc_status",
                "status",
                "action",
              ]}
              transformers={{
                user_id: ({ row }) => row?.id,
                created_at: ({ row }) => {
                  let time = moment(row?.created_at);
                  return time.isValid() ? (
                    <Moment format="MMM Do, Y, hh:mm A">{time}</Moment>
                  ) : (
                    "unknown"
                  );
                },
                action: ({ row }) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <button
                        style={{
                          appearance: "none",
                          border: "none",
                          background: "none",
                        }}
                        onClick={() =>
                          onOpenModal({ method: "put", payload: row })
                        }
                      >
                        <span className="themify-glyph-29"></span> Edit
                      </button>
                      {/* TODO: Delete user */}
                      <button
                        style={{
                          appearance: "none",
                          border: "none",
                          background: "none",
                        }}
                        onClick={() =>
                          onOpenModal({ method: "delete", payload: row })
                        }
                      >
                        <span className="themify-glyph-165"></span> Delete
                      </button>
                    </div>
                  );
                },
                email: ({ row }) => row?.email,
                status: ({ row }) => (row?.archivedAt ? "inactive" : "Active"),
                kyc_status: ({ row }) => {
                  let role = row?.role;
                  const checkKYC = (kyc) => {
                    if (kyc) {
                      return Object.keys(kyc).some((item) => kyc[item] == null)
                        ? false
                        : true;
                    }
                    return false;
                  };

                  let status =
                    role == "admin"
                      ? "completed"
                      : checkKYC(row?.profile?.kyc)
                      ? "completed"
                      : "pending";

                  return status;
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UserManagement;
