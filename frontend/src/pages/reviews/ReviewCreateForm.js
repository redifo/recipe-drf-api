import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/ReviewCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { showError, showSuccess } from "../../utils/ToastManager";

function ReviewCreateForm({ recipeId, setRecipe, setReviews, profileImage, profileId }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("recipe", recipeId);
    if (image) {
      formData.append("image", image);
    }

    try {
      const { data } = await axiosRes.post("/reviews/", formData);
      // Set default values for likes and dislikes count
      const reviewWithDefaults = {
        ...data,
        likes_count: 0,
        dislikes_count: 0
      };

      setReviews(prevReviews => ({
        ...prevReviews,
        results: [reviewWithDefaults, ...prevReviews.results]
      }));
      setRecipe(prevRecipe => ({
        ...prevRecipe,
        reviews_count: prevRecipe.reviews_count + 1
      }));
      setText("");
      setImage(null);
      setPreview(null);
      showSuccess("Review posted successfully")

    } catch (err) {
      showError("Error creating review:", err.message);
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
      <Form.Group className="ml-5">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Preview" className={styles.ImagePreview} />
          </div>
        )}
        <button
          className={`${styles.Button} btn d-block ml-auto`}
          disabled={!text.trim()}
          type="submit"
        >
          Post Review
        </button>
      </Form.Group>

    </Form>
  );
}

export default ReviewCreateForm;
