import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import styles from "../../styles/Recipe.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from 'axios';

function RecipePage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get("/recipes")
            .then(response => {
                setRecipes(response.data.results || []);
            })
            .catch(error => console.error("Error fetching recipes:", error));
    }, []);

    const renderRecipes = () => {
        return Array.isArray(recipes) && recipes.map(recipe => (
            <Card key={recipe.id} className={`m-1 ${styles.RecipeCard}`}>
                <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <div>
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`fa fa-star ${i < recipe.ratings_average ? '' : 'fa-regular '}`}></span>
                        ))}
                        <span> ({recipe.ratings_count})</span>
                    </div>
                    {/* content */}
                </Card.Body>
            </Card>
        ));
    };

    return (
        <Container fluid>
            <Row>
                <Col className={styles.FilterCol} lg={3}>
                    <p>Filters</p>
                    {/* filter components  */}
                </Col>
                <Col className={styles.RecipeCol} lg={9}>
                    <p>Recipes</p>
                    {renderRecipes()}
                    
                </Col>
            </Row>
        </Container>
    );
}

export default RecipePage;
