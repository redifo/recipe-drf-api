import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from "../../styles/Recipe.module.css";
import { useParams, useHistory, Link } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { axiosRes } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import Avatar from '../../components/Avatar';

import Review from '../reviews/Review';
import ReviewCreateForm from '../reviews/ReviewCreateForm';

import RateRecipe from '../ratings/RateRecipe';

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { fetchMoreData } from "../../utils/utils";

function RecipePage() {
    const history = useHistory();
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    const [reviews, setReviews] = useState({ results: [], next: null });
    const [favoritesCount, setFavoritesCount] = useState(0);

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recipeRes, tagsRes, reviewsRes] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`),
                    axiosReq.get(`/tags`),
                    axiosReq.get(`/reviews/?recipe=${id}&page=1`)
                ]);
                setRecipe(recipeRes.data);
                setTags(tagsRes.data.results.filter(tag => recipeRes.data.tags.includes(tag.id)));
                setReviews({
                    results: reviewsRes.data.results,
                    next: reviewsRes.data.next
                });
                setIsFavorited(recipeRes.data.is_favorited);
                setFavoriteId(recipeRes.data.favorite_id);
                setFavoritesCount(recipeRes.data.favorites_count);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleFavorite = async (event) => {
        event.stopPropagation(); // Prevent the card click event
        try {
            if (isFavorited) {
                await axiosRes.delete(`/favorites/${favoriteId}/`);
                setIsFavorited(false);
                setFavoriteId(null);
                setFavoritesCount(favoritesCount - 1);

            } else {
                const { data } = await axiosRes.post("/favorites/", { recipe: id });
                setIsFavorited(true);
                setFavoriteId(data.id);
                setFavoritesCount(favoritesCount + 1);
            }
        } catch (err) {
            console.error("Error managing favorite", err);
        }
    };

    const handleLoadMoreReviews = () => {
        fetchMoreData(reviews.next, setReviews);
    };

    if (isLoading) {
        return <Asset spinner={true} message="Loading recipe details..." />;
    }

    return (
        <Container className='mt-4' fluid >
            <Row className={styles.RecipeSummary}>
                <Col xs={12} md={6} lg={5} xl={4} className={styles.RecipePageImageContainer}>
                    <img className={`${styles.RecipePageImage}`} src={recipe.image} alt={recipe.title} />
                </Col>
                <Col xs={12} md={6} lg={7} xl={8}>
                    <h2 className="ml-3 mt-3">{recipe.title}</h2>
                    <div className=" ml-2">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`${styles.Stars} fa fa-star fa-xl ${i < (recipe.ratings_average || 0) ? 'checked' : 'fa-regular'}`}></span>
                        ))}
                        <span className={styles.RatingCounter}>({recipe.ratings_count || 0})</span>
                        {recipe.is_owner && (
                            <Button variant="primary" className="ml-3" onClick={() => history.push(`/recipes/edit/${id}`)}>Edit Recipe</Button>
                        )}
                    </div>

                    <Row className="my-3">
                        <Col className="text-center"><strong >Preparation Time</strong><br></br><i className="fa-solid fa-clock fa-lg"></i>{recipe.preparation_time} minutes</Col>
                        <Col className="text-center"><strong>Cooking Time</strong><br></br><i className="fa-solid fa-clock fa-lg"></i>{recipe.cooking_time} minutes</Col>
                        <Col className="text-center"><strong>Servings</strong><br></br> <i className="fa-solid fa-bowl-food fa-lg"></i> {recipe.servings}</Col>
                    </Row>
                    <Row>
                        <Col className="text-center mt-4 mb-2">
                            Favorited by<br></br>
                            <strong>{favoritesCount}</strong> <br></br>
                            people
                        </Col>
                        <Col className="text-center">
                            <span>Recipe by:</span> <br></br>
                            <Link to={`/profiles/${recipe.profile_id}`}>
                                <Avatar src={recipe.profile_image} alt={`${recipe.user} avatar`} height={90} /> </Link>
                            <br></br> {recipe.user}
                        </Col>
                        <Col className="text-center mt-4 mb-2">
                            Add to favorites <br></br>
                            <Button className={`${styles.HeartButton} `} variant="link" onClick={(e) => handleFavorite(e)}>
                                <i className={`fa fa-heart  ${isFavorited ? 'text-danger' : 'text-secondary'}`}></i>
                            </Button>
                        </Col>
                    </Row>
                    <Row>


                    </Row>
                </Col>

            </Row>
            <Row className="mt-3">
                <Col lg={12} xxl={6}><h4 className={`${styles.Headings} p-1 mt-2`}>Description</h4> <p className='ml-2'> {recipe.description}</p></Col>
                <Col lg={12} xxl={6}><h4 className={`${styles.Headings} p-1 mt-2`}>Ingredients</h4> <p className='ml-2'>{recipe.ingredients}</p></Col>
                <Col lg={12} xxl={6}><h4 className={`${styles.Headings} p-1 mt-2`}>Instructions</h4> <p className='ml-2'>{recipe.instructions}</p> </Col>
                <Col lg={12} xxl={6}><h4 className={`${styles.Headings} p-1 mt-2`}>Recipe Tags</h4> <p className='ml-2'>{tags.map(tag => <span className={`${styles.TagsText} p-1 mr-2`} key={tag.id}>{tag.name} </span>)}</p></Col>

            </Row>

            <h4 className={`${styles.Headings} mt-3 ml-1`}> Rate this recipe</h4>
            {currentUser? (
                <RateRecipe
                    recipeId={id}
                    currentUser={currentUser}
                    initialRating={recipe.initial_rating}
                />

            ): <p className='ml-2 mb-0'>Login to rate recipes.</p>}
            <Row>

                <Col>
                    <h4 className={`${styles.Headings} ml-1 mt-4 mb-4`}>Reviews</h4>

                    {currentUser ? (
                        <ReviewCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            post={id}
                            setRecipe={setRecipe}
                            setReviews={setReviews}
                            recipeId={id}
                        />
                    ) : <p className='ml-2'>You need to be logged in to create reviews.</p>}

                    {reviews.results.length > 0 ? (
                        reviews.results.map(review => (
                            <Review key={review.id} review={review} setReviews={setReviews} />
                        ))
                    ) : (
                        <p className='ml-2'>No reviews yet!</p>
                    )}

                    {reviews.next && (
                        <Button onClick={handleLoadMoreReviews} className="text-center mt-4 mb-3">
                            Load More Reviews
                        </Button>
                    )}



                </Col>
            </Row>
        </Container>
    );
}

export default RecipePage;
