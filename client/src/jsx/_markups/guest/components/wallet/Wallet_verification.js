import React from 'react'
import './Wallet_verification.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import usdt_icon from '../../app-assets/images/icon/usdt.png';


export const Wallet_verification = () => {
    return (     
        <div className="Wallet_verification"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center mt-3">
                            <div class="col-md-6">
                                <div class="wallet-veri">
                                    <div class="wallet-veri-top pb-4">
                                        <div class="wallet-veri-title">
                                            <h4 class="text-black font-weight-bold">Verification</h4>
                                        </div>
                                    </div>
                                    <div class="wallet-veri-body mt-4">
                                        <div class="wallet-user-info d-flex justify-content-around">
                                            <div class="info-wallet-left">
                                                <p>coin/network</p>
                                                <p>Address</p>
                                                <p>Amount</p>
                                            </div>
                                            <div class="info-wallet-right">
                                                <p><img src={usdt_icon} class="pr-2"/>USDT/Ethreum ERC20</p>
                                                <p>0x7790a6DAe3174A60E171A25a040f913b5d6054d4</p>
                                                <p>999.0000000 USDT (Fee 1 USDT)</p>
                                            </div>
                                        </div>

                                        <form class="mt-5">
                                            <div class="form-group">
                                                <label for="email">E-mail verification Code</label>
                                                <input type="email" class="form-control" id="email"/>
                                                <small>Enter the 6 digit code received by ema***@gmail.com.</small>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="footer-body">
                                        <a href="/wallet_verification2" class="btn btn-primary w-100">NEXT</a>
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
