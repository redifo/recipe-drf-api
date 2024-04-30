import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import styles from "../../styles/Recipe.module.css";
import axios from 'axios';
import RecipeCard from './RecipeCard';

function RecipeGrid() {
    const [recipes, setRecipes] = useState([]);
    

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await axios.get("/recipes");
                setRecipes(data.results || []);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
        fetchRecipes();
    }, []);

    const updateRecipes = (id, updatedData) => {
        setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) =>
                recipe.id === id ? { ...recipe, ...updatedData } : recipe
            )
        );
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

                    {recipes.map(recipe => (
                            <Col >
                                <RecipeCard recipe={recipe} updateRecipes={updateRecipes} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default RecipeGrid;
