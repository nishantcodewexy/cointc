import { Row, Col, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// CONSTANTS
import { SERVICE } from "../../../_constants";

// COMPONENTS
import TableGenerator from "../components/tableGenerator.component";
import PageTitle from "../layouts/PageTitle";

function AuthSecurityMgmt({ services, useService }) {
  const { account } = services;

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: account.bulkRetrieveUser,
  });

  const { dispatchRequest } = service;
  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE,
      toast: { success: notifySuccess, error: notifyError },
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        // "fake": true,
        include: "security",
        sudo: true,
      },
    });
  }, []);

  return (
    <>
      <PageTitle
        activeMenu="Security List"
        motherMenu="Authentication Management"
      />
      <header className="mb-4">
        <h3>List of Security </h3>
      </header>

      <div style={{ marginBottom: 60 }}>
        <TableGenerator
          {...{ service }}
          mapping={{
            iso_code: "Symbol",
          }}
          omit="*"
          extras={["user_name", "email", "mobile_number", "two_factor"]}
          transformers={{
            user_name: ({ row }) => row?.lname,
            email: ({ row }) => row?.email,
            mobile_number: ({ row }) =>
              row?.phone || (
                <small className="badge badge-default text-white">
                  No mobile number
                </small>
              ),
            two_factor: ({ row }) => {
              return (
                <>
                  {console.log({ otp: row })}
                  {row?.security?.two_factor || (
                    <small className="badge badge-danger">2fa disabled</small>
                  )}
                </>
              );
            },
          }}
        />
      </div>
    </>
  );
}

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
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export default AuthSecurityMgmt;
