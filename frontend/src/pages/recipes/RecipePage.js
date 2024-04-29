import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import styles from "../../styles/Recipe.module.css";
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";

import Recipe from './Recipe';
import { axiosReq } from '../../api/axiosDefaults';

function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = React.useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: recipe }] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`),
                   
                ]);
                setRecipe({ results: [recipe] });
                
                console.log(recipe)
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Container>
            <Row className={styles.RecipeSummary}>
                <Col className={styles.RecipeSummary} md="12">

                    <Col md="4" className="text-center">
                        <h2>CHICKEN PASTA</h2>

                        <span> (164)</span>
                    </Col>
                    <Col md="8" className="text-center">
                        <img></img>
                    </Col>

                    <Row className="my-3">
                        <Col size="4" className="text-center">
                            <span>Preparation Time</span><br></br>
                        </Col>
                        <Col size="4" className="text-center">
                            <span>Cooking Time</span><br></br>
                        </Col>
                        <Col size="4" className="text-center">
                            <span>Servings</span><br></br>
                        </Col>
                    </Row>
                    
                    <Row className="my-3">
                        <Col md="12">
                            <h4>INGREDIENTS</h4>
                            {/* ingredients  */}
                        </Col>
                        <Col md="12">
                            <h4>DESCRIPTION</h4>
                            {/* DESC */}
                        </Col>
                        <Col md="12">
                            <h4>INSTRUCTIONS</h4>
                            {/* procedure */}
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md="12">
                            <h4>RECIPE TAGS</h4>
                            {/* Tags here */}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default RecipePage;
