import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";

const BudgetSummary = () => {
  const { monthlyBudget, transactions } = useContext(ExpenseContext);

  const totalSpent = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = monthlyBudget - totalSpent;

  const percentage =
    monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  let progressColor = "bg-green-500";
  let status = "✅ You're within budget";

  if (percentage >= 70) {
    progressColor = "bg-yellow-500";
    status = "⚠️ You've used over 70% of your budget";
  }

  if (percentage >= 90) {
    progressColor = "bg-red-500";
    status = "❌ Budget almost exhausted";
  }

  if (percentage > 100) {
    progressColor = "bg-red-700";
    status = "🚨 Budget exceeded";
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Budget Summary</h2>

        <span className="text-sm font-semibold">
          {percentage.toFixed(0)}%
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center mb-5">
        <div>
          <p className="text-gray-500 text-sm">Budget</p>
          <h3 className="font-bold text-xl">
            ₹{monthlyBudget.toLocaleString("en-IN")}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Spent</p>
          <h3 className="font-bold text-red-600 text-xl">
            ₹{totalSpent.toLocaleString("en-IN")}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Remaining</p>
          <h3 className="font-bold text-green-600 text-xl">
            ₹{remaining.toLocaleString("en-IN")}
          </h3>
        </div>
      </div>

      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`${progressColor} h-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <p className="mt-4 text-sm font-medium">{status}</p>
    </div>
  );
};

export default BudgetSummary;