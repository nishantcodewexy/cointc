import React from 'react'
import './support.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import global_icon from '../../app-assets/images/page/support/global.png';
import admin_icon from '../../app-assets/images/page/support/admin.png';
import location_icon from '../../app-assets/images/page/support/location.png';
import btc_icon from '../../app-assets/images/page/support/btc.png';
import precious_icon from '../../app-assets/images/page/support/precious.png';
import stocks_icon from '../../app-assets/images/page/support/stocks.png';
import asset_icon from '../../app-assets/images/page/support/asset.png';
import debit_icon from '../../app-assets/images/page/support/debit.png';
import trading_icon from '../../app-assets/images/page/support/trading.png';

export const Support = () => {
    return (     
        <div className="Support"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8 support-element">
                                <div class="support-title py-4 text-center">
                                    <h2 class="font-weight-bold">Support</h2>
                                    <p class="mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-60">
                <div class="container-fluid">
                    <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-10">
                        <div class="ear-title text-center">
                            <h5>EXPERIENCED AND RELIABLE</h5>
                        </div>
                        <div class="trust-title text-center">
                            <h4 class="text-black font-weight-bold">Your trusted cryptocurrency partner.</h4>
                        </div>
                        <div class="ear-content text-center">
                            <p class="text-black font-weight-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        </div>
                        </div>

                        <div class="col-md-10 justify-content-center mt-5">
                        <div class="row justify-content-center">
                            <div class="col-md-4">
                            <div class="card-icon d-flex">
                                <div class="icon-img pr-3">
                                <img src={global_icon} width="60px"/>
                                </div>
                                <div class="icon-text text-center">
                                <h4 class="font-weight-bold">57+</h4>
                                <p class="font-weight-bold">Nationality</p>
                                </div>
                            </div>
                            </div>

                            <div class="col-md-4">
                            <div class="card-icon d-flex">
                                <div class="icon-img pr-3">
                                <img src={admin_icon} width="60px"/>
                                </div>
                                <div class="icon-text text-center">
                                <h4 class="font-weight-bold">1257+</h4>
                                <p class="font-weight-bold">Employee</p>
                                </div>
                            </div>
                            </div>

                            <div class="col-md-4">
                            <div class="card-icon d-flex">
                                <div class="icon-img pr-3">
                                <img src={location_icon} width="60px"/>
                                </div>
                                <div class="icon-text text-center">
                                <h4 class="font-weight-bold">117+</h4>
                                <p class="font-weight-bold">Locations</p>
                                </div>
                            </div>
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
                    <div class="row justify-content-center">
                        <div class="col-md-10">
                        <div class="our-service-title text-center">
                            <h4>OUR SERVICE</h4>
                        </div>
                        <div class="offer-title text-center">
                            <h3 class="font-weight-bold text-black">What We offer</h3>
                            <p class="font-weight-bold text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>


                        <div class="row">
                            <div class="col-sm-6 col-md-4 mt-2">
                            <div class="card">
                                <div class="card-body text-center">
                                <h5 class="card-title d-flex justify-content-center"><img src={btc_icon} width="50"/></h5>
                                <h5 class="card-title">Cryptocurrencies</h5>
                                <p class="card-text text-center">Diam platea nisi proin taciti laoreet consequat curabitur</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                            </div>
                            <div class="col-sm-6 col-md-4 mt-2">
                            <div class="card">
                                <div class="card-body text-center">
                                <h5 class="d-flex justify-content-center"><img src={precious_icon} width="50"/></h5>
                                <h5 class="card-title text-center">Precious metals</h5>
                                <p class="card-text">Diam platea nisi proin taciti laoreet consequat curabitur</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                            </div>
                            <div class="col-sm-6 col-md-4 mt-2">
                            <div class="card">
                                <div class="card-body text-center">
                                <h5 class="card-title d-flex justify-content-center"><img src={stocks_icon} width="50"/></h5>
                                <h5 class="card-title text-center">Stocks</h5>
                                <p class="card-text">Diam platea nisi proin taciti laoreet consequat curabitur</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                            </div>
                            <div class="col-sm-6 col-md-4 mt-2">
                            <div class="card">
                                <div class="card-body text-center">
                                <h5 class="card-title d-flex justify-content-center"><img src={asset_icon} width="50"/></h5>
                                <h5 class="card-title">Environmental Assets</h5>
                                <p class="card-text text-center">Diam platea nisi proin taciti laoreet consequat curabitur</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                            </div>
                            <div class="col-sm-6 col-md-4 mt-2">
                            <div class="card">
                                <div class="card-body text-center">
                                <h5 class="d-flex justify-content-center"><img src={debit_icon} width="50"/></h5>
                                <h5 class="card-title text-center">Debit Card</h5>
                                <p class="card-text">Diam platea nisi proin taciti laoreet consequat curabitur</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                            </div>
                            <div class="col-sm-6 col-md-4 mt-2">
                            <div class="card">
                                <div class="card-body text-center">
                                <h5 class="card-title d-flex justify-content-center"><img src={trading_icon} width="50"/></h5>
                                <h5 class="card-title text-center">Automated trading</h5>
                                <p class="card-text">Diam platea nisi proin taciti laoreet consequat curabitur</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                                </div>
                            </div>
                            </div>
                        </div>

                        </div>
                    </div>
                    </div>
                </div>
                </section>
        </div> 
    )
}
