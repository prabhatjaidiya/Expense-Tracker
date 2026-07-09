import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Statcard from '../components/Statcard'
import ExpenseChart from '../components/ExpenseChart';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import ExpenseCategoryChart from '../components/ExpenseCategoryChart';
import SavingsTrendChart from '../components/SavingsTrendChart';
import RecentTransactions from '../components/RecentTransactions';
import ExpenseContext from '../context/ExpenseContext';

const Dashboard = () => {
  const { balance, totalIncome, totalExpense } = useContext(ExpenseContext);
  return (
    <div>
      <h1 className='ml-6 text-3xl mb-4 font-semibold'>Welcome back, Prabhat! 👋</h1>
      <span className='ml-10 font-md'>here's your financial overview</span>
      <div className='flex justify-between px-10 mt-5'>
        <Statcard heading="Total Balance" amount={balance} bg='#EEF4FF' icon={<img src='./src/assets/icons/wallet.png' className='w-14 h-14 rounded-3xl'/>} parcent="12.5"/>
        <Statcard heading="Income" amount={totalIncome} bg="#ECFDF3" icon={<img src='./src/assets/icons/income.png' className='w-14 h-14 rounded-3xl'/>} parcent="8.3"/>
        <Statcard heading="Expense" amount={totalExpense} bg="#FEF2F2" icon={<img src='./src/assets/icons/expense.png' className='w-14 h-14 rounded-3xl'/>} parcent="15.7"/>
        <Statcard heading="Savings" amount={balance} bg='#F5F3FF' icon={<img src='./src/assets/icons/saving.png' className='w-14 h-14 rounded-3xl'/>} parcent="10.2"/>
      </div>
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
