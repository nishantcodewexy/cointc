import React from "react";
import { Col, Container, Row, ListGroup,Dropdown } from "react-bootstrap";
import './footer.scss';

import twitter_icon from '../../app-assets/images/icon/twitter.png';
import instagram_icon from '../../app-assets/images/icon/instagram.png';
import medium_icon from '../../app-assets/images/icon/medium.png';
import google_play_icon from '../../app-assets/images/icon/google-play.png';
import apple_icon from '../../app-assets/images/icon/apple.png';
import global_icon from '../../app-assets/images/icon/global.png';

export const Footer2 = () => {
  return (
    <div className="page-footer font-small blue py-60">
      <div class="container-fluid text-center text-md-left">
        <Container>
          <Row>
            <div class="col-md-2 mt-md-0 mt-3">
              <h5 class="text-left">About Us</h5>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Careers</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Business Contacts</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Community</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Binance Blog</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Terms</a>
                </li>
              </ul>
            </div>
            <div class="col-md-2 mt-md-0 mt-3">
              <h5 class="text-left">Service</h5>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Downloads</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Buy Crypto</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Fees</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Referral</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Affiliate</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Listing Application</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Trading Rules</a>
                </li>
                <li class="nav-item text-left">
                  <a class="nav-link d-flex align-items-center" href="#">P2P Merchant Application</a>
                </li>
              </ul>
            </div>
            <div class="col-md-2 mt-md-0 mt-3">
              <h5 class="text-left">Support</h5>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Give Us Feedback</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Support Center</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Submit a request</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#"> API Documentation</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Binance Verify</a>
                </li>
                <li class="nav-item text-left">
                  <a class="nav-link d-flex align-items-center" href="#">Law Enforcement Requests</a>
                </li>
              </ul>
            </div>
            <div class="col-md-2 mt-md-0 mt-3">
              <h5 class="text-left">Learn</h5>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">USDT</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">BTC</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">BUSD</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">BNB</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">ETH</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">DOGE</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">DAI</a>
                </li>
              </ul>
            </div>
            <div class="col-md-4 mt-md-0 mt-3">
              <h5 class="text-left">Community</h5>
              <ul class="navbar-nav d-none">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">USDT</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">BTC</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">BUSD</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">BNB</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">ETH</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">DOGE</a>
                </li>
                <li class="nav-item">
                  <a class="\" href="#">DAI</a>
                </li>
              </ul>
            </div>
          </Row>

          
        </Container>
      </div>
    </div>
  );
};
