import React from 'react'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet,FormCheck } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';


export const Verification = () => {
    return (     
        <div class="content">
            <section id="mainTop">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h3 class="wow fadeInDown" data-wow-delay="0.3s">Join</h3>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="join">
                <div class="container">
                    <div class="row" data-wow-delay="0.2s">
                        <div class="col-12 col-md-6 mx-auto join-row wow fadeInDown">
                            <h4>Join the membership</h4>
                            <p class="mb-5">
                                A verification code has been sent to the email you entered.
                                Complete the membership registration through code verification.
                            </p>

                            <form id="signUp">
                                <hr class="join-hr" />
                                <div class="mb-4 mt-4">
                                    <label class="form-label" for="coin-email">E-mail</label>
                                    <input class="form-control" id="coin-email" type="email"/>
                                </div>

                                <div class="mb-4">
                                    <ul class="valid-time my-5">
                                        <li>Valid time</li>
                                        <li>03:00</li>
                                    </ul>
                                </div>

                                <div class="mb-3">
                                    <button class="btn btn_signup d-block w-100">Completion</button>
                                </div>

                                <div class="mb-4 text-center">
                                    <a class="login_link" href="#">Already have an account? go to log in</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
