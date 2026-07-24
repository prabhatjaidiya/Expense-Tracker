import { useContext, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ExpenseContext from "../context/ExpenseContext";
import ThemeContext from "../context/ThemeContext";

const IncomeExpenseChart = () => {

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const { monthlyIncomeExpenseData } = useContext(ExpenseContext);

  const [range, setRange] = useState(6);

  const chartData = useMemo(() => {
    return monthlyIncomeExpenseData.slice(-range);
  }, [monthlyIncomeExpenseData, range]);

  const themeColors = {
    grid: isDark ? "#374151" : "#E5E7EB",
    axis: isDark ? "#9CA3AF" : "#6B7280",

    tooltipBg: isDark ? "#1F2937" : "#FFFFFF",
    tooltipBorder: isDark ? "#374151" : "#E5E7EB",
    tooltipText: isDark ? "#F9FAFB" : "#111827",

    legend: isDark ? "#D1D5DB" : "#374151",
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const income =
        payload.find((item) => item.dataKey === "Income")?.value || 0;

      const expense =
        payload.find((item) => item.dataKey === "Expense")?.value || 0;

      return (
        <div
          className="rounded-xl shadow-lg p-4"
          style={{
            backgroundColor: themeColors.tooltipBg,
            border: `1px solid ${themeColors.tooltipBorder}`,
          }}
        >
          <p
            className="font-medium border-b pb-2 mb-2"
            style={{ color: themeColors.tooltipText }}
          >
            {label}
          </p>

          <div className="space-y-2">
            <p className="text-green-500 font-semibold">
              Income: ₹ {income.toLocaleString("en-IN")}
            </p>

            <p className="text-red-500 font-semibold">
              Expense: ₹ {expense.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white text-black dark:border border-gray-200 dark:bg-gray-900 dark:border-gray-800 dark:text-white rounded-2xl shadow-md p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold dark:text-gray-200 text-gray-800">
            Income vs Expense
          </h2>

          <p className="text-gray-500 text-sm">
            Monthly comparison
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
      <div className="w-full h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}
            barGap={8}
            barCategoryGap="25%">
            <CartesianGrid
              stroke={themeColors.grid}
              strokeDasharray="4 4"
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

            <Legend
              iconType="circle"
              wrapperStyle={{
                color: themeColors.legend,
              }}
            />

            <Bar
              dataKey="Income"
              barSize={24}
              name="Income"
              fill="#22C55E"
              radius={[8, 8, 0, 0]}
              animationBegin={200}
              animationDuration={1000}
            />

            <Bar
              dataKey="Expense"
              barSize={24}
              name="Expense"
              fill="#EF4444"
              radius={[8, 8, 0, 0]}
              animationBegin={400}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;