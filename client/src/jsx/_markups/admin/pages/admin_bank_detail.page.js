import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import useToggler from "../../../_hooks/toggler.hook";
import PageTitle from "../layouts/PageTitle";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";
import { ModalForm } from "../components/ModalForm.Component.jsx";
import AdminBankForm from "../forms/admin_bank.form";

function AdminBankDetails({ services, useService }) {
  const { useGroupService } = services;
  const group = useGroupService();
  let service = useService({
    list: group.listBankDetail,
    get: group.getBankDetail,
    post: group.createBankDetail,
    drop: group.dropBankDetail,
  });
  const { dispatchRequest, isFetching } = service;
  useEffect(() => {
    dispatchRequest({
      type: "list",
      toast: { success: notifySuccess, error: notifyError },
      payload: {
      },
    });
  }, []);

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
  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onModalClose,
    toggledPayload: modalPayload,
  } = useToggler();

  function useFormRenderer(formData = { method: null, payload: null }) {
    const [title, form] = (() => {
      try {
        switch (formData?.method) {
          case "post":
            return [
              "Add new bank detail",
              <AdminBankForm
                action={(requestPayload) =>
                  dispatchRequest({ type: "post", payload: requestPayload })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case "put":
            return [
              "Update bank detail",
              <AdminBankForm
                action={(requestPayload) =>
                  dispatchRequest({ type: "put", payload: requestPayload })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case "drop":
          case "delete":
            return [
              "Delete Bank details",
              <AdminBankForm.Delete
                action={({ id, ...data }) =>
                  dispatchRequest({ type: "drop", payload: { id, data } })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          default:
            return [null, null];
        }
      } catch (error) {
        console.error(
          "Must pass in method and payload key to the formData argument"
        );
      }
    })();
    return [
      title,
      <Row>
        <Col>{form}</Col>
      </Row>,
    ];
  }

  return (
    <>
      <PageTitle
        pageContent={
          <h2 className="font-w600 mb-2 mr-auto ">Admin Bank Details</h2>
        }
        activeMenu="Admin bank details"
        motherMenu="Dashboard"
      >
        <Row style={{ marginBottom: 20, width: "100%" }}>
          <Col></Col>
          <Col sm="auto" style={{ padding: 0 }}>
            <Button onClick={() => onOpenModal({ method: "post" })}>
              <i className="fa fa-plus"></i> Add New
            </Button>
          </Col>
        </Row>
      </PageTitle>

      <ModalForm
        useFormRenderer={useFormRenderer}
        formData={modalPayload}
        isOpen={isModalOpen}
        onClose={onModalClose}
      ></ModalForm>

      <Row>
        <Col>
          <Card>
            {isFetching ? (
              <div>Loading...</div>
            ) : (
              <TableGenerator
                {...{ service }}
                mapping={{
                  iso_code: "Symbol",
                }}
                omit="*"
                extras={[
                  "account_no",
                  "bank_name",
                  "currency",
                  "country",
                  "ifsc_code",
                  "action",
                ]}
                transformers={{
                  account_no: ({ row }) => {
                    return <>{row?.account_no}</>;
                  },
                  bank_name: ({ row }) => {
                    return <>{row?.bank_name}</>;
                  },
                  currency: ({ row }) => {
                    return <>{row?.ifsc_code}</>;
                  },
                  country: ({ row }) => {
                    return <>{row?.country}</>;
                  },
                  ifsc_code: ({ row }) => {
                    return <>{row?.currency}</>;
                  },
                  action: ({ row }) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                        }}
                      >
                        <button
                          style={{
                            appearance: "none",
                            border: "none",
                            background: "none",
                          }}
                          onClick={() =>
                            onOpenModal({ method: "put", payload: row })
                          }
                        >
                          <span className="themify-glyph-29"></span> Edit
                        </button>
                        {/* TODO: Delete user */}
                        <button
                          style={{
                            appearance: "none",
                            border: "none",
                            background: "none",
                          }}
                          onClick={() =>
                            onOpenModal({ method: "delete", payload: row })
                          }
                        >
                          <span className="themify-glyph-165"></span> Delete
                        </button>
                      </div>
                    );
                  },
                }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AdminBankDetails;
