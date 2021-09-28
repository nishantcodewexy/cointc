import { Card, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";

function AuthSecurityMgmt() {
  return (
    <>
      <PageTitle activeMenu="Security List" motherMenu="Authentication Management" />
      <header className="mb-4">
        <h3>List of Security </h3>
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
      </Row>

      <Row style={{ marginBottom: 60 }}>
        <Col>
          <Card>
            <SecurityListTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function SecurityListTable() {
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

  const isKYC = (data) => {
    return (
      <>
        <div className="d-flex" style={{ gap: 20 }}>
          {data ? (
            <a href="" className="text-success">
              <span className="simple-check"></span> Yes
            </a>
          ) : (
            <a href="" className="text-danger">
              <span className="simple-close"></span> No
            </a>
          )}
        </div>
      </>
    );
  };
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
            <th>User name</th>
            <th className="">Email</th>
            <th className="">Mobile number</th>
            <th className="">OTP</th>
            <th className="">KYC</th>
          </tr>
        </thead>
        <tbody id="security_list">
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(1)}</td>
            <td className="py-2">Ali Shakir</td>
            <td className="py-2">Ali Shakir123@gmail.com</td>
            <td className="py-3 ">+1234567890</td>
            <td className="py-3 "> 565438</td>
            <td>{isKYC(false)}</td>
          </tr>
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(2)}</td>
            <td className="py-2">Peter Shakir</td>
            <td className="py-2">PeterAli@gmail.com</td>
            <td className="py-3 ">+1234567890</td>
            <td className="py-3 "> 565438</td>
            <td>{isKYC(true)}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default AuthSecurityMgmt;
