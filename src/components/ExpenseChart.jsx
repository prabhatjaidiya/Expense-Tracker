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
import { useContext } from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3">
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-blue-600 font-bold text-lg">
          ₹ {payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }

  return null;
};

const ExpenseChart = () => {

  const { monthlyExpenseData } = useContext(ExpenseContext);
  const currentMonthExpense = monthlyExpenseData[monthlyExpenseData.length - 1]?.expense || 0;

  const previousMonthExpense = monthlyExpenseData[monthlyExpenseData.length - 2]?.expense || 0;

  const expenseChange =
    previousMonthExpense === 0
      ? 0
      : ((currentMonthExpense - previousMonthExpense) /
        previousMonthExpense) *
      100;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Monthly Expense
          </h2>

          <p className="text-gray-500 text-sm">
            Last 6 months
          </p>
        </div>

        <div
          className={`px-4 py-2 rounded-full w-min font-semibold ${expenseChange >= 0
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
            }`}
        >
          {expenseChange >= 0 ? "+" : ""}
          {expenseChange.toFixed(1)}%
        </div>

      </div>

      {/* Chart */}
      <div className="w-full h-[280px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={monthlyExpenseData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}>

            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false} />

            <YAxis
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
                stroke: "#fff",
              }}
              activeDot={{
                r: 7,
                fill: "#2563EB",
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