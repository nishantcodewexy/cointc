import React, { useEffect, useState } from 'react'
import './Sell_btc.css'
import { Container, Button,Modal,Nav,ProgressBar } from 'react-bootstrap';


import usdt_icon from '../../app-assets/images/icon/usdt.png';
import cont_icon from '../../app-assets/images/page/order/cont.png';

import term_error_icon from '../../app-assets/images/page/term-error-icon.png';
import term_logo_01_icon from '../../app-assets/images/page/term-logo-01.png';
import term_user_icon from '../../app-assets/images/page/term-user-icon.png';
import term_help_icon from '../../app-assets/images/page/term-help-logo.png';
import term_edit_icon from '../../app-assets/images/page/term-edit-icon.png';
import term_ask_icon from '../../app-assets/images/page/term-ask-icon.png';
import term_search_icon from '../../app-assets/images/page/term-search-icon.png';
import term_upload_icon from '../../app-assets/images/page/term-upload-icon.png';
import term_doc_icon from '../../app-assets/images/page/term-doc-icon.png';

import '@fortawesome/fontawesome-free/css/all.min.css';


function Confirm_release() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" className="mt-2 mr-1" onClick={handleShow}>
            Confirm release
        </Button>
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div class="con-icon text-center">
                <img src={term_error_icon} width="75"/>
                <h2>Confirm release</h2>
            </div>
            <div class="con-content pt-3">
                <p>
                    ATTENTION! Please be sure to LOG IN THE RECEVING (e.g.Banks/eWallet)ACCOUNT to confirm that the money has arrived in the"Available Balance"
                </p>
            </div>

            <div class="form-check pt-3">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">
                    I confirm that the payment is successfully received with correct amount and sender information.
                </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
            Confirm release
            </Button>
          </Modal.Footer>
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
        <Button variant="primary" className="mt-2 mr-1" onClick={handleShow}>
        Dispute Report
        </Button>
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="bg-primary col-md-12 modal-header text-white" >
                {/* <Modal.Title > */}
                <div class="col-md-2"></div>
                <div class="col-md-6 modal-header-content text-center">
                    <img src={term_logo_01_icon}/>
                    <h4 class="modal-title">Modal Heading</h4>
                </div>
                <div class="col-md-2">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>
            <Modal.Body className="mb-5 border-b1">
            <div class="main-crunch-content d-flex">
                <div class="user-icon d-flex align-items-center">
                    <img src={term_user_icon} width="60"/>
                    <div class="body-header ml-2">
                        <h5 class="mb-0">HelpCrunch Team</h5>
                        <p>Hey there If you have any questions, I’m here to help.</p>
                    </div>
                </div>
                <div class="last-seen">
                    <p>14m</p>
                </div>
            </div>
            </Modal.Body>
            <div class="modal-edit-body text-center pt-5">
                <img src={term_edit_icon} width="50"/>
                <div class="d-flex justify-content-center mt-2">
                    <img src={term_help_icon}/>
                    <h4>HELPCRUNCH</h4>
                </div>
            </div>
            <Modal.Footer class="bn-footer">
                <div class="ask-faq-bn d-flex justify-content-around">
                    <a class="text-black font-weight-bold" href="#"><img src={term_ask_icon} width="25"/>ASK</a>
                    <a class="text-secondary font-weight-bold" href="#"><img src={term_search_icon} width="25"/>SEARCH</a>
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
  
    return (
      <>
        <Button variant="primary" className="mt-2 mr-1" onClick={handleShow}>
            Send
        </Button>
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <div class="sy-header-title">
                    <Modal.Title>Security verification</Modal.Title>
                    <p>To secure your account. please complete the following verification.</p>
                </div>
            </Modal.Header>
            <Modal.Body>
            <div class="form-group">
                <label for="exampleInputEmail1">Phone verification code</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Verification code sent"/>
                <small id="emailHelp" class="form-text text-muted">Enter the 6 digit code sent to 10232***3453</small>
            </div>
            <button type="button" class="btn btn-primary w-100">SUBMIT</button>
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
        <Nav.Link variant="primary" className="mt-2 mr-1" onClick={handleShow}>
        <i class="fas fa fa-paperclip pr-2"></i> Attachmentss
        </Nav.Link>
        
        <Modal show={show} onHide={handleClose}>
          
            <Modal.Body>
            <div class="att-title">
                <h2>Upload</h2>
            </div>
            <div class="drop-file-content py-4 px-3 d-flex justify-content-center align-items-center">
                <div class="upload-icon">
                    <img src={term_upload_icon} width="60"/>
                </div>
                <div class="upload-icon-content pl-3">
                    <p class="mb-0">Drop files to attach, or <span class="text-primary">Browse</span></p>
                    <p class="mb-0">(Individual file upload size limit 1MB)</p>
                </div>
            </div>
            </Modal.Body>
            <div class="main-upload-doc px-3">
                <div class="upload-doc mt-2">
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
                <div class="upload-doc mt-2">
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
                <div class="upload-doc mt-2">
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
            </div>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
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
        <div className="Sell_btc"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-10 d-block d-md-flex justify-content-around">
                                <div class="col col-xs-12 col-sm-12 col-md-7 sell-pm mt-3 py-4 px-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="sell-pm-title">
                                        <h3>SELL BTC</h3>
                                    </div>
                                    <div class="order-details">
                                        <table class="d-flex">
                                            <thead class="pr-2">
                                                <tr>
                                                    <th>Order Number</th>
                                                </tr>
                                                <tr>
                                                    <th>creation time</th>
                                                </tr>
                                                <tr>
                                                    <th>Payment Method</th>
                                                </tr>
                                                <tr>
                                                    <th>state</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>6426424951</td>
                                                </tr>
                                                <tr>
                                                    <td>2021-08-11 16:21</td>
                                                </tr>
                                                <tr>
                                                    <td>account transfer</td>
                                                </tr>
                                                <tr>
                                                    <td>in progress</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <hr/>

                                <table class="table sell-table">
                                    <thead>
                                        <tr>
                                            <th>Total</th>
                                            <th>Price</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>4,000.3513 <br/> <span>USD</span></td>
                                            <td>47,757.8541 <br/> <span>USD</span></td>
                                            <td>0.1387 <br/> <span>BTC</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="pmb-element py-4 px-3">
                                    <div class="pmb-title">
                                        <h3>Payment method</h3>
                                    </div>
                                    <div class="pmb-content d-flex">
                                        <div class="pmb-content-title">
                                            <h5><i class="fas fa-university pr-2"></i>Bank Transfer</h5>
                                        </div>
                                        <div class="pmb-content-element ml-4">
                                            <div class="pmt-details">
                                                <p>Name</p>
                                                <p>john son</p>
                                            </div>
                                            <div class="pmt-details">
                                                <p>Bank account number</p>
                                                <p>13235523296</p>
                                            </div>
                                            <div class="pmt-details">
                                                <p>Bank Name</p>
                                                <p>Shin hanns</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tot-element py-4 px-3 mt-2">
                                    <div class="tot-title">
                                        <h3>Terms of trade</h3>
                                    </div>
                                </div>

                                <div class="unpaid-time-title mt-2">
                                    <h5>Unpaid 89 mins 48 secs</h5>
                                    <p>The BTC will be held in the escrow for 90 mins. And it will be return to the seller if this trade is not paid in time</p>
                                </div>

                                
                                <div class="pmb-bn mt-2">
                                    <Confirm_release>
                                    </Confirm_release>

                                    <Dispute_report>
                                    </Dispute_report>
                                </div>

                                <div class="pmb-tip mt-4">
                                    <p>Tips</p>
                                    <p>
                                        1. Please make sure to log in to your account to confirm the payment is received, 	this can avoid financial losses caused by wrongly clicking on the release button.
                                        </p>
                                    <p>
                                        2. The digital assets you are selling has been frozen by the platform. Please confirm the receipt of the payment from the buyer and click “release” to release the crypto.
                                    </p>
                                    <p>
                                        3. Please do not agree to any request to release the crypto before confirming the receipt of the payment to avoid financial losses.
                                    </p>
                                    <p>
                                        4. After receiving the SMS notification, please be sure to log in to your bank account to confirm whether the payment is credited, this will avoid the release of crypto due to Fraud SMS.
                                    </p>
                                </div>
                                </div>
                                <div class="col col-xs-12 col-sm-12 col-md-4 sell-pm mt-3 p-0">
                                    <div class="bi-title">
                                        <h3 class="pl-3 mt-3 text-primary">Bi7752 </h3>
                                    </div>
                                    <hr/>

                                    <div class="bi-content px-3 py-4">
                                        <p>
                                            Warning: Advertisers please beware of scammers who buy crypto from you and then report it to the bank later. Make sure you got your Ad's terms and conditions adequately provided. Advertisers please consider additional verification when necessary. Do NOT listen to any person who tells you to buy crypto and transfer to them later. Beware of voice phising scams. Sellers please note that you should only release crypto when you receive enough money in your account.
                                        </p>
                                        <p>
                                            Bi7752（real name：MYOUNGWOO WOO）has marked the order as paid. Please confirm that you have received the payment and release the asset. Please note: Make sure to log into your account and confirm that you have received the payment before releasing the asset to avoid loss.
                                        </p>
                                        <p>
                                            저는 예금주 ‘우명우’ 본인임을 확인합니다. 또한 각종 보이스피싱, 자금세탁 등 불법적인 행위에 일절 가담하지 않습니다. 안전한 가상화폐 거래만을 진행합니다. 불법적인 행위와 관련될 시 말씀해주시면 바로 주문취소 하겠습니다. 감사합니다.    Hello, Thank you for placing order. My name on bank account is 우명우 which matches with name on binance. I only use binance as a safe trading channel for crypto currency.
                                        </p>
                                    </div>

                                    <div class="massage-input justify-content-center d-flex">
                                        <input class="px-2 py-1" type="text" name="message" placeholder="Write Message......"/>
                                    </div>

                                    <div class="btn-footer px-3 py-4">
                                        <div class="attach-faq">
                                            <ul class="navbar-nav">
                                                <li class="nav-item">
                                                <Attachments_modal>
                                                </Attachments_modal>
                                                    
                                                    <a class="nav-link" href="#"><i class="far fa-comment-dots pr-2"></i>Frequently used phrases</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="send-bn">
                                            <Send_modal>
                                            </Send_modal>
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
