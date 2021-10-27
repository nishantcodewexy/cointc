import React from "react";
import { Col, Container, Row, ListGroup,Dropdown } from "react-bootstrap";
// import './footer.scss';

import twitter_icon from '../../app-assets/images/icon/twitter.png';
import instagram_icon from '../../app-assets/images/icon/instagram.png';
import medium_icon from '../../app-assets/images/icon/medium.png';
import google_play_icon from '../../app-assets/images/icon/google-play.png';
import apple_icon from '../../app-assets/images/icon/apple.png';
import global_icon from '../../app-assets/images/icon/global.png';

export const Footer = () => {
  return (
    <footer class="page-footer font-small blue">
      <div class="container-fluid text-center text-md-left">
          <div class="container wow fadeInLeft">
              <div class="row">
                  <div class="col-md-2 mt-md-0 mt-3">
                      <h4 class="text-left">CoinTC</h4>
                      <ul class="navbar-nav">
                          <li class="nav-item">
                              <a class="nav-link d-flex align-items-center" href="#"><img src={twitter_icon} class="pr-2 w-auto"/>Twitter</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link d-flex align-items-center" href="#"><img src={instagram_icon} class="pr-2 w-auto"/>Instagram</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link d-flex align-items-center" href="#"><img src={medium_icon}class="pr-2 w-auto"/>Medium</a>
                          </li>
                      </ul>
                  </div>
                  <div class="col-md-4 mt-md-0 mt-3 d-none d-md-block"></div>
                  <div class="col-md-2 mt-md-0 mt-3">
                      <h5 class="text-left">Company</h5>
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
                      <h5 class="text-left">Resources</h5>
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
                      <h5 class="text-left">Products</h5>
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
              </div>

              <div class="row mt-5">
                  <div class="col-md-12 mt-md-0 mt-3">
                      <div class="input-group float-left w-18 d-flex align-items-center">
                          <div class="input-group-prepend">
                              <button class="btn btn-outline-secondary" type="button">
                                  <img src={global_icon}/>
                              </button>
                          </div>
                          <select class="custom-select" id="inputGroupSelect03">
                              <option selected>Select Language</option>
                              <option value="english">English</option>
                              <option value="korea">Korea</option>
                          </select>
                      </div>
                      <div class="float-right">
                      <a href="#" class="btn btn-lg btn-brand float-left mr-3 clearfix mb-2 mb-md-0">
                          <div class="google-play-icon pr-2 float-left">
                              <img src={google_play_icon} class="w-auto"/>
                          </div>
                          <div class="google-play-content float-right">
                              <p class="mb-0 text-left border-0 pt-0">Download on the <br/> <strong>Google Store</strong></p>
                          </div>
                      </a>
                      <a href="#" class="btn btn-lg btn-brand clearfix float-left">
                          <div class="apple-icon pr-2 float-left">
                              <img src={apple_icon} class="w-auto"/>
                          </div>
                          <div class="apple-content float-right">
                              <p class="mb-0 text-left border-0 pt-0">Download on the <br/> <strong>App Store</strong></p>
                          </div>
                      </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </footer>
  );
};
