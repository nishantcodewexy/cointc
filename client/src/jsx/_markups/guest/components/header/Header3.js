import React from "react";
import {
  Button,
  Nav,
  Form,
  Navbar,
  Container,
} from "react-bootstrap";
// import './header.scss'

import logo_icon from '../../app-assets/images/logo/logo.png';
import icon_user from '../../app-assets/images/icon/icon_user.png';

export const Header3 = () => {

  return (
    <header class="header2">
                <div class="inner clear">
                    <h1>
                        <a href="#"><img src={logo_icon} alt-="CoinTC" /></a>
                    </h1>
                    <nav>
                        <h2 class="hidden">메인메뉴</h2>
                        <div class="gnb_pc clear">
                            <ul class="clear">
                                <li><a href="#">P2P Trade</a></li>
                                <li><a href="#">Orders</a></li>
                                <li><a href="#">Wallet</a></li>
                                <li class="on"><a href="#">Affiliate</a></li>
                                <li><a href="#">Support</a></li>
                            </ul> 
                        </div>
                        <div class="user clear">
                            <a href="#">
                                <img src="images/icon/icon_user_color.png" alt="My page" />
                                <p>My page</p>
                            </a>
                        </div>

                        <div class="side_menu">
                            <div class="burger_box">
                                <div class="menu-icon-container">
                                    <a href="#" class="menu-icon js-menu_toggle closed">
                                        <span class="menu-icon_box">
                                            <span class="menu-icon_line menu-icon_line--1"></span>
                                            <span class="menu-icon_line menu-icon_line--2"></span>
                                            <span class="menu-icon_line menu-icon_line--3"></span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="user_m">
                                <a href="#">
                                    <img src="images/icon/icon_user_color.png" alt="My page" />
                                    <p>My page</p>
                                </a>
                            </div>
                            <div class="gnb_m">
                                <ul class="clear">
                                    <li><a href="#">P2P Trade</a></li>
                                    <li><a href="#">Orders</a></li>
                                    <li><a href="#">Wallet</a></li>
                                    <li><a href="#">Affiliate</a></li>
                                    <li><a href="#">Support</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
  );
};
