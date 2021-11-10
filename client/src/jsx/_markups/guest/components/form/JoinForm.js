import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from "formik";
import { useDispatch } from 'react-redux';

import _constants from "../../../../_constants";
import _services from "../../../../_services";

const { NOTICE, REQUEST, SESSION } = _constants;

export const JoinForm = () => {
    const dispatch = useDispatch()

    const history = useHistory()

    return (
        <Formik
            initialValues={{ email: "", password: "", repeat_password: "", invite_code: "" }}
            validate={(values) => {
                const errors = {};

                if (!values.email) {
                    errors.email = "Email is required";
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = "Invalid email address";
                }

                if (!values.repeat_password) {
                    errors.repeat_password = "verify password is required"
                }
                if (!values.password) {
                    errors.password = "Password is required";
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                const { email, password, repeat_password, invite_code } = values;
                const body = { email, password, repeat_password, invite_code }
                setSubmitting(true);

                try {
                    axios.post(`http://207.148.118.105/api/auth/register`, body, { headers: { "Content-Type": "application/json" } })
                        .then(function (response) {
                            toast.success(response.data.message);
                            dispatch(log({ type: SESSION.REGISTER, response }));
                            history.push('/')
                        })
                        .catch(function (error) {
                            toast.error(error.response.data.message)
                            dispatch(log({ type: NOTICE.ERROR, data: error.toString() }));
                            setSubmitting(false)

                        })
                } catch (e) {
                    console.log(e)
                }


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

                                        <form id="signUp" onSubmit={handleSubmit}>
                                            <hr className="join-hr" />
                                            <div className="mb-4">
                                                <label className="form-label" for="coin-email">E-mail</label>
                                                <input className="form-control" id="coin-email" type="email" name="email" onChange={handleChange}
                                                    onBlur={handleBlur} value={values.email} placeholder="hello@gmail.com" />
                                                <small className="text-danger">
                                                    {errors.email && touched.email && errors.email}
                                                </small>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label" for="coin-password">Password</label>
                                                <input className="form-control" id="coin-password" name="password" type="password" onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password} placeholder="•••••" />
                                                <small className="text-danger">
                                                    {errors.password &&
                                                        touched.password &&
                                                        errors.password}
                                                </small>
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
                                                <input className="form-control" id="coin-veripassword" name="repeat_password" type="password" onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.repeat_password} placeholder="•••••" />
                                                <small className="text-danger">
                                                    {errors.repeat_password &&
                                                        touched.repeat_password &&
                                                        errors.repeat_password}
                                                </small>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label" for="coin-invitation-code">Invitation code (Optional)</label>
                                                <input className="form-control" id="coin-invitation" type="password" name="invite_code" onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.invite_code} placeholder="•••••" />
                                            </div>

                                            <div className="row justify-content-between mb-3">
                                                <div className="col-auto">
                                                    <div className="form-check mb-0">
                                                        <input className="form-check-input" type="checkbox" id="coin-checked" />
                                                        <label className="form-check-label mb-0 read--1" for="coin-checked">I have read and accepted the Terms of Service.</label>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <a className="ct--1" href="#">Corris Terms and Conditions</a>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <button className="btn btn_signup d-block w-100" disabled={isSubmitting} > {!isSubmitting ? "Create an account" : "Submitting..."}</button>
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
                </>
            )}
        </Formik>
    )
}

function log({ type = NOTICE.INFO, data = null }) {
    return { type, data };
}