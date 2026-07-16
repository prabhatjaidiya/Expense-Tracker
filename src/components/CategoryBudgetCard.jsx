import React, { useContext, useState, useRef, useEffect } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { Check, Pencil, Settings, X } from "lucide-react";

const CategoryBudgetTable = () => {
    const { categoryBudgetSummary, setCategoryBudgets } = useContext(ExpenseContext);
    console.log(categoryBudgetSummary);

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

        setCategoryBudgets((prev) => ({
            ...prev,
            [category]: newBudget,
        }));

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
        const updatedBudgets = {};

        Object.keys(budgetInputs).forEach((category) => {
            updatedBudgets[category] = Math.max(
                0,
                Number(budgetInputs[category]) || 0
            );
        });

        setCategoryBudgets(updatedBudgets);
        setManageMode(false);
    };

    const hasChanges = categoryBudgetSummary.some(
        (item) =>
            Number(budgetInputs[item.category] ?? item.budget) !== item.budget
    );

    if (!categoryBudgetSummary.length) {
        return (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
                No category budgets found.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden m-2">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between p-6 border-b">
                <h2 className="text-2xl font-bold">Category Budgets</h2>

                {manageMode ? (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveAll}
                            disabled={!hasChanges}
                            className={`px-4 py-2 text-sm rounded-xl transition
                            ${hasChanges
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            Save All
                        </button>

                        <button
                            onClick={() => {
                                setManageMode(false);
                                setBudgetInputs({});
                            }}
                            className="px-4 py-2 text-sm border rounded-xl"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setManageMode(true)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-100"
                    >
                        <Settings size={18} />
                        Manage Categories
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b">
                        <tr className="text-left text-gray-600">
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
                                    className={`border-b last:border-none hover:bg-gray-50 ${item.budget === 0 ? "opacity-70" : ""
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
                                                <p className="font-medium text-lg">{item.category}</p>

                                                {item.budget === 0 && (
                                                    <p className="text-xs text-gray-400">
                                                        Budget not configured
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Budget */}
                                    <td className="font-semibold">
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
                                                className="w-28 border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : item.budget === 0 ? (
                                            <span className="text-gray-400">Not Set</span>
                                        ) : (
                                            `₹${item.budget.toLocaleString()}`
                                        )}
                                    </td>

                                    {/* Spent */}
                                    <td className="font-semibold text-red-500">
                                        {item.spent.toLocaleString()}
                                    </td>

                                    {/* Remaining */}
                                    <td className="font-semibold">
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
                                            <span className="text-sm text-gray-400">No Budget</span>
                                        ) : (
                                            <div className="flex items-center gap-4 min-w-[220px]">
                                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${getProgressColor(percentage)}`}
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>

                                                <span className="w-10">{Math.min(percentage, 100)}%</span>
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
                            className="bg-white rounded-xl border shadow-sm p-4"
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
                                    <h3 className="font-semibold">
                                        {item.category}
                                    </h3>

                                    {item.budget === 0 && (
                                        <p className="text-xs text-gray-400">
                                            Budget not configured
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Details */}

                            <div className="space-y-2 text-sm">

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Budget</span>

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
                                            className="w-28 border rounded-lg px-2 py-1 text-right"
                                        />
                                    ) : (
                                        <span className="font-semibold">
                                            {item.budget === 0
                                                ? "Not Set"
                                                : `₹${item.budget.toLocaleString()}`}
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Spent
                                    </span>

                                    <span className="text-red-500 font-semibold">
                                        {item.spent.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
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
                                    <div className="flex justify-between mb-1 text-sm">
                                        <span>Usage</span>

                                        <span>{percentage}%</span>
                                    </div>

                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
                                        className="bg-green-500 text-white py-2 rounded-lg"
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-200 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 rounded-lg py-2"
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