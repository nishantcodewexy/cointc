import React from 'react'
import './Ad_payment_method.css'
import { Dropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom'

import refresh_icon from '../../app-assets/images/icon/refresh.png';

export const Ad_payment_method = () => {
    return (     
        <div class="content">
            <section id="mainTop">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h3 class="wow fadeInDown" data-wow-delay="0.3s">Create an AD</h3>
                        </div>
                    </div>
                </div>
            </section>            

            <section id="createAdsTop">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 mx-auto p-0">
                            <div class="timeline-title">
                            <h5>Advertisement Create an ad</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-12 d-flex justify-content-center my-5">
                            <ul class="timeline my-timeline">
                            <li class="">Set price and type</li>
                            <li class="active">Set up your trading method</li>
                            <li>Enter contract terms</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="createAds">
                <div class="container">
                    <div class="row justify-content-center wow fadeInUp" data-wow-delay="0.7s">
                        <div class="col-sm-12 col-md-6 craeat-main-box clear">
                            <h4>Payment method (up to 3)</h4>
                            <ul class="clear">
                                <li><a href="#">+ Add Bank</a></li>
                            </ul>
                            <div class="table_container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Bank price</th>
                                            <th>hamsinseung</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bitcoin">
                                            <td class="coin clear">Name</td>
                                            <td class="available">Add payment ham sinseung ham sinseung</td>
                                        </tr>
                                        <tr class="bitcoin">
                                            <td class="coin clear">Bank acount/card</td>
                                            <td class="available">1103253636748</td>
                                        </tr>
                                        <tr class="bitcoin">
                                            <td class="coin clear">Bank name</td>
                                            <td class="available">Shin Han</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td class="text-right">
                                                <a href="#" class="btn btn-delete">Delete</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="table_container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>wechat</th>
                                            <th>Ham sinseung</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bitcoin">
                                            <td class="coin clear">Name</td>
                                            <td class="available">Ham sinseung</td>
                                        </tr>
                                        <tr class="bitcoin">
                                            <td class="coin clear">Widget account</td>
                                            <td class="available">Blockdaon</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td class="text-right"><a href="#" class="btn btn-delete">Delete</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mt-5 banktransfer">
                                <h4>BankTransfer</h4>
                                <div class="row">
                                    <div class="col-sm-12 col-md-4">
                                        <form>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Name</label>
                                                <input type="text" class="form-control" id="name"/>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-sm-12 col-md-4">
                                        <form>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Bank account number</label>
                                                <input type="text" class="form-control" id="name"/>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-sm-12 col-md-4">
                                        <form>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Bank name</label>
                                                <input type="text" class="form-control" id="name"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="btnsave text-right">
                                    <a href="#" class="btn save-btn text-right">Save</a>
                                </div>
                            </div>

                            <hr class="hr-dash"/>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="pwt">
                                        <div class="pwt-title">
                                            <p>Payment waiting time</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                 15
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#"> 16</Dropdown.Item>
                                                <Dropdown.Item href="#"> 17</Dropdown.Item>
                                                <Dropdown.Item href="#"> 18</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <a class="btn btn-ref font-weight-bold"><img src={refresh_icon} width="20" class="mr-2"/>Refresh</a>
                                </div>
                                <div class="col-md-6 d-flex justify-content-end">
                                    <a href="/ad_contract" class="btn btn-primary font-weight-bold">next stage</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div> 
    )
}
