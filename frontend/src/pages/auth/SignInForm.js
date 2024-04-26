import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import pancakeImage from '../../assets/img/pancakes.webp';

import { Form, Button, Image, Col, Row, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser();

    const [SignInData, setSignInData] = useState({
        username: '',
        password: '',

    })
    const { username, password, } = SignInData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...SignInData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post('/api/dj-rest-auth/login/', SignInData)
            setCurrentUser(data.user)
            history.push('/')

        } catch (err) {
            setErrors(err.response?.data)
        }
    };
    return (
        <div className={styles.Wrapper}>
            <Row className={styles.Row}>

                <Col className="my-auto p-0 text-center" md={8}>
                    
                        <h1 className={`${styles.Header} pb-2 pt-2`}>Sign In</h1>

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

                            <Form.Group controlId="password">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control
                                    className={styles.Input}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.password?.map((message, idx) =>
                                <Alert className={styles.Alert} variant="warning" key={idx}>{message}</Alert>
                            )}
                            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Yellow} mt-2 mb-2`} type="submit">
                                Sign In
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert className={styles.Alert} variant="warning" key={idx}>{message}</Alert>
                            ))}
                        </Form>
                        <Link className={`${styles.Link} mt-4 mb-1`} to="/signup">
                            Don't have an account? <span>Sign Up</span>
                        </Link>
                    

                </Col>
                <Col
                    md={4}
                    className={`my-auto d-none d-md-block p-0 ${styles.SignInCol}`}
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

export default SignInForm;