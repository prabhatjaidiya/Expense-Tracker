import React, { useContext } from "react";
import {
    ShoppingBag,
    Plane,
    UtensilsCrossed,
    FileText,
    Car,
    Gamepad2,
    Heart,
    GraduationCap,
    HelpCircle,
} from "lucide-react";
import ExpenseContext from "../context/ExpenseContext";

const TopSpendingCategoriesAnalysis = () => {
    const { topSpendingCategories } = useContext(ExpenseContext);

    const categoryConfig = {
        Shopping: {
            icon: ShoppingBag,
            color: "bg-blue-500",
            bg: "bg-blue-100 dark:bg-blue-900/30",
            iconColor: "text-blue-500 dark:text-blue-400",
        },
        Travel: {
            icon: Plane,
            color: "bg-purple-500",
            bg: "bg-purple-100 dark:bg-purple-900/30",
            iconColor: "text-purple-500 dark:text-purple-400",
        },
        Food: {
            icon: UtensilsCrossed,
            color: "bg-green-500",
            bg: "bg-green-100 dark:bg-green-900/30",
            iconColor: "text-green-500 dark:text-green-400",
        },
        Bills: {
            icon: FileText,
            color: "bg-yellow-500",
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
            iconColor: "text-yellow-500 dark:text-yellow-400",
        },
        Transport: {
            icon: Car,
            color: "bg-pink-500",
            bg: "bg-pink-100 dark:bg-pink-900/30",
            iconColor: "text-pink-500 dark:text-pink-400",
        },
        Entertainment: {
            icon: Gamepad2,
            color: "bg-red-500",
            bg: "bg-red-100 dark:bg-red-900/30",
            iconColor: "text-red-500 dark:text-red-400",
        },
        Health: {
            icon: Heart,
            color: "bg-rose-500",
            bg: "bg-rose-100 dark:bg-rose-900/30",
            iconColor: "text-rose-500 dark:text-rose-400",
        },
        Education: {
            icon: GraduationCap,
            color: "bg-indigo-500",
            bg: "bg-indigo-100 dark:bg-indigo-900/30",
            iconColor: "text-indigo-500 dark:text-indigo-400",
        },
    };

    const total = topSpendingCategories.reduce(
        (sum, item) => sum + item.value,
        0
    );

    if (!topSpendingCategories.length) {
        return (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-6 text-center text-gray-500 dark:text-gray-400">
                No spending data available.
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-6 w-full h-min">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Top Spending Categories
                </h2>
            </div>

            {/* List */}
            <div className="space-y-7">
                {topSpendingCategories.map((item) => {
                    const config = categoryConfig[item.name] || {
                        icon: HelpCircle,
                        color: "bg-gray-500",
                        bg: "bg-gray-100 dark:bg-gray-800",
                        iconColor: "text-gray-500 dark:text-gray-400",
                    };

                    const Icon = config.icon;
                    const percentage = ((item.value / total) * 100).toFixed(1);

                    return (
                        <div key={item.name} className="flex gap-4">

                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg}`}
                            >
                                <Icon className={`w-5 h-5 ${config.iconColor}`} />
                            </div>

                            <div className="flex-1">

                                <div className="flex justify-between items-center mb-2">

                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                        {item.name}
                                    </h3>

                                    <div className="flex gap-6">

                                        <span className="font-bold text-gray-900 dark:text-gray-100">
                                            ₹{item.value.toLocaleString("en-IN")}
                                        </span>

                                        <span className="text-gray-500 dark:text-gray-400">
                                            {percentage}%
                                        </span>

                                    </div>

                                </div>

                                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className={`${config.color} h-full rounded-full`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>

                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TopSpendingCategoriesAnalysis;