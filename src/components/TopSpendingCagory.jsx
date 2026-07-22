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
            bg: "bg-blue-100",
            iconColor: "text-blue-500",
        },
        Travel: {
            icon: Plane,
            color: "bg-purple-500",
            bg: "bg-purple-100",
            iconColor: "text-purple-500",
        },
        Food: {
            icon: UtensilsCrossed,
            color: "bg-green-500",
            bg: "bg-green-100",
            iconColor: "text-green-500",
        },
        Bills: {
            icon: FileText,
            color: "bg-yellow-500",
            bg: "bg-yellow-100",
            iconColor: "text-yellow-500",
        },
        Transport: {
            icon: Car,
            color: "bg-pink-500",
            bg: "bg-pink-100",
            iconColor: "text-pink-500",
        },
        Entertainment: {
            icon: Gamepad2,
            color: "bg-red-500",
            bg: "bg-red-100",
            iconColor: "text-red-500",
        },
        Health: {
            icon: Heart,
            color: "bg-rose-500",
            bg: "bg-rose-100",
            iconColor: "text-rose-500",
        },
        Education: {
            icon: GraduationCap,
            color: "bg-indigo-500",
            bg: "bg-indigo-100",
            iconColor: "text-indigo-500",
        },
    };

    const total = topSpendingCategories.reduce(
        (sum, item) => sum + item.value,
        0
    );


    return (
        <div className="bg-white w-full rounded-xl h-min shadow-md border border-gray-100 mt-4 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-900">
                    Top Spending Categories
                </h2>
            </div>

            {/* List */}
            <div className="space-y-7">
                {topSpendingCategories.map((item, index) => {
                    const config = categoryConfig[item.name] || {
                        icon: HelpCircle,
                        color: "bg-gray-500",
                        bg: "bg-gray-100",
                        iconColor: "text-gray-500",
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
                                <div className="flex justify-between mb-2">
                                    <h3 className="font-semibold">{item.name}</h3>

                                    <div className="flex gap-6">
                                        <span className="font-bold">
                                            ₹{item.value.toLocaleString("en-IN")}
                                        </span>

                                        <span className="text-gray-500">
                                            {percentage}%
                                        </span>
                                    </div>
                                </div>

                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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