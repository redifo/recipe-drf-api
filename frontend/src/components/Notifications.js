import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';
import styles from '../styles/Notifications.module.css';
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { axiosRes } from "../api/axiosDefaults";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const history = useHistory();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchNotifications = async () => {
            if (currentUser) {
                try {
                    const response = await axiosRes.get(`/notifications/?recipient=${currentUser.profile_id}`);
                    setNotifications(response.data.results);
                } catch (err) {
                    console.error("Error fetching notifications:", err);
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
        } catch (err) {
            console.error("Failed to mark notification as read:", err);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await axios.delete(`/notifications/${notificationId}/`);
            setNotifications(notifications.filter(notif => notif.id !== notificationId));
        } catch (err) {
            console.error("Failed to delete notification:", err);
        }
    };

    const navigateToRecipe = (recipeId) => {
        history.push(`/recipes/${recipeId}`);
    };

    return (
        <div className={styles.NotificationsContainer}>
            <ListGroup>
                {notifications.map(notification => (
                    <ListGroup.Item key={notification.id} className={styles.NotificationItem}>
                        <div onClick={() => navigateToRecipe(notification.recipe)}>
                            <strong>{notification.sender_name}</strong> {notification.notification_type_display} on your recipe.
                        </div>
                        <div className={styles.ActionButtons}>
                            <Button variant="outline-primary" size="sm" onClick={() => markAsRead(notification.id)}>
                                Mark as Read
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => deleteNotification(notification.id)}>
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