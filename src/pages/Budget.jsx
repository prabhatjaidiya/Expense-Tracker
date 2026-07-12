import React, { useContext } from 'react'
import ExpenseContext from '../context/ExpenseContext';

const Budget = () => {
    const { monthlyBudget, categoryBudgets, updateMonthlyBudget, resetMonthlyBudget, updateCategoryBudget } = useContext(ExpenseContext)

  return (
    <div>
      Budget
    </div>
  )
}

export default Budget
