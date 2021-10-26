import React, { useEffect, useState, useRef } from 'react';
import './Trade.css'
import {  Button,Modal,Nav,ProgressBar,Tabs,Tab,Dropdown,Overlay,Tooltip,OverlayTrigger,Image } from 'react-bootstrap';


import usdt_icon from '../../app-assets/images/icon/usdt.png';
import refresh_icon from '../../app-assets/images/page/creat-ad/refresh.png';
import bank_icon from '../../app-assets/images/icon/bank-icon.png';
import money_icon from '../../app-assets/images/icon/money.png';
import chat_icon from '../../app-assets/images/icon/chat-icon.png';


 

export const Trade = () => {
    const [activeTab, setActiveTab] = useState("buy-tab");
    const [activeBuyTab, setActiveBuyTab] = useState("buy-btc-tab");
    const [activeSellTab, setActiveSellTab] = useState("sell-btc-tab");
    const handleTab = (tab) => {
        // console.log(tab)
        // update the state to tab1
        setActiveTab(tab);
    };
    const handleBuyTab = (tab) => {
        // console.log(tab);
        // console.log('g')
        // update the state to tab1
        setActiveBuyTab(tab);
    };
    const handleSellTab = (tab) => {
        // console.log(tab);
        // console.log('g')
        // update the state to tab1
        setActiveSellTab(tab);
    };
    
    return (     
        <div class="content">
                <section id="mainTop">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <h3 class="wow fadeInDown" data-wow-delay="0.3s">P2P Trade</h3>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="lnb">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <ul class="buy_sell clear">
                                    <li class="on"><a href="#">Buy</a></li>
                                    <li><a href="#">Sell</a></li>
                                </ul>
                                <ul class="coin_name clear">
                                    <li class="on"><a href="#">BTC</a></li>
                                    <li><a href="#">ETH</a></li>
                                    <li><a href="#">USDT</a></li>
                                    <li><a href="#">XRP</a></li>
                                    <li><a href="#">EOS</a></li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </section>
                
                <section id="setting">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <dl class="money">
                                    <dt>화폐</dt>
                                    <dd>
                                        <select name="" id="">
                                            <option value="CNY">CNY</option>
                                            <option value="AED">AED</option>
                                            <option value="AMD">AMD</option>
                                            <option value="ARS">ARS</option>
                                            <option value="AUD">AUD</option>
                                            <option value="BDT">BDT</option>
                                            <option value="BHD">BHD</option>
                                        </select>
                                    </dd>
                                </dl>
                                <dl class="method">
                                    <dt>결제 방법</dt>
                                    <dd>
                                        <select name="" id="">
                                            <option value="all_payment">All payments</option>
                                            <option value="bank_transfer">Bank Transfer</option>
                                            <option value="wechat">WeChat</option>
                                            <option value="alipay">Alipay</option>
                                            <option value="cash_deposit">Cash Deposit to Bank</option>
                                        </select>
                                    </dd>
                                </dl>
                                <a href="#" class="btn_creat"><i class="fas fa-plus-square"></i>Creat an AD</a>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="trade">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>유저</th>
                                                <th>사용가능/한도</th>
                                                <th>결제</th>
                                                <th>가격</th>
                                                <th>거래</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="user">
                                                    <p><span>A</span>Auhai8888<i class="fas fa-check-circle"></i></p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                    <span class="icon_method02"></span>
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>B</span>Buhai8888<i class="fas fa-check-circle"></i></p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                    <span class="icon_method02"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_limited">Limited</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>C</span>Cuhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>D</span>Duhai8888<i class="fas fa-check-circle"></i></p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method02"></span>
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>E</span>Euhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>F</span>Fuhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>G</span>Guhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                    <span class="icon_method02"></span>
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>H</span>Huhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>I</span>Iuhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>J</span>Juhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>F</span>Fuhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>L</span>Luhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method01"></span>
                                                    <span class="icon_method02"></span>
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy"s>Buy BTC</a></td>
                                            </tr>

                                            <tr>
                                                <td class="user">
                                                    <p><span>M</span>Muhai8888</p>
                                                    <ul class="clear">
                                                        <li><span>106</span>주문</li>
                                                        <li><span>98.1</span>% 완료</li>
                                                    </ul>
                                                </td>
                                                <td class="available_limit">
                                                    <dl class="available clear">
                                                        <dt>사용가능</dt>
                                                        <dd>1.65908675 BTC</dd>
                                                    </dl>
                                                    <dl class="limit clear">
                                                        <dt>한도</dt>
                                                        <dd>50,000 - 300,000 CNY</dd>
                                                    </dl>
                                                </td>
                                                <td class="payment">
                                                    <span class="icon_method03"></span>
                                                </td>
                                                <td class="price">270,042.63 CNY</td>
                                                <td class="transaction"><a href="#" class="btn_buy">Buy BTC</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="indicator">
                                    <button type="button" class="btn_prev" disabled><i class="fal fa-chevron-left"></i></button>
                                    <span class="on">1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span style={{"cursor":"default"}}>...</span>
                                    <span>40</span>
                                    <button type="button" class="btn_next"><i class="fal fa-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    )
}
