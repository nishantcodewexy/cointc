import React, { useEffect, useState } from 'react'
import './wallet-asset.css'
import { Container, Row, Col, Modal, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

import bnb_icon from '../../app-assets/images/icon/bnb.png';
import eth_icon from '../../app-assets/images/icon/eth.png';
import usdt_icon from '../../app-assets/images/icon/usdt.png';
import xrp_icon from '../../app-assets/images/icon/xrp.png';
import eos_icon from '../../app-assets/images/icon/eos.png';

import qr_code_icon from '../../app-assets/images/page/wallet/qr-code.png';


import { Wallet_deposit } from './Wallet_deposit';

function Wallet_deposit_modal() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <a href="#" variant="primary" className="mt-2 mr-1" onClick={handleShow}>
		Deposit
        </a>
        
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Body>
			<section id="withdrawCrypto" className="p-3">
				<div class="row">
					<div class="col col-sm-12 col-md-12 main-bg">
						<h4> Deposit Crypto </h4>
						<form>
							<div class="form-group row justify-content-between mb-0 py-2">
								<label class="col-sm-4 col-form-label">Select Coin</label>
								<div class="col-sm-10  col-md-6 select-coin-input">
									<select id="coin" class="form-control text-center">
										<option value="usdt">USDT</option>
										<option value="sdt">SDT</option>
									</select>
								</div>
							</div>

							<div class="form-group row justify-content-between mb-0 py-2">
								<label class="col-sm-2 col-form-label">Network</label>
								<div class="col-sm-10  col-md-6 network-input">
									<input type="text" class="form-control-plaintext text-md-right"  value="Ethreum ERC20"/>
								</div>
							</div>

							<div class="form-group row justify-content-between mb-0 py-2">
								<label for="inputPassword" class="col-sm-4 col-form-label"> Deposit Address </label>	
							</div>

							<div class="col-md-8 mx-auto deposit-address-img">
								<div class="card border-0">
									<img class="card-img-top w-25 mx-auto" src={qr_code_icon} alt="Card image cap"/>
									<div class="card-body text-center">
										<p class="card-text">0x7790a6DAe3174A60E171A25a040f913b5d6054d4</p>
										<a href="#" class="btn btn-primary mr-1">Share</a>
										<a href="#" class="btn btn-primary mr-1">Copy</a>
										<p class="card-text-p card-text mt-3">최소입금금액은 2 USDT 입니다.2 USDT 미만 입금 시 잔고 반영이 불가능합니다.</p>
									</div>
								</div>
							</div>	  	

							<hr class="form-hr-bottom" />

							<div class="wd-info col-12">
								<p><i class="fa fa-info-circle mr-2"></i>Deposit information</p>
								<ul>
									<li>위 입금 주소는 USDT만 입금이 가능합니다. 네트워크가 Ethreum ERC20인지 반드시 확인해주세요.</li>
									<li>  USDT 외 다른 암호화폐 입금 시 복구가 불가하오니 주의해 주시기 바랍니다.</li>
									<li>컨트랙트 입금의 경우 입금과 자산 반영에 지연이 발생할 수 있습니다.</li>
									<li> 디지털 자산 명칭은 동일하나 전송 방식(네트워크)가 다른 경우에 입금 및 복구가 불가능합니다.</li>
									<li>48번의 Confirmation이 발생한 이후, 입금 프로세스를 거쳐 잔고에 반영되며, 네트워크 상황에 따라 소요 시간이 달라질 수 있습니다.</li>
								</ul>
							</div>

							<div class="wd-btn mt-4">
								<a href="#" class="btn btn-primary w-100">Withdraw</a>
							</div>
						</form>
					</div>
				</div>
			</section>
          </Modal.Body>
        </Modal>
      </>
    );
}
function Wallet_withdraw_modal() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <a href="#" variant="primary" className="mt-2 mr-1" onClick={handleShow}>
		Withdraw
        </a>
        
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Body>
			<section id="withdrawCrypto" className="p-3">
				<div class="row">
					<div class="col col-sm-12 col-md-12 main-bg">
						<h4>Withdraw Crypto</h4>
						<form>
							<div class="form-group row justify-content-between mb-0 py-2">
								<label class="col-sm-4 col-form-label">Select Coin</label>
								<div class="col-sm-10  col-md-6 select-coin-input">
									<select id="coin" class="form-control text-center">
										<option value="usdt">USDT</option>
										<option value="sdt">SDT</option>
									</select>
								</div>
							</div>

							<div class="form-group row justify-content-between mb-0 py-2">
								<label class="col-sm-2 col-form-label">Network</label>
								<div class="col-sm-10  col-md-6 network-input">
									<input type="text" class="form-control-plaintext text-md-right"  value="Ethreum ERC20"/>
								</div>
							</div>

							<div class="form-group row justify-content-between mb-0 py-2">
								<label for="inputPassword" class="col-sm-4 col-form-label">Withdraw Address</label>
								<div class="col-sm-10  col-md-7 address-input">
									<input type="text" class="form-control" value="0x7790a6DAe3174A60E171A25a040f913b5d6054d4" />
								</div>
							</div>

							<div class="form-group row justify-content-between mb-0 py-2">
								<label for="inputPassword" class="col-sm-4 col-form-label">Withdraw Amount</label>
								<div class="col-sm-10  col-md-6 amount-input">
									<div class="input-group">
										<input type="text" class="form-control"/>
										<div class="input-group-append">
											<span class="input-group-text" id="basic-addon2">1000 | <span class="pl-2">USDT</span></span>
										</div>
									</div>
									<p class="mb-0 text-right mt-2">사용 가능 : 1,000 USDT <span>전체</span></p>
								</div>
							</div>

							<div class="form-group row justify-content-between mb-0 py-2 wa-icon">
								<label class="col-sm-3 col-form-label postion-relative">Withdrawal <span></span> <span class="d-block">Available</span></label>
								<div class="col-sm-10  col-md-6 fee-input">
									<input type="text" class="form-control-plaintext text-md-right font-weight-bold"  value="999.000000 USDT"/>
								</div>
							</div>

							<hr class="form-hr-bottom" />

							<div class="form-group row justify-content-between mb-0 py-2">
								<label class="col-sm-2 col-form-label">Fee</label>
								<div class="col-sm-10  col-md-6 fee-input">
									<input type="text" class="form-control-plaintext text-md-right"  value="1 USDT"/>
								</div>
							</div>

							<div class="form-group row justify-content-between mb-0 py-2">
								<label class="col-sm-4 col-form-label">Receive Amount</label>
								<div class="col-sm-10  col-md-6 fee-input">
									<input type="text" class="form-control-plaintext text-md-right font-weight-bold"  value="999.000000 USDT"/>
								</div>
							</div>

							<div class="wd-info pt-5 col-9">
								<p><i class="fa fa-info-circle mr-2"></i>withdrawal information</p>
								<ul>
									<li>Minimum withdrawal amount: 2 USDT.</li>
									<li> The network fee is 1 USDT，which may be adjusted by network congestion.</li>
									<li>Internal withdrawal is real-time. Exceeding the free transfer amount will be charged at the same rate as regular withdrawals.</li>
								</ul>
							</div>

							<div class="wd-btn mt-4">
								<a href="#" class="btn btn-primary w-100">Withdraw</a>
							</div>

						</form>
					</div>
				</div>
			</section>
          </Modal.Body>
        </Modal>
      </>
    );
}

