import React, { useState, useEffect } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/Ratings.module.css';

const RateRecipe = ({ recipeId, currentUser, initialRating }) => {
    const [rating, setRating] = useState(initialRating);

    // Ensure the rating state is updated when initialRating changes
    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);



    const handleRating = async (newScore) => {
        try {
            if (rating) {
                if (rating.score === newScore) {
                    // The user clicked the same score
                    console.log("Same score clicked, no action taken.");
                } else {
                    // Update the existing rating
                    await axiosRes.put(`/ratings/${rating.id}/`, {recipe: recipeId, score: newScore });
                    setRating({ ...rating, score: newScore });

                }
            } else {
                // Create a new rating
                const { data } = await axiosRes.post("/ratings/", { recipe: recipeId, score: newScore });
                setRating({ id: data.id, score: newScore });
            }
        } catch (err) {

            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
            console.log(err.config);
        }
    };

    const handleRemoveRating = async () => {
        if (rating) {
            try {
                await axiosRes.delete(`/ratings/${rating.id}/`);
                setRating(null);
            } catch (err) {
                console.error("Error removing rating", err);
            }
        }
    };

    return (
        <div className={styles.StarsContainer}>
            {[1, 2, 3, 4, 5].map((score, i) => (
                <span key={i} onClick={() => handleRating(score)}
                    className={`${styles.Stars} fa fa-star fa-xxl ${rating && rating.score >= score ? 'checked' : 'fa-regular'}`}>
                </span>
            ))}
            {rating && (
                <button onClick={handleRemoveRating} className="btn btn-danger ml-2">
                    Remove Rating
                </button>
            )}
        </div>
    );
};

export default RateRecipe;
