import React from "react";
import { Col, Container, Row, ListGroup,Dropdown } from "react-bootstrap";
import './footer.scss';

import twitter_icon from '../../app-assets/images/icon/twitter.png';
import instagram_icon from '../../app-assets/images/icon/instagram.png';
import medium_icon from '../../app-assets/images/icon/medium.png';
import google_play_icon from '../../app-assets/images/icon/google-play.png';
import apple_icon from '../../app-assets/images/icon/apple.png';
import global_icon from '../../app-assets/images/icon/global.png';

export const Footer = () => {
  return (
    <div className="page-footer font-small blue py-60">
      <div class="container-fluid text-center text-md-left">
        <Container>
          <Row>
            <div class="col-md-2 mt-md-0 mt-3">
              <h5 className="text-left">CoinTC</h5>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">
                    <img src={twitter_icon} class="pr-2"/>Twitter
                    </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">
                    <img src={instagram_icon} class="pr-2"/>Instagram
                    </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">
                    <img src={medium_icon} class="pr-2"/>Medium
                    </a>
                </li>
              </ul>
            </div>
            <div class="col-md-4 mt-md-0 mt-3 d-none d-md-block"></div>
            <div class="col-md-2 mt-md-0 mt-3">
              <h5 className="text-left">Company</h5>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Careers</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Press</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Center</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Prime</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Ventures</a>
                </li>
              </ul>
            </div>
            <div class="col-md-2 mt-md-0 mt-3">
              <h5 className="text-left">Resources</h5>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">APIs</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Status</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Open Source</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Research</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Legal & Privacy</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Wallet Support</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Exchange  Support</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div class="col-md-2 mt-md-0 mt-3">
              <h5 className="text-left">Products</h5>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Wallet</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Exchange</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Explorer</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Institutional</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Learn</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Prices</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center" href="#">Charts</a>
                </li>
              </ul>
            </div>
          </Row>

          <Row>
            <div class="col-md-2 mt-md-0 mt-3">
              <Dropdown>
                <Dropdown.Toggle variant="transparent-2"  id="dropdown-basic">
                <img src={global_icon} class="pr-2"/> English
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">KOREA</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
            </div>
            <Col md={5}>
              
            </Col>
            <div class="col-md-5 d-flex flex-column flex-md-row mt-2">
            <a href="#" class="btn btn-lg btn-brand mb-3 mr-md-3 d-flex align-items-center m-2">
							<div class="google-play-icon pr-2">
								<img src={google_play_icon}/>
							</div>
							<div class="google-play-content">
								<p class="mb-0 text-left">Download on the <br/> <strong>Google Store</strong></p>
							</div>
						</a>
						<a href="#" class="btn btn-lg btn-brand mb-3 mr-md-3 d-flex align-items-center m-2">
							<div class="apple-icon pr-2">
								<img src={apple_icon}/>
							</div>
							<div class="apple-content">
								<p class="mb-0 text-left">Download on the <br/> <strong>App Store</strong></p>
							</div>
						</a>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
};
