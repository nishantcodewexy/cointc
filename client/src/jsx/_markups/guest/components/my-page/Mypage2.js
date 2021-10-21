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
        <div className="Mypage"> 
            <section id="profile">
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-10 col-sm-12">

                                <div class="my-profile mt-4 overflow-x-auto">
                                    <h4 class="my-profile-title">MY Profile</h4>
                                    <div class="main-info-menu d-flex justify-content-between">
                                        <div class="profile-icon-menu d-flex align-items-center">
                                            <div class="info-profile mr-3">
                                                <p class="mb-0 text-primary">J</p>
                                            </div>
                                            <div class="info-profile-content">
                                                <p class="mb-0 text-primary">John Smith</p>
                                            </div>
                                        </div>
                                        <div class="main-info-right">
                                            <a href="#" class="mr-2 text-black">Email <i class="fas fa-check-circle text-primary"></i></a>
                                            <a href="#" class="mr-2 text-black">SMS <i class="fas fa-check-circle text-primary"></i></a>
                                            <a href="#" class="mr-2 text-black">ID Verification <i class="fas fa-check-circle text-primary"></i></a>
                                        </div>
                                    </div>
                                    <div class="profile-detail-user-id mt-3">
                                        <p class="text-black">User ID: 22798810</p>
                                    </div>
                                    <div class="profile-footer d-flex">
                                        <div class="profile-footer-left pr-4">
                                            <h6 class="text-secondary">Total orders</h6>
                                            <h4>1654</h4>
                                        </div>
                                        <div class="profile-footer-center px-4">
                                            <h6 class="text-secondary">Completion rate</h6>
                                            <h4>98%</h4>
                                        </div>
                                        <div class="profile-footer-right px-4">
                                            <h6 class="text-secondary">Trade Review(Positive/Negative)</h6>
                                            <h4><span class="text-success">165</span>/<sapn class="text-danger">34</sapn></h4>
                                        </div>
                                    </div>
                                </div>

                                <div class="sell-user mt-5 pb-4 overflow-x-auto">
                                    <h3 class="sell-user-table-title text-black">
                                        Buy from the user
                                    </h3>
                                    <table id="table" class="w-100 mt-3">
                                        <thead>
                                            <tr>
                                                <th>Coin</th>
                                                <th class="px-2">Price</th>
                                                <th class="px-2">Limit/Available</th>
                                                <th class="px-2">Payment</th>
                                                <th class="px-2">Trade</th>
                                                <th class="px-2">0Fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="d-flex align-items-center">
                                                    <div class="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div class="sell-user-content">
                                                        <p class="mb-0">Cryptocurrency</p>
                                                        <p class="mb-0">132 orders<span class="pl-3">100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td class="px-2">6.43 <span class="text-dark-gray">CNY</span></td>
                                                <td class="px-2">Available <br/>Limit</td>
                                                <td class="px-2">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td class="px-2"><a href="#" class="btn btn-bank-transfer text-danger">Bank Transfer</a></td>
                                                <td class="px-2"><a href="#" class="btn btn-primary">Buy</a></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex align-items-center">
                                                    <div class="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div class="sell-user-content">
                                                        <p class="mb-0">Cryptocurrency</p>
                                                        <p class="mb-0">132 orders<span class="pl-3">100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td class="px-2">6.43 <span class="text-dark-gray">CNY</span></td>
                                                <td class="px-2">Available <br/>Limit</td>
                                                <td class="px-2">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td class="px-2"><a href="#" class="btn btn-bank-transfer text-danger">Bank Transfer</a></td>
                                                <td class="px-2"><a href="#" class="btn btn-primary">Buy</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="sell-user mt-5 pb-4 overflow-x-auto">
                                    <h3 class="sell-user-table-title text-black">
                                        Sell from the user
                                    </h3>
                                    <table id="table" class="w-100 mt-3">
                                        <thead>
                                            <tr>
                                                <th>Coin</th>
                                                <th class="px-2">Price</th>
                                                <th class="px-2">Limit/Available</th>
                                                <th class="px-2">Payment</th>
                                                <th class="px-2">Trade</th>
                                                <th class="px-2">0Fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="d-flex align-items-center">
                                                    <div class="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div class="sell-user-content">
                                                        <p class="mb-0">Cryptocurrency</p>
                                                        <p class="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td class="px-2">6.43 <span class="text-dark-gray">CNY</span></td>
                                                <td class="px-2">Available <br/>Limit</td>
                                                <td class="px-2">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td class="px-2"><a href="#" class="btn btn-bank-transfer text-danger">Bank Transfer</a></td>
                                                <td class="px-2"><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex align-items-center">
                                                    <div class="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div class="sell-user-content">
                                                        <p class="mb-0">Cryptocurrency</p>
                                                        <p class="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td class="px-1">6.43 <span class="text-dark-gray">CNY</span></td>
                                                <td class="px-1">Available <br/>Limit</td>
                                                <td class="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td class="px-1"><a href="#" class="btn btn-bank-transfer text-danger">Bank Transfer</a></td>
                                                <td class="px-1"><a href="#" class="btn btn-outline-secondary">Limited</a></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex align-items-center">
                                                    <div class="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div class="sell-user-content">
                                                        <p class="mb-0">Cryptocurrency</p>
                                                        <p class="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td class="px-1">6.43 <span class="text-dark-gray">CNY</span></td>
                                                <td class="px-1">Available <br/>Limit</td>
                                                <td class="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td class="px-1"><a href="#" class="btn btn-bank-transfer text-danger">Bank Transfer</a></td>
                                                <td class="px-1"><a href="#" class="btn btn-primary">Sell USDT</a></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex align-items-center">
                                                    <div class="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div class="sell-user-content">
                                                        <p class="mb-0">Cryptocurrency</p>
                                                        <p class="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td class="px-1">6.43 <span class="text-dark-gray">CNY</span></td>
                                                <td class="px-1">Available <br/>Limit</td>
                                                <td class="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td class="px-1"><a href="#" class="btn btn-bank-transfer text-danger">Bank Transfer</a></td>
                                                <td class="px-1"><a href="#" class="btn btn-primary">Sell USDT</a></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex align-items-center">
                                                    <div class="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div class="sell-user-content">
                                                        <p class="mb-0">Cryptocurrency</p>
                                                        <p class="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td class="px-1">6.43 <span class="text-dark-gray">CNY</span></td>
                                                <td class="px-1">Available <br/>Limit</td>
                                                <td class="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td class="px-1"><a href="#" class="btn btn-bank-transfer text-danger">Bank Transfer</a></td>
                                                <td class="px-1"><a href="#" class="btn btn-primary">Sell USDT</a></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex align-items-center">
                                                    <div class="sell-user-icon pr-2">
                                                        <img src={btc_icon}/>
                                                    </div>
                                                    <div class="sell-user-content">
                                                        <p class="mb-0">Cryptocurrency</p>
                                                        <p class="mb-0">132 orders <span> 100%completion</span></p>
                                                    </div>
                                                </td>
                                                <td class="px-1">6.43 <span class="text-dark-gray">CNY</span></td>
                                                <td class="px-1">Available <br/>Limit</td>
                                                <td class="px-1">84,005.53 USDT <br/>$26,532-$24444.7</td>
                                                <td class="px-1"><a href="#" class="btn btn-bank-transfer text-danger">Bank Transfer</a></td>
                                                <td class="px-1"><a href="#" class="btn btn-primary">Sell USDT</a></td>
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
