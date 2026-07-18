import React, { useContext, useMemo, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import ExpenseContext from "../context/ExpenseContext";

const ExpenseCategoryChart = () => {
    const { transactions } = useContext(ExpenseContext);

    const COLORS = [
        "#22C55E",
        "#2563EB",
        "#7C3AED",
        "#F59E0B",
        "#EC4899",
        "#06B6D4",
        "#6B7280",
        "#EF4444",
        "#14B8A6",
    ];

    const [range, setRange] = useState(6);

    const filteredTransactions = useMemo(() => {
        const today = new Date();

        const startDate = new Date(
            today.getFullYear(),
            today.getMonth() - (range - 1),
            1
        );

        return transactions.filter((transaction) => {
            if (transaction.type !== "expense") return false;

            const transactionDate = new Date(transaction.date);

            return transactionDate >= startDate && transactionDate <= today;
        });
    }, [transactions, range]);

    const pieData = useMemo(() => {
        const categoryMap = {};

        filteredTransactions.forEach((transaction) => {
            categoryMap[transaction.category] =
                (categoryMap[transaction.category] || 0) + transaction.amount;
        });

        return Object.entries(categoryMap)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [filteredTransactions]);


    const chartData = useMemo(() => {
        const total = pieData.reduce((sum, item) => sum + item.value, 0);

        return pieData.map((item) => ({
            ...item,
            percentage:
                total > 0
                    ? ((item.value / total) * 100).toFixed(1) + "%"
                    : "0%",
        }));
    }, [pieData]);

    const totalExpense = chartData.reduce(
        (sum, item) => sum + item.value,
        0
    );

    return (
        <div className="bg-white w-full lg:w-1/2 rounded-2xl shadow-md border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-800">
                    Expense by Category
                </h2>

                <select
                    value={range}
                    onChange={(e) => setRange(Number(e.target.value))}
                    className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
                >
                    <option value={1}>This Month</option>
                    <option value={1}>This Month</option>
                    <option value={3}>Last 3 Months</option>
                    <option value={6}>Last 6 Months</option>
                    <option value={12}>Last 12 Months</option>
                </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Chart */}
                <div className="relative h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                innerRadius={75}
                                outerRadius={105}
                                paddingAngle={2}
                                cornerRadius={6}
                                stroke="#fff"
                                strokeWidth={2}
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                        <p className="text-sm text-gray-500">
                            Total Expense
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900">
                            ₹{totalExpense.toLocaleString("en-IN")}
                        </h2>
                    </div>
                </div>

                {/* Legend */}
                <div className="space-y-4">
                    {chartData.map((item, index) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: COLORS[index % COLORS.length],
                                    }}
                                />

                                <span className="text-sm text-gray-700">
                                    {item.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-5">
                                <span className="font-medium text-gray-800">
                                    ₹{item.value.toLocaleString("en-IN")}
                                </span>

                                <span className="w-12 text-right text-sm text-gray-500">
                                    {item.percentage}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExpenseCategoryChart;