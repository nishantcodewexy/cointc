import React, { useEffect, useState } from 'react';
import { Container, Button,Modal,Nav,ProgressBar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import icon_method01 from '../../app-assets/images/icon/icon_method01.png';

import term_error_icon from '../../app-assets/images/icon/term-error-icon.png';
import term_logo_01_icon from '../../app-assets/images/icon/term-logo-01.png';
import term_user_icon from '../../app-assets/images/icon/term-user-icon.png';
import term_help_icon from '../../app-assets/images/icon/term-help-logo.png';
import term_edit_icon from '../../app-assets/images/icon/term-edit-icon.png';
import term_ask_icon from '../../app-assets/images/icon/term-ask-icon.png';
import term_upload_icon from '../../app-assets/images/icon/term-upload-icon.png';
import term_doc_icon from '../../app-assets/images/icon/term-doc-icon.png';
import positive_icon from '../../app-assets/images/icon/positive.png';
import negative_icon from '../../app-assets/images/icon/negative.png';

import '@fortawesome/fontawesome-free/css/all.min.css';
 
export const Order_completed = () => {
    return (     
        <div class="content">
            <section id="mainTop">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h3 class="wow fadeInDown" data-wow-delay="0.3s">P2P Trade</h3>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="sellbtc">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-sm-12 col-md-7 ">
                            <div class="sell-btc-left-row">
                                <div class="row align-items-center">
                                    <div class="col-12 col-sm-12 col-lg-5">
                                        <h4>SELL BTC</h4>
                                    </div>
                                    <div class="col-12 col-sm-12 col-lg-7">
                                        <div class="billed clearfix">
                                            <span>Order Number</span>
                                            <span class="ml-1">6426424951</span>
                                        </div>
                                        <div class="billed clearfix">
                                            <span>creation time</span>
                                            <span class="ml-1">2021-08-11 16:21</span>
                                        </div>
                                        <div class="billed clearfix">
                                            <span>Payment Method</span>
                                            <span class="ml-1">6426424951</span>
                                        </div>
                                        <div class="billed clearfix">
                                            <span>state</span>
                                            <span class="ml-1">6426424951</span>
                                        </div>
                                    </div>
                                </div>

                                <hr class="sellbtc-hr" />

                                <div class="row mb-4">
                                    <div class="sell-payment col-sm-12 col-md-4 col-lg-4">
                                        <dl>
                                            <dt>Total</dt>
                                            <dd>4,000.3513</dd>
                                            <dd>USD</dd>
                                        </dl>
                                    </div>
                                    <div class="sell-payment col-sm-12 col-md-4 col-lg-4">
                                        <dl>
                                            <dt>Price</dt>
                                            <dd>47,757.8541</dd>
                                            <dd>USD</dd>
                                        </dl>
                                    </div>
                                    <div class="sell-payment col-sm-12 col-md-4 col-lg-4">
                                        <dl>
                                            <dt>Amount</dt>
                                            <dd>0.1387</dd>
                                            <dd>USD</dd>
                                        </dl>
                                    </div>
                                </div>

                                <div class="row" id="bankTransfer">
                                    <div class="col-sm-12 col-md-9 banktransfer">
                                        <h4>Payment method</h4>
                                        <div class="row mt-3">
                                            <div class="col-sm-12 col-lg-5">
                                                <h4>
                                                    <img src={icon_method01} className="mr-1"/>
                                                     Bank Transfer
                                                </h4>
                                            </div>
                                            <div class="col-sm-12 col-lg-7">
                                                <div class="billed clearfix">
                                                    <dl>
                                                        <dt>Name</dt>
                                                        <dd>john son</dd>
                                                    </dl>
                                                </div>
                                                <div class="billed clearfix">
                                                    <dl>
                                                        <dt>Bank account number</dt>
                                                        <dd>13235523296</dd>
                                                    </dl>
                                                </div>
                                                <div class="billed clearfix">
                                                    <dl>
                                                        <dt>Bank Name</dt>
                                                        <dd>Shin hanns</dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3" id="bankTransfer">
                                    <div class="col-sm-12 col-md-9 banktransfer pb-5">
                                        <h4>Terms of trade</h4>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12 col-md-9">
                                        <div class="sellbtc-process confirm w-75">
                                            <h3> 
                                                <span>Order Completed.</span> 
                                                How was your trading experience?
                                            </h3>
                                            <p>The transaction was completed with mutual agreement.</p>
                                        </div>
                                        <div class="btn_sellbtc mt-3">
                                            <Link to="/order_completed2" className="btn btn_positive mr-4"> 
                                                <img src={positive_icon}/> Positive
                                            </Link>
                                            <Link to="/order_completed2" className="btn btn_negative mr-4"> 
                                                <img src={positive_icon}/> Negative
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div id="selltips" class="pt-5">
                                    <div class="sell-tip">
                                        <h4>Tips</h4>
                                        <ol>
                                            <li> 
                                                Please make sure to log in to your account to confirm the payment is received, this can avoid financial losses caused by wrongly clicking on the release button.
                                            </li>

                                            <li>
                                                The digital assets you are selling has been frozen by the platform. Please confirm the receipt of the payment from the buyer and click “release” to release the crypto.
                                            </li>
                                            <li>
                                                Please do not agree to any request to release the crypto before confirming the receipt of the payment to avoid financial losses.
                                            </li>
                                            <li>
                                                After receiving the SMS notification, please be sure to log in to your bank account to confirm whether the payment is credited, this will avoid the release of crypto due to Fraud SMS.
                                            </li>
                                        </ol>
                                    </div>
                                </div>    

                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-5">
                            <div class="sell-btc-right-row">
                                <div class="sell-btc-right-row-top">
                                    <h4>Bi7752 </h4>
                                </div>
                                <hr class="warning-border" />

                                <div id="warning">
                                    <p>
                                        Warning: Advertisers please beware of scammers who buy crypto from you and then report it to the bank later. Make sure you got your Ad's terms and conditions adequately provided. Advertisers please consider additional verification when necessary. Do NOT listen to any person who tells you to buy crypto and transfer to them later. Beware of voice phising scams. Sellers please note that you should only release crypto when you receive enough money in your account. Please check your bank account carefully. Buyer DO NOT write crypto-related content in the transfer remark. Buyers please click on Paid after successful transfer. Users please be aware of scams / suspicious behaviors. Report to Binance immediately if you find scammers
                                    </p>
                                    <p class="my-5">
                                        Bi7752（real name：MYOUNGWOO WOO）has marked the order as paid. Please confirm that you have received the payment and release the asset. Please note: Make sure to log into your account and confirm that you have received the payment before releasing the asset to avoid loss.
                                    </p>
                                    <p class="my-5">
                                        저는 예금주 ‘우명우’ 본인임을 확인합니다. 또한 각종 보이스피싱, 자금세탁 등 불법적인 행위에 일절 가담하지 않습니다. 안전한 가상화폐 거래만을 진행합니다. 불법적인 행위와 관련될 시 말씀해주시면 바로 주문취소 하겠습니다. 감사합니다.    Hello, Thank you for placing order. My name on bank account is 우명우 which matches with name on binance. I do NOT want to be involved in anything illegal such as money laundry or any type of fraud. So if you are trying to do any of illegal action, please tell me then i will cancel the order right away. I only use binance as a safe trading channel for crypto currency.

                                    </p>
                                </div>
                                <hr class="warning-border" />

                                <div class="sellbtc-contact">
                                    <form>
                                        <input type="text" class="w-100" placeholder="Write Message......"/> 
                                    </form>
                                </div>

                                <div class="sellbtc-send-btn mt-3">
                                    <a href="#" class="btn btn-send" >Send</a>                                  
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>                
        </div>
    )
}
