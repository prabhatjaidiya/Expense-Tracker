import React, { useContext, useState, useRef, useEffect } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { Check, Settings, Pencil, X } from "lucide-react";

const CategoryBudgetTable = () => {
    const { categoryBudgetSummary, updateCategoryBudget } = useContext(ExpenseContext);

    const [manageMode, setManageMode] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [budgetInputs, setBudgetInputs] = useState({});

    const inputRef = useRef(null);

    useEffect(() => {
        if (editingCategory) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [editingCategory]);

    useEffect(() => {
        if (manageMode) {
            const inputs = {};

            categoryBudgetSummary.forEach((item) => {
                inputs[item.category] = item.budget;
            });

            setBudgetInputs(inputs);
        }
    }, [manageMode, categoryBudgetSummary]);

    const getProgressColor = (percentage) => {
        if (percentage > 100) return "bg-red-700";
        if (percentage >= 90) return "bg-red-500";
        if (percentage >= 70) return "bg-yellow-400";
        return "bg-green-500";
    };

    const handleEdit = (item) => {
        setEditingCategory(item.category);

        setBudgetInputs((prev) => ({
            ...prev,
            [item.category]: item.budget,
        }));
    };

    const handleCancel = () => {
        if (editingCategory) {
            const item = categoryBudgetSummary.find(
                (budget) => budget.category === editingCategory
            );

            if (item) {
                setBudgetInputs((prev) => ({
                    ...prev,
                    [editingCategory]: item.budget,
                }));
            }
        }

        setEditingCategory(null);
    };

    const handleSave = (category) => {
        const newBudget = Math.max(
            0,
            Number(budgetInputs[category]) || 0
        );

        updateCategoryBudget(category, newBudget);

        setEditingCategory(null);
    };

    const handleKeyDown = (e, category) => {
        if (e.key === "Enter") {
            handleSave(category);
        }

        if (e.key === "Escape") {
            handleCancel();
        }
    };

    const handleSaveAll = () => {
        Object.keys(budgetInputs).forEach((category) => {
            updateCategoryBudget(
                category,
                Math.max(0, Number(budgetInputs[category]) || 0)
            );
        });

        setManageMode(false);
    };

    const hasChanges = categoryBudgetSummary.some(
        (item) =>
            Number(budgetInputs[item.category] ?? item.budget) !== item.budget
    );

    if (!categoryBudgetSummary.length) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 text-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                No category budgets found.
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Category Budgets</h2>

                {manageMode ? (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveAll}
                            disabled={!hasChanges}
                            className={`px-4 py-2 text-sm rounded-xl transition
                            ${hasChanges
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Save All
                        </button>

                        <button
                            onClick={() => {
                                setManageMode(false);
                                setBudgetInputs({});
                            }}
                            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setManageMode(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
                    >
                        <Settings size={18} />
                        Manage Categories
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-700">
                        <tr className="text-left text-gray-600 dark:text-gray-300">
                            <th className="p-5">Category</th>
                            <th>Budget</th>
                            <th>Spent</th>
                            <th>Remaining</th>
                            <th>Usage</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {categoryBudgetSummary.map((item) => {
                            const remaining = item.budget - item.spent;
                            const percentage =
                                item.budget > 0
                                    ? Math.round((item.spent / item.budget) * 100)
                                    : 0;

                            const progress = Math.min(percentage, 100);

                            return (
                                <tr
                                    key={item.category}
                                    className={`border-b border-gray-200 dark:border-gray-700 last:border-none hover:bg-gray-50 dark:hover:bg-gray-800 transition ${item.budget === 0 ? "opacity-70" : ""
                                        }`}
                                >
                                    {/* Category */}
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg}`}
                                            >
                                                <item.icon className={item.iconColor} size={24} />
                                            </div>

                                            <div>
                                                <p className="font-medium text-lg text-gray-900 dark:text-white">{item.category}</p>

                                                {item.budget === 0 && (
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                                        Budget not configured
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Budget */}
                                    <td className="font-semibold text-gray-900 dark:text-white">
                                        {manageMode || editingCategory === item.category ? (
                                            <input
                                                ref={editingCategory === item.category ? inputRef : null}
                                                type="number"
                                                min="0"
                                                value={budgetInputs[item.category] ?? ""}
                                                placeholder="Enter budget"
                                                onChange={(e) =>
                                                    setBudgetInputs((prev) => ({
                                                        ...prev,
                                                        [item.category]: e.target.value,
                                                    }))
                                                }
                                                onKeyDown={(e) => handleKeyDown(e, item.category)}
                                                className="w-28 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : item.budget === 0 ? (
                                            <span className="text-gray-400  dark:text-gray-500">Not Set</span>
                                        ) : (
                                            `₹${item.budget?.toLocaleString()}`
                                        )}
                                    </td>

                                    {/* Spent */}
                                    <td className="font-semibold text-red-500">
                                        {item.spent.toLocaleString()}
                                    </td>

                                    {/* Remaining */}
                                    <td className="font-semibold text-gray-900 dark:text-white">
                                        {item.budget === 0 ? (
                                            <span className="text-gray-400">—</span>
                                        ) : (
                                            <span
                                                className={
                                                    remaining >= 0 ? "text-green-500" : "text-red-500"
                                                }
                                            >
                                                {remaining.toLocaleString()}
                                            </span>
                                        )}
                                    </td>

                                    {/* Usage */}
                                    <td>
                                        {item.budget === 0 ? (
                                            <span className="text-sm text-gray-400 dark:text-gray-500">No Budget</span>
                                        ) : (
                                            <div className="flex items-center gap-4 min-w-[220px]">
                                                <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${getProgressColor(percentage)}`}
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>

                                                <span className="w-10 text-gray-700 dark:text-gray-300">{Math.min(percentage, 100)}%</span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >

            {/* Mobile Cards */}
            <div className="lg:hidden p-4 space-y-4">
                {categoryBudgetSummary.map((item) => {
                    const remaining = item.budget - item.spent;

                    const percentage =
                        item.budget > 0
                            ? Math.round((item.spent / item.budget) * 100)
                            : 0;

                    const progress = Math.min(percentage, 100);

                    return (
                        <div
                            key={item.category}
                            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 transition-colors"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg}`}
                                >
                                    <item.icon
                                        className={item.iconColor}
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {item.category}
                                    </h3>

                                    {item.budget === 0 && (
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            Budget not configured
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Details */}

                            <div className="space-y-2 text-sm">

                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Budget</span>

                                    {manageMode || editingCategory === item.category ? (
                                        <input
                                            type="number"
                                            value={budgetInputs[item.category] ?? ""}
                                            onChange={(e) =>
                                                setBudgetInputs((prev) => ({
                                                    ...prev,
                                                    [item.category]: e.target.value,
                                                }))
                                            }
                                            className="w-28 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-right bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        />
                                    ) : (
                                        <span className="font-semibold text-gray-900 dark:text-whit">
                                            {item.budget === 0
                                                ? "Not Set"
                                                : `₹${item.budget?.toLocaleString()}`}
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Spent
                                    </span>

                                    <span className="text-red-500 font-semibold">
                                        {item.spent.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Remaining
                                    </span>

                                    <span
                                        className={
                                            remaining >= 0
                                                ? "text-green-500 font-semibold"
                                                : "text-red-500 font-semibold"
                                        }
                                    >
                                        {item.budget === 0
                                            ? "—"
                                            : `${remaining.toLocaleString()}`}
                                    </span>
                                </div>
                            </div>

                            {/* Progress */}

                            {item.budget > 0 && (
                                <div className="mt-4">
                                    <div className="flex justify-between mb-1 text-sm text-gray-700 dark:text-gray-300">
                                        <span>Usage</span>

                                        <span>{percentage}%</span>
                                    </div>

                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${getProgressColor(
                                                percentage
                                            )}`}
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Button */}

                            {editingCategory === item.category ? (
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <button
                                        onClick={() => handleSave(item.category)}
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                                >
                                    <Pencil size={16} />
                                    {item.budget === 0 ? "Set Budget" : "Edit Budget"}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div >
    );
};

export default CategoryBudgetTable;