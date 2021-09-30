import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Dropdown } from "react-bootstrap";

function UserManagement() {
  return (
    <>
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <div className="input-group search-area right d-lg-inline-flex d-none">
            <input
              type="text"
              className="form-control"
              placeholder="Find user here..."
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <Link to={"#"}>
                  <i className="simple-magnifier"></i>
                </Link>
              </span>
            </div>
          </div>
        </Col>
        <Col sm="auto">
        <Button size="sm">
              <i className="fa fa-plus"></i>{" "}
              Add User
            </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card
            style={{
              padding: 10,
            }}
          >
            <UsersTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UserManagement;

function UsersTable() {
  const action = (
    <div className="d-flex" style={{gap: 20}}>
      <a href="">
        <span className="themify-glyph-29"></span>{" "}Edit
      </a>
      <a href="">
        <span className="themify-glyph-165"></span>{" "}Delete
      </a>
    </div>
  );

  const chackbox = document.querySelectorAll(".customer_shop_single input");
  const motherChackBox = document.querySelector(".customer_shop input");
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
        id={`checkAll${i}`}
        required=""
        onClick={() => chackboxFun()}
      />
      <label className="custom-control-label" htmlFor={`checkAll${i}`}></label>
    </div>
  );

  return (
    <>
      <table className="table mb-0 table-striped respon-table-data">
        <thead>
          <tr>
            <th className="customer_shop">
              <div className="custom-control custom-checkbox mx-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="checkAll"
                  onClick={() => chackboxFun("all")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkAll"
                ></label>
              </div>
            </th>
            <th>User ID</th>
            <th>Email</th>
            <th>KYC Status</th>
            <th className="pl-5 width200">Status</th>
            <th>Joined</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="customer_shop_single">{chack(1)}</td>
            <td className="py-3">
              <Link to="">
                <div className="media d-flex align-items-center">
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">122y38eer8er227ewds</h5>
                  </div>
                </div>
              </Link>
            </td>
            <td className="py-2">
              <a href="mailto:ricky@example.com">user@example.com</a>
            </td>
            <td className="py-2">
              <a href="tel:2012001851">Not verified</a>
            </td>
            <td className="py-2 pl-5 wspace-no">Active</td>
            <td className="py-2">30/03/2018</td>
            <td className="py-2 text-right">{action}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
