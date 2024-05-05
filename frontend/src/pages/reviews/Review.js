import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Modal, Image } from 'react-bootstrap';

import ReviewEditForm from "./ReviewEditForm";

import styles from "../../styles/Review.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

import { MoreDropdown } from "../../components/MoreDropDown";

const Review = ({ review, setReviews }) => {

    const {
        id,
        profile_id,
        profile_image,
        user,
        updated_at,
        text,
        image,
        likes_count,
        dislikes_count,
        like_id: initialLikeId,
        is_like: initialIsLike

    } = review;

    const [likeState, setLikeState] = useState({
        likeId: initialLikeId,
        isLike: initialIsLike,
        likesCount: likes_count,
        dislikesCount: dislikes_count
    });
    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === user;

    const [showImageModal, setShowImageModal] = useState(false);

    const handleLikeToggle = async (newLikeState) => {
        if (likeState.isLike === newLikeState) {
            // Same state clicked, remove like/dislike
            await axiosRes.delete(`/likes/${likeState.likeId}/`);
            setLikeState(prev => ({
                ...prev,
                likeId: null,
                isLike: null,
                likesCount: newLikeState ? prev.likesCount - 1 : prev.likesCount,
                dislikesCount: newLikeState ? prev.dislikesCount : prev.dislikesCount - 1
            }));
        } else {
            if (likeState.likeId) {
                // Update existing like/dislike
                const { data } = await axiosRes.put(`/likes/${likeState.likeId}/`, { is_like: newLikeState });
                setLikeState(prev => ({
                    ...prev,
                    likeId: data.id,
                    isLike: newLikeState,
                    likesCount: newLikeState ? prev.likesCount + 1 - (prev.isLike ? 1 : 0) : prev.likesCount - 1,
                    dislikesCount: newLikeState ? prev.dislikesCount - 1 : prev.dislikesCount + 1 - (!prev.isLike ? 1 : 0)
                }));
            } else {
                // Create new like/dislike
                const { data } = await axiosRes.post("/likes/", { review: id, is_like: newLikeState });
                setLikeState(prev => ({
                    ...prev,
                    likeId: data.id,
                    isLike: newLikeState,
                    likesCount: newLikeState ? prev.likesCount + 1 : prev.likesCount,
                    dislikesCount: newLikeState ? prev.dislikesCount : prev.dislikesCount + 1
                }));
            }
        }
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/reviews/${id}/`);
            setReviews(prevReviews => ({
                ...prevReviews,
                results: prevReviews.results.filter(review => review.id !== id),
            }));

        } catch (err) {
            console.error("Error deleting the review:", err);
        }
    };

    const handleCloseImageModal = () => {
        setShowImageModal(false);
    };

    const handleImageClick = () => {
        setShowImageModal(true);
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
                    <small className={styles.Date}>{updated_at}</small>

                    {showEditForm ? (
                        <ReviewEditForm
                            id={id}
                            content={text}
                            setShowEditForm={setShowEditForm}
                            setReviews={setReviews}
                        />
                    ) : (

                        <p>
                            {image && (
                                <>
                                    <Image src={image} className={styles.ReviewImage} onClick={handleImageClick} thumbnail />
                                    <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Image Preview</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Image src={image} className={styles.ReviewImageModal} />
                                        </Modal.Body>
                                    </Modal>
                                </>
                            )}{text}</p>
                    )}
                    <div>
                        <i className={`fa-solid fa-thumbs-up fa-lg ${likeState.isLike ? "text-success" : ""}`} onClick={() => handleLikeToggle(true)}></i> {likeState.likesCount}
                        <i className={`fa-solid fa-thumbs-down fa-lg ${likeState.isLike === false ? "text-danger" : ""}`} onClick={() => handleLikeToggle(false)}></i> {likeState.dislikesCount}
                    </div>
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
