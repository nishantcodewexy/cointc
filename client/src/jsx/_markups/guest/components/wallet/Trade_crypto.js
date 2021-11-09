import React, { useEffect, useState } from 'react'
import './Trade_crypto.css'
import {  Button,Modal,Nav,ProgressBar,Tabs,Tab,Dropdown } from 'react-bootstrap';


import usdt_icon from '../../app-assets/images/icon/usdt.png';
import refresh_icon from '../../app-assets/images/page/creat-ad/refresh.png';
import bank_icon from '../../app-assets/images/icon/bank-icon.png';
import money_icon from '../../app-assets/images/icon/money.png';
import chat_icon from '../../app-assets/images/icon/chat-icon.png';

// import '@fortawesome/fontawesome-free/css/all.min.css';
// npm install --save-dev @fortawesome/fontawesome-free



 
export const Trade_crypto = () => {
    return (     
        <div className="Trade_crypto Orders"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                                
                                <Tabs defaultActiveKey="buy-tab" id="buy-sell-tabs" className="buy-sell-tab mr-3">
                                    <Tab eventKey="buy-tab" title="BUY" >
                                        
                                        <Tabs defaultActiveKey="btc-tab" id="crypto-tabs">
                                            <Tab eventKey="btc-tab" title="BTC" >
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
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

                                                                    <div class="coin">
                                                                        <div class="coin-title">
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
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="eth-tab" title="ETH">
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Money</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <img src={usdt_icon}/> USDT
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Payment Method</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All Payment
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="usdt-tab" title="USDT">
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Money</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <img src={usdt_icon}/> USDT
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Payment Method</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All Payment
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="xrp-tab" title="XRP">
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Money</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <img src={usdt_icon}/> USDT
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Payment Method</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All Payment
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="eos-tab" title="EOS">
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Money</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <img src={usdt_icon}/> USDT
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Payment Method</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All Payment
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                        </Tabs>
                                    </Tab>
                                    <Tab eventKey="sell-tab" title="SELL">
                                    <Tabs defaultActiveKey="sell-btc-tab" id="crypto-tabs">
                                            <Tab eventKey="sell-btc-tab" title="BTC" >
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Money</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <img src={usdt_icon}/> USDT
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Payment Method</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All Payment
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="sell-eth-tab" title="ETH">
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Money</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <img src={usdt_icon}/> USDT
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Payment Method</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All Payment
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="sell-usdt-tab" title="USDT">
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Money</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <img src={usdt_icon}/> USDT
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Payment Method</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All Payment
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="sell-xrp-tab" title="XRP">
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Money</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <img src={usdt_icon}/> USDT
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Payment Method</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All Payment
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="sell-eos-tab" title="EOS">
                                                <div class="container overflow-x-auto">
                                                    <div class="row align-items-center justify-content-center py-3">
                                                        <div class="col-md-12 py-3">
                                                            <div class="row">
                                                                <div class="col-md-6 d-flex justify-content-around">
                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Money</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <img src={usdt_icon}/> USDT
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                                <a class="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="coin">
                                                                        <div class="coin-title">
                                                                            <p>Payment Method</p>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All Payment
                                                                            </button>

                                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                                <a class="dropdown-item" href="#">All Payment</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                                    <div class="ad-bn">
                                                                        <a class="btn btn-ref font-weight-bold mr-2"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                                                        <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-sm">User</th>
                                                                        <th class="th-sm">Available/Limited</th>
                                                                        <th class="th-sm">Payment</th>
                                                                        <th class="th-sm">Price</th>
                                                                        <th class="th-sm">Transaction</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p class="text-primary mb-0">Xuhai8888</p>
                                                                            <p class="text-gray mb-0">106 order  |  98.1% Completion</p>
                                                                        </td>
                                                                        <td>
                                                                            <div class="ass-ty d-flex align-items-center">
                                                                                <div class="ass-ty-img pr-3">
                                                                                    <p class="mb-0">Available Limit</p>
                                                                                </div>
                                                                                <div class="ass-ty-content">
                                                                                    <p class="mb-0">1.65908675 BTC 50,000- 300,000 CNY</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="price-icon">
                                                                                <a href="#"><img src={bank_icon} width="20"/></a>
                                                                                <a href="#"><img src={money_icon} width="20"/></a>
                                                                                <a href="#"><img src={chat_icon} width="20"/></a>
                                                                            </div>
                                                                        </td>
                                                                        <td>270,042.63 CNY</td>
                                                                        <td><a href="#" class="btn btn-primary">Buy BTC</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <nav aria-label="Page navigation example">
                                                                <ul class="pagination d-flex justify-content-end">
                                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                        </Tabs>
                                    </Tab>
                                </Tabs>


                                {/* <Tab.Content>
        <Tab.Pane eventKey="buy-tab">
          AAA
        </Tab.Pane>
        <Tab.Pane eventKey="sell-tab">
         BBB
        </Tab.Pane>
      </Tab.Content> */}
                                
                                {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active font-weight-bold" id="btc-tab" data-toggle="tab" href="#btc" role="tab" aria-controls="btc" aria-selected="true">BTC</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link font-weight-bold" id="eth-tab" data-toggle="tab" href="#eth" role="tab" aria-controls="eth" aria-selected="false">ETH</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link font-weight-bold" id="usdt-tab" data-toggle="tab" href="#usdt" role="tab" aria-controls="usdt" aria-selected="false">USDT</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link font-weight-bold" id="xrp-tab" data-toggle="tab" href="#xrp" role="tab" aria-controls="xrp" aria-selected="false">XRP</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link font-weight-bold" id="eos-tab" data-toggle="tab" href="#eos" role="tab" aria-controls="eos" aria-selected="false">EOS</a>
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div> 
    )
}
