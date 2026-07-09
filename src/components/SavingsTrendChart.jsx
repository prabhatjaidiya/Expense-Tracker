import { useContext } from "react";
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
  
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Savings Trend
          </h2>

          <p className="text-gray-500 text-sm">
            Last 6 Months
          </p>
        </div>

        <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full font-semibold">
          +18.4%
        </div>

      </div>

      <ResponsiveContainer width="100%" height={350}>

        <AreaChart data={monthlySavingsData}>

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
                stopColor="#22C55E"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#22C55E"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="4 4"/>

          <XAxis dataKey="month"/>

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="savings"
            stroke="#22C55E"
            strokeWidth={4}
            fill="url(#colorSavings)"
            animationDuration={1200}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default SavingsTrendChart;