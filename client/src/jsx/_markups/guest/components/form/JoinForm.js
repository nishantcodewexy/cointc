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
                                <Col md={8} lg={8} className="mx-auto"> 
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
                                            <Form.Control type="email" placeholder="Enter email" />
                                            {/* <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text> */}
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="verify-password">
                                            <Form.Label>Verify Password</Form.Label>
                                            <Form.Control type="password" id="verify-password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="initation-code">
                                            <Form.Label>Invitation code (Optional)</Form.Label>
                                            <Form.Control type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Row>
                                            <Col lg={6} md={6}>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                    <input className="form-check-input" type="checkbox" /> I have read and accepted the Terms of Service
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6}>
                                                <div className="terms-condition">
                                                    <a href="#">Corris Terms and Conditions</a>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Button variant="primary" className="w-100" type="submit">
                                            Create an account
                                        </Button>
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
