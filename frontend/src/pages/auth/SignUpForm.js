import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import pancakeImage from '../../assets/img/pancakes.webp';

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {

    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    })
    const { username, password1, password2 } = signUpData;

    return (
        <Row className={styles.Row}>

            <Col className="my-auto p-0" md={7}>
                <Container className={`${appStyles.Content} p-4`}>
                    <h1 className={`${styles.Header} pb-2 pt-2`}>Sign Up</h1>

                    <Form >
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username} />
                        </Form.Group>

                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Password"
                                name="password1"
                                value={password1} />
                        </Form.Group>
                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">Confirm Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2} />
                        </Form.Group>

                        <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Yellow} mt-3`} variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                    <Link className={`${styles.Link} pt-4`} to="/signin">
                        Already have an account? <span>Sign in</span>
                    </Link>
                </Container>

            </Col>
            <Col
                md={5}
                className={`my-auto d-none d-md-block p-0 ${styles.SignUpCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={
                        pancakeImage
                    }
                />
            </Col>
        </Row>
    );
};

export default SignUpForm;