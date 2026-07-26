import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";
import NotificationItem from "./NotificationItem";

const NotificationDropdown = ({isOpen}) => {
    const {
        notifications,
        markAllAsRead,
        clearNotifications,
    } = useContext(NotificationContext);

    return (
        <div
            className={`absolute right-0 mt-3 w-80 sm:w-96 rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900 transition-all duration-200 origin-top-right z-50 ${isOpen
                    ? "scale-100 opacity-100 visible"
                    : "scale-95 opacity-0 invisible"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-white">
                    Notifications
                </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Mark all read
                </button>

                <button
                    onClick={clearNotifications}
                    className="text-sm text-red-500 hover:underline"
                >
                    Clear All
                </button>
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">

                {notifications.length === 0 ? (
                    <div className="py-10 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            You're all caught up!
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            No notifications.
                        </p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                        />
                    ))
                )}

            </div>
        </div>
    );
};

export default NotificationDropdown;