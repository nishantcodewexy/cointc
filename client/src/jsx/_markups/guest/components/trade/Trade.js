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



const table_data = {
    buy_data: {
        'btc': [
            {
                first_char: "A",
                name: "Auhai8888",
                isVarified: true,
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy BTC",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ],
        'eth': [
            {
                first_char: "A",
                name: "Auhai8888",
                isVarified: true,
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy ETH",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ],
        'usdt': [
            {
                first_char: "A",
                name: "Auhai8888",
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy USDT",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ],
        'xrp': [
            {
                first_char: "A",
                name: "Auhai8888",
                isVarified: true,
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy XRP",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ],
        'eos': [
            {
                first_char: "A",
                name: "Auhai8888",
                isVarified: true,
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy EOS",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ]
    },
    sell_data: {
        'btc': [
            {
                first_char: "A",
                name: "Auhai8888",
                isVarified: true,
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy BTC",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ],
        'eth': [
            {
                first_char: "A",
                name: "Auhai8888",
                isVarified: true,
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy ETH",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ],
        'usdt': [
            {
                first_char: "A",
                name: "Auhai8888",
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy USDT",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ],
        'xrp': [
            {
                first_char: "A",
                name: "Auhai8888",
                isVarified: true,
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy XRP",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ],
        'eos': [
            {
                first_char: "A",
                name: "Auhai8888",
                isVarified: true,
                order_count: "106",
                order_text: "주문",
                percentage: "98.1",
                status: "완료",
                availability: "사용가능",
                payment: "1.65908675 BTC",
                is_limited: "한도",
                payment_range: "50,000 - 300,000 CNY",
                price: "270,042.63 CNY",
                button_text: "Buy EOS",
                button_url: "#",
                button_class: "btn_buy",
                isPopup: true
            }
        ]
    },

};
function renderTableData(data) {
    return (
        <tr>
            <td class="user">
                <p>
                    <span>{data.first_char}</span>{data.name}
                    {data.isVarified === true ? <i class="fas fa-check-circle"></i> : ''}
                </p>
                <ul class="clear">
                    <li><span>{data.order_count}</span>{data.order_text}</li>
                    <li><span>{data.percentage}</span>% {data.status}</li>
                </ul>
            </td>
            <td class="available_limit">
                <dl class="available clear">
                    <dt>{data.availability}</dt>
                    <dd>{data.payment}</dd>
                </dl>
                <dl class="limit clear">
                    <dt>{data.is_limited}</dt>
                    <dd>{data.payment_range}</dd>
                </dl>
            </td>
            <td class="payment">
                <span class="icon_method01"></span>
                <span class="icon_method02"></span>
                <span class="icon_method03"></span>
            </td>
            <td class="price">{data.price}</td>
            <td class="transaction">
                <TradeModel button_text={data.button_text} button_class={data.button_class} isPopup={data.isPopup}>
                </TradeModel>
            </td>
        </tr>
    )
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
const BuyTabContent = function (props) {
    var activeSubTab = props.valueFromParent;
    return (
        <>
            <div class="tab-content">
                <div className={"tab-pane " + (activeSubTab === "buy-btc-tab" ? "active" : "")} id="buy-btc-tab-pane" role="tabpanel" aria-labelledby="buy-btc-tab">
                    <div class="row">
                        <div class="col-12">
                            <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>유저</th>
                                            <th>Avaliable/Limited</th>
                                            <th>결제</th>
                                            <th>가격</th>
                                            <th>거래</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table_data.buy_data.btc.map(data => (renderTableData(data)))}
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
                <div className={"tab-pane " + (activeSubTab === "buy-eth-tab" ? "active" : "")} id="buy-eth-tab-pane" role="tabpanel" aria-labelledby="buy-eth-tab">
                    <div class="row">
                        <div class="col-12">
                            <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>유저</th>
                                            <th>Avaliable/Limited</th>
                                            <th>결제</th>
                                            <th>가격</th>
                                            <th>거래</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table_data.buy_data.eth.map(data => (renderTableData(data)))}
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
                <div className={"tab-pane " + (activeSubTab === "buy-usdt-tab" ? "active" : "")} id="buy-usdt-tab-pane" role="tabpanel" aria-labelledby="buy-usdt-tab">
                    <div class="row">
                        <div class="col-12">
                            <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>유저</th>
                                            <th>Avaliable/Limited</th>
                                            <th>결제</th>
                                            <th>가격</th>
                                            <th>거래</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table_data.buy_data.usdt.map(data => (renderTableData(data)))}
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
                <div className={"tab-pane " + (activeSubTab === "buy-xrp-tab" ? "active" : "")} id="buy-xrp-tab-pane" role="tabpanel" aria-labelledby="buy-xrp-tab">
                    <div class="row">
                        <div class="col-12">
                            <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>유저</th>
                                            <th>Avaliable/Limited</th>
                                            <th>결제</th>
                                            <th>가격</th>
                                            <th>거래</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table_data.buy_data.xrp.map(data => (renderTableData(data)))}
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
                <div className={"tab-pane " + (activeSubTab === "buy-eos-tab" ? "active" : "")} id="buy-eos-tab-pane" role="tabpanel" aria-labelledby="buy-eos-tab">
                    <div class="row">
                        <div class="col-12">
                            <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>유저</th>
                                            <th>Avaliable/Limited</th>
                                            <th>결제</th>
                                            <th>가격</th>
                                            <th>거래</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table_data.buy_data.eos.map(data => (renderTableData(data)))}
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
            </div>
        </>
    )
}
const SellTabContent = function (props) {
    var activeSubTab = props.valueFromParent;
    return (
        <>
            <div class="tab-content">
                <div className={"tab-pane " + (activeSubTab === "sell-btc-tab" ? "active" : "")} id="sell-btc-tab-pane" role="tabpanel" aria-labelledby="sell-btc-tab">
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
                                        {table_data.sell_data.btc.map(data => (renderTableData(data)))}
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
                <div className={"tab-pane " + (activeSubTab === "sell-eth-tab" ? "active" : "")} id="sell-eth-tab-pane" role="tabpanel" aria-labelledby="sell-eth-tab">
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
                                        {table_data.sell_data.eth.map(data => (renderTableData(data)))}
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
                <div className={"tab-pane " + (activeSubTab === "sell-usdt-tab" ? "active" : "")} id="sell-usdt-tab-pane" role="tabpanel" aria-labelledby="sell-usdt-tab">
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
                                        {table_data.sell_data.usdt.map(data => (renderTableData(data)))}
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
                <div className={"tab-pane " + (activeSubTab === "sell-xrp-tab" ? "active" : "")} id="sell-xrp-tab-pane" role="tabpanel" aria-labelledby="sell-xrp-tab">
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
                                        {table_data.sell_data.xrp.map(data => (renderTableData(data)))}
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
                <div className={"tab-pane " + (activeSubTab === "sell-eos-tab" ? "active" : "")} id="sell-eos-tab-pane" role="tabpanel" aria-labelledby="sell-eos-tab">
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
                                        {table_data.sell_data.eos.map(data => (renderTableData(data)))}
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
            </div>
        </>
    )
}

export const Trade = ({ services, useService }) => {

    
    const { account } = services;

 
    let service = useService({
        [SERVICE?.ADVERT_FIND]: services?.account.findAdvert
    });
    
    useEffect(() => {
        
    
        const { dispatchRequest } = service;
        dispatchRequest({
            type: SERVICE?.ADVERT_FIND, 
            payload: {
                "fake": true,
            },
        });

        console.log({service})
    }, []);


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
                            <ul class="buy_sell clear">
                                <li className={(activeTab === "buy-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("buy-tab")}>Buy</a></li>
                                <li className={(activeTab === "sell-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("sell-tab")}>Sell</a></li>
                            </ul>
                            {activeTab === "buy-tab" ? (
                                <ul class="coin_name clear">
                                    <li className={activeBuyTab === "buy-btc-tab" ? "on" : ""}><a href="#" onClick={() => handleBuyTab("buy-btc-tab")}>BTC</a></li>
                                    <li className={activeBuyTab === "buy-eth-tab" ? "on" : ""}><a href="#" onClick={() => handleBuyTab("buy-eth-tab")}>ETH</a></li>
                                    <li className={activeBuyTab === "buy-usdt-tab" ? "on" : ""}><a href="#" onClick={() => handleBuyTab("buy-usdt-tab")}>USDT</a></li>
                                    <li className={activeBuyTab === "buy-xrp-tab" ? "on" : ""}><a href="#" onClick={() => handleBuyTab("buy-xrp-tab")}>XRP</a></li>
                                    <li className={activeBuyTab === "buy-eos-tab" ? "on" : ""}><a href="#" onClick={() => handleBuyTab("buy-eos-tab")}>EOS</a></li>
                                </ul>
                            ) : (
                                <ul class="coin_name clear">
                                    <li className={activeSellTab === "sell-btc-tab" ? "on" : ""}><a href="#" onClick={() => handleSellTab("sell-btc-tab")}>BTC</a></li>
                                    <li className={activeSellTab === "sell-eth-tab" ? "on" : ""}><a href="#" onClick={() => handleSellTab("sell-eth-tab")}>ETH</a></li>
                                    <li className={activeSellTab === "sell-usdt-tab" ? "on" : ""}><a href="#" onClick={() => handleSellTab("sell-usdt-tab")}>USDT</a></li>
                                    <li className={activeSellTab === "sell-xrp-tab" ? "on" : ""}><a href="#" onClick={() => handleSellTab("sell-xrp-tab")}>XRP</a></li>
                                    <li className={activeSellTab === "sell-eos-tab" ? "on" : ""}><a href="#" onClick={() => handleSellTab("sell-eos-tab")}>EOS</a></li>
                                </ul>
                            )}
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
                            <a href="/ad_create" class="btn_creat"><i class="fas fa-plus-square"></i>Creat an AD</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="trade">
                <div class="container">
                    <div class="tab-content">
                        <div className={"tab-pane " + (activeTab === "buy-tab" ? "active" : "")}>
                            <BuyTabContent valueFromParent={activeBuyTab} />
                        </div>
                        <div className={"tab-pane " + (activeTab === "sell-tab" ? "active" : "")}>
                            <SellTabContent valueFromParent={activeSellTab} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
