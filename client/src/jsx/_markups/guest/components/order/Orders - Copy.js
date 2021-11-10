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
                <div className="container-fluid">
                    <div className="container">
                    
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <Tabs defaultActiveKey="fri-accout" id="uncontrolled-tab-example">
                                    <Tab eventKey="fri-accout" title="All accounts" >
                                        <div className="container overflow-x-auto">
                                            <div className="row align-items-center justify-content-center py-3">
                                                <div className="col-md-12 py-3">
                                                    <div className="row">
                                                        <div className="col-md-6 d-flex justify-content-around">
                                                            <div className="coin">
                                                                <div className="coin-title">
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

                                                            <div className="coin">
                                                                <div className="coin-title">
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

                                                            <div className="coin">
                                                                <div className="coin-title">
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
                                                        <div className="col-md-6 d-flex justify-content-end align-items-end">
                                                            <div className="ad-bn">
                                                                <a href="#" className="btn btn-outline-primary">+  Creat an AD</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th className="th-sm">Partner/Date</th>
                                                                <th className="th-sm">Asset/Type</th>
                                                                <th className="th-sm">Price/Quantity</th>
                                                                <th className="th-sm">Total</th>
                                                                <th className="th-sm">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <p className="text-primary">Xuhai8888</p>
                                                                    <p className="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3">
                                                                        <div className="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td className="text-danger">Paid</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p className="text-primary">Xuhai8888</p>
                                                                    <p className="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3">
                                                                        <div className="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td className="text-success">Unpaid</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p className="text-primary">Xuhai8888</p>
                                                                    <p className="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3">
                                                                        <div className="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td>Completed</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p className="text-primary">Xuhai8888</p>
                                                                    <p className="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3">
                                                                        <div className="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td>Completed</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p className="text-primary">Xuhai8888</p>
                                                                    <p className="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3">
                                                                        <div className="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p>1,135.00 KRW 50.00 USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>56,750.00 KRW</td>
                                                                <td>Completed</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p className="text-primary">Xuhai8888</p>
                                                                    <p className="text-gray">2021-08-13 16:37:58</p>
                                                                </td>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3">
                                                                        <div className="left-price">
                                                                            <p>Price Quantity</p>
                                                                        </div>
                                                                        <div className="right-price-qu">
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
                                        <div className="container overflow-x-auto">
                                            <div className="row align-items-center justify-content-center py-3">
                                                <div className="col-md-12 py-3">
                                                    <div className="row">
                                                        <div className="col-md-6 d-flex justify-content-around">
                                                            <div className="coin">
                                                                <div className="coin-title">
                                                                    <p>Coins</p>
                                                                </div>
                                                                <div className="dropdown">
                                                                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <img src={usdt_icon}/> USDT
                                                                    </button>

                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        <a className="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                        <a className="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                        <a className="dropdown-item" href="#"><img src={usdt_icon}/> USDT</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="coin">
                                                                <div className="coin-title">
                                                                    <p>Order Type</p>
                                                                </div>
                                                                <div className="dropdown">
                                                                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Sell
                                                                    </button>

                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        <a className="dropdown-item" href="#"><img src={usdt_icon}/> Sell</a>
                                                                        <a className="dropdown-item" href="#"><img src={usdt_icon}/> Sell</a>
                                                                        <a className="dropdown-item" href="#"><img src={usdt_icon}/> Sell</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="coin">
                                                                <div className="coin-title">
                                                                    <p>Status</p>
                                                                </div>
                                                                <div className="dropdown">
                                                                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> All
                                                                    </button>

                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        <a className="dropdown-item" href="#"><img src={usdt_icon}/> All</a>
                                                                        <a className="dropdown-item" href="#"><img src={usdt_icon}/> All</a>
                                                                        <a className="dropdown-item" href="#"><img src={usdt_icon}/> All</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 d-flex justify-content-end align-items-end">
                                                            <div className="ad-bn">
                                                                <a href="#" className="btn btn-outline-primary">+  Creat an AD</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <table id="dtBasicExample" className="table mt-3" cellspacing="0" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th className="th-sm">Asset/Type</th>
                                                                <th className="th-sm">Price/Quantity</th>
                                                                <th className="th-sm">Margin/Limits</th>
                                                                <th className="th-sm">Status</th>
                                                                <th className="th-sm">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3 align-items-center">
                                                                        <div className="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p className="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="margin-limit d-flex pr-3">
                                                                        <div className="left-margin-limit pr-2">
                                                                            <p className="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div className="right-margin-limit">
                                                                            <p className="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Active</td>
                                                                <td>
                                                                    <a href="#" className="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" className="btn btn-secondary mt-2 mr-1">Deactive</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3 align-items-center">
                                                                        <div className="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p className="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="margin-limit d-flex pr-3">
                                                                        <div className="left-margin-limit pr-2">
                                                                            <p className="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div className="right-margin-limit">
                                                                            <p className="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" className="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" className="btn btn-primary mt-2 mr-1">Active</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3 align-items-center">
                                                                        <div className="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p className="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="margin-limit d-flex pr-3">
                                                                        <div className="left-margin-limit pr-2">
                                                                            <p className="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div className="right-margin-limit">
                                                                            <p className="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" className="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" className="btn btn-primary mt-2 mr-1">Active</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3 align-items-center">
                                                                        <div className="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p className="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="margin-limit d-flex pr-3">
                                                                        <div className="left-margin-limit pr-2">
                                                                            <p className="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div className="right-margin-limit">
                                                                            <p className="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" className="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" className="btn btn-primary mt-2 mr-1">Active</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3 align-items-center">
                                                                        <div className="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p className="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="margin-limit d-flex pr-3">
                                                                        <div className="left-margin-limit pr-2">
                                                                            <p className="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div className="right-margin-limit">
                                                                            <p className="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" className="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" className="btn btn-primary mt-2 mr-1">Active</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="ass-ty d-flex align-items-center">
                                                                        <div className="ass-ty-img pr-3">
                                                                            <img src={usdt_icon}/>
                                                                        </div>
                                                                        <div className="ass-ty-content">
                                                                            <p className="mb-0 sell">Sell</p>
                                                                            <p className="mb-0 text-dark-gray">USDT</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-qu d-flex pr-3 align-items-center">
                                                                        <div className="left-price pr-2">
                                                                            <img src={cont_icon} width="24"/>
                                                                        </div>
                                                                        <div className="right-price-qu">
                                                                            <p className="mb-0">6.23 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="margin-limit d-flex pr-3">
                                                                        <div className="left-margin-limit pr-2">
                                                                            <p className="mb-0">Margin <br/> Limits</p>
                                                                        </div>
                                                                        <div className="right-margin-limit">
                                                                            <p className="mb-0">110.00 % <br/> 1,000 ~ 10,000 CNY</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Deactive</td>
                                                                <td>
                                                                    <a href="#" className="btn btn-outline-secondary mt-2 mr-1">Edit</a>
                                                                    <a href="#" className="btn btn-primary mt-2 mr-1">Active</a>
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
