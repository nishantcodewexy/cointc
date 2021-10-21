import React from 'react'
import './Ad_create.css'
import { BrowserRouter as Router, Route, Redirect, Switch, Link, LinkProps } from 'react-router-dom';
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import usdt_icon from '../../app-assets/images/icon/usdt.png';
import bnb_icon from '../../app-assets/images/icon/bnb.png';
import icon_01_icon from '../../app-assets/images/page/creat-ad/icon-01.png';


export const Ad_create = () => {
    return (     
        <div className="Ad_create"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6 sell-buy px-0">
                            <Tabs defaultActiveKey="sell-tab" id="uncontrolled-tab-example">
                                <Tab eventKey="buy-tab" title="BUY" tabClassName="buy-tab text-center font-weight-bold text-black btn-block" component={Link} 
>

                                </Tab>
                                <Tab eventKey="sell-tab" title="SELL" tabClassName="sell-tab text-center font-weight-bold text-black btn-block">
                                <form class="px-15 pt-4 p-3">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="crypto">Cryptocurrency</label>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="" id="dropdown-basic" className="left-bn  w-100">
                                                        <img src={usdt_icon}/> USDT
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                        <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                        <Dropdown.Item href="#"><img src={usdt_icon}/> USDT</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="crypto">Cryptocurrency</label>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="" id="dropdown-basic" className="left-bn  w-100">
                                                        <img src={bnb_icon}/> BINANCE
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#"><img src={bnb_icon}/> BINANCE</Dropdown.Item>
                                                        <Dropdown.Item href="#"><img src={bnb_icon}/> BINANCE</Dropdown.Item>
                                                        <Dropdown.Item href="#"><img src={bnb_icon}/> BINANCE</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                            <label for="crypto">Price margin <br/> Price type</label>
                                            
                                            <div class="input-group pmt">
                                                <input type="text" class="form-control" placeholder="110.03" aria-label="Input group example" aria-describedby="btnGroupAddon"/>
                                                <div class="input-group-prepend">
                                                <div class="input-group-text" id="btnGroupAddon">-</div>
                                                <div class="input-group-text" id="btnGroupAddon">+</div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="pmt-note px-15">
                                            <p class="mb-0 font-weight-bold">- Today USDT price : 6.43 CNY</p>
                                            <p class="mb-0 font-weight-bold">- Your Estimated Purchase Registration Price : 6.41</p>
                                            <a href="#" class="text-cny font-weight-bold">CNY</a>
                                        </div>
                                        </div>

                                        <div class="row">
                                        <div class="col-md-6 mpq">
                                            <div class="form-group">
                                            <label for="crypto">Maximum Purchase Quantity</label>
                                            <div class="input-group pmt">
                                                <input type="text" class="form-control" placeholder="1,000" aria-label="Input group example" aria-describedby="btnGroupAddon"/>
                                                <div class="input-group-prepend input-right">
                                                <div class="input-group-text" id="btnGroupAddon">USD</div>
                                                </div>
                                            </div>
                                            </div>
                                        <p class="text-right">≈  6,4312 USDT </p>
                                        </div>
                                        </div>

                                        <div class="row">
                                        <div class="col-md-5">
                                            <div class="form-group">
                                            <label for="crypto" class="mb-0">Order limit</label>
                                            <div class="input-group pmt">
                                                <input type="text" class="form-control" placeholder="1,000" aria-label="Input group example" aria-describedby="btnGroupAddon"/>
                                                <div class="input-group-prepend input-right">
                                                <div class="input-group-text" id="btnGroupAddon">CNY</div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-2 d-flex justify-content-center align-items-center">
                                            <div class="crypto-icon">
                                            <img src={icon_01_icon} width="25"/>
                                            </div>
                                        </div>

                                        <div class="col-md-5">
                                            <div class="form-group">
                                            <label class="mb-0" for="crypto"></label>
                                            <div class="input-group pmt">
                                                <input type="text" class="form-control" placeholder="6,431" aria-label="Input group example" aria-describedby="btnGroupAddon"/>
                                                <div class="input-group-prepend input-right">
                                                <div class="input-group-text" id="btnGroupAddon">CNY</div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>

                                        <div class="row">
                                        <div class="col-md-12 d-flex justify-content-end">
                                            <a href="/ad_payment_method" class="btn next-bn">Next stage</a>
                                        </div>
                                        </div>

                                    </form>
                                </Tab>
                            </Tabs>
                       

                        </div>
                    </div>
                    </div>
                </div>
                </section>
        </div> 
    )
}
