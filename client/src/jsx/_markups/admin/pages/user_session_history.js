import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
// COMPONENTS
import PageTitle from "../layouts/PageTitle";
import TableGenerator from "../components/TableGenerator.Component";

function UserSessionHistory(props) {
  return (
    <>
      <PageTitle activeMenu="Session History" motherMenu="User Management" />
      <Row style={{ marginBottom: 60 }}>
        <Col>
          <header className="mb-4">
            <h3>User login and logout history list</h3>
          </header>
          <Card>
            <UserSessionHistoryTable {...props} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
function UserSessionHistoryTable({ useService, services }) {
  const { useGroupService } = services;
  const group = useGroupService();
  let service = useService({
    get: group.listUsers,
  });
  const { dispatchRequest } = service;
  useEffect(() => {
    dispatchRequest({ type: "get" });
  }, []);

  return (
    <>
      <TableGenerator
        {...{service}}
        omit="*"
        extras={[
          "username",
          "duration",
          "last_seen",
          "login",
          "logout",
          "login_status",
        ]}
        transformers={{
          username: ({ row }) => (
            <Link to="/ecom-customers">
              <div className="media d-flex align-items-center">
                <div className="media-body">
                  <h5 className="mb-0 fs--1">{row?.profile?.nickname}</h5>
                </div>
              </div>
            </Link>
          ),
          duration: ({ row }) => {
            const date = moment();
            return <Moment durationFromNow date={row?.updatedAt} trim></Moment>;
          },
          last_seen: ({ row }) => (
            <>
              <span
                className="fa fa-circle text-success"
                style={{ fontSize: 12 }}
              ></span>{" "}
              <Moment trim fromNow>
                {row?.last_seen}
              </Moment>
            </>
          ),
          login: ({ row }) => {
            let login_time = moment(row?.login_at);

            return login_time.isValid() ? (
              <Moment withTitle format="MMM Do, Y hh:m A" trim>
                {login_time}
              </Moment>
            ) : (
              "Unknown"
            );
          },
          logout: ({ row }) => (
            <>
              <Moment
                date={row?.updatedAt}
                withTitle
                format="MMM Do, Y hh:m A"
                trim
              />
            </>
          ),
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
