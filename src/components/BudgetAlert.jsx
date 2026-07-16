import React, { useContext } from 'react'
import ExpenseContext from '../context/ExpenseContext';
import { AlertTriangle, CheckCircle, XCircle, CircleCheckBig } from 'lucide-react';

const BudgetAlert = () => {
    const { budgetAlerts } = useContext(ExpenseContext);

    const getStatus = (percentage) => {
        if (percentage >= 100)
            return {
                icon: XCircle,
                color: "text-red-500",
                bg: "bg-red-100",
                message: "Budget exceeded",
            };

        if (percentage >= 90)
            return {
                icon: AlertTriangle,
                color: "text-red-500",
                bg: "bg-red-100",
                message: `is at ${percentage}% of budget`,
            };

        if (percentage >= 70)
            return {
                icon: AlertTriangle,
                color: "text-yellow-500",
                bg: "bg-yellow-100",
                message: `is at ${percentage}% of budget`,
            };

        return {
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-100",
            message: "is within budget",
        };
    };

    if (!budgetAlerts.length) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <CircleCheckBig
                    className="mx-auto text-green-500 mb-3"
                    size={42}
                />
                <h3 className="font-semibold text-lg">
                    You're doing great!
                </h3>
                <p className="text-gray-500 mt-2">
                    No budget alerts for this month.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 m-2">
            <div className="flex justify-between items-center mb-5 gap-4">
                <h2 className="font-semibold text-lg">
                    Budget Alerts
                </h2>
            </div>

            <div className="space-y-3">
                {budgetAlerts.map((item) => {
                    const status = getStatus(item.percentage);
                    const Icon = status.icon;

                    return (
                        <div
                            key={item.category}
                            className="flex items-start sm:items-center justify-between gap-3 border rounded-xl p-4 hover:bg-gray-50 transition"
                        >
                            <div className="flex flex-1 gap-3">
                                <div
                                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${status.bg}`}
                                >
                                    <Icon className={`${status.color}`} size={22} />
                                </div>

                                <div>
                                    <h3 className="font-medium text-sm sm:text-base">
                                        {item.category} {status.message}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                        {item.percentage >= 70
                                            ? `You've used ₹${item.spent.toLocaleString()} of ₹${item.budget.toLocaleString()}`
                                            : `You have ₹${item.remaining.toLocaleString()} remaining`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default BudgetAlert
