import { useContext } from "react";
import BudgetProgressCircle from './BudgetProgressCircle'
import ExpenseContext from '../context/ExpenseContext';
import { Wallet } from "lucide-react";

const BudgetCard = () => {
  const { budgetSummary,monthlyBudget } = useContext(ExpenseContext);
  const totalSpent = budgetSummary.spent;

  const remaining = budgetSummary.remaining;

  const percentage = budgetSummary.percentage;

  const overBudget = budgetSummary.overBudget;
  const exceededBy = budgetSummary.exceededBy;


  let progressColor = "bg-green-500";
  let Color = '#22C55E';

  if (percentage >= 70) {
    progressColor = "bg-yellow-500";
    Color = "#EAB308"
  }

  if (percentage >= 90) {
    progressColor = "bg-red-500";
    Color = "#EF4444"
  }

  if (percentage > 100) {
    progressColor = "bg-red-700";
    Color = '#B91C1C';
  }

  return (
    <div className="flex flex-col items-center xl:flex-row gap-8 border shadow-sm rounded-2xl p-6 bg-white">
      <div className='flex-1 w-full'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className='flex items-center gap-2 text-3xl font-semibold mb-6'>
              <Wallet className="text-blue-600" size={28} />
              Monthly Budget</h2>
            <span className='text-5xl font-semibold'>
              ₹{monthlyBudget.toLocaleString("en-IN")}
            </span>
          </div>
          <div>
            <h3 className='text-2xl font-semibold my-4 text-gray-600'>Total Spent</h3>
            <span className='text-3xl font-semibold text-red-600'>
              ₹{totalSpent.toLocaleString("en-IN")}
            </span>
          </div>
          <div>
            <h3 className='text-2xl font-semibold my-4 text-gray-600'>Remaining</h3>
            <span
              className={`text-3xl font-semibold ${overBudget ? "text-red-600" : "text-green-600"
                }`}
            >
              ₹{remaining.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-col lg:flex-row items-start">
          {
            monthlyBudget === 0 ? (
              <p className="text-gray-500 text-lg mt-4">
                Set a monthly budget to start tracking your spending.
              </p>
            ) : (
              <>
                <div className='flex-1 w-full lg:mr-8'>
                  <div className="w-full bg-gray-100 rounded-full h-4 my-2 overflow-hidden">
                    <div
                      className={`${progressColor} h-full transition-all duration-500`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    {overBudget ? (
                      <p className="text-red-600 font-semibold">
                        Over by ₹{exceededBy.toLocaleString("en-IN")}
                      </p>
                    ) : (
                      <p className="text-green-600 font-semibold">
                        Remaining ₹{remaining.toLocaleString("en-IN")}
                      </p>
                    )}

                    <span className="font-semibold">
                      {percentage.toFixed(0)}% Used
                    </span>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
      {monthlyBudget > 0 && (
        <BudgetProgressCircle
          percentage={percentage}
          progressColor={Color}
        />
      )}
    </div>
  )
}

export default BudgetCard
