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

const IncomeExpenseChart = () => {
  const { monthlyIncomeExpenseData } = useContext(ExpenseContext);

  const [range, setRange] = useState(6);

  const chartData = useMemo(() => {
    return monthlyIncomeExpenseData.slice(-range);
  }, [monthlyIncomeExpenseData, range]);


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const income = payload.find((item) => item.dataKey === "Income")?.value || 0;
      const expense = payload.find((item) => item.dataKey === "Expense")?.value || 0;

      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <p className="text-gray-500 font-medium border-b pb-2 mb-2">
            {label}
          </p>

          <div className="space-y-2">
            <p className="text-green-600 font-semibold">
              Income: ₹ {income.toLocaleString("en-IN")}
            </p>

            <p className="text-red-600 font-semibold">
              Expense: ₹ {expense.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Income vs Expense
          </h2>

          <p className="text-gray-500 text-sm">
            Monthly comparison
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
              stroke="#E5E7EB"
              strokeDasharray="4 4" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false} />

            <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              tickLine={false}
              axisLine={false} />

            <Tooltip content={<CustomTooltip />} />

            <Legend iconType="circle" />

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