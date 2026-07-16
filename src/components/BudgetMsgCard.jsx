import React, { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { CheckCircle, AlertTriangle, XCircle, Wallet } from "lucide-react";

const BudgetMsgCard = () => {
    const { budgetSummary, monthlyBudget } = useContext(ExpenseContext);

    const budget = monthlyBudget || 0;
    const remaining = Math.max(budget - budgetSummary.spent, 0);
    const percentage = budget > 0 ? (budgetSummary.spent / budget) * 100 : 0;
    const overBudget = Math.max(budgetSummary.spent - budget, 0);

    let level = "none";

    if (!budget) {
        level = "none";
    } else if (budgetSummary.spent === 0) {
        level = "start";
    } else if (percentage < 60) {
        level = "safe";
    } else if (percentage < 80) {
        level = "warning";
    } else if (percentage < 100) {
        level = "danger";
    } else {
        level = "over";
    }

    const STATUS = {
        none: {
            icon: <Wallet size={52} />,
            iconColor: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-200",
            title: "💡 No Budget Set",
            badge: "",
        },

        start: {
            icon: <CheckCircle size={52} />,
            iconColor: "text-green-600",
            bg: "bg-green-50",
            border: "border-green-200",
            title: "🎉 Great Start!",
            badge: "Ready",
        },

        safe: {
            icon: <CheckCircle size={52} />,
            iconColor: "text-green-600",
            bg: "bg-green-50",
            border: "border-green-200",
            title: "✅ You're within your budget!",
            badge: "On Track",
        },

        warning: {
            icon: <AlertTriangle size={52} />,
            iconColor: "text-yellow-600",
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            title: "⚠️ You're approaching your budget.",
            badge: "Watch Spending",
        },

        danger: {
            icon: <AlertTriangle size={52} />,
            iconColor: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-200",
            title: "🚨 Budget almost reached!",
            badge: "Almost Full",
        },

        over: {
            icon: <XCircle size={52} />,
            iconColor: "text-red-600",
            bg: "bg-red-50",
            border: "border-red-200",
            title: "❌ Budget exceeded!",
            badge: "Over Budget",
        },
    };

    const current = STATUS[level];

    return (
        <div className={`rounded-2xl p-6 mt-2 flex items-start lg:gap-8 shadow-sm border transition-all duration-300 ${current.bg} ${current.border}`}>
            {/* Icon */}
            <div className={`w-16 h-16 mx-4 rounded-full bg-white flex items-center justify-center shadow ${current.iconColor}`}>
                {current.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                    {current.title}
                </h3>
                {!budget ? (
                    <>
                        <p className="mt-2 text-gray-600">
                            Set your monthly budget to start tracking your spending, receive
                            alerts, and manage your finances more effectively.
                        </p>
                    </>
                ) : budgetSummary.spent === 0 ? (
                    <>
                        <p className="mt-2 text-gray-600">
                            Awesome! Your budget is ready. Start adding expenses to monitor your
                            spending throughout the month.
                        </p>

                        <p className="mt-2 text-green-700 font-medium">
                            Your full budget of ₹{budget.toLocaleString("en-IN")} is still
                            available.
                        </p>
                    </>
                ) : (
                    <>
                        <p className="mt-2 text-gray-600 leading-relaxed">
                            You've spent{" "}
                            <span className="font-semibold text-red-500">
                                ₹{budgetSummary.spent.toLocaleString("en-IN")}
                            </span>{" "}
                            out of your monthly budget of{" "}
                            <span className="font-semibold text-gray-900">
                                ₹{budget.toLocaleString("en-IN")}
                            </span>.
                        </p>

                        <p
                            className={`mt-2 font-medium ${percentage >= 100 ? "text-red-600" : "text-green-700"
                                }`}
                        >
                            {percentage >= 100
                                ? `You're over budget by ₹${overBudget.toLocaleString("en-IN")}.`
                                : `You still have ₹${remaining.toLocaleString("en-IN")} remaining this month.`}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <span className={`px-3 py-1 rounded-full ${percentage < 60
                                    ? "bg-green-100 text-green-700"
                                    : percentage < 80
                                        ? "bg-yellow-100 text-yellow-700"
                                        : percentage < 100
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-red-100 text-red-700"
                                    } text-sm font-medium`}>
                                {Math.min(percentage, 100).toFixed(0)}% Used
                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${percentage < 60
                                    ? "bg-green-100 text-green-700"
                                    : percentage < 80
                                        ? "bg-yellow-100 text-yellow-700"
                                        : percentage < 100
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {percentage < 60
                                    ? "On Track"
                                    : percentage < 80
                                        ? "Watch Spending"
                                        : percentage < 100
                                            ? "Almost Full"
                                            : "Over Budget"}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default BudgetMsgCard
