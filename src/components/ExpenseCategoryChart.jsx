import { useContext, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import ExpenseContext from "../context/ExpenseContext";
import { useMediaQuery } from "react-responsive";

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

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [range, setRange] = useState(6);

  const chartData = useMemo(() => {
    return pieData.slice(-range);
  }, [pieData, range]);


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;

      return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4">
          <p className="font-semibold text-gray-700 border-b pb-2 mb-2">
            {name}
          </p>

          <p className="text-blue-600 font-bold">
            ₹ {value.toLocaleString("en-IN")}
          </p>
        </div>
      );
    }

    return null;
  };

  if (!pieData.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-500">
        No expense data available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md px-2 py-6">

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Expense Categories
          </h2>

          <p className="text-gray-500 text-sm">
            Spending Breakdown
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
      <div className="w-full h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 45 : 65}
              outerRadius={isMobile ? 75 : 105}
              paddingAngle={3}
              cornerRadius={8}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              activeOuterRadius={115}
              animationDuration={1000}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                paddingTop: 20,
                fontSize: "14px",
              }} />

          </PieChart>

        </ResponsiveContainer>
      </div>

    </div >
  );
};

export default ExpenseCategoryChart;