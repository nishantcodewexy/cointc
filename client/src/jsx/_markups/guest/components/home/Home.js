import React from 'react'
// import '../../app-assets/css/pages/index.css';

import './Home.css'
// import '../../assets/css/style.css';
import { Container, Row, Col, Form, Button,Div } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import slider_content_01 from '../../app-assets/images/slider/slider-content-01.png';
import slider_content_02 from '../../app-assets/images/slider/slider-content-02.png';

import bnb_image from '../../app-assets/images/icon/bnb.png';
import eth_image from '../../app-assets/images/icon/eth.png';
import usdt_image from '../../app-assets/images/icon/usdt.png';
import xrp_image from '../../app-assets/images/icon/xrp.png';
import btc_image from '../../app-assets/images/icon/btc.png';

import growth_icon from '../../app-assets/images/icon/growth-icon.png';
import security_icon from '../../app-assets/images/icon/security-icon.png';
import support_icon from '../../app-assets/images/icon/support-icon.png';
import comment_icon from '../../app-assets/images/icon/comment-icon.png';

import page_02_01_icon from '../../app-assets/images/page/page-02-01.png';
import google_play_icon from '../../app-assets/images/icon/google-play.png';
import apple_icon from '../../app-assets/images/icon/apple.png';
import growth_grapg_icon from '../../app-assets/images/page/index/growth.png';


