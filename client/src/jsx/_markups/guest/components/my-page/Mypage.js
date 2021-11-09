import React, { useEffect, useState, useRef } from "react";
import { Form,Button,Modal,Nav,ProgressBar} from 'react-bootstrap';

import icon_password from '../../app-assets/images/icon/icon_password.png';
import icon_recommended from '../../app-assets/images/icon/icon_recommended.png';
import icon_phone from '../../app-assets/images/icon/icon_phone.png';
import icon_email from '../../app-assets/images/icon/icon_email.png';
import icon_verification from '../../app-assets/images/icon/icon_verification.png';
import '../frame/Frame01.css'

function Add_payment_method() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
            <Button variant="" className="btn_add" onClick={handleShow}>
                + add a payment method
            </Button>
            
            <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <div class="row">
                    <div class="col-12">
                        <div class="all-payment-header d-flex justify-content-between pt-4">
                            <div class="all-payment-header-left">
                                <h3>All Payment Methods</h3>
                            </div>
                            <div class="all-payment-header-right">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text border-top-0 border-right-0 border-left-0  bg-transparent"><i class="fa fa-search" aria-hidden="true"></i></span>
                                    </div>
                                    <input type="text" class="form-control border-top-0 border-right-0 border-left-0" placeholder="Search"/>
                                </div>
                            </div>
                        </div>

                        <div class="all-payment-nav pb-4">
                            <div class="all-payment-nav-btn d-flex align-items-center">
                                <button class="btn btn-primary">ALL</button>
                                <p class="mb-0 pl-3">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
                            </div>
                        </div>

                        <div class="all-payment-body mt-4">
                            <table class="w-75">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="position-relative orange"><h5>7-Eleven</h5></td>
                                        <td class="position-relative light-green"><h5>A-Bank</h5></td>
                                    </tr>
                                    <tr>
                                        <td class="position-relative dark-green"><h5>ABA Bank</h5></td>
                                        <td class="position-relative dark-green"><h5>ABN AMRO</h5></td>
                                    </tr>
                                    <tr>
                                        <td class="position-relative red"><h5>Absolut Bank</h5></td>
                                        <td class="position-relative green"><h5>Advcash</h5></td>
                                    </tr>
                                    <tr>
                                        <td class="position-relative green"><h5>Agrebank</h5></td>
                                        <td class="position-relative blue"><h5>AirTM</h5></td>
                                    </tr>
                                    <tr>
                                        <td class="position-relative green"><h5>Ak Bars Bank</h5></td>
                                        <td class="position-relative red"><h5>Alfa-bank</h5></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            </Modal>
        </>
    );
}
export const Mypage = () => {
    return (
        <div class="content">
        <section id="profile">
            <div class="container">
                <div class="row wow fadeInDown" data-wow-delay="0.2s">
                    <div class="col-12">
                        <h4>My profile</h4>
                        <div class="user_info clear">
                            <div class="nickname"><span>B</span>BLOCKDAON<i class="fas fa-check-circle"></i><a href="#" class="btn_edit"><i class="fas fa-edit"></i>Edit</a></div>
                            <div class="user_id">User ID: <span>22798832</span></div>
                        </div>
                        <p>Last login time : <span>2021-08-13 16:36:14</span></p>
                        <p>IP : <span>210.183.98.102</span></p>
                        <div class="bottom clear">
                            <dl>
                                <dt>Total orders</dt>
                                <dd>35</dd>
                            </dl>
                            <dl>
                                <dt>Completion rate</dt>
                                <dd>75%</dd>
                            </dl>
                            <dl>
                                <dt>Trade Review(Positive/Negative)</dt>
                                <dd><span class="positive">5</span>/<span class="negative">4</span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="settings">
            <div class="container">
                <div class="row wow fadeInDown" data-wow-delay="0.4s">
                    <div class="col-12">
                        <h4>Authentication Settings</h4>
                        <div class="table_container">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Email</th>
                                        <th>SMS</th>
                                        <th>OTP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Login Confirmation</td>
                                        <td>
                                            <Form.Check type="switch" id="custom-switch-login1-email" className="custom-switch-md text-center" size="lg" label="" defaultChecked={true}/>
                                        </td>
                                        <td>
                                            <Form.Check type="switch" id="custom-switch-login1-sms" className="custom-switch-md text-center" size="lg" label="" defaultChecked={false}/>
                                        </td>
                                        <td>
                                            <Form.Check type="switch" id="custom-switch-login1-otp" className="custom-switch-md text-center" size="lg" label="" defaultChecked={true}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Transaction Confirmation</td>
                                        <td>
                                            <Form.Check type="switch" id="custom-switch-trans-email" className="custom-switch-md text-center" size="lg" label="" defaultChecked={true}/>
                                        </td>
                                        <td>
                                            <Form.Check type="switch" id="custom-switch-trans-sms" className="custom-switch-md text-center" size="lg" label="" defaultChecked={false}/>
                                        </td>
                                        <td>
                                            <Form.Check type="switch" id="custom-switch-trans-otp" className="custom-switch-md text-center" size="lg" label="" defaultChecked={false}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Login Confirmation</td>
                                        <td>
                                            <Form.Check type="switch" id="custom-switch-login2-email" className="custom-switch-md text-center" size="lg" label="" defaultChecked={true}/>
                                        </td>
                                        <td>
                                            <Form.Check type="switch" id="custom-switch-login2-sms" className="custom-switch-md text-center" size="lg" label="" defaultChecked={false}/>
                                        </td>
                                        <td>
                                            <Form.Check type="switch" id="custom-switch-login2-otp" className="custom-switch-md text-center" size="lg" label="" defaultChecked={true}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="securityTop">
            <div class="container">
                <div class="row wow fadeInDown" data-wow-delay="0.6s">
                    <div class="col-12">
                        <h4>Security</h4>
                        <ul>
                            <li class="password clear">
                                <img src={icon_password} alt="Login Password" />
                                <dl>
                                    <dt>Login Password</dt>
                                    <dd>Login password is used to log in to your account.</dd>
                                </dl>
                                <a href="#" class="btn btn_change">Change</a>
                            </li>
                            <li class="recommended clear">
                                <img src={icon_recommended} alt="Google Authenticator (Recommended)" />
                                <dl>
                                    <dt>Google Authenticator (Recommended)</dt>
                                    <dd>Protect your account and transactions.</dd>
                                    <dd><a href="#">Having trouble?</a></dd>
                                </dl>
                                <a href="#" class="btn_unset"><i class="fad fa-plus-circle"></i>Unset</a>
                                <a href="#" class="btn btn_enable">Enable</a>
                            </li>
                            <li class="phone clear">
                                <img src={icon_phone} alt="Phone Number Verification" />
                                <dl>
                                    <dt>Phone Number Verification</dt>
                                    <dd>Protect your account and transactions.</dd>
                                </dl>
                                <p><i class="fas fa-check-circle"></i>010****1234</p>
                                <a href="#" class="btn btn_change">Change</a>
                                <a href="#" class="btn btn_remove">Remove</a>
                            </li>
                            <li class="email clear">
                                <img src={icon_email} alt="Email Address Verification" />
                                <dl>
                                    <dt>Email Address Verification</dt>
                                    <dd>Protect your account and transactions.</dd>
                                </dl>
                                <p><i class="fas fa-check-circle"></i>abc**@naver.com</p>
                                <a href="#" class="btn btn_change">Change</a>
                                <a href="#" class="btn btn_remove">Remove</a>
                            </li>
                            <li class="verification clear">
                                <img src={icon_verification} alt="Identity Verification" />
                                <dl>
                                    <dt>Identity Verification</dt>
                                    <dd>Identity Verification can protect your account security and increase transaction limits.</dd>
                                </dl>
                                <a href="#" class="btn btn_enable">Enable</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="securityBottom">
            <div class="container">
                <div class="row wow fadeInDown" data-wow-delay="0.8s">
                    <div class="col-12">
                        <h4>Security</h4>
                        <div class="p2p"><span>P2P</span></div>
                        <p>P2P payment methods: When you sell cryptocurrencies, the payment method added will be displayed to buyer as options to accept payment, please ensure that the account owner’s name is consistent with your verified name on Binance. You can add up to 20 pay ment methods</p>
                        
                        <Add_payment_method>
                        </Add_payment_method>
                        <div class="wechat">
                            <div class="top clear">
                                <h5>Wechat</h5>
                                <ul class="clear">
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Delete</a></li>
                                </ul>
                            </div>
                            <div class="bottom clear">
                                <dl>
                                    <dt>Name</dt>
                                    <dd>Name</dd>
                                </dl>
                                <dl>
                                    <dt>Wechat account</dt>
                                    <dd>Wechat account</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="bank">
                            <div class="top clear">
                                <h5>Bank Transfer</h5>
                                <ul class="clear">
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Delete</a></li>
                                </ul>
                            </div>
                            <div class="bottom clear">
                                <dl>
                                    <dt>Name</dt>
                                    <dd>Name</dd>
                                </dl>
                                <dl>
                                    <dt>Bank account number</dt>
                                    <dd>Bank account number</dd>
                                </dl>
                                <dl>
                                    <dt>Bank name</dt>
                                    <dd>Bank name</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};
