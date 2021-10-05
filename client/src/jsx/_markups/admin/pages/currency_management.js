import { Card, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
// import { useEffect, useState } from "react";
import _services from "../../../_services";
import useService from "../../../_hooks/service.hook";

const { group } = _services;

function Test() {
  // const { data, error } = useService(group.getCurrency);

  return <div>Just testing</div>;
}

export default Test;

function CurrencyMgmt() {
  // use group getCurrency service
  const { data, error } = useService(group.getCurrency);

  return (
    <>
      <PageTitle activeMenu="" motherMenu="Currencies" />
      <header className="mb-4">
        <h3>Currency List</h3>
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
          <Button size="md">
            <i className="fa fa-plus"></i> Add Currency
          </Button>
        </Col>
      </Row>

      <Row style={{ marginBottom: 60 }}>
        <Col>
          <Card
            style={{
              padding: 10,
            }}
          >
            <CurrencyTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function CurrencyTable() {
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
            <th>Currency ID</th>
            <th className="pl-5 width200">Symbol</th>
            <th className="pl-5 width200">Full name</th>
            <th className="pl-5 width200">Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(1)}</td>
            <td className="py-2">611cd709add0d239c</td>
            <td className="py-3 pl-5 width200">BTC</td>
            <td className="py-3 pl-5 width200"> Bitcoin</td>
            <td className="py-3 pl-5 width200">Crypto</td>

            <td>{action}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

// export default CurrencyMgmt;
CurrencyMgmt.displayName = "Currency Management";
