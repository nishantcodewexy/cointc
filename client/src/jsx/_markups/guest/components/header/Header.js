import React, { useEffect, useState, useRef } from "react";
import logo from '../../app-assets/images/logo/logo.png';

export const Header = () => {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 100);
        });
    }, []);

    const  cur_loc = window.location.pathname;

    const [menuToggle, setMenuToggle] = useState(false);
    const handleClick = () => {
        setMenuToggle(!menuToggle);
    };
    return (
        <header class="header1"  style={scroll ? {'backgroundColor':'rgba(0,0,0,0.75)'} : {"backgroundColor":"transparent"}}>
        <div class="inner clear">
            <h1>
                <a href="/"><img src={logo} alt-="CoinTC" /></a>
            </h1>
            <nav>
                <h2 class="hidden">메인메뉴</h2>
                <div class="gnb_pc clear">
                    <ul class="clear">
                        <li className={cur_loc==='/trade'?'on':''}><a href="/trade">P2P Trade</a></li>
                        <li className={cur_loc==='/orders'?'on':''}><a href="/orders">Orders</a></li>
                        <li className={cur_loc==='/wallet'?'on':''}><a href="/wallet">Wallet</a></li>
                        <li className={cur_loc==='/affiliate'?'on':''}><a href="/affiliate">Affiliate</a></li>
                        <li className={cur_loc==='/support'?'on':''}><a href="/support">Support</a></li>
                    </ul> 
                </div>
                <div class="search_pc">
                    <div class="form-group has-search mb-0">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input type="text" class="form-control" placeholder="Search blocks,transactions,hash..."/>
                    </div>
                </div>
                <div class="user_btn clear">
                    <a href="/login" class="btn btn_login text-white mr-3">Login</a>
                    <a href="/signup" class="btn btn_signup">Sign Up</a>
                </div>

                <div class="side_menu" style={menuToggle ? {'right':'0px'} : {"right":"-250px"}}>
                    <div class="burger_box">
                        <div class="menu-icon-container">
                            <a href="#" className={"menu-icon js-menu_toggle "+(menuToggle ? "opened" : "closed")} onClick={handleClick}> 
                                <span class="menu-icon_box">
                                    <span class="menu-icon_line menu-icon_line--1"></span>
                                    <span class="menu-icon_line menu-icon_line--2"></span>
                                    <span class="menu-icon_line menu-icon_line--3"></span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="search_m">
                        <div class="form-group has-search">
                            <span class="fa fa-search form-control-feedback"></span>
                            <input type="text" class="form-control" placeholder="Search blocks,transactions,hash..."/>
                        </div>
                    </div>
                    <div class="gnb_m">
                        <ul class="clear">
                            <li><a href="/trade">P2P Trade</a></li>
                            <li><a href="/orders">Orders</a></li>
                            <li><a href="/wallet">Wallet</a></li>
                            <li><a href="/affiliate">Affiliate</a></li>
                            <li><a href="/support">Support</a></li>
                        </ul>
                    </div>
                    <div class="user_m">
                        <a href="/login" class="btn btn_login text-white mb-2">Login</a>
                        <a href="/signup" class="btn btn_signup">Sign Up</a>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    
  );
};
