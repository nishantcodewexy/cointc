import { useEffect } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import PageTitle from "../layouts/PageTitle";

// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";

function UserBalance({ services, useService }) {
  const { useGroupService } = services;
  const group = useGroupService();
  let { data, error, isFetching, dispatchRequest } = useService({
    get: group.listUsers,
  });

  useEffect(() => {
    dispatchRequest({ type: "get" });
  }, []);
  return (
    <>
      <PageTitle activeMenu="User Balance" motherMenu="User Management" />
      <Row style={{ marginBottom: 60 }}>
        <Col>
        <header className="mb-4">
            <h3>User Balances</h3>
          </header>
          <Card>
            <TableGenerator
              data={data?.results}
              mapping={{}}
              omit="*"
              transformers={{}}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function UserBalanceTable() {
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
            <th>Email</th>
            <th className="pl-5 width200">Currency</th>
            <th>Spot Wallet</th>
            <th>Locket Balance</th>
          </tr>
        </thead>
        <tbody id="customers">
          <tr className="btn-reveal-trigger">
            <td className="user_permission_single">{check(1)}</td>
            <td className="py-3">abc@gmail.com</td>
            <td className="py-2 pl-5 width200">USDT</td>
            <td className="py-2">00.7757575</td>
            <td className="py-2">00.7757575</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default UserBalance;
