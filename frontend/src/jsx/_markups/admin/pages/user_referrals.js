import { Card, Row, Col, Table } from "react-bootstrap";
import PageTitle from "../layouts/PageTitle";

function UserReferralMgmt() {
  return (
    <>
      <PageTitle activeMenu="User Referrals" motherMenu="User Management" />
      <Row style={{ marginBottom: 60 }}>
        <Col>
          <Card
            style={{
              padding: 10,
            }}
          >
            <UserReferralsTable />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function UserReferralsTable() {
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
            <th>Date</th>
            <th className="">Referrer ID</th>
            <th>Referree ID</th>
            <th>Commision (%)</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(1)}</td>
            <td className="py-3">22/08/2020</td>

            <td className="py-2">
              <a href=""> KD13wewsd</a>
            </td>
            <td className="py-2">
              <a href="">HG3esfms</a>
            </td>
            <td className="py-2 ">10</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default UserReferralMgmt;
