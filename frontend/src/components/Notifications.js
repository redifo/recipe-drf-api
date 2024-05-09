import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';
import styles from '../styles/Notifications.module.css';
import { useCurrentUser } from "../contexts/CurrentUserContext";


const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const history = useHistory();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchNotifications = async () => {
            if (currentUser) {
                try {
                    const response = await axios.get(`/notifications/?recipient=${currentUser.profile_id}`);
                    setNotifications(response.data.results);
                } catch (err) {
                    console.error("Error fetching notifications:", err);
                }
            }
        };
        fetchNotifications();
    }, [currentUser]);

    
    const navigateToRecipe = (recipeId) => {
        history.push(`/recipes/${recipeId}`);
    };

    return (
        <div className={styles.NotificationsContainer}>
            <ListGroup>
                {notifications.map(notification => (
                    <ListGroup.Item key={notification.id} className={styles.NotificationItem}>
                        <div onClick={() => navigateToRecipe(notification.recipe.id)}>
                            <strong>{notification.sender_name}</strong> {notification.notification_type_display} on your recipe.
                        </div>
                        <div className={styles.ActionButtons}>
                            <Button variant="outline-primary" size="sm" onClick={() => (null)}>
                                Mark as Read
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => (null)}>
                                Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Notifications;
