import React from 'react'
import './wallet-asset.css'
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


export const Wallet_deposit = () => {
    return (     
        <div className="Wallet"> 
            <section>
            <div class="container-fluid">
                    <div class="container">
                    <div class="row justify-content-center">
                    <div class="col-md-10">
                            <Tabs defaultActiveKey="deposit" id="uncontrolled-tab-example">
                                <Tab eventKey="deposit" title="Deposit">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="btc-wallet-title mt-3">
                                                    <h3>BTC Wallet</h3>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-6">
                                                <div class="btc-asset">
                                                    <div class="btc-top d-flex justify-content-between">
                                                        <div class="btc-top-left">
                                                            <h4 class="font-weight-bold">총 보유자산</h4>
                                                        </div>
                                                        <div class="btc-top-right">
                                                            <h4 class="font-weight-bold text-primary">167.71 USD </h4>
                                                        </div>
                                                    </div>

                                                    <div class="btc-center mt-3">
                                                        <div class="btc-center-title">
                                                            <h5>Asset</h5>
                                                        </div>
                                                    </div>

                                                    <div class="btc-footer">
                                                        <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                            <thead>
                                                                <tr>
                                                                    <th class="th-sm">보유 자산만 보기</th>
                                                                    <th class="th-sm"></th>
                                                                    <th class="th-sm"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><img src={bnb_icon} class="pr-2"/>BNB <span class="text-secondary">BNB</span></td>
                                                                    <td>0.67574356</td>
                                                                    <td>65.5%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src={eth_icon} class="pr-2"/>Ethereum <span class="text-secondary">ETH</span></td>
                                                                    <td>160,867.5</td>
                                                                    <td>0.5%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src={usdt_icon} class="pr-2"/>Tether <span class="text-secondary">USDT</span></td>
                                                                    <td>0.08675</td>
                                                                    <td>0.0%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src={xrp_icon} class="pr-2"/>Ripple <span class="text-secondary">XRP</span></td>
                                                                    <td>1.908675</td>
                                                                    <td>33.4%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src={eos_icon} class="pr-2"/>EOS <span class="text-secondary">EOS</span></td>
                                                                    <td>200.000000</td>
                                                                    <td>0.4%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="btc-right">
                                                    <div class="btc-top-right mt-3">
                                                        <label for="basic-url">입금 주소</label>
                                                            <div class="input-group mb-3">
                                                                <input type="text" class="form-control" placeholder="mkdiskfidjfafrlkjfireknroiwjfflvlS" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                                                <div class="input-group-append">
                                                                    <span class="input-group-text text-white" id="basic-addon2">복사</span>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div class="btc-right-center">
                                                        <div class="center-img text-center">
                                                            <img src={wallet_qrcode_icon} width="25%"/>
                                                        </div>
                                                    </div>
                                                    <div class="btc-right-footer mt-3">
                                                        <div class="info-section">
                                                            <div class="info-title">
                                                                <h6 class="text-primary font-weight-bold">BTC 입금 주의사항</h6>
                                                            </div>
                                                            <div class="info-section-content">
                                                                <p class="mb-0"><small>
                                                                    • Assets are converted to their estimated value via CoinMarketCap's real-time coin price and are for reference only.
                                                                </small></p>
                                                                <p class="mb-0"><small>
                                                                    • Real assets should be based on the holding quantity of each cryptocurrency.
                                                                </small></p>
                                                                <p class="mb-0"><small>
                                                                    • Assets are converted to estimated value through the real-time coin price of a coin market cap and are used for reference only.
                                                                </small></p>
                                                                <p class="mb-0"><small>
                                                                    • Actual assets must be based on the amount of each cryptocurrency held.
                                                                </small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="withdraw" title="Withdraw">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="btc-wallet-title mt-3">
                                                    <h3>BTC Wallet</h3>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-6">
                                                <div class="btc-asset">
                                                    <div class="btc-top d-flex justify-content-between">
                                                        <div class="btc-top-left">
                                                            <h4 class="font-weight-bold">총 보유자산</h4>
                                                        </div>
                                                        <div class="btc-top-right">
                                                            <h4 class="font-weight-bold text-primary">167.71 USD </h4>
                                                        </div>
                                                    </div>

                                                    <div class="btc-center mt-3">
                                                        <div class="btc-center-title">
                                                            <h5>Asset</h5>
                                                        </div>
                                                    </div>

                                                    <div class="btc-footer">
                                                        <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                                            <thead>
                                                                <tr>
                                                                    <th class="th-sm">보유 자산만 보기</th>
                                                                    <th class="th-sm"></th>
                                                                    <th class="th-sm"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><img src={eos_icon} class="pr-2"/>BNB <span class="text-secondary">BNB</span></td>
                                                                    <td>0.67574356</td>
                                                                    <td>65.5%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src={eth_icon} class="pr-2"/>Ethereum <span class="text-secondary">ETH</span></td>
                                                                    <td>160,867.5</td>
                                                                    <td>0.5%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src={usdt_icon} class="pr-2"/>Tether <span class="text-secondary">USDT</span></td>
                                                                    <td>0.08675</td>
                                                                    <td>0.0%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src={xrp_icon} class="pr-2"/>Ripple <span class="text-secondary">XRP</span></td>
                                                                    <td>1.908675</td>
                                                                    <td>33.4%</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><img src={eos_icon} class="pr-2"/>EOS <span class="text-secondary">EOS</span></td>
                                                                    <td>200.000000</td>
                                                                    <td>0.4%</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="btc-right mt-3">
                                                    <div class="btc-top-right">
                                                        <label for="basic-url">입금 주소</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control text-right" placeholder="0.14" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                                            <div class="input-group-append">
                                                                <span class="input-group-text text-white" id="basic-addon2">최대</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="btc-center-right d-flex justify-content-between">
                                                        <div class="btc-center-right-left">
                                                            <p>수수료</p>
                                                            <p>총 출금 수량</p>
                                                            <p>암호화폐 일일 출금 한도</p>
                                                        </div>
                                                        <div class="btc-center-right-right">
                                                            <p>0.0015BTC0</p>
                                                            <p>0.0015BTC0</p>
                                                            <p>0.0015BTC</p>
                                                        </div>
                                                    </div>

                                                    <div class="second-bn mt-3 text-secondary">
                                                        <h5 class="font-weight-bold">출금 주소</h5>
                                                        <label for="basic-url font-weight-bold">입력한 주소가 정확한지 반드시 확인바랍니다</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="0x8b4db4e2025a13428a231131c890ca73dcdce" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                                            <div class="input-group-append">
                                                                <span class="input-group-text text-white" id="basic-addon2"></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="btc-right-footer mt-3">
                                                        <div class="info-section">
                                                            <div class="info-title">
                                                                <h6 class="text-primary font-weight-bold">BTC 입금 주의사항</h6>
                                                            </div>
                                                            <div class="info-section-content">
                                                                <p class="mb-0"><small>
                                                                    • Assets are converted to their estimated value via CoinMarketCap's real-time coin price and are for reference only.
                                                                </small></p>
                                                                <p class="mb-0"><small>
                                                                    • Real assets should be based on the holding quantity of each cryptocurrency.
                                                                </small></p>
                                                                <p class="mb-0"><small>
                                                                    • Assets are converted to estimated value through the real-time coin price of a coin market cap and are used for reference only.
                                                                </small></p>
                                                                <p class="mb-0"><small>
                                                                    • Actual assets must be based on the amount of each cryptocurrency held.
                                                                </small></p>
                                                            </div>
                                                        </div>
                                                        <div class="btn-footer mt-3">
                                                            <button class="btn btn-primary w-100" type="btn">다음</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
