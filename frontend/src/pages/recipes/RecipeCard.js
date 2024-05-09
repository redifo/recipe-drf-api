import React, { useState } from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import styles from "../../styles/Recipe.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function RecipeCard({ recipe }) {
    const { id, title, image, ratings_average, ratings_count, is_favorited: initialIsFavorited, favorite_id: initialFavoriteId } = recipe;
    const history = useHistory();
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const [favoriteId, setFavoriteId] = useState(initialFavoriteId);

    const currentUser = useCurrentUser();

    const handleFavorite = async (event) => {
        event.stopPropagation(); // Prevent the card click event
        try {
            if (isFavorited) {
                // If already favorited, unfavorite it
                await axiosRes.delete(`/favorites/${favoriteId}/`);
                setIsFavorited(false);
                setFavoriteId(null);
            } else {
                // If not favorited, favorite it
                const { data } = await axiosRes.post("/favorites/", { recipe: id });
                setIsFavorited(true);
                setFavoriteId(data.id);
            }

        } catch (err) {
            console.error("Error managing favorite", err);
        }
    };
    return (
        <Card key={id} className={`m-1 ${styles.RecipeCard}`} onClick={() => history.push(`/recipes/${recipe.id}`)}>
            <Card.Img variant="top" src={image} alt={title} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Row className={styles.CardBottom}>
                    <div>
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`${styles.Stars} fa fa-star ${i < ratings_average ? '' : 'fa-regular '}`}></span>
                        ))}
                        <span> ({ratings_count})</span>
                    </div>
                    <>
                        {currentUser ? <Button className={`${styles.HeartButton} `} variant="link" onClick={(e) => handleFavorite(e)}>
                            <i className={`fa fa-heart  ${isFavorited ? 'text-danger' : 'text-secondary'}`}></i>
                        </Button> : null}
                    </>

                </Row>

                {/* content */}
            </Card.Body>
        </Card>

    );
}

export default RecipeCard;
