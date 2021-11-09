import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const JoinForm = () => {
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
                                <p>
                                    Please make sure the address of the site you visited matches 
                                    the one below.
                                </p>

                                <form id="signUp">
                                    <hr className="join-hr" />
                                    <div className="mb-4">
                                        <label className="form-label" for="coin-email">E-mail</label>
                                        <input className="form-control" id="coin-email" type="email"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" for="coin-password">Password</label>
                                        <input className="form-control" id="coin-password" type="password" placeholder="•••••"/>
                                    </div>

                                    <div className="coin-password-required mb-3">
                                        <ul>
                                            <li> Including lowercase English (Confirm) </li>
                                            <li> English capital letters included </li>
                                            <li> with numbers </li>
                                            <li> 8 characters or more </li>
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label" for="coin-veri-password">Verify password</label>
                                        <input className="form-control" id="coin-veripassword" type="password" placeholder="•••••"/>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label" for="coin-invitation-code">Invitation code (Optional)</label>
                                        <input className="form-control" id="coin-invitation" type="password" placeholder="•••••"/>
                                    </div>

                                    <div className="row justify-content-between mb-3">
                                        <div className="col-auto">
                                            <div className="form-check mb-0">
                                                <input className="form-check-input" type="checkbox" id="coin-checked"/>
                                                <label className="form-check-label mb-0 read--1" for="coin-checked">I have read and accepted the Terms of Service.</label>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <a className="ct--1" href="#">Corris Terms and Conditions</a>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <a className="btn btn_signup d-block w-100" href="/verification">Create an account</a>
                                    </div>

                                    <div className="mb-4 text-center">
                                        <Link className="login_link" to="/login"> Already have an account? go to log in </Link>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
    )
}
