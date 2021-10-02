import { Row, Col, Card, Button,  Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";

function AdminBankDetails() {
  const checkbox = document.querySelectorAll(".customer_shop_single input");
  const motherChackBox = document.querySelector(".customer_shop input");
  // console.log(document.querySelectorAll(".publish_review input")[0].checked);

  const action = (
    <div className="d-flex" style={{gap: 20}}>
      <a href="#">
        <span className="themify-glyph-29"></span>{" "}Edit
      </a>
      <a href="#">
        <span className="themify-glyph-165"></span>{" "}Delete
      </a>
    </div>
  );

  const checkboxFun = (type) => {
    for (let i = 0; i < checkbox.length; i++) {
      const element = checkbox[i];
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
        id={`checkAll${i}`}
        required=""
        onClick={() => checkboxFun()}
      />
      <label className="custom-control-label" htmlFor={`checkAll${i}`}></label>
    </div>
  );

  return (
    <>
      <PageTitle
        pageContent={
          <h2 className="font-w600 mb-2 mr-auto ">Admin Bank Details</h2>
        }
        activeMenu="Admin bank details"
        motherMenu="Dashboard"
      >
        <Row style={{ marginBottom: 20, width: "100%" }}>
          <Col></Col>
          <Col sm="auto" style={{ padding: 0 }}>
            <Button size="sm">
              <i className="fa fa-plus"></i>{" "}
              Add New
            </Button>
          </Col>
        </Row>
      </PageTitle>

      <Row>
        <Col>
          <Card>
            <Table responsive hover size="sm">
              <thead>
                <tr>
                  <th className="customer_shop">
                    <div className="custom-control custom-checkbox mx-2">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkAll"
                        onClick={() => checkboxFun("all")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="checkAll"
                      ></label>
                    </div>
                  </th>
                  <th>Account number</th>
                  <th>Bank name</th>
                  <th>IFSC Code</th>
                  <th className="pl-5 width200">Country</th>
                  <th>Creation date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="customers">
                <tr className="btn-reveal-trigger">
                  <td className="customer_shop_single">{check(1)}</td>
                  <td className="py-3">
                    <Link to="/ecom-customers">
                      <div className="media d-flex align-items-center">
                        <div className="media-body">
                          <h5 className="mb-0 fs--1">123434342232</h5>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-2">
                    <a href="mailto:ricky@example.com">UBA</a>
                  </td>
                  <td className="py-2">
                    {" "}
                    <a href="tel:2012001851">201-200-1851</a>
                  </td>
                  <td className="py-2 pl-5 wspace-no">China</td>
                  <td className="py-2">30/03/2018</td>
                  <td className="py-2 text-right">{action}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AdminBankDetails;
