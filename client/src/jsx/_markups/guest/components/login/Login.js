import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import logo_black from '../../app-assets/images/logo/logo-black.png';

export const Login = ({ history }) => {
    const submitHandler = (e) => {
        console.log(e);
        e.preventDefault();
        history.push("/");
    };

    return (
        <div className="content">
            <section id="mainTop">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="wow animate__animated fadeInDown" data-wow-delay="0.3s">Login</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section id="join">
                <div className="container">
                    <div className="row  wow fadeInUp" data-wow-delay="0.2s">
                        <div className="col-12 col-md-6 mx-auto join-row wow animate__animated fadeInDown">
                            <img src={logo_black} class="mx-auto w-50 d-flex" />
                            <div className="login_p">
                                <p>Please enter your login details</p>
                            </div>
                            <form id="signUp" onSubmit={(e) => submitHandler(e)}>
                                <hr className="join-hr" />
                                <div className="mb-4">
                                    <label className="form-label" for="coin-Username">Username</label>
                                    <input type="email" className="form-control" id="coin-Username" defaultValue="" placeholder="hello@example.com" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" for="coin-password">Password</label>
                                    <input className="form-control" id="coin-password" type="password" defaultValue="" placeholder="•••••" />
                                </div>

                                <div className="row justify-content-between mb-3">
                                    <div className="col-auto">
                                        <div className="form-check mb-0">
                                            <input className="form-check-input" type="checkbox" id="coin-checked" />
                                            <label className="form-check-label mb-0 rm--1" htmlFor="coin-checked">Remember</label>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <Link className="fp--1" to="/"> Forgot Password ? </Link>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className="btn btn_signup d-block w-100"> Sign Me In</button>
                                </div>

                                <div className="mb-4 text-center">
                                    <Link className="login_link" to="/signup"> Not registered yet? Create an Account</Link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
