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

import '@fortawesome/fontawesome-free/css/all.min.css';


function Confirm_release() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
        <Link to="#" className="btn btn_confirm" onClick={handleShow}>
            Confirm release
        </Link>        
        
        <Modal show={show} onHide={handleClose} className="confirmReleaseModal">            
            <Modal.Body>
            <div class="con-icon text-center">
                    <img src={term_error_icon}/>
                    <h4>Confirm release</h4>
                </div>
                <div class="con-content pt-3">
                    <p>
                        ATTENTION! Please be sure to LOG IN THE RECEVING (e.g.Banks/eWallet)ACCOUNT to confirm that the money has arrived in the"Available Balance"
                    </p>
                </div>
                <div class="col-auto">
                    <div class="form-check mb-0">
                        <input class="form-check-input" type="checkbox" id="coin-checked"/>
                        <label class="form-check-label mb-0 read--1" for="coin-checked">I confirm that the payment is successfully received with correct amount and sender information.</label>
                    </div>
                </div>
                <div class="confirm-cancel">                    
                    <a href="#" class="btn btn-confirm">Confirm release</a>
                    <a href="#" class="btn btn-cancel" onClick={handleClose}>Cancel</a>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

function Dispute_report() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Link to="#" className="btn btn_dispute" onClick={handleShow}>
            Dispute Report
        </Link>
        
        <Modal show={show} onHide={handleClose} className="disputeReportModal">
            <Modal.Header className="bg-primary col-md-12 modal-header text-white">
                <div class="col-md-2"></div>
                <div class="col-md-6 modal-header-content text-center">
                    <img src={term_logo_01_icon} class="w-auto"/>
                    <h4 class="modal-title">HelpCrunch Team</h4>
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-primary d-inline pr-0 text-white" >
                        <i class="fa fa-ellipsis-v fa-lg" aria-hidden="true"></i>
                    </button>
                    <button type="button" class="close btn-hps d-inline pl-0 pt-3" onClick={handleClose}>&times;</button>
                </div>
            </Modal.Header>
            <Modal.Body className="mb-5 border-b1 pb-5">
                <div class="main-crunch-content d-flex">
                    <div class="user-icon d-flex align-items-center pl-2">
                        <img src={term_user_icon} width="60"/>
                        <div class="body-header pl-3">
                            <h5 class="mb-0">HelpCrunch Team</h5>
                            <p>
                                Hey there If you have any questions, I’m here to help.
                            </p>
                        </div>
                    </div>
                    <div class="last-seen">
                        <p>14m</p>
                    </div>
                </div>
            </Modal.Body>
            <div class="modal-edit-body text-center pt-5 mt-5">
                <img src={term_edit_icon} class="edit-img"/>
                <div class="d-flex justify-content-center mt-2">
                    <img src={term_help_icon} class="crunch-img"/>
                    <h4>HELPCRUNCH</h4>
                </div>
            </div>
            <Modal.Footer class="bn-footer">
                <div class="ask-faq-bn ">
                    <div class="row justify-content-center">
                        <div class="col-6 text-center">
                            <a class="text-black font-weight-bold" href="#"><img src={term_ask_icon} width="25"/>ASK</a>
                        </div>
                        <div class="col-6 text-center">
                            <form class="form-inline d-flex justify-content-center md-form form-sm mt-0 ser-sec">
                                <i class="fas fa-search" aria-hidden="true"></i>
                                    <input class="form-control form-control-sm ml-1 w-90 border-none " type="text" placeholder="Search" aria-label="Search"/>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
      </>
    );
}

function Send_modal() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const history = useHistory();

    const routeChange = () =>{ 
        let path = `order_completed`; 
        history.push(path);
      }

    return (
        <>
        <Link to="#" className="btn btn-send" onClick={handleShow}> Send </Link>
            
        <Modal show={show} onHide={handleClose} className="sendSellbtcModal">
            <Modal.Header closeButton>
                <div class="sy-header-title">
                    <Modal.Title>Security verification</Modal.Title>
                    <p className="txt-secure pl-0 pr-2 py-2">To secure your account. please complete the following verification.</p>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div class="form-group my-input-group">
                    <label for="phoneNumber "class="txt-ph-var">Phone verification code</label>
                    <input type="email" class="form-control in-vat-txt" id="phoneNumber" placeholder="Verification code sent"/>
                    <small class="form-text text-muted mt-3">Enter the 6 digit code sent to 10232***3453</small>
                    <small class="form-text myform-small mt-3">Security verification unavailable?</small>
                </div>
                <button type="button" onClick={routeChange} class="btn btn-primary w-100">SUBMIT</button>
            </Modal.Body>
            
        </Modal>
        </>
    );
}

