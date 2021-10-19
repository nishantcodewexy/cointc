import { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Switch } from "@mui/material";
// CONSTANTS
import { SERVICE } from "../../../_constants";

// COMPONENTS
import PageTitle from "../layouts/PageTitle";
import _components from "../components";
import TableGenerator from "../components/TableGenerator.Component";

const { IdenticonAvatar } = _components;
const SuitabilityRating = styled.div`
  ul.star-rating > li i {
    color: #089248;
  }
`;

function UserInformation(props) {
  return (
    <>
      <PageTitle activeMenu="Users information" motherMenu="User Management" />
      <div style={{ marginBottom: 60 }}>
        <header className="mb-4">
          <h3>Permissions</h3>
        </header>
        <UsersPermissionTable {...props} />
      </div>

      {/* Permissions */}
      <div style={{ marginBottom: 60 }}>
        <header className="mb-4">
          <h3>User membership information</h3>
        </header>
        <UsersMembershipTable {...props} />
      </div>
    </>
  );
}
export default UserInformation;

function UsersPermissionTable({ services, useService }) {
  const { useAccountService } = services;
  const account = useAccountService();

  let bulkServicePayload = {
    "order[updatedAt]": "DESC",
    "order[createdAt]": "DESC",
    "filter[role]": "basic",
  };

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: (_p = bulkServicePayload) =>
      account.bulkRetrieveUser(_p),
    [SERVICE?.UPDATE]: account?.updateUser,
  });

  const { dispatchRequest } = service;

  function notifySuccess() {
    toast.success("Done", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  function notifyError(message) {
    toast.error(`${message}` || "Request Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE,
    });
    return () => {
      account.abort();
    };
  }, []);

  function Permit({ key, row }) {
    const [permission, setPermission] = useState(row?.permission);
    const _account = useAccountService();

    let { dispatchRequest: _d } = useService(
      {
        [SERVICE?.UPDATE]: _account?.updateUser,
      },
      { success: notifySuccess, error: notifyError }
    );

    useEffect(() => {
      return () => {
        _account.abort();
      };
    }, []);

    function handleChange(e, value) {
      // TODO: Make Permission change request
      _d({
        type: SERVICE?.UPDATE,
        payload: { id: row?.id, data: { permission: value } },
      }).then(() => {
        setPermission(value);
      });
    }

    return (
      <small className="d-flex" style={{ gap: 10, alignItems: "center" }}>
        <strong
          className="text-danger"
          style={{ opacity: !permission ? 1 : 0.5 }}
        >
          Block
        </strong>
        <Switch
          color={"default"}
          name={row?.id}
          onChange={handleChange}
          checked={permission}
        />
        <strong
          className="text-success"
          style={{ opacity: permission ? 1 : 0.5 }}
        >
          Allow
        </strong>
      </small>
    );
  }

  return (
    <>
      <TableGenerator
        {...{ service }}
        mapping={{
          id: "USER ID",
          createdAt: "joined",
        }}
        omit="*"
        extras={[
          "name",
          "id",
          "phone_number",
          "country",
          "joined",
          "permission",
        ]}
        transformers={{
          name: ({ key, value, row }) => {
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
                      <IdenticonAvatar size={30} alt="" id={row.id} />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">
                      {row?.nickname || "Untitled"}
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
          id: ({ row }) => {
            return row?.id;
          },
          permission: Permit,
          joined: ({ row }) => {
            return (
              <Moment format="YYYY/MM/DD" date={row?.profile?.createdAt} />
            );
          },
          phone_number: ({ row }) => {
            return row?.profile?.kyc?.phone ? (
              <a href={`tel:${row?.profile?.kyc?.phone}`}>
                {row?.profile?.kyc?.phone}
              </a>
            ) : (
              "Not specified"
            );
          },
          country: ({ row }) => {
            return <>{row?.profile?.country || "Not specified"}</>;
          },
        }}
      />
    </>
  );
}

function UsersMembershipTable({ useService, services }) {
  const { useGroupService } = services;
  const group = useGroupService();

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: group.bulkRetrieveUser,
  });

  const { dispatchRequest } = service;

  useEffect(() => {
    dispatchRequest({ type: SERVICE?.BULK_RETRIEVE });
  }, []);

  return (
    <>
      <TableGenerator
        {...{ service }}
        mapping={{
          id: "USER ID",
          createdAt: "joined",
        }}
        omit="*"
        extras={["name", "role", "suitability", "relationship"]}
        transformers={{
          name: ({ row }) => {
            return (
              <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div
                      className="rounded-circle img-fluid overflow-hidden"
                      style={{ maxWidth: 50, height: 50 }}
                    >
                      <IdenticonAvatar size={50} alt="" id={row.id} />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">
                      {row?.nickname || "Untitled"}
                    </h5>
                    <span>
                      Last contact:{" "}
                      <Moment format="DD.MM.YYYY">{row?.updatedAt}</Moment>
                    </span>
                  </div>
                </div>
              </Link>
            );
          },
          role: ({ row }) => {
            return (
              <div className="py-2 d-flex justify-content-center flex-column">
                <i className="fa fa-users d-block" aria-hidden="true"></i>
                <a href="mailto:ricky@example.com" className="text-capitalize">
                  {row?.role}
                </a>
              </div>
            );
          },
          suitability({ row }) {
            let suitability = Number.isNaN(row?.suitability)
              ? row?.suitability
              : 0;
            let progress = (suitability / 5) * 100;

            return (
              <SuitabilityRating>
                <ul className="star-rating">
                  {Array(5)
                    .fill(false)
                    .fill(true, 0, suitability)
                    .map((val, idx) => {
                      return (
                        <li key={idx}>
                          <i className={`fa fa-star${!val ? "-1" : ""}`} />
                        </li>
                      );
                    })}
                </ul>
                <small>{progress}% Progress</small>
              </SuitabilityRating>
            );
          },
          relationship: () => (
            <>
              <ul>
                <li>Message(9)</li>
                <li>Phone(3)</li>
                <li>Live meeting(1)</li>
                <li>Notes(7)</li>
              </ul>
            </>
          ),
          joined: ({ row }) => {
            return (
              <Moment format="YYYY/MM/DD" date={row?.profile?.createdAt} />
            );
          },
          phone_number: ({ row }) => {
            return row?.profile?.kyc?.phone ? (
              <a href={`tel:${row?.profile?.kyc?.phone}`}>
                {row?.profile?.kyc?.phone}
              </a>
            ) : (
              "Not specified"
            );
          },
          country: ({ row }) => {
            return <>{row?.profile?.country || "Not specified"}</>;
          },
        }}
      />
    </>
  );
}
