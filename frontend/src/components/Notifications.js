import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';
import styles from '../styles/Notifications.module.css';
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { axiosRes } from "../api/axiosDefaults";
import { showSuccess, showError } from '../utils/ToastManager';
import Asset from './Asset';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const history = useHistory();
    const currentUser = useCurrentUser();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (currentUser) {
                try {
                    const response = await axiosRes.get(`/notifications/?recipient=${currentUser.profile_id}`);
                    setNotifications(response.data.results);
                    setHasLoaded(true);
                } catch (err) {
                    showError("Error fetching notifications:", err);
                    setHasLoaded(true);
                }
            }
        };
        fetchNotifications();
    }, [currentUser]);

    const markAsRead = async (notificationId) => {
        try {
            await axiosRes.patch(`/notifications/${notificationId}/`, { is_read: true });
            setNotifications(notifications.map(notif =>
                notif.id === notificationId ? { ...notif, is_read: true } : notif
            ));
            showSuccess("Succesfully marked as read")
        } catch (err) {
            showError("Failed to mark notification as read:", err);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await axios.delete(`/notifications/${notificationId}/`);
            setNotifications(notifications.filter(notif => notif.id !== notificationId));
            showSuccess("Deleted notification successfully")
        } catch (err) {
            showError("Failed to delete notification:", err);
        }
    };

    const navigateToRecipe = (recipeId) => {
        history.push(`/recipes/${recipeId}`);
    };

    return (
        <div className={styles.NotificationsContainer}>
            <ListGroup>
                {hasLoaded ? (
                    
                        notifications.length > 0 ? (
                            notifications.map(notification => (
                                <ListGroup.Item key={notification.id} className={styles.NotificationItem}>
                                    <div className={styles.NotificationItemDiv} onClick={() => navigateToRecipe(notification.recipe)}>
                                        <strong>{notification.sender_name}</strong> {notification.notification_type_display} on your recipe.
                                    </div>
                                    <div className={styles.ActionButtons}>
                                        <Button variant="outline-primary" size="xs" onClick={() => markAsRead(notification.id)}>
                                            Mark as Read
                                        </Button>
                                        <Button variant="outline-danger" size="xs" onClick={() => deleteNotification(notification.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item className={styles.NoNotifications}>
                                No notifications right now.
                            </ListGroup.Item>
                        )
                    
                ) : (
                    <Asset spinner message="Loading latest recipes..." />
                )}
            </ListGroup>
        </div>
    );
};

export default Notifications;
