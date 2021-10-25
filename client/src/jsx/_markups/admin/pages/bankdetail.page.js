import { Row, Col, Button } from "react-bootstrap";
import useToggler from "../../../_hooks/toggler.hook";
import PageTitle from "../layouts/PageTitle";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CONSTANTS
import { SERVICE } from "../../../_constants";

// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";
import { ModalForm } from "../components/ModalForm.Component.jsx";
import BankDetailForm from "../forms/bankdetail.form";

function AdminBankDetails({ services, useService }) {
  const { bank_detail } = services;

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: bank_detail.bulkRetrieve,
    [SERVICE?.RETRIEVE]: bank_detail.retrieve,
    [SERVICE?.CREATE]: bank_detail.create,
    [SERVICE?.UPDATE]: bank_detail.update,
    [SERVICE?.DROP]: bank_detail.remove,
  });

  const { dispatchRequest, isFetching } = service;
  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE,
      toast: { success: notifySuccess, error: notifyError },
      /* payload: {}, */
    });
  }, []);

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
          case SERVICE?.CREATE:
            return [
              "Add new bank detail",
              <BankDetailForm
                {...{ services }}
                action={(requestPayload) =>
                  dispatchRequest({
                    type: SERVICE?.CREATE,
                    payload: requestPayload,
                  })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case SERVICE?.UPDATE:
            return [
              "Update bank detail",
              <BankDetailForm.Update
                {...{ services }}
                action={(requestPayload) =>
                  dispatchRequest({
                    type: SERVICE?.UPDATE,
                    payload: requestPayload,
                  })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case SERVICE?.DROP:
            return [
              "Delete Bank details",
              <BankDetailForm.Remove
                {...{ services }}
                action={(requestPayload) =>
                  dispatchRequest({
                    type: SERVICE?.DROP,
                    payload: requestPayload,
                  })
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
            <Button onClick={() => onOpenModal({ method: SERVICE?.CREATE })}>
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
                "swift_code",
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
                  return <>{row?.currency}</>;
                },
                swift_code: ({ row }) => {
                  return <>{row?.swift_code}</>;
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
                          onOpenModal({
                            method: SERVICE?.UPDATE,
                            payload: row,
                          })
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
                          onOpenModal({ method: SERVICE?.DROP, payload: row })
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
        </Col>
      </Row>
    </>
  );
}

export default AdminBankDetails;

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
