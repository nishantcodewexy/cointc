import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet,Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import usdt_icon from '../../app-assets/images/coin/usdt.png';
import lang_ch_icon from '../../app-assets/images/nation/lang_ch.png';
import lang_ko_icon from '../../app-assets/images/nation/lang_ko.png';
import xrp_icon from '../../app-assets/images/coin/xrp.png';
import eth_icon from '../../app-assets/images/coin/eth.png';

const InprogressTabContent = function (props) {
    return(
        <>
        <div class="row">
            <div class="col-12">
                <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                    <table>
                        <thead>
                            <tr>
                                <th>Asset/Type</th>
                                <th>Price</th>
                                <th>Margine/Limits</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="blue">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Deactive</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_active">Active</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ko_icon} alt="kor" />
                                    <p>1,200 KRW</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Deactive</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_active">Active</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="blue">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ko_icon} alt="kor" />
                                    <p>1,200 KRW</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Deactive</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_active">Active</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={xrp_icon} alt="XRP" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">XRP</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={xrp_icon} alt="XRP" />
                                    <p class="blue">Sell</p>
                                    <p class="coin_name">XRP</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={eth_icon} alt="ETH" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">ETH</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
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
        </>
    );
}
const AllordersTabContent = function (props) {
    return(
        <>
        <div class="row">
            <div class="col-12">
                <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                    <table>
                        <thead>
                            <tr>
                                <th>Asset/Type</th>
                                <th>Price</th>
                                <th>Margine/Limits</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="blue">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Deactive</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_active">Active</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ko_icon} alt="kor" />
                                    <p>1,200 KRW</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Deactive</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_active">Active</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="blue">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ko_icon} alt="kor" />
                                    <p>1,200 KRW</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Deactive</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_active">Active</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={xrp_icon} alt="XRP" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">XRP</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={xrp_icon} alt="XRP" />
                                    <p class="blue">Sell</p>
                                    <p class="coin_name">XRP</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={eth_icon} alt="ETH" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">ETH</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
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
        </>
    );
}
const MyoffersTabContent = function (props) {
    return(
        <>
        <div class="row">
            <div class="col-12">
                <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                    <table>
                        <thead>
                            <tr>
                                <th>Asset/Type</th>
                                <th>Price</th>
                                <th>Margine/Limits</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="blue">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Deactive</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_active">Active</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ko_icon} alt="kor" />
                                    <p>1,200 KRW</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Deactive</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_active">Active</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={usdt_icon} alt="USDT" />
                                    <p class="blue">Sell</p>
                                    <p class="coin_name">USDT</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ko_icon} alt="kor" />
                                    <p>1,200 KRW</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Deactive</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_active">Active</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={xrp_icon} alt="XRP" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">XRP</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={xrp_icon} alt="XRP" />
                                    <p class="blue">Sell</p>
                                    <p class="coin_name">XRP</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
                            </tr>

                            <tr>
                                <td class="asset">
                                    <img src={eth_icon} alt="ETH" />
                                    <p class="red">Sell</p>
                                    <p class="coin_name">ETH</p>
                                </td>
                                <td class="Price">
                                    <img src={lang_ch_icon} alt="chn" />
                                    <p>6.23 CNY</p>
                                </td>
                                <td class="margine_limits">
                                    <dl class="margine clear">
                                        <dt>Margine</dt>
                                        <dd>1.65908675 BTC</dd>
                                    </dl>
                                    <dl class="limits clear">
                                        <dt>Limits</dt>
                                        <dd>50,000 - 300,000 CNY</dd>
                                    </dl>
                                </td>
                                <td class="status">Active</td>
                                <td class="action clear">
                                    <a href="#" class="btn_edit">Edit</a>
                                    <a href="#" class="btn_deactive">Deactive</a>
                                </td>
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
        </>
    );
}
export const Orders = () => {
    const [activeTab, setActiveTab] = useState("all-orders-tab");
    const handleTab = (tab) => {
        setActiveTab(tab);
    };
    return (     
        <div class="content">
            <section id="mainTop">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h3 class="wow fadeInDown" data-wow-delay="0.3s">Orders</h3>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="lnb">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <ul class="option clear">
                                <li className={(activeTab === "in-progress-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("in-progress-tab")}>In progress</a></li>
                                <li className={(activeTab === "all-orders-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("all-orders-tab")}>All Orders</a></li>
                                <li className={(activeTab === "my-offers-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("my-offers-tab")}>My Offers</a></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </section>
            
            <section id="setting">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <dl class="coins">
                                <dt>Coins</dt>
                                <dd>
                                    <select name="" id="">
                                        <option value="USDT">USDT</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl class="order_type">
                                <dt>Order Type</dt>
                                <dd>
                                    <select name="" id="">
                                        <option value="sell">sell</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl class="status">
                                <dt>Status</dt>
                                <dd>
                                    <select name="" id="">
                                        <option value="all">All</option>
                                    </select>
                                </dd>
                            </dl>
                            <a href="#" class="btn_creat"><i class="fas fa-plus-square"></i>Creat an AD</a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="orders">
                <div class="container">
                    <div class="tab-content">
                        <div className={"tab-pane " +(activeTab === "in-progress-tab" ? "active" : "")}>
                            <InprogressTabContent/>
                        </div>
                        <div className={"tab-pane " +(activeTab === "all-orders-tab" ? "active" : "")}>
                            <AllordersTabContent/>
                        </div>
                        <div className={"tab-pane " +(activeTab === "my-offers-tab" ? "active" : "")}>
                            <MyoffersTabContent/>
                        </div>
                    </div>                    
                </div>
            </section>
        </div> 
    )
}
