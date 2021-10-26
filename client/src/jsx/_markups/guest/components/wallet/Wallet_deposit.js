import React from 'react'
// import './wallet-asset.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';

import qr_code_icon from '../../app-assets/images/page/wallet/qr-code.png';
import usdt_icon from '../../app-assets/images/icon/usdt.png';

export const Wallet_deposit = () => {
    return (     
        <div className="Wallet"> 
            <section id="withdrawCrypto">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col col-sm-12 col-md-8 main-bg">
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
                                    <div class="card">
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
                </div>
            </section>
        </div> 
    )
}
