import React, { useContext, useMemo, useState } from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import ExpenseContext from "../context/ExpenseContext";

const IncomeExpenseTrend = () => {
    const { monthlyIncomeExpenseData } = useContext(ExpenseContext);

    const [range, setRange] = useState(6);

    const chartData = useMemo(() => {
        return monthlyIncomeExpenseData.slice(-range);
    }, [monthlyIncomeExpenseData, range]);

    return (
        <div className="bg-white w-full lg:w-1/2 rounded-2xl shadow-md mb-4 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Income vs Expense Trend
                    </h2>

                    <div className="flex gap-5 mt-3 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                            <span className="text-gray-500">Income</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            <span className="text-gray-500">Expense</span>
                        </div>
                    </div>
                </div>

                <select
                    value={range}
                    onChange={(e) => setRange(Number(e.target.value))}
                    className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
                >
                    <option value={1}>This Month</option>
                    <option value={3}>Last 3 Months</option>
                    <option value={6}>Last 6 Months</option>
                    <option value={12}>Last 12 Months</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height={340}>
                <ComposedChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>

                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                    />

                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        domain={[0, "dataMax + 20000"]}
                        tickFormatter={(value) =>
                            `₹${(value / 1000).toFixed(0)}k`
                        }
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "#fff",
                            borderRadius: "10px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,.1)",
                        }}
                        formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
                    />

                    {/* Gradient Areas */}
                    <Area
                        type="monotone"
                        dataKey="Income"
                        fill="url(#incomeGradient)"
                        stroke="none"
                    />

                    <Area
                        type="monotone"
                        dataKey="Expense"
                        fill="url(#expenseGradient)"
                        stroke="none"
                    />

                    {/* Lines */}
                    <Line
                        type="natural"
                        dataKey="Income"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            fill: "#10B981",
                            stroke: "#fff",
                            strokeWidth: 2,
                        }}
                        activeDot={{ r: 6 }}
                    />

                    <Line
                        type="natural"
                        dataKey="Expense"
                        stroke="#EF4444"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            fill: "#EF4444",
                            stroke: "#fff",
                            strokeWidth: 2,
                        }}
                        activeDot={{ r: 6 }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div >
    );
};

export default IncomeExpenseTrend;