function Attachments_modal() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Link to="#" className="float-left mr-3" onClick={handleShow}>
        <i class="fas fa-paperclip pr-2"></i> Attachments
        </Link>
        
        <Modal show={show} onHide={handleClose} className="attchmodal">
            
            <Modal.Body>
            <div class="att-title">
                <h2>Upload</h2>
            </div>
            <div class="drop-file-content py-4 px-3 d-flex justify-content-center align-items-center">
                <div class="upload-icon">
                    <img src={term_upload_icon} class="pdf-icon"/>
                </div>
                <div class="upload-icon-content pl-3">
                    <p class="mb-0"> <strong>Drop files to attach, or</strong> <span>Browse</span></p>
                    <p class="mb-0">(Individual file upload size limit 1MB)</p>
                </div>
            </div>
            </Modal.Body>
            <div class="main-upload-doc px-3">
                <div class="upload-doc mt-2">
                    <div class="row">
                        <div class="col-10">
                            <div class="uplod-doc-icon px-3 py-2 d-flex align-items-center">
                                <img src={term_doc_icon}/>
                                <div class="pgl-content w-100">
                                    <div class="pgl-title">
                                        <p class="mb-0">File name goes here.pdf</p>
                                        <ProgressBar now={50} variant="info"/>
                                    </div>
                                </div>
                        
                            </div>
                        </div>
                        <div class="col-1">
                            <a href="#" class="close btn-cl" aria-label="Close"> <span aria-hidden="true">&times;</span> </a>
                        </div>
                    </div>
                </div>
                <div class="upload-doc mt-2">
                    <div class="row">
                        <div class="col-10">
                            <div class="uplod-doc-icon px-3 py-2 d-flex align-items-center">
                                <img src={term_doc_icon} width="50"/>
                                <div class="pgl-content w-100">
                                    <div class="pgl-title">
                                        <p class="mb-0">File name goes here.pdf</p>
                                        <ProgressBar now={50} variant="info"/>
                                    </div>
                                </div>
                        
                            </div>
                        </div>
                        <div class="col-1">
                            <a href="#" class="close btn-cl" aria-label="Close"> <span aria-hidden="true">&times;</span> </a>
                        </div>
                    </div>
                </div>
                <div class="upload-doc mt-2">
                    <div class="row">
                        <div class="col-10">
                            <div class="uplod-doc-icon px-3 py-2 d-flex align-items-center">
                                <img src={term_doc_icon} width="50"/>
                                <div class="pgl-content w-100">
                                    <div class="pgl-title">
                                        <p class="mb-0">File name goes here.pdf</p>
                                        <ProgressBar now={100} variant="info1"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <a href="#" class="close btn-cl" aria-label="Close"> <span aria-hidden="true">&times;</span> </a>
                        </div>
                    </div>
                </div>  
            </div>
            <Modal.Footer>
                <Button variant="outline-cancel" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Add
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
}


 
export const Sell_btc = () => {
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
                                        <div class="sellbtc-process">
                                            <h3>Unpaid 89 mins 48 secs</h3>
                                            <p>The BTC will be held in the escrow for 90 mins. And it will be return to the seller if this trade is not paid in time</p>
                                        </div>
                                        <div class="btn_sellbtc mt-3">
                                            <Confirm_release>
                                            </Confirm_release>

                                            <Dispute_report>
                                            </Dispute_report>
                                            
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
                                    <div class="col-auto">
                                        <Attachments_modal></Attachments_modal>
                                        
                                    </div>
                                    <div class="col-auto">
                                        <a href="#" class="float-left"><i class="far fa-comment-dots"></i> Frequently used phrases</a>
                                    </div>
                                </div>

                                <div class="sellbtc-send-btn">
                                    <Send_modal></Send_modal>                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>                
        </div>
    )
}
