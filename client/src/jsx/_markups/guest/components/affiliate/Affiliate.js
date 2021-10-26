import React from 'react'
import styles from  './Affiliate.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import usdt_icon from '../../app-assets/images/icon/usdt.png';
import cont_icon from '../../app-assets/images/page/order/cont.png';


import copy_icon from '../../app-assets/images/icon/copy.png';
import edit_icon from '../../app-assets/images/icon/edit.png';
import banner_01_icon from '../../app-assets/images/page/affiliate/banner-01.png';
import affiliate_logo_icon from '../../app-assets/images/logo/affiliate-logo.png';
import data_blank_icon from '../../app-assets/images/page/affiliate/data-blank.png';


export const Affiliate = () => {
    return (     
        <div className="Affiliate"> 
            <section class="bg-sky">
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-5">
                                <div class="main-invite-element">
                                    <div class="invite-element-left px-3 py-4">
                                        <div class="invite-title">
                                            <h4 class="text-primary">Invite your friends <br/> and make a profit.</h4>
                                            <p><small>We will pay 20% of your friend’s trade transaction fee.</small></p>
                                        </div>

                                        <div class="main-default-referral px-3 py-2">
                                            <div class="default-header-top d-flex justify-content-between">
                                                <div class="default-header-left">
                                                    <p class="mb-0"><small>Default Referral ID</small></p>
                                                    <p>123456789 <sup><img src={copy_icon}/></sup></p>
                                                </div>
                                                <div class="default-header-right">
                                                    <a href="#">+Generate your link</a>
                                                </div>
                                            </div>
                                            <div class="default-body-top">
                                                <div class="default-link">
                                                    <p class="mb-0">Default Link</p>
                                                    <p><a href="#" class="text-black">https://...123456789</a></p>
                                                </div>
                                                <div class="note-info d-flex align-items-center">
                                                    <p class="pr-2 mb-0">Note</p>
                                                    <h4 class="font-weight-bold mb-0">ABC <img src={edit_icon}/></h4>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div class="default-footer d-flex justify-content-around">
                                                <div class="you-rec">
                                                    <p class="font-weight-bold text-secondary">You Receive</p>
                                                    <h4 class="font-weight-bold">0%</h4>
                                                </div>
                                                <div class="frd-rec">
                                                    <p class="font-weight-bold text-secondary">Friends Receive</p>
                                                    <h4 class="font-weight-bold">0%</h4>
                                                </div>
                                            </div>	
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="invite-element-right px-3 py-4">
                                    <div class="invite-banner">
                                        <img src={banner_01_icon} width="100%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                                <div class="dashboad-title">
                                    <h2><img src={affiliate_logo_icon} width="50"/>Dashboard</h2>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                           
                            <Tabs defaultActiveKey="account" id="uncontrolled-tab-example">
                                <Tab eventKey="account" title="All accounts">
                                    <div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-md-12">
                                            <Tabs defaultActiveKey="account-all-day-tab" id="uncontrolled-tab-example" className="mt-4" variant='pills'>   
                                                <Tab eventKey="account-all-day-tab"  title="All" tabClassName="tab-bn">
                                                    <div class="container tab-content-bg py-4 px-2 mt-4">
                                                        <div class="row justify-content-center">
                                                            <div class="col-md-10">
                                                                <div class="row mt-3">
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">You Earned</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>	
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="rank-lits d-flex align-items-center">
                                                                            <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                            <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                        </div>
                                                                        <div class="rank-content">
                                                                            <p class="text-black font-weight-bold">--</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="container mt-3">
                                                        <div class="tab-footer">
                                                            <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                            <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="account-yesterday-tab" title="Yesterday" tabClassName="tab-bn">
                                                    <div class="container tab-content-bg py-4 px-2 mt-4">
                                                        <div class="row justify-content-center">
                                                            <div class="col-md-10">
                                                                <div class="row mt-3">
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">You Earned</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>	
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="rank-lits d-flex align-items-center">
                                                                            <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                            <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                        </div>
                                                                        <div class="rank-content">
                                                                            <p class="text-black font-weight-bold">--</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="container mt-3">
                                                        <div class="tab-footer">
                                                            <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                            <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="account-this-week-tab" title="This Week" tabClassName="tab-bn">
                                                    <div class="container tab-content-bg py-4 px-2 mt-4">
                                                        <div class="row justify-content-center">
                                                            <div class="col-md-10">
                                                                <div class="row mt-3">
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">You Earned</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>	
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="rank-lits d-flex align-items-center">
                                                                            <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                            <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                        </div>
                                                                        <div class="rank-content">
                                                                            <p class="text-black font-weight-bold">--</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="container mt-3">
                                                        <div class="tab-footer">
                                                            <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                            <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="account-this-month-tab" title="This Month" tabClassName="tab-bn">
                                                    <div class="container tab-content-bg py-4 px-2 mt-4">
                                                        <div class="row justify-content-center">
                                                            <div class="col-md-10">
                                                                <div class="row mt-3">
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">You Earned</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="icome-tab">
                                                                            <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                            <h4 class="text-black">0</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>	
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="rank-lits d-flex align-items-center">
                                                                            <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                            <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                        </div>
                                                                        <div class="rank-content">
                                                                            <p class="text-black font-weight-bold">--</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="container mt-3">
                                                        <div class="tab-footer">
                                                            <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                            <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                        </div>
                                                    </div>
                                                </Tab>
                                            </Tabs>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="spot-tab" title="Spot">
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-md-12">
                                        <Tabs defaultActiveKey="spot-all-day-tab" id="uncontrolled-tab-example" className="mt-4" variant='pills'>  
                                            <Tab eventKey="spot-all-day-tab" title="All" tabClassName="tab-bn">
                                            <div class="container tab-content-bg py-4 px-2 mt-4">
                                                <div class="row justify-content-center">
                                                    <div class="col-md-10">
                                                        <div class="row mt-3">
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">You Earned</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="rank-lits d-flex align-items-center">
                                                                    <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                    <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                </div>
                                                                <div class="rank-content">
                                                                    <p class="text-black font-weight-bold">--</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container mt-3">
                                                <div class="tab-footer">
                                                    <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                    <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                </div>
                                            </div>
                                            </Tab>
                                            <Tab eventKey="spot-yesterday-tab" title="Yesterday" tabClassName="tab-bn">
                                            <div class="container tab-content-bg py-4 px-2 mt-4">
                                                <div class="row justify-content-center">
                                                    <div class="col-md-10">
                                                        <div class="row mt-3">
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">You Earned</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="rank-lits d-flex align-items-center">
                                                                    <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                    <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                </div>
                                                                <div class="rank-content">
                                                                    <p class="text-black font-weight-bold">--</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container mt-3">
                                                <div class="tab-footer">
                                                    <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                    <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                </div>
                                            </div>
                                            </Tab>
                                            <Tab eventKey="spot-this-week-tab" title="This Week" tabClassName="tab-bn">
                                            <div class="container tab-content-bg py-4 px-2 mt-4">
                                                <div class="row justify-content-center">
                                                    <div class="col-md-10">
                                                        <div class="row mt-3">
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">You Earned</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="rank-lits d-flex align-items-center">
                                                                    <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                    <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                </div>
                                                                <div class="rank-content">
                                                                    <p class="text-black font-weight-bold">--</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container mt-3">
                                                <div class="tab-footer">
                                                    <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                    <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                </div>
                                            </div>
                                            </Tab>
                                            <Tab eventKey="spot-this-month-tab" title="This Month" tabClassName="tab-bn">
                                            <div class="container tab-content-bg py-4 px-2 mt-4">
                                                <div class="row justify-content-center">
                                                    <div class="col-md-10">
                                                        <div class="row mt-3">
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">You Earned</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="icome-tab">
                                                                    <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                    <h4 class="text-black">0</h4>
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="rank-lits d-flex align-items-center">
                                                                    <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                    <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                </div>
                                                                <div class="rank-content">
                                                                    <p class="text-black font-weight-bold">--</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container mt-3">
                                                <div class="tab-footer">
                                                    <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                    <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                </div>
                                            </div>
                                            </Tab>
                                        </Tabs> 
                                            
                                        </div>
                                    </div>
                                </div>
                                
                                </Tab>
                                <Tab eventKey="futures-tab" title="Futures">
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-md-12">
                                            <Tabs defaultActiveKey="futures-all-day-tab" id="uncontrolled-tab-example" className="mt-4" variant='pills'>   
                                                <Tab eventKey="futures-all-day-tab"  title="All" tabClassName="tab-bn">
                                                <div class="container tab-content-bg py-4 px-2 mt-4">
                                                    <div class="row justify-content-center">
                                                        <div class="col-md-10">
                                                            <div class="row mt-3">
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">You Earned</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                            </div>	
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="rank-lits d-flex align-items-center">
                                                                        <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                        <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                    </div>
                                                                    <div class="rank-content">
                                                                        <p class="text-black font-weight-bold">--</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container mt-3">
                                                    <div class="tab-footer">
                                                        <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                        <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                    </div>
                                                </div>
                                                </Tab>
                                                <Tab eventKey="futures-yesterday-tab"  title="Yesterday" tabClassName="tab-bn">
                                                <div class="container tab-content-bg py-4 px-2 mt-4">
                                                    <div class="row justify-content-center">
                                                        <div class="col-md-10">
                                                            <div class="row mt-3">
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">You Earned</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                            </div>	
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="rank-lits d-flex align-items-center">
                                                                        <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                        <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                    </div>
                                                                    <div class="rank-content">
                                                                        <p class="text-black font-weight-bold">--</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container mt-3">
                                                    <div class="tab-footer">
                                                        <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                        <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                    </div>
                                                </div>
                                                </Tab>
                                                <Tab eventKey="futures-this-week-tab"  title="This Week" tabClassName="tab-bn">
                                                <div class="container tab-content-bg py-4 px-2 mt-4">
                                                    <div class="row justify-content-center">
                                                        <div class="col-md-10">
                                                            <div class="row mt-3">
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">You Earned</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                            </div>	
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="rank-lits d-flex align-items-center">
                                                                        <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                        <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                    </div>
                                                                    <div class="rank-content">
                                                                        <p class="text-black font-weight-bold">--</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container mt-3">
                                                    <div class="tab-footer">
                                                        <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                        <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                    </div>
                                                </div>
                                                </Tab>
                                                <Tab eventKey="futures-this-month-tab"  title="This Month" tabClassName="tab-bn">
                                                <div class="container tab-content-bg py-4 px-2 mt-4">
                                                    <div class="row justify-content-center">
                                                        <div class="col-md-10">
                                                            <div class="row mt-3">
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">You Earned</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                            </div>	
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="rank-lits d-flex align-items-center">
                                                                        <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                        <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                    </div>
                                                                    <div class="rank-content">
                                                                        <p class="text-black font-weight-bold">--</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container mt-3">
                                                    <div class="tab-footer">
                                                        <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                        <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                    </div>
                                                </div>
                                                </Tab>
                                            </Tabs>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                                </Tab>
                                <Tab eventKey="mining-tab" title="Mining">
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-md-12">
                                            <Tabs defaultActiveKey="minig-all-day-tab" id="uncontrolled-tab-example" className="mt-4" variant='pills'>   
                                                <Tab eventKey="minig-all-day-tab" title="All" tabClassName="tab-bn">
                                                <div class="container tab-content-bg py-4 px-2 mt-4">
                                                    <div class="row justify-content-center">
                                                        <div class="col-md-10">
                                                            <div class="row mt-3">
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">You Earned</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                            </div>	
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="rank-lits d-flex align-items-center">
                                                                        <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                        <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                    </div>
                                                                    <div class="rank-content">
                                                                        <p class="text-black font-weight-bold">--</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container mt-3">
                                                    <div class="tab-footer">
                                                        <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                        <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                    </div>
                                                </div>
                                                </Tab>
                                                <Tab eventKey="minig-yesterday-tab" title="Yesterday" tabClassName="tab-bn">
                                                <div class="container tab-content-bg py-4 px-2 mt-4">
                                                    <div class="row justify-content-center">
                                                        <div class="col-md-10">
                                                            <div class="row mt-3">
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">You Earned</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                            </div>	
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="rank-lits d-flex align-items-center">
                                                                        <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                        <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                    </div>
                                                                    <div class="rank-content">
                                                                        <p class="text-black font-weight-bold">--</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container mt-3">
                                                    <div class="tab-footer">
                                                        <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                        <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                    </div>
                                                </div>
                                                </Tab>
                                                <Tab eventKey="minig-this-week-tab" title="This Week" tabClassName="tab-bn">
                                                <div class="container tab-content-bg py-4 px-2 mt-4">
                                                    <div class="row justify-content-center">
                                                        <div class="col-md-10">
                                                            <div class="row mt-3">
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">You Earned</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                            </div>	
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="rank-lits d-flex align-items-center">
                                                                        <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                        <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                    </div>
                                                                    <div class="rank-content">
                                                                        <p class="text-black font-weight-bold">--</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container mt-3">
                                                    <div class="tab-footer">
                                                        <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                        <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                    </div>
                                                </div>
                                                </Tab>
                                                <Tab eventKey="minig-this-month-tab" title="This Month" tabClassName="tab-bn">
                                                <div class="container tab-content-bg py-4 px-2 mt-4">
                                                    <div class="row justify-content-center">
                                                        <div class="col-md-10">
                                                            <div class="row mt-3">
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">You Earned</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Number of Traded Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="icome-tab">
                                                                        <p class="font-weight-bold">Total Numbers of Friends</p>
                                                                        <h4 class="text-black">0</h4>
                                                                    </div>
                                                                </div>
                                                            </div>	
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="rank-lits d-flex align-items-center">
                                                                        <p class="text-black font-weight-bold mb-0 pr-2">Your Ranking</p>
                                                                        <a href="#" class="btn btn-rank-list font-weight-bold">Ranking List ></a>
                                                                    </div>
                                                                    <div class="rank-content">
                                                                        <p class="text-black font-weight-bold">--</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container mt-3">
                                                    <div class="tab-footer">
                                                        <p class="font-weight-bold mb-0">Lorem Ipsum is simply dummy text of the printing</p>
                                                        <p class="text-secondary">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                                    </div>
                                                </div>
                                                </Tab>
                                            </Tabs>                                            
                                        </div>
                                    </div>
                                </div>
                                </Tab>
                            </Tabs>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-60">
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                                <div class="dashboad-title d-flex align-items-center justify-content-between">
                                    <h2><img src={affiliate_logo_icon} width="40"/>Friends List</h2>
                                    <a href="#">View Chart</a>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                            <Tabs defaultActiveKey="fri-accout-tab">
                                <Tab eventKey="fri-accout-tab" title="All accounts">
                                <div class="container mt-4">
                                    <div class="row align-items-center">
                                        <div class="col-md-1"></div>
                                        <div class="col-md-8">
                                            <div class="fri-content">
                                                <p>All friends data as of 0:00 UTC today is displayed, and will be updated between 3:00-5:00 (UTC+0)today excluding Mining Pool, Please click the"Export" button to download detailed data.</p>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <a href="#">Export complete history</a>
                                        </div>
                                    </div>

                                    <div class="row justify-content-center">
                                        <div class="col-md-12">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Account Type</th>
                                                        <th scope="col">Friend’s User ID</th>
                                                        <th scope="col">Referral Bonus Earned (BTC)</th>
                                                        <th scope="col">Traded</th>
                                                        <th scope="col">Registration Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                            <div class="data-blank d-flex justify-content-center">
                                                <img src={data_blank_icon}/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                </Tab>
                                <Tab eventKey="fri-spot-tab" title="Spot">

                                </Tab>
                                <Tab eventKey="fri-futures-tab" title="Futures">

                                </Tab>
                                <Tab eventKey="fri-mining-tab" title="Mining">

                                </Tab>
                            </Tabs>                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-60">
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                                <div class="dashboad-title d-flex align-items-center justify-content-between">
                                    <h2><img src={affiliate_logo_icon} width="40"/>Commission History</h2>
                                    <a href="#">View Chart</a>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                            <Tabs defaultActiveKey="comm-accout-tab">
                                <Tab eventKey="comm-accout-tab" title="All accounts">
                                    <div class="container">
                                        <div class="row align-items-center justify-content-center py-3">
                                            <div class="col-md-12 ch-content py-3">
                                                <p class="mb-0">
                                                    Your referral commission will be credited to your walled balance within the next 72 hours. If you do not receive your commission within 72 hours. Please contact our online support center for futher assistance.
                                                </p>
                                            </div>
                                        </div>

                                        <div class="row justify-content-center">
                                            <div class="col-md-12">
                                                <table class="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Account Type</th>
                                                            <th scope="col">Friend’s User ID</th>
                                                            <th scope="col">Referral Bonus Earned (BTC)</th>
                                                            <th scope="col">Traded</th>
                                                            <th scope="col">Registration Time</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <div class="fri-content">
                                                            <p>
                                                                Show only the last 7 days of records(click the right-hand export button for all records
                                                            </p>
                                                        </div>
                                                    </div>
                                                <div class="col-md-3">
                                                    <a href="#">Export complete history</a>
                                                </div>
                                                </div>
                                                <div class="data-blank d-flex justify-content-center">
                                                    <img src={data_blank_icon}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="comm-spot-tab" title="Spot">

                                </Tab>
                                <Tab eventKey="comm-futures-tab" title="Futures">

                                </Tab>
                                <Tab eventKey="comm-mining-tab" title="Mining">

                                </Tab>
                            </Tabs>                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div> 
    )
}
export default Affiliate;