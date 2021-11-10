import React from "react";
// import { Col, Container, Row, ListGroup,Dropdown } from "react-bootstrap";

export const Footer2 = () => {
  return (
    <footer>
      <div className="container">
          <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4 wow animate__animated  fadeInLeft" data-wow-delay="0.2s">
                  <dl>
                      <dt><a href="/trade">P2P Trade</a></dt>
                      <dd><a href="#">Buy</a></dd>
                      <dd><a href="#">Sell</a></dd>
                  </dl>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 wow animate__animated  fadeInLeft" data-wow-delay="0.3s">
                  <dl>
                      <dt><a href="/orders">Order</a></dt>
                      <dd><a href="#">Inprogress</a></dd>
                      <dd><a href="#">All Orders</a></dd>
                      <dd><a href="#">My Offers</a></dd>
                  </dl>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 wow animate__animated  fadeInLeft" data-wow-delay="0.4s">
                  <dl>
                      <dt><a href="/wallet">Wallet</a></dt>
                      <dd><a href="#">Asset</a></dd>
                      <dd><a href="#">History</a></dd>
                  </dl>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 wow animate__animated  fadeInLeft" data-wow-delay="0.5s">
                  <a href="/affiliate">Affiliate</a>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 wow animate__animated  fadeInLeft" data-wow-delay="0.6s">
                  <a href="/support">Support</a>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 wow animate__animated  fadeInLeft" data-wow-delay="0.7s">
                  <dl className="sns clear">
                      <dt>Community</dt>
                      <dd className="twitter"><a href="#">Twitter</a></dd>
                      <dd className="instagram"><a href="#">Instagram</a></dd>
                      <dd className="youtube"><a href="#">Youtube</a></dd>
                      <dd className="facebook"><a href="#">Facebook </a></dd>
                  </dl>
              </div>
              <div className="col-12">
                  <p className="wow animate__animated  fadeInUp" data-wow-delay="0.8s">COPYRIGHT. 2021. CoinTC ALL RIGHTS RESERVED.</p>
              </div>
          </div>
      </div> 
  </footer>
  );
};
