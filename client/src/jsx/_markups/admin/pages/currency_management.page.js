import { Row, Col, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import { useEffect } from "react";
import useToggler from "../../../_hooks/toggler.hook";
import { toast } from "react-toastify";

// CONSTANTS
import { SERVICE } from "../../../_constants";

// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";
import CurrencyForm from "../forms/currency.form";
import { ModalForm } from "../components/ModalForm.Component.jsx";

function CurrencyMgmt({ services, useService }) {
  const { currency } = services;

  let service = useService({
    [SERVICE?.RETRIEVE]: currency.retrieve,
    [SERVICE?.CREATE]: currency.create,
    [SERVICE?.UPDATE]: currency.update,
    [SERVICE?.REMOVE]: currency.remove,
    [SERVICE?.BULK_RETRIEVE]: currency.bulkRetrieve,
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
      type: SERVICE.BULK_RETRIEVE,
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        paranoid: false,
      },
      toast: { success: notifySuccess, error: notifyError },
    });
  }, []);

  

  function useFormRenderer(formData = { method: null, payload: null }) {
    const [title, form] = (() => {
      try {
        switch (formData?.method) {
          case SERVICE?.CREATE:
            return [
              "Create new Currency",
              <CurrencyForm
                action={(data) =>
                  dispatchRequest({ type: SERVICE?.CREATE, payload: data })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case SERVICE?.UPDATE:
            return [
              "Update Currency",
              <CurrencyForm.Update
                action={(data) =>
                  dispatchRequest({
                    type: SERVICE?.UPDATE,
                    payload: { id: formData?.payload?.id, data },
                  })
                }
                payload={formData?.payload}
                callback={onModalClose}
              />,
            ];
          case SERVICE?.REMOVE:
            return [
              "Confirm Delete",
              <CurrencyForm.Remove
                action={(data) =>
                  dispatchRequest({
                    type: SERVICE?.REMOVE,
                    payload: { id: formData?.payload?.id, data },
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
      <PageTitle activeMenu="" motherMenu="Currencies" />
      <header className="mb-4">
        <h3>Currency List</h3>
      </header>
      <div
        style={{
          marginBottom: 20,
          width: "100%",
          display: "flex",
          justifyContent: "flex-between",
        }}
      >
        <div className="input-group search-area mr-auto right d-lg-inline-flex d-none">
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

        <div sm="auto" style={{ padding: 0 }}>
          <Button onClick={() => onOpenModal({ method: SERVICE?.CREATE })}>
            <i className="fa fa-plus"></i> Add Currency
          </Button>
        </div>
      </div>

      <ModalForm
        useFormRenderer={useFormRenderer}
        formData={modalPayload}
        isOpen={isModalOpen}
        onClose={onModalClose}
      ></ModalForm>

      <div style={{ marginBottom: 60 }}>
        <TableGenerator
          {...{ service}}
          mapping={{
            id: "Currency ID",
            iso_code: "symbol",
          }}
          omit="*"
          extras={["symbol", "full_name", "type", "status", "action"]}
          transformers={{
            symbol: ({ row }) => row?.iso_code || "unknown",
            full_name: ({ row }) => row?.name || "unknown",
            type: ({ row }) => row?.type || "unknown",
            action: ({ row }) => (
              <div className="d-flex" style={{ gap: 20 }}>
                <button
                  style={{
                    appearance: "none",
                    border: "none",
                    background: "none",
                  }}
                  onClick={() =>
                    onOpenModal({ method: SERVICE?.UPDATE, payload: row })
                  }
                >
                  <span className="themify-glyph-29"></span> Edit
                </button>

                <button hidden={row?.archived_at}
                  style={{
                    appearance: "none",
                    border: "none",
                    background: "none",
                  }}
                  onClick={() =>
                    onOpenModal({
                      method: SERVICE?.DROP,
                      payload: { id: row?.id },
                    })
                  }
                >
                  <span className="themify-glyph-165"></span> Delete
                </button>
              </div>
            ),
            status: ({ row }) => {
              return row?.archived_at ? (
                <span className="badge light badge-danger">
                  <i className="fa fa-circle text-danger mr-1" />
                  archived
                </span>
              ) : (
                <span className="badge light badge-success">
                  <i className="fa fa-circle text-success mr-1" />
                  Active
                </span>
              );
            },
          }}
        />
      </div>
    </>
  );
}

export default CurrencyMgmt;

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