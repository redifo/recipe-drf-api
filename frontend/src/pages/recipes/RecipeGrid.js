import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from "../../styles/Recipe.module.css";
import axios from 'axios';

function RecipeGrid() {
    const [recipes, setRecipes] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get("/recipes")
            .then(response => {
                setRecipes(response.data.results || []);
            })
            .catch(error => console.error("Error fetching recipes:", error));
    }, []);

    const renderRecipes = () => {
        return Array.isArray(recipes) && recipes.map(recipe => (
            <Col key={recipe.id} className="mb-3">
                <Card key={recipe.id} className={`m-1 ${styles.RecipeCard}`} onClick={() => history.push(`/recipes/${recipe.id}`)}>
                    <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                    <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <div>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`${styles.Stars} fa fa-star ${i < recipe.ratings_average ? '' : 'fa-regular '}`}></span>
                            ))}
                            <span> ({recipe.ratings_count})</span>
                        </div>
                        {/* content */}
                    </Card.Body>
                </Card>
            </Col >
        ));
    };

    return (
        <Container fluid>
            <Row>
                <Col className={styles.FilterCol} lg={3}>
                    <p>Filters</p>
                    {/* filter components  */}
                </Col>
                <Col lg={9} >
                    <header className='text-center'>Recipes</header>
                    <Row className={styles.RecipeGrid}>

                        {renderRecipes()}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default RecipeGrid;
