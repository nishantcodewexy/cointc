import React from 'react'
import './Ad_contract.css'
import { Form} from 'react-bootstrap';

export const Ad_contract = () => {
    return (     
        <div className="Ad_create"> 
            <section>
                <div class="container-fluid">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 mx-auto p-0 mt-5">
                            <div class="timeline-title">
                                <h5>Advertisement Create an ad</h5>
                            </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-12 d-flex justify-content-center my-5">
                            <ul class="timeline my-timeline">
                                <li>Set price and type</li>
                                <li>Set up your trading method</li>
                                <li class="active">Enter contract terms</li>
                            </ul>
                            </div>
                        </div>
                        <div class="row justify-content-center mb-5">
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
