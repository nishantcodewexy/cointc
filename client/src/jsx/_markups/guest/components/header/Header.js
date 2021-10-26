import React from "react";
import {
  Nav,
  Navbar,
} from "react-bootstrap";

import './header.scss'
// import '../page/Home.css'
import logo from '../../app-assets/images/logo/CoinTC_logo.png'
import user from '../../app-assets/images/icon/user.png'

export const Header = () => {
  return (
    <div className="">
      <Navbar className="navbar navbar-dark bg-blue"  expand='lg'>
        <div class="container">
          <Nav.Link href="/" bsPrefix=" "><img src={logo} width="100" alt="logo" /></Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-between">

            <ul class="navbar-nav">
              <li class="nav-item">
                <Nav.Link class="nav-link " href="/trade">P2P Trade <span class="sr-only">(current)</span></Nav.Link>
              </li>
              <li class="nav-item">
                <Nav.Link class="nav-link" href="/orders">Orders</Nav.Link>
              </li>
              <li class="nav-item">
                <Nav.Link class="nav-link" href="/wallet">Wallet</Nav.Link>
              </li>
              <li class="nav-item">
                <Nav.Link class="nav-link" href="/affiliate">Affiliate</Nav.Link>
              </li>
              <li class="nav-item">
                <Nav.Link class="nav-link" href="/support">Support</Nav.Link>
              </li>
              <li class="nav-item ml-5">
              <div class="input-group my-input-search">
                <div class="input-group-prepend mr-0">
                    <span class="input-group-text pr-0" id="basic-addon1"><i class="fas fa-search"></i></span>
                  </div>
                <input type="search" class="form-control" placeholder="Search blocks,transactions,hash..." aria-label="search" aria-describedby="basic-addon1"/>
              </div>
            </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item btn-login">
                <Nav.Link class="" bsPrefix="btn btn-outline-white mr-1" href="#">Log in</Nav.Link>
                <Nav.Link class="" bsPrefix="btn btn-white" href="/signup">Sign Up</Nav.Link>
              </li>
            </ul>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};
