import React, { useEffect, useState, useRef } from 'react';
import './Trade.css'
import {  Button,Modal,Nav,ProgressBar,Tabs,Tab,Dropdown,Overlay,Tooltip,OverlayTrigger,Image } from 'react-bootstrap';


import usdt_icon from '../../app-assets/images/icon/usdt.png';
import refresh_icon from '../../app-assets/images/page/creat-ad/refresh.png';
import bank_icon from '../../app-assets/images/icon/bank-icon.png';
import money_icon from '../../app-assets/images/icon/money.png';
import chat_icon from '../../app-assets/images/icon/chat-icon.png';

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
        <Button variant="transparent"  className="align-items-center bg-transparent d-inline-flex p-0 mr-1">
            <Image src={bank_icon} width={20} />
        </Button>
        </OverlayTrigger>
    </>
    );
  }

  const  BuYTabLinks = ({ newsArticleId, onClickCallback }) => {
    //    console.log(props)
    const activeSubTab='dd';
    // var handleChildTab=(tab)=>{
        
    //     this.props.functionCallFromParent(tab);
    // }
    // var handleChildTab = (tab) => {
    //     this.onHeaderClick(tab);
    //   }
    return (
    <>
    <ul className={"nav nav-tabs"} id="myTab" role="tablist">
    <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "buy-btc-tab" ? "active" : "")} id="buy-btc-tab" href="#" onClick={(e) => onClickCallback(e, 'buy-btc-tab')}>BTC</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "buy-eth-tab" ? "active" : "")} id="buy-eth-tab" href="#" onClick={(e) => onClickCallback(e, 'buy-eth-tab')}>ETH</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "buy-usdt-tab" ? "active" : "")} id="buy-usdt-tab" href="#"  onClick={(e) => onClickCallback(e, 'f')}>USDT</a>
        </li>
        {/* <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "buy-xrp-tab" ? "active" : "")} id="buy-xrp-tab" href="#" onClick={props.handleChildTab1('buy-btc-tab')}>XRP</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "buy-eos-tab" ? "active" : "")} id="buy-eos-tab" href="#" onClick={props.handleChildTab1('buy-btc-tab')}>EOS</a>
        </li> */}
    </ul>
    </>
    );
}
function SellTabLinks() {
    var activeSubTab=this.props.valueFromParent;
    // var handleSubTab=(tab)=>{
    //     this.props.functionCallFromParent(tab);
    // }
    return (
    <>
    <ul className={"nav nav-tabs"} id="myTab" role="tablist">
        <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "sell-btc-tab" ? "active" : "")} id="sell-btc-tab" href="#" onClick={() => this.props.handleSubTab('s')}>BTC</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "sell-eth-tab" ? "active" : "")} id="sell-eth-tab" href="#">ETH</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "sell-usdt-tab" ? "active" : "")} id="sell-usdt-tab" href="#">USDT</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "sell-xrp-tab" ? "active" : "")} id="sell-xrp-tab" href="#" >XRP</a>
        </li>
        <li className="nav-item">
            <a className={"nav-link font-weight-bold " +(activeSubTab === "sell-eos-tab" ? "active" : "")} id="sell-eos-tab" href="#" >EOS</a>
        </li>
    </ul>
    </>
    );
}

