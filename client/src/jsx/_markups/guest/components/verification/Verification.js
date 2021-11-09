import React from 'react'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet,FormCheck } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';


export const Verification = () => {
    return (     
        <div className="content">
            <section id="mainTop">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="wow animate__animated fadeInDown" data-wow-delay="0.3s">Join</h3>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="join">
                <div className="container">
                    <div className="row" data-wow-delay="0.2s">
                        <div className="col-12 col-md-6 mx-auto join-row wow animate__animated fadeInDown">
                            <h4>Join the membership</h4>
                            <p className="mb-5">
                                A verification code has been sent to the email you entered.
                                Complete the membership registration through code verification.
                            </p>

                            <form id="signUp">
                                <hr className="join-hr" />
                                <div className="mb-4 mt-4">
                                    <label className="form-label" for="coin-email">E-mail</label>
                                    <input className="form-control" id="coin-email" type="email"/>
                                </div>

                                <div className="mb-4">
                                    <ul className="valid-time my-5">
                                        <li>Valid time</li>
                                        <li>03:00</li>
                                    </ul>
                                </div>

                                <div className="mb-3">
                                    <button className="btn btn_signup d-block w-100">Completion</button>
                                </div>

                                <div className="mb-4 text-center">
                                    <a className="login_link" href="#">Already have an account? go to log in</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
