import React from 'react'
import './Wallet_th.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';


import no_more_data_icon from '../../app-assets/images/icon/no-more-data.png';


export const Wallet_th = () => {
    return (     
        <div className="Wallet_th"> 
            <section class="mt-3 pb-5">
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="tb-border">
                                    <div class="th-header d-flex justify-content-between align-items-center">
                                        <div class="asset-title">
                                            <h2>Asset</h2>
                                        </div>

                                        <div class="ah-bn-start">
                                            <a href="wallet" class="btn btn-outline-primary py-0 mr-1">Asset</a>
                                            <a href="#" class="btn btn-primary  py-0">History</a>
                                        </div>
                                    </div>

                                    <div class="col-md-12 d-flex">
                                        <div class="coin mr-3">
                                            <div class="coin-title">
                                                <p>Time</p>
                                            </div>
                                            <button class="btn">2020-01-01 ~ 2021-05-08</button>
                                        </div>

                                        <div class="coin mr-3">
                                            <div class="coin-title">
                                                <p>Type</p>
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                                    All
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#">All</Dropdown.Item>
                                                    <Dropdown.Item href="#">All</Dropdown.Item>
                                                    <Dropdown.Item href="#">All</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div class="coin mr-3">
                                            <div class="coin-title">
                                                <p>Asset</p>
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                                    All
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#">All</Dropdown.Item>
                                                    <Dropdown.Item href="#">All</Dropdown.Item>
                                                    <Dropdown.Item href="#">All</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <table id="dtBasicExample" class="table mt-3 my-table" cellspacing="0" width="100%">
                                        <thead>
                                            <tr class="border-0">
                                                <th>Time</th>
                                                <th>Type</th>
                                                <th>Asset</th>
                                                <th>Amount</th>
                                                <th>TxID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="border-bottom">
                                                <td>2021-08-12 13:53</td>
                                                <td class="text-danger">Fee</td>
                                                <td>BTC</td>
                                                <td>0.165160</td>
                                                <td></td>
                                            </tr>
                                            <tr class="border-bottom">
                                                <td>2021-08-12 13:53</td>
                                                <td class="text-danger">Sell</td>
                                                <td>BTC</td>
                                                <td>0.165160</td>
                                                <td></td>
                                            </tr>
                                            <tr class="border-bottom">
                                                <td>2021-08-12 13:53</td>
                                                <td class="text-success">Deposit</td>
                                                <td>BTC</td>
                                                <td>0.165160</td>
                                                <td>0x45d215721a62430</td>
                                            </tr>
                                            <tr class="border-bottom">
                                                <td>2021-08-12 13:53</td>
                                                <td class="text-success">Buy</td>
                                                <td>BTC</td>
                                                <td>0.165160</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="row justify-content-center">
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                            <div class="col-lg-12">
                                                <button type="button" class="btn btn-secondary rounded-0">1</button>
                                                <button type="button" class="btn btn-transparent rounded-0">2</button>
                                                <button type="button" class="btn btn-transparent rounded-0">3</button>
                                                <button type="button" class="btn btn-transparent rounded-0">4</button>
                                            </div>
                                        </div>
                                    </div>

                                    <table id="dtBasicExample" class="table my-5 my-table" cellspacing="0" width="100%">
                                        <thead>
                                            <tr class="border-0">
                                                <th>Time</th>
                                                <th>Type</th>
                                                <th>Asset</th>
                                                <th>Amount</th>
                                                <th>TxID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <div class="bank-data-img py-4 text-center">
                                        <img src={no_more_data_icon} width="100"/>
                                        <p>No more orders</p>
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
