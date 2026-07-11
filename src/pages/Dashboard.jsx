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
import CategoryCard from '../components/CategoryCard';
import AnalyticsCards from '../components/AnalyticsCards';
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";
import { MdOutlineSavings } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi2";

const Dashboard = () => {
  const { transactions, highestExpense, highestIncome, averageMonthlyExpense, averageMonthlyIncome, } = useContext(ExpenseContext);

  const maxExpense = `₹ ${highestExpense?.amount?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}`;
  const maxIncome = `₹ ${highestIncome?.amount?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}`;
  const avgExpense = `₹ ${averageMonthlyExpense.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const avgIncome = `₹ ${averageMonthlyIncome.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (transactions.length === 0) {
    return (
      <>
        <Hero />
        <EmptyState />
      </>
    );
  }

  return (
    <div>
      <Hero />
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-1/2 p-6'>
          <ExpenseChart />
        </div>
        <div className="w-full lg:w-1/2 p-6">
          <IncomeExpenseChart />
        </div>
        <div className='w-full lg:w-1/2 p-6'>
          <ExpenseCategoryChart />
        </div>
        <div className='w-full lg:w-1/2 p-6'>
          <SavingsTrendChart />
        </div>
        <div className='w-full lg:w-2/5 p-6'>
          <CategoryCard />
        </div>
        <div className='w-full lg:w-3/5 p-6'>
          <RecentTransactions />
        </div>
        <div className="w-full p-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <AnalyticsCards
              icon={
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <FaArrowTrendUp className="text-2xl text-green-600" />
                </div>
              }
              title="Highest Income"
              amount={maxIncome}
              description="Largest income transaction"
            />

            <AnalyticsCards
              icon={
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <FaArrowTrendDown className="text-2xl text-red-600" />
                </div>
              }
              title="Highest Expense"
              amount={maxExpense}
              description="Largest expense transaction"
            />

            <AnalyticsCards
              icon={
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <HiOutlineChartBar className="text-2xl text-orange-600" />
                </div>
              }
              title="Average Monthly Expense"
              amount={avgExpense}
              description="Average spending per active month"
            />

            <AnalyticsCards
              icon={
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <MdOutlineSavings className="text-2xl text-blue-600" />
                </div>
              }
              title="Average Monthly Income"
              amount={avgIncome}
              description="Average income per active month"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard