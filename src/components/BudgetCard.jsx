import React, { useContext, useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import ExpenseContext from "../context/ExpenseContext";
import BudgetProgressCircle from "./BudgetProgressCircle";

const BudgetSummaryCard = () => {
    const {
        monthlyBudget,
        setMonthlyBudget,
        budgetSummary,
    } = useContext(ExpenseContext);

    const getProgressColor = (percentage) => {
        if (percentage > 100) return "#B91C1C"; // red-700
        if (percentage >= 90) return "#EF4444"; // red-500
        if (percentage >= 70) return "#FACC15"; // yellow-400
        return "#22C55E"; // green-500
    };

    const [editing, setEditing] = useState(false);
    const [budgetInput, setBudgetInput] = useState(monthlyBudget);

    const handleSave = () => {
        setMonthlyBudget(Math.max(0, Number(budgetInput) || 0));
        setEditing(false);
    };

    const handleCancel = () => {
        setBudgetInput(monthlyBudget);
        setEditing(false);
    };

    return (
        <div className="bg-white rounded-3xl border shadow-sm p-4 sm:p-6">

            <div className="flex flex-col lg:flex-row justify-between gap-8">

                {/* Left */}

                <div className="flex-1">

                    <h2 className="text-xl font-semibold mb-6">
                        Monthly Budget
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x">

                        <div className="pr-8">
                            <p className="text-gray-500 mb-2">Budget</p>

                            {editing ? (
                                <input
                                    type="number"
                                    value={budgetInput}
                                    onChange={(e) => setBudgetInput(e.target.value)}
                                    className="border rounded-lg px-3 py-2 w-full max-w-[180px]"
                                />
                            ) : (
                                <h2 className="text-3xl sm:text-4xl font-bold break-words">
                                    ₹{monthlyBudget.toLocaleString()}
                                </h2>
                            )}
                        </div>

                        <div className="px-8">
                            <p className="text-gray-500 mb-2">
                                Total Spent
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-bold text-red-500">
                                {budgetSummary.spent.toLocaleString()}
                            </h2>
                        </div>

                        <div className="px-8">
                            <p className="text-gray-500 mb-2">
                                Remaining
                            </p>

                            <h2 className={`text-2xl sm:text-3xl font-bold ${budgetSummary.remaining >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {budgetSummary.remaining.toLocaleString()}
                            </h2>
                        </div>

                    </div>

                    {/* Button */}

                    <div className="mt-6 sm:mt-8">

                        {editing ? (
                            <div className="grid grid-cols-2 sm:flex gap-3">

                                <button
                                    onClick={handleSave}
                                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-green-500 text-white flex items-center gap-2"
                                >
                                    <Check size={18} />
                                    Save
                                </button>

                                <button
                                    onClick={handleCancel}
                                    className="w-full sm:w-auto px-5 py-2 rounded-xl border flex items-center gap-2"
                                >
                                    <X size={18} />
                                    Cancel
                                </button>

                            </div>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className="w-full sm:w-auto px-5 py-3 rounded-xl border flex justify-center items-center gap-2 hover:bg-gray-50"
                            >
                                <Pencil size={18} />
                                Edit Budget
                            </button>
                        )}

                    </div>

                    {/* Progress */}

                    <div className="mt-8">

                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">

                            <div
                                style={{
                                    width: `${Math.min(budgetSummary.percentage, 100)}%`,
                                    backgroundColor: getProgressColor(budgetSummary.percentage),
                                }}
                                className="h-full rounded-full transition-all duration-500"
                            />

                        </div>

                        <div className="flex justify-between mt-2 text-gray-500 font-medium">

                            <span>₹0</span>

                            <span>
                                ₹{monthlyBudget.toLocaleString()}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="flex justify-center lg:justify-end items-center">

                    <BudgetProgressCircle
                        percentage={budgetSummary.percentage}
                        progressColor={getProgressColor(budgetSummary.percentage)}
                        size={window.innerWidth < 640 ? 140 : 180}
                    />

                </div>

            </div>

        </div>
    );
};

export default BudgetSummaryCard;