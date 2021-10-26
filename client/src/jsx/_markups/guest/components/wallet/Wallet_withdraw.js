import React from 'react'
// import './wallet-asset.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import usdt_icon from '../../app-assets/images/icon/usdt.png';
import cont_icon from '../../app-assets/images/page/order/cont.png';

import bnb_icon from '../../app-assets/images/icon/bnb.png';
import eth_icon from '../../app-assets/images/icon/eth.png';
// import usdt_icon from '../../app-assets/images/icon/usdt.png';
import xrp_icon from '../../app-assets/images/icon/xrp.png';
import eos_icon from '../../app-assets/images/icon/eos.png';
import wallet_qrcode_icon from '../../app-assets/images/page/wallet-qrcode.png';


export const Wallet_withdraw = () => {
    return (     
        <div className="Wallet"> 
            <section id="withdrawCrypto">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col col-sm-12 col-md-8 main-bg">
                            <h4>Withdraw Crypto</h4>
                            <form>
                                <div class="form-group row justify-content-between mb-0 py-2">
                                    <label class="col-sm-4 col-form-label">Select Coin</label>
                                    <div class="col-sm-10  col-md-6 select-coin-input">
                                        <select id="coin" class="form-control text-center">
                                            <option value="usdt">USDT</option>
                                            <option value="sdt">SDT</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row justify-content-between mb-0 py-2">
                                    <label class="col-sm-2 col-form-label">Network</label>
                                    <div class="col-sm-10  col-md-6 network-input">
                                        <input type="text" class="form-control-plaintext text-md-right"  value="Ethreum ERC20"/>
                                    </div>
                                </div>

                                <div class="form-group row justify-content-between mb-0 py-2">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Withdraw Address</label>
                                    <div class="col-sm-10  col-md-7 address-input">
                                        <input type="text" class="form-control" value="0x7790a6DAe3174A60E171A25a040f913b5d6054d4" />
                                    </div>
                                </div>

                                <div class="form-group row justify-content-between mb-0 py-2">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Withdraw Amount</label>
                                    <div class="col-sm-10  col-md-6 amount-input">
                                        <div class="input-group">
                                            <input type="text" class="form-control"/>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">1000 | <span class="pl-2">USDT</span></span>
                                            </div>
                                        </div>
                                        <p class="mb-0 text-right mt-2">사용 가능 : 1,000 USDT <span>전체</span></p>
                                    </div>
                                </div>

                                <div class="form-group row justify-content-between mb-0 py-2 wa-icon">
                                    <label class="col-sm-3 col-form-label postion-relative">Withdrawal <span></span> <span class="d-block">Available</span></label>
                                    <div class="col-sm-10  col-md-6 fee-input">
                                        <input type="text" class="form-control-plaintext text-md-right font-weight-bold"  value="999.000000 USDT"/>
                                    </div>
                                </div>

                                <hr class="form-hr-bottom" />

                                <div class="form-group row justify-content-between mb-0 py-2">
                                    <label class="col-sm-2 col-form-label">Fee</label>
                                    <div class="col-sm-10  col-md-6 fee-input">
                                        <input type="text" class="form-control-plaintext text-md-right"  value="1 USDT"/>
                                    </div>
                                </div>

                                <div class="form-group row justify-content-between mb-0 py-2">
                                    <label class="col-sm-4 col-form-label">Receive Amount</label>
                                    <div class="col-sm-10  col-md-6 fee-input">
                                        <input type="text" class="form-control-plaintext text-md-right font-weight-bold"  value="999.000000 USDT"/>
                                    </div>
                                </div>

                                <div class="wd-info pt-5 col-9">
                                    <p><i class="fa fa-info-circle mr-2"></i>withdrawal information</p>
                                    <ul>
                                        <li>Minimum withdrawal amount: 2 USDT.</li>
                                        <li> The network fee is 1 USDT，which may be adjusted by network congestion.</li>
                                        <li>Internal withdrawal is real-time. Exceeding the free transfer amount will be charged at the same rate as regular withdrawals.</li>
                                    </ul>
                                </div>

                                <div class="wd-btn mt-4">
                                    <a href="#" class="btn btn-primary w-100">Withdraw</a>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div> 
    )
}