export const Wallet = () => {
    return (     
        <div className="Wallet"> 
            <section id="progress">
            <div class="container">
                <div class="row mx-0">
                    <div class="col-12 progress-top">
                        <dl>
                            <dt>My Wallet</dt>
                        </dl>
                        <dl>
                            <dt class="float-left progress-total">Total Balance:</dt>
                            <dd class="progress-income"><span class="pl-2">167.71 USD</span> ≈ $0.0003624 BTC</dd>
                        </dl>
                        <ul>
                            <li>자산은 코인마켓캡의 실시간 코인 가격을 통해 추정 가치로 변환되며 참조용으로만 사용됩니다.</li>
                            <li>실제 자산은 각 암호화폐의 보유 수량에 근거해야 합니다.</li>
                            <li>Assets are converted to estimated value through the real-time coin price of a coin market cap and are used for reference only.</li>
                            <li>Actual assets must be based on the amount of each cryptocurrency held.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="asset">
            <div class="container">
                <div class="row mx-0">
                	<div class="col-12 clearfix">
                		<h4>Asset</h4>
                		<ul>
                			<li class="on"><a href="#">Asset</a></li>
                			<li><a href="/wallet_th">History</a></li>
                		</ul>
                		<div class="table_container overflow-auto">
                			<table class="w-100">
                				<thead>
                					<tr>
                						<th>Coin</th>
                						<th>Available</th>
                						<th>In Order</th>
                						<th>USD Value</th>
                						<th>Action</th>
                					</tr>
                				</thead>
                				<tbody>
                					<tr class="bitcoin">
                						<td class="coin clearfix">
                							<img src={bnb_icon}/>
                							<dl class="mb-0">
                								<dt>Bitcoin</dt>
                								<dd class="mb-0">BTC</dd>
                							</dl>
                						</td>
                						<td class="available">0.67574356</td>
                						<td class="order">0.67574356</td>
                						<td class="value">＄27,170.5</td>
                						<td class="action">
											<a href="/wallet_deposit">Deposit</a>
                							<a href="/wallet_withdraw">Withdraw</a>
                							<a href="#">Trade</a>
                						</td>
                					</tr>
                					<tr class="ethereum">
                						<td class="coin clearfix">
                							<img src={eth_icon}/>
                							<dl class="mb-0">
                								<dt>Ethereum </dt>
                								<dd class="mb-0">ETH</dd>
                							</dl>
                						</td>
                						<td class="available">160,867.5</td>
                						<td class="order">160,867.5</td>
                						<td class="value">＄27,170.5</td>
                						<td class="action">
											<a href="/wallet_deposit">Deposit</a>
                							<a href="/wallet_withdraw">Withdraw</a>
                							<a href="#">Trade</a>
                						</td>
                					</tr>
                					<tr class="tether">
                						<td class="coin clearfix">
                							<img src={usdt_icon}/>
                							<dl class="mb-0">
                								<dt>Tether</dt>
                								<dd class="mb-0">USDT</dd>
                							</dl>
                						</td>
                						<td class="available">160,867.5</td>
                						<td class="order">160,867.5</td>
                						<td class="value">＄27,170.5</td>
                						<td class="action">
											<a href="/wallet_deposit">Deposit</a>
                							<a href="/wallet_withdraw">Withdraw</a>
                							<a href="#">Trade</a>
                						</td>
                					</tr>
                					<tr class="ripple">
                						<td class="coin clearfix">
                							<img src={xrp_icon}/>
                							<dl class="mb-0">
                								<dt>Ripple</dt>
                								<dd class="mb-0">XRP</dd>
                							</dl>
                						</td>
                						<td class="available">1.908675</td>
                						<td class="order">1.908675</td>
                						<td class="value">＄27,170.5</td>
                						<td class="action">
											<a href="/wallet_deposit">Deposit</a>
                							<a href="/wallet_withdraw">Withdraw</a>
                							<a href="#">Trade</a>
                						</td>
                					</tr>
                					<tr class="eos">
                						<td class="coin clearfix">
                							<img src={eos_icon}/>
                							<dl class="mb-0">
                								<dt>EOS</dt>
                								<dd class="mb-0">EOS</dd>
                							</dl>
                						</td>
                						<td class="available">200.000000</td>
                						<td class="order">200.000000</td>
                						<td class="value">＄27,170.5</td>
                						<td class="action">
											<a href="/wallet_deposit">Deposit</a>
                							<a href="/wallet_withdraw">Withdraw</a>
                							<a href="#">Trade</a>
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
