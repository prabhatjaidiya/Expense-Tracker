import { useContext } from "react";
import { Bell } from "lucide-react";
import NotificationContext from "../context/NotificationContext";

const NotificationBell = ({ onClick }) => {
    const { unreadCount } = useContext(NotificationContext);

    return (
        <button
            onClick={onClick}
            className="relative p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />

            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white animate-pulse">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </button>
    );
};

export default NotificationBell;