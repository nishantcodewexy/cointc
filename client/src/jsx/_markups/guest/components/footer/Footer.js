import React from "react";
import { Col, Container, Row, ListGroup, Dropdown } from "react-bootstrap";
// import './footer.scss';

import twitter_icon from '../../app-assets/images/icon/twitter.png';
import instagram_icon from '../../app-assets/images/icon/instagram.png';
import medium_icon from '../../app-assets/images/icon/medium.png';
import google_play_icon from '../../app-assets/images/icon/google-play.png';
import apple_icon from '../../app-assets/images/icon/apple.png';
import global_icon from '../../app-assets/images/icon/global.png';

export const Footer = () => {
    return (
        <footer className="page-footer font-small blue">
            <div className="container-fluid text-center text-md-left">
                <div className="container wow fadeInLeft">
                    <div className="row">
                        <div className="col-md-2 mt-md-0 mt-3">
                            <h4 className="text-left">CoinTC</h4>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#"><img src={twitter_icon} className="pr-2 w-auto" />Twitter</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#"><img src={instagram_icon} className="pr-2 w-auto" />Instagram</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#"><img src={medium_icon} className="pr-2 w-auto" />Medium</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 mt-md-0 mt-3 d-none d-md-block"></div>
                        <div className="col-md-2 mt-md-0 mt-3">
                            <h5 className="text-left">Company</h5>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Careers</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Press</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Center</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Prime</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Ventures</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-2 mt-md-0 mt-3">
                            <h5 className="text-left">Resources</h5>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">APIs</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Status</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Open Source</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Research</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Legal & Privacy</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Wallet Support</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Exchange  Support</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-2 mt-md-0 mt-3">
                            <h5 className="text-left">Products</h5>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Wallet</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Exchange</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Explorer</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Institutional</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Learn</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Prices</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center" href="#">Charts</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-12 mt-md-0 mt-3">
                            <div className="input-group float-left w-18 d-flex align-items-center">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary" type="button">
                                        <img src={global_icon} />
                                    </button>
                                </div>
                                <select className="custom-select" id="inputGroupSelect03">
                                    <option selected>Select Language</option>
                                    <option value="english">English</option>
                                    <option value="korea">Korea</option>
                                </select>
                            </div>
                            <div className="float-right">
                                <a href="#" className="btn btn-lg btn-brand float-left mr-3 clearfix mb-2 mb-md-0">
                                    <div className="google-play-icon pr-2 float-left">
                                        <img src={google_play_icon} className="w-auto" />
                                    </div>
                                    <div className="google-play-content float-right">
                                        <p className="mb-0 text-left border-0 pt-0">Download on the <br /> <strong>Google Store</strong></p>
                                    </div>
                                </a>
                                <a href="#" className="btn btn-lg btn-brand clearfix float-left">
                                    <div className="apple-icon pr-2 float-left">
                                        <img src={apple_icon} className="w-auto" />
                                    </div>
                                    <div className="apple-content float-right">
                                        <p className="mb-0 text-left border-0 pt-0">Download on the <br /> <strong>App Store</strong></p>
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
