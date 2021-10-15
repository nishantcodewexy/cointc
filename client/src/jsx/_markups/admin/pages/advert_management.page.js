import { Card, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
// CONSTANTS
import { SERVICE } from "../../../_constants";

function AdvertsManagement() {
  return (
    <>
      <PageTitle activeMenu="" motherMenu="Advert management" />
      <header className="mb-4">
        <h3>Advertisements</h3>
      </header>
      <Row style={{ marginBottom: 20, width: "100%" }}>
        <Col>
        <div className="input-group search-area right d-lg-inline-flex d-none">
            <input
              type="text"
              className="form-control"
              placeholder="Filter in record"
            />
            {/* <div className="input-group-append">
              <span className="input-group-text">
                <Link to={"#"}>
                  <i className="themify-glyph-162"></i>
                </Link>
              </span>
            </div> */}
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
            <AdvertHistoryTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function AdvertHistoryTable() {
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
            <th>Creation date</th>
            <th className="">ID</th>
            <th className="">Username</th>
            <th className="">Trade type</th>
            <th className="">Currency pair</th>
            <th className="">Price set</th>
            <th className="">Order Limit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(1)}</td>
            <td className="py-3 ">2021-08-19 5:17:36</td>
            <td className="py-3">611de970add</td>
            <td className="py-2">wealwinsss</td>
            <td className="py-3 ">Buy</td>
            <td className="py-3 ">ETH/EUR</td>
            <td className="py-3">2139.68252 - EUR</td>
            <td className="py-3">1 - 10</td>
            <td>{action}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default AdvertsManagement;
