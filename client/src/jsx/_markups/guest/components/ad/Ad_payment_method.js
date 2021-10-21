import React from 'react'
import './Ad_payment_method.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import refresh_icon from '../../app-assets/images/page/creat-ad/refresh.png';


export const Ad_payment_method = () => {
    return (     
        <div className="Ad_create"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-6 sell-buy py-4">
                                <div class="row align-items-center">
                                    <div class="col-md-6">
                                        <h5 class="mb-0">Payment method (up to 3)</h5>
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <a href="#" class="btn btn-outline-primary">+  Add Bank </a>
                                    </div>
                                </div>

                                <div class="row mt-4">
                                    <div class="col-md-12">
                                        <div  class="pm-details">
                                            <table>
                                                <tr>
                                                    <th>Bank price</th>
                                                    <th>hamsinseung</th>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>Add payment ham sinseung ham sinseung</td>
                                                </tr>
                                                <tr>
                                                    <td>Bank acount/card</td>
                                                    <td>1103253636748</td>
                                                </tr>

                                                <tr>
                                                    <td>Bank name</td>
                                                    <td>Shin Han</td>
                                                </tr>
                                            </table>

                                            <div class="text-right">
                                                <a href="#" class="btn btn-secondary">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-4">
                                    <div class="col-md-12">
                                        <div  class="pm-details">
                                            <table>
                                                <tr>
                                                    <th>wechat</th>
                                                    <th>Ham sinseung</th>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>Ham sinseung</td>
                                                </tr>
                                                <tr>
                                                    <td>Widget account</td>
                                                    <td>Blockdaon</td>
                                                </tr>
                                            </table>

                                            <div class="text-right">
                                                <a href="#" class="btn btn-secondary">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-4">
                                    <div class="col-md-12">
                                        <div  class="pm-details">
                                            <table>
                                                <tr>
                                                    <th>BankTransfer</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                    <label for="name">Name</label>
                                                    <input type="text" name="name"/>
                                                    </td>
                                                    <td>
                                                    <label for="account">Bank account number</label>
                                                    <input type="text" name="account"/>
                                                    </td>
                                                    <td>
                                                    <label for="bank">Bank name</label>
                                                    <input type="text" name="bank"/>
                                                    </td>
                                                </tr>
                                            </table>

                                            <div class="text-right">
                                                <a href="#" class="btn btn-outline-dark">Save</a>
                                            </div>
                                        </div>
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
                                                <Dropdown.Toggle variant="" id="dropdown-basic" >
                                                     15
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#">16</Dropdown.Item>
                                                    <Dropdown.Item href="#">17</Dropdown.Item>
                                                    <Dropdown.Item href="#">18</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-4">
                                    <div class="col-md-6">
                                        <div class="btn btn-ref font-weight-bold">
                                            <img src={refresh_icon} width="20" class="mr-2"/>Refresh
                                        </div>
                                    </div>
                                    <div class="col-md-6 d-flex justify-content-end">
                                        <a href="/ad_contract" class="btn btn-primary font-weight-bold">next stage</a>
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
