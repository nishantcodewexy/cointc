import React from 'react'
import './Ad_create.css'
import { Link } from 'react-router-dom';
import { Dropdown, Tabs, Tab } from 'react-bootstrap';

import usdt_01_icon from '../../app-assets/images/coin/usdt-01.png';
import bnb_icon from '../../app-assets/images/coin/bnb.png';
import icon_01_icon from '../../app-assets/images/icon/icon-01.png';


export const Ad_create = () => {
  return (
    <div className="content">
      <section id="mainTop">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="wow animate__animated fadeInDown" data-wow-delay="0.3s">Create an AD</h3>
            </div>
          </div>
        </div>
      </section>



      <section id="createAd">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto p-0">
              <div className="timeline-title">
                <h5>Advertisement Create an ad</h5>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 d-flex justify-content-center my-5">
              <ul className="timeline my-timeline">
                <li className="active">Set price and type</li>
                <li>Set up your trading method</li>
                <li>Enter contract terms</li>
              </ul>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-md-6 sell-buy px-0">
              <Tabs defaultActiveKey="sell-tab" id="uncontrolled-tab-example" className="nav">
                <Tab eventKey="buy-tab" title="BUY" tabClassName="buy-tab text-center font-weight-bold text-black" component={Link}>
                  <form className="px-15 pt-4 p-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="crypto">Cryptocurrency</label>

                          <Dropdown className="my-dropdown-toggle">
                            <Dropdown.Toggle variant="" id="dropdown-basic" className="btn left-bn dropdown-toggle w-100">
                              <img src={usdt_01_icon} class="w-auto" /> USDT
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#"><img src={usdt_01_icon} class="w-auto" /> USDT</Dropdown.Item>
                              <Dropdown.Item href="#"><img src={usdt_01_icon} class="w-auto" /> USDT</Dropdown.Item>
                              <Dropdown.Item href="#"><img src={usdt_01_icon} class="w-auto" /> USDT</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="crypto">Cryptocurrency</label>
                          <Dropdown className="my-dropdown-toggle">
                            <Dropdown.Toggle variant="" id="dropdown-basic" className="btn left-bn dropdown-toggle w-100">
                              <img src={bnb_icon} class="w-auto" /> BINANCE
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#"><img src={bnb_icon} class="w-auto" /> BINANCE</Dropdown.Item>
                              <Dropdown.Item href="#"><img src={bnb_icon} class="w-auto" /> BINANCE</Dropdown.Item>
                              <Dropdown.Item href="#"><img src={bnb_icon} class="w-auto" /> BINANCE</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="crypto">Price margin <br /> Price type</label>
                          <div className="input-group pmt">
                            <input type="text" className="form-control" placeholder="110.03" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <div className="input-group-prepend">
                              <div className="input-group-text btn" id="btnGroupAddon">-</div>
                              <div className="input-group-text btn" id="btnGroupAddon">+</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pmt-note px-15">
                        <p className="mb-0 font-weight-bold">- Today USDT price : 6.43 CNY</p>
                        <p className="mb-0 font-weight-bold">- Your Estimated Purchase Registration Price : 6.41</p>
                        <a href="#" className="text-cny font-weight-bold">CNY</a>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mpq">
                        <div className="form-group">
                          <label for="crypto">Maximum Purchase Quantity</label>
                          <div className="input-group pmt">
                            <input type="text" className="form-control" placeholder="1,000" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <div className="input-group-prepend input-right">
                              <div className="input-group-text" id="btnGroupAddon">USD</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-right">≈  6,4312 USDT </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-5">
                        <div className="form-group">
                          <label for="crypto" className="mb-0">Order limit</label>
                          <div className="input-group pmt">
                            <input type="text" class="form-control" placeholder="1,000" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <div className="input-group-prepend input-right">
                              <div className="input-group-text" id="btnGroupAddon">CNY</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2 d-flex justify-content-center align-items-center">
                        <div className="crypto-icon">
                          <img src={icon_01_icon} width="25" />
                        </div>
                      </div>

                      <div className="col-md-5">
                        <div className="form-group">
                          <label className="mb-0" for="crypto"></label>
                          <div className="input-group pmt">
                            <input type="text" className="form-control" placeholder="6,431" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <div className="input-group-prepend input-right">
                              <div className="input-group-text" id="btnGroupAddon">CNY</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 d-flex justify-content-end">
                        <a href="/ad_payment_method" className="btn next-bn">Next stage</a>
                      </div>
                    </div>
                  </form>
                </Tab>
                <Tab eventKey="sell-tab" title="SELL" tabClassName="sell-tab text-center font-weight-bold text-black ">
                  <form className="px-15 pt-4 p-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="crypto">Cryptocurrency</label>
                          <div className="dropdown my-dropdown-toggle">
                            <button className="btn left-bn dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src={usdt_01_icon} className="w-auto" /> USDT
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a className="dropdown-item" href="#"><img src={usdt_01_icon} className="w-auto" /> USDT</a>
                              <a className="dropdown-item" href="#"><img src={usdt_01_icon} className="w-auto" /> USDT</a>
                              <a className="dropdown-item" href="#"><img src={usdt_01_icon} className="w-auto" /> USDT</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="crypto">Cryptocurrency</label>
                          <div className="dropdown my-dropdown-toggle">
                            <button className="btn right-bn dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src={bnb_icon} class="w-auto" /> BINANCE
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a className="dropdown-item" href="#"><img src={bnb_icon} className="w-auto" /> BINANCE</a>
                              <a className="dropdown-item" href="#"><img src={bnb_icon} className="w-auto" /> BINANCE</a>
                              <a className="dropdown-item" href="#"><img src={bnb_icon} className="w-auto" /> BINANCE</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="crypto">Price margin <br /> Price type</label>
                          <div className="input-group pmt">
                            <input type="text" className="form-control" placeholder="110.03" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <div className="input-group-prepend">
                              <div className="input-group-text btn" id="btnGroupAddon">-</div>
                              <div className="input-group-text btn" id="btnGroupAddon">+</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pmt-note px-15">
                        <p className="mb-0 font-weight-bold">- Today USDT price : 6.43 CNY</p>
                        <p className="mb-0 font-weight-bold">- Your Estimated Purchase Registration Price : 6.41</p>
                        <a href="#" className="text-cny font-weight-bold">CNY</a>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mpq">
                        <div className="form-group">
                          <label htmlFor="crypto">Maximum Purchase Quantity</label>
                          <div className="input-group pmt">
                            <input type="text" className="form-control" placeholder="1,000" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <div className="input-group-prepend input-right">
                              <div className="input-group-text" id="btnGroupAddon">USD</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-right">≈  6,4312 USDT </p>
                      </div>

                    </div>

                    <div className="row">
                      <div className="col-md-5">
                        <div className="form-group">
                          <label htmlFor="crypto" className="mb-0">Order limit</label>
                          <div className="input-group pmt">
                            <input type="text" className="form-control" placeholder="1,000" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <div className="input-group-prepend input-right">
                              <div className="input-group-text" id="btnGroupAddon">CNY</div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="col-md-2 d-flex justify-content-center align-items-center">
                        <div className="crypto-icon">
                          <img src={icon_01_icon} width="25" />
                        </div>
                      </div>

                      <div className="col-md-5">
                        <div className="form-group">
                          <label className="mb-0" htmlFor="crypto" />
                          <div className="input-group pmt">
                            <input type="text" className="form-control" placeholder="6,431" aria-label="Input group example" aria-describedby="btnGroupAddon" />
                            <div className="input-group-prepend input-right">
                              <div className="input-group-text" id="btnGroupAddon">CNY</div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="row">
                      <div className="col-md-12 d-flex justify-content-end">
                        <a href="/ad_payment_method" className="btn next-bn">Next stage</a>
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
