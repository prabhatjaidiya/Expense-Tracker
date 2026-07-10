import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Statcard from '../components/Statcard'
import ExpenseChart from '../components/ExpenseChart';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import ExpenseCategoryChart from '../components/ExpenseCategoryChart';
import SavingsTrendChart from '../components/SavingsTrendChart';
import RecentTransactions from '../components/RecentTransactions';
import ExpenseContext from '../context/ExpenseContext';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const { transactions } = useContext(ExpenseContext);
  if (transactions.length === 0) {
    return (
    <>
      <Hero />
      <EmptyState />
    </>
    );
  }

  return(
    <div>
      <Hero />
      <div className='flex flex-wrap'>
        <div className='w-[50%] p-12'>
          <ExpenseChart />
        </div>
        <div className="p-12 w-[50%] h-[50%]">
          <IncomeExpenseChart />
        </div>
        <div className='p-12 w-[50%] h-[50%]'>
          <ExpenseCategoryChart />
        </div>
        <div className='w-[50%] p-12'>
          <SavingsTrendChart />
        </div>
      </div>
      <div>
        <RecentTransactions />
      </div>
    </div>
  )
}

export default Dashboard