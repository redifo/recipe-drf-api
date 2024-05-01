import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm({ recipeId, setRecipe, setReviews, profileImage, profileId }) {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/reviews/", {
        text,
        recipe: recipeId,
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: [data, ...prevReviews.results],
      }));
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews_count: prevRecipe.reviews_count + 1,
      }));
      setText("");
    } catch (err) {
      console.error("Error creating review:", err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profileId}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="Write a review..."
            as="textarea"
            value={text}
            onChange={handleChange}
            rows={3}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!text.trim()}
        type="submit"
      >
        Post Review
      </button>
    </Form>
  );
}

export default ReviewCreateForm;
