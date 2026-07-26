import React, { useContext, useEffect, useState } from 'react'
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
import BudgetWidget from '../components/BudgetWidget';
import SkeletonCard from "../components/SkeletonCard";
import PageWrapper from "../components/PageWrapper";

const Dashboard = () => {
  const { transactions, highestExpense, highestIncome, averageMonthlyExpense, averageMonthlyIncome, } = useContext(ExpenseContext);

  const maxExpense = `₹ ${highestExpense?.amount?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}`;
  const maxIncome = `₹ ${highestIncome?.amount?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}`;
  const avgExpense = `₹ ${averageMonthlyExpense.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const avgIncome = `₹ ${averageMonthlyIncome.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (transactions.length === 0) {
    return (
      <>
        <Hero />
        <EmptyState />
      </>
    );
  }
  return (
    <PageWrapper>
    <div className="space-y-6">
      <div>
        {
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 rounded-xl">
              {[...Array(4)].map((_, index) => (
                <SkeletonCard
                  key={index}
                  className="h-32 w-full rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <Hero />
          )
        }
        {
          loading ? (
            <div className='grid grid-cols-1 rounded-xl p-4'>
              <SkeletonCard
                className='w-full h-72'
              />
            </div>
          ) : (
            <BudgetWidget />
          )
        }
      </div>
      <div className='flex flex-wrap'>
        <div className='w-full lg:px-4 p-0 pb-6'>
          {
            loading ? (
              <div className='grid grid-cols-1 rounded-xl'>
                <SkeletonCard
                  className='w-full h-96'
                />
              </div>
            ) : (
              <ExpenseChart />
            )
          }
        </div>
        <div className="w-full lg:w-1/2 lg:px-4 p-0 pb-6">
          {
            loading ? (
              <div className='grid grid-cols-1 rounded-xl'>
                <SkeletonCard
                  className='w-full h-96'
                />
              </div>
            ) : (
              <IncomeExpenseChart />
            )
          }
        </div>
        <div className='w-full lg:w-1/2 lg:px-4 p-0 pb-6'>
          {
            loading ? (
              <div className='grid grid-cols-1 rounded-xl'>
                <SkeletonCard
                  className='w-full h-96'
                />
              </div>
            ) : (
              <ExpenseCategoryChart />
            )
          }
        </div>
        <div className='w-full lg:w-1/2 lg:px-4 p-0 pb-6'>
          {
            loading ? (
              <div className='grid grid-cols-1 rounded-xl'>
                <SkeletonCard
                  className='w-full h-96'
                />
              </div>
            ) : (
              <SavingsTrendChart />
            )
          }
        </div>
        <div className='w-full lg:w-1/2 lg:px-4 p-0 pb-6'>
          {
            loading ? (
              <div className='grid grid-cols-1 rounded-xl'>
                <SkeletonCard
                  className='w-full h-96'
                />
              </div>
            ) : (
              <CategoryCard />
            )
          }
        </div>
        <div className='w-full lg:px-4 p-0 pb-6'>
          {
            loading ? (
              <div className='grid grid-cols-1 rounded-xl'>
                <SkeletonCard
                  className='w-full h-96'
                />
              </div>
            ) : (
              <RecentTransactions />
            )
          }
        </div>
        <div className="w-full lg:p-12">
          <div className="grid grid-cols-2 gap-4 lg:gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {
              loading ? (
                  <SkeletonCard
                    className='w-full h-40'
                  />
              ) : (
                <AnalyticsCards
                  icon={
                    <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <FaArrowTrendUp className="text-md lg:text-2xl text-green-600" />
                    </div>
                  }
                  title="Highest Income"
                  amount={maxIncome}
                  description="Largest income transaction"
                />
              )
            }

            {
              loading ? (
                  <SkeletonCard
                    className='w-full h-40'
                  />
              ) : (
                <AnalyticsCards
                  icon={
                    <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <FaArrowTrendDown className="text-md lg:text-2xl text-red-600" />
                    </div>
                  }
                  title="Highest Expense"
                  amount={maxExpense}
                  description="Largest expense transaction"
                />
              )
            }

            {
              loading ? (
                  <SkeletonCard
                    className='w-full h-40'
                  />
              ) : (
                <AnalyticsCards
                  icon={
                    <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <HiOutlineChartBar className="text-md lg:text-2xl text-orange-600" />
                    </div>
                  }
                  title="Average Monthly Expense"
                  amount={avgExpense}
                  description="Average spending per active month"
                />
              )
            }

            {
              loading ? (
                  <SkeletonCard
                    className='w-full h-40'
                  />
              ) : (
                <AnalyticsCards
                  icon={
                    <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <MdOutlineSavings className="text-md lg:text-2xl text-blue-600" />
                    </div>
                  }
                  title="Average Monthly Income"
                  amount={avgIncome}
                  description="Average income per active month"
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
    </PageWrapper>
  )
}

export default Dashboard