export const Home = () => {
    return (     
        <div className="Home"> 
            <section id="slider">
                <div class="bg-blue-multi">
                    <Carousel bsPrefix="carousel slide" infiniteLoop useKeyboardArrows autoPlay interval={3000} showArrows={false} showStatus={false} showIndicators={false}>
                        <div class="container px-md-3">
                            <div class="row align-items-lg-center">
                                <div class="col-6 mx-auto col-md-6 order-md-2 col-lg-6 mb-3 mb-lg-none">
                                </div>
                                <div class="col col-sm-12 col-md-6 text-white left-slider-content py-5">
                                    <h1 class="mb-3">Buy&Sell your Cryptocurrency on CoinTC!</h1>
                                    <p class="lead mb-4">
                                        Support for easy and fast cryptocurrency transactions between individuals.
                                    </p>

                                    <div class="col-md-6 d-flex flex-column flex-md-row pl-0">
                                        <a href="#" class="btn btn-lg btn-primary mb-3 mr-md-3">Get started</a>
                                        <a href="#" class="btn btn-lg btn-white mb-3 mr-md-3 d-flex align-items-center">Log In</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div class="container px-md-3">
                            <div class="row align-items-lg-center">
                                <div class="col-6 mx-auto col-md-6 order-md-2 col-lg-6 mb-3 mb-lg-none">
                                </div>
                                <div class="col-md-6 order-md-1 col-lg-6 text-white">
                                    <h1 class="mb-3">Buy&Sell your Cryptocurrency on CoinTC!</h1>
                                    <p class="lead mb-4">
                                        Support for easy and fast cryptocurrency transactions between individuals.
                                    </p>
                                    <div class="col-md-6 d-flex flex-column flex-md-row">
                                        <a href="#" class="btn btn-lg btn-primary mb-3 mr-md-3">Get started</a>
                                        <a href="#" class="btn btn-lg btn-white mb-3 mr-md-3">Log In</a>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        
                    </Carousel>
                </div>
            </section>

            <section id="slider" class="py-60">
                <div class="container-fluid">
                    <div class="container overflow-x-auto">
                    <div class="table-title">
                                <h2>Market trend</h2>
                            </div>
                        <table class="table border-0">
                            
                            <thead>
                                <tr>
                                <th class="w-20">Name</th>
                                <th class="w-20">Last Price</th>
                                <th class="w-20">24h Change</th>
                                <th class="w-20">시장</th>
                                <th class="w-20"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <ul class="navbar-nav">
                                            <li><img class="mr-2" src={bnb_image} width="25"/>BNB<span class="pl-2 text-secondary">BNB</span></li>
                                        </ul>
                                    </td>
                                    <td>$422.22</td>
                                    <td class="text-danger">-2.22%</td>
                                    <td>
                                        <img src={growth_grapg_icon}/>
                                    </td>
                                    <td align="right">
                                        <a href="#" class="btn btn-outline-growth mr-1">구매하기</a>
                                        <a href="#" class="btn btn-outline-growth mr-1">거래하기</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ul class="navbar-nav">
                                            <li><img class="mr-2" src={eth_image} width="25"/>Ethereum<span class="pl-2 text-secondary">ETH</span></li>
                                        </ul>
                                    </td>
                                    <td>$47.540.48</td>
                                    <td class="text-danger">-0.63%</td>
                                    <td>
                                        <img src={growth_grapg_icon}/>
                                    </td>
                                    <td align="right">
                                        <a href="#" class="btn btn-outline-growth mr-1">구매하기</a>
                                        <a href="#" class="btn btn-outline-growth mr-1">거래하기</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ul class="navbar-nav">
                                            <li><img class="mr-2" src={usdt_image} width="25"/>Tether<span class="pl-2 text-secondary">USDT</span></li>
                                        </ul>
                                    </td>
                                    <td>$3.574.61</td>
                                    <td class="text-success">4.10%</td>
                                    <td>
                                        <img src={growth_grapg_icon}/>
                                    </td>
                                    <td align="right"><a href="#" class="btn btn-outline-growth mr-1">거래하기</a></td>
                                </tr>
                                <tr>
                                    <td>
                                        <ul class="navbar-nav">
                                            <li><img class="mr-2" src={xrp_image} width="25"/>Ripple<span class="pl-2 text-secondary">XRP</span></li>
                                        </ul>
                                    </td>
                                    <td>$0.351030</td>
                                    <td class="text-success">2.36%</td>
                                    <td>
                                        <img src={growth_grapg_icon}/>
                                    </td>
                                    <td align="right"><a href="#" class="btn btn-outline-growth mr-1">거래하기</a></td>
                                </tr>
                                <tr>
                                    <td>
                                        <ul class="navbar-nav">
                                            <li><img class="mr-2" src={btc_image} width="25"/>Bitcoin<span class="pl-2 text-secondary">BTC</span></li>
                                        </ul>
                                    </td>
                                    <td>$2.42</td>
                                    <td class="text-danger">-1.44%</td>
                                    <td>
                                        <img src={growth_grapg_icon}/>
                                    </td>
                                    <td align="right"><a href="#" class="btn btn-outline-growth mr-1">거래하기</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section class="py-5 icon-element mt-5">
                <div class="container-fluid">
                    <div class="container text-white">
                        <h2>CoinTC is a P2P exchange for everyone.</h2>
                        <p>It supports global currency.</p>


                        <div class="row">
                            <div class="col-sm-6 col-md-6 col-lg-3">
                                <div class="icon-card">
                                    <div class="card-body">
                                        <img class="mb-3" src={growth_icon}/>
                                        <h6 class="card-title">Customer Service Available 24/7</h6>
                                        <p class="card-text">
                                            CoinTC supports rapid response to problems 365 days a year.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6 col-lg-3">
                                <div class="icon-card">
                                    <div class="card-body">
                                        <img class="mb-3" src={security_icon}/>
                                        <h6 class="card-title">The best security system.</h6>
                                        <p class="card-text">
                                            CoinTC protects your funds with both centralized and decentralized methods.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6 col-lg-3">
                                <div class="icon-card">
                                    <div class="card-body">
                                        <img class="mb-3" src={support_icon}/>
                                        <h6>Supporting various Currency.</h6>
                                        <p class="card-text">
                                            We supporting free trade across border and language barriers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6 col-lg-3">
                                <div class="icon-card">
                                    <div class="card-body">
                                        <img class="mb-3" src={comment_icon}/>
                                        <h6 class="card-title">Trade with confidence</h6>
                                        <p class="card-text">
                                            CoinTC believes in security above everything.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-60">
                <div class="container-fluid">
                    <div class="container">
                        <div class="row align-items-lg-center">
                            <div class="col-6 mx-auto col-md-6 order-md-2 col-lg-6 mb-3 mb-lg-none">
                                <img src={page_02_01_icon} class="w-100"/>
                            </div>
                            <div class="col-md-6 order-md-1 col-lg-6">
                                <h2 class="mb-3">Start Your Cryptocurrency Journey Today.</h2>
                                <p class="lead mb-0">Trade Anytime, Anywhere</p>
                                <p class="lead mb-4">CoinTC offer you an easy and quick way to start trading.</p>

                                <div class="row">
                                    <div class="col-md-12 d-flex flex-column flex-md-row">
                                        <a href="#" class="btn btn-lg btn-brand mb-3 mr-md-3 d-flex align-items-center">
                                            <div class="google-play-icon pr-2">
                                                <img src={google_play_icon}/>
                                            </div>
                                            <div class="google-play-content">
                                                <p class="mb-0 text-left">Download on the <br/> <strong>Google Store</strong></p>
                                            </div>
                                        </a>
                                        <a href="#" class="btn btn-lg btn-brand mb-3 mr-md-3 d-flex align-items-center">
                                            <div class="apple-icon pr-2">
                                                <img src={apple_icon}/>
                                            </div>
                                            <div class="apple-content">
                                                <p class="mb-0 text-left">Download on the <br/> <strong>App Store</strong></p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-effect py-60">
                <div class="container-fluid">
                    <div class="container">
                        <div class="text-white d-flex justify-content-center align-items-center">
                            <h4 class="mr-3">A simple, secure way to buy and sell cryptocurrency</h4>
                            <button  class="btn btn-light text-primary">Get stared</button>
                        </div>
                    </div>
                </div>
            </section>
        </div> 
        
        
    )
}
