import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import styles from "../../styles/RecipeGrid.module.css";
import axios from 'axios';
import RecipeCard from './RecipeCard';

import { fetchMoreData } from '../../utils/utils';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function RecipeGrid() {
    const queryParam = useQuery().get('search') || "";
    const [recipes, setRecipes] = useState({ results: [], next: null });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [query, setQuery] = useState(queryParam);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        // Fetch the tags from the backend
        const fetchTags = async () => {
            try {
                const { data } = await axios.get(`/tags`);
                setTags(data.results);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, []);

    useEffect(() => {
        const fetchRecipes = async () => {
            let tagsFilter = selectedTags.join(',');
            try {
                const { data } = await axios.get(`/recipes?search=${query}&tags=${tagsFilter}`);
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
        }, 500); // Delay fetching data 0.5 second after typing stops

        return () => clearTimeout(delayDebounce);
    }, [query, selectedTags]);

    const handleLoadMore = () => {
        if (recipes.next) {
            fetchMoreData(recipes.next, setRecipes);
        }
    };

    const handleTagChange = (tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    return (
        <Container fluid>
            <Row>
                <Col className={styles.FilterCol} lg={3}>
                    <h2>Filters</h2>
                    <p className='mb-0 '> <u>Filter by Tag</u></p>
                    {tags.map(tag => (
                        <Form.Check
                            key={tag.id}
                            type="checkbox"
                            label={tag.name}
                            checked={selectedTags.includes(tag.id)}
                            onChange={() => handleTagChange(tag.id)}
                        />
                    ))}
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
                    <Row className={styles.LoadMoreBtnRow}>
                        {recipes.next && (
                            <Button className="my-3" onClick={handleLoadMore}>Load More</Button>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default RecipeGrid;
