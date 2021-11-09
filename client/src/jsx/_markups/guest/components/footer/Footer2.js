import React from "react";
// import { Col, Container, Row, ListGroup,Dropdown } from "react-bootstrap";

export const Footer2 = () => {
  return (
    <footer>
      <div class="container">
          <div class="row">
              <div class="col-lg-2 col-md-4 col-sm-4 wow fadeInLeft" data-wow-delay="0.2s">
                  <dl>
                      <dt><a href="#">P2P Trade</a></dt>
                      <dd><a href="#">Buy</a></dd>
                      <dd><a href="#">Sell</a></dd>
                  </dl>
              </div>
              <div class="col-lg-2 col-md-4 col-sm-4 wow fadeInLeft" data-wow-delay="0.3s">
                  <dl>
                      <dt><a href="orders.html">Order</a></dt>
                      <dd><a href="#">Inprogress</a></dd>
                      <dd><a href="#">All Orders</a></dd>
                      <dd><a href="#">My Offers</a></dd>
                  </dl>
              </div>
              <div class="col-lg-2 col-md-4 col-sm-4 wow fadeInLeft" data-wow-delay="0.4s">
                  <dl>
                      <dt><a href="wallet.html">Wallet</a></dt>
                      <dd><a href="#">Asset</a></dd>
                      <dd><a href="#">History</a></dd>
                  </dl>
              </div>
              <div class="col-lg-2 col-md-4 col-sm-4 wow fadeInLeft" data-wow-delay="0.5s">
                  <a href="affiliate.html">Affiliate</a>
              </div>
              <div class="col-lg-2 col-md-4 col-sm-4 wow fadeInLeft" data-wow-delay="0.6s">
                  <a href="support.html">Support</a>
              </div>
              <div class="col-lg-2 col-md-4 col-sm-4 wow fadeInLeft" data-wow-delay="0.7s">
                  <dl class="sns clear">
                      <dt>Community</dt>
                      <dd class="twitter"><a href="#">Twitter</a></dd>
                      <dd class="instagram"><a href="#">Instagram</a></dd>
                      <dd class="youtube"><a href="#">Youtube</a></dd>
                      <dd class="facebook"><a href="#">Facebook </a></dd>
                  </dl>
              </div>
              <div class="col-12">
                  <p class="wow fadeInUp" data-wow-delay="0.8s">COPYRIGHT. 2021. CoinTC ALL RIGHTS RESERVED.</p>
              </div>
          </div>
      </div> 
  </footer>
  );
};
