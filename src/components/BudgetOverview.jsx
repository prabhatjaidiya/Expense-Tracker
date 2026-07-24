import {
    Wallet,
    ShoppingCart,
    TrendingUp,
    CheckCircle,
    Calendar,
    PieChart,
} from "lucide-react";
import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import BudgetProgressCircle from "./BudgetProgressCircle";
import { Link } from "react-router-dom";

const BudgetOverview = () => {
    const {
        monthlyBudget,
        budgetSummary,
    } = useContext(ExpenseContext);

    const getProgressColor = (percentage) => {
        if (percentage > 100) return "#B91C1C"; // red-700
        if (percentage >= 90) return "#EF4444"; // red-500
        if (percentage >= 70) return "#FACC15"; // yellow-400
        return "#22C55E"; // green-500
    };

    const formatCurrency = (value) =>
        `₹ ${Number(value).toLocaleString("en-IN")}`;

    const today = new Date();
    const currentDay = today.getDate();
    const budget = monthlyBudget;
    const spent = budgetSummary.spent;
    const remaining = Math.max(0, budget - spent);
    const percentage = budget > 0 ? Math.round((spent / budget) * 100) : 0;
    const dailyAverage = currentDay > 0 ? Math.round(spent / currentDay) : 0;
    const size = window.innerWidth < 640 ? 140 : 160;

    const getStatus = () => {
        if (budgetSummary.percentage > 100) {
            return {
                title: "Budget Exceeded!",
                message: "You've exceeded your monthly budget.",
                textColor: "text-red-700 dark:text-red-300",
                bgColor: "bg-red-50 dark:bg-red-900/20",
                borderColor: "border-red-200 dark:border-red-800",
                iconBg: "bg-red-100 dark:bg-red-900/40",
                iconColor: "text-red-600 dark:text-red-400",
            };
        }

        if (budgetSummary.percentage >= 80) {
            return {
                title: "Budget Alert!",
                message: "You're close to reaching your monthly budget.",
                textColor: "text-yellow-700 dark:text-yellow-300",
                bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
                borderColor: "border-yellow-200 dark:border-yellow-800",
                iconBg: "bg-yellow-100 dark:bg-yellow-900/40",
                iconColor: "text-yellow-600 dark:text-yellow-400",
            };
        }

        return {
            title: "You're on track! 🎉",
            message: "Great job! You're spending within your budget.",
            textColor: "text-green-700 dark:text-green-300",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            borderColor: "border-green-200 dark:border-green-800",
            iconBg: "bg-green-100 dark:bg-green-900/40",
            iconColor: "text-green-600 dark:text-green-400",
        };
    };

    const status = getStatus();


    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-md">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                        <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                            Budget Overview
                        </h1>
                        <p className="text-md text-slate-500 dark:text-gray-400">
                            Track your monthly budget and spending
                        </p>
                    </div>
                </div>

                <button className="flex items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-2xl px-2 py-2 text-md bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200">
                    <Calendar size={18} />
                    {new Date().toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">

                {/* Progress */}
                <div className="lg:col-span-4 flex justify-center">

                    <div className="flex justify-center lg:justify-end items-center h-min">
                        <BudgetProgressCircle
                            percentage={budgetSummary.percentage}
                            progressColor={getProgressColor(budgetSummary.percentage)}
                            size={size}
                        />

                    </div>

                </div>

                {/* Right */}
                <div className="lg:col-span-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">

                        <div className="sm:border-r border-gray-200 dark:border-gray-700">

                            <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <p className="text-md text-slate-500 dark:text-gray-400">
                                    Total Budget
                                </p>

                            </div>
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                                {formatCurrency(budget)}
                            </h2>
                        </div>

                        <div className="lg:pl-10">

                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                    <ShoppingCart className="text-red-500 dark:text-red-400" />
                                </div>
                                <p className="text-md text-slate-500 dark:text-gray-400">
                                    Total Spent
                                </p>

                            </div>
                            <h2 className="text-xl font-semibold text-red-500 mt-2">
                                {formatCurrency(spent)}
                            </h2>
                        </div>

                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-8">

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">

                            <div className="flex gap-3 sm:border-r border-gray-200 dark:border-gray-700">
                                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-gray-400">
                                        Remaining Budget
                                    </p>

                                    <h2 className="text-xl font-semibold text-green-600">
                                        {formatCurrency(remaining)}
                                    </h2>
                                </div>

                            </div>

                            <div className="flex gap-3 lg:pl-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex justify-center items-center">
                                    <TrendingUp className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-gray-400">
                                        Daily Average Spent
                                    </p>

                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        {formatCurrency(dailyAverage)}
                                    </h2>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Message */}
            <div
                className={`${status.bgColor} ${status.borderColor} border rounded-2xl mt-6 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5`}
            >
                {/* Left */}
                <div className="flex items-start gap-4">
                    <div
                        className={`w-12 h-12 rounded-xl ${status.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                        <CheckCircle className={`w-7 h-7 ${status.iconColor}`} />
                    </div>

                    <div>
                        <h2 className={`text-lg md:text-xl font-semibold ${status.textColor}`}>
                            {status.title}
                        </h2>

                        <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 mt-1">
                            {status.message}
                        </p>
                    </div>
                </div>

                {/* Button */}
                <Link to="/budget" className="w-full md:w-auto">
                    <button
                        className="w-full md:w-auto
             border-2 border-indigo-500
             dark:border-indigo-400
             text-indigo-600 dark:text-indigo-400
             hover:bg-indigo-50 dark:hover:bg-indigo-900/20
             transition rounded-xl
             px-5 py-3
             flex items-center justify-center gap-2
             font-medium"
                    >
                        <PieChart size={18} />
                        View Budget Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BudgetOverview;