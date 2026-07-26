import { createContext, useEffect, useMemo, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    // Load notifications from localStorage when the app starts
    const [notifications, setNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem("notifications");
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });

    // Save notifications whenever they change
    useEffect(() => {
        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );
    }, [notifications]);

    // Add a new notification
    const addNotification = ({
        title,
        message,
        type = "info",
    }) => {
        const newNotification = {
            id: Date.now(),
            title,
            message,
            type,
            read: false,
            createdAt: new Date().toISOString(),
        };

        setNotifications((prev) =>
            [newNotification, ...prev].slice(0, 50)
        );
    };

    // Delete a notification
    const deleteNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    };

    // Mark one notification as read
    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    };

    // Remove all notifications
    const clearNotifications = () => {
        setNotifications([]);
    };

    // Calculate unread count
    const unreadCount = useMemo(() => {
        return notifications.filter(
            (notification) => !notification.read
        ).length;
    }, [notifications]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotification,
                deleteNotification,
                markAsRead,
                markAllAsRead,
                clearNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;