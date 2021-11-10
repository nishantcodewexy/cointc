import axios from 'axios';
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import logo_black from '../../app-assets/images/logo/logo-black.png';
import { LoginApi } from '../api';
import { Formik } from "formik";
import { useDispatch } from 'react-redux';


import _constants from "../../../../_constants";
import _services from "../../../../_services";

const { NOTICE, REQUEST, SESSION } = _constants;

export const Login = ({ history }) => {
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
                const errors = {};

                if (!values.email) {
                    errors.email = "Email is required";
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = "Invalid email address";
                }

                if (!values.password) {
                    errors.password = "Password is required";
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                const access_level = 1
                const { email, password } = values;

                const body = { email, password, access_level }
                setSubmitting(true);

                const data = await LoginApi("/api/auth/login", body)

                if (data) {
                    toast.success("Login successfully")
                    dispatch(log({ type: SESSION.LOGIN, data }));
                    history.push("/")
                } else {
                    toast.error("Invalid Login details")
                }

                // try {
                //     let request = async () =>
                //         await dispatchRequest({
                //             type: SERVICE?.LOGIN,
                //             payload: {
                //                 email,
                //                 password,
                //                 access_level: 3,
                //             },
                //             toast: { error: notifyError },
                //         });
                //     dispatch(userAction.login(request));
                // } catch (error) {
                //     console.error(error);
                // } finally {
                //     setSubmitting(false);
                // }
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <>
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
                                        <form id="signUp" onSubmit={handleSubmit}>
                                            <hr className="join-hr" />
                                            <div className="mb-4">
                                                <label className="form-label" for="coin-Username">Username</label>
                                                <input type="email" className="form-control" id="coin-Username" defaultValue="" placeholder="hello@example.com" name="email" onChange={handleChange}
                                                    onBlur={handleBlur} value={values.email} />
                                                <small className="text-danger">
                                                    {errors.email && touched.email && errors.email}
                                                </small>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label" for="coin-password">Password</label>
                                                <input className="form-control" id="coin-password" type="password" defaultValue="" placeholder="•••••" name="password" onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password} />
                                                <small className="text-danger">
                                                    {errors.password &&
                                                        touched.password &&
                                                        errors.password}
                                                </small>

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
                                                <button type="submit" disabled={isSubmitting} className="btn btn_signup d-block w-100">  {!isSubmitting ? "Login" : "Submitting..."}</button>

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

                </>
            )}
        </Formik>
    )
}

function notifyError(error) {
    toast.error(error || "Request Error!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}

function log({ type = NOTICE.INFO, data = null }) {
    return { type, data };
}