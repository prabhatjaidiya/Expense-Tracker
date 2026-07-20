import React, { useContext } from "react";
import { PieChart, Pie, Cell } from "recharts";
import ExpenseContext from "../context/ExpenseContext";

const ReportSummary = () => {
    const { totalIncome, totalExpense, totalBalance, totalTransaction } = useContext(ExpenseContext)
    const total = totalBalance + totalExpense + totalIncome;
    const BalancePercent = (totalBalance / total) * 100;
    const IncomePercent = (totalIncome / total) * 100;
    const ExpensePercent = (totalExpense / total) * 100;


    const data = [
        { name: "Income", value: IncomePercent, color: "#22C55E" },
        { name: "Expense", value: ExpensePercent, color: "#FF5A5F" },
        { name: "Balance", value: BalancePercent, color: "#3B82F6" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
                Report Summary
            </h2>

            <div className="flex items-center justify-between gap-6">
                {/* Donut Chart */}
                <div className="relative flex items-center justify-center">
                    <PieChart width={150} height={150}>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={42}
                            outerRadius={60}
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={2}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>

                    {/* Center Text */}
                    <div className="absolute text-center">
                        <h2 className="text-3xl font-bold text-gray-800">{totalTransaction}</h2>
                        <p className="text-xs text-gray-500">Transactions</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-sm font-medium text-gray-700">
                                Income
                            </span>
                        </div>

                        <p className="ml-5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                            ₹ {totalIncome.toLocaleString("en-IN")}
                            <span className="ml-1 text-gray-500 font-normal">({IncomePercent}%)</span>
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            <span className="text-sm font-medium text-gray-700">
                                Expense
                            </span>
                        </div>

                        <p className="ml-5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                            ₹ {totalExpense.toLocaleString("en-IN")}
                            <span className="text-gray-500 font-normal ml-1">({ExpensePercent.toFixed(2)}%)</span>
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span className="text-sm font-medium text-gray-700">
                                Balance
                            </span>
                        </div>

                        <p className="ml-5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                            ₹ {totalBalance.toLocaleString("en-IN")}
                            <span className="text-gray-500 font-normal ml-1">({BalancePercent.toFixed(2)}%)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportSummary;