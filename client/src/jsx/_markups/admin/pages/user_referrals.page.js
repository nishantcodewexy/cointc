import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Table } from "react-bootstrap";
import Moment from 'react-moment'
// CONSTANTS
import { SERVICE } from "../../../_constants";

// COMPONENTS
import PageTitle from "../layouts/PageTitle";
import _components from "../components";
import TableGenerator from "../components/TableGenerator.Component";

const { IdenticonAvatar } = _components;

function UserReferralMgmt({ services, useService }) {
  let { account } = services;
  const bulkReferralPayload = {
    // "order[createdAt]": "DESC",
    "group[name]": "referee_id",
    "filter[User.role]": "basic",
  };
  let accountService = useService({
    [SERVICE?.BULK_RETRIEVE]: (_p = bulkReferralPayload) =>
      account.bulkRetrieveReferral(_p),
    [SERVICE?.BULK_REMOVE]: account.bulkRetrieveReferral,
  });
  const { dispatchRequest } = accountService;
  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE,
    });
  }, []);
  return (
    <>
      <PageTitle activeMenu="User Referrals" motherMenu="User Management" />

      <div style={{ marginBottom: 60 }}>
        <header className="mb-4">
          <h3>Referrals</h3>
        </header>

        <TableGenerator
          service={accountService}
          omit="*"
          mapping={{
            commision: "commision (%)",
          }}
          extras={["date", "user", "referee_id"]}
          transformers={{
            date: ({ row }) => {
              return (
                <Moment format="DD/MM/YYYY">{row?.User?.createdAt}</Moment>
              );
            },
            user: ({ row }) => {
              return (
                <Link to="/to_user_information">
                  <div className=" d-flex align-items-center">
                    <div
                      className="avatar avatar-lg mr-4 rounded-circle"
                      style={{ border: "1px solid #ededed" }}
                    >
                      <div
                        className=" img-fluid overflow-hidden"
                        style={{ maxWidth: 50, borderRadius: "100%" }}
                      >
                        <IdenticonAvatar size={30} alt="" id={row?.user_id} />
                      </div>
                    </div>
                    <div className="media-body">
                      <h5 className="mb-0 fs--1">
                        {row?.User?.BasicProfile?.nickname || "Untitled"}
                      </h5>
                      {/* <span>
                Last contact:{" "}
                <Moment format="DD.MM.YYYY">{row?.updatedAt}</Moment>
              </span> */}
                    </div>
                  </div>
                </Link>
              );
            },
            referee_id: ({row}) => row?.referee_id,
          }}
        />
      </div>
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
