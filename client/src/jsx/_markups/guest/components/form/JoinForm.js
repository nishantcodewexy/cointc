import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const JoinForm = () => {
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
                                <p>
                                    Please make sure the address of the site you visited matches 
                                    the one below.
                                </p>

                                <form id="signUp">
                                    <hr class="join-hr" />
                                    <div class="mb-4">
                                        <label class="form-label" for="coin-email">E-mail</label>
                                        <input class="form-control" id="coin-email" type="email"/>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="coin-password">Password</label>
                                        <input class="form-control" id="coin-password" type="password" placeholder="•••••"/>
                                    </div>

                                    <div class="coin-password-required mb-3">
                                        <ul>
                                            <li> Including lowercase English (Confirm) </li>
                                            <li> English capital letters included </li>
                                            <li> with numbers </li>
                                            <li> 8 characters or more </li>
                                        </ul>
                                    </div>

                                    <div class="mb-4">
                                        <label class="form-label" for="coin-veri-password">Verify password</label>
                                        <input class="form-control" id="coin-veripassword" type="password" placeholder="•••••"/>
                                    </div>

                                    <div class="mb-4">
                                        <label class="form-label" for="coin-invitation-code">Invitation code (Optional)</label>
                                        <input class="form-control" id="coin-invitation" type="password" placeholder="•••••"/>
                                    </div>

                                    <div class="row justify-content-between mb-3">
                                        <div class="col-auto">
                                            <div class="form-check mb-0">
                                                <input class="form-check-input" type="checkbox" id="coin-checked"/>
                                                <label class="form-check-label mb-0 read--1" for="coin-checked">I have read and accepted the Terms of Service.</label>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <a class="ct--1" href="#">Corris Terms and Conditions</a>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <a class="btn btn_signup d-block w-100" href="/verification">Create an account</a>
                                    </div>

                                    <div class="mb-4 text-center">
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
