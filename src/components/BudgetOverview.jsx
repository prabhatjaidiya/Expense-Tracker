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
    console.log(budgetSummary, monthlyBudget);

    const formatCurrency = (value) =>
        `₹ ${Number(value).toLocaleString("en-IN")}`;

    const today = new Date();
    const currentDay = today.getDate();
    const budget = monthlyBudget;
    const spent = budgetSummary.spent;
    const remaining = Math.max(0, budget - spent);
    const percentage = budget > 0 ? Math.round((spent / budget) * 100) : 0;
    const dailyAverage = currentDay > 0 ? Math.round(spent / currentDay) : 0;

    const getStatus = () => {
        if (budgetSummary.percentage > 100) {
            return {
                title: "Budget Exceeded!",
                message: "You've exceeded your monthly budget.",
                textColor: "text-red-700",
                bgColor: "bg-red-50",
                borderColor: "border-red-200",
                iconBg: "bg-red-100",
                iconColor: "text-red-600",
            };
        }

        if (budgetSummary.percentage >= 80) {
            return {
                title: "Budget Alert!",
                message: "You're close to reaching your monthly budget.",
                textColor: "text-yellow-700",
                bgColor: "bg-yellow-50",
                borderColor: "border-yellow-200",
                iconBg: "bg-yellow-100",
                iconColor: "text-yellow-600",
            };
        }

        return {
            title: "You're on track! 🎉",
            message: "Great job! You're spending within your budget.",
            textColor: "text-green-700",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        };
    };

    const status = getStatus();

    return (
        <div className="bg-white lg:flex-1 rounded-xl border border-gray-200 p-4 shadow-md lg:m-4">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <Wallet className="w-8 h-8 text-indigo-600" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            Budget Overview
                        </h1>
                        <p className="text-md text-slate-500">
                            Track your monthly budget and spending
                        </p>
                    </div>
                </div>

                <button className="flex items-center gap-4 border rounded-2xl px-2 py-2 text-md">
                    <Calendar size={18} />
                    July 2026
                </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">

                {/* Progress */}
                <div className="lg:col-span-4 flex justify-center">

                    <div>

                        <div className="flex justify-center lg:justify-end items-center h-min">
                            <BudgetProgressCircle
                                percentage={budgetSummary.percentage}
                                progressColor={getProgressColor(budgetSummary.percentage)}
                                size={window.innerWidth < 640 ? 140 : 180}
                            />

                        </div>
                    </div>

                </div>

                {/* Right */}
                <div className="lg:col-span-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">

                        <div className="sm:border-r border-gray-200">

                            <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                    <Wallet className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="text-md text-slate-500">
                                    Total Budget
                                </p>

                            </div>
                            <h2 className="text-2xl font-semibold mt-2">
                                {formatCurrency(budget)}
                            </h2>
                        </div>

                        <div className="lg:pl-10">

                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                    <ShoppingCart className="text-red-500" />
                                </div>
                                <p className="text-md text-slate-500">
                                    Total Spent
                                </p>

                            </div>
                            <h2 className="text-xl font-semibold text-red-500 mt-2">
                                {formatCurrency(spent)}
                            </h2>
                        </div>

                    </div>

                    <div className="border-t mt-10 pt-8">

                        <div className="bg-gray-50 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">

                            <div className="flex gap-3 sm:border-r border-gray-200">
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                    <Wallet className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Remaining Budget
                                    </p>

                                    <h2 className="text-xl font-semibold text-green-600">
                                        {formatCurrency(remaining)}
                                    </h2>
                                </div>

                            </div>

                            <div className="flex gap-3 lg:pl-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex pt-1 justify-center">
                                    <TrendingUp className="mt-2 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Daily Average Spent
                                    </p>

                                    <h2 className="text-xl font-semibold">
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

                        <p className="text-sm md:text-base text-slate-600 mt-1">
                            {status.message}
                        </p>
                    </div>
                </div>

                {/* Button */}
                <Link to="/budget" className="w-full md:w-auto">
                    <button className="w-full md:w-auto border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition rounded-xl px-5 py-3 flex items-center justify-center gap-2 font-medium">
                        <PieChart size={18} />
                        View Budget Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BudgetOverview;