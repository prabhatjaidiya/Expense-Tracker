import React from 'react'
import Budget from '../pages/Budget'
import BudgetProgressCircle from './BudgetProgressCircle'

const BudgetCard = () => {

  return (
    <div className='flex shadow-xl rounded-xl px-8 pb-8'>
      <div className='flex-1'>
        <div className='flex flex-1 justify-between p-6 mr-20'>
          <div>
            <h2 className='text-3xl font-semibold mb-6'>Monthly Budget</h2>
            <span className='text-5xl font-semibold'>50,000</span>
          </div>
          <div>
            <h3 className='text-2xl font-semibold my-4 text-gray-600'>Total Spent</h3>
            <span className='text-3xl font-semibold text-red-600'>31,500</span>
          </div>
          <div>
            <h3 className='text-2xl font-semibold my-4 text-gray-600'>Remaining</h3>
            <span className='text-3xl font-semibold text-green-600'>18,500</span>
          </div>
        </div>
        <div className='px-8 flex'>
          <button className='mt-2 py-2 px-5 h-min text-xl text-gray-600 hover:bg-gray-50 border border-gray-300 rounded-xl'>Edit Budget</button>
          <div className='flex-1 mx-20'>
            <div className="w-full bg-gray-100 rounded-full h-4 my-2 overflow-hidden">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700"
                style={{ width: `63%` }}
              />
            </div>
            <div className='w-full flex justify-between px-2 pt-2'>
              <span className='text-2xl'>0</span>
              <span className='text-2xl'>50,000</span>
            </div>
          </div>
        </div>
      </div>
      <BudgetProgressCircle />
    </div>
  )
}

export default BudgetCard
