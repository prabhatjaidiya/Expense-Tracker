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

  const [range, setRange] = useState(6);

  const chartData = useMemo(() => {
    return monthlyExpenseData.slice(-range);
  }, [monthlyExpenseData, range]);


  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Monthly Expense
          </h2>

          <p className="text-gray-500 text-sm">
            Recent months
          </p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="border rounded-lg w-min px-3 py-2 text-sm outline-none cursor-pointer"
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