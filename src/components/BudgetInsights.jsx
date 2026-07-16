import React, { useContext } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Lightbulb } from "lucide-react";
import ExpenseContext from "../context/ExpenseContext";

const BudgetInsights = () => {
  const {
    budgetSummary,
    categoryBudgetSummary
  } = useContext(ExpenseContext);


  const totalUsed = Math.min(Math.round(budgetSummary.percentage), 100);

  const actualPercentage = Math.round(budgetSummary.percentage || 0);

  const chartPercentage = Math.min(actualPercentage, 100);

  const onTrack = categoryBudgetSummary.filter(
    item => item.percentage < 80
  ).length;

  const atRisk = categoryBudgetSummary.filter(
    item => item.percentage >= 80 && item.percentage <= 100
  ).length;

  const overBudget = categoryBudgetSummary.filter(
    item => item.percentage > 100
  ).length;

  const status = [
    {
      label: "On Track",
      count: onTrack,
      color: "bg-green-500",
    },
    {
      label: "At Risk",
      count: atRisk,
      color: "bg-yellow-400",
    },
    {
      label: "Over Budget",
      count: overBudget,
      color: "bg-red-500",
    },
  ];



  let insight = "";

  if (overBudget > 0) {
    insight = `You have ${overBudget} over-budget ${overBudget === 1 ? "category" : "categories"
      }. Reduce spending immediately.`;
  } else if (atRisk > 0) {
    insight = `${atRisk} ${atRisk === 1 ? "category is" : "categories are"
      } close to the budget limit.`;
  } else if (onTrack > 0) {
    insight = "Excellent! All your category budgets are on track.";
  } else {
    insight = "Create category budgets to receive insights.";
  }

  const percentageColor =
    budgetSummary.percentage > 100
      ? "text-red-500"
      : budgetSummary.percentage >= 80
        ? "text-yellow-500"
        : "text-green-500";

  const chartData = [
    { name: "On Track", value: onTrack, color: "#22c55e" },
    { name: "At Risk", value: atRisk, color: "#facc15" },
    { name: "Over Budget", value: overBudget, color: "#ef4444" },
  ];

  const hasData = chartData.some(item => item.value > 0);

  return (
    <div className="flex flex-col flex-1 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Budget Insights
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Donut Chart */}
        <div className="relative w-[220px] h-[220px]">

          {hasData ? (
            <PieChart width={220} height={220}>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={72}
                outerRadius={94}
                startAngle={90}
                endAngle={-270}
                cornerRadius={8}
                paddingAngle={4}
                isAnimationActive
                animationDuration={1200}
              >
                {chartData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <div className="w-[220px] h-[220px] flex items-center justify-center rounded-full border-8 border-gray-200">
              <span className="text-gray-400">No Data</span>
            </div>
          )}

          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className={`text-5xl font-bold ${percentageColor}`}>
              {totalUsed}%
            </h1>
            <p className="text-gray-500 font-medium">
              Total Used
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex-1 w-full space-y-6">
          {status.map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-5 h-3 rounded-full ${item.color}`}
                />
                <span className="text-lg font-medium">
                  {item.label}
                </span>
              </div>

              <span className="text-gray-500">
                {item.count}{" "}
                {item.count === 1 ? "Category" : "Categories"}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Insight Card */}

      <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-5 flex gap-4">

        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
          <Lightbulb
            className="text-yellow-500"
            size={24}
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Insight
          </h3>

          <p className="text-gray-600 mt-1 leading-7">
            {insight}
          </p>
        </div>

      </div>

    </div>
  );
};

export default BudgetInsights;