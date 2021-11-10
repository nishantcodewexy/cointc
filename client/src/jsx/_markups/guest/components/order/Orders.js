import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Div, Dropdown, Tabs, Tab, Sonnet, Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import usdt_icon from '../../app-assets/images/coin/usdt.png';
import lang_ch_icon from '../../app-assets/images/nation/lang_ch.png';
import lang_ko_icon from '../../app-assets/images/nation/lang_ko.png';
import xrp_icon from '../../app-assets/images/coin/xrp.png';
import eth_icon from '../../app-assets/images/coin/eth.png';

import { SERVICE } from "../../../../_constants";


const InprogressTabContent = function (props) {
    return (
        <>
            <div className="InprogressTab">
                <div className="row">
                    <div className="col-12">
                        <div className="table_container wow fadeInUp" data-wow-delay="0.6s">
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
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="red">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Active</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_deactive">Deactive</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="blue">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Deactive</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_active">Active</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="red">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ko_icon} alt="kor" />
                                            <p>1,200 KRW</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Deactive</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_active">Active</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="blue">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ko_icon} alt="kor" />
                                            <p>1,200 KRW</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Deactive</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_active">Active</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={xrp_icon} alt="XRP" />
                                            <p className="red">Sell</p>
                                            <p className="coin_name">XRP</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Active</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_deactive">Deactive</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={xrp_icon} alt="XRP" />
                                            <p className="blue">Sell</p>
                                            <p className="coin_name">XRP</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Active</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_deactive">Deactive</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={eth_icon} alt="ETH" />
                                            <p className="red">Sell</p>
                                            <p className="coin_name">ETH</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Active</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_deactive">Deactive</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="indicator">
                            <button type="button" className="btn_prev" disabled><i className="fal fa-chevron-left"></i></button>
                            <span className="on">1</span>
                            <span>2</span>
                            <span>3</span>
                            <span style={{ "cursor": "default" }}>...</span>
                            <span>40</span>
                            <button type="button" className="btn_next"><i className="fal fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
const AllordersTabContent = function (props) {
    return (
        <>
            <div className="AllordersTab">
                <div className="row" >
                    <div className="col-12">
                        <div className="table_container wow fadeInUp" data-wow-delay="0.6s">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Partner/Date</th>
                                        <th>Asset/Type</th>
                                        <th>Price/Quantity</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <dl className="partner_date">
                                                <dt>Xuhai8888</dt>
                                                <dd>2021-08-13 16:37:58</dd>
                                            </dl>
                                        </td>
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="light-blue">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="price_quantity">
                                            <dl className="d-flex justify-content-between clearfix">
                                                <dt>Price</dt>
                                                <dd>1,135.00 KRW</dd>
                                            </dl>
                                            <dl className="d-flex justify-content-between clearfix">
                                                <dt> Quantity</dt>
                                                <dd>50.00 USDT</dd>
                                            </dl>
                                        </td>
                                        <td className="price">56,750.00 KRW</td>
                                        <td className="status-red">Paid</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <dl className="partner_date">
                                                <dt>Xuhai8888</dt>
                                                <dd>2021-08-13 16:37:58</dd>
                                            </dl>
                                        </td>
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="light-blue">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="price_quantity">
                                            <dl className="d-flex justify-content-between clearfix">
                                                <dt>Price</dt>
                                                <dd>1,135.00 KRW</dd>
                                            </dl>
                                            <dl className="d-flex justify-content-between clearfix">
                                                <dt> Quantity</dt>
                                                <dd>50.00 USDT</dd>
                                            </dl>
                                        </td>
                                        <td className="price">56,750.00 KRW</td>
                                        <td className="status-green">Unpaid</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <dl className="partner_date">
                                                <dt>Xuhai8888</dt>
                                                <dd>2021-08-13 16:37:58</dd>
                                            </dl>
                                        </td>
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="light-blue">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="price_quantity">
                                            <dl className="d-flex justify-content-between clearfix">
                                                <dt>Price</dt>
                                                <dd>1,135.00 KRW</dd>
                                            </dl>
                                            <dl className="d-flex justify-content-between clearfix">
                                                <dt> Quantity</dt>
                                                <dd>50.00 USDT</dd>
                                            </dl>
                                        </td>
                                        <td className="price">56,750.00 KRW</td>
                                        <td className="status-completed">Completed</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="indicator">
                            <button type="button" className="btn_prev" disabled><i className="fal fa-chevron-left"></i></button>
                            <span className="on">1</span>
                            <span>2</span>
                            <span>3</span>
                            <span style={{ "cursor": "default" }}>...</span>
                            <span>40</span>
                            <button type="button" className="btn_next"><i className="fal fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
const MyoffersTabContent = function (props) {
    return (
        <>
            <div className="MyoffersTab">
                <div className="row">
                    <div className="col-12">
                        <div className="table_container wow fadeInUp" data-wow-delay="0.6s">
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
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="red">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Active</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_deactive">Deactive</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="blue">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Deactive</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_active">Active</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="red">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ko_icon} alt="kor" />
                                            <p>1,200 KRW</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Deactive</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_active">Active</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p className="blue">Sell</p>
                                            <p className="coin_name">USDT</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ko_icon} alt="kor" />
                                            <p>1,200 KRW</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Deactive</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_active">Active</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={xrp_icon} alt="XRP" />
                                            <p className="red">Sell</p>
                                            <p className="coin_name">XRP</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Active</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_deactive">Deactive</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={xrp_icon} alt="XRP" />
                                            <p className="blue">Sell</p>
                                            <p className="coin_name">XRP</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Active</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_deactive">Deactive</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="asset">
                                            <img src={eth_icon} alt="ETH" />
                                            <p className="red">Sell</p>
                                            <p className="coin_name">ETH</p>
                                        </td>
                                        <td className="Price">
                                            <img src={lang_ch_icon} alt="chn" />
                                            <p>6.23 CNY</p>
                                        </td>
                                        <td className="margine_limits">
                                            <dl className="margine clear">
                                                <dt>Margine</dt>
                                                <dd>1.65908675 BTC</dd>
                                            </dl>
                                            <dl className="limits clear">
                                                <dt>Limits</dt>
                                                <dd>50,000 - 300,000 CNY</dd>
                                            </dl>
                                        </td>
                                        <td className="status">Active</td>
                                        <td className="action clear">
                                            <a href="#" className="btn_edit">Edit</a>
                                            <a href="#" className="btn_deactive">Deactive</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="indicator">
                            <button type="button" className="btn_prev" disabled><i className="fal fa-chevron-left"></i></button>
                            <span className="on">1</span>
                            <span>2</span>
                            <span>3</span>
                            <span style={{ "cursor": "default" }}>...</span>
                            <span>40</span>
                            <button type="button" className="btn_next"><i className="fal fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export const Orders = ({ services, useService }) => {


    const { account } = services;


    let service = useService({
        [SERVICE?.ADVERT_FIND]: services?.account?.findAdvert
    });
    const { data, dispatchRequest } = service;

    useEffect(() => {
        dispatchRequest({
            type: SERVICE?.ADVERT_FIND,
            payload: {
                "fake": true,
            },
        }, true);
    }, []);



    const [activeTab, setActiveTab] = useState("all-orders-tab");
    const handleTab = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className="content">
            <section id="mainTop">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="wow animate__animated fadeInDown" data-wow-delay="0.3s">Orders</h3>
                            
                        </div>
                    </div>
                </div>
            </section>

            <section id="lnb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <ul className="option clear">
                                <li className={(activeTab === "in-progress-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("in-progress-tab")}>In progress</a></li>
                                <li className={(activeTab === "all-orders-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("all-orders-tab")}>All Orders</a></li>
                                <li className={(activeTab === "my-offers-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("my-offers-tab")}>My Offers</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="setting">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <dl className="coins">
                                <dt>Coins</dt>

                                <dd>
                                    <select name="" id="">
                                        <option value="USDT">USDT</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl className="order_type">
                                <dt>Order Type</dt>
                                <dd>
                                    <select name="" id="">
                                        <option value="sell">sell</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl className="status">
                                <dt>Status</dt>
                                <dd>
                                    <select name="" id="">
                                        <option value="all">All</option>
                                    </select>
                                </dd>
                            </dl>
                            <a href="#" className="btn_creat"><i className="fas fa-plus-square"></i>Creat an AD</a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="orders">
                <div className="container">
                    <div className="tab-content">
                        <div className={"tab-pane " + (activeTab === "in-progress-tab" ? "active" : "")}>
                            <InprogressTabContent />
                        </div>
                        <div className={"tab-pane " + (activeTab === "all-orders-tab" ? "active" : "")}>
                            <AllordersTabContent />
                        </div>
                        <div className={"tab-pane " + (activeTab === "my-offers-tab" ? "active" : "")}>
                            <MyoffersTabContent />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


