import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const BudgetWidget = () => {
    const { monthlyBudget, currentMonthSpent } = useContext(ExpenseContext);

    const percentage =
        monthlyBudget > 0 ? Math.round((currentMonthSpent / monthlyBudget) * 100) : 0;

    const progress = Math.min(percentage, 100);

    const remaining = Math.max(monthlyBudget - currentMonthSpent, 0);

    let color = "bg-green-500";
    let status = "On Track";

    if (percentage >= 90 && percentage <= 100) {
        color = "bg-red-500";
        status = "Critical";
    } else if (percentage >= 70) {
        color = "bg-yellow-500";
        status = "Near Limit";
    }

    if (percentage > 100) {
        color = "bg-red-700";
        status = "Over Budget";
    }

    return (
        <div className="bg-white text-black border-gray-200 dark:bg-gray-900 dark:border-gray-800 dark:text-white rounded-2xl shadow-sm border p-6 lg:m-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Wallet className="text-blue-600" size={22} />
                    <h2 className="font-semibold text-lg">
                        Budget Overview
                    </h2>
                </div>

                <p className="text-sm text-gray-500">
                    {new Date().toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </p>
            </div>

            {/* Budget Details */}
            <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Budget</span>
                    <span className="font-semibold">
                        ₹ {monthlyBudget.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Spent</span>
                    <span className="font-semibold">
                        ₹ {currentMonthSpent.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Remaining</span>
                    <span className="font-semibold">
                        ₹ {remaining.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            {/* Progress */}
            <div className="mt-6">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`${color} h-full rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Status */}
            <div className="mt-5">
                <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
            ${percentage > 100
                            ? "bg-red-100 text-red-700"
                            : percentage >= 90
                                ? "bg-red-100 text-red-600 dark:text-[#EF4444]"
                                : percentage >= 70
                                    ? "bg-yellow-100 text-yellow-700 dark:text-[#FACC15]"
                                    : "bg-green-100 text-green-700 dark:text-[#22C55E]"
                        }`}
                >
                    {status}
                </span>
            </div>

            <Link to="/budget">
                <div className="mt-5 flex justify-end">
                    <span className="text-sm text-blue-600 font-medium">
                        View Budget →
                    </span>
                </div>
            </Link>
        </div>

    );
};

export default BudgetWidget;