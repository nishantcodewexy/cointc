import { Card, Row, Col, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import PageTitle from "../layouts/PageTitle";
// CONSTANTS
import { SERVICE } from "../../../_constants";
import TableGenerator from "../components/TableGenerator.Component";
import { Switch } from "@mui/material";
import Moment from "react-moment";

function UserKYCMgmt({services, useService}) {

  const {account} = services

  const data = services

  
  let service = useService({
    [SERVICE?.RETRIEVE]: account.retrieveUser,
    [SERVICE?.UPDATE]: account.updateKYC,
    [SERVICE?.DROP]: account.removeUser,
    [SERVICE?.BULK_CREATE]: account.bulkCreateUser,
    [SERVICE?.BULK_RETRIEVE]: account.getKYC,
  });


  const { dispatchRequest } = service;


  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE,
      payload: {
        "sudo": true,
        "fake": true,
      },
      toast: { success: notifySuccess, error: notifyError },
    });
  }, []);


  function Permit({ key, row }) {
    const [status, setStatus] = useState(row?.status);
    const KYCStatus = status === 'ACCEPT' ? true : false
    const { account: _account } = services;

    let { dispatchRequest: _d } = useService({
      [SERVICE?.UPDATE]: _account?.updateKYC,
    });

    function handleChange(e, value) {
      let status = value === true ? 'ACCEPT' : "DENY"
      _d({
        type: SERVICE?.UPDATE,
        payload: { id: row?.id, data: { kyc: [{status: status }] }},
        reload: false,
        toast: { success: notifySuccess, error: notifyError },
      });
      setStatus(status);
    }

    return (
      <small className="d-flex" style={{ gap: 10, alignItems: "center" }}>
        <strong
          className="text-danger"
          style={{ opacity: !KYCStatus ? 1 : 0.5 }}
        >
          Deny
        </strong>
        <Switch
          color={"default"}
          name={row?.id}
          onChange={handleChange}
          checked={KYCStatus}
        />
        <strong
          className="text-success"
          style={{ opacity: KYCStatus ? 1 : 0.5 }}
        >
          Accept
        </strong>
      </small>
    );
  }

  return (
    <>
      <PageTitle activeMenu="KYC" motherMenu="User management" />
      <header className="mb-4">
        <h3>KYC List</h3>
      </header>
      
      <>
      <TableGenerator
        {...{ service }}
        mapping={{
          id: "USER ID",
          createdAt: "joined",
        }}
        omit="*"
        extras={[
          "category",
          "email",
          "phone_number",
          "status",
          "date",
          "action",
        ]}
        transformers={{
          category: ({row}) => row?.type,
          email: ({row}) => row?.user?.email,
          phone_number: ({row}) => row?.user?.phone,
          status: ({row}) => row?.status,
          date: ({ row }) => {
            return (
              <Moment format="YYYY/MM/DD" date={row?.createdAt} />
            );
          },
          action: Permit
        }}
      />
    </>
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
function notifySuccess() {
  toast.success("Success !", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

function notifyError(error) {
  toast.error(error || "Request Error!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}