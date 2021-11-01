import {  Row, Col, Button } from "react-bootstrap";
import { useEffect, useState, Suspense, lazy } from "react";
import Moment from "react-moment";
import moment from "moment";
import { toast } from "react-toastify";
import { Popper } from "@mui/material";
// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";
import { ModalForm } from "../components/ModalForm.Component.jsx";
import useToggler from "../../../_hooks/toggler.hook";
import UserForm from "../forms/user.form";

// CONSTANTS
import { SERVICE } from "../../../_constants";


function UserBalance({ services, useService }) {
  const { group } = services;

  // register services
  let service = useService({
    // [SERVICE?.BULK_RETRIEVE]: group.bulkRetrieveUser,
    [SERVICE?.BULK_RETRIEVE]: group.bulkRetrieveBankDetail,
  });

  const { dispatchRequest } = service;

  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE,
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        paranoid: false,
      },
      toast: { success: notifySuccess, error: notifyError },
    });
  }, []);
  
  return (
    <>
      {
        <Row>
         {console.log({...service})}
        <Col>
          <TableGenerator
           
            {...{ service }}
            omit="*"
            extras={[
              "Email",
              "Currency",
              'SpotWallet',
              "LocketBalance"

            ]}
            transformers={{
              Email: ({ row }) => row?.email,
              Currency: ({row}) => row?.currency,
              SpotWallet: ({row}) => row?.spotwallet,
              LocketBalance: ({row}) => row?.locketbalance
              // currency: ({ row }) => row?.currency
              // created_at: ({ row }) => {
              //   let time = moment(row?.created_at);
         
              //   return time.isValid() ? (
              //     <Moment format="MMM Do, Y, hh:mm A">{time}</Moment>
              //   ) : (
              //     "unknown"
              //   );
              // },
            }}
          />
        </Col>
      </Row> }
    </>
  );
}

export default UserBalance;
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