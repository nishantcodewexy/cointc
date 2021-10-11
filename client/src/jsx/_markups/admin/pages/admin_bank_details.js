import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import useToggler from "../../../_hooks/toggler.hook";
import PageTitle from "../layouts/PageTitle";
import { useEffect } from "react";
// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";
import { ModalForm } from "../components/ModalForm.Component.jsx";
import AdminBankForm from "../forms/admin_bank.form";

function AdminBankDetails({ services, useService }) {
  const { useGroupService } = services;
  const group = useGroupService();
  let service = useService({
    get: group.getKYC,
  });
  const { dispatchRequest, isFetching } = service;
  useEffect(() => {
    dispatchRequest({ type: "get" });
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
          case "post":
            return [
              "Add new bank detail",
              <AdminBankForm.Create
                action={(requestPayload) =>
                  dispatchRequest({ type: "post", payload: requestPayload })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case "put":
            return [
              "Update User",
              <AdminBankForm.Modify
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
              "Delete User",
              <AdminBankForm.Delete
                action={(requestPayload) =>
                  dispatchRequest({ type: "drop", payload: requestPayload })
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
                transformers={{
                  permission: ({ key, value }) => (
                    <>{value ? "permitted" : "Not permitted"}</>
                  ),
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
