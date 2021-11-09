import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Div, Dropdown, Tabs, Tab, Sonnet, Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

import './Orders.css'

import { useSelector } from "react-redux";

import usdt_icon from '../../app-assets/images/coin/usdt.png';
import lang_ch_icon from '../../app-assets/images/nation/lang_ch.png';
import lang_ko_icon from '../../app-assets/images/nation/lang_ko.png';
import xrp_icon from '../../app-assets/images/coin/xrp.png';
import eth_icon from '../../app-assets/images/coin/eth.png';

import { SERVICE } from "../../../../_constants";


const AllordersTabContent = function (props) {
    return (
        <>
            <div className="AllordersTab">
                <div class="row" >
                    <div class="col-12">
                        <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
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
                                            <dl class="partner_date">
                                                <dt>Xuhai8888</dt>
                                                <dd>2021-08-13 16:37:58</dd>
                                            </dl>
                                        </td>
                                        <td class="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p class="light-blue">Sell</p>
                                            <p class="coin_name">USDT</p>
                                        </td>
                                        <td class="price_quantity">
                                            <dl class="d-flex justify-content-between clearfix">
                                                <dt>Price</dt>
                                                <dd>1,135.00 KRW</dd>
                                            </dl>
                                            <dl class="d-flex justify-content-between clearfix">
                                                <dt> Quantity</dt>
                                                <dd>50.00 USDT</dd>
                                            </dl>
                                        </td>
                                        <td class="price">56,750.00 KRW</td>
                                        <td class="status-red">Paid</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <dl class="partner_date">
                                                <dt>Xuhai8888</dt>
                                                <dd>2021-08-13 16:37:58</dd>
                                            </dl>
                                        </td>
                                        <td class="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p class="light-blue">Sell</p>
                                            <p class="coin_name">USDT</p>
                                        </td>
                                        <td class="price_quantity">
                                            <dl class="d-flex justify-content-between clearfix">
                                                <dt>Price</dt>
                                                <dd>1,135.00 KRW</dd>
                                            </dl>
                                            <dl class="d-flex justify-content-between clearfix">
                                                <dt> Quantity</dt>
                                                <dd>50.00 USDT</dd>
                                            </dl>
                                        </td>
                                        <td class="price">56,750.00 KRW</td>
                                        <td class="status-green">Unpaid</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <dl class="partner_date">
                                                <dt>Xuhai8888</dt>
                                                <dd>2021-08-13 16:37:58</dd>
                                            </dl>
                                        </td>
                                        <td class="asset">
                                            <img src={usdt_icon} alt="USDT" />
                                            <p class="light-blue">Sell</p>
                                            <p class="coin_name">USDT</p>
                                        </td>
                                        <td class="price_quantity">
                                            <dl class="d-flex justify-content-between clearfix">
                                                <dt>Price</dt>
                                                <dd>1,135.00 KRW</dd>
                                            </dl>
                                            <dl class="d-flex justify-content-between clearfix">
                                                <dt> Quantity</dt>
                                                <dd>50.00 USDT</dd>
                                            </dl>
                                        </td>
                                        <td class="price">56,750.00 KRW</td>
                                        <td class="status-completed">Completed</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="indicator">
                            <button type="button" class="btn_prev" disabled><i class="fal fa-chevron-left"></i></button>
                            <span class="on">1</span>
                            <span>2</span>
                            <span>3</span>
                            <span style={{ "cursor": "default" }}>...</span>
                            <span>40</span>
                            <button type="button" class="btn_next"><i class="fal fa-chevron-right"></i></button>
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
                <div class="row">
                    <div class="col-12">
                        <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Asse/Type</th>
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
                            <span style={{ "cursor": "default" }}>...</span>
                            <span>40</span>
                            <button type="button" class="btn_next"><i class="fal fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export const Orders = ({ services, useService }) => {

    const session = useSelector((state) => state?.session);

    const { account } = services;


    let service = useService({
        [SERVICE?.BULK_ORDER]: services?.account?.bulkOrder
    });
    const { data, dispatchRequest, isFetching } = service;

    useEffect(() => {
        dispatchRequest({
            type: SERVICE?.BULK_ORDER,
            payload: {
                "fake": true,
            },
        }, true);
    }, []);

    const orderTabs = {
        all: {
            label: 'all orders',
            filter(data) {

                return data
            }
        }, mine: {
            label: 'my orders', filter(data) {
                return data.filter(item => item?.user?.id === session?.user?.user?.id)
            }
        }
    }


    const [tableData, setTableData] = useState([]);
    const [_activeCurrencyTab, _setActiveCurrencyTab] = useState(orderTabs[0] || null);
    const [_activeTradeTypeTab, _setActiveTradeTypeTab] = useState([0] || null);
    const [_activeTabData, _setActiveTabData] = useState([]);
    const [activeTab, setActiveTab] = useState(Object.keys(orderTabs)[0]);


    // useEffect(() => {
    //     if (data?.result?.length) {
    //         const result = data.result;
    //         let obj = {};

    //         Object.keys(orderTabs).forEach(tab => {
    //             // sell
    //             let sell = result.filter(item => String(item?.crypto).toLowerCase() == tab && String(item?.type).toLowerCase() == 'sell')
    //             let buy = result.filter(item => String(item?.crypto).toLowerCase() == tab && String(item?.type).toLowerCase() == 'buy')
    //             obj[tab] = { buy, sell }
    //         })
    //         setTableData(() => obj)

    //     }
    // }, [data])




    const onTabClick = (tab) => {
        setActiveTab(tab);
        setTableData(() => orderTabs[tab].filter(data?.result))
    };
    return session && !isFetching ? <>
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
                                {/* <li className={(activeTab === "in-progress-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("in-progress-tab")}>In progress</a></li> */}
                                {
                                    Object.keys(orderTabs).map(tab => <li className={(activeTab === tab ? "on" : "")}>
                                        <a href="#" onClick={() => onTabClick(tab)}>{orderTabs[tab]?.label}</a>
                                    </li>)
                                }
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
            {data?.result?.length ? <section id="orders">
                <div class="container">
                    <div class="tab-content">
                        {/* <div className={"tab-pane " +(activeTab === "in-progress-tab" ? "active" : "")}>
                            <InprogressTabContent/>
                        </div> */}
                        <RenderTab data={tableData} />

                        {/* <div className={"tab-pane " + (activeTab === "all-orders-tab" ? "active" : "")}>
                            <AllordersTabContent />
                        </div>
                        <div className={"tab-pane " + (activeTab === "my-offers-tab" ? "active" : "")}>
                            <MyoffersTabContent />
                        </div> */}
                    </div>
                </div>
            </section> : <>Nothing Found!</>}
        </div>
    </> : "Loading...";

}



function RenderTab({ data }) {
    return <div className="AllordersTab">
        <div class="row" >

            {/* ============================= OUR API IN NOW IN DATA */}
            {console.log(data)}
            <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                <table>
                    <thead>
                        <tr>
                            <th>Partner/Date</th>
                            <th>Assets/Type</th>
                            <th>Price/Quantity</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => <tr>
                            <td class="user" key={item?.id}>
                                <p class="flex_object">
                                    {/* <span class="circle">{item.user?.pname[0]}</span> */}
                                    {/* <span></span> */}
                                    <span class="min">{item.user?.pname}</span>

                                </p>
                                <ul class="clear">
                                    <li><span>{"2021-08-13 16:37:58"}</span></li>
                                </ul>
                            </td>

                            <td class="available_limit">
                                <dl class="limit clear">
                                    <dt>{data.is_limited}</dt>
                                    <dd>{data.payment_range}</dd>
                                </dl>
                                <dl class="available clear">
                                    <dt>{item.max_order_price}</dt>
                                    <dt class="crypt">{item.crypto}</dt>
                                    {/* 50,000 - 300,000 CNY */}
                                    {/* <dt>{item.min_order_price}</dt> */}
                                </dl>
                            </td>

                            <td class="payment">
                                <span class="icon_method01">{}</span>
                                <span class="icon_method02"></span>
                                <span class="icon_method03"></span>
                            </td>

                            <td class="price">
                                {/* {data.price} */}
                                {item.price}
                                {item.fiat}
                            </td>
                            {/* <td class="transaction">
                                        <TradeModel button_text={data.button_text} button_class={data.button_class} isPopup={data.isPopup}>
                                        </TradeModel>
                                        <button button_text={data.button_text} button_class={data.button_class} isPopup={data.isPopup} class="new_buy_btc"  > Buy BTC</button>
                                    </td> */}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}