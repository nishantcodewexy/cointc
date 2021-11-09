import avartar1 from "../../../../images/avatar/1.png";
import avartar4 from "../../../../images/avatar/4.png";
import { Card, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
// CONSTANTS
import { SERVICE } from "../../../_constants";
import useToggler from "../../../_hooks/toggler.hook";
import { useEffect } from "react";
import TableGenerator from "../components/TableGenerator.Component";
import { Popper } from "@mui/core";
import { toast } from "react-toastify";
import Moment from "react-moment";

function OrdersManagement({services, useService}) {

  const { account, analytics} = services;

  let service = useService({
    [SERVICE?.RETRIEVE]: account.retrieveUser,
    [SERVICE?.UPDATE]: account.updateUser,
    [SERVICE?.DROP]: account.removeUser,
    [SERVICE?.BULK_CREATE]: account.bulkCreateUser,
    [SERVICE?.BULK_RETRIEVE]: analytics.getOrders,
  });

  const { dispatchRequest } = service;

  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onModalClose,
    toggledPayload: modalPayload,
  } = useToggler();

  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE,
      payload: {
        "fake": true,
        "sudo": true,
        "filter[type]": "sell"
      },
      toast: { success: notifySuccess, error: notifyError },
    });
  }, []);


  return (
    <>
      <PageTitle activeMenu="" motherMenu="Advert management" />
      <header className="mb-4">
        <h3>Orders</h3>
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
            <TableGenerator
                {...{ service }}
                omit="*"
                extras={[
                  "id",
                  "username",
                  "payment",
                  "time_remaining",
                  "type",
                  "status",
                  "total",
                  "date"
                ]}
                transformers={{
                  
                  id: ({row}) => row?.id,
                  username: ({row}) => row?.user ? row?.user?.pname : "",
                  type: ({row}) => row?.type || "",
                  payment: ({row}) => row?.payment || "",
                  time_remaining: ({row}) => row?.time_remaining || "",
                  status: ({row}) => row?.status || "",
                  date: ({row}) => (
                    <Moment format="YYYY/MM/DD" date={row?.archivedAt} />
                  ),
                }}
              />
          </Card>
        </Col>
      </Row>
    </>
  );
}


export default OrdersManagement;

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
