import React, { useEffect, useState, useRef } from 'react';

import logo_white from '../../app-assets/images/logo/logo-white.png';
import icon_user from '../../app-assets/images/icon/icon_user.png';

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

  const [scroll, setScroll] = useState(false);

 useEffect(() => {
   window.addEventListener("scroll", () => {
     setScroll(window.scrollY > 100);
   });
 }, []);
  
  return (
    <header class="header1"  style={scroll ? {'background-color':'rgba(0,0,0,0.75)'} : {"background-color":"transparent"}}>
        <div class="inner clear">
            <h1>
                <a href="#"><img src={logo_white} alt-="CoinTC" /></a>
            </h1>
            <nav>
                <h2 class="hidden">메인메뉴</h2>
                <div class="gnb_pc clear">
                    <ul class="clear">
                        <li className={cur_loc=='/trade'||cur_loc=='/' ? "on":""}><a href="/trade">P2P Trade</a></li>
                        <li className={cur_loc=='/orders' ? "on":""}><a href="/orders">Orders</a></li>
                        <li className={cur_loc=='/wallet' ? "on":""}><a href="/wallet">Wallet</a></li>
                        <li><a href="#">Affiliate</a></li>
                        <li><a href="#">Support</a></li>
                    </ul> 
                </div>
                <div class="user clear">
                    <a href="#">
                        <img src={icon_user} alt="My page" />
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
                            <img src={icon_user} alt="My page" />
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
