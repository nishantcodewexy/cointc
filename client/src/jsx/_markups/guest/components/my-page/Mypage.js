import React, { useState }  from 'react'

import './Mypage.css'
// import './ToggleSwitch.scss'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'

import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet,FormCheck } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import blockdaon_icon from '../../app-assets/images/icon/blockdaon.png';
import edit_icon from '../../app-assets/images/icon/edit.png';
import login_pass_icon from '../../app-assets/images/icon/login-pass.png';
import google_auth_icon from '../../app-assets/images/icon/google-auth.png';
import phone_icon from '../../app-assets/images/icon/phone.png';
import email_icon from '../../app-assets/images/icon/email.png';
import identity_verification_icon from '../../app-assets/images/icon/identity-verification.png';

export const Mypage = () => {
    let [login_conf1_email, setLoginConf1Email] = useState(true);
    let [login_conf2_email, setLoginConf2Email] = useState(true);
    let [trans_conf_email, setTransConfEmail] = useState(true);

    let [login_conf1_sms, setLoginConf1SMS] = useState(false);
    let [login_conf2_sms, setLoginConf2SMS] = useState(false);
    let [trans_conf_sms, setTransConfSMS] = useState(false);

    let [login_conf1_otp, setLoginConf1OTP] = useState(true);
    let [login_conf2_otp, setLoginConf2OTP] = useState(false);
    let [trans_conf_otp, setTransConfOTP] = useState(true);

    const onLoginConf1EmailChange = (checked) => {
        setLoginConf1Email(checked);
    }
    const onLoginConf2EmailChange = (checked) => {
        setLoginConf2Email(checked);
    }
    const onTransConfEmailChange = (checked) => {
        setTransConfEmail(checked);
    }
    const onLoginConf1SMSChange = (checked) => {
        setLoginConf1SMS(checked);
    }
    const onLoginConf2SMSChange = (checked) => {
        setLoginConf2SMS(checked);
    }
    const onTransConfSMSChange = (checked) => {
        setTransConfSMS(checked);
    }
    const onLoginConf1OTPChange = (checked) => {
        setLoginConf1OTP(checked);
    }
    const onLoginConf2OTPChange = (checked) => {
        setLoginConf2OTP(checked);
    }
    const onTransConfOTPChange = (checked) => {
        setTransConfOTP(checked);
    }
    return (     
        <div className="Mypage"> 
            <section id="profile">
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-10 col-sm-12">
                                <div class="my-profile mt-4 overflow-x-auto">
                                    <h4 class="my-profile-title">MY Profile</h4>
                                    <div class="main-info-menu d-flex justify-content-between">
                                        <div class="info-menu d-flex">
                                            <a href="#" class="font-weight-bold d-flex align-items-center pr-3"><img src={blockdaon_icon} class="pr-1" width="25"/>BLOCKDAON</a>
                                            <a href="#" class="font-weight-bold d-flex align-items-center"><img src={edit_icon} class="pr-1" width="20"/>EDIT</a>
                                        </div>
                                        <div class="main-info-right">
                                            <p class="mb-0">User ID: 22798832</p>
                                        </div>
                                    </div>
                                    <div class="profile-content">
                                        <p class="mt-2">Last login time 2021-08-13 16:36:14 IP 210.183.98.102</p>
                                    </div>
                                    <div class="profile-footer d-flex">
                                        <div class="profile-footer-left pr-4">
                                            <h6 class="text-secondary">Total orders</h6>
                                            <h4>35</h4>
                                        </div>
                                        <div class="profile-footer-center px-4">
                                            <h6 class="text-secondary">Completion rate</h6>
                                            <h4>75%</h4>
                                        </div>
                                        <div class="profile-footer-right px-4">
                                            <h6 class="text-secondary">Trade Review(Positive/Negative)</h6>
                                            <h4><span class="text-success">5</span>/<sapn class="text-danger">4</sapn></h4>
                                        </div>
                                    </div>
                                </div>

                                <div class="authentication-settings mt-5 pb-4 overflow-x-auto">
                                    <table id="table" class="w-100">
                                        <thead>
                                            <tr>
                                                <th class="font-weight-bold"><h3>Authentication Settings</h3></th>
                                                <th>Email</th>
                                                <th>SMS</th>
                                                <th>OTP</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Login Confirmation</td>
                                                <td class="email-switch">                                                
                                                    <ToggleSwitch id="login_conf1_email" checked={ login_conf1_email } onChange={ onLoginConf1EmailChange } optionLabels={[null,null]} />
                                                </td>
                                                <td class="email-switch sms-switch">
                                                    <ToggleSwitch id="login_conf1_sms" checked={ login_conf1_sms } onChange={ onLoginConf1SMSChange } optionLabels={[null,null]} />
                                                </td>
                                                <td class="email-switch">
                                                    <ToggleSwitch id="login_conf1_otp" checked={ login_conf1_otp } onChange={ onLoginConf1OTPChange } optionLabels={[null,null]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Login Confirmation</td>
                                                <td class="email-switch">
                                                    <ToggleSwitch id="login_conf2_email" checked={ login_conf2_email } onChange={ onLoginConf2EmailChange } optionLabels={[null,null]} />
                                                </td>
                                                <td class="email-switch sms-switch">
                                                    <ToggleSwitch id="login_conf2_sms" checked={ login_conf2_sms } onChange={ onLoginConf2SMSChange } optionLabels={[null,null]} />
                                                </td>
                                                <td class="email-switch otp-switch">
                                                    <ToggleSwitch id="login_conf2_otp" checked={ login_conf2_otp } onChange={ onLoginConf2OTPChange } optionLabels={[null,null]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Transaction Confirmation</td>
                                                <td class="email-switch">
                                                    <ToggleSwitch id="trans_conf_email" checked={ trans_conf_email } onChange={ onTransConfEmailChange } optionLabels={[null,null]} />
                                                </td>
                                                <td class="email-switch sms-switch">
                                                    <ToggleSwitch id="trans_conf_sms" checked={ trans_conf_sms } onChange={ onTransConfSMSChange } optionLabels={[null,null]} />
                                                </td>
                                                <td class="email-switch otp-switch">
                                                    <ToggleSwitch id="trans_conf_otp" checked={ trans_conf_otp } onChange={ onTransConfOTPChange } optionLabels={[null,null]} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="profile-security mt-5 pb-4 overflow-x-auto">
                                    <table id="table" class="w-100">
                                        <thead>
                                            <tr>
                                                <th class="font-weight-bold"><h3>Security</h3></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="d-flex">
                                                    <div class="sec-icon">
                                                        <img src={login_pass_icon} class="pr-3"/>
                                                    </div>
                                                    <div class="sec-login-pass">
                                                        <p class="mb-0">Login Password</p>
                                                        <p class="mb-0 text-secondary">
                                                            <small>Login Password is used to log in to your account.</small>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td><button class="btn btn-change-security">Change</button></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex">
                                                    <div class="sec-icon">
                                                        <img src={google_auth_icon} class="pr-3"/>
                                                    </div>
                                                    <div class="sec-login-pass">
                                                        <p class="mb-0">Google Authenticator(Recommended)</p>
                                                        <p class="mb-0 text-secondary">
                                                            <small>Protect your account and transactions.</small>
                                                        </p>
                                                        <a href="#" class="having-border">Having trouble?</a>
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td><button class="btn btn-change-security">Enable</button></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex">
                                                    <div class="sec-icon">
                                                        <img src={phone_icon} class="pr-3"/>
                                                    </div>
                                                    <div class="sec-login-pass">
                                                        <p class="mb-0">Phone number Verification</p>
                                                        <p class="mb-0 text-secondary">
                                                            <small>Protect your account and transactions.</small>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>+1234567890</td>
                                                <td><button class="btn btn-change-security">Change</button></td>
                                                <td><button class="btn btn-change-security">Remove</button></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex">
                                                    <div class="sec-icon">
                                                        <img src={email_icon} class="pr-3"/>
                                                    </div>
                                                    <div class="sec-login-pass">
                                                        <p class="mb-0">Email Address Verification</p>
                                                        <p class="mb-0 text-secondary">
                                                            <small>Protect your account and transactions.</small>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>abc@gmal.com</td>
                                                <td><button class="btn btn-change-security">Change</button></td>
                                                <td><button class="btn btn-change-security">Change</button></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex">
                                                    <div class="sec-icon">
                                                        <img src={identity_verification_icon} class="pr-3"/>
                                                    </div>
                                                    <div class="sec-login-pass">
                                                        <p class="mb-0">Identity Verification</p>
                                                        <p class="mb-0 text-secondary">
                                                            <small>Identity verification can protect your account security</small>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td><button class="btn btn-change-security">Enable</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="my-profile mt-4 overflow-x-auto">
                                    <h4 class="my-profile-title">Payment</h4>
                                    <div class="p2p-text-title pt-4">
                                        <p class="mb-0">P2P</p>
                                        <hr class="mt-0"/>
                                    </div>
                                    <div class="p2p-header mt-5">
                                        <div class="row align-items-center">
                                            <div class="col-md-8">
                                                <p class="mb-0">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                                </p>
                                            </div>
                                            <div class="col-md-4 d-flex justify-content-end">
                                                <a href="#" class="btn btn-p2p-payment">+ Add payment method</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="wechat overflow-x-auto mt-4">
                                        <div class="main-wechat-header d-flex justify-content-between align-items-center">
                                            <div class="wechat-header-left"><h5 class="mb-0">WeChat</h5></div>
                                            <div class="wechat-header-right">
                                                <a href="#" class="btn btn-wechat-edit text-black">Edit</a>
                                                <a href="#" class="btn btn-wechat-delete text-black">Delete</a>
                                            </div>
                                        </div>
                                        <table class="w-100">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>WeChat account</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Hdastsg</td>
                                                    <td>Bloackdaon</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="wechat overflow-x-auto mt-4">
                                        <div class="main-wechat-header d-flex justify-content-between align-items-center">
                                            <div class="wechat-header-left"><h5 class="mb-0">BankTransfer</h5></div>
                                            <div class="wechat-header-right">
                                                <a href="#" class="btn btn-wechat-edit text-black">Edit</a>
                                                <a href="#" class="btn btn-wechat-delete text-black">Delete</a>
                                            </div>
                                        </div>
                                        <table class="w-100">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Bank account number</th>
                                                    <th>Bank name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Hdastsg</td>
                                                    <td>1252456346</td>
                                                    <td>Shin han</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="wechat overflow-x-auto my-4">
                                        <div class="main-wechat-header d-flex justify-content-between align-items-center">
                                            <div class="wechat-header-left"><h5 class="mb-0">BankTransfer</h5></div>
                                            <div class="wechat-header-right">
                                                <a href="#" class="btn btn-wechat-edit text-black">Edit</a>
                                                <a href="#" class="btn btn-wechat-delete text-black">Delete</a>
                                            </div>
                                        </div>
                                        <table class="w-100">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Bank account number</th>
                                                    <th>Bank name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="text" name="name"/></td>
                                                    <td><input type="text" name="accountnumber"/></td>
                                                    <td><input type="text" name="bankname"/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="payment-save text-right">
                                            <button type="sunbmit" class="btn btn-payment-save" value="submit">Save</button>
                                        </div>
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
