import { Card, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";

function UserKYCMgmt() {
  return (
    <>
      <PageTitle activeMenu="KYC" motherMenu="User management" />
      <header className="mb-4">
        <h3>KYC List</h3>
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
        <Col sm="auto" style={{ padding: 0 }}>
         
        </Col>
      </Row>

      <Row style={{ marginBottom: 60 }}>
        <Col>
          <Card
            style={{
              padding: 10,
            }}
          >
            <KYCHistoryTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function KYCHistoryTable() {
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

  const action = (
    <div className="d-flex" style={{ gap: 20 }}>
      <a href="">
        <span className="themify-glyph-29"></span> Edit
      </a>
      <a href="">
        <span className="themify-glyph-165"></span> Delete
      </a>
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
            <th>Category</th>
            <th className="pl-5 width200">Email</th>
            <th className="pl-5 width200">Phone number</th>
            <th className="pl-5 width200">Status</th>
            <th className="pl-5 ">Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(1)}</td>
            <td className="py-2">preethiPC</td>
            <td className="py-3 pl-5 width200">preethipc@yopmail.com</td>
            <td className="py-3 pl-5 width200"> (+123) 190 456789</td>
            <td className="py-3 pl-5 width200">Approved</td>
            <td className="py-3 pl-5">02-09-2021 11:56:28</td>

            <td>{action}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default UserKYCMgmt;