const BuyTabContent = function (props) {
    var activeSubTab=props.valueFromParent;
    return(
        <>
        <div className="tab-content mt-4">
            <div className={"tab-pane " +(activeSubTab === "buy-btc-tab" ? "active" : "")} id="buy-btc-tab-pane" role="tabpanel" aria-labelledby="buy-btc-tab">
                <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin pay-menus">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin pay-menus">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary" data-toggle="modal" data-target="#trd-info">Buy BTC</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy BTC</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy BTC</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy BTC</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy BTC</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane " +(activeSubTab === "buy-eth-tab" ? "active" : "")} id="buy-eth-tab-pane" role="tabpanel" aria-labelledby="buy-eth-tab">
                <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy ETH</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy ETH</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy ETH</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy ETH</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy ETH</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane " +(activeSubTab === "buy-usdt-tab" ? "active" : "")} id="buy-usdt-tab-pane" role="tabpanel" aria-labelledby="buy-usdt-tab">
                <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy USDT</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy USDT</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy USDT</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy USDT</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy USDT</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane " +(activeSubTab === "buy-xrp-tab" ? "active" : "")} id="buy-xrp-tab-pane" role="tabpanel" aria-labelledby="buy-xrp-tab">
                <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy XRP</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy XRP</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy XRP</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy XRP</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy XRP</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane " +(activeSubTab === "buy-eos-tab" ? "active" : "")} id="buy-eos-tab-pane" role="tabpanel" aria-labelledby="buy-eos-tab">
            <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy EOS</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy EOS</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy EOS</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy EOS</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">Buy EOS</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
const SellTabContent = function (props) {
    var activeSubTab=props.valueFromParent;
    return(
        <>
        <div className="tab-content mt-4">
            <div className={"tab-pane " +(activeSubTab === "sell-btc-tab" ? "active" : "")} id="sell-btc-tab-pane" role="tabpanel" aria-labelledby="sell-btc-tab">
                <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin pay-menus">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin pay-menus">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary" data-toggle="modal" data-target="#trd-info">SELL BTC</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL BTC</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL BTC</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL BTC</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL BTC</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane " +(activeSubTab === "sell-eth-tab" ? "active" : "")} id="sell-eth-tab-pane" role="tabpanel" aria-labelledby="sell-eth-tab">
                <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL ETH</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL ETH</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL ETH</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL ETH</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL ETH</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane " +(activeSubTab === "sell-usdt-tab" ? "active" : "")} id="sell-usdt-tab-pane" role="tabpanel" aria-labelledby="sell-usdt-tab">
                <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL USDT</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL USDT</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL USDT</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL USDT</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL USDT</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane " +(activeSubTab === "sell-xrp-tab" ? "active" : "")} id="sell-xrp-tab-pane" role="tabpanel" aria-labelledby="sell-xrp-tab">
                <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL XRP</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL XRP</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL XRP</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL XRP</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL XRP</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane " +(activeSubTab === "sell-eos-tab" ? "active" : "")} id="sell-eos-tab-pane" role="tabpanel" aria-labelledby="sell-eos-tab">
            <div className="container overflow-x-auto">
                    <div className="row align-items-center justify-content-center py-3">
                        <div className="col-md-10 py-3">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-around">
                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Money</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                            <img src={usdt_icon}/> USDT
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="coin">
                                        <div className="coin-title">
                                            <p>Payment Method</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                All Payment
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                                <Dropdown.Item href="#">All Payment</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end align-items-end">
                                    <div className="ad-bn">
                                        <a className="btn btn-ref font-weight-bold mr-1"><img src={refresh_icon} width="20"/>Refresh</a>
                                        <a href="/ad_create" className="btn btn-outline-primary">+  Creat an AD</a>
                                    </div>
                                </div>
                            </div>

                            <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th className="th-sm">User</th>
                                        <th className="th-sm">Available/Limited</th>
                                        <th className="th-sm">Payment</th>
                                        <th className="th-sm">Price</th>
                                        <th className="th-sm">Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL EOS</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-outline-limited">Limited</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL EOS</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL EOS</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt pr-5">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                                <a href="#" className="mr-1"><img src={bank_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL EOS</a></td>
                                    </tr>
                                    <tr>
                                        <td className="tr-ft">
                                            <p className="text-primary mb-0 pd-txt">Xuhai8888 <i className="far fa-check-circle my-circle"></i></p>
                                            <p className="text-gray mb-0 trd-sub-txt">106 order  |  98.1% Completion</p>
                                        </td>
                                        <td>
                                            <div className="ass-ty d-flex ">
                                                <div className="ass-ty-img pr-3">
                                                    <p className="mb-0 text-gray txt-avls">Available<br/> Limit</p>
                                                </div>
                                                <div className="ass-ty-content">
                                                    <p className="mb-0 trd-avl ">1.65908675 BTC <br/><u>50,000- 300,000</u>  CNY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-icon">
                                            <BankTooltip/>
                                                <a href="#" className="mr-1"><img src={money_icon} width="20"/></a>
                                                <a href="#" className="mr-1"><img src={chat_icon} width="20"/></a>
                                            </div>
                                        </td>
                                        <td className="trd-avl">270,042.63 CNY</td>
                                        <td><a href="#" className="btn btn-primary">SELL EOS</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination d-flex justify-content-end">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

 

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
        <div className="Trade Orders"> 
            <section>
                <div className="container-fluid">
                    <div className="container">
                        <div className="row justify-content-center mt-4">
                            <div className="col-md-10 d-flex">
                                <ul className="nav nav-tabs buy-sell-tab mr-3" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className={"nav-link font-weight-bold " +(activeTab === "buy-tab" ? "active" : "")} id="buy-tab"  href="#" data-tab="0" onClick={() => handleTab("buy-tab")}>BUY</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={"nav-link font-weight-bold " +(activeTab === "sell-tab" ? "active" : "")} id="sell-tab" href="#" data-tab="1" onClick={() => handleTab("sell-tab")}>SELL</a>
                                    </li>
                                </ul>
                                {activeTab === "buy-tab" ? (
                                    <ul className={"nav nav-tabs"} id="myTab" role="tablist">
                                        <li className="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeBuyTab === "buy-btc-tab" ? "active" : "")} id="buy-btc-tab" href="#" onClick={() => handleBuyTab("buy-btc-tab")}>BTC</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeBuyTab === "buy-eth-tab" ? "active" : "")} id="buy-eth-tab" href="#" onClick={() => handleBuyTab("buy-eth-tab")}>ETH</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeBuyTab === "buy-usdt-tab" ? "active" : "")} id="buy-usdt-tab" href="#"  onClick={() => handleBuyTab("buy-usdt-tab")}>USDT</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeBuyTab === "buy-xrp-tab" ? "active" : "")} id="buy-xrp-tab" href="#" onClick={() => handleBuyTab("buy-xrp-tab")}>XRP</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeBuyTab === "buy-eos-tab" ? "active" : "")} id="buy-eos-tab" href="#" onClick={() => handleBuyTab("buy-eos-tab")}>EOS</a>
                                            </li>
                                    </ul>
                                ) : (
                                    <ul className={"nav nav-tabs"} id="myTab" role="tablist">
                                        <li class="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeSellTab === "sell-btc-tab" ? "active" : "")} id="sell-btc-tab" href="#" onClick={() => handleSellTab("sell-btc-tab")}>BTC</a>
                                            </li>
                                            <li class="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeSellTab === "sell-eth-tab" ? "active" : "")} id="sell-eth-tab" href="#" onClick={() => handleSellTab("sell-eth-tab")}>ETH</a>
                                            </li>
                                            <li class="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeSellTab === "sell-usdt-tab" ? "active" : "")} id="sell-usdt-tab" href="#"  onClick={() => handleSellTab("sell-usdt-tab")}>USDT</a>
                                            </li>
                                            <li class="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeSellTab === "sell-xrp-tab" ? "active" : "")} id="sell-xrp-tab" href="#" onClick={() => handleSellTab("sell-xrp-tab")}>XRP</a>
                                            </li>
                                            <li class="nav-item">
                                                <a className={"nav-link font-weight-bold " +(activeSellTab === "sell-eos-tab" ? "active" : "")} id="sell-eos-tab" href="#" onClick={() => handleSellTab("sell-eos-tab")}>EOS</a>
                                            </li>
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div class="tab-content mt-4">
                            <div className={"tab-pane " +(activeTab === "buy-tab" ? "active" : "")} id="buy" role="tabpanel" aria-labelledby="buy-tab">
                            <BuyTabContent valueFromParent={activeBuyTab}/>
                            </div>
                            <div className={"tab-pane " +(activeTab === "sell-tab" ? "active" : "")}  id="sell" role="tabpanel" aria-labelledby="sell-tab">
                            <SellTabContent valueFromParent={activeSellTab}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div> 
    )
}
