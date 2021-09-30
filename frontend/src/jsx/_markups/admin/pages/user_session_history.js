import { Card, Row, Col, Button, Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";

function UserSessionHistory() {
  return <>
      <PageTitle activeMenu="Session History" motherMenu="User Management" />
      <Row style={{ marginBottom: 60 }}>
        <Col>
          <Card
            style={{
              padding: 10,
            }}
          >
            <UserSessionHistoryTable />
          </Card>
        </Col>
      </Row>
    </>
}
function UserSessionHistoryTable() {
  
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

  const check = (i) => (
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
            <th>Username</th>
            <th>Duration</th>
            <th>Last seen</th>
            <th className="pl-5 width200">Login</th>
            <th>Logout</th>
            <th>Login status</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(1)}</td>
            <td className="py-3">
              <Link to="/ecom-customers">
                <div className="media d-flex align-items-center">
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">Ricky Antony</h5>
                  </div>
                </div>
              </Link>
            </td>
            <td className="py-2">
              <a href="mailto:ricky@example.com">
              27 min
              </a>
            </td>
            <td className="py-2">
              <a href="mailto:ricky@example.com">
                <span className="fa fa-circle text-success" style={{fontSize: 12}}></span> 2 min ago
              </a>
            </td>
            <td className="py-2">
              {" "}
              <a href="tel:2012001851">May 28, 2020 3:34 pm</a>
            </td>
            <td className="py-2 pl-5 wspace-no">-</td>
            <td className="py-2">Logged In</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default UserSessionHistory;
