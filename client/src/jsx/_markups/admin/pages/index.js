import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import { useEffect } from 'react';
import { Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch} from 'react-redux'
import pMinDelay from "p-min-delay";

const ApexLine = loadable(() => pMinDelay(import("../components/DepositsAnalysis"), 1000));
const stats = [
  {
    name: "users stats",
    data: {
      new: 0,
      total: 20,
      suspended: 5,
    },
  },
  {
    name: "withdrawal_request",
    data: {
      new: 0,
      total: 20,
      suspended: 5,
    },
  },
  {
    name: "support_ticket",
    data: {
      new: 0,
      total: 20,
      suspended: 5,
    },
  },
  {
    name: "admin_stats",
    data: {
      new: 0,
      total: 20,
      suspended: 5,
    },
  },
  {
    name: "KYC",
    data: {
      new: 0,
      total: 20,
      suspended: 5,
    },
  },
  {
    name: "2fa",
    data: {
      new: 5,
      total: 20,
      suspended: 5,
    },
  },
];

export default function Home() {
  useEffect(() => {
    // get all statistics 

  });
  return (
    <>
    <div className="form-head mb-sm-5 mb-3 d-flex flex-wrap align-items-center">
      <h2 className="font-w600 mb-2 mr-auto ">Dashboard</h2>
      {/* <div className="weather-btn mb-2">
      <span className="mr-3 fs-22 font-w600 text-black">
      <i className="fa fa-cloud mr-2"></i>21
    </span>
  </div> */}
  {/* <Link to={"#"} className="btn btn-secondary text-white mb-2">
  <i className="las la-calendar scale5 mr-3"></i>Filter Periode
</Link> */}
</div>

<div className="row">
  {stats.map((stat, index) => {
    return (
      <div key={index} className="col-xl-4 col-xxl-4 col-lg-6 col-sm-6">
        <div className="widget-stat card">
          <div className="card-body p-4">
            <div className="media ai-icon">
              <div className="media-body ">
                <div className="row justify-content-between mb-4">
                  <div className="col">
                    <h5 className="text-capitalize">
                      {stat.name.replace("_", " ")}
                    </h5>
                  </div>
                  <div className="col-auto">
                    <Link to={"#"} className="">
                      View all
                    </Link>
                  </div>
                </div>
                <div className="row justify-content-center mx-auto">
                  {stat.data &&
                    Object.keys(stat.data).map((data, index) => {
                      return (
                        <div key={index} className="col-auto">
                          <div className="text-center">
                            <p className="mb-1">{data}</p>
                            <h4 className="mb-0">{stat.data[data]}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>

  <Row>
    <Col xl={6} lg={6}>
      <Card>
        <Card.Header>
           <h4 className="card-title">Deposits &amp; Withdrawals</h4>
        </Card.Header>
        <Card.Body>
          <ApexLine />
        </Card.Body>
      </Card>
    </Col>
  </Row>
</>
);
}
