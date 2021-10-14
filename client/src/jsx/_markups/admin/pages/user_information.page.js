import { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
import { Card, Row, Col, Button, Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
      <Row>
        <Col style={{ marginBottom: 60 }}>
          <header className="mb-4">
            <h3>Permissions</h3>
          </header>
          <Card>
            <UsersPermissionTable {...props} />
          </Card>
        </Col>
      </Row>

      {/* Permissions */}
      <Row>
        <Col style={{ marginBottom: 60 }}>
          <header className="mb-4">
            <h3>User membership information</h3>
          </header>
          <Card>
            <UsersMembershipTable {...props} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default UserInformation;

function UsersPermissionTable({ services, useService }) {
  const { useGroupService } = services;
  const group = useGroupService();

  let service = useService({
    list: group.bulkRetrieveUsers,
  });
  const { dispatchRequest } = service;
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

  useEffect(() => {
    dispatchRequest({
      type: "list",
      payload: {
        "order[updatedAt]": "DESC",
        "order[createdAt]": "DESC",
        "options[paranoid]": false,
      },
      toast: { success: notifySuccess, error: notifyError },
    });
  }, []);

  const permit = ({ key, row }) => (
    <div className="d-flex" style={{ gap: 10 }}>
      <button
        style={{
          border: "none",
          background: "transparent",
        }}
        className="text-success"
      >
        <span className="simple-check"></span> Allow
      </button>
      <button
        style={{
          border: "none",
          background: "transparent",
        }}
        className="text-danger"
      >
        <span className="simple-close"></span> Block
      </button>
    </div>
  );

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
            return <>{row?.nickname || "Untitled"}</>;
          },
          id: ({ row }) => {
            return <>{row?.id}</>;
          },
          permission: permit,
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
    list: group.bulkRetrieveUsers,
  });

  const { dispatchRequest } = service;

  useEffect(() => {
    dispatchRequest({ type: "list" });
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
