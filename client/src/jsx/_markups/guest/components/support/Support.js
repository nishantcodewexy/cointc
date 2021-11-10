import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet,ToggleButton,ToggleButtonGroup } from 'react-bootstrap';
// import "./support.css";

import icon_password from '../../app-assets/images/icon/icon_password.png';
import icon_recommended from '../../app-assets/images/icon/icon_recommended.png';
import icon_phone from '../../app-assets/images/icon/icon_phone.png';
import icon_email from '../../app-assets/images/icon/icon_email.png';
import icon_verification from '../../app-assets/images/icon/icon_verification.png';

function ToggleButtonGroupControlled() {
    const [value, setValue] = useState([1, 3]);
  
    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => setValue(val);
  
    return (
      <ToggleButtonGroup type="switch" value={value} onChange={handleChange}>
        <ToggleButton id="tbg-btn-1" value={1}>
          Option 1
        </ToggleButton>
        <ToggleButton id="tbg-btn-2" value={2}>
          Option 2
        </ToggleButton>
        <ToggleButton id="tbg-btn-3" value={3}>
          Option 3
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }
  
//   render(<ToggleButtonGroupControlled />);
export const Support = () => {
    return (
        <div className="content">
            <div className="support-banner" id="support">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col col-sm-12 col-md-6">
                            <div className="support-search-input">
                                <label for="searchInput" className="d-flex justify-content-center font-weight-bold"><h4>궁금한 내용을 검색해보세요.</h4></label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="검색" aria-label="검색" aria-describedby="basic-addon1"/>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-5">
                <div className="container-fluid">
                    <div className="container">
                        <div className="customer-center">
                            <h5 className="customer-center-title font-weight-bold mb-5">온라인 고객센터 안내사항</h5>
                            <p className="customer-center-content font-weight-bold mb-0">[안내] Coin TC, 알고란 채널과 함께 ‘Coin TC의 거의 모든 것’ 영상 공개</p>
                            <hr className="mt-0 mb-4"/>
                            <p className="customer-center-content font-weight-bold mb-0">[안내]비기너를 위한 'Coin TC 앱 사용설명서' 영상 공개</p>
                            <hr className="m-0"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container-fluid">
                    <div className="container">
                        <div className="user-guide">
                            <div className="user-guide-title mb-3">
                                <h5 className="font-weight-bold">이용자 가이드</h5>
                            </div>
                            <div className="row py-3">
                                <div className="col col-sm-12 col-md-4 my-text">
                                    <h5 className="text-left font-weight-bold">이용 안내</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 거래 이용 안내</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> [상담] 1:1문의 및 카카오톡 상담 방법</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col col-sm-12 col-md-4 my-text">
                                    <h5 className="text-left font-weight-bold">인증 절차</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 보안등급 레벨 3 상향 방법 (PC)</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 보안등급 레벨 3 상향 방법 (모바일)</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 보안등급 레벨 4 상향 방법</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col col-sm-12 col-md-4 my-text">
                                    <h5 className="text-left font-weight-bold">입출금</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 원화 입출금 방법 (모바일)</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 원화 입출금 방법 (PC)</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 입출금 계좌 초기화 방법 (모바일)</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col col-sm-12 col-md-4 mt-5 my-text">
                                    <h5 className="text-left font-weight-bold">이용 안내</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 거래 이용 안내</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> [상담] 1:1문의 및 카카오톡 상담 방법</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container-fluid">
                    <div className="container">
                        <div className="user-guide">
                            <div className="user-guide-title mb-3">
                                <h5 className="font-weight-bold"> 자주하는 질문 </h5>
                            </div>
                            <div className="row py-3">
                                <div className="col col-sm-12 col-md-4 my-text">
                                    <h5 className="text-left font-weight-bold"> 계정 </h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> Coin TC 계정을 복구하고 싶어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 로그인이 안됩니다. / 로그인 인증번호가 오지 않아요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 휴대전화 번호가 변경되었어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기 </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col col-sm-12 col-md-4 my-text">
                                    <h5 className="text-left font-weight-bold">가입 / 보안등급 / 탈퇴</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 본인 명의 휴대전화와 계좌가 없어도 되나요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 법인 명의 전화로 이용 가능한가요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 보안등급 상향은 어떻게 하나요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기 </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col col-sm-12 col-md-4 my-text">
                                    <h5 className="text-left font-weight-bold">거래 / 자산</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 갑자기 USDT가 생겼어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 원화 마켓, BTC 마켓, USDT 마켓이 어떻게 다른가요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 자산을 보유하고 있으나 매수 또는 매도 주문이 안돼요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기 </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col col-sm-12 col-md-4 mt-5 my-text">
                                    <h5 className="text-left font-weight-bold"> 원화 입금 / 출금 </h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 원화 출금 실패했어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 원화 입금 실패했어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> Coin TC 계정으로 원화 입금은 어떻게 하나요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기 </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col col-sm-12 col-md-4 mt-5 my-text">
                                    <h5 className="text-left font-weight-bold"> 디지털 자산 입금 / 출금 </h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 2차 주소가 무엇인가요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 디지털 자산 출금 방법을 알려 주세요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 디지털 자산별 입출금 가능 여부는 어떻게 확인하나요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기 </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col col-sm-12 col-md-4 mt-5 my-text">
                                    <h5 className="text-left font-weight-bold">디지털 자산 오입금</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 타 거래소로 잘못 출금했는데 반환되었어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 디지털 자산 주소를 잘못 입력했어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 이전에 입금했던 주소로 입금했는데 현재 발급된 입금 주소와 달라요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기 </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col col-sm-12 col-md-4 mt-5 my-text">
                                    <h5 className="text-left font-weight-bold">카카오페이</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 카카오페이 인증을 사용하고 싶어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 카카오페이 인증까지 완료했는데 왜 출금이 안되나요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 카카오페이 인증 메시지 수신이 안돼요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기 </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col col-sm-12 col-md-4 mt-5 my-text">
                                    <h5 className="text-left font-weight-bold">디지털 자산 관련 용어</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> NFT가 무엇인가요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> TXID가 무엇인가요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 거래소 용어를 잘 모르겠어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기 </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col col-sm-12 col-md-4 mt-5 my-text">
                                    <h5 className="text-left font-weight-bold">기타 문의</h5>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> Open API를 사용하고 싶어요. </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> API란 무엇인가요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> 로그인을 유지할 수 있는 기능이 있나요? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center text-black" href="#"> + 더보기 </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
