import React, { useContext } from 'react'
import BudgetCard from '../components/BudgetCard';
import BudgetMsgCard from '../components/BudgetMsgCard';
import BudgetForm from '../components/BudgetForm';
import BudgetAlert from '../components/BudgetAlert';
import CategoryBudgetCard from '../components/CategoryBudgetCard';
import BudgetInsights from '../components/BudgetInsights';

const Budget = () => {

  return (
    <div>
      <BudgetCard />
      <BudgetMsgCard />
      <CategoryBudgetCard />
      <div className='flex flex-col lg:flex-row gap-4 mt-4'>
        <div className="flex flex-col lg:flex-row gap-4 mt-4">
        <BudgetAlert />
      </div>
      <div className='flex flex-1'>
        <BudgetInsights />
      </div>
      </div>
    </div>
  )
}

export default Budget
