import { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
import { Card, Row, Col, Button, Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import PageTitle from "../layouts/PageTitle";
import avartar5 from "../../../../images/avatar/5.png";
import avartar1 from "../../../../images/avatar/1.png";

// COMPONENTS
import TableGenerator from "../components/TableGenerator.Component";

const SuitabilityRating = styled.div`
  ul.star-rating > li i {
    color: #089248;
  }
`;

function UserInformation(props) {
  return (
    <>
      <PageTitle activeMenu="Users information" motherMenu="User Management" />
      <Row style={{ marginBottom: 60 }}>
        <Col>
          <header className="mb-4">
            <h3>Permissions</h3>
          </header>
          <Card
            style={{
              padding: 10,
            }}
          >
            <UsersPermissionTable {...props} />
          </Card>
        </Col>
      </Row>

      {/* Permissions */}
      <Row>
        <Col>
          <header className="mb-4">
            <h3>User membership information</h3>
          </header>
          <Card
            style={{
              padding: 10,
            }}
          >
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

  let { data, error, isFetching, dispatchRequest } = useService({
    get: group.listUsers,
  });

  useEffect(() => {
    dispatchRequest({ type: "get" });
  }, []);

  const actions = (id) => (
    <>
      <div className="d-flex" style={{ gap: 20 }}>
        <a href="">
          <span className="themify-glyph-29"></span> Edit
        </a>
        <a href="">
          <span className="themify-glyph-165"></span> Delete
        </a>
      </div>
    </>
  );

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
        data={data?.results}
        actions={actions}
        mapping={{
          id: "USER ID",
          createdAt: "joined",
        }}
        omit={'*'}
        extras={["name", "id", "phone_number", "country", "joined", "permission"]}
        transformers={{
          name: ({ key, value, row }) => {
            return <>{row?.profile?.nickname || 'Untitled'}</>;
          },
          id: ({row}) => {
            return <>{row?.id}</>
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

function UsersMembershipTable() {
  const action = (
    <div className="d-flex" style={{ gap: 20 }}>
      <a href="">
        <span className="themify-glyph-29"></span> Edit
      </a>
      <a href="">
        <span className="themify-glyph-165"></span> Delete
      </a>
    </div>
  );

  const chackbox = document.querySelectorAll(".user_membership_single input");
  const motherChackBox = document.querySelector(".user_membership input");
  // console.log(document.querySelectorAll(".publish_review input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  const chack = (i) => (
    <div className={`custom-control custom-checkbox ml-2`}>
      <input
        type="checkbox"
        className="custom-control-input "
        id={`checkAll_user_membership_${i}`}
        required=""
        onClick={() => chackboxFun()}
      />
      <label
        className="custom-control-label"
        htmlFor={`checkAll_user_membership_${i}`}
      ></label>
    </div>
  );

  return (
    <>
      <Table striped responsive size="sm">
        <thead>
          <tr>
            <th className="user_membership">
              <div className="custom-control custom-checkbox mx-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="checkAll_user_membership_all"
                  onClick={() => chackboxFun("all")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkAll_user_membership_all"
                ></label>
              </div>
            </th>
            <th>Name</th>
            <th className="text-center">Role</th>
            <th>Suitability</th>
            <th className="">Relationship</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="user_membership">
          <tr className="btn-reveal-trigger mb-2">
            <td className="user_membership_single">{chack(1)}</td>
            <td className="py-3">
              <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div className="">
                      <img
                        className="rounded-circle img-fluid"
                        src={avartar5}
                        width="30"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">Ricky Antony</h5>
                    <span>Last contact: 14.02.2021</span>
                  </div>
                </div>
              </Link>
            </td>
            <td className="py-2 text-center" style={{}}>
              <i class="fa fa-users d-block" aria-hidden="true"></i>
              <a href="mailto:ricky@example.com">Sys Admin</a>
            </td>
            <td className="py-2">
              <SuitabilityRating>
                <ul className="star-rating">
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star-1" />
                  </li>
                  <li>
                    <i className="fa fa-star-1" />
                  </li>
                </ul>
                <span>40% Progress</span>
              </SuitabilityRating>
            </td>
            <td className="py-2 ">
              <ul>
                <li>Message(9)</li>
                <li>Phone(3)</li>
                <li>Live meeting(1)</li>
                <li>Notes(7)</li>
              </ul>
            </td>
            <td className="py-2 text-right">{action}</td>
          </tr>

          <tr className="btn-reveal-trigger mb-2">
            <td className="user_membership_single">{chack(1)}</td>
            <td className="py-3">
              <Link to="/to_user_information">
                <div className="media d-flex align-items-center">
                  <div className="avatar avatar-xl mr-4">
                    <div className="">
                      <img
                        className="rounded-circle img-fluid"
                        src={avartar5}
                        width="30"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="media-body">
                    <h5 className="mb-0 fs--1">Ricky Antony</h5>
                    <span>Last contact: 14.02.2021</span>
                  </div>
                </div>
              </Link>
            </td>
            <td className="py-2 text-center" style={{}}>
              <i class="fa fa-users d-block" aria-hidden="true"></i>
              <a href="mailto:ricky@example.com">Sys Admin</a>
            </td>
            <td className="py-2">
              <SuitabilityRating>
                <ul className="star-rating">
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star-1" />
                  </li>
                  <li>
                    <i className="fa fa-star-1" />
                  </li>
                </ul>
                <span>40% Progress</span>
              </SuitabilityRating>
            </td>
            <td className="py-2 ">
              <ul>
                <li>Message(9)</li>
                <li>Phone(3)</li>
                <li>Live meeting(1)</li>
                <li>Notes(7)</li>
              </ul>
            </td>
            <td className="py-2 text-right">{action}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
