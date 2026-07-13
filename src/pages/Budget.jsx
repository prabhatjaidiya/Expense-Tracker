import React, { useContext } from 'react'
import ExpenseContext from '../context/ExpenseContext';
import BudgetCard from '../components/BudgetCard';

const Budget = () => {
    const { monthlyBudget, categoryBudgets, updateMonthlyBudget, resetMonthlyBudget, updateCategoryBudget } = useContext(ExpenseContext)

  return (
    <div>
      <BudgetCard />
    </div>
  )
}

export default Budget
