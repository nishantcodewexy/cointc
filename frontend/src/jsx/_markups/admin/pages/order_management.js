import avartar1 from "../../../../images/avatar/1.png";
import avartar4 from "../../../../images/avatar/4.png";
import { Card, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";

function OrdersManagement() {
  return (
    <>
      <PageTitle activeMenu="" motherMenu="Advert management" />
      <header className="mb-4">
        <h3>Orders</h3>
      </header>
      <Row style={{ marginBottom: 20, width: "100%" }}>
        <Col>
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
        </Col>
        <Col sm="auto" style={{ padding: 0 }}></Col>
      </Row>

      <Row style={{ marginBottom: 60 }}>
        <Col>
          <Card
            style={{
              padding: 10,
            }}
          >
            <OrderHistoryTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function OrderHistoryTable() {
  const chackbox = document.querySelectorAll(".user_permission_single input");
  const motherChackBox = document.querySelector(".user_permission input");
  // console.log(document.querySelectorAll(".publish_review input")[0].checked);
  const checkboxFun = (type) => {
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
        onClick={() => checkboxFun()}
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
                  onClick={() => checkboxFun("all")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkAll_user_permission_all"
                ></label>
              </div>
            </th>
            <th className="">ID</th>
            <th className="">Username</th>
            <th className="">Payment</th>
            <th className="">Time remaining</th>
            <th className="">Type</th>
            <th className="">Status</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(1)}</td>
            <td className="py-3">611de970add</td>
            <td className="py-3 ">
              <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div className="">
                      <img
                        className="rounded-circle img-fluid"
                        src={avartar1}
                        width="30"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">Alice Krejcova</h5>
                  </div>
                </div>
              </Link>
            </td>
            <td className="py-2">Cash</td>
            <td className="py-3 ">13 min</td>
            <td className="py-3 ">Delivery</td>
            <td className="py-3">
              <span
                className="fa fa-circle text-success"
                style={{ fontSize: 12 }}
              ></span>{" "}
              Delivered
            </td>
            <td className="py-3">$245.00</td>
            <td className="py-3 ">2021-08-19 5:17:36</td>
          </tr>
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(1)}</td>
            <td className="py-3">611de970add</td>
            <td className="py-3 ">
            <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div className="">
                      <img
                        className="rounded-circle img-fluid"
                        src={avartar4}
                        width="30"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">Felix James</h5>
                  </div>
                </div>
              </Link>
            </td>
            <td className="py-2">Cash</td>
            <td className="py-3 ">37 min</td>
            <td className="py-3 ">Delivery</td>
            <td className="py-3">
              <span
                className="fa fa-circle text-danger"
                style={{ fontSize: 12 }}
              ></span>{" "}
              Cancelled
            </td>
            <td className="py-3">$643.00</td>
            <td className="py-3 ">2021-08-19 5:17:36</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default OrdersManagement;
