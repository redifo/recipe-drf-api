import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

import styles from "../../styles/RecipeGrid.module.css";
import axios from 'axios';
import RecipeCard from './RecipeCard';

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from '../../utils/utils';

function RecipeGrid() {
    const [recipes, setRecipes] = useState({ results: [], next: null });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();
    const [filters, setFilters] = useState({
        tags: [],
        
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await axios.get(`/recipes?search=${query}`);
                setRecipes({
                    results: data.results,
                    next: data.next
                });
                setHasLoaded(true);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                console.log(error.response.data);
                setHasLoaded(true);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchRecipes();
        }, 1000); // Delay fetching data until 1 second after typing stops

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleLoadMore = () => {
        if (recipes.next) {
            fetchMoreData(recipes.next, setRecipes);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col className={styles.FilterCol} lg={3}>
                    <p>Filters</p>
                    {/* filter components  */}
                </Col>
                <Col lg={9} className='mt-3'>
                    
                    <i className={`fas fa-search ${styles.SearchIcon}`} />
                    <Form
                        className={styles.SearchBar}
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <Form.Control
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            type="text"
                            className="mr-sm-2"
                            placeholder="Search Recipes by title, ingredients or tags"
                        />
                    </Form>
                    <Row className={styles.RecipeGrid}>

                        {recipes.results.map(recipe => (
                            <Col key={recipe.id}>
                                <RecipeCard recipe={recipe} />
                            </Col>
                        ))}
                    </Row>
                    {!hasLoaded && <p>Loading recipes...</p>}
                    {hasLoaded && recipes.length === 0 && <p>No recipes found.</p>}
                    {recipes.next && (
                        <Button className="my-3" onClick={handleLoadMore}>Load More</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default RecipeGrid;
