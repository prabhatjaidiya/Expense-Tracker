import { useContext } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import ExpenseContext from "../context/ExpenseContext";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
  "#F97316",
];

const ExpenseCategoryChart = () => {

  const { pieData } = useContext(ExpenseContext);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Expense Categories
          </h2>

          <p className="text-gray-500 text-sm">
            Spending Breakdown
          </p>
        </div>

      </div>

      <ResponsiveContainer width="100%" height={350}>

        <PieChart>

          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
            dataKey="value"
            nameKey="name"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ExpenseCategoryChart;