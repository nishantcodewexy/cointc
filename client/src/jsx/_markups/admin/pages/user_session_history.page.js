import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
// CONSTANTS
import { SERVICE } from "../../../_constants";
// COMPONENTS
import PageTitle from "../layouts/PageTitle";
import TableGenerator from "../components/TableGenerator.Component";

function UserSessionHistory(props) {
  return (
    <>
      <PageTitle activeMenu="Session History" motherMenu="User Management" />

      <div>
        <header className="mb-4">
          <h3>User session history</h3>
        </header>
        <UserSessionHistoryTable {...props} />
      </div>
    </>
  );
}
function UserSessionHistoryTable({ useService, services }) {
  const { account } = services;

  let service = useService({
    [SERVICE?.BULK_RETRIEVE]: account.bulkRetrieveUser,
  });
  const { dispatchRequest } = service;
  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.BULK_RETRIEVE, payload: {
      "filter[role]": "basic"
    } });
    
  }, []);

  return (
    <>
      <TableGenerator
        {...{ service }}
        omit="*"
        extras={["username", "duration", "last_seen", "login", "login_status"]}
        transformers={{
          username: ({ row }) => (
            <Link to="/ecom-customers">
              <div className="media d-flex align-items-center">
                <div className="media-body">
                  <h5 className="mb-0 fs--1">{row?.nickname || row?.last_name || row?.other_name || row?.nickname || <div className="text-danger">Unnamed</div>}</h5>
                </div>
              </div>
            </Link>
          ),
          duration: ({ row }) => {
            const date = moment();
            return <Moment durationFromNow date={row?.updatedAt} trim></Moment>;
          },
          last_seen: ({ row }) => (
            <small>
              <span
                className="fa fa-circle text-success"
                style={{ fontSize: 12 }}
              ></span>{" "}
              {row?.last_seen || "Unknown"}
            </small>
          ),
          login: ({ row }) => {
            let login_time = moment(row?.login_at);

            return (
              <small>
                {login_time.isValid() ? (
                  <Moment withTitle format="MMM Do, Y hh:m A" trim>
                    {login_time}
                  </Moment>
                ) : (
                  "Unknown"
                )}
              </small>
            );
          },

          login_status: ({ row }) => {
            let now = moment();
            let login_at = moment(row?.login_at);
            let status = "Failed";
            if (login_at.isValid()) {
              status =
                now.minutes() - login_at.minutes() <= 30
                  ? "logged In"
                  : "not logged in";
            }
            return status;
          },
        }}
      />
    </>
  );
}

export default UserSessionHistory;
