import { useContext } from "react";
import {
    Wallet,
    BadgeDollarSign,
    AlertTriangle,
    ShieldCheck,
    User,
    FileText,
    Trash2,
    Bell,
} from "lucide-react";
import NotificationContext from "../context/NotificationContext";

const NotificationItem = ({ notification }) => {
    const { markAsRead, deleteNotification } =
        useContext(NotificationContext);

    const icons = {
        expense: Wallet,
        income: BadgeDollarSign,
        warning: AlertTriangle,
        security: ShieldCheck,
        profile: User,
        report: FileText,
        info: Bell,
    };

    const Icon =
        icons[notification.type] || Bell;

    const formatTime = (date) => {
        const now = new Date();
        const created = new Date(date);

        const diff =
            Math.floor((now - created) / 1000);

        if (diff < 60)
            return "Just now";

        if (diff < 3600)
            return `${Math.floor(diff / 60)} min ago`;

        if (diff < 86400)
            return `${Math.floor(diff / 3600)} hr ago`;

        if (diff < 172800)
            return "Yesterday";

        return `${Math.floor(diff / 86400)} days ago`;
    };

    return (
        <div
            onClick={() =>
                markAsRead(notification.id)
            }
            className={`flex items-start gap-3 px-4 py-4 transition hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${!notification.read
                    ? "bg-blue-50 dark:bg-blue-950/30"
                    : ""
                }`}
        >
            {/* Icon */}
            <div className="mt-1">
                <Icon className="w-5 h-5 text-blue-600" />
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-800 dark:text-white">
                        {notification.title}
                    </h3>

                    {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    )}
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {notification.message}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                    {formatTime(notification.createdAt)}
                </p>
            </div>

            {/* Delete */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                }}
                className="rounded-md p-1 text-gray-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default NotificationItem;