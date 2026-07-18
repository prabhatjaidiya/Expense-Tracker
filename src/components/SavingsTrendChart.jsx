import { useContext, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ExpenseContext from "../context/ExpenseContext";


const SavingsTrendChart = () => {

  const { monthlySavingsData } = useContext(ExpenseContext);

  const currentSavings =
    monthlySavingsData[monthlySavingsData.length - 1]?.savings || 0;

  const previousSavings =
    monthlySavingsData[monthlySavingsData.length - 2]?.savings || 0;

  const savingsChange =
    previousSavings === 0
      ? 0
      : ((currentSavings - previousSavings) / previousSavings) * 100;

  const chartColor = currentSavings >= 0 ? "#22C55E" : "#EF4444";

  const [range, setRange] = useState(6);

  const chartData = useMemo(() => {
    return monthlySavingsData.slice(-range);
  }, [monthlySavingsData, range]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4">
          <p className="text-gray-600 border-b pb-2 mb-2">
            {label}
          </p>

          <p className="text-green-600 font-bold">
            ₹ {payload[0].value.toLocaleString("en-IN")}
          </p>
        </div>
      );
    }



    return null;
  };

  if (!monthlySavingsData.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-500">
        No savings data available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Savings Trend
          </h2>

          <p className="text-gray-500 text-sm">
            Recent Months
          </p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="border rounded-lg px-3 w-min py-2 text-sm outline-none cursor-pointer"
        >
          <option value={1}>This Month</option>
          <option value={3}>Last 3 Months</option>
          <option value={6}>Last 6 Months</option>
          <option value={12}>Last 12 Months</option>
        </select>

      </div>

      <div className="w-full h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}>

            <defs>

              <linearGradient
                id="savingsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor={chartColor}
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor={chartColor}
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4" />

            <XAxis dataKey="month"
              tickLine={false}
              axisLine={false} />

            <YAxis
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              tickLine={false}
              axisLine={false} />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="savings"
              stroke={chartColor}
              strokeWidth={3}
              fill="url(#savingsGradient)"
              dot={{
                r: 4,
                fill: "#22C55E",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#22C55E",
              }}
              animationDuration={1000}
            />

          </AreaChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default SavingsTrendChart;