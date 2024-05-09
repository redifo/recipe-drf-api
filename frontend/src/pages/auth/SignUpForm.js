import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import pancakeImage from '../../assets/img/pancakes.webp';

import { Form, Button, Image, Col, Row, Alert } from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
    useRedirect('loggedout')

    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    })
    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData)
            history.push('/signin')

        } catch (err) {
            setErrors(err.response?.data);
        }
    };
    return (
        <div className={styles.Wrapper}>
            <Row className={styles.Row}>

                <Col className="my-auto p-0 text-center" md={8}>
                    
                        <h1 className={`${styles.Header} pb-2 pt-2`}>Sign Up</h1>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className={styles.FormGroup} controlId="username">
                                <Form.Label className="d-none">Username</Form.Label>
                                <Form.Control
                                    className={styles.Input}
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.username?.map((message, idx) =>
                                <Alert className={styles.Alert} variant="warning" key={idx}>{message}</Alert>
                            )}

                            <Form.Group className={styles.FormGroup} controlId="password1">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control
                                    className={styles.Input}
                                    type="password"
                                    placeholder="Password"
                                    name="password1"
                                    value={password1}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.password1?.map((message, idx) =>
                                <Alert className={styles.Alert} variant="warning" key={idx}>{message}</Alert>
                            )}
                            <Form.Group className={styles.FormGroup} controlId="password2">
                                <Form.Label className="d-none">Confirm Password</Form.Label>
                                <Form.Control
                                    className={styles.Input}
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={password2}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.password2?.map((message, idx) =>
                                <Alert className={styles.Alert} variant="warning" key={idx}>{message}</Alert>
                            )}
                            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Yellow} mt-4 mb-2`} type="submit">
                                Sign Up
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert className={styles.Alert} variant="warning" key={idx}>{message}</Alert>
                            ))}
                        </Form>
                        <Link className={`${styles.Link} mt-4 mb-1`} to="/signin">
                            Already have an account? <span>Sign in</span>
                        </Link>
                    

                </Col>
                <Col
                    md={4}
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
        </div>
    );
};

export default SignUpForm;