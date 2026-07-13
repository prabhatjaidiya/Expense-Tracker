import React, { useContext } from 'react'
import ExpenseContext from '../context/ExpenseContext'

const CategoryCard = () => {
  const { topSpendingCategories } = useContext(ExpenseContext)
  const medals = ["🥇", "🥈", "🥉", "", ""];
  const medalColors = [
    "text-yellow-500",
    "text-gray-400",
    "text-orange-500",
  ];



  if (!topSpendingCategories.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-500">
        No spending data available.
      </div>
    );
  }

  const highestAmount = topSpendingCategories[0].value;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Top Spending Categories
          </h2>

          <p className="text-gray-500 text-sm">
            Highest expense categories
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        {topSpendingCategories.map((item, idx) => {
          const percentage = (item.value / highestAmount) * 100;

          return (
            <div key={item.name} className='flex justify-between items-center gap-3 py-[3px]'>
              <div className='flex-1'>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                    {idx + 1}
                  </div>

                  <span className={`text-2xl ${medalColors[idx]}`}>
                    {medals[idx]}
                  </span>

                  <span className="font-semibold text-gray-800">
                    {item.name}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span className='pr-4'>{percentage.toFixed(0)}%</span>

                <span className='font-bold lg:text-lg whitespace-nowrap'>
                  ₹ {item.value.toLocaleString("en-IN")}
                </span>
              </div>
            </div>)
        })}
      </div>
    </div>
  )
}

export default CategoryCard
