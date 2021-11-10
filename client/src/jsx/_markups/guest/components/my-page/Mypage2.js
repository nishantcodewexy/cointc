import React from 'react'
import './Mypage.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet,FormCheck } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import btc_icon from '../../app-assets/images/icon/btc.png';



export const Mypage2 = () => {
    return (     
        <div className="content">
            <section id="Profile">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">

                            <div className="my-profile mt-4 overflow-x-auto">
                                <div className="main-info-menu d-flex justify-content-between">
                                    <div className="profile-icon-menu d-flex align-items-center">
                                        <div className="info-profile mr-3">
                                            <p className="mb-0 text-primary">J</p>
                                        </div>
                                        <div className="info-profile-content">
                                            <p className="mb-0 text-primary">John Smith</p>
                                        </div>
                                    </div>
                                    <div className="main-info-right">
                                        <a href="#" className="mr-2 text-black">Email <i className="fas fa-check-circle text-primary"></i></a>
                                        <a href="#" className="mr-2 text-black">SMS <i className="fas fa-check-circle text-primary"></i></a>
                                        <a href="#" className="mr-2 text-black">ID Verification <i className="fas fa-check-circle text-primary"></i></a>
                                    </div>
                                </div>
                                <div className="profile-detail-user-id mt-3">
                                    <p>User ID: 22798810</p>
                                </div>
                                <div className="profile-footer d-flex">
                                    <div className="profile-footer-left pr-4">
                                        <h6>Total orders</h6>
                                        <h4>1654</h4>
                                    </div>
                                    <div className="profile-footer-center px-4">
                                        <h6>Completion rate</h6>
                                        <h4>98%</h4>
                                    </div>
                                    <div className="profile-footer-right px-4">
                                        <h6>Trade Review(Positive/Negative)</h6>
                                        <h4><span className="text-blue">165</span>/<sapn className="text-danger">34</sapn></h4>
                                    </div>
                                </div>
                            </div>

                            <div className="sell-user mt-5 pb-4 overflow-x-auto">
                                <h3 className="sell-user-table-title text-black">
                                    Buy from the user
                                </h3>
                                <div className="table-responsive">
                                    <table id="table" className="w-100 mt-3">
                                        <thead>
                                            <tr>
                                                <th>Coin</th>
                                                <th className="px-2">Price</th>
                                                <th className="px-2">Limit/Available</th>
                                                <th className="px-2">Payment</th>
                                                <th className="px-2">Trade</th>
                                                <th className="px-2">0Fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="d-flex align-items-center">
                                                    <div className="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div className="sell-user-content">
                                                        <p className="mb-0 cry-bold">Cryptocurrency</p>
                                                        <p className="mb-0">132 orders<span className="pl-3">100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td className="px-2">6.43 <span className="text-dark-gray">CNY</span></td>
                                                <td className="px-2">Available <br/>Limit</td>
                                                <td className="px-2">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td className="px-2"><a href="#" className="btn-bank-transfer">Bank Transfer</a></td>
                                                <td className="px-2"><a href="#" className="btn-buy">Buy</a></td>
                                            </tr>

                                            <tr>
                                                <td className="d-flex align-items-center">
                                                    <div className="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div className="sell-user-content">
                                                        <p className="mb-0 cry-bold">Cryptocurrency</p>
                                                        <p className="mb-0">132 orders<span className="pl-3">100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td className="px-2">6.43 <span className="text-dark-gray">CNY</span></td>
                                                <td className="px-2">Available <br/>Limit</td>
                                                <td className="px-2">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td className="px-2"><a href="#" className="btn-bank-transfer">Bank Transfer</a></td>
                                                <td className="px-2"><a href="#" className="btn-buy">Buy</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="sell-user mt-5 pb-4 overflow-x-auto">
                                <h3 className="sell-user-table-title text-black">
                                    Sell from the user
                                </h3>
                                <div className="table-responsive">
                                    <table id="table" className="w-100 mt-3">
                                        <thead>
                                            <tr>
                                                <th>Coin</th>
                                                <th className="px-2">Price</th>
                                                <th className="px-2">Limit/Available</th>
                                                <th className="px-2">Payment</th>
                                                <th className="px-2">Trade</th>
                                                <th className="px-2">0Fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="d-flex align-items-center">
                                                    <div className="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div className="sell-user-content">
                                                        <p className="mb-0">Cryptocurrency</p>
                                                        <p className="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td className="px-2">6.43 <span className="text-dark-gray">CNY</span></td>
                                                <td className="px-2">Available <br/>Limit</td>
                                                <td className="px-2">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td className="px-2"><a href="#" className="btn-bank-transfer">Bank Transfer</a></td>
                                                <td className="px-1"><a href="#" className="btn-outline-limit">Limited</a></td>
                                            </tr>
                                            <tr>
                                                <td className="d-flex align-items-center">
                                                    <div className="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div className="sell-user-content">
                                                        <p className="mb-0">Cryptocurrency</p>
                                                        <p className="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td className="px-1">6.43 <span className="text-dark-gray">CNY</span></td>
                                                <td className="px-1">Available <br/>Limit</td>
                                                <td className="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td className="px-2"><a href="#" className="btn-bank-transfer">Bank Transfer</a></td>
                                                <td className="px-1"><a href="#" className="btn-outline-limit">Limited</a></td>
                                            </tr>
                                            <tr>
                                                <td className="d-flex align-items-center">
                                                    <div className="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div className="sell-user-content">
                                                        <p className="mb-0">Cryptocurrency</p>
                                                        <p className="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td className="px-1">6.43 <span className="text-dark-gray">CNY</span></td>
                                                <td className="px-1">Available <br/>Limit</td>
                                                <td className="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td className="px-2"><a href="#" className="btn-bank-transfer">Bank Transfer</a></td>
                                                <td className="px-1"><a href="#" className="btn-buy">Sell USDT</a></td>
                                            </tr>
                                            <tr>
                                                <td className="d-flex align-items-center">
                                                    <div className="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div className="sell-user-content">
                                                        <p className="mb-0">Cryptocurrency</p>
                                                        <p className="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td className="px-1">6.43 <span className="text-dark-gray">CNY</span></td>
                                                <td className="px-1">Available <br/>Limit</td>
                                                <td className="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td className="px-2"><a href="#" className="btn-bank-transfer">Bank Transfer</a></td>
                                                <td className="px-1"><a href="#" className="btn-buy">Sell USDT</a></td>
                                            </tr>
                                            <tr>
                                                <td className="d-flex align-items-center">
                                                    <div className="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div className="sell-user-content">
                                                        <p className="mb-0">Cryptocurrency</p>
                                                        <p className="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td className="px-1">6.43 <span className="text-dark-gray">CNY</span></td>
                                                <td className="px-1">Available <br/>Limit</td>
                                                <td className="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td className="px-2"><a href="#" className="btn-bank-transfer">Bank Transfer</a></td>
                                                <td className="px-1"><a href="#" className="btn-buy">Sell USDT</a></td>
                                            </tr>
                                            <tr>
                                                <td className="d-flex align-items-center">
                                                    <div className="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div className="sell-user-content">
                                                        <p className="mb-0">Cryptocurrency</p>
                                                        <p className="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td className="px-1">6.43 <span className="text-dark-gray">CNY</span></td>
                                                <td className="px-1">Available <br/>Limit</td>
                                                <td className="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td className="px-2"><a href="#" className="btn-bank-transfer">Bank Transfer</a></td>
                                                <td className="px-1"><a href="#" className="btn-buy">Sell USDT</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
