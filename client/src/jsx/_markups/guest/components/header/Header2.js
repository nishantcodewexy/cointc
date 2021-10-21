import React from "react";
import {
  Button,
  Nav,
  Form,
  Navbar,
  Container,
} from "react-bootstrap";
// import './header.scss'

import logo from '../../app-assets/images/logo/CoinTC_logo_02.png'
import user from '../../app-assets/images/icon/user.png'

export const Header2 = () => {

  const  cur_loc = window.location.pathname;
  var page_heading = null;
  if(cur_loc=='/orders'){
    page_heading = 'Orders';
  }else if(cur_loc=='/wallet' || cur_loc=='/wallet_th' || cur_loc=='/wallet_verification' || cur_loc=='/wallet_verification2'){
    page_heading = 'Wallet';
  }else if(cur_loc=='/wallet_deposit'){
    page_heading = 'Deposit';
  }else if(cur_loc=='/wallet_withdraw'){
    page_heading = 'Withdraw';
  }else if(cur_loc=='/trade' || cur_loc=='/sell_btc' || cur_loc=='/trade_crypto'){
    page_heading = 'P2P Trade';
  }else if(cur_loc=='/support'){
    page_heading = 'Support';
  }else if(cur_loc=='/ad_create'){
    page_heading = 'Create an AD';
  }else if(cur_loc=='/ad_payment_method'){
    page_heading = 'Create an AD';
  }else if(cur_loc=='/ad_contract'){
    page_heading = 'Create an AD';
  }else if(cur_loc=='/verification'){
    page_heading = 'Join';
  }

  
  return (
    <div className="page-wrapper join-nav-bg img-fluid pb-5">
      <Navbar className="navbar navbar-dark " expand='lg' >
        <div class="container">
          <Nav.Link href="/" bsPrefix=" "><img src={logo} width="100" alt="logo" /></Nav.Link>
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
      <Container>
        <div class="join-title text-center">
          <h4 class="text-white">{page_heading}</h4>
        </div>
      </Container>
    </div>
  );
};
