import React from 'react'
import './wallet-asset.css'
import { Container, Row, Col,  Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import usdt_icon from '../../app-assets/images/icon/usdt.png';
import cont_icon from '../../app-assets/images/page/order/cont.png';


export const Wallet = () => {
    return (     
        <div className="Wallet"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                        <div class="tb-border">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="tb-title font-weight-bold">
                                        <p>All balance</p>
                                        <p>0.00000000 <sub class="font-weight-bold">BTC</sub> <br/> <small class="text-secondary font-weight-bold">≈ $0.000000</small></p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="tb-title font-weight-bold">
                                        <p>All balance</p>
                                        <p>0.00000000 <sub class="font-weight-bold">BTC</sub> <br/> <small class="text-secondary font-weight-bold">≈ $0.000000</small></p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="tb-title font-weight-bold">
                                        <p>All balance</p>
                                        <p>0.00000000 <sub class="font-weight-bold">BTC</sub> <br/> <small class="text-secondary font-weight-bold">≈ $0.000000</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mt-3 pb-5">
                <div class="container-fluid">
                    <div class="container">
                        <div class="tb-border">
                            <div class="asset-title">
                                <h2>Asset</h2>
                            </div>

                            <div class="ah-bn-group d-flex justify-content-end">
                                <div class="ah-bn-start">
                                    <button class="btn btn-primary py-0">Asset</button>
                                    <button class="btn btn-outline-primary py-0">History</button>
                                </div>
                            </div>

                            <table id="dtBasicExample" class="table mt-3" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th class="th-sm">Coin</th>
                                        <th class="th-sm">Available</th>
                                        <th class="th-sm">In Order</th>
                                        <th class="th-sm">USD Value</th>
                                        <th class="th-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>BNB</td>
                                        <td>0.67574356</td>
                                        <td>0.67574356</td>
                                        <td>27,170.5</td>
                                        <td>
                                            <div class="action-bn">
                                                <a class="text-primary px-2" href="/wallet_deposit">Deposit</a>
                                                <a class="text-primary px-2" href="/wallet_withdraw">Withdraw</a>
                                                <a class="text-primary px-2" href="/trade">Trade</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ethereum</td>
                                        <td>160,867.5</td>
                                        <td>160,867.5</td>
                                        <td>27,170.5</td>
                                        <td>
                                            <div class="action-bn">
                                                <a class="text-primary px-2" href="/wallet_deposit">Deposit</a>
                                                <a class="text-primary px-2" href="/wallet_withdraw">Withdraw</a>
                                                <a class="text-primary px-2" href="/trade">Trade</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tether</td>
                                        <td>0.08675</td>
                                        <td>0.08675</td>
                                        <td>27,170.5</td>
                                        <td>
                                            <div class="action-bn">
                                                <a class="text-primary px-2" href="/wallet_deposit">Deposit</a>
                                                <a class="text-primary px-2" href="/wallet_withdraw">Withdraw</a>
                                                <a class="text-primary px-2" href="/trade">Trade</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ripple</td>
                                        <td>1.908675</td>
                                        <td>1.908675</td>
                                        <td>27,170.5</td>
                                        <td>
                                            <div class="action-bn">
                                                <a class="text-primary px-2" href="/wallet_deposit">Deposit</a>
                                                <a class="text-primary px-2" href="/wallet_withdraw">Withdraw</a>
                                                <a class="text-primary px-2" href="/trade">Trade</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>EOS</td>
                                        <td>200.000000</td>
                                        <td>200.000000</td>
                                        <td>27,170.5</td>
                                        <td>
                                            <div class="action-bn">
                                                <a class="text-primary px-2" href="/wallet_deposit">Deposit</a>
                                                <a class="text-primary px-2" href="/wallet_withdraw">Withdraw</a>
                                                <a class="text-primary px-2" href="/trade">Trade</a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="tb-border mt-3">
                            <div class="title-fotter col-md-6">
                                <p>
                                    거래 내역은 자산 메뉴에서 확인 할 수 있습니다.
                                    가입, 인증 및 거래에 대한 안내는 아래 가이드를 통해 확인할 수 있습니다.
                                </p>
                            </div>
                            <div class="col-md-12 col-sm-6">
                                <div class="guide-btn-group">
                                    <div class="guide-bn">
                                        <button class="btn btn-outline-primary px-md-5 mt-2 mr-2">거래소 가이드</button>
                                        <button class="btn btn-outline-primary px-md-5 mt-2 mr-2">프로차트 가이드</button>
                                        <button class="btn btn-outline-primary px-md-5 mt-2 mr-2">계정정보 변경을 위한 인증</button>
                                    </div>
                                </div>
                                <p class="mt-3">추가정보는 <sapn class="text-primary">FAQ</sapn>에서 확인할수 있습니다.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div> 
    )
}
