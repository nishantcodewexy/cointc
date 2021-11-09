import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Nav,
  Form,
  Navbar,
  Container,
} from "react-bootstrap";

import logo_icon from '../../app-assets/images/logo/logo-black.png';
import icon_user_color from '../../app-assets/images/icon/icon_user_color.png';

export const Header3 = () => {
    const  cur_loc = window.location.pathname;

    const [menuToggle, setMenuToggle] = useState(false);
    const handleClick = () => {
        setMenuToggle(!menuToggle);
    };
  return (
    <header className="header2">
        <div className="inner clear">
            <h1>
                <a href="/"><img src={logo_icon} alt-="CoinTC" /></a>
            </h1>
            <nav>
                <h2 className="hidden">메인메뉴</h2>
                <div className="gnb_pc clear">
                    <ul className="clear">
                        <li className={cur_loc==='/trade'||cur_loc==='/ad_create'||cur_loc==='/ad_payment_method'||cur_loc==='/ad_contract'?'on':''}><a href="/trade">P2P Trade</a></li>
                        <li className={cur_loc==='/orders'?'on':''}><a href="/orders">Orders</a></li>
                        <li className={cur_loc==='/wallet'?'on':''}><a href="/wallet">Wallet</a></li>
                        <li className={cur_loc==='/affiliate'?'on':''}><a href="/affiliate">Affiliate</a></li>
                        <li className={cur_loc==='/support'?'on':''}><a href="/support">Support</a></li>
                    </ul>
                </div>
                <div className="user clear">
                    <a href="my-page">
                        <img src={icon_user_color} alt="My page" />
                        <p>My page</p>
                    </a>
                </div>

                <div className="side_menu" style={menuToggle ? {'right':'0px'} : {"right":"-250px"}}>
                    <div className="burger_box">
                        <div className="menu-icon-container">
                            <a href="#" className={"menu-icon js-menu_toggle "+(menuToggle ? "opened" : "closed")} onClick={handleClick}>
                                <span className="menu-icon_box">
                                    <span className="menu-icon_line menu-icon_line--1"></span>
                                    <span className="menu-icon_line menu-icon_line--2"></span>
                                    <span className="menu-icon_line menu-icon_line--3"></span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="user_m">
                        <a href="#">
                            <img src={icon_user_color} alt="My page" />
                            <p>My page</p>
                        </a>
                    </div>
                    <div className="gnb_m">
                        <ul className="clear">
                            <li><a href="/trade">P2P Trade</a></li>
                            <li><a href="/orders">Orders</a></li>
                            <li><a href="/wallet">Wallet</a></li>
                            <li><a href="/affiliate">Affiliate</a></li>
                            <li><a href="/support">Support</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
  );
};
