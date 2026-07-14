import React, { useContext } from 'react'
import BudgetCard from '../components/BudgetCard';
import BudgetMsgCard from '../components/BudgetMsgCard';
import BudgetForm from '../components/BudgetForm';

const Budget = () => {

  return (
    <div>
      <BudgetCard />
      <BudgetMsgCard />
      <BudgetForm />
    </div>
  )
}

export default Budget
