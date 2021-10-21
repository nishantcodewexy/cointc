import React from 'react'
import './Ad_contract.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import refresh_icon from '../../app-assets/images/page/creat-ad/refresh.png';


export const Ad_contract = () => {
    return (     
        <div className="Ad_create"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-6 sell-buy py-4">
                                <div class="row justify-content-center">
                                    <div class="col-md-10">
                                        <div class="info-title">
                                            <p>Contract conditions</p>
                                        </div>
                                        <div class="tearm-details">
                                            <p>
                                            Hello, if you send me a message or phone call after making a deposit using the payment information I registered, I will process the transaction completion. My contact number is 010-8749-8090. thank you.
                                            </p>
                                        </div>
                                        
                                        <hr class="hr-dash"/>

                                        <div class="col-12">
                                            <div class="label-verify">
                                                <label for="verify">Identity verified</label>
                                            </div>
                                            <div key={`inline-radio`} className="mb-3">
                                            <Form.Check inline label="ON" name="same" type="radio"  id={`inline-radio-1`}/>
                                            <Form.Check inline label="OFF" name="same" type="radio" checked id={`inline-radio-1`}/>
                                            </div>
                                        </div>

                                        <div class="col-12 d-flex justify-content-end">
                                            <a href="#" class="btn btn-primary">Submit</a>
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
