import PageTitle from "../layouts/PageTitle";
import {
  Card,
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import useToggler from "../../../_hooks/toggler.hook";
import Moment from "react-moment";
import moment from "moment";
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
  return (
    <>
      <PageTitle activeMenu="Users secession" motherMenu="User Management" />
      {/* Details of Secession Request */}
      <Row>
        <Col style={{ marginBottom: 60 }}>
          <header className="mb-4">
            <h3>Details of Secession Request</h3>
          </header>
          <Card>
            <SecessionRequestTable {...props} />
          </Card>
        </Col>
      </Row>

      {/* Secession Upon Approval */}
      <Row>
        <Col style={{ marginBottom: 60 }}>
          <header className="mb-4">
            <h3>Secession Upon Approval</h3>
          </header>
          <Card>
            <ApprovedSecessionTable {...props} />
          </Card>
        </Col>
      </Row>
      {/* List of Secession Members */}
      <Row>
        <Col style={{ marginBottom: 60 }}>
          <header className="mb-4">
            <h3>List of Secession Members</h3>
          </header>
          <Card>
            <PastSecessionListTable
              {...props}
              {...{ notifySuccess, notifyError }}
            />
          </Card>
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
  const { useGroupService } = services;
  const group = useGroupService();

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: group.bulkRetrieveUser,
  });
  const { dispatchRequest } = service;

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
              <div className="media d-flex align-items-center">
                <div className="avatar avatar-xl mr-4">
                  <div className="rounded-circle overflow-hidden img-fluid">
                    <IdenticonAvatar size={30} alt="" id={row.id} />
                  </div>
                </div>
                <div className="media-body">
                  <div className="mb-0 fs--1">
                    <Link to="/to_user_information">
                      {row?.nickname || "Untitled"}
                    </Link>
                  </div>
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

function ApprovedSecessionTable({ notifySuccess, notifyError }) {
  const action = (
    <div className="d-flex " style={{ gap: 20 }}>
      <a href="#" className="themify-glyph-306"></a>
      <a href="#" className="themify-glyph-165"></a>
    </div>
  );

  const chackbox = document.querySelectorAll(".user_membership_single input");
  const motherChackBox = document.querySelector(".user_membership input");
  // console.log(document.querySelectorAll(".publish_review input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  const chack = (i) => (
    <div className={`custom-control custom-checkbox ml-2`}>
      <input
        type="checkbox"
        className="custom-control-input "
        id={`checkAll_user_membership_${i}`}
        required=""
        onClick={() => chackboxFun()}
      />
      <label
        className="custom-control-label"
        htmlFor={`checkAll_user_membership_${i}`}
      ></label>
    </div>
  );

  return (
    <>
      <Table striped responsive size="sm">
        <thead>
          <tr>
            <th className="user_membership">
              <div className="custom-control custom-checkbox mx-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="checkAll_user_membership_all"
                  onClick={() => chackboxFun("all")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkAll_user_membership_all"
                ></label>
              </div>
            </th>
            <th>ID</th>
            <th>Description</th>
            <th className="">Due date</th>
            <th>Approval status</th>
            <th>Approval Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="user_membership">
          <tr className="btn-reveal-trigger mb-2">
            <td className="user_membership_single">{chack(1)}</td>
            <td className="py-3">ABCD123</td>
            <td className="py-2" style={{}}>
              Sweet liquence pie gedvfs
            </td>
            <td className="py-2">21 JAN 2021</td>
            <td className="py-2 wspace-no">
              <Button size="sm" variant="outline-light btn-rounded">
                <span className="mr-4 text-info">
                  <i className="fa fa-check color-success" />
                </span>
                Approved
              </Button>
            </td>
            <td>
              <span>05 FEB 2021</span>
            </td>
            <td className="py-2 text-right">{action}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
function PastSecessionListTable({ notifySuccess, notifyError }) {
  const chackbox = document.querySelectorAll(
    ".user_past_secession_single input"
  );
  const motherChackBox = document.querySelector(".user_past_secession input");
  // console.log(document.querySelectorAll(".publish_review input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  const chack = (i) => (
    <div className={`custom-control custom-checkbox ml-2`}>
      <input
        type="checkbox"
        className="custom-control-input "
        id={`checkAll_user_past_secession_${i}`}
        required=""
        onClick={() => chackboxFun()}
      />
      <label
        className="custom-control-label"
        htmlFor={`checkAll_user_past_secession_${i}`}
      ></label>
    </div>
  );

  return (
    <>
      <Table striped responsive size="sm">
        <thead>
          <tr>
            <th className="user_past_secession">
              <div className="custom-control custom-checkbox mx-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="checkAll_user_past_secession_all"
                  onClick={() => chackboxFun("all")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkAll_user_past_secession_all"
                ></label>
              </div>
            </th>
            <th>User</th>
            <th>Email</th>
            <th className="">Last Invite Sent</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody id="user_past_secession">
          <tr className="btn-reveal-trigger mb-2">
            <td className="user_past_secession_single">{chack(1)}</td>
            <td className="py-3">
              <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div className="">
                      <img
                        className="rounded-circle img-fluid"
                        src={avartar5}
                        width="30"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">Ricky Antony</h5>
                  </div>
                </div>
              </Link>
            </td>
            <td className="py-2" style={{}}>
              Punit Suthar54@gmail.com
            </td>
            <td className="py-2">5 Months ago</td>

            <td>
              <span>Regular User</span>
            </td>
          </tr>
          <tr className="btn-reveal-trigger mb-2">
            <td className="user_past_secession_single">{chack(1)}</td>
            <td className="py-3">
              <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div className="">
                      <img
                        className="rounded-circle img-fluid"
                        src={avartar5}
                        width="30"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">Rohit Binary</h5>
                  </div>
                </div>
              </Link>
            </td>
            <td className="py-2" style={{}}>
              Rohit Binary322gmail.com
            </td>
            <td className="py-2">1 Months ago</td>

            <td>
              <span>Admin</span>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
