import React from 'react'
import './Verification.css'
import { Container, Row, Col, Form, Button,Div,Dropdown,Tabs,Tab,Sonnet,FormCheck } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


import blockdaon_icon from '../../app-assets/images/icon/blockdaon.png';
import edit_icon from '../../app-assets/images/icon/edit.png';
import login_pass_icon from '../../app-assets/images/icon/login-pass.png';
import google_auth_icon from '../../app-assets/images/icon/google-auth.png';
import phone_icon from '../../app-assets/images/icon/phone.png';
import email_icon from '../../app-assets/images/icon/email.png';
import identity_verification_icon from '../../app-assets/images/icon/identity-verification.png';

export const Verification = () => {
    return (     
        <div className="Verification"> 
            <section class="py-60">
                <div class="container-fluid">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-6">
                                <div class="create-account-section py-15">
                                    <div class="col-md-8 mx-auto">
                                        <div class="create-account-title text-center">
                                        <h2>Join the membership</h2>
                                        <p>
                                            A verification code has been sent to the email you entered. Complete the membership registration through code verification.
                                        </p>
                                    </div>
                                    <hr class="hr-line-rgb"/>

                                    <form>
                                        <div class="form-group mt-5">
                                            <label for="email">E-mail</label>
                                            <input type="email" class="form-control" id="email"/>
                                        </div>

                                        <div class="form-group my-5 text-center">
                                            <label for="email">Valid time</label>
                                            <h4>03:00</h4>
                                        </div>

                                        <button type="submit" class="btn btn-primary w-100">Completion</button>
                                        <div class="already-account mt-3">
                                            <p class="text-center">Already have an account? go to log in</p>
                                        </div>
                                    </form>
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
