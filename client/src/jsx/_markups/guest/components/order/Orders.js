import React from 'react'
import './order.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import usdt_icon from '../../app-assets/images/icon/usdt.png';
import cont_icon from '../../app-assets/images/page/order/cont.png';


export const Orders = () => {
    return (     
        <div className="Orders"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                    
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                                <Tabs defaultActiveKey="fri-accout" id="uncontrolled-tab-example">
                                    <Tab eventKey="fri-accout" title="All accounts" >
                                        <div class="container overflow-x-auto">
                                            <div class="row align-items-center justify-content-center py-3">
                                                <div class="col-md-12 py-3">
                                                    <div class="row">
                                                        <div class="col-md-6 d-flex justify-content-around">
                                                            <div class="coin">
                                                                <div class="coin-title">
                                                                    <p>Coins</p>
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
                                                                    <p>Order Type</p>
                                                                </div>
                                                                <Dropdown>
                                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                                    Sell
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item href="#"><img src={usdt_icon}/> Sell</Dropdown.Item>
                                                                        <Dropdown.Item href="#"><img src={usdt_icon}/> Sell</Dropdown.Item>
                                                                        <Dropdown.Item href="#"><img src={usdt_icon}/> Sell</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>

                                                            <div class="coin">
                                                                <div class="coin-title">
                                                                    <p>Status</p>
                                                                </div>
                                                                <Dropdown>
                                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                                    All
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item href="#"><img src={usdt_icon}/> All</Dropdown.Item>
                                                                        <Dropdown.Item href="#"><img src={usdt_icon}/> All</Dropdown.Item>
                                                                        <Dropdown.Item href="#"><img src={usdt_icon}/> All</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                            <div class="ad-bn">
                                                                <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th class="th-sm">Partner/Date</th>
                                                                <th class="th-sm">Asset/Type</th>
                                                                <th class="th-sm">Price/Quantity</th>
                                                                <th class="th-sm">Total</th>
                                                                <th class="th-sm">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <p class="text-primary">Xuhai8888</p>
                                                                    <p class="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3">
                                                                        <div class="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td class="text-danger">Paid</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p class="text-primary">Xuhai8888</p>
                                                                    <p class="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3">
                                                                        <div class="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td class="text-success">Unpaid</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p class="text-primary">Xuhai8888</p>
                                                                    <p class="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3">
                                                                        <div class="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td>Completed</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p class="text-primary">Xuhai8888</p>
                                                                    <p class="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3">
                                                                        <div class="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td>Completed</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p class="text-primary">Xuhai8888</p>
                                                                    <p class="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3">
                                                                        <div class="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td>Completed</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p class="text-primary">Xuhai8888</p>
                                                                    <p class="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3">
                                                                        <div class="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td>Completed</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="myoffer" title="My Offers">
                                        <div class="container overflow-x-auto">
                                            <div class="row align-items-center justify-content-center py-3">
                                                <div class="col-md-12 py-3">
                                                    <div class="row">
                                                        <div class="col-md-6 d-flex justify-content-around">
                                                            <div class="coin">
                                                                <div class="coin-title">
                                                                    <p>Coins</p>
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
                                                                    <p>Order Type</p>
                                                                </div>
                                                                <div class="dropdown">
                                                                    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Sell
                                                                    </button>

                                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        <a class="dropdown-item" href="#"><img src={usdt_icon}/> Sell</a>
                                                                        <a class="dropdown-item" href="#"><img src={usdt_icon}/> Sell</a>
                                                                        <a class="dropdown-item" href="#"><img src={usdt_icon}/> Sell</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="coin">
                                                                <div class="coin-title">
                                                                    <p>Status</p>
                                                                </div>
                                                                <div class="dropdown">
                                                                    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All
                                                                    </button>

                                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        <a class="dropdown-item" href="#"><img src={usdt_icon}/> All</a>
                                                                        <a class="dropdown-item" href="#"><img src={usdt_icon}/> All</a>
                                                                        <a class="dropdown-item" href="#"><img src={usdt_icon}/> All</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 d-flex justify-content-end align-items-end">
                                                            <div class="ad-bn">
                                                                <a href="#" class="btn btn-outline-primary">+  Creat an AD</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th class="th-sm">Asset/Type</th>
                                                                <th class="th-sm">Price/Quantity</th>
                                                                <th class="th-sm">Margin/Limits</th>
                                                                <th class="th-sm">Status</th>
                                                                <th class="th-sm">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3 align-items-center">
                                                                        <div class="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p class="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="margin-limit d-flex pr-3">
                                                                        <div class="left-margin-limit pr-2">
                                                                            <p class="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div class="right-margin-limit">
                                                                            <p class="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Active</td>
                                                                <td>
                                                                    <a href="#" class="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" class="btn btn-secondary mt-2 mr-1">Deactive</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3 align-items-center">
                                                                        <div class="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p class="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="margin-limit d-flex pr-3">
                                                                        <div class="left-margin-limit pr-2">
                                                                            <p class="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div class="right-margin-limit">
                                                                            <p class="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" class="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" class="btn btn-primary mt-2 mr-1">Active</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3 align-items-center">
                                                                        <div class="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p class="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="margin-limit d-flex pr-3">
                                                                        <div class="left-margin-limit pr-2">
                                                                            <p class="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div class="right-margin-limit">
                                                                            <p class="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" class="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" class="btn btn-primary mt-2 mr-1">Active</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3 align-items-center">
                                                                        <div class="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p class="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="margin-limit d-flex pr-3">
                                                                        <div class="left-margin-limit pr-2">
                                                                            <p class="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div class="right-margin-limit">
                                                                            <p class="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" class="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" class="btn btn-primary mt-2 mr-1">Active</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3 align-items-center">
                                                                        <div class="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p class="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="margin-limit d-flex pr-3">
                                                                        <div class="left-margin-limit pr-2">
                                                                            <p class="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div class="right-margin-limit">
                                                                            <p class="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" class="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" class="btn btn-primary mt-2 mr-1">Active</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div class="ass-ty d-flex align-items-center">
                                                                        <div class="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div class="ass-ty-content">
                                                                            <p class="mb-0 sell">Sell</p>
                                                                            <p class="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="price-qu d-flex pr-3 align-items-center">
                                                                        <div class="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div class="right-price-qu">
                                                                            <p class="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="margin-limit d-flex pr-3">
                                                                        <div class="left-margin-limit pr-2">
                                                                            <p class="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div class="right-margin-limit">
                                                                            <p class="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" class="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" class="btn btn-primary mt-2 mr-1">Active</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                                {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active font-weight-bold" id="fri-accout-tab" data-toggle="tab" href="#fri-accout" role="tab" aria-controls="fri-accout" aria-selected="true">All accounts</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link font-weight-bold" id="myoffer-tab" data-toggle="tab" href="#myoffer" role="tab" aria-controls="myoffer" aria-selected="false">My Offers</a>
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
