import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

import ReviewEditForm from "./ReviewEditForm"; 

import styles from "../../styles/Review.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

import { MoreDropdown } from "../../components/MoreDropDown";

const Review = ({ review, setRecipe }) => {
  const {
    id,
    profile_id,
    profile_image,
    user,
    updated_at,
    text,
    likes_count,
    dislikes_count,
  } = review;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`);
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: prevRecipe.reviews.filter((rev) => rev.id !== id),
      }));
    } catch (err) {
      console.error("Error deleting the review:", err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <strong className={styles.Owner}>{user} </strong>
          <small className={styles.Date}> {updated_at}</small>
          
          {showEditForm ? (
            <ReviewEditForm
              id={id}
              content={text}
              setShowEditForm={setShowEditForm}
              setRecipe={setRecipe}
            />
          ) : (
            <p>{text}</p>
          )}
          <div><i className="fa-solid fa-thumbs-up fa-lg"></i> {likes_count} <i className="fa-solid fa-thumbs-down fa-lg"></i> {dislikes_count}</div>
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Review;
