import React from 'react'
import './joinform.scss'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

export const JoinForm = () => {
    return (
        <div className="py-60">
            <Container fluid>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6} md={6}>
                            <div class="create-account-section py-15">
                                <Col md={11} lg={11} className="mx-auto"> 
                                    <div className="create-account-title text-center">
                                        <h2>Join the membership</h2>
                                        <p>
                                            Please make sure the address of the site you visited matches the one below.
                                        </p>
                                    </div>
                                    <hr className="hr-line-rgb" />
                                    <Form>
                                        <Form.Group controlId="formBasicEmail" className="form-group">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="" />
                                            {/* <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text> */}
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="●●●●●●●" />
                                            <div class="verify-pass mt-3">
                                                <p class="mb-0">- Including lowercase English (Confirm)</p>
                                                <p class="mb-0">- English capital letters included</p>
                                                <p class="mb-0">- with numbers</p>
                                                <p class="mb-0">- 8 characters or more</p>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="verify-password">
                                            <Form.Label>Verify Password</Form.Label>
                                            <Form.Control type="password" id="verify-password" placeholder="●●●●●●●" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="initation-code">
                                            <Form.Label>Invitation code (Optional)</Form.Label>
                                            <Form.Control type="password" placeholder="●●●●●●●" />
                                        </Form.Group>
                                        <div class="detail-confirm">
                                            <div class="form-group form-check d-flex justify-content-between">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox"/>I have read and accepted the Terms of Service.
                                                </label>
                                                <a href="#" class="text-right">Corris Terms and Conditions</a>
                                            </div>
                                        </div>

                                        <a href="/verification" className="w-100 btn btn-primary" type="submit">
                                            Create an account
                                        </a>
                                        <div className="already-account mt-3">
                                            <p className="text-center">Already have an account? go to log in</p>
                                        </div>
                                    </Form>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    )
}
