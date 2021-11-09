import React, { useEffect, useState, useRef } from 'react';
import './Trade.css'
import { Button, Modal, Nav, ProgressBar, Tabs, Tab, Dropdown, Overlay, Tooltip, OverlayTrigger, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

// COMPONENTS
import TableGenerator from "../../../admin/components/TableGenerator.Component";
import usdt_icon from '../../app-assets/images/icon/usdt.png';
import refresh_icon from '../../app-assets/images/page/creat-ad/refresh.png';
import bank_icon from '../../app-assets/images/icon/bank-icon.png';
import money_icon from '../../app-assets/images/icon/money.png';
import chat_icon from '../../app-assets/images/icon/chat-icon.png';
import axios from 'axios';
// CONSTANTS
import { SERVICE } from "../../../../_constants";


function BankTooltip() {
    const [show, setShow] = useState(true);
    const target = useRef(null);
    // setShow(show)
    return (
        <>
            <OverlayTrigger key={'bottom'} placement={'bottom'}
                overlay={
                    <Tooltip id={`tooltip-${'bottom'}`} className="tooltip-bank-transfer"> Bank Transfer </Tooltip>
                }
            >
                <Button variant="transparent" className="align-items-center bg-transparent d-inline-flex p-0 mr-1">
                    <Image src={bank_icon} width={20} />
                </Button>
            </OverlayTrigger>
        </>
    );
}



const TradeModel = function (props) {
    const button_text = props.button_text;
    const button_class = props.button_class;
    const isPopup = props.isPopup;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Link to="#" className={button_class} onClick={isPopup ? handleShow : undefined}>
                {button_text}
            </Link>

            <Modal show={show} onHide={handleClose} size={"xl"}>

                <Modal.Body>
                    <div class="row" id="tradeModal">
                        <div class="col-sm-12 col-md-6" >
                            <div class="scroll-area-sm">
                                <div class="modal-header align-items-center">
                                    <h3 class="modal-title">Bi7752</h3>
                                    <p class="mb-0">2270 orders    99.65% completion</p>
                                </div>

                                <div class="col col-sm-12 col-md-8 mt-3">
                                    <div class="trade-my-modal">
                                        <div class="my-modal-top d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">Trade Info</h5>
                                            <a href="#" class="btn btn-ref-my-modal">30s to Refresh</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-sm-12 col-md-10 mt-4">
                                    <div class="trade-my-modal">
                                        <div class="my-modal-center">
                                            <table class="w-100">
                                                <thead>
                                                    <th class="text-light-gray font-weight-light">Price</th>
                                                    <th class="text-light-gray font-weight-light">Available</th>
                                                </thead>
                                                <tbody>
                                                    <td class="text-black">47,757.8541 USD</td>
                                                    <td class="text-black">1.546410 BTC</td>
                                                </tbody>
                                                <thead>
                                                    <th class="text-light-gray font-weight-light pt-4">Payment</th>
                                                    <th class="text-light-gray font-weight-light pt-4">Limit</th>
                                                </thead>
                                                <tbody>
                                                    <td class="text-black">60 Minutes</td>
                                                    <td class="text-black">$50,000.00 ~ $100,000.00</td>
                                                </tbody>
                                                <thead>
                                                    <th class="text-light-gray font-weight-light pt-4">Payment Method</th>
                                                    <th class="text-light-gray font-weight-light pt-4"></th>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <div class="modal-body">
                                <div class="modal-body-input">
                                    <label>How much do you want to Sell?</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Enter Amount.." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text my-input" id="basic-addon2">BTC</span>
                                        </div>
                                    </div>
                                    <p class="d-flex justify-content-end text-black">사용 가능 : 0.24810 BTC &nbsp;<span class="text-light-blue"> 전체 </span> </p>
                                </div>
                                <div class="modal-body-input">
                                    <label>How much do you want to Sell?</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Enter Amount.." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text my-input" id="basic-addon2">BTC</span>
                                        </div>
                                    </div>
                                    <p class="d-flex justify-content-end text-black">사용 가능 : 0.24810 BTC &nbsp;<span class="text-light-blue"> 전체 </span> </p>
                                    <div class="row ">
                                        <div class="col-12">
                                            <div class="md-head">Guides</div>
                                            <div class="md-dt-txt">1. Please confirm the price and amount before place this trade.</div>
                                            <div class="md-dt-txt">2. Please pay the seller in the payment window. After completed the payment, please click "I have paid". The seller will release the crypto to you after received payment. If you do not mark as paid in time, the trade will be automatically cancelled after timeout.</div>
                                            <div class="md-dt-txt">3.If you encounter trade dispute, you can open a dispute, the customer service will intervene to deal with it. For details, please see "Help</div>
                                        </div>
                                    </div>
                                    <div class="row justify-content-center mt-5 mb-5">
                                        <div class="col-4">
                                            <a href="/sell_btc" class="btn btn-primary ">Sell BTC</a>
                                        </div>
                                        <div class="col-4">
                                            <a href="#" class="btn btn-outline-limited btn-cans">Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export const Trade = ({ services, useService }) => {


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


    const currencies = [
        'btc',
        'eth',
        'usdt',
        'xrp',
        'eos'
    ];

    const trade_types = ['buy', 'sell'];
    const [tableData, setTableData] = useState([]);
    const [_activeCurrencyTab, _setActiveCurrencyTab] = useState(currencies[0] || null);
    const [_activeTradeTypeTab, _setActiveTradeTypeTab] = useState(trade_types[0] || null);
    const [_activeTabData, _setActiveTabData] = useState([]);


    useEffect(() => {
        if (data?.result?.length) {
            const result = data.result;
            let obj = {};

            currencies.forEach(currency => {
                // sell
                let sell = result.filter(item => String(item?.crypto).toLowerCase() == currency && String(item?.type).toLowerCase() == 'sell')
                let buy = result.filter(item => String(item?.crypto).toLowerCase() == currency && String(item?.type).toLowerCase() == 'buy')
                obj[currency] = { buy, sell }
            })
            setTableData(() => obj)

        }
    }, [data])

    useEffect(() => {
        if (Object.keys(tableData)?.length && _activeCurrencyTab && _activeTradeTypeTab) {
            console.log('HERE')
            _setActiveTabData(() => tableData[_activeCurrencyTab][_activeTradeTypeTab] || [])
        }
    }, [_activeTradeTypeTab, _activeCurrencyTab, tableData])

    const [activeTab, setActiveTab] = useState("buy-tab");
    const [activeBuyTab, setActiveBuyTab] = useState("buy-btc-tab");
    const [activeSellTab, setActiveSellTab] = useState("sell-btc-tab");

    const handleTab = (tab) => {
        setActiveTab(tab);
    };
    const handleBuyTab = (tab) => {
        setActiveBuyTab(tab);
    };
    const handleSellTab = (tab) => {
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
                            <ul class="buy_sell clear">{trade_types.map(type =>
                                <li key={type} className={(_activeTradeTypeTab === type ? "on" : "") + ' text-capitalize'}><a href="#" onClick={() => _setActiveTradeTypeTab(type)}>{type}</a></li>
                            )}
                            </ul>
                            <ul class="coin_name clear">{currencies.map(currency =>
                                <li key={currency} className={_activeCurrencyTab === currency ? "on" : ""}><a href="#" onClick={() => _setActiveCurrencyTab(currency)}>{currency?.toUpperCase()}</a></li>
                            )}
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
                                <dt>Money</dt>
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
                                <dt>Payment method</dt>
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
                            <a href="/ad_create" class="btn_creat"><i class="fas fa-plus-square"></i>Creat an AD</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="trade">
                <div class="container">
                    <div class="tab-content">
                        <div className={"tab-pane " + (activeTab === "buy-tab" ? "active" : "")}>
                            <RenderTabContent data={_activeTabData} />
                        </div>

                        {/*  <div className={"tab-pane " + (activeTab === "buy-tab" ? "active" : "")}>
                            <BuyTabContent valueFromParent={activeBuyTab} />
                        </div>
                        <div className={"tab-pane " + (activeTab === "sell-tab" ? "active" : "")}>
                            <SellTabContent valueFromParent={activeSellTab} />
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    )
}
/* 
function BuyTabContent(props) {

    //    btc_ads = temp1.filter(order => String(order?.crypto).toLowerCase() == "btc")

    //    sell_ads = temp1.filter(order => String(order?.type).toLowerCase() =='sells' && String(order?.crypto).lowerCase()  == 'btc')
    var activeSubTab = props.valueFromParent;
    return (
        <>
            <div class="indicator">
                <button type="button" class="btn_prev" disabled><i class="fal fa-chevron-left"></i></button>
                <span class="on">1</span>
                <span>2</span>
                <span>3</span>
                <span style={{ "cursor": "default" }}>...</span>
                <span>40</span>
                <button type="button" class="btn_next"><i class="fal fa-chevron-right"></i></button>
            </div>
        </>
    )
}

function SellTabContent(props) {
    var activeSubTab = props.valueFromParent;
    return (
        <>
            <div class="indicator">
                <button type="button" class="btn_prev" disabled><i class="fal fa-chevron-left"></i></button>
                <span class="on">1</span>
                <span>2</span>
                <span>3</span>
                <span style={{ "cursor": "default" }}>...</span>
                <span>40</span>
                <button type="button" class="btn_next"><i class="fal fa-chevron-right"></i></button>
            </div>
        </>
    )
}
 */

function RenderTabContent({ data }) {
    return <div class="tab-content">
        <div className="" id="buy-btc-tab-pane" role="tabpanel" aria-labelledby="buy-btc-tab">
            <div class="row">
                <div class="col-12">
                    <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Avaliable/Limited</th>
                                    <th>Payment</th>
                                    <th>Price</th>
                                    <th>Transaction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => <tr>
                                    <td class="user" key={item?.id}>
                                        <p>
                                            <span>{item.user?.pname[0]}</span>
                                            {/* <span></span> */}
                                            {item.user?.pname} <i class="fas fa-check-circle"></i>

                                            {/* <span>{item.user?.verified === true ? <i class="fas fa-check-circle"></i> : ''}</span> */}
                                        </p>
                                        <ul class="clear">
                                            <li><span>{/* data.order_count */"106 order"}</span></li>
                                            <li><span>{/* data.percentage */" 98.1% Completion "}</span> {/* data.status */}</li>
                                            {/* <li>  106 order | 98.1% Completion  </li> */}
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
                                        <span class="icon_method01"></span>
                                        <span class="icon_method02"></span>
                                        <span class="icon_method03"></span>
                                    </td>

                                    <td class="price">
                                        {/* {data.price} */}
                                        {item.price}
                                        {item.fiat}
                                    </td>
                                    <td class="transaction">
                                        <TradeModel button_text={data.button_text} button_class={data.button_class} isPopup={data.isPopup}>
                                        </TradeModel>
                                        <button button_text={data.button_text} button_class={data.button_class} isPopup={data.isPopup} class="new_buy_btc"  > Buy BTC</button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}