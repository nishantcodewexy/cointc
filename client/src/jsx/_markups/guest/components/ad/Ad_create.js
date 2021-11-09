import React from 'react'
import './Ad_create.css'
import { Link } from 'react-router-dom';
import { Dropdown,Tabs,Tab } from 'react-bootstrap';

import usdt_01_icon from '../../app-assets/images/coin/usdt-01.png';
import bnb_icon from '../../app-assets/images/coin/bnb.png';
import icon_01_icon from '../../app-assets/images/icon/icon-01.png';


export const Ad_create = () => {
    return (     
        <div class="content">
                <section id="mainTop">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <h3 class="wow fadeInDown" data-wow-delay="0.3s">Create an AD</h3>
                            </div>
                        </div>
                    </div>
                </section>
                

                <section id="createAd">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 mx-auto p-0">
                              <div class="timeline-title">
                                <h5>Advertisement Create an ad</h5>
                              </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-12 d-flex justify-content-center my-5">
                              <ul class="timeline my-timeline">
                                <li class="active">Set price and type</li>
                                <li>Set up your trading method</li>
                                <li>Enter contract terms</li>
                              </ul>
                            </div>
                        </div>
                        <div class="row justify-content-center mt-3">
                            <div class="col-md-6 sell-buy px-0">
                                <Tabs defaultActiveKey="sell-tab" id="uncontrolled-tab-example" class="nav">
                                    <Tab eventKey="buy-tab" title="BUY" tabClassName="buy-tab text-center font-weight-bold text-black" component={Link}>         
                                        <form  class="px-15 pt-4 p-3">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="crypto">Cryptocurrency</label>
                                                            
                                                        <Dropdown className="my-dropdown-toggle">
                                                            <Dropdown.Toggle variant="" id="dropdown-basic" className="btn left-bn dropdown-toggle w-100">
                                                                <img src={usdt_01_icon} class="w-auto"/> USDT
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#"><img src={usdt_01_icon} class="w-auto"/> USDT</Dropdown.Item>
                                                                <Dropdown.Item href="#"><img src={usdt_01_icon} class="w-auto"/> USDT</Dropdown.Item>
                                                                <Dropdown.Item href="#"><img src={usdt_01_icon} class="w-auto"/> USDT</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="crypto">Cryptocurrency</label>
                                                        <Dropdown className="my-dropdown-toggle">
                                                            <Dropdown.Toggle variant="" id="dropdown-basic" className="btn left-bn dropdown-toggle w-100">
                                                                <img src={bnb_icon} class="w-auto"/> BINANCE
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#"><img src={bnb_icon} class="w-auto"/> BINANCE</Dropdown.Item>
                                                                <Dropdown.Item href="#"><img src={bnb_icon} class="w-auto"/> BINANCE</Dropdown.Item>
                                                                <Dropdown.Item href="#"><img src={bnb_icon} class="w-auto"/> BINANCE</Dropdown.Item>
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
                                                            <div class="input-group-text btn" id="btnGroupAddon">-</div>
                                                            <div class="input-group-text btn" id="btnGroupAddon">+</div>
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
                                    <Tab eventKey="sell-tab" title="SELL" tabClassName="sell-tab text-center font-weight-bold text-black ">
                                    <form  class="px-15 pt-4 p-3">
                                        <div class="row">
                                          <div class="col-md-6">
                                            <div class="form-group">
                                              <label for="crypto">Cryptocurrency</label>
                                              <div class="dropdown my-dropdown-toggle">
                                                <button class="btn left-bn dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                  <img src={usdt_01_icon} class="w-auto"/> USDT
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                  <a class="dropdown-item" href="#"><img src={usdt_01_icon} class="w-auto"/> USDT</a>
                                                  <a class="dropdown-item" href="#"><img src={usdt_01_icon} class="w-auto"/> USDT</a>
                                                  <a class="dropdown-item" href="#"><img src={usdt_01_icon} class="w-auto"/> USDT</a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="col-md-6">
                                            <div class="form-group">
                                              <label for="crypto">Cryptocurrency</label>
                                              <div class="dropdown my-dropdown-toggle">
                                                <button class="btn right-bn dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <img src={bnb_icon} class="w-auto"/> BINANCE
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                  <a class="dropdown-item" href="#"><img src={bnb_icon} class="w-auto"/> BINANCE</a>
                                                  <a class="dropdown-item" href="#"><img src={bnb_icon} class="w-auto"/> BINANCE</a>
                                                  <a class="dropdown-item" href="#"><img src={bnb_icon} class="w-auto"/> BINANCE</a>
                                                </div>
                                              </div>
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
                                                  <div class="input-group-text btn" id="btnGroupAddon">-</div>
                                                  <div class="input-group-text btn" id="btnGroupAddon">+</div>
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
                </section>
            </div>
    )
}
