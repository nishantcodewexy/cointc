import {  Row, Col, Button } from "react-bootstrap";
import { useEffect, useState, Suspense, lazy } from "react";
import Moment from "react-moment";
import moment from "moment";
import { toast } from "react-toastify";
import { Popper } from "@mui/material";
// COMPONENTS
import TableGenerator from "../components/tableGenerator.component";
import { ModalForm } from "../components/modalForm.component.jsx";
import useToggler from "../../../_hooks/toggler.hook";
import UserForm from "../forms/user.form";

// CONSTANTS
import { SERVICE } from "../../../_constants";


function UserBalance({ services, useService }) {
  const { wallet } = services;

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: wallet.getWallet,
  });

  const { dispatchRequest } = service;

  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE,
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        "fake": true,
        "sudo": true,
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
              "email",
              "currency",
              'account_balance',
              "available_balance"

            ]}
            transformers={{
              email: ({ row }) => row?.user?.email || "",
              currency: ({row}) => row?.currency || " Not specified",
              account_balance: ({row}) => row?.balance?.accountBalance || "",
              available_balance: ({row}) => row?.balance?.availableBalance || "",
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