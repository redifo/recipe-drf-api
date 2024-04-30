import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "../../styles/Recipe.module.css";
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';

function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recipeRes, tagsRes] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`),
                    axiosReq.get(`/tags`)
                ]);
                setRecipe(recipeRes.data);
                setAllTags(tagsRes.data.results);
                setIsLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Filter tags specific to the recipe using the IDs
    useEffect(() => {
        if (recipe && allTags.length) {
            const matchedTags = allTags.filter(tag => recipe.tags.includes(tag.id));
            setTags(matchedTags);

        }
    }, [recipe, allTags]);

    if (isLoading) {
        return <Asset spinner={true} message="Loading recipe details..." />;
    }

    return (
        <Container fluid className='fluid'>
            <Row fluid className={styles.RecipeSummary}>
                <Col fluid xs={12} md={6} className={styles.RecipePageImage}>
                    <img src={recipe.image} alt={recipe.title} className="img-fluid" />
                </Col>
                <Col fluid xs={12} md={6} >
                    <h2 className="text-center">{recipe.title}</h2>
                    <div className="text-center">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`${styles.Stars} fa fa-star ${i < (recipe.ratings_average || 0) ? 'checked' : 'fa-regular'}`}></span>
                        ))}
                        ({recipe.ratings_count || 0})
                    </div>
                    <Row className="my-3">
                        <Col className="text-center"><strong >Preparation Time</strong><br></br><i className="fa-solid fa-clock fa-lg"></i>{recipe.preparation_time} minutes</Col>
                        <Col className="text-center"><strong>Cooking Time</strong><br></br><i className="fa-solid fa-clock fa-lg"></i>{recipe.cooking_time} minutes</Col>
                        <Col className="text-center"><strong>Servings</strong><br></br> <i className="fa-solid fa-bowl-food fa-lg"></i> {recipe.servings}</Col>
                    </Row>
                    <Row>
                        <Col >
                            Recipe by:
                        </Col>
                    </Row>

                </Col>

            </Row>
            <Row className="my-3">
                <Col md={12} lg={6}><h4 className={`${styles.Headings} p-1`}>Description</h4> {recipe.description}</Col>
                <Col md={12} lg={6}><h4 className={`${styles.Headings} p-1`}>Ingredients</h4> {recipe.ingredients}</Col>
                <Col md={12} lg={6}><h4 className={`${styles.Headings} p-1`}>Instructions</h4> {recipe.instructions}</Col>
                <Col md={12} lg={6}><h4 className={`${styles.Headings} p-1`}>Recipe Tags</h4> {tags.map(tag => <span className={`${styles.TagsText} p-1 mr-2`} key={tag.id}>{tag.name} </span>)}</Col>
            </Row>
            <Row>
                <Col>
                        
                </Col>
            </Row>
        </Container>
    );
}

export default RecipePage;
