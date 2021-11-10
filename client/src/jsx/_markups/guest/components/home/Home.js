import React from 'react'
import { Link } from "react-router-dom";

import './Home.css';
import { Container, Row, Col, Form, Button,Div } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


import slider_content from '../../app-assets/images/slider-content.png';
import growth from '../../app-assets/images/growth.png';
import growth_icon from '../../app-assets/images/icon/growth-icon.png';
import growth_01 from '../../app-assets/images/growth-01.png';

import bnb_image from '../../app-assets/images/coin/bnb.png';
import usdt_image from '../../app-assets/images/coin/usdt.png';
import xrp_round_image from '../../app-assets/images/coin/xrp-round.png';
import eth_image from '../../app-assets/images/coin/eth.png';
import btc_image from '../../app-assets/images/coin/btc.png';

import security_icon from '../../app-assets/images/icon/security-icon.png';
import support_icon from '../../app-assets/images/icon/support-icon.png';
import comment_icon from '../../app-assets/images/icon/comment-icon.png';

import home_growth_icon from '../../app-assets/images/home-growth.png';
import google_play_icon from '../../app-assets/images/icon/google-play.png';
import apple_icon from '../../app-assets/images/icon/apple.png';


export const Home = () => {
    return (     
        <div className="content Home">
            <section id="homeMainTop">
                <div className="container">
                    <div className="row">
                        <div className="col col-sm-12 col-md-6">
                            <div className="homemain_left">
                                <h5 className="wow animate__animated fadeInDown" data-wow-delay="0.3s">
                                    Buy&Sell your 
                                    Cryptocurrency on 
                                    CoinTC!
                                </h5>
                                <p className="wow animate__animated fadeInDown">
                                    Support for easy and fast cryptocurrency 
                                    transactions between individuals.
                                </p>
                                <div className="d-flex flex-column flex-md-row">
                                    <Link className="btn btn_getstarted mr-3 my-3 wow fadeInLeft" to="/signup">Get started</Link>
                                    <Link className="btn btn_login mr-3 my-3 wow fadeInRight" to="/login">Log In</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col col-sm-12 col-md-6 d-none">
                            <div className="homemain_right">
                                <img src={slider_content} className="w-auto"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="trend">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="market_table_title">
                                <h3>Market trend</h3>
                            </div>
                            <div className="table_container wow fadeInUp" data-wow-delay="0.6s">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Last Price</th>
                                            <th>24h Change</th>
                                            <th>시장</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="coin_name">
                                                <img src={bnb_image}/>
                                                <p>BNB <span>BNB</span></p>
                                            </td>
                                            <td className="last_price">
                                                <dl className="available clear">
                                                    <dt>44539.65</dt>
                                                    <dd>44,545.85 USD</dd>
                                                </dl>
                                            </td>
                                            <td className="24h_change text-red">-2.22%</td>
                                            <td className="market"><img src={growth}/></td>
                                            <td className="transaction text-center">
                                                <a href="#" className="btn_buy float-left">구매하기</a>
                                                <a href="#" className="btn_trade float-right">거래하기</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="coin_name">
                                                <img src={eth_image}/>
                                                <p>Ethereum <span>ETH</span></p>
                                            </td>
                                            <td className="last_price">
                                                <dl className="available clear">
                                                    <dt>3107.68</dt>
                                                    <dd>44,545.85 USD</dd>
                                                </dl>
                                            </td>
                                            <td className="24h_change text-red">-0.63%</td>
                                            <td className="market"><img src={growth_01}/></td>
                                            <td className="transaction text-center">
                                                <a href="#" className="btn_buy float-left">구매하기</a>
                                                <a href="#" className="btn_trade float-right">거래하기</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="coin_name">
                                                <img src={usdt_image}/>
                                                <p>Tether <span>USDT</span></p>
                                            </td>
                                            <td className="last_price">
                                                <dl className="available clear">
                                                    <dt>162.37</dt>
                                                    <dd>44,545.85 USD</dd>
                                                </dl>
                                            </td>
                                            <td className="24h_change text-green">4.10%</td>
                                            <td className="market"><img src={growth}/></td>
                                            <td className="transaction text-center">
                                                <a href="#" className="btn_trade float-right">거래하기</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="coin_name">
                                                <img src={xrp_round_image}/>
                                                <p>Ripple <span>XRP</span></p>
                                            </td>
                                            <td className="last_price">
                                                <dl className="available clear">
                                                    <dt>0.98</dt>
                                                    <dd>44,545.85 USD</dd>
                                                </dl>
                                            </td>
                                            <td className="24h_change text-green">2.36%</td>
                                            <td className="market"><img src={growth_01}/></td>
                                            <td className="transaction text-center">
                                                <a href="#" className="btn_trade float-right">거래하기</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="coin_name">
                                                <img src={btc_image}/>
                                                <p>Bitcoin <span>BTC</span></p>
                                            </td>
                                            <td className="last_price">
                                                <dl className="available clear">
                                                    <dt>10.76</dt>
                                                    <dd>44,545.85 USD</dd>
                                                </dl>
                                            </td>
                                            <td className="24h_change text-red">-1.44%</td>
                                            <td className="market"><img src={growth}/></td>
                                            <td className="transaction text-center">
                                                <a href="#" className="btn_trade float-right">거래하기</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="customerService">
                <div className="container">
                    <div className="customer_service_title text-white wow fadeInLeft">
                        <h2 className="mb-1">CoinTC is a P2P exchange for everyone.</h2>
                        <p>It supports global currency.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-3 wow fadeInLeft">
                            <div className="icon-card">
                                <div className="card-body text-white">
                                    <img className="mb-3 w-auto" src={growth_icon}/>
                                    <h6 className="card-title">Customer Service Available 24/7</h6>
                                    <p className="card-text">
                                        CoinTC supports rapid response to problems 365 days a year.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3 wow fadeInLeft">
                            <div className="icon-card">
                                <div className="card-body text-white">
                                    <img className="mb-3 w-auto" src={security_icon}/>
                                    <h6 className="card-title">The best security system.</h6>
                                    <p className="card-text">
                                        CoinTC protects your funds with both centralized and decentralized methods.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3 wow fadeInRight">
                            <div className="icon-card">
                                <div className="card-body text-white">
                                    <img className="mb-3 w-auto" src={support_icon}/>
                                    <h6 className="card-title">Supporting various Currency.</h6>
                                    <p className="card-text">
                                        We supporting free trade across border and language barriers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3 wow fadeInRight">
                            <div className="icon-card">
                                <div className="card-body text-white">
                                    <img className="mb-3 w-auto" src={comment_icon}/>
                                    <h6 className="card-title">Trade with confidence</h6>
                                    <p className="card-text">
                                        CoinTC believes in security above everything.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="cryptoCurrency">
                <div className="container">
                    <div className="row wow fadeInLeft">
                        <div className="col-6 mx-auto col-md-6 order-md-2 col-lg-6 mb-3 mb-lg-none">
                            <img src={home_growth_icon} className="w-100"/>
                        </div>
                        <div className="col-md-6 order-md-1 col-lg-6">
                            <h2 className="mb-3">
                                Start Your Cryptocurrency 
                                Journey Today.
                            </h2>
                            <p className="lead mb-0 text-black trade">Trade Anytime, Anywhere</p>
                            <p className="lead mb-4 text-black">CoinTC offer you an easy and quick way to start trading.</p>

                            <div className="col-md-12">
                                <a href="#" className="btn btn-lg btn-brand float-left mr-3 mb-2 mb-md-0">
                                    <div className="google-play-icon pr-2 float-left">
                                        <img src={google_play_icon} className="w-auto"/>
                                    </div>
                                    <div className="google-play-content float-right">
                                        <p className="mb-0 text-left">Download on the <br/> <strong>Google Store</strong></p>
                                    </div>
                                </a>
                                <a href="#" className="btn btn-lg btn-brand mb-2">
                                    <div className="apple-icon pr-2 float-left">
                                        <img src={apple_icon} className="w-auto"/>
                                    </div>
                                    <div className="apple-content float-right">
                                        <p className="mb-0 text-left">Download on the <br/> <strong>App Store</strong></p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="startCrypto">
                <div className="container">
                    <div className="start_crypto_content d-flex justify-content-center">
                        <h4 className="mr-3 mb-0 wow fadeInRight">A simple, secure way to buy and sell cryptocurrency</h4>
                        <a href="#" className="btn btn_getstarted wow fadeInLeft">Get stared</a>
                    </div>
                </div>
            </section>
        </div>
        
        
    )
}
