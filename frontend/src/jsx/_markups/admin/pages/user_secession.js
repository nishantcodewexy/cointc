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
import { Link } from "react-router-dom";
import avartar5 from "../../../../images/avatar/5.png";
import avartar1 from "../../../../images/avatar/1.png";
import styled from "styled-components";

function UserSecessions() {
  return (
    <>
      <PageTitle activeMenu="Users secession" motherMenu="User Management" />
      {/* Details of Secession Request */}
      <Row style={{ marginBottom: 60 }}>
        <Col>
          <header className="mb-4">
            <h3>Details of Secession Request</h3>
          </header>
          <Card
            style={{
              padding: 10,
            }}
          >
            <SecessionRequestTable />
          </Card>
        </Col>
      </Row>

      {/* Secession Upon Approval */}
      <Row style={{ marginBottom: 60 }}>
        <Col>
          <header className="mb-4">
            <h3>Secession Upon Approval</h3>
          </header>
          <Card
            style={{
              padding: 10,
            }}
          >
            <ApprovedSecessionTable />
          </Card>
        </Col>
      </Row>
      {/* List of Secession Members */}
      <Row style={{ marginBottom: 60 }}>
        <Col>
          <header className="mb-4">
            <h3>List of Secession Members</h3>
          </header>
          <Card
            style={{
              padding: 10,
            }}
          >
            <PastSecessionListTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default UserSecessions;

function SecessionRequestTable() {
  const drop = (
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        className="table-dropdown i-false btn  tp-btn-light sharp"
      >
        <span class="fs--1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            version="1.1"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <rect x="0" y="0" width="24" height="24"></rect>
              <circle fill="#000000" cx="5" cy="12" r="2"></circle>
              <circle fill="#000000" cx="12" cy="12" r="2"></circle>
              <circle fill="#000000" cx="19" cy="12" r="2"></circle>
            </g>
          </svg>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#">Edit</Dropdown.Item>

        <Dropdown.Item href="#" className="text-danger">
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const permit = (
    <div className="d-flex" style={{ gap: 10 }}>
      <ButtonGroup size="sm" className="mb-2 mr-2">
        <Button variant="success">Accept</Button>
        <Button variant="danger">Deny</Button>
      </ButtonGroup>
    </div>
  );
  const chackbox = document.querySelectorAll(".user_permission_single input");
  const motherChackBox = document.querySelector(".user_permission input");
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
        id={`checkAll_user_permission_${i}`}
        required=""
        onClick={() => chackboxFun()}
      />
      <label
        className="custom-control-label"
        htmlFor={`checkAll_user_permission_${i}`}
      ></label>
    </div>
  );

  return (
    <>
      <Table responsive hover size="sm">
        <thead>
          <tr>
            <th className="user_permission">
              <div className="custom-control custom-checkbox mx-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="checkAll_user_permission_all"
                  onClick={() => chackboxFun("all")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkAll_user_permission_all"
                ></label>
              </div>
            </th>
            <th>Name</th>
            <th>User ID</th>
            <th>Phone Number</th>
            <th>Level</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{chack(1)}</td>
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
            </td>
            <td className="py-2">
              <a href="mailto:ricky@example.com">243465488</a>
            </td>
            <td className="py-2">
              <a href="tel:2012001851">(201) 200-1851</a>
            </td>
            <td className="py-2">1</td>
            <td className="py-2">{permit}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

function ApprovedSecessionTable() {
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
function PastSecessionListTable() {
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
