import React from 'react'
import './Wallet_th.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';


import no_data_icon from '../../app-assets/images/nodata.png';


export const Wallet_th = () => {
    return (     
        <div class="content">
            <section id="mainTop">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h3 class="wow fadeInDown" data-wow-delay="0.3s">Wallet</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section id="progressTransition">
                <div class="container">
                    <div class="row mx-0">
                        <div class="col-12 progress-top">
                            <dl>
                                <dt class="font-25 ">My Wallet</dt>
                            </dl>
                            <dl>
                                <dt class="float-left progress-total">Total Balance:</dt>
                                <dd class="progress-income"><span class="pl-2">167.71 USD</span> ≈ $0.0003624 BTC</dd>
                            </dl>
                            <ul class="mt-3">
                                <li>자산은 코인마켓캡의 실시간 코인 가격을 통해 추정 가치로 변환되며 참조용으로만 사용됩니다.</li>
                                <li>실제 자산은 각 암호화폐의 보유 수량에 근거해야 합니다.</li>
                                <li>Assets are converted to estimated value through the real-time coin price of a coin market cap and are used for reference only.</li>
                                <li>Actual assets must be based on the amount of each cryptocurrency held.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="historyTransition">
                <div class="container">
                    <div class="row mx-0">
                        <div class="col-12 clearfix">
                            <h4>Transaction History</h4>
                            <ul>
                                <li><a href="/wallet">Asset</a></li>
                                <li class="on"><a href="#">History</a></li>
                            </ul>

                            <div class="col-12 clearfix main-select">
                                <dl class="time-select mb-0">
                                    <dt>Time</dt>
                                    <dd class="mb-0">2020-01-01 ~ 2021-05-08</dd>
                                </dl>
                                <dl class="type-select mb-0">
                                    <dt>Type</dt>
                                    <dd class="mb-0">
                                        <select>
                                            <option value="all">All</option>
                                        </select>
                                    </dd>
                                </dl>
                                <dl class="asset-select mb-0">
                                    <dt>Asset</dt>
                                    <dd class="mb-0">
                                        <select>
                                            <option value="all">All</option>
                                        </select>
                                    </dd>   
                                </dl>
                            </div>

                            <div class="table_container overflow-auto">
                                <table class="w-100">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Type</th>
                                            <th>Asset</th>
                                            <th>Amount</th>
                                            <th>TxID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-red">Fee</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid"></td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-red">Sell</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid"></td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-green">Deposit</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid">
                                                0x45d215721a62430c21cbf81d2b4f20b0e56c<br/>
                                                d7ab9690f25fb8dbcbccbd5ea805
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-green">Buy</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid"></td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-red">Fee</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid"></td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-red">Sell</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid"></td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-green">Deposit</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid">
                                                0x45d215721a62430c21cbf81d2b4f20b0e56c<br/>
                                                d7ab9690f25fb8dbcbccbd5ea805
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-red">Fee</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid"></td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-green">Deposit</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid">
                                                0x45d215721a62430c21cbf81d2b4f20b0e56c<br/>
                                                d7ab9690f25fb8dbcbccbd5ea805
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-red">Fee</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid"></td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-red">Fee</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid"></td>
                                        </tr>

                                        <tr>
                                            <td class="time">2021-08-12 13:53</td>
                                            <td class="type text-red">Sell</td>
                                            <td class="asset">BTC</td>
                                            <td class="amount">0.165160</td>
                                            <td class="txid"></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            <div class="indicator text-center">
                                <span class="on">1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <button type="button" class="btn_prev bg-transparent">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>


                            <div class="table_container overflow-auto">
                                <table class="w-100">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Type</th>
                                            <th>Asset</th>
                                            <th>Amount</th>
                                            <th>TxID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="pt-4 data-title" colspan="6">
                                                기록이 없을 경우.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="no-record text-center" colspan="6">
                                                <img src={no_data_icon} alt="No more orders"/>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
