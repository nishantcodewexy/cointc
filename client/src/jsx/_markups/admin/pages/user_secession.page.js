import PageTitle from "../layouts/PageTitle";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";

// CONSTANTS
import { SERVICE } from "../../../_constants";

// COMPONENTS
import _components from "../components";
import TableGenerator from "../components/TableGenerator.Component";
import { ModalForm } from "../components/ModalForm.Component.jsx";
import UserForm from "../forms/user.form";
import avartar5 from "../../../../images/avatar/5.png";

const { IdenticonAvatar } = _components;

function UserSecessions(props) {
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
  return (
    <>
      <PageTitle activeMenu="Users secession" motherMenu="User Management" />
      {/* Details of Secession Request */}
      <Row>
        <Col style={{ marginBottom: 60 }}>
          <header className="mb-4">
            <h3>Details of Secession Request</h3>
          </header>
          <SecessionRequestTable
            {...props}
            {...{ notifySuccess, notifyError }}
          />
        </Col>
      </Row>

      {/* Secession Upon Approval */}
      <div style={{ marginBottom: 60 }}>
          <header className="mb-4">
            <h3>Secession Upon Approval</h3>
          </header>
          <ApprovedSecessionTable
            {...props}
            {...{ notifySuccess, notifyError }}
          />
      </div>
      
      {/* List of Secession Members */}
      <Row>
        <Col style={{ marginBottom: 60 }}>
          <header className="mb-4">
            <h3>List of Secession Members</h3>
          </header>
          <PastSecessionListTable {...props} />
        </Col>
      </Row>
    </>
  );
}
export default UserSecessions;

function SecessionRequestTable({
  services,
  useService,
  notifySuccess,
  notifyError,
}) {
  const { account } = services;

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: account.bulkRetrieveSecession,
  });
  const { dispatchRequest } = service;

  useEffect(() => {
    dispatchRequest({
      type: [SERVICE?.BULK_RETRIEVE],
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        "options[paranoid]": false,
      },
      toast: { success: notifySuccess, error: notifyError },
    });
  }, []);

  const permit = ({ row }) => {
    function handleChange(e, value) {
      console.log({ e, value });
      // TODO: Send update request to update permission
      // dispatchRequest({
      //   type: "put",
      //   payload: {
      //     permission: value
      //   }
      // });
    }
    return (
      <small className="d-flex" style={{ gap: 10, alignItems: "center" }}>
        Deny
        <Switch
          color="default"
          onChange={handleChange}
          name="permission"
          value={row?.permission}
          size="small"
        />
        Accept
      </small>
    );
  };

  return (
    <>
      <TableGenerator
        {...{ service }}
        mapping={{
          id: "User ID",
        }}
        omit="*"
        extras={["name", "user_id", "phone_number", "level", "permission"]}
        transformers={{
          name: ({ key, value, row }) => {
            return (
              <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div className="rounded-circle overflow-hidden img-fluid">
                      <IdenticonAvatar size={30} alt="" id={row.id} />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">
                      {row?.nickname || "Untitled"}
                    </h5>
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: 16, fontSize: 12 }}
                    >
                      <span>2 min</span>{" "}
                      <span>
                        <i
                          class="fa fa-star"
                          style={{ color: "#089248" }}
                          aria-hidden="true"
                        ></i>{" "}
                        2.5
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          },
          user_id: ({ row }) => {
            return <>{row?.id}</>;
          },
          level: ({ row }) => {
            return 1;
          },
          permission: permit,
          phone_number: ({ row }) => {
            return row?.profile?.kyc?.phone ? (
              <a href={`tel:${row?.profile?.kyc?.phone}`}>
                {row?.profile?.kyc?.phone}
              </a>
            ) : (
              <span className="badge light badge-danger">
                <i className="fa fa-circle text-danger mr-1" />
                Not specified
              </span>
            );
          },
        }}
      />
    </>
  );
}

function ApprovedSecessionTable({
  services,
  useService,
  notifySuccess,
  notifyError,
}) {
  const { account } = services;

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: account.bulkRetrieveSecession,
  });
  const { dispatchRequest } = service;
  useEffect(() => {
    dispatchRequest({
      type: [SERVICE?.BULK_RETRIEVE],
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        "options[paranoid]": false,
      },
      toast: { success: notifySuccess, error: notifyError },
    });
  }, []);

  const action = (
    <div className="d-flex " style={{ gap: 20 }}>
      <a href="#" className="themify-glyph-306"></a>
      <a href="#" className="themify-glyph-165"></a>
    </div>
  );
  /*  <th>ID</th>
            <th>Description</th>
            <th className="">Due date</th>
            <th>Approval status</th>
            <th>Approval Date</th>
            <th></th> */
  /*  <Button size="sm" variant="outline-light btn-rounded">
                <span className="mr-4 text-info">
                  <i className="fa fa-check color-success" />
                </span>
                Approved
              </Button> */
  return (
    <>
      <TableGenerator
        {...{ service }}
        mapping={{
          id: "User ID",
        }}
        omit="*"
        extras={["name", "user_id", "phone_number", "level", "permission"]}
        transformers={{
          name: ({ key, value, row }) => {
            return (
              <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div className="rounded-circle overflow-hidden img-fluid">
                      <IdenticonAvatar size={30} alt="" id={row.id} />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">
                      {row?.nickname || "Untitled"}
                    </h5>
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: 16, fontSize: 12 }}
                    >
                      <span>2 min</span>{" "}
                      <span>
                        <i
                          class="fa fa-star"
                          style={{ color: "#089248" }}
                          aria-hidden="true"
                        ></i>{" "}
                        2.5
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          },
          user_id: ({ row }) => {
            return <>{row?.id}</>;
          },
          level: ({ row }) => {
            return 1;
          },
          phone_number: ({ row }) => {
            return row?.profile?.kyc?.phone ? (
              <a href={`tel:${row?.profile?.kyc?.phone}`}>
                {row?.profile?.kyc?.phone}
              </a>
            ) : (
              <span className="badge light badge-danger">
                <i className="fa fa-circle text-danger mr-1" />
                Not specified
              </span>
            );
          },
        }}
      />
    </>
  );
}

function PastSecessionListTable({
  services,
  useService,
  notifySuccess,
  notifyError,
}) {
  const { account } = services;

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: account.bulkRetrieveSecession,
  });
  const { dispatchRequest } = service;
  useEffect(() => {
    dispatchRequest({
      type: [SERVICE?.BULK_RETRIEVE],
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        "options[paranoid]": false,
      },
      toast: { success: notifySuccess, error: notifyError },
    });
  }, []);

  /*  <th>User</th>
            <th>Email</th>
            <th className="">Last Invite Sent</th>
            <th>Role</th> */
  return (
    <>
      <TableGenerator
        {...{ service }}
        mapping={{
          id: "User ID",
        }}
        omit="*"
        extras={["user", "email", "last_invite_sent", "role"]}
        transformers={{
          user: ({ key, value, row }) => {
            console.log(row);
            return (
              <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div className="rounded-circle overflow-hidden img-fluid">
                      <IdenticonAvatar size={30} alt="" id={row.id} />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">
                      {row?.nickname || "Untitled"}
                    </h5>
                  </div>
                </div>
              </Link>
            );
          },
          email: ({ row }) => {
            return <>{row?.email}</>;
          },
          last_invite_sent: ({ row }) => {
            return 1;
          },
          role: ({ row }) => {
            return row?.role !== "admin" ? "Regular User" : "Admin";
          },
        }}
      />
    </>
  );
}
