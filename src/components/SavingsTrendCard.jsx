import React, { useContext, useMemo, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { ChevronDown, TrendingUp } from "lucide-react";
import ExpenseContext from "../context/ExpenseContext";
import ThemeContext from "../context/ThemeContext";

const SavingsTrendCard = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const { monthlySavingsData } = useContext(ExpenseContext);

    const [range, setRange] = useState(6);

    const chartData = useMemo(() => {
        return monthlySavingsData.slice(-range);
    }, [monthlySavingsData, range]);

    const colors = {
        axis: isDark ? "#9CA3AF" : "#6B7280",
        tooltipBg: isDark ? "#1F2937" : "#FFFFFF",
        tooltipBorder: isDark ? "#374151" : "#E5E7EB",
        tooltipText: isDark ? "#F9FAFB" : "#111827",
        gradientStart: isDark ? "#A78BFA" : "#8B5CF6",
        gradientEnd: isDark ? "#A78BFA" : "#8B5CF6",
    };

    const savingsChange = useMemo(() => {
        if (chartData.length < 2) return 0;

        const current = chartData[chartData.length - 1].savings;
        const previous = chartData[chartData.length - 2].savings;

        if (previous === 0) return current > 0 ? 100 : 0;

        return (
            ((current - previous) / Math.abs(previous)) *
            100
        ).toFixed(1);
    }, [chartData]);

    const averageSavings = useMemo(() => {
        if (!chartData.length) return 0;

        return Math.round(
            chartData.reduce((sum, item) => sum + item.savings, 0) /
            chartData.length
        );
    }, [chartData]);

    const trendColor =
        savingsChange > 0
            ? "text-green-500"
            : savingsChange < 0
                ? "text-red-500"
                : "text-gray-500";

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-5 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                    Monthly Savings Trend
                </h2>

                <select
                    value={range}
                    onChange={(e) => setRange(Number(e.target.value))}
                    className="border border-gray-300 dark:border-gray-700
                                bg-white dark:bg-gray-800
                                text-gray-900 dark:text-gray-100
                                rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
                >
                    <option value={1}>This Month</option>
                    <option value={3}>Last 3 Months</option>
                    <option value={6}>Last 6 Months</option>
                    <option value={12}>Last 12 Months</option>
                </select>
            </div>

            {/* Chart */}
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="purple" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor={colors.gradientStart}
                                    stopOpacity={0.35}
                                />
                                <stop
                                    offset="100%"
                                    stopColor={colors.gradientEnd}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="month"
                            tick={{
                                fill: colors.axis,
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{
                                fill: colors.axis,
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `₹${value / 1000}k`}
                        />

                        <Tooltip
                            contentStyle={{
                                background: colors.tooltipBg,
                                border: `1px solid ${colors.tooltipBorder}`,
                                borderRadius: "12px",
                                color: colors.tooltipText,
                            }}
                            formatter={(value) => [
                                `₹${Number(value).toLocaleString("en-IN")}`,
                                "Savings",
                            ]}
                        />

                        <Area
                            type="monotone"
                            dataKey="savings"
                            stroke={colors.gradientStart}
                            strokeWidth={3}
                            fill="url(#purple)"
                            dot={{
                                fill: colors.gradientStart,
                                stroke: isDark ? "#111827" : "#FFFFFF",
                                strokeWidth: 2,
                                r: 4,
                            }}
                            activeDot={{
                                r: 6,
                                fill: colors.gradientStart,
                                stroke: isDark ? "#111827" : "#FFFFFF",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="mt-6 rounded-2xl
                            bg-gradient-to-r
                            from-purple-50 to-gray-50
                            dark:from-purple-900/20 dark:to-gray-800
                            border border-gray-200 dark:border-gray-700
                            p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full
                                    bg-purple-100 dark:bg-purple-900/40
                                    flex items-center justify-center">
                        <TrendingUp className="text-purple-600 dark:text-purple-400" size={22} />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Average Monthly Savings
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            ₹ {averageSavings.toLocaleString("en-IN")}
                        </h2>
                    </div>
                </div>

                <div className="text-right">
                    <p className={`${trendColor} font-semibold`}>
                        {savingsChange > 0
                            ? "↑"
                            : savingsChange < 0
                                ? "↓"
                                : "→"}{" "}
                        {Math.abs(savingsChange)}%
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {range === 1
                            ? "Current month"
                            : range === 3
                                ? "Compared to previous month"
                                : range === 6
                                    ? "Last 6 months"
                                    : "Last 12 months"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SavingsTrendCard;