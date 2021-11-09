import {  Row, Col, Button } from "react-bootstrap";
import { useEffect, useState, Suspense, lazy } from "react";
import Moment from "react-moment";
import moment from "moment";
import { toast } from "react-toastify";
import { Popper } from "@mui/material";
// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";
import { ModalForm } from "../components/ModalForm.Component.jsx";
import useToggler from "../../../_hooks/toggler.hook";
import UserForm from "../forms/user.form";

// CONSTANTS
import { SERVICE } from "../../../_constants";

function UserManagement({ services, useService }) {
  const { account } = services;

  // register services
  let service = useService({
    [SERVICE?.RETRIEVE]: account.retrieveUser,
    [SERVICE?.UPDATE]: account.updateUser,
    [SERVICE?.DROP]: account.removeUser,
    [SERVICE?.BULK_CREATE]: account.bulkCreateUser,
    [SERVICE?.BULK_RETRIEVE]: account.bulkRetrieveUser,
  });

 

  const { dispatchRequest } = service;

  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE,
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        "sudo": true,
        "fake": true,
        paranoid: false,
      },
      toast: { success: notifySuccess, error: notifyError },
    });
  }, []);

  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onModalClose,
    toggledPayload: modalPayload,
  } = useToggler();

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 8) {
      // setParams((prev) => ({ ...prev, q: "" }));
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
    // const UserForm = lazy(()=>import('../forms/user'))
    const [title, form] = (() => {
      try {
        switch (formData?.method) {
          case SERVICE?.CREATE:
            return [
              "Create new User",
              <UserForm
                action={(data) =>
                  dispatchRequest({ type: SERVICE?.CREATE, payload: data })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case SERVICE?.UPDATE:
            return [
              "Update User",
              <UserForm.Update
                action={(data) =>
                  dispatchRequest({
                    type: SERVICE?.UPDATE,
                    payload: { id: formData?.payload.id, data },
                  })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];

          case SERVICE?.REMOVE:
            return [
              "Delete User",
              <UserForm.Remove
                action={(data) =>
                  dispatchRequest({
                    type: SERVICE?.DROP,
                    payload: { id: formData?.payload.id, data },
                  })
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
          <Button onClick={() => onOpenModal({ method: SERVICE?.CREATE })}>
            <i className="fa fa-plus"></i> Add User
          </Button>
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
          <TableGenerator
           
            {...{ service }}
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

              email: ({ row }) => row?.email,
              status: ({ row }) => {
                return row?.archived_at ? (
                  <span className="badge light badge-danger">
                    <i className="fa fa-circle text-danger mr-1" />
                    archived
                  </span>
                ) : (
                  <span className="badge light badge-success">
                    <i className="fa fa-circle text-success mr-1" />
                    Active
                  </span>
                );
              },
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
                  role == "admin" ? (
                    <small className="badge badge-success text-white">
                      <i className="fa fa-check-circle text-white mr-2" />
                      completed
                    </small>
                  ) : checkKYC(row?.kyc) ? (
                    <small className="badge badge-success">completed</small>
                  ) : (
                    <small className="badge badge-default text-white">
                      pending
                    </small>
                  );

                return status;
              },

              action: function Action({ row }) {
                const {
                  isOpen,
                  onOpen: onPopoverOpen,
                  onClose: onPopoverClose,
                  toggledPayload: popOverTarget,
                } = useToggler();
                const handleClick = (event) => {
                  alert('Gomand')
                  // onPopoverOpen(popOverTarget ? null : event.currentTarget);
                  // onPopoverOpen(popOverTarget ? null : event.target);
                };

                /* const handleClose = () => {
                    onPopoverClose(null);
                  }; */

                const open = Boolean(popOverTarget);
                const id = open ? row?.id : undefined;

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
                        fontSize: 12,
                      }}
                      onClick={() =>
                        onOpenModal({ method: SERVICE?.UPDATE, payload: row })
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
                        position: "relative",
                        fontSize: 12,
                      }}
                      aria-describedby={id}
                      variant="contained"
                      onClick={handleClick}
                    >
                      <span className="themify-glyph-165"></span> Delete
                    </button>

                    {id && (
                      <Popper id={id} open={isOpen} anchorEl={popOverTarget}>
                        <ul
                          className="bg-white shadow"
                          style={{
                            padding: 10,
                          }}
                        >
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                onOpenModal({
                                  method: SERVICE?.REMOVE,
                                  payload: { ...row, force: false },
                                })
                              }
                            >
                              <small>Delete</small>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                onOpenModal({
                                  method: SERVICE?.REMOVE,
                                  payload: { ...row, force: true },
                                })
                              }
                            >
                              <small>Permanently delete</small>
                            </a>
                          </li>
                        </ul>
                      </Popper>
                    )}
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>
    </>
  );
}

export default UserManagement;
function notifySuccess() {
  toast.success("Success !", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

function notifyError(error) {
  toast.error(error || "Request Error!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}