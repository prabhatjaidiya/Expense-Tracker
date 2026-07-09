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
          ₹ {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const ExpenseChart = () => {
  
  const { monthlyExpenseData } = useContext(ExpenseContext);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Monthly Expense
          </h2>

          <p className="text-gray-500 text-sm">
            Last 6 months
          </p>
        </div>

        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
          +8.2%
        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={monthlyExpenseData}>

          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis  />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#2563EB"
            strokeWidth={4} />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ExpenseChart;