import React from "react";
import {
  Button,
  Nav,
  Form,
  Navbar,
  Container,
} from "react-bootstrap";
// import './header.scss'

import logo from '../../app-assets/images/logo/CoinTC_logo_black.png'
import user from '../../app-assets/images/icon/user-01.png'

export const Header3 = () => {

  return (
    <>
      <Navbar className="navbar  navbar-light" expand='lg'>
        <div class="container">
          <Nav.Link href="/" bsPrefix="pr-5"><img src={logo} width="100" alt="logo" /></Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            <Nav
              className="me-auto my-2 my-lg-0"
              // style={{ maxHeight: "100px" }}
              navbarScroll
            >

            <ul class="navbar-nav">
              <li class="nav-item">
                <Nav.Link class="nav-link" href="/trade">P2P Trade <span class="sr-only">(current)</span></Nav.Link>
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
              <li class="nav-item">
                <Nav.Link class="nav-link" href="/ad_create">Create Ad</Nav.Link>
              </li>
            </ul>
            
            </Nav>
            <Nav
              className="ml-auto my-2 my-lg-0"
              // style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <ul class="navbar-nav ls-btn-info">
					<li class="nav-item btn-login">
						<a class="btn btn-white" href="/my-page"><img src={user} class="pr-2"/>My Page</a>
					</li>
				</ul>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};
