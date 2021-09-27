import { Card, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";

function ChatHistory() {
  return (
    <>
      <PageTitle activeMenu="History" motherMenu="Chat management" />
      <header className="mb-4">
        <h3>Chat History</h3>
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
            <ChatHistoryTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function ChatHistoryTable() {
  const chackbox = document.querySelectorAll(".chat_history_single input");
  const motherChackBox = document.querySelector(".chat_history input");
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
        id={`checkAll_chat_history_${i}`}
        required=""
        onClick={() => checkboxFun()}
      />
      <label
        className="custom-control-label"
        htmlFor={`checkAll_chat_history_${i}`}
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
            <th className="chat_history">
              <div className="custom-control custom-checkbox mx-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="checkAll_chat_history_all"
                  onClick={() => checkboxFun("all")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkAll_chat_history_all"
                ></label>
              </div>
            </th>
            <th>Creation date</th>
            <th className="">Visitor Email</th>
            <th className="">Country</th>
            <th className="">Browser</th>
            <th className="">Duratioin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="chat_history_single">{check(1)}</td>
            <td className="py-2">Wed May 05:11 12/04/2020</td>
            <td className="py-2">abc@mail.com</td>
            <td className="py-2">USA</td>
            <td className="py-2">Chrome (66.035.4545)</td>
            <td className="py-2">1 min</td>
            <td>{action}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default ChatHistory;
