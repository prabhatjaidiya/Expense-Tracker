import React from 'react'

const BudgetCard = ({ heading, amount, icon, bg }) => {
  return (
    <div style={{backgroundColor:bg}} className='p-5 w-min rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>
      <div className='flex gap-8 mb-4 items-center'>
        <div>
        <h3 className="text-base lg:text-lg font-semibold text-gray-800">{heading}</h3>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 whitespace-nowrap">{amount}</h2>
        </div>
        {icon}
      </div>
    </div>
  )
}

export default BudgetCard
