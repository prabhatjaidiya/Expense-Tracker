import { useContext } from "react";
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

    
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Income vs Expense
          </h2>

          <p className="text-gray-500 text-sm">
            Monthly comparison
          </p>
        </div>

        <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
          2026
        </div>

      </div>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={monthlyIncomeExpenseData}>

          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="Income"
            fill="#22C55E"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="Expense"
            fill="#EF4444"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default IncomeExpenseChart;