import React, { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { CheckCircle, AlertTriangle, XCircle, Wallet } from "lucide-react";

const BudgetMsgCard = () => {
    const { budgetSummary, monthlyBudget } = useContext(ExpenseContext);

    const budget = monthlyBudget || 0;
    const remaining = Math.max(budget - budgetSummary.spent, 0);
    const percentage = budget > 0 ? (budgetSummary.spent / budget) * 100 : 0;
    const overBudget = Math.max(budgetSummary.spent - budget, 0);


    let icon = <Wallet size={28} />;

    if (!budget) {
        icon = <Wallet size={52} />;
    } else if (percentage < 60) {
        icon = <CheckCircle size={52} />;
    } else if (percentage < 100) {
        icon = <AlertTriangle size={52} />;
    } else {
        icon = <XCircle size={52} />;
    }

    let iconColor = "text-blue-600";

    if (!budget) {
        iconColor = "text-blue-600";
    } else if (percentage < 60) {
        iconColor = "text-green-600";
    } else if (percentage < 80) {
        iconColor = "text-yellow-600";
    } else if (percentage < 100) {
        iconColor = "text-orange-600";
    } else {
        iconColor = "text-red-600";
    }

    let status = {
        title: "",
        message: "",
        bg: "",
        border: "",
    };

    if (!budget) {
        status = {
            title: "💡 No Budget Set",
            message: "Set your monthly budget to start tracking your spending.",
            bg: "bg-blue-50",
            border: "border-blue-200",
        };
    } else if (budgetSummary.spent === 0) {
        status = {
            title: "🎉 Great Start!",
            message: "You haven't recorded any expenses yet.",
            bg: "bg-green-50",
            border: "border-green-200",
        };
    } else if (percentage < 60) {
        status = {
            title: "✅ You're within your budget!",
            message: `Great job! You still have ₹${remaining.toLocaleString()} remaining this month.`,
            bg: "bg-green-50",
            border: "border-green-200",
        };
    } else if (percentage < 80) {
        status = {
            title: "⚠️ You're approaching your budget.",
            message: `You've used ${Math.round(percentage)}% of your monthly budget.`,
            bg: "bg-yellow-50",
            border: "border-yellow-200",
        };
    } else if (percentage < 100) {
        status = {
            title: "🚨 Budget almost reached!",
            message: `Only ₹${remaining.toLocaleString()} remains. Spend carefully.`,
            bg: "bg-orange-50",
            border: "border-orange-200",
        };
    } else {
        status = {
            title: "❌ Budget exceeded!",
            message: `You've exceeded your budget by ₹${overBudget.toLocaleString("en-IN")}.`,
            bg: "bg-red-50",
            border: "border-red-200",
        };
    }
    return (
        <div className={`rounded-2xl p-6 mt-2 flex items-start gap-8 shadow-sm border transition-all duration-300 ${status.bg} ${status.border}`}>
            {/* Icon */}
            <div className={`w-16 h-16 mx-4 rounded-full bg-white flex items-center justify-center shadow ${iconColor}`}>
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                    {status.title}
                </h3>
                {!budget ? (
                    <>
                        <p className="mt-2 text-gray-600">
                            Set your monthly budget to start tracking your spending, receive
                            alerts, and manage your finances more effectively.
                        </p>

                        <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                            Set Budget
                        </button>
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
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                {Math.round(percentage)}% Used
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
