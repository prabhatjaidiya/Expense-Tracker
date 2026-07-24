import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ExpenseContext from "../context/ExpenseContext";
import { useContext, useMemo, useState } from "react";
import ThemeContext from "../context/ThemeContext";

const ExpenseChart = () => {

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const { monthlyExpenseData } = useContext(ExpenseContext);
  const currentMonthExpense = monthlyExpenseData[monthlyExpenseData.length - 1]?.expense || 0;

  const previousMonthExpense = monthlyExpenseData[monthlyExpenseData.length - 2]?.expense || 0;

  const expenseChange =
    previousMonthExpense === 0
      ? 0
      : ((currentMonthExpense - previousMonthExpense) /
        previousMonthExpense) *
      100;

  const [range, setRange] = useState(6);

  const chartData = useMemo(() => {
    return monthlyExpenseData.slice(-range);
  }, [monthlyExpenseData, range]);

  const themeColors = {
    grid: isDark ? "#374151" : "#E5E7EB",
    axis: isDark ? "#9CA3AF" : "#6B7280",

    tooltipBg: isDark ? "#1F2937" : "#FFFFFF",
    tooltipBorder: isDark ? "#374151" : "#E5E7EB",
    tooltipText: isDark ? "#F9FAFB" : "#111827",

    dotStroke: isDark ? "#111827" : "#FFFFFF",
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="rounded-xl shadow-lg p-3"
          style={{
            backgroundColor: themeColors.tooltipBg,
            border: `1px solid ${themeColors.tooltipBorder}`,
          }}
        >
          <p
            className="text-sm"
            style={{ color: themeColors.tooltipText }}
          >
            {label}
          </p>

          <p className="text-blue-500 font-bold text-lg">
            ₹ {payload[0].value.toLocaleString("en-IN")}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white text-black dark:border border-gray-200 dark:bg-gray-900 dark:border-gray-800 dark:text-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Monthly Expense
          </h2>

          <p className="text-gray-500 text-sm">
            Recent months
          </p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="border text-black border-gray-200 dark:bg-gray-900 dark:border-gray-800 dark:text-white rounded-lg w-min px-3 py-2 text-sm outline-none cursor-pointer"
        >
          <option value={1}>This Month</option>
          <option value={3}>Last 3 Months</option>
          <option value={6}>Last 6 Months</option>
          <option value={12}>Last 12 Months</option>
        </select>

      </div>

      {/* Chart */}
      <div className="w-full h-[280px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}>

            <CartesianGrid
              stroke={themeColors.grid}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: themeColors.axis }}
              tickLine={false}
              axisLine={false} />

            <YAxis
              tick={{ fill: themeColors.axis }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              tickLine={false}
              axisLine={false} />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#2563EB",
                strokeWidth: 2,
                stroke: themeColors.dotStroke,
              }}
              activeDot={{
                r: 7,
                fill: "#2563EB",
                stroke: themeColors.dotStroke,
                strokeWidth: 2,
              }}
              isAnimationActive
              animationDuration={1000} />

          </LineChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ExpenseChart;