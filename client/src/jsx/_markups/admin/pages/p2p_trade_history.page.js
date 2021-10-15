
import { Card, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
// CONSTANTS
import { SERVICE } from "../../../_constants";

function P2PTrades() {
  return (
    <>
      <PageTitle activeMenu="Trade history" motherMenu="P2P Trade management" />
      <header className="mb-4">
        <h3>Trade History</h3>
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
            <TraceHistoryTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function TraceHistoryTable() {
  const chackbox = document.querySelectorAll(".p2p_trade_history_single input");
  const motherChackBox = document.querySelector(".p2p_trade_history input");
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
        id={`checkAll_p2p_trade_history_${i}`}
        required=""
        onClick={() => checkboxFun()}
      />
      <label
        className="custom-control-label"
        htmlFor={`checkAll_p2p_trade_history_${i}`}
      ></label>
    </div>
  );

  return (
    <>
      <Table responsive hover size="sm">
        <thead>
          <tr>
            <th className="p2p_trade_history">
              <div className="custom-control custom-checkbox mx-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="checkAll_p2p_trade_history_all"
                  onClick={() => checkboxFun("all")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkAll_p2p_trade_history_all"
                ></label>
              </div>
            </th>
            <th className="">Creation date</th>
            <th className="">ID</th>
            <th className="">Buyer Email</th>
            <th className="">Seller Email</th>
            <th className="">Trade type</th>
            <th className="">Currency pair</th>
            <th className="">Price</th>
            <th className="">Fiat amount</th>
            <th>Total crypto</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="p2p_trade_history_single">{check(1)}</td>
            <td className="py-3">25-08-2021 12:03:11</td>
            <td className="py-2">6125e4278cad ad4a4eb4ea24</td>
            <td className="py-2">wealwintest @gmail.com</td>
            <td className="py-3 ">wealwin1@ yopmail.com</td>
            <td className="py-3 ">Buy</td>
            <td className="py-3">BTC/GBP</td>
            <td className="py-3">236674459936- GBP</td>
            <td className="py-3 ">10</td>
            <td className="py-3 ">0.000422624921231 - BTC</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default P2PTrades